// An explicit educational workload model, not observed earnings or AI performance.
export function soloCapacity(input) {
  if (!input || typeof input !== 'object') return null;
  const { hours, orders, automation } = input;
  if (![hours, orders, automation].every(value => typeof value === 'number' && Number.isFinite(value))) return null;
  if (hours < 0 || hours > 40 || orders < 0 || orders > 16 || !Number.isInteger(orders) || automation < 0 || automation > 90) return null;
  const preparationMinutes = 75 * (1 - automation / 100);
  const reviewMinutes = 25, communicationMinutes = 20;
  const perOrderMinutes = preparationMinutes + reviewMinutes + communicationMinutes;
  const availableMinutes = hours * 60;
  const requiredMinutes = orders * perOrderMinutes;
  const capacity = Math.floor(availableMinutes / perOrderMinutes);
  const completed = Math.min(orders, capacity);
  return {
    hours, orders, automation, preparationMinutes, reviewMinutes, communicationMinutes,
    perOrderMinutes, availableMinutes, requiredMinutes, capacity, completed,
    pending: orders - completed,
    loadPercent: orders === 0 ? 0 : availableMinutes === 0 ? null : requiredMinutes / availableMinutes * 100,
    unusedMinutes: Math.max(0, availableMinutes - completed * perOrderMinutes),
    savedMinutes: orders * (75 - preparationMinutes)
  };
}

const searchable = value => String(value ?? '').toLocaleLowerCase()
  .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u064b-\u065f\u200c\u200d]/g, '').replace(/\s+/g, ' ').trim();

export function filterOpportunities(items, { group = 'all', query = '', lang = 'fa' } = {}) {
  const language = lang === 'en' ? 'en' : 'fa', needle = searchable(query);
  return items.filter(item => (group === 'all' || item.group === group) &&
    searchable(Object.values(item[language] || {}).join(' ')).includes(needle));
}
