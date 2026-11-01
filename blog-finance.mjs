import {escapeHTML as esc} from './blog-core.mjs';
import {moneyGrowth,doublingYears,presentMoney,returnSequence,realMoney} from './blog-finance-model.mjs';

const copy={
 fa:{sample:'مثال آموزشی · نرخ‌ها فرضی‌اند',inputs:'ورودی‌های محاسبه',reset:'بازنشانی مثال',method:'فرمول، فرض‌ها و جدول محاسبه',invalid:'همهٔ ورودی‌ها را در بازهٔ مشخص وارد کن؛ تعداد سال‌ها باید عدد صحیح باشد.',units:'واحد پول',years:'سال',year:'سال',period:'پایان دوره',chart:'نمودار محاسبه‌شده از ورودی‌های همین مثال',slider:'تنظیم با نوار',gross:'بدون کارمزد',net:'پس از کارمزد',fees:'جمع کارمزدهای کسرشده',gap:'فاصلهٔ ارزش فعلی با مبلغ امروز',present:'ارزش فعلی مبلغ آینده',today:'دریافت امروز',exact:'زمان دقیق دوبرابرشدن',approx:'تخمین قاعدهٔ ۷۲',noDouble:'با نرخ صفر یا منفی، مبلغ در این مدل دوبرابر نمی‌شود.',arithmetic:'میانگین حسابی سالانه',geometric:'رشد مرکب سالانه',end:'مبلغ پایان مسیر',balance:'موجودی حساب',real:'قدرت خرید به قیمت سال آغاز',realRate:'بازده واقعی سالانه',difference:'اختلاف تخمین با محاسبهٔ دقیق',inflationNote:'قدرت خرید با قیمت‌های سال آغاز سنجیده می‌شود. اختلاف دو خط، هزینهٔ کسرشده از حساب نیست.',feeNote:'کارمزد هر سال پس از رشد از دارایی کسر می‌شود. فاصلهٔ دو خط شامل کارمزد و رشدِ از‌دست‌رفته است؛ با جمع کارمزدها یکی نیست.',basis:'واحد تمام مبلغ‌ها یکسان است؛ مثال با ۱۰۰ واحد شروع می‌شود و تبدیل ارز انجام نمی‌دهد.'},
 en:{sample:'Educational example · assumed rates',inputs:'Calculation inputs',reset:'Reset example',method:'Formula, assumptions and calculation table',invalid:'Enter every input within its stated range. Years must be a whole number.',units:'money units',years:'years',year:'Year',period:'Period end',chart:'Chart calculated from this example’s inputs',slider:'slider',gross:'Without fees',net:'After fees',fees:'Fees actually deducted',gap:'Present value minus today’s amount',present:'Present value of future payment',today:'Payment today',exact:'Exact doubling time',approx:'Rule-of-72 estimate',noDouble:'At a zero or negative rate, money does not double in this model.',arithmetic:'Arithmetic annual mean',geometric:'Compound annual growth',end:'Ending balance',balance:'Account balance',real:'Purchasing power at starting prices',realRate:'Annual real return',difference:'Estimate minus exact time',inflationNote:'Purchasing power uses starting-year prices. The gap between these lines is not a charge deducted from the account.',feeNote:'Each annual fee is charged on assets after growth. The gap includes fees and foregone growth; it is not the sum of fees charged.',basis:'All amounts use the same money unit. The example starts at 100 units and performs no currency conversion.'}
};

const field=(key,value,min,max,step,fa,en)=>({key,value,min,max,step,fa,en});
const definitions={
 compound:{fields:[field('principal',100,0,1000000,1,'مبلغ آغازین (واحد پول)','Starting amount (money units)'),field('rate',8,-100,100,0.1,'رشد سالانهٔ فرضی (%)','Assumed annual growth (%)'),field('years',20,0,60,1,'تعداد سال‌ها','Years'),field('fee',0,0,5,0.1,'کارمزد سالانهٔ دارایی (%)','Annual asset fee (%)')],formula:'gross = P × (1+r/100)^n; net = P × [(1+r/100) × (1−f/100)]^n',presets:[{fa:'بدون کارمزد',en:'No fee',values:{fee:0}},{fa:'کارمزد سالانهٔ ۲٪',en:'2% annual fee',values:{fee:2}}]},
 doubling:{fields:[field('rate',8,0,100,0.1,'نرخ سالانهٔ فرضی (%)','Assumed annual rate (%)')],formula:'exact = ln(2) / ln(1+r/100); estimate = 72/r',presets:[{fa:'مثال ۸٪',en:'8% example',values:{rate:8}},{fa:'مثال ۴۰٪',en:'40% example',values:{rate:40}}]},
 present:{fields:[field('today',100,0,1000000,1,'مبلغ قابل دریافت امروز','Amount available today'),field('future',110,0,1000000,1,'مبلغ قابل دریافت در آینده','Amount available in the future'),field('years',1,0,60,1,'فاصله تا دریافت (سال)','Time until payment (years)'),field('rate',8,0,100,0.1,'نرخ تنزیل سالانهٔ فرضی (%)','Assumed annual discount rate (%)')],formula:'PV = FV / (1+r/100)^n; difference = PV − today',presets:[{fa:'همان مبلغ، یک سال بعد',en:'Same amount, one year later',values:{today:100,future:100,rate:6,years:1}},{fa:'مبلغ آیندهٔ بیشتر',en:'A larger future payment',values:{today:100,future:120,rate:8,years:1}}]},
 returns:{fields:[field('first',50,-100,100,0.1,'بازده سال اول (%)','Year-one return (%)'),field('second',-50,-100,100,0.1,'بازده سال دوم (%)','Year-two return (%)'),field('third',50,-100,100,0.1,'بازده سال سوم (%)','Year-three return (%)')],formula:'growth = [(1+r₁/100)(1+r₂/100)(1+r₃/100)]^(1/3) − 1',presets:[{fa:'مثال منبع: بالا، پایین، بالا',en:'Source example: up, down, up',values:{first:50,second:-50,third:50}},{fa:'رشد یکسان در هر سال',en:'Same growth each year',values:{first:8,second:8,third:8}},{fa:'از دست رفتن کل مبلغ',en:'A complete loss',values:{first:-100,second:50,third:50}}]},
 real:{fields:[field('principal',100,0,1000000,1,'مبلغ آغازین (واحد پول)','Starting amount (money units)'),field('nominal',5,-100,100,0.1,'رشد سالانهٔ موجودی (%)','Annual balance growth (%)'),field('inflation',4,0,200,0.1,'تورم سالانهٔ فرضی (%)','Assumed annual inflation (%)'),field('years',1,0,60,1,'تعداد سال‌ها','Years')],formula:'real = P × [(1+r/100)/(1+i/100)]^n; real annual return = (1+r/100)/(1+i/100) − 1',presets:[{fa:'رشد ۵٪، تورم ۴٪',en:'5% growth, 4% inflation',values:{principal:100,nominal:5,inflation:4,years:1}},{fa:'رشد ۲۸٪، تورم ۴۰٪',en:'28% growth, 40% inflation',values:{principal:100,nominal:28,inflation:40,years:1}}]}
};

export function createFinanceWidgets({lang,signal}){
 const t=copy[lang],blocks=new Map();
 const number=value=>Number.isFinite(value)?new Intl.NumberFormat(lang,{maximumFractionDigits:2}).format(value):'—';
 const percent=value=>Number.isFinite(value)?new Intl.NumberFormat(lang,{style:'percent',maximumFractionDigits:2}).format(value/100):'—';
 const compact=value=>new Intl.NumberFormat(lang,{notation:Math.abs(value)>=1e12?'scientific':'compact',maximumFractionDigits:1}).format(value);
 const metric=(label,value,unit='')=>`<div><dt>${esc(label)}</dt><dd><bdi>${esc(value)}</bdi>${unit?`<small>${esc(unit)}</small>`:''}</dd></div>`;
 const table=(headers,rows)=>`<table><thead><tr>${headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,index)=>index?`<td><bdi>${esc(number(v))}</bdi></td>`:`<th scope="row">${esc(number(v))}</th>`).join('')}</tr>`).join('')}</tbody></table>`;
 const lineChart=(series,labels)=>{
  const high=Math.max(1,...series.flatMap(s=>s.values))*1.08,w=500,x=i=>52+(labels.length===1?w/2:i*w/(labels.length-1)),y=v=>188-v/high*158;
  return `<figure class="money-plot"><svg viewBox="0 0 580 230" role="img" aria-label="${esc(t.chart)}" dir="ltr"><title>${esc(t.chart)}</title>${[0,high/2,high].map(v=>`<line x1="52" x2="552" y1="${y(v)}" y2="${y(v)}" stroke="#dce3df"/><text x="46" y="${y(v)+4}" text-anchor="end">${esc(compact(v))}</text>`).join('')}${series.map((s,i)=>`<polyline points="${s.values.map((v,j)=>`${x(j)},${y(v)}`).join(' ')}" fill="none" stroke="${i?'#a44525':'#126b58'}" stroke-width="3" ${i?'stroke-dasharray="7 4"':''} vector-effect="non-scaling-stroke"/>${s.values.length<=4?s.values.map((v,j)=>`<circle cx="${x(j)}" cy="${y(v)}" r="4" fill="${i?'#a44525':'#126b58'}"/>`).join(''):''}`).join('')}<text x="52" y="214">${esc(t.year)} ${esc(number(labels[0]))}</text><text x="552" y="214" text-anchor="end">${esc(t.year)} ${esc(number(labels.at(-1)))}</text></svg><figcaption class="money-legend">${series.map((s,i)=>`<span><i class="money-key ${i?'money-key-alt':''}" aria-hidden="true"></i>${esc(s.label)}</span>`).join('')}</figcaption></figure>`;
 };
 const bars=(entries,unit)=>{
  const max=Math.max(1,...entries.map(e=>e.value));
  return `<div class="money-bars" aria-label="${esc(t.chart)}">${entries.map(entry=>`<div><span>${esc(entry.label)}</span><strong><bdi>${esc(number(entry.value))}</bdi> ${esc(unit)}</strong><div class="money-bar-track" dir="ltr"><i style="width:${entry.value/max*100}%"></i></div></div>`).join('')}<small>${esc(lang==='fa'?'مبدأ طول نوارها صفر است.':'Bar lengths start at zero.')}</small></div>`;
 };
 function update(root,id){
  const {block,definition}=blocks.get(id),figure=root.querySelector(`[data-money-lab="${id}"]`),values={};
  let valid=true;
  for(const field of definition.fields){
   const input=figure.querySelector(`[data-money-number="${field.key}"]`),okay=input.value.trim()!==''&&input.checkValidity();
   input.setAttribute('aria-invalid',String(!okay));values[field.key]=Number(input.value);valid&&=okay;
  }
  let result=null,html='',rows=[],headers=[];
  if(valid&&block.mode==='compound'){
   result=moneyGrowth(values);
   if(result){html=`<dl class="money-metrics">${metric(t.gross,number(result.gross),t.units)}${metric(t.net,number(result.net),t.units)}${metric(t.fees,number(result.fees),t.units)}</dl>${lineChart([{label:t.gross,values:result.values.map(v=>v.gross)},{label:t.net,values:result.values.map(v=>v.net)}],result.values.map(v=>v.year))}<p class="money-reading">${esc(t.feeNote)}</p>`;headers=[t.year,t.gross,t.net,t.fees];rows=result.values.map(v=>[v.year,v.gross,v.net,v.fees]);}
  }else if(valid&&block.mode==='doubling'){
   result=doublingYears(values.rate);
   if(result){html=result.exact===null?`<p class="money-reading">${esc(t.noDouble)}</p>`:`<dl class="money-metrics">${metric(t.exact,number(result.exact),t.years)}${metric(t.approx,number(result.approx),t.years)}</dl>${bars([{label:t.exact,value:result.exact},{label:t.approx,value:result.approx}],t.years)}<p class="money-reading">${esc(t.difference)}: <bdi>${esc(number(result.error))}</bdi> ${esc(t.years)}</p>`;headers=[lang==='fa'?'نرخ (%)':'Rate (%)',t.exact,t.approx];rows=[[values.rate,result.exact,result.approx]];}
  }else if(valid&&block.mode==='present'){
   result=presentMoney(values);
   if(result){html=`<dl class="money-metrics">${metric(t.present,number(result.present),t.units)}${metric(t.gap,number(result.difference),t.units)}</dl>${bars([{label:t.today,value:values.today},{label:t.present,value:result.present}],t.units)}`;headers=[lang==='fa'?'فاصله (سال)':'Delay (years)',t.today,t.present];rows=[[values.years,values.today,result.present]];}
  }else if(valid&&block.mode==='returns'){
   result=returnSequence([values.first,values.second,values.third]);
   if(result){html=`<dl class="money-metrics">${metric(t.arithmetic,percent(result.arithmetic))}${metric(t.geometric,percent(result.geometric))}${metric(t.end,number(result.end),t.units)}</dl>${lineChart([{label:t.balance,values:result.values}],[0,1,2,3])}<p class="money-reading">${esc(t.basis)}</p>`;headers=[t.period,t.balance];rows=result.values.map((v,i)=>[i,v]);}
  }else if(valid&&block.mode==='real'){
   result=realMoney(values);
   if(result){html=`<dl class="money-metrics">${metric(t.balance,number(result.nominal),t.units)}${metric(t.real,number(result.real),t.units)}${metric(t.realRate,percent(result.rate))}</dl>${lineChart([{label:t.balance,values:result.values.map(v=>v.nominal)},{label:t.real,values:result.values.map(v=>v.real)}],result.values.map(v=>v.year))}<p class="money-reading">${esc(t.inflationNote)} ${esc(lang==='fa'?'تفریق سادهٔ نرخ‌ها:':'Simple rate subtraction:')} <bdi>${esc(percent(result.approx))}</bdi></p>`;headers=[t.year,t.balance,t.real];rows=result.values.map(v=>[v.year,v.nominal,v.real]);}
  }
  figure.querySelector('.money-output').innerHTML=result?html:'<p class="money-reading">—</p>';
  figure.querySelector('.money-announcement').textContent=result?(figure.querySelector('.money-metrics')?.innerText||t.noDouble):'';
  figure.querySelector('.money-error').textContent=result?'':t.invalid;
  figure.querySelector('.money-table').innerHTML=result?table(headers,rows):'';
 }
 return {
  render(block,id){
   const definition=definitions[block.mode];if(!definition||!block[lang]?.title)return '';
   blocks.set(id,{block,definition});
   return `<figure class="money-lab" data-money-lab="${id}" data-money-mode="${esc(block.mode)}"><figcaption><span class="money-kicker">${esc(t.sample)}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].hint)}</p></figcaption><div class="money-inputs" role="group" aria-label="${esc(t.inputs)}">${definition.fields.map(field=>`<div class="money-field"><label for="${id}-${field.key}">${esc(field[lang])}</label><input id="${id}-${field.key}" type="number" dir="ltr" inputmode="decimal" min="${field.min}" max="${field.max}" step="${field.step}" value="${field.value}" required aria-describedby="${id}-${field.key}-bounds" data-money-number="${field.key}"><input type="range" min="${field.min}" max="${field.max}" step="${field.step}" value="${field.value}" dir="ltr" data-money-range="${field.key}" aria-label="${esc(`${field[lang]} — ${t.slider}`)}"><small class="money-bounds" id="${id}-${field.key}-bounds">${esc(lang==='fa'?'بازهٔ مجاز: ':'Allowed range: ')}<bdi>${esc(number(field.min))}</bdi> – <bdi>${esc(number(field.max))}</bdi></small></div>`).join('')}</div><div class="money-presets" role="group" aria-label="${esc(lang==='fa'?'مثال‌های آماده':'Example presets')}">${definition.presets.map((preset,index)=>`<button type="button" data-money-preset="${index}">${esc(preset[lang])}</button>`).join('')}</div><p class="money-error" role="status" aria-live="polite"></p><p class="money-announcement sr-only" role="status" aria-live="polite" aria-atomic="true"></p><div class="money-output"></div><p class="money-assumptions">${esc(block[lang].assumptions)}</p><details class="money-method"><summary>${esc(t.method)}</summary><code dir="ltr">${esc(definition.formula)}</code><p>${esc(lang==='fa'?'نرخ‌های ورودی درصد سالانه‌اند؛ n تعداد سال‌هاست. جدول، مقادیر محاسبه‌شدهٔ همین ورودی‌ها را نشان می‌دهد.':'Input rates are annual percentages; n is the number of years. The table shows values calculated from these inputs.')}</p><div class="money-table"></div></details><button class="blog-text-button money-reset" type="button" data-money-reset>${esc(t.reset)}</button></figure>`;
  },
  mount(root){
   for(const id of blocks.keys())update(root,id);
   root.addEventListener('input',event=>{
    const input=event.target,key=input.dataset.moneyNumber||input.dataset.moneyRange,figure=input.closest('[data-money-lab]');
    if(!key||!figure)return;
    const partner=figure.querySelector(`[${input.hasAttribute('data-money-number')?'data-money-range':'data-money-number'}="${key}"]`);
    if(input.value.trim()!==''&&input.checkValidity())partner.value=input.value;
    update(root,figure.dataset.moneyLab);
   },{signal});
   root.addEventListener('click',event=>{
    const button=event.target.closest('button'),figure=button?.closest('[data-money-lab]');if(!figure)return;
    const id=figure.dataset.moneyLab,{definition}=blocks.get(id);
    let preset=null;
    if(button.hasAttribute('data-money-reset'))preset=Object.fromEntries(definition.fields.map(f=>[f.key,f.value]));
    if(button.hasAttribute('data-money-preset'))preset=definition.presets[Number(button.dataset.moneyPreset)]?.values;
    if(!preset)return;
    for(const [key,value] of Object.entries(preset))for(const input of figure.querySelectorAll(`[data-money-number="${key}"],[data-money-range="${key}"]`))input.value=value;
    update(root,id);
   },{signal});
  }
 };
}
