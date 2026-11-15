import { escapeHTML as esc } from './blog-core.mjs';

export function pendingEvidence(items,checked){
 const selected=new Set(Array.isArray(checked)?checked:[]);
 return items.filter(item=>!selected.has(item.id));
}

export function createDecisionAudits({lang,signal}){
 const widgets=new Map();
 function render(block,id){
  if(block.type!=='decision-audit')return '';
  widgets.set(id,block);
  return `<section class="decision-audit research-widget" data-decision-audit="${id}"><header><span class="small-label">${lang==='fa'?'بررسی با شاهد':'REVIEW THE EVIDENCE'}</span><h3>${esc(block[lang].title)}</h3><p id="${id}-hint">${esc(block[lang].hint)}</p></header><fieldset aria-describedby="${id}-hint"><legend class="sr-only">${esc(block[lang].title)}</legend>${block.items.map(item=>`<label class="audit-item"><input type="checkbox" value="${esc(item.id)}" aria-controls="${id}-result"><span>${esc(item[lang].label)}</span></label>`).join('')}</fieldset><div class="audit-result" id="${id}-result" role="status" aria-live="polite" aria-atomic="true"></div><button type="button" class="blog-text-button" data-audit-reset>${lang==='fa'?'پاک‌کردن انتخاب‌ها':'Clear selections'}</button><small class="widget-help">${lang==='fa'?'انتخاب‌ها فقط تا وقتی این صفحه باز است باقی می‌مانند.':'Selections last only while this page remains open.'}</small></section>`;
 }
 function mount(root){
  const update=element=>{
   const block=widgets.get(element.dataset.decisionAudit);if(!block)return;
   const checked=[...element.querySelectorAll('input:checked')].map(input=>input.value);
   const pending=pendingEvidence(block.items,checked),result=element.querySelector('.audit-result');
   result.innerHTML=pending.length?`<strong>${lang==='fa'?'قدم بعدی پیشنهادی':'Suggested next step'}</strong><p>${esc(pending[0][lang].next)}</p><details><summary>${lang==='fa'?'همهٔ مواردِ هنوز بررسی‌نشده':'All evidence still to check'}</summary><ul>${pending.map(item=>`<li>${esc(item[lang].next)}</li>`).join('')}</ul></details>`:`<p>${esc(block[lang].complete)}</p>`;
  };
  for(const element of root.querySelectorAll('[data-decision-audit]'))update(element);
  root.addEventListener('change',event=>{const element=event.target.closest('[data-decision-audit]');if(element)update(element);},{signal});
  root.addEventListener('click',event=>{if(!event.target.closest('[data-audit-reset]'))return;const element=event.target.closest('[data-decision-audit]');for(const input of element.querySelectorAll('input'))input.checked=false;update(element);},{signal});
 }
 return {render,mount};
}
