// Pure content/link/calculation helpers, shared by the renderer and Node tests.
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

export function publishedPosts(posts) {
  return posts.filter(post => post.status === 'published' && !post.template).slice().sort((a,b) => (b.date || '').localeCompare(a.date || ''));
}

export function internalHref(target, language, posts = [], base = 'https://example.invalid/') {
  const pages = {home:'index.html',solutions:'solutions.html',strategy:'strategy.html',execution:'execution.html',technology:'technology.html','ai-tools':'ai-tools.html',blog:'blog.html',cv:'profile.html','cv:projects':'profile.html?tab=projects',contact:'contact.html',skills:'skills.html',template:'blog-template.html'};
  let path = Object.hasOwn(pages,target) ? pages[target] : null;
  if (target.startsWith('post:')) {
    const slug = target.slice(5);
    if (publishedPosts(posts).some(post => post.slug === slug)) path = `article.html?post=${encodeURIComponent(slug)}`;
  }
  if (!path) return null;
  const url = new URL(path,base);
  url.searchParams.set('lang',language === 'en' ? 'en' : 'fa');
  return url.href;
}

export function safeHref(href, language = 'fa', posts = [], base = 'https://example.invalid/') {
  const value = String(href ?? '').trim();
  if (value.startsWith('@')) return internalHref(value.slice(1),language,posts,base);
  if (/^#[a-zA-Z][\w-]*$/.test(value)) return value;
  if (!/^https?:\/\//i.test(value)) return null;
  try {
    const url = new URL(value);
    return ['https:','http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function chartValues(series, metric) {
  const values = series.values || {};
  if (metric.denominator) {
    return (values[metric.denominator] || []).map((denominator,index) => {
      const numerator = values[metric.numerator]?.[index];
      return Number.isFinite(denominator) && denominator > 0 && Number.isFinite(numerator) ? numerator / denominator * (metric.multiplier ?? 1) : null;
    });
  }
  return (values[metric.key] || []).map(value => Number.isFinite(value) ? value : null);
}

export function estimateOrders(visits, rate) {
  if (String(visits).trim() === '' || String(rate).trim() === '') return null;
  const traffic = Number(visits), percentage = Number(rate);
  if (!Number.isFinite(traffic) || !Number.isFinite(percentage) || traffic < 0 || traffic > 1000000 || percentage < 0 || percentage > 100) return null;
  return Math.round(traffic * percentage / 100);
}

export function layoutTreemap(items,width,height) {
  if(!(width>0&&height>0))return [];
  const data=items.filter(item=>Number.isFinite(item.value)&&item.value>0),result=[];
  function split(rows,x,y,w,h){
    if(!rows.length)return;
    if(rows.length===1){result.push({...rows[0],x,y,width:w,height:h});return;}
    const total=rows.reduce((sum,row)=>sum+row.value,0);
    let subtotal=0,best=Infinity,index=1;
    for(let i=1;i<rows.length;i++){subtotal+=rows[i-1].value;const difference=Math.abs(total/2-subtotal);if(difference<best){best=difference;index=i;}}
    const first=rows.slice(0,index),share=first.reduce((sum,row)=>sum+row.value,0)/total;
    if(w>=h){split(first,x,y,w*share,h);split(rows.slice(index),x+w*share,y,w*(1-share),h);}
    else{split(first,x,y,w,h*share);split(rows.slice(index),x,y+h*share,w,h*(1-share));}
  }
  split(data,0,0,width,height);return result;
}
export function attributedRevenue(revenue,share){
  return Number.isFinite(revenue)&&revenue>=0&&Number.isFinite(share)&&share>=0&&share<=100?revenue*share/100:null;
}
export function compoundScenario(base,growth,years){
  if(!Number.isFinite(base)||base<0||!Number.isFinite(growth)||growth<0||growth>10||!Number.isInteger(years)||years<0||years>10)return null;
  const values=Array.from({length:years+1},(_,index)=>base*growth**index);
  return {values,total:values.at(-1),multiplier:growth**years};
}
export function businessScenario(revenue,cost,funding){
  if(![revenue,cost,funding].every(value=>Number.isFinite(value)&&value>=0))return null;
  return {profit:revenue-cost,margin:revenue>0?(revenue-cost)/revenue*100:null,capitalRatio:funding>0?revenue/funding:null};
}
export function chartDomain(values,mode='linear'){
  const usable=values.filter(value=>Number.isFinite(value)&&(mode!=='log'||value>0));
  if(mode==='log'){
    const lower=usable.length?Math.floor(Math.log10(Math.min(...usable))):0;
    let upper=usable.length?Math.ceil(Math.log10(Math.max(...usable))):1;
    if(upper===lower)upper++;
    const step=Math.max(1,Math.ceil((upper-lower)/6)),ticks=[];
    for(let power=upper;power>=lower;power-=step)ticks.push(10**power);
    if(ticks.at(-1)!==10**lower)ticks.push(10**lower);
    return {min:10**lower,max:10**upper,ticks,mode};
  }
  const min=Math.min(0,...usable),max=Math.max(0,...usable)||1;
  return {min,max,ticks:[1,.75,.5,.25,0].map(part=>min+(max-min)*part),mode:'linear'};
}
export function chartPosition(value,domain){
  if(!Number.isFinite(value)||(domain.mode==='log'&&value<=0))return null;
  const transform=domain.mode==='log'?Math.log10:value=>value;
  return (transform(value)-transform(domain.min))/(transform(domain.max)-transform(domain.min));
}
export function roundBound(value,qualifier,digits=1){
  if(!Number.isFinite(value))return null;
  if(!['≤','≥'].includes(qualifier))return value;
  if(!Number.isInteger(digits)||digits<0||digits>6)return null;
  const factor=10**digits;
  return (qualifier==='≤'?Math.ceil(value*factor):Math.floor(value*factor))/factor;
}
