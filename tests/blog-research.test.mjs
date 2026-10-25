import test from 'node:test';
import assert from 'node:assert/strict';
import { layoutTreemap, attributedRevenue, compoundScenario, businessScenario, chartDomain, chartPosition, roundBound } from '../blog-core.mjs';

test('treemap preserves relative area without overlaps or out-of-bounds tiles',()=>{
  const tiles=layoutTreemap([{id:'a',value:10},{id:'b',value:20},{id:'c',value:30}],600,300);
  const areas={a:30000,b:60000,c:90000};
  assert.equal(tiles.length,3);
  for(const tile of tiles){assert.ok(Math.abs(tile.width*tile.height-areas[tile.id])<.001);assert.ok(tile.x>=0&&tile.y>=0&&tile.x+tile.width<=600.001&&tile.y+tile.height<=300.001);}
  for(let i=0;i<tiles.length;i++)for(let j=i+1;j<tiles.length;j++){
    const a=tiles[i],b=tiles[j];assert.ok(a.x+a.width<=b.x+.001||b.x+b.width<=a.x+.001||a.y+a.height<=b.y+.001||b.y+b.height<=a.y+.001);
  }
});
test('treemap ignores missing/nonpositive weights and supports narrow containers',()=>{
  assert.deepEqual(layoutTreemap([{id:'zero',value:0},{id:'bad',value:NaN}],260,300),[]);
  assert.equal(layoutTreemap([{id:'one',value:5}],260,300)[0].width,260);
});
test('attribution is an explicit assumption with correct zero and full-share boundaries',()=>{
  assert.equal(attributedRevenue(294.691,0),0);
  assert.ok(Math.abs(attributedRevenue(294.691,30)-88.4073)<.000001);
  assert.equal(attributedRevenue(294.691,100),294.691);
  assert.equal(attributedRevenue(100,101),null);
});
test('compound lab calculates each period and rejects fractional periods',()=>{
  const result=compoundScenario(100,2.4,3);
  assert.equal(result.values.length,4);
  assert.ok(Math.abs(result.total-1382.4)<.000001);
  assert.equal(compoundScenario(100,2.4,0).total,100);
  assert.equal(compoundScenario(100,2.4,2.5),null);
});
test('revenue exceeding raised capital does not imply a positive operating result',()=>{
  const result=businessScenario(100,140,60);
  assert.equal(result.profit,-40);assert.equal(result.margin,-40);assert.ok(result.capitalRatio>1);
  assert.equal(businessScenario(100,80,60).profit,20);
  assert.equal(businessScenario(0,10,0).margin,null);
  assert.equal(businessScenario(0,10,0).capitalRatio,null);
  assert.equal(businessScenario(100,undefined,60),null);
});
test('log scale gives equal space to equal multiples and excludes zero',()=>{
  const domain=chartDomain([1,10,100],'log');
  assert.equal(chartPosition(1,domain),0);assert.equal(chartPosition(10,domain),.5);assert.equal(chartPosition(100,domain),1);
  assert.equal(chartPosition(0,domain),null);
  assert.ok(Math.abs(chartPosition(10,chartDomain([1,10,100],'linear'))-.1)<.000001);
});
test('display rounding preserves disclosed lower and calculated upper bounds',()=>{
  const bound=965/47,possibleRatio=965/47.01;
  assert.equal(roundBound(bound,'≤'),20.6);
  assert.ok(possibleRatio<=roundBound(bound,'≤'));
  assert.equal(roundBound(29.3,'≤'),29.3);
  assert.equal(roundBound(47.09,'≥'),47);
  assert.equal(roundBound(-1.26,'≤'),-1.2);
  assert.equal(roundBound(-1.26,'≥'),-1.3);
  assert.equal(roundBound(null,'≤'),null);
  assert.equal(roundBound(20.5319,''),20.5319);
});
