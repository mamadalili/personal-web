import { escapeHTML as esc } from './blog-core.mjs';
import { validateWorkflowBlock, workflowProjection } from './blog-workflow-model.mjs';

export function createWorkflowWidgets({lang,signal}){
  const blocks=new Map(),state=new Map();
  const t=lang==='fa'?{
    all:'همهٔ کارها',input:'ورودی',output:'خروجی',check:'بازبینی انسانی',rule:'قاعدهٔ کنترل',cadence:'زمان اجرا',before:'از این کار می‌گیرد',after:'به این کار می‌دهد',start:'نقطهٔ شروع',end:'ادامه‌ای در این نقشه ندارد',arrow:'←'
  }:{
    all:'All work',input:'Input',output:'Output',check:'Human review',rule:'Control rule',cadence:'Cadence',before:'Depends on',after:'Feeds into',start:'Starting point',end:'No later step in this map',arrow:'→'
  };
  const jobTitle=(block,id)=>block.jobs.find(job=>job.id===id)?.[lang].title||'';
  const view=(block,id)=>{
    const current=state.get(id),projection=workflowProjection(block,current.stage,current.selected);
    if(!projection)return '';
    current.selected=projection.selected;
    const job=block.jobs.find(item=>item.id===projection.selected);
    const stageOf=stageId=>block.stages.find(stage=>stage.id===stageId)?.[lang]||'';
    return `<div class="workflow-filter" role="group" aria-label="${esc(block[lang].title)}">${[{id:'all',[lang]:t.all},...block.stages].map(stage=>`<button type="button" data-workflow-stage="${esc(stage.id)}" data-workflow-for="${esc(id)}" aria-pressed="${stage.id===current.stage}">${esc(stage[lang])}</button>`).join('')}</div>
      <div class="workflow-layout"><div class="workflow-nodes" aria-label="${esc(block[lang].hint)}">${block.jobs.filter(item=>projection.visible.includes(item.id)).map(item=>`<button type="button" class="workflow-node" data-workflow-job="${esc(item.id)}" data-workflow-for="${esc(id)}" aria-pressed="${item.id===projection.selected}"><small>${esc(stageOf(item.stage))} · ${esc(item[lang].cadence)}</small><strong>${esc(item[lang].title)}</strong><span>${esc(item[lang].output)}</span></button>`).join('')}</div>
      <section class="workflow-detail" aria-live="polite"><span class="workflow-kicker">${esc(stageOf(job.stage))}</span><h4>${esc(job[lang].title)}</h4><div class="workflow-path" aria-label="${esc(`${t.before} / ${t.after}`)}"><span>${esc(projection.before.length?projection.before.map(dep=>jobTitle(block,dep)).join(' + '):t.start)}</span><b aria-hidden="true">${t.arrow}</b><strong>${esc(job[lang].title)}</strong><b aria-hidden="true">${t.arrow}</b><span>${esc(projection.after.length?projection.after.map(dep=>jobTitle(block,dep)).join(' + '):t.end)}</span></div><dl><div><dt>${t.input}</dt><dd>${esc(job[lang].input)}</dd></div><div><dt>${t.output}</dt><dd>${esc(job[lang].output)}</dd></div><div><dt>${t.cadence}</dt><dd>${esc(job[lang].cadence)}</dd></div><div class="workflow-human"><dt>${job.gate==='human'?t.check:t.rule}</dt><dd>${esc(job[lang].check)}</dd></div></dl></section></div>`;
  };
  return {
    render(block,id){
      if(!validateWorkflowBlock(block))return '';
      blocks.set(id,block);state.set(id,{stage:'all',selected:block.jobs[0].id});
      return `<figure class="article-workflow" data-workflow="${esc(id)}"><figcaption><span class="workflow-label">${lang==='fa'?'نقشهٔ کار':'WORKFLOW MAP'}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].hint)}</p></figcaption><div class="workflow-body">${view(block,id)}</div><p class="workflow-source">${esc(block[lang].source)}</p></figure>`;
    },
    mount(root){
      root.addEventListener('click',event=>{
        const button=event.target.closest('[data-workflow-stage],[data-workflow-job]');
        if(!button||!root.contains(button))return;
        const id=button.dataset.workflowFor,block=blocks.get(id),current=state.get(id);
        if(!block||!current)return;
        if(button.dataset.workflowStage)current.stage=button.dataset.workflowStage;
        if(button.dataset.workflowJob)current.selected=button.dataset.workflowJob;
        const figure=root.querySelector(`[data-workflow="${id}"]`);
        figure.querySelector('.workflow-body').innerHTML=view(block,id);
        const selector=button.dataset.workflowStage?`[data-workflow-stage="${current.stage}"]`:`[data-workflow-job="${current.selected}"]`;
        figure.querySelector(selector)?.focus();
      },{signal});
    }
  };
}
