// Financial values use USD billions; training observations use USD.
const positive = value => typeof value === 'number' && Number.isFinite(value) && value > 0;
export function logFraction(value, min, max) {
  if (!positive(value) || !positive(min) || !positive(max) || max <= min) return null;
  return Math.min(1, Math.max(0, Math.log(value / min) / Math.log(max / min)));
}
export function valuationMultiple(row) {
  if (!positive(row.revenue) || !positive(row.valuation)) return null;
  return { value: row.valuation / row.revenue, bound: row.revenueBound === '>' ? '<' : row.revenueBound === '<' ? '>' : '' };
}
export function capitalPoints(rows) {
  return rows.flatMap(row => {
    const round = row.round;
    if (!round || !positive(round.amount) || !positive(round.revenue) || !positive(round.valuation)) return [];
    return [{ id: row.id, ...round, x: logFraction(round.amount, 0.1, 200), y: logFraction(round.revenue, 0.1, 200) }];
  });
}

// Equirectangular world locator: bubbles encode country affiliation counts, not model sites.
export function geographyMarker(row) {
  const {lon,lat,value}=row;
  if (![lon,lat,value].every(Number.isFinite) || lon < -180 || lon > 180 || lat < -90 || lat > 90 || value <= 0) return null;
  return {x:(lon+180)/360*1000,y:(90-lat)/180*500,r:8+Math.sqrt(value)*2.2};
}
