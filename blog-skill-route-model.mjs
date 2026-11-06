const text = value => typeof value === 'string' && value.trim().length > 0;
export function validateSkillRoute(block) {
  if (block?.type !== 'skill-route') return false;
  for (const [group, fields] of [['cores', ['label','depth','proof','output','ai']], ['barriers', ['label','bridge','action','check']]]) {
    const rows = block[group];
    if (!Array.isArray(rows) || rows.length < 2 || rows.length > 8 || new Set(rows.map(row => row?.id)).size !== rows.length) return false;
    if (!rows.every(row => /^[a-z][a-z0-9-]*$/.test(row?.id||'') && ['fa','en'].every(lang => fields.every(key => text(row[lang]?.[key]))))) return false;
  }
  return ['fa','en'].every(lang => ['title','hint','note'].every(key => text(block[lang]?.[key])));
}

export function skillRoute(block, coreId, barrierId) {
  if (!validateSkillRoute(block)) return null;
  const core = block.cores.find(row => row.id === coreId) || block.cores[0];
  const barrier = block.barriers.find(row => row.id === barrierId) || block.barriers[0];
  return {core, barrier};
}

export function skillRouteSheet(block, coreId, barrierId, language, note = '') {
  const route = skillRoute(block, coreId, barrierId);
  if (!route) return '';
  const lang = language === 'en' ? 'en' : 'fa', c = route.core[lang], b = route.barrier[lang];
  const labels = lang === 'fa' ? ['مهارت پایه','شاهد فعلی','گیر کار','مهارت مکمل','اقدام بعدی','خروجی کوچک','روش بررسی','کمک AI','یادداشت من'] : ['Core skill','Current evidence','Bottleneck','Complementary skill','Next action','Small deliverable','Review','AI assistance','My note'];
  const values = [c.label,c.proof,b.label,b.bridge,b.action,c.output,b.check,c.ai,String(note).slice(0,1200)];
  return `${block[lang].title}\n\n${labels.map((label,index) => `${label}:\n${values[index]}`).join('\n\n')}\n\n${block[lang].note}\n`;
}
