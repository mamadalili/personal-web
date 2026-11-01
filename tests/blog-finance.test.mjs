import test from 'node:test';
import assert from 'node:assert/strict';
import {moneyGrowth,doublingYears,presentMoney,returnSequence,realMoney,contributionFuture} from '../blog-finance-model.mjs';

const near=(actual,expected,tolerance=1e-7)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} != ${expected}`);

test('compound growth preserves the principal at year zero and at a zero rate',()=>{
  near(moneyGrowth({principal:100,rate:8,years:0}).net,100);
  near(moneyGrowth({principal:100,rate:0,years:20}).net,100);
  near(moneyGrowth({principal:100,rate:8,years:10}).gross,215.8924997273);
});
test('annual asset fees are charged after growth and lost growth is not the fee total',()=>{
  const one=moneyGrowth({principal:100,rate:8,years:1,fee:2});
  near(one.net,105.84);near(one.fees,2.16);
  const two=moneyGrowth({principal:100,rate:8,years:2,fee:2});
  near(two.net,112.021056);near(two.fees,4.446144);
  assert.ok(two.gross-two.net>two.fees);
});
test('doubling distinguishes the rule of 72 from the exact value and handles zero growth',()=>{
  const d=doublingYears(8);near(d.approx,9);near(d.exact,9.006468342,1e-6);
  assert.equal(doublingYears(0).exact,null);
  assert.equal(doublingYears(-10).approx,null);
  assert.ok(Math.abs(doublingYears(40).error)>0.1);
});
test('present value discounts the future amount rather than subtracting a percent',()=>{
  near(presentMoney({future:1000,rate:6,years:1,today:1000}).present,943.396226415);
  near(presentMoney({future:120,rate:0,years:4,today:100}).difference,20);
  near(presentMoney({future:120,rate:8,years:0,today:100}).present,120);
});
test('geometric return corrects both inconsistent claims in the source example',()=>{
  const result=returnSequence([50,-50,50]);
  near(result.end,112.5);near(result.total,12.5);near(result.arithmetic,16.6666666667);
  near(result.geometric,4.0041911526);
  near(returnSequence([20,-20]).end,96);
});
test('reordering equal-period returns changes the path, not its endpoint without cash flows',()=>{
  const a=returnSequence([50,-50,10]),b=returnSequence([10,-50,50]);
  near(a.end,b.end);assert.notDeepEqual(a.values,b.values);
  assert.equal(returnSequence([-100,50,50]).geometric,-100);
  assert.equal(returnSequence([-100.1,50]),null);
});
test('exact purchasing-power return differs materially from subtraction at high inflation',()=>{
  const small=realMoney({principal:100,nominal:5,inflation:4,years:1});
  near(small.rate,0.9615384615);near(small.real,100.9615384615);
  const high=realMoney({principal:100,nominal:28,inflation:40,years:1});
  near(high.rate,-8.5714285714);near(high.real,91.4285714286);
  near(realMoney({principal:100,nominal:0,inflation:0,years:20}).real,100);
});
test('the early lump sum does not beat twenty-five equally-sized annual contributions',()=>{
  const early=moneyGrowth({principal:10000,rate:8,years:40});
  const late=contributionFuture({payment:10000,rate:8,years:25});
  near(early.gross,217245.214968,0.001);near(late,731059.399527,0.001);
  assert.ok(late>3*early.gross);
  near(contributionFuture({payment:100,rate:0,years:5}),500);
  near(contributionFuture({payment:100,rate:8,years:1,timing:'start'}),108);
});
test('invalid or ambiguous inputs cannot silently become plausible results',()=>{
  assert.equal(moneyGrowth({principal:'',rate:8,years:10}),null);
  assert.equal(moneyGrowth({principal:100,rate:8,years:1.5}),null);
  assert.equal(moneyGrowth({principal:100,rate:8,years:10,fee:-1}),null);
  assert.equal(presentMoney({future:100,rate:-100,years:1,today:100}),null);
  assert.equal(realMoney({principal:100,nominal:8,inflation:-100,years:1}),null);
  assert.equal(returnSequence([NaN,8]),null);
  assert.equal(doublingYears(Infinity),null);
  assert.equal(contributionFuture({payment:100,rate:8,years:1,timing:'unknown'}),null);
});
