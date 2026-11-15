import {escapeHTML as esc} from './blog-core.mjs';
import {contextAnswer,brainReadiness,validContextLab,validBrainCheck} from './blog-company-brain-model.mjs';

export function loadCompanyBrainStyle(){
 const href=new URL('./blog-company-brain.css?v=20261106',import.meta.url).href;
 let link=[...document.querySelectorAll('link[rel="stylesheet"]')].find(item=>item.href===href);
 if(link?.sheet)return Promise.resolve();
 const fresh=!link;if(!link){link=document.createElement('link');link.rel='stylesheet';link.href=href;}
 return new Promise((resolve,reject)=>{link.addEventListener('load',resolve,{once:true});link.addEventListener('error',()=>{link.remove();reject(new Error('Company brain stylesheet could not be loaded'));},{once:true});if(fresh)document.head.append(link);});
}

export function createCompanyBrains({lang,signal}){
 const blocks=new Map();
 const t=lang==='fa'?{role:'چه کسی سؤال می‌پرسد؟',time:'کدام مقطع را ببینیم؟',question:'آیا مشتری می‌تواند بدون هماهنگی کالا را مرجوع کند؟',answer:'پاسخ بر پایهٔ سند مجاز',insufficient:'برای این نقش، سند مجاز و تأییدشدهٔ کافی نداریم. از مسئول پشتیبانی بپرس؛ جواب نقش دیگر را حدس نزن.',conflict:'دو سند معتبر با هم تعارض دارند. پیش از پاسخ قطعی، مسئول قانون باید تعارض را حل کند.',source:'منبع پاسخ',owner:'مسئول محتوا',from:'معتبر از',until:'پایان اعتبار از',published:'تاریخ ثبت',approved:'تأییدشده',unreviewed:'تأییدنشده',future:'هنوز اجرا نمی‌شود',expired:'در این مقطع منقضی است',evidence:'سندهای قابل مشاهده برای این نقش',why:'چرا تازه‌ترین پیام کافی نیست؟',reason:'پیام تازه ممکن است یک سؤال، برداشت یا ادعای تأییدنشده باشد. تازگی به‌تنهایی آن را جایگزین قانون معتبر نمی‌کند.',required:'سه شرط پایه؛ همه لازم‌اند',extra:'شرط‌های تکمیلی؛ دست‌کم یکی لازم است',pass:'انتخاب‌هایت با آزمون پیشنهادی نویسنده جور است؛ این نتیجه، تأیید امنیت یا کیفیت پاسخ‌ها نیست.',pending:'اول این بخش را بررسی کن',needExtra:'پایه‌ها را انتخاب کرده‌ای؛ هنوز باید دست‌کم یکی از دو قابلیت تکمیلی را در عمل بررسی کنی.'}:{role:'Who is asking?',time:'Which point in the example?',question:'Can a customer return an item without arranging it first?',answer:'Answer grounded in an allowed document',insufficient:'This role has no sufficient approved source for the policy. Ask the support owner rather than guessing another role’s answer.',conflict:'Approved sources disagree. The policy owner needs to resolve the conflict before a definitive answer.',source:'Answer source',owner:'Content owner',from:'Valid from',until:'No longer valid from',published:'Recorded',approved:'Approved',unreviewed:'Unreviewed',future:'Not yet in effect',expired:'Expired at this point',evidence:'Documents visible to this role',why:'Why is the latest message insufficient?',reason:'A newer message may be a question, interpretation or unreviewed claim. Recency alone does not replace a valid policy.',required:'Three foundations; all are required',extra:'Additional capabilities; at least one is required',pass:'Your choices meet the author’s proposed test. This does not certify security or answer quality.',pending:'Check this first',needExtra:'The foundations are selected. You still need to verify at least one additional capability in practice.'};
 const date=value=>new Intl.DateTimeFormat(lang,{dateStyle:'medium',timeZone:'UTC'}).format(new Date(value+'T12:00:00Z'));
 const view=(block,role,snapshot,widgetId)=>{
  const result=contextAnswer(block,role,snapshot),answer=result.answer;
  return `<section class="brain-answer"><span>${t.answer}</span><h4>${t.question}</h4><p>${esc(answer?answer[lang].text:t[result.status])}</p>${answer?`<a data-brain-cite="${esc(answer.id)}" href="#${widgetId}-doc-${esc(answer.id)}">${t.source}: ${esc(answer[lang].title)}</a>`:''}</section><h4 class="brain-ledger-title">${t.evidence}</h4><div class="brain-ledger">${result.documents.map(doc=>`<details id="${widgetId}-doc-${esc(doc.id)}"><summary><strong>${esc(doc[lang].title)}</strong><span>${esc(t[doc.state])}${doc.current?'':` · ${t[doc.validity]}`}</span></summary><p>${esc(doc[lang].text)}</p><dl><div><dt>${t.owner}</dt><dd>${esc(doc[lang].owner)}</dd></div><div><dt>${t.published}</dt><dd>${esc(date(doc.published))}</dd></div><div><dt>${t.from}</dt><dd>${esc(date(doc.validFrom))}</dd></div>${doc.validUntil?`<div><dt>${t.until}</dt><dd>${esc(date(doc.validUntil))}</dd></div>`:''}</dl></details>`).join('')}</div><details class="brain-recency"><summary>${t.why}</summary><p>${t.reason}</p></details>`;
 };
 const checks=(block,checked)=>{
  const result=brainReadiness(block,checked);
  return result.passes?`<p>${t.pass}</p>`:result.missing.length?`<strong>${t.pending}</strong><p>${esc(result.missing[0][lang].next)}</p>`:`<p>${t.needExtra}</p>`;
 };
 return {
  render(block,id){
   if(block.type==='context-lab'&&validContextLab(block)){
    blocks.set(id,block);
    const role=block.roles.find(row=>row.id!=='guest').id,snapshot=block.snapshots.at(-1).id;
    return `<figure class="context-lab company-brain-widget" data-context-lab="${id}" aria-labelledby="${id}-title"><figcaption><h3 id="${id}-title">${esc(block[lang].title)}</h3><p>${esc(block[lang].hint)}</p></figcaption><div class="brain-controls"><label>${t.role}<select data-brain-role aria-controls="${id}-result">${block.roles.map(row=>`<option value="${esc(row.id)}" ${row.id===role?'selected':''}>${esc(row[lang].label)}</option>`).join('')}</select></label><label>${t.time}<select data-brain-time aria-controls="${id}-result">${block.snapshots.map(row=>`<option value="${esc(row.id)}" ${row.id===snapshot?'selected':''}>${esc(row[lang].label)}</option>`).join('')}</select></label></div><div data-brain-result id="${id}-result" aria-live="polite" aria-atomic="true">${view(block,role,snapshot,id)}</div><p class="brain-method">${esc(block[lang].note)}</p></figure>`;
   }
   if(block.type==='brain-check'&&validBrainCheck(block)){
    blocks.set(id,block);
    return `<section class="brain-check company-brain-widget" data-brain-check="${id}" aria-labelledby="${id}-title"><h3 id="${id}-title">${esc(block[lang].title)}</h3><p>${esc(block[lang].hint)}</p>${[true,false].map(required=>`<fieldset><legend>${required?t.required:t.extra}</legend>${block.criteria.filter(row=>row.required===required).map(row=>`<label><input type="checkbox" value="${esc(row.id)}" aria-controls="${id}-result"><span>${esc(row[lang].label)}</span></label>`).join('')}</fieldset>`).join('')}<div data-brain-check-result id="${id}-result" role="status" aria-live="polite" aria-atomic="true">${checks(block,[])}</div><p class="brain-method">${esc(block[lang].note)}</p></section>`;
   }
   return '';
  },
  mount(root){
   root.addEventListener('click',event=>{
    const link=event.target.closest('[data-brain-cite]');if(!link)return;
    const element=link.closest('[data-context-lab]');if(!element)return;
    const record=element.querySelector(`#${element.dataset.contextLab}-doc-${link.dataset.brainCite}`);
    if(record){record.open=true;record.querySelector('summary').focus();}
   },{signal});
   root.addEventListener('change',event=>{
    if(event.target.matches('[data-brain-role],[data-brain-time]')){
     const element=event.target.closest('[data-context-lab]'),block=blocks.get(element?.dataset.contextLab);
     if(block)element.querySelector('[data-brain-result]').innerHTML=view(block,element.querySelector('[data-brain-role]').value,element.querySelector('[data-brain-time]').value,element.dataset.contextLab);
    }else if(event.target.matches('[data-brain-check] input')){
     const element=event.target.closest('[data-brain-check]'),block=blocks.get(element?.dataset.brainCheck);
     if(block)element.querySelector('[data-brain-check-result]').innerHTML=checks(block,[...element.querySelectorAll('input:checked')].map(input=>input.value));
    }
   },{signal});
  }
 };
}
