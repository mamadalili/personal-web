const idPattern=/^[a-z][a-z0-9-]*$/;
const hasText=value=>typeof value==='string'&&value.trim().length>0;

export function validateWorkflowBlock(block){
  if(block?.type!=='workflow'||!Array.isArray(block.stages)||!block.stages.length||!Array.isArray(block.jobs)||!block.jobs.length)return false;
  if(!['fa','en'].every(lang=>hasText(block[lang]?.title)&&hasText(block[lang]?.hint)&&hasText(block[lang]?.source)))return false;
  const stages=new Set();
  for(const stage of block.stages){
    if(!idPattern.test(stage.id||'')||stages.has(stage.id)||!hasText(stage.fa)||!hasText(stage.en))return false;
    stages.add(stage.id);
  }
  const ids=new Set();
  for(const job of block.jobs){
    if(!idPattern.test(job.id||'')||ids.has(job.id)||!stages.has(job.stage)||!Array.isArray(job.dependsOn)||!hasText(job.cadence)||!['human','none'].includes(job.gate))return false;
    if(!['fa','en'].every(lang=>['title','input','output','check','cadence'].every(key=>hasText(job[lang]?.[key]))))return false;
    ids.add(job.id);
  }
  if(block.jobs.some(job=>job.dependsOn.some(id=>!ids.has(id)||id===job.id)))return false;
  const byId=new Map(block.jobs.map(job=>[job.id,job]));
  const seen=new Set(),active=new Set();
  const visit=id=>{
    if(active.has(id))return false;
    if(seen.has(id))return true;
    active.add(id);
    if(!byId.get(id).dependsOn.every(visit))return false;
    active.delete(id);seen.add(id);return true;
  };
  return block.jobs.every(job=>visit(job.id));
}

export function workflowProjection(block,stage='all',selectedId){
  if(!validateWorkflowBlock(block))return null;
  const visible=block.jobs.filter(job=>stage==='all'||job.stage===stage).map(job=>job.id);
  const selected=visible.includes(selectedId)?selectedId:visible[0]||null;
  const job=block.jobs.find(item=>item.id===selected);
  return {visible,selected,before:job?.dependsOn||[],after:job?block.jobs.filter(item=>item.dependsOn.includes(job.id)).map(item=>item.id):[]};
}
