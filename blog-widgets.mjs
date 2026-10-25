import { escapeHTML as esc, safeHref, layoutTreemap, attributedRevenue, compoundScenario, businessScenario } from './blog-core.mjs';

const copy = {
  fa:{reported:'درآمد گزارش‌شده',scenario:'سناریوی انتساب به AI',share:'سهم فرضی منتسب به AI',total:'جمع درآمد تبلیغات',assumed:'مبلغ منتسب با فرض شما',billion:'میلیارد دلار',million:'میلیون دلار',source:'منبع و جزئیات',reset:'بازنشانی',hypothetical:'آزمایش آموزشی با اعداد فرضی',result:'مبلغ پایان دوره',multiplier:'ضریب نسبت به شروع',profit:'درآمد منهای هزینه',margin:'حاشیه در این مثال',ratio:'درآمد ÷ سرمایه',period:'دوره',invalid:'ورودی‌ها را در محدودهٔ مشخص وارد کنید.',choose:'یک گزینه را انتخاب کنید.',correct:'درست است.',retry:'این نتیجه را نمی‌توان گرفت.',kinds:{inspiration:'مرجع الهام',reported:'گزارش مالی',derived:'محاسبه از گزارش',company:'اعلان شرکت',estimate:'برآورد پژوهشی',research:'گزارش پژوهشی'}},
  en:{reported:'Reported revenue',scenario:'AI attribution scenario',share:'Assumed AI-attributable share',total:'Total advertising revenue',assumed:'Attributed under your assumption',billion:'USD billion',million:'USD million',source:'Source & details',reset:'Reset',hypothetical:'Learning lab · hypothetical inputs',result:'End-of-period amount',multiplier:'Multiple of starting amount',profit:'Revenue minus cost',margin:'Margin in this example',ratio:'Revenue ÷ capital',period:'Period',invalid:'Enter values within the stated ranges.',choose:'Choose an answer.',correct:'That’s right.',retry:'That conclusion does not follow.',kinds:{inspiration:'Inspiration',reported:'Financial disclosure',derived:'Derived from disclosure',company:'Company announcement',estimate:'Research estimate',research:'Research report'}}
};

export function createResearchWidgets({lang,article,number,rich,openDialog,signal}) {
  const t=copy[lang],widgets=new Map();
  const date=value=>value?new Intl.DateTimeFormat(lang,{dateStyle:'medium'}).format(new Date(`${value}T12:00:00Z`)):'';
  const sourceById=id=>article.sources?.find(source=>source.id===id);
  const sourceCard=source=>{
    if(!source?.[lang])return '';
    const url=safeHref(source.url,lang);
    return `<span class="source-kind">${esc(t.kinds[source.kind]||t.source)}</span><h3>${url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(source[lang].title)} <span aria-hidden="true">↗</span></a>`:esc(source[lang].title)}</h3><div class="source-meta"><span>${esc(source.publisher)}</span>${source.date?`<time datetime="${esc(source.date)}">${esc(date(source.date))}</time>`:''}</div><p>${esc(source[lang].note)}</p>`;
  };
  const sourceDetail=id=>{const source=sourceById(id);return source?`<div class="source-detail">${sourceCard(source)}</div>`:'';};
  const sourceButton=id=>sourceById(id)?`<button class="blog-text-button" type="button" data-research-source="${esc(id)}" aria-haspopup="dialog">${t.source} ↗</button>`:'';

  function render(block,id) {
    if(!['explorer','treemap','calculator','quiz'].includes(block.type))return '';
    widgets.set(id,{block,mode:'reported',share:block.share??30});
    if(block.type==='explorer')return `<section class="research-widget application-explorer" data-explorer="${id}"><header><span class="small-label">${lang==='fa'?'حوزه‌ها را کشف کنید':'EXPLORE THE FIELDS'}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].hint)}</p></header><div class="application-grid">${block.items.map((item,index)=>`<button type="button" data-explore="${id}" data-item="${index}" aria-pressed="${index===0}" aria-controls="${id}-detail"><span class="application-symbol" aria-hidden="true">${['✦','⌘','↗','◈','◎','✳','⤴','∿'][index%8]}</span><strong>${esc(item[lang].title)}</strong><span>${esc(item[lang].text)}</span></button>`).join('')}</div><div class="application-detail" id="${id}-detail" aria-live="polite"><h4>${esc(block.items[0][lang].title)}</h4><p>${rich(block.items[0][lang].detail)}</p></div></section>`;
    if(block.type==='treemap')return `<figure class="research-widget revenue-treemap" data-treemap="${id}"><figcaption><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].note)}</p></figcaption><div class="research-switch" role="group" aria-label="${lang==='fa'?'مبنای نمایش':'Display basis'}"><button type="button" data-tree-mode="reported" data-widget="${id}" aria-pressed="true">${t.reported}</button><button type="button" data-tree-mode="scenario" data-widget="${id}" aria-pressed="false">${t.scenario}</button></div><label class="treemap-assumption" hidden>${t.share}<output data-share-label>${number(block.share??30,'percent')}</output><input type="range" min="0" max="100" step="1" value="${block.share??30}" data-tree-share="${id}" aria-label="${t.share}"></label><div class="treemap-canvas" aria-label="${esc(block[lang].title)}"></div><div class="treemap-total" aria-live="polite"></div><p class="widget-help">${lang==='fa'?'روی هر بخش بزنید؛ تاریخ، روش و منبع همان عدد را ببینید.':'Select a rectangle to inspect the date, method and source behind its number.'}</p></figure>`;
    if(block.type==='calculator')return `<section class="research-widget research-calculator" data-calculator="${id}"><header><span class="scenario-badge">${t.hypothetical}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].note)}</p></header><div class="calculator-inputs">${block.inputs.map(input=>`<label>${esc(input[lang])}<input type="number" inputmode="decimal" min="${input.min}" max="${input.max}" step="${input.step}" value="${input.value}" data-calc-number="${input.key}" aria-label="${esc(input[lang])}"><input type="range" min="${input.min}" max="${input.max}" step="${input.step}" value="${input.value}" data-calc-range="${input.key}" aria-label="${esc(input[lang])} — ${lang==='fa'?'نوار تغییر':'slider'}"><small>${number(input.min,'decimal')} – ${number(input.max,'decimal')}</small></label>`).join('')}</div><div class="calculator-output" role="status" aria-live="polite"></div><div class="compound-steps"></div><p class="calculator-error" role="alert"></p><div class="calculator-foot"><button type="button" class="blog-text-button" data-calc-reset="${id}">${t.reset}</button>${sourceButton(block.source)}</div></section>`;
    return `<section class="research-widget article-quiz" data-quiz="${id}"><span class="small-label">${lang==='fa'?'برداشتتان را بسنجید':'CHECK YOUR INTERPRETATION'}</span><h3>${esc(block[lang].question)}</h3><div class="quiz-choices">${block.choices.map((choice,index)=>`<button type="button" data-quiz-choice="${id}" data-choice="${index}" aria-pressed="false">${esc(choice[lang])}</button>`).join('')}</div><p class="quiz-feedback" role="status" aria-live="polite">${t.choose}</p></section>`;
  }

  function mount(root) {
    function updateTreemap(id) {
      const state=widgets.get(id),{block}=state,figure=root.querySelector(`[data-treemap="${id}"]`);
      if(signal.aborted||!figure?.isConnected)return;
      const canvas=figure.querySelector('.treemap-canvas');
      const scenario=state.mode==='scenario',width=canvas.clientWidth,height=width<360?340:290;
      canvas.style.height=`${height}px`;
      canvas.classList.toggle('is-scenario',scenario);
      canvas.style.setProperty('--portion',`${scenario?state.share:100}%`);
      canvas.innerHTML=layoutTreemap(block.items,width,height).map((item,index)=>`<button type="button" class="treemap-cell treemap-color-${index%3} ${item.width<110?'is-compact':''}" data-tree-item="${id}" data-item="${esc(item.id)}" aria-haspopup="dialog" style="inset-inline-start:${item.x+2}px;top:${item.y+2}px;width:${Math.max(0,item.width-4)}px;height:${Math.max(0,item.height-4)}px"><span><strong>${esc(item.name)}</strong><b>${number(scenario?attributedRevenue(item.value,state.share):item.value,'decimal')}</b><small>${t.billion}</small></span></button>`).join('');
      figure.querySelector('.treemap-assumption').hidden=!scenario;
      figure.querySelector('[data-share-label]').textContent=number(state.share,'percent');
      const total=block.items.reduce((sum,item)=>sum+item.value,0);
      figure.querySelector('.treemap-total').innerHTML=`<span>${scenario?t.assumed:t.total}</span><strong>${number(scenario?attributedRevenue(total,state.share):total,'decimal')} <small>${t.billion}</small></strong>${scenario?`<em>${lang==='fa'?'محاسبهٔ فرضی؛ درآمد گزارش‌شدهٔ AI نیست.':'Hypothetical calculation; not reported AI revenue.'}</em>`:''}`;
    }
    function updateCalculator(id) {
      const {block}=widgets.get(id),container=root.querySelector(`[data-calculator="${id}"]`),values={};
      let valid=true;
      for(const input of block.inputs){const field=container.querySelector(`[data-calc-number="${input.key}"]`);values[input.key]=Number(field.value);const okay=field.value.trim()!==''&&field.checkValidity();field.setAttribute('aria-invalid',String(!okay));valid&&=okay;}
      let result=null,html='';
      if(valid&&block.formula==='compound'){
        result=compoundScenario(values.base,values.growth,values.years);
        if(result)html=`<div><span>${t.result}</span><strong>${number(result.total,'decimal')}</strong><small>${t.million}</small></div><div><span>${t.multiplier}</span><strong>${number(result.multiplier,'multiple')}</strong><small dir="ltr">${number(values.base,'decimal')} × ${number(values.growth,'decimal')}<sup>${number(values.years)}</sup></small></div>`;
        container.querySelector('.compound-steps').innerHTML=result?result.values.map((value,index)=>`<div><span>${t.period} ${number(index)}</span><i style="--bar:${result.total>0?value/result.total*100:0}%" aria-hidden="true"></i><b>${number(value,'decimal')}</b></div>`).join(''):'';
      }
      if(valid&&block.formula==='business'){
        result=businessScenario(values.revenue,values.cost,values.funding);
        if(result)html=`<div><span>${t.profit}</span><strong class="${result.profit<0?'negative-result':''}">${number(result.profit,'decimal')}</strong><small>${t.million}</small></div><div><span>${t.margin}</span><strong>${number(result.margin,'percent')}</strong><small>${lang==='fa'?'(درآمد − هزینه) ÷ درآمد':'(Revenue − cost) ÷ revenue'}</small></div><div><span>${t.ratio}</span><strong>${number(result.capitalRatio,'multiple')}</strong><small>${lang==='fa'?'معیار سودآوری نیست':'Not a profitability measure'}</small></div>`;
      }
      container.querySelector('.calculator-output').innerHTML=result?html:'<strong>—</strong>';
      container.querySelector('.calculator-error').textContent=result?'':t.invalid;
      if(!result)container.querySelector('.compound-steps').innerHTML='';
    }
    for(const [id,{block}] of widgets){
      if(block.type==='treemap'){
        updateTreemap(id);
        const canvas=root.querySelector(`[data-treemap="${id}"] .treemap-canvas`);
        // The shared shell can replace an article before its next module mount.
        const observer=new ResizeObserver(()=>{if(signal.aborted||!canvas.isConnected){observer.disconnect();return;}updateTreemap(id);});
        observer.observe(canvas);
        signal.addEventListener('abort',()=>observer.disconnect(),{once:true});
      }
      if(block.type==='calculator')updateCalculator(id);
    }
    root.addEventListener('input',event=>{
      const input=event.target;
      if(input.dataset.treeShare){widgets.get(input.dataset.treeShare).share=Number(input.value);updateTreemap(input.dataset.treeShare);}
      const key=input.dataset.calcNumber||input.dataset.calcRange;
      if(key){const container=input.closest('[data-calculator]');const partner=container.querySelector(`[${input.hasAttribute('data-calc-number')?'data-calc-range':'data-calc-number'}="${key}"]`);partner.value=input.value;updateCalculator(container.dataset.calculator);}
    },{signal});
    root.addEventListener('click',event=>{
      const button=event.target.closest('button');if(!button)return;
      const data=button.dataset;
      if(data.explore){const block=widgets.get(data.explore).block,item=block.items[Number(data.item)];for(const sibling of button.parentElement.querySelectorAll('button'))sibling.setAttribute('aria-pressed',String(sibling===button));root.querySelector(`#${data.explore}-detail`).innerHTML=`<h4>${esc(item[lang].title)}</h4><p>${rich(item[lang].detail)}</p>`;}
      if(data.treeMode){widgets.get(data.widget).mode=data.treeMode;for(const sibling of button.parentElement.querySelectorAll('button'))sibling.setAttribute('aria-pressed',String(sibling===button));updateTreemap(data.widget);}
      if(data.treeItem){const state=widgets.get(data.treeItem),item=state.block.items.find(item=>item.id===data.item);openDialog(item.name,`<dl class="point-detail"><div><dt>${t.reported}</dt><dd>${number(item.value,'decimal')}</dd></div>${state.mode==='scenario'?`<div><dt>${t.assumed} (${number(state.share,'percent')})</dt><dd>${number(attributedRevenue(item.value,state.share),'decimal')}</dd></div>`:''}</dl><p class="note">${t.billion} · ${lang==='fa'?'سال مالی ۲۰۲۵':'FY2025'}</p>${sourceDetail(item.source)}`,button);}
      if(data.researchSource){const source=sourceById(data.researchSource);if(source)openDialog(source[lang].title,sourceDetail(source.id),button);}
      if(data.calcReset){const {block}=widgets.get(data.calcReset),container=button.closest('[data-calculator]');for(const input of block.inputs){container.querySelector(`[data-calc-number="${input.key}"]`).value=input.value;container.querySelector(`[data-calc-range="${input.key}"]`).value=input.value;}updateCalculator(data.calcReset);}
      if(data.quizChoice){const block=widgets.get(data.quizChoice).block,choice=block.choices[Number(data.choice)];for(const sibling of button.parentElement.querySelectorAll('button'))sibling.setAttribute('aria-pressed',String(sibling===button));const feedback=button.closest('[data-quiz]').querySelector('.quiz-feedback');feedback.classList.toggle('is-correct',choice.correct);feedback.textContent=`${choice.correct?t.correct:t.retry} ${block[`${lang}Explanation`]}`;}
    },{signal});
  }
  return {render,mount,sourceCard,sourceDetail,date};
}
