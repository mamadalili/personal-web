import { escapeHTML as esc, layoutTreemap, roundBound } from './blog-core.mjs';
import { logFraction, valuationMultiple, capitalPoints } from './blog-market-model.mjs';

const copy = {
 fa:{back:'همهٔ نوشته‌ها',guide:'نقشهٔ مقاله',source:'منبع و جزئیات',sources:'منابع و روش',close:'بستن',revenue:'درآمد سالانه‌شده',valuation:'ارزش‌گذاری / معامله',estimated:'برآورد',missing:'— اعلام نشده',billion:'میلیارد دلار',date:'تاریخ درآمد',valuationDate:'تاریخ ارزش‌گذاری',roundDate:'تاریخ دور سرمایه',round:'اندازهٔ دور / تعهد سرمایه',read:'زمان مطالعه',reviewed:'بازبینی',select:'یک حوزه را انتخاب کنید',outside:'بدون رقم تفکیک‌شده؛ خارج از مقیاس',players:'انتخاب شرکت برای دیدن حضورش',all:'نمایش همه',appearances:'حوزه در این فهرست',table:'اعداد نمودار',cost:'برآورد هزینهٔ آموزش',year:'سال معرفی',related:'ادامهٔ این بحث',multiple:'ضریب قیمت به فروش',bound:'این مقدار، حد اعلام‌شده است؛ نسبت هم حد متناظر دارد.',transaction:'ارزش معامله؛ شرکت اکنون زیرمجموعهٔ SpaceX است.',dates:'عکس‌های تاریخ‌دار، نه رتبه‌بندی زنده',fundingX:'دور / تعهد سرمایه',fundingY:'درآمد سالانه‌شده',profit:'این نسبت سودآوری را نشان نمی‌دهد.',plotHint:'نام شرکت را برای دیدن عددها و منابع انتخاب کنید.'},
 en:{back:'All posts',guide:'Article map',source:'Source & details',sources:'Sources & method',close:'Close',revenue:'Annualised revenue',valuation:'Valuation / deal',estimated:'Estimate',missing:'— Not disclosed',billion:'USD billion',date:'Revenue date',valuationDate:'Valuation date',roundDate:'Round date',round:'Round / capital commitment',read:'Reading time',reviewed:'Reviewed',select:'Select a field',outside:'No separate figure; outside the scale',players:'Select a company to see its appearances',all:'Show all',appearances:'fields in this selection',table:'Chart values',cost:'Estimated training cost',year:'Release year',related:'Keep exploring',multiple:'Price-to-sales multiple',bound:'This is a disclosed bound; the ratio has the corresponding bound.',transaction:'Transaction value; now part of SpaceX.',dates:'Dated snapshots, not a live ranking',fundingX:'Round / commitment',fundingY:'Annualised revenue',profit:'This ratio does not measure profitability.',plotHint:'Select a company for its figures and sources.'}
};

export function mountMarketArticle(root, { article, lang, sourceDetail, openDialog, signal }) {
 const t=copy[lang], data=article.atlas, companies=[...data.labs,...data.tools];
 const n=(value,digits=1)=>new Intl.NumberFormat(lang,{maximumFractionDigits:digits}).format(value);
 const year=value=>new Intl.NumberFormat(lang,{useGrouping:false}).format(value);
 const short=value=>value>=1e9?'$'+n(value/1e9,1)+'B':value>=1e6?'$'+n(value/1e6,1)+'M':value>=1e3?'$'+n(value/1e3,1)+'K':'$'+n(value,0);
 const money=(value,bound='')=>value===null?'—':bound+n(value,value<1?3:value<10?2:1);
 const multipleLabel=multiple=>multiple.bound+n(roundBound(multiple.value,multiple.bound,1),1)+'×';
 const month=value=>new Intl.DateTimeFormat(lang,{calendar:'gregory',month:'short',year:'numeric'}).format(new Date(value+'-01T12:00:00Z'));
 const sourceButtons=ids=>ids.map(id=>'<button type="button" class="market-source-link" data-market-source="'+esc(id)+'" aria-haspopup="dialog">'+t.source+' ↗</button>').join('');
 const category=id=>data.categories.find(row=>row.id===id);
 const financeLabel=row=>row.name+' · '+t.revenue+': '+money(row.revenue,row.revenueBound)+' '+t.billion+' · '+t.valuation+': '+money(row.valuation)+' '+(row.valuation===null?'':t.billion);
 const ticks=(values,min,max)=>values.map(value=>'<span style="left:'+logFraction(value,min,max)*82+'%">'+n(value,value<1?1:0)+'</span>').join('');
 const finance=rows=>'<div class="market-legend"><span><i class="market-swatch revenue"></i>'+t.revenue+'</span><span><i class="market-swatch valuation"></i>'+t.valuation+'</span><span class="market-est-key">'+t.estimated+' ┄</span></div><div class="market-financial" dir="ltr"><div class="market-finance-axis">'+ticks([.1,1,10,100,1000],.1,1000)+'</div>'+rows.map(row=>{
  const track=(value,kind,bound='')=>'<span class="market-track '+kind+(row.estimated?' estimated':'')+'" aria-hidden="true">'+(value===null?'<span class="market-unavailable">—</span>':'<i style="width:'+logFraction(value,.1,1000)*82+'%"></i><b style="left:'+logFraction(value,.1,1000)*82+'%">'+esc(money(value,bound))+'</b>')+'</span>';
  return '<button type="button" class="market-finance-row" data-market-company="'+row.id+'" aria-haspopup="dialog" aria-label="'+esc(financeLabel(row))+'"><span class="market-company"><strong>'+esc(row.name)+(row.transaction?' †':'')+'</strong><small>'+esc(month(row.date))+'</small></span><span class="market-tracks">'+track(row.revenue,'revenue',row.revenueBound)+track(row.valuation,'valuation')+'</span></button>';
 }).join('')+'</div><p class="market-chart-hint">'+t.plotHint+' · '+t.missing+'</p>';
 const training=()=>'<div class="market-training" dir="ltr"><div class="market-cost-grid">'+[1e3,1e4,1e5,1e6,1e7,1e8,1e9].map(value=>'<span style="bottom:'+logFraction(value,1e3,1e9)*100+'%"><b>'+short(value)+'</b></span>').join('')+'</div><div class="market-cost-bars">'+data.training.map(row=>'<button type="button" data-market-training="'+row.id+'" aria-haspopup="dialog" aria-label="'+esc(row.name+' · '+t.cost+': '+short(row.cost)+' · '+year(row.year))+'"><span class="market-cost-bar" style="height:'+logFraction(row.cost,1e3,1e9)*100+'%"><b>'+short(row.cost)+'</b></span><span class="market-cost-name">'+esc(row.name)+'<small>'+year(row.year)+'</small></span></button>').join('')+'</div></div><p class="market-chart-hint">'+t.source+' · Epoch AI</p>';
 const multipleRows=companies.map(row=>({row,multiple:valuationMultiple(row)})).filter(item=>item.multiple).sort((a,b)=>b.multiple.value-a.multiple.value);
 const multiples=()=>'<div class="market-multiples" dir="ltr"><div class="market-finance-axis">'+ticks([1,3,10,30,100],1,100)+'</div>'+multipleRows.map(({row,multiple})=>'<button type="button" class="market-multiple-row" data-market-company="'+row.id+'" aria-haspopup="dialog" aria-label="'+esc(row.name+' · '+t.multiple+': '+multipleLabel(multiple))+'"><span class="market-company"><strong>'+esc(row.name)+(row.transaction?' †':'')+'</strong></span><span class="market-multiple-track '+(row.estimated?'estimated':'')+'"><i style="width:'+logFraction(multiple.value,1,100)*82+'%"></i><b style="left:'+logFraction(multiple.value,1,100)*82+'%">'+esc(multipleLabel(multiple))+'</b></span></button>').join('')+'</div><p class="market-chart-hint">'+t.plotHint+'</p>';
 const geography=()=>'<div class="market-geography"><div class="market-figure-label">Stanford AI Index · '+year(2025)+'</div>'+data.geography.map(row=>'<button type="button" class="market-country" data-market-country="'+row.id+'" aria-haspopup="dialog" aria-label="'+esc(row[lang]+' · '+n(row.value,0))+'"><span>'+esc(row[lang])+'</span><span class="market-dot-lane" aria-hidden="true" style="--dot:'+row.color+'">'+Array.from({length:row.value},()=>'<i></i>').join('')+'</span><b>'+n(row.value,0)+'</b></button>').join('')+'</div>';
 const players=()=>'<div class="market-player-tools"><p role="status" class="market-player-status">'+t.players+'</p><button type="button" data-market-reset disabled>'+t.all+'</button></div><div class="market-players">'+data.leaders.map(row=>'<div class="market-player-row"><span class="market-player-field">'+esc(category(row.id)[lang].label)+'</span><div>'+row.entries.map(([name,detail,group])=>'<button type="button" data-market-player="'+esc(group)+'" aria-pressed="false" class="player-'+esc(group)+'"><strong dir="ltr">'+esc(name)+'</strong><small dir="ltr">'+esc(detail)+'</small></button>').join('')+'</div></div>').join('')+'</div>';
 const capital=()=>'<div class="market-capital" dir="ltr"></div><p class="market-chart-hint">'+t.plotHint+'</p><details class="market-data"><summary>'+t.table+'</summary><div class="market-data-scroll"><table><thead><tr><th>'+(lang==='fa'?'شرکت':'Company')+'</th><th>'+t.round+'</th><th>'+t.revenue+'</th><th>'+t.roundDate+'</th></tr></thead><tbody>'+capitalPoints(companies).map(point=>'<tr><th><button type="button" data-market-round="'+point.id+'" aria-haspopup="dialog">'+esc(companies.find(row=>row.id===point.id).name)+'</button></th><td><bdi>'+money(point.amount)+'</bdi></td><td><bdi>'+money(point.revenue,point.revenueBound)+'</bdi></td><td>'+esc(month(point.date))+'</td></tr>').join('')+'</tbody></table></div></details>';
 const visuals={applications:()=>'<div class="market-area"></div><div class="market-unscaled">'+data.categories.filter(row=>row.value===null).map(row=>'<button type="button" data-market-category="'+row.id+'" aria-haspopup="dialog"><i style="background:'+row.color+'"></i>'+esc(row[lang].label)+'<span>↗</span></button>').join('')+'</div><p class="market-chart-hint">'+t.select+' · '+t.billion+'</p>',leaders:players,labs:()=>finance(data.labs),tools:()=>finance(data.tools),training,capital,multiples,geography};
 root.classList.add('market-story');
 root.querySelector('.article-body').classList.add('market-article-body');
 for(const section of article.sections){
  const node=root.querySelector('#'+section.id),s=section[lang];
  node.classList.add('market-chapter');
  node.setAttribute('aria-labelledby','market-title-'+section.id);
  node.innerHTML=section.aliases.map(alias=>'<span class="market-anchor" id="'+alias+'" aria-hidden="true"></span>').join('')+'<div class="market-chapter-copy"><span class="market-kicker">'+esc(s.nav)+'</span><h2 id="market-title-'+section.id+'">'+esc(s.title)+'</h2><p>'+esc(s.text)+'</p><div class="market-takeaway"><strong>'+esc(s.stat)+'</strong><span>'+esc(s.takeaway)+'</span></div></div><figure class="market-figure" aria-label="'+esc(s.title)+'">'+visuals[section.visual]()+'<figcaption>'+esc(s.foot)+'</figcaption></figure>';
 }
 // Keep the shared source section, with the long ledger available on demand.
 const ledger=root.querySelector('.source-ledger');
 if(ledger){
  const details=document.createElement('details'),summary=document.createElement('summary');
  details.className='article-disclosure market-source-disclosure';
  summary.textContent=t.sources;
  ledger.before(details);details.append(summary,ledger);
 }
 const dialog=root.querySelector('.article-dialog');
 let lastTrigger,lastAction,selectedGroup=null;
 function open(title,html,trigger){
  if(signal.aborted)return;
  lastTrigger=trigger;
  const name=trigger?.getAttributeNames().find(name=>name.startsWith('data-market-'));
  lastAction=name?{name,value:trigger.getAttribute(name)}:null;
  openDialog(title,html,trigger);
 }
 dialog.addEventListener('close',()=>{
  if(lastTrigger?.isConnected||!lastAction)return;
  const replacement=[...root.querySelectorAll('button')].find(button=>button.getAttribute(lastAction.name)===lastAction.value);
  (replacement||root).focus();
 },{signal});
 signal.addEventListener('abort',()=>observer.disconnect(),{once:true});
 const sourceHtml=ids=>'<div class="market-dialog-sources">'+[...new Set(ids)].map(sourceDetail).join('')+'</div>';
 function companyDetail(id,roundOnly,trigger){
  const row=companies.find(row=>row.id===id);
  if(!row)return;
  const obs=roundOnly?row.round:row;
  if(!obs)return;
  const ratio=roundOnly?null:valuationMultiple(row);
  open(row.name,'<dl class="market-detail-values">'+(roundOnly?'<div><dt>'+t.round+'</dt><dd><bdi>'+money(obs.amount)+'</bdi> '+t.billion+'</dd></div>':'')+'<div><dt>'+t.revenue+'</dt><dd><bdi>'+money(obs.revenue,obs.revenueBound)+'</bdi> '+t.billion+'</dd></div><div><dt>'+t.valuation+'</dt><dd><bdi>'+money(obs.valuation)+'</bdi> '+(obs.valuation===null?'':t.billion)+'</dd></div>'+(!roundOnly&&ratio?'<div><dt>'+t.multiple+'</dt><dd><bdi>'+esc(multipleLabel(ratio))+'</bdi></dd></div>':'')+'<div><dt>'+(roundOnly?t.roundDate:t.date)+'</dt><dd>'+esc(month(obs.date))+'</dd></div>'+(!roundOnly&&obs.valuationDate?'<div><dt>'+t.valuationDate+'</dt><dd>'+esc(month(obs.valuationDate))+'</dd></div>':'')+(roundOnly&&obs.revenueDate?'<div><dt>'+t.date+'</dt><dd>'+esc(month(obs.revenueDate))+'</dd></div>':'')+'</dl>'+(obs.estimated?'<p>'+t.estimated+'</p>':'')+(obs.revenueBound?'<p>'+t.bound+'</p>':'')+(!roundOnly&&row.transaction?'<p>'+t.transaction+'</p>':'')+sourceHtml(obs.sources),trigger);
 }
 function selectPlayer(group){
  selectedGroup=group===selectedGroup?null:group;
  root.querySelectorAll('[data-market-player]').forEach(button=>{
   button.setAttribute('aria-pressed',String(button.dataset.marketPlayer===selectedGroup));
   button.classList.toggle('market-dimmed',!!selectedGroup&&button.dataset.marketPlayer!==selectedGroup);
  });
  const count=data.leaders.filter(row=>row.entries.some(entry=>entry[2]===selectedGroup)).length;
  const name=selectedGroup==='spacex'?'SpaceX':data.leaders.flatMap(row=>row.entries).find(entry=>entry[2]===selectedGroup)?.[0];
  root.querySelector('.market-player-status').textContent=selectedGroup?name+' · '+n(count,0)+' '+t.appearances:t.players;
  root.querySelector('[data-market-reset]').disabled=!selectedGroup;
 }
 root.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button||!root.contains(button))return;
  if(button.hasAttribute('data-market-company'))companyDetail(button.dataset.marketCompany,false,button);
  else if(button.hasAttribute('data-market-round'))companyDetail(button.dataset.marketRound,true,button);
  else if(button.hasAttribute('data-market-source')){
   const source=article.sources.find(row=>row.id===button.dataset.marketSource);
   if(source)open(source[lang].title,sourceDetail(source.id),button);
  }else if(button.hasAttribute('data-market-category')){
   const row=category(button.dataset.marketCategory);
   open(row[lang].label,'<p class="market-detail-lead">'+esc(row[lang].text)+'</p><p><strong><bdi>'+money(row.value)+'</bdi></strong> '+(row.value===null?t.outside:t.billion+' · '+t.estimated)+'</p>'+(row.parts?'<dl class="market-ad-parts">'+row.parts.map(part=>'<div><dt>'+esc(part.name==='Other'&&lang==='fa'?'\u0633\u0627\u06cc\u0631':part.name)+'</dt><dd>'+money(part.value)+' '+t.billion+'</dd></div>').join('')+'</dl>':'')+sourceHtml(row.sources),button);
  }else if(button.hasAttribute('data-market-training')){
   const row=data.training.find(row=>row.id===button.dataset.marketTraining);
   if(row)open(row.name,'<dl class="market-detail-values"><div><dt>'+t.cost+'</dt><dd><bdi>$'+n(row.cost,0)+'</bdi></dd></div><div><dt>'+t.year+'</dt><dd>'+year(row.year)+'</dd></div></dl>'+sourceHtml(row.sources),button);
  }else if(button.hasAttribute('data-market-country')){
   const row=data.geography.find(row=>row.id===button.dataset.marketCountry);
   if(row)open(row[lang],'<p class="market-country-count">'+n(row.value,0)+'</p><p>'+(lang==='fa'?'مدل برجسته در سال ۲۰۲۵':'notable models in 2025')+'</p>'+sourceHtml(row.sources),button);
  }else if(button.hasAttribute('data-market-player'))selectPlayer(button.dataset.marketPlayer);
  else if(button.hasAttribute('data-market-reset'))selectPlayer(selectedGroup);
 },{signal});

 function drawArea(){
  const area=root.querySelector('.market-area'),width=area.clientWidth,height=width<420?370:360;
  area.style.height=height+'px';
  area.innerHTML=layoutTreemap(data.categories,width,height).map(row=>{
   const parts=row.parts?'<span class="market-area-parts" aria-hidden="true">'+layoutTreemap(row.parts,row.width-24,row.height-99).map(part=>'<span style="left:'+part.x+'px;top:'+part.y+'px;width:'+part.width+'px;height:'+part.height+'px"><small>'+esc(part.name==='Other'&&lang==='fa'?'سایر':part.name)+'</small><b>'+money(part.value)+'</b></span>').join('')+'</span>':'';
   return '<button type="button" data-market-category="'+row.id+'" aria-haspopup="dialog" aria-label="'+esc(row[lang].label+' · '+money(row.value)+' '+t.billion+' · '+t.estimated)+'" style="left:'+(row.x+2)+'px;top:'+(row.y+2)+'px;width:'+(row.width-4)+'px;height:'+(row.height-4)+'px;--area:'+row.color+'" class="market-area-cell '+(row.width<135?'compact':'')+'"><strong>'+esc(row[lang].label)+'</strong><b dir="ltr">'+money(row.value)+'</b>'+parts+'<span aria-hidden="true">↗</span></button>';
  }).join('');
 }
 function drawCapital(){
  const plot=root.querySelector('.market-capital'),width=plot.clientWidth,height=370,margin={left:42,right:28,top:25,bottom:55},pw=width-margin.left-margin.right,ph=height-margin.top-margin.bottom;
  const x=value=>margin.left+logFraction(value,.1,200)*pw,y=value=>margin.top+(1-logFraction(value,.1,200))*ph;
  const axis=[.1,1,10,100];
  plot.style.height=height+'px';
  plot.innerHTML='<svg viewBox="0 0 '+width+' '+height+'" aria-hidden="true">'+axis.map(value=>'<path d="M'+x(value)+' '+margin.top+'V'+(height-margin.bottom)+' M'+margin.left+' '+y(value)+'H'+(width-margin.right)+'" class="market-gridline"/><text x="'+x(value)+'" y="'+(height-margin.bottom+20)+'" text-anchor="middle">'+n(value,value<1?1:0)+'</text><text x="'+(margin.left-9)+'" y="'+(y(value)+4)+'" text-anchor="end">'+n(value,value<1?1:0)+'</text>').join('')+'<path d="M'+x(.1)+' '+y(.1)+'L'+x(200)+' '+y(200)+'" class="market-diagonal"/><text x="'+margin.left+'" y="13">'+t.fundingY+'</text><text x="'+(margin.left+pw/2)+'" y="'+(height-5)+'" text-anchor="middle">'+t.fundingX+' · '+t.billion+'</text></svg>'+capitalPoints(companies).map((point,index)=>{
   const row=companies.find(row=>row.id===point.id),radius=Math.sqrt(point.valuation/965)*27;
   const px=margin.left+point.x*pw,py=margin.top+(1-point.y)*ph;
   return '<button type="button" class="market-bubble bubble-'+index+' '+(px>width-115||point.id==='lovable'?'label-left':'')+'" data-market-round="'+row.id+'" aria-haspopup="dialog" aria-label="'+esc(row.name+' · '+t.round+': '+money(point.amount)+' · '+t.revenue+': '+money(point.revenue,point.revenueBound)+' '+t.billion)+'" style="left:'+px+'px;top:'+py+'px;--diameter:'+radius*2+'px"><i aria-hidden="true"></i><span>'+esc(row.name)+'<b>'+esc(money(point.revenue,point.revenueBound))+'</b></span></button>';
  }).join('');
 }
 const observer=new ResizeObserver(()=>{if(!signal.aborted){drawArea();drawCapital();}});
 observer.observe(root.querySelector('.market-area'));
 observer.observe(root.querySelector('.market-capital'));
 drawArea();drawCapital();
 // Source controls live in dialogs too; a single delegated listener covers both.
 root.querySelectorAll('.market-figure').forEach((figure,index)=>{
  const section=article.sections[index],ids=section.visual==='training'?['epoch-data','epoch']:section.visual==='geography'?['stanford2026']:['inspiration'];
  figure.insertAdjacentHTML('beforeend','<div class="market-figure-sources">'+sourceButtons(ids)+'</div>');
 });
 // The shared shell imports articles asynchronously, after fragment navigation.
 const anchor=[...root.querySelectorAll('[id]')].find(element=>'#'+element.id===location.hash);
 if(anchor)anchor.scrollIntoView({block:'start'});
}
