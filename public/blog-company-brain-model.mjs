const native=(row,keys)=>['fa','en'].every(lang=>keys.every(key=>typeof row?.[lang]?.[key]==='string'&&row[lang][key].trim()));
const ids=rows=>Array.isArray(rows)&&rows.length>0&&rows.every(row=>/^[a-z][a-z0-9-]*$/.test(row?.id||''))&&new Set(rows.map(row=>row.id)).size===rows.length;
const day=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;

export function validContextLab(block){
 if(block?.type!=='context-lab'||!ids(block.roles)||!ids(block.snapshots)||!ids(block.documents))return false;
 if(!block.roles.some(row=>row.id==='guest')||!block.roles.some(row=>row.id!=='guest')||!block.roles.every(row=>native(row,['label']))||!block.snapshots.every(row=>day(row.date)&&native(row,['label'])))return false;
 return native(block,['title','hint','note'])&&block.documents.every(row=>['policy','chat','finance','public'].includes(row.kind)&&['approved','unreviewed'].includes(row.state)&&day(row.published)&&day(row.validFrom)&&(!row.validUntil||(day(row.validUntil)&&row.validUntil>row.validFrom))&&Array.isArray(row.roles)&&row.roles.length>0&&row.roles.every(role=>block.roles.some(r=>r.id===role))&&native(row,['title','text','owner'])&&(row.kind!=='policy'||(typeof row.claim==='string'&&row.claim.trim().length>0)));
}

export function contextAnswer(block,roleId,snapshotId){
 if(!validContextLab(block))return null;
 const role=block.roles.find(row=>row.id===roleId)||block.roles.find(row=>row.id==='guest');
 const snapshot=block.snapshots.find(row=>row.id===snapshotId)||block.snapshots.at(-1);
 const documents=block.documents.filter(row=>row.roles.includes(role.id)&&row.published<=snapshot.date).map(row=>({...row,current:row.validFrom<=snapshot.date&&(!row.validUntil||snapshot.date<row.validUntil),validity:row.validFrom>snapshot.date?'future':row.validUntil&&snapshot.date>=row.validUntil?'expired':'current'}));
 const policies=documents.filter(row=>row.kind==='policy'&&row.state==='approved'&&row.current);
 const claims=new Set(policies.map(row=>row.claim));
 return {role,snapshot,documents,answer:claims.size===1?policies.sort((a,b)=>b.validFrom.localeCompare(a.validFrom))[0]:null,status:claims.size>1?'conflict':claims.size===1?'supported':'insufficient'};
}

export function validBrainCheck(block){
 return block?.type==='brain-check'&&ids(block.criteria)&&block.criteria.some(row=>row.required===true)&&block.criteria.some(row=>row.required===false)&&block.criteria.every(row=>typeof row.required==='boolean'&&native(row,['label','next']))&&native(block,['title','hint','note']);
}

export function brainReadiness(block,checked){
 if(!validBrainCheck(block))return null;
 const selected=new Set(Array.isArray(checked)?checked:[]);
 const missing=block.criteria.filter(row=>row.required&&!selected.has(row.id));
 const extras=block.criteria.filter(row=>!row.required&&selected.has(row.id));
 return {passes:missing.length===0&&extras.length>0,missing,extras,needsExtra:extras.length===0};
}
