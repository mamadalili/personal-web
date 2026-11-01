const within=(value,min,max)=>typeof value==='number'&&Number.isFinite(value)&&value>=min&&value<=max;
const amount=value=>within(value,0,1e9);
const periods=value=>Number.isInteger(value)&&within(value,0,60);

export function moneyGrowth({principal,rate,years,fee=0}={}){
  if(!amount(principal)||!within(rate,-100,100)||!periods(years)||!within(fee,0,5))return null;
  let gross=principal,net=principal,fees=0;
  const values=[{year:0,gross,net,fees}];
  for(let year=1;year<=years;year++){
    gross*=1+rate/100;
    const beforeFee=net*(1+rate/100),charge=beforeFee*fee/100;
    fees+=charge;net=beforeFee-charge;
    values.push({year,gross,net,fees});
  }
  return {gross,net,fees,gap:gross-net,values};
}

export function doublingYears(rate){
  if(!within(rate,-100,100))return null;
  if(rate<=0)return {exact:null,approx:null,error:null};
  const exact=Math.LN2/Math.log1p(rate/100),approx=72/rate;
  return {exact,approx,error:approx-exact};
}

export function presentMoney({future,rate,years,today=100}={}){
  if(!amount(future)||!amount(today)||!within(rate,0,100)||!periods(years))return null;
  const present=future/(1+rate/100)**years;
  return {present,difference:present-today,today,future};
}

export function returnSequence(rates,principal=100){
  if(!Array.isArray(rates)||rates.length<2||rates.length>12||!amount(principal)||!rates.every(rate=>within(rate,-100,100)))return null;
  let factor=1;
  const values=[principal];
  for(const rate of rates){factor*=1+rate/100;values.push(principal*factor);}
  const geometric=factor===0?-100:Math.expm1(rates.reduce((sum,rate)=>sum+Math.log1p(rate/100),0)/rates.length)*100;
  return {end:principal*factor,total:(factor-1)*100,arithmetic:rates.reduce((sum,rate)=>sum+rate,0)/rates.length,geometric,values};
}

export function realMoney({principal,nominal,inflation,years}={}){
  if(!amount(principal)||!within(nominal,-100,100)||!within(inflation,0,200)||!periods(years))return null;
  const rate=((1+nominal/100)/(1+inflation/100)-1)*100;
  const values=Array.from({length:years+1},(_,year)=>{
    const balance=principal*(1+nominal/100)**year;
    return {year,nominal:balance,real:balance/(1+inflation/100)**year};
  });
  return {rate,approx:nominal-inflation,nominal:values.at(-1).nominal,real:values.at(-1).real,values};
}

export function contributionFuture({payment,rate,years,timing='end'}={}){
  if(!amount(payment)||!within(rate,0,100)||!periods(years)||!['end','start'].includes(timing))return null;
  const r=rate/100,total=r===0?payment*years:payment*Math.expm1(years*Math.log1p(r))/r;
  return total*(timing==='start'?1+r:1);
}
