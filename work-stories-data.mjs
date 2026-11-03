// Stable work-story slots. Visible text comes from the shared career records in portfolio.js.
// Unsupported story fields remain null and render as "نیازمند تکمیل" / "Needs completion".
const topicIds={
  boomerang:['online-sales','store','four-languages','channels','ai-operations'],
  turbin:['launch','team','marketplaces','content','after-sales'],
  can:['strategy','budget','channels','exhibitions','sales-network'],
  datis:['question','fieldwork','online-data','products','decisions'],
  binici:['dashboard','demand','budget','products','marketing'],
  'safir-lead':['regions','customer-voice','cinema','tour','services'],
  'safir-field':['counters','promoters','organisations','leads','follow-up'],
  asiatech:['installation','diagnosis','explanation','support','learning']
};
const topics=(role,ids)=>ids.map((id,index)=>({id:role+'-'+id,post:null,sourceIndex:index}));
const visibleCounts={boomerang:5,turbin:4,can:4,datis:3,binici:3,'safir-lead':3,'safir-field':3,asiatech:3};

export const workStoryTopics=Object.fromEntries(Object.entries(topicIds).map(([role,ids])=>[role,topics(role,ids)]));
export function visibleWorkStories(roleId){
  return Object.hasOwn(workStoryTopics,roleId)?workStoryTopics[roleId].slice(0,visibleCounts[roleId]??3):[];
}
export const workRoleNarratives=Object.fromEntries(Object.keys(topicIds).map(role=>[role,{
  fa:{situation:null,result:null,learning:null},
  en:{situation:null,result:null,learning:null}
}]));
