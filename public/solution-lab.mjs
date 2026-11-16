import {escapeHTML as esc} from './blog-core.mjs';

const copy = {
  fa: {
    example: 'مثال فرضی',
    strategy: {
      intro: 'برای هر کانال ۳۶۰ واحد خرج کرده‌ایم. کدام‌یک خریدار مرتبط بیشتری آورده؟',
      control: 'فقط درخواست‌های مرتبط', channels: ['جست‌وجو', 'شبکهٔ اجتماعی'],
      unit: 'درخواست', cost: 'هزینهٔ هر درخواست', money: 'واحد', caption: 'درخواست‌های دو کانال',
      notes: ['شبکهٔ اجتماعی درخواست بیشتری آورده. حالا ببین چند نفر واقعاً دنبال همین محصول بوده‌اند.', 'از جست‌وجو ۱۸ درخواست مرتبط آمده. هزینهٔ هرکدام ۲۰ واحد است و در شبکهٔ اجتماعی ۳۰ واحد.']
    },
    execution: {
      intro: 'از ۱۰۰ بازدید، ۲۵ سبد خرید داشته‌ایم. تعداد سفارش‌ها را تغییر بده و ببین ریزش در کدام مرحله بیشتر است.',
      control: 'تعداد سفارش نهایی', stages: ['بازدید', 'سبد خرید', 'سفارش'], caption: 'رسید مسیر خرید',
      drop: 'بیشترین ریزش نسبی', first: 'از بازدید به سبد', last: 'از سبد به سفارش', equal: 'در هر دو مرحله'
    },
    technology: {
      intro: 'از ۸ کالای انبار، ۳ تا حضوری فروخته شد. ببین فروشگاه اینترنتی چند تا برای فروش نشان می‌دهد.',
      control: 'به‌روزرسانی خودکار موجودی', shelves: ['انبار', 'سایت'], unit: 'موجود', caption: 'دو قفسهٔ یک محصول',
      difference: 'اختلاف موجودی', notes: ['سایت هنوز ۸ تا نشان می‌دهد. ممکن است ۳ سفارش بگیریم که امکان تحویلشان را نداریم.', 'حالا هر دو ۵ تا نشان می‌دهند. فروش حضوری از موجودی قابل سفارش سایت هم کم شد.']
    },
    'ai-tools': {
      intro: '۶ درخواست برای یک دستیار خرید رسیده. ببین دسترسی به مشخصات تأییدشدهٔ محصول، مسیر پاسخ را چطور عوض می‌کند.',
      control: 'دستیار به برگهٔ مشخصات دسترسی دارد', trays: ['پاسخ مستند', 'تأیید فروش', 'نیاز به اطلاعات'], caption: 'مسیر شش درخواست',
      sources: ['ابعاد', 'وزن', 'جنس بدنه'], approval: ['تخفیف ویژه', 'شرایط مرجوعی'], missing: 'نصب سفارشی',
      notes: ['تا مشخصات نرسد، دستیار برای ابعاد، وزن و جنس بدنه هم باید اطلاعات بخواهد.', 'ابعاد، وزن و جنس بدنه از برگه پاسخ می‌گیرند. تخفیف و مرجوعی به فروش می‌روند و نصب سفارشی هنوز اطلاعات می‌خواهد.']
    }
  },
  en: {
    example: 'Illustrative data',
    strategy: {
      intro: 'We spent 360 units on each channel. Which brought more people looking for this product?',
      control: 'Count qualified enquiries only', channels: ['Search', 'Social'], unit: 'enquiries',
      cost: 'Cost per enquiry', money: 'units', caption: 'Enquiries by channel',
      notes: ['Social brought more enquiries. Now check how many were actually about this product.', 'Search brought 18 qualified enquiries at 20 units each. A qualified enquiry from social cost 30.']
    },
    execution: {
      intro: 'Out of 100 visits, 25 reached the basket. Change the order count to find the larger drop.',
      control: 'Completed orders', stages: ['Visits', 'Baskets', 'Orders'], caption: 'Checkout receipt',
      drop: 'Largest relative drop', first: 'from visit to basket', last: 'from basket to order', equal: 'at both steps'
    },
    technology: {
      intro: 'Three of eight units sold in the shop. How many does the website still offer?',
      control: 'Sync stock automatically', shelves: ['Warehouse', 'Website'], unit: 'in stock', caption: 'One product, two stock records',
      difference: 'Stock difference', notes: ['The website still offers eight. It could accept three orders the warehouse can’t fill.', 'Both now show five. The in-store sale also reduced the stock available online.']
    },
    'ai-tools': {
      intro: 'Six questions reach a shopping assistant. See which it can answer when it has a verified product sheet.',
      control: 'Give the assistant the product sheet', trays: ['Sourced answer', 'Sales approval', 'Needs more detail'], caption: 'Routing six requests',
      sources: ['Dimensions', 'Weight', 'Material'], approval: ['Special discount', 'Return terms'], missing: 'Custom fitting',
      notes: ['Without a source, dimensions, weight and material all need more information.', 'The sheet answers dimensions, weight and material. Sales handles discounts and returns. Custom fitting still needs details.']
    }
  }
};
const numberFormat = {fa: new Intl.NumberFormat('fa-IR', {maximumFractionDigits:1}), en: new Intl.NumberFormat('en', {maximumFractionDigits:1})};
const format = (value, lang) => numberFormat[lang].format(value);
const defaults = {strategy:false, execution:5, technology:false, 'ai-tools':true};
const examplesByDocument = new WeakMap();

export function solutionExample(id, input = defaults[id]) {
  if (id === 'strategy') {
    const counts = input ? [18,12] : [30,48];
    return {counts, cost: counts.map(count => 360 / count)};
  }
  if (id === 'execution') {
    const orders = Math.max(0, Math.min(25, Math.round(Number(input) || 0)));
    const drops = [75, (25-orders) * 4];
    return {counts: [100,25,orders], largest: Math.max(...drops), stage: drops[0] > drops[1] ? 'first' : drops[1] > drops[0] ? 'last' : 'equal'};
  }
  if (id === 'technology') return {counts:[5,input ? 5 : 8], difference:input ? 0 : 3};
  if (id === 'ai-tools') return {counts:input ? [3,2,1] : [0,2,4]};
  throw new RangeError('Unknown solution');
}

const screw = (x,y) => '<circle cx="'+x+'" cy="'+y+'" r="2.3" fill="#77839c"/><path d="M'+(x-1.15)+' '+(y+.7)+'l2.3-1.4" stroke="#27344e" stroke-width=".85"/>';
const graph = (viewBox, art) => '<svg class="sl-drawing" viewBox="'+viewBox+'" aria-hidden="true" focusable="false">'+art+'</svg>';

function plotBar(value, max, index) {
  const width = 210 * value / max;
  const ink = index ? '#adb4f5' : '#dafa65';
  let ticks = '';
  for (let x=18; x<=210; x+=42) ticks += '<path d="M'+x+' 30v4" stroke="#98a1b2" stroke-width="1"/>';
  return graph('0 0 246 40',
    '<path d="M4 9l5-5h227l5 5v20H4Z" fill="#68768d"/><rect x="4" y="9" width="237" height="25" rx="4" fill="#33415b"/>'+
    '<rect x="17" y="13" width="212" height="14" rx="2" fill="#18243a"/>'+
    '<g data-entry-series="across"><rect x="18" y="14" width="'+width+'" height="11" fill="'+ink+'"/>'+
    '<path d="M18 14h'+width+'" stroke="#fff" opacity=".72"/></g>'+ticks+screw(9,21)+screw(236,21));
}

function stockShelf(count, unsynced) {
  let cartons='';
  for(let i=0;i<8;i++) {
    const x=12+18*i, ghost=i>=5 && unsynced;
    if(i>=count) {
      cartons+='<path d="M'+x+' 38h14" stroke="#828f9e" stroke-width="1.3" stroke-dasharray="2 2"/>';
      continue;
    }
    cartons+='<g transform="translate('+x+' 14)"><path d="M0 7l4-4h12l-3 4Z" fill="'+(ghost?'#dba16d':'#f7e6be')+'"/><path d="M13 7l3-4v19l-3 4Z" fill="'+(ghost?'#a36c4c':'#a89472')+'"/><path d="M0 7h13v19H0Z" fill="'+(ghost?'#edb789':'#d7c5a1')+'"/><path d="M5 7h3v6H5Z" fill="'+(ghost?'#956146':'#8b774f')+'"/><path d="M2 22h6" stroke="#594b40"/></g>';
  }
  return graph('0 0 167 55','<rect x="3" y="8" width="4" height="43" rx="1" fill="#78849a"/><rect x="160" y="8" width="4" height="43" rx="1" fill="#78849a"/>'+cartons+'<path d="M5 41l4-3h150l3 3-3 5H6Z" fill="#8291a9"/><path d="M5 41h157v4H5Z" fill="#53607a"/>'+screw(5,11)+screw(162,11));
}

function inTray(count, index) {
  let papers='';
  const colors=['#cce757','#c4c9f3','#dfb497'];
  for(let i=0;i<count;i++){
    const y=36-4*i;
    papers+='<g transform="translate(0 '+y+')"><path d="M15 5l14-22h65L81 5Z" fill="'+(i===count-1?colors[index]:'#ebe6da')+'" stroke="#6a7284"/><path d="M35-10h33m-37 5h24" stroke="#536077" stroke-width="1.5"/></g>';
  }
  return graph('0 0 108 63','<path d="M6 39l18-27h78L86 42Z" fill="#7f8ba1"/><path d="M10 39l16-23h70L82 39Z" fill="#3d4962"/>'+papers+'<path d="M6 38h79l-2 15H10Z" fill="#9da7ba"/><path d="M85 38l17-26-3 16-16 25Z" fill="#596980"/><path d="M6 38h79" stroke="#d1d5df"/><rect x="34" y="41" width="22" height="4" rx="1.5" fill="#505e74"/><path d="M12 54h68" stroke="#19253a" stroke-width="3"/>');
}

function results(id, lang, value) {
  const t=copy[lang][id], m=solutionExample(id,value), f=v=>format(v,lang);
  if (id==='strategy') {
    const rows=t.channels.map((label,i)=>'<div class="sl-meter"><div><strong>'+label+'</strong><b>'+f(m.counts[i])+' '+t.unit+'</b></div>'+plotBar(m.counts[i],48,i)+'<small>'+t.cost+' · '+f(m.cost[i])+' '+t.money+'</small></div>').join('');
    return {chart:'<div class="sl-meters">'+rows+'</div>', note:t.notes[Number(value)]};
  }
  if (id==='execution') {
    const rows=t.stages.map((label,i)=>'<div class="sl-receipt-row"><span>'+label+'</span><b><bdi>'+f(m.counts[i])+'</bdi></b><i aria-hidden="true" style="--fill:'+m.counts[i]+'%"></i></div>').join('');
    const rate=new Intl.NumberFormat(lang==='fa'?'fa-IR':'en',{style:'percent'}).format(m.largest/100);
    return {chart:'<div class="sl-printer"><div class="sl-feed" aria-hidden="true"><i></i></div><div class="sl-receipt">'+rows+'</div></div>', note:t.drop+' · '+rate+' '+t[m.stage]};
  }
  if (id==='technology') {
    const rows=t.shelves.map((label,i)=>'<div class="sl-stock"><div><strong>'+label+'</strong><b>'+f(m.counts[i])+' '+t.unit+'</b></div>'+stockShelf(m.counts[i],i===1&&!value)+'</div>').join('');
    return {chart:'<div class="sl-shelves">'+rows+'</div>',note:t.difference+' · '+f(m.difference)+' — '+t.notes[Number(value)]};
  }
  const names=[value?t.sources:[],t.approval,value?[t.missing]:[...t.sources,t.missing]];
  const trays=t.trays.map((label,i)=>'<div class="sl-tray">'+inTray(m.counts[i],i)+'<strong>'+label+'</strong><b>'+f(m.counts[i])+'</b><small>'+names[i].map(esc).join(lang==='fa'?'، ':', ')+'</small></div>').join('');
  return {chart:'<div class="sl-trays">'+trays+'</div>',note:t.notes[Number(value)]};
}

export function renderSolutionLab(id, lang) {
  const t=copy[lang][id], value=defaults[id], result=results(id,lang,value);
  const input=id==='execution'
    ? '<input id="solution-adjust" type="range" min="0" max="25" step="1" value="5"><output for="solution-adjust">'+format(5,lang)+'</output>'
    : '<input id="solution-adjust" type="checkbox"'+(value?' checked':'')+'>';
  return '<div class="solution-lab" data-lab="'+id+'" lang="'+lang+'"><div class="sl-question"><p>'+t.intro+'</p><label class="sl-control" for="solution-adjust"><span>'+t.control+'</span>'+input+'</label></div>'+
    '<figure class="sl-figure"><figcaption><span>'+t.caption+'</span><small>'+copy[lang].example+'</small></figcaption><div data-lab-chart>'+result.chart+'</div></figure>'+
    '<p class="sl-readout" role="status" aria-live="polite" aria-atomic="true">'+result.note+'</p></div>';
}

export function connectSolutionLab(root) {
  const lab=root.querySelector('.solution-lab');
  if(!lab) return () => {};
  const control=lab.querySelector('input'), id=lab.dataset.lab, lang=lab.lang;
  const doc=lab.ownerDocument;
  if(!examplesByDocument.has(doc)) examplesByDocument.set(doc,new Map());
  const previous=examplesByDocument.get(doc);
  if(previous.has(id)) {
    if(control.type==='range') control.value=String(previous.get(id));
    else control.checked=previous.get(id);
  }
  const isRange=control.type==='range';
  const currentValue=()=>isRange ? control.valueAsNumber : control.checked;
  const update=()=>{
    const value=currentValue();
    previous.set(id,value);
    const result=results(id,lang,value);
    if(isRange) lab.querySelector('output').value=format(value,lang);
    lab.querySelector('[data-lab-chart]').innerHTML=result.chart;
    lab.querySelector('.sl-readout').textContent=result.note;
  };
  if(currentValue()!==defaults[id]) update(); // A restored input can differ from the prerendered figure.
  lab.dataset.ready='';
  control.addEventListener('input',update);
  return ()=>control.removeEventListener('input',update);
}
