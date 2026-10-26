import * as k from '../assets/anatomy/iso-kit.mjs';
import { soloCapacity } from './solo-model.mjs';

export const WIDTH = 680, HEIGHT = 410;
const BASE = { x: -165, y: -67, w: 330, d: 134, r: 8 };
export const projection = k.fitProjection([...k.boxCorners(BASE, -15, 0), [0, 0, 98]], WIDTH, HEIGHT, { pad: 36, azimuth: 52, elevation: 30 });
const at = point => k.iso(point, projection);
const line = (path, options) => k.lineSvg(path, options);
const dots = points => k.dotsSvg(points.map(at), { size: 0.48, tone: 'mid' });
// Retain one geometry version per named part, including across language remounts.
// Unchanged structure should not be tessellated again during a short input ease.
const svgCache = new Map();
function cachedSvg(name, values, build) {
  const key = JSON.stringify(values), cached = svgCache.get(name);
  if (cached?.key === key) return cached.svg;
  const svg = build();
  svgCache.set(name, { key, svg });
  return svg;
}

// Every drawn solid keeps its real shape for the separate Node geometry audit.
export function workbenchScene(input) {
  const model = soloCapacity(input);
  if (!model) throw new Error('Invalid workbench model input.');
  const parts = [];
  function slab(name, plan, z, h, options = {}) {
    const inner = options.inner || '';
    const svg = cachedSvg(name, [plan, z, h, options], () => k.solidSvg(k.slabOf(plan, z, h, projection, 8, Math.min(0.8, h / 5)), { tone: 'mid', ...options, inner }));
    parts.push({ name, kind: 'slab', plan, z, h, at: [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2], svg });
  }
  function cylinder(name, x, y, r, z, h, options = {}) {
    const svg = cachedSvg(name, [x, y, r, z, h, options], () => k.solidSvg(k.cylinder(x, y, r, z, h, projection, 56, Math.min(0.5, h / 5)), { tone: 'mid', ...options }));
    parts.push({ name, kind: 'cylinder', x, y, r, z, h, at: [x, y, z + h / 2], svg });
  }
  for (const [index, [x, y]] of k.corners(BASE, 18).entries()) {
    cylinder(`stand.foot-${index}`, x, y, 7, -15, 2, { tone: 'lo' });
    cylinder(`foot-${index}-stem`, x, y, 5.3, -13, 4, { tone: 'lo' });
  }
  slab('stand.base', BASE, -9, 9, {
    tone: 'lo', inner: line(k.planOutline(k.insetPlan(BASE, 5), 0, projection), { tone: 'faint' }) +
      dots(k.corners(BASE, 10).map(([x, y]) => [x, y, 0]))
  });
  function tray(name, x, count) {
    const floor = { x, y: -34, w: 64, d: 68, r: 2 };
    slab(`${name}-floor`, floor, 0, 3);
    slab(`${name}-left`, { x, y: -34, w: 2, d: 68, r: 0.6 }, 3, 5);
    slab(`${name}-right`, { x: x + 62, y: -34, w: 2, d: 68, r: 0.6 }, 3, 5);
    slab(`${name}-back`, { x: x + 2, y: -34, w: 60, d: 2, r: 0.4 }, 3, 5);
    for (let index = 0; index < count; index++) {
      const paper = { x: x + 5, y: -29, w: 54, d: 58, r: 0.8 };
      const z = 3 + index * 0.8;
      const rules = index === count - 1 ? [10, 16, 22].map((y, i) => line(k.lineOnTop([x + 14, -29 + y], [x + 46 - i * 5, -29 + y], z + 0.8, projection), { tone: 'lo', free: true })).join('') : '';
      slab(`${name}-paper-${index}`, paper, z, 0.8, { tone: 'hi', crease: 'faint', inner: rules });
    }
  }
  tray('input', -147, model.orders);
  tray('output', 87, model.completed);
  const strip = { x: -145, y: 42, w: 60, d: 6, r: 1 };
  const ticks = k.topTicks(-142, -88, 3, 5, 42.5, 0.7, [2, 4], projection);
  slab('feed-ruler', strip, 0, 0.7, { tone: 'lo', inner: line(ticks.minor, { tone: 'lo' }) + line(ticks.major, { tone: 'mid' }) });
  const label = { x: 111, y: 43, w: 34, d: 12, r: 1 };
  slab('nameplate', label, 0, 0.8, { tone: 'lo', inner: dots([[114, 49, 0.8], [142, 49, 0.8]]) + [3, 6, 9].map((y, i) => line(k.lineOnTop([118, 43 + y], [138 - i * 2, 43 + y], 0.8, projection), { tone: 'lo', free: true })).join('') });
  slab('press-bed', { x: -50, y: -28, w: 100, d: 56, r: 3 }, 0, 5, { inner: dots([[-45, -23, 5], [45, -23, 5], [-45, 23, 5], [45, 23, 5]]) });
  for (const x of [-41, 41]) for (const y of [-19, 19]) {
    const id = `pillar-${x}-${y}`;
    cylinder(`${id}-foot`, x, y, 5, 5, 3);
    cylinder(id, x, y, 3.6, 8, 61, { crease: 'none' });
    cylinder(`${id}-cap`, x, y, 5, 69, 3);
  }
  slab('crosshead', { x: -48, y: -26, w: 96, d: 52, r: 3 }, 72, 8, {
    inner: dots([[-41, -19, 80], [41, -19, 80], [-41, 19, 80], [41, 19, 80]]) +
      line(k.planOutline({ x: -43, y: -21, w: 86, d: 42, r: 2 }, 80, projection), { tone: 'faint' })
  });
  cylinder('handwheel-seat', 0, 0, 10, 80, 3);
  cylinder('handwheel-stem', 0, 0, 3, 83, 4);
  const angle = model.automation / 90 * Math.PI * 1.5;
  cylinder('handwheel', 0, 0, 10, 87, 5, {
    tone: 'hi', inner: line(k.knurl(0, 0, 10, 87, 92, 48, projection), { tone: 'lo' }) +
      line(k.lineOnTop([0, 0], [Math.cos(angle) * 8, Math.sin(angle) * 8], 92, projection), { tone: 'hi', free: true }) + dots([[0, 0, 92]])
  });
  const headZ = 28 + model.preparationMinutes / 75 * 20;
  slab('preparation-head', { x: -28, y: -17, w: 56, d: 34, r: 2 }, headZ, 5, {
    tone: 'hi', inner: dots([[-23, -12, headZ + 5], [23, -12, headZ + 5], [-23, 12, headZ + 5], [23, 12, headZ + 5]])
  });
  cylinder('press-shaft', 0, 0, 3, headZ + 5, 72 - headZ - 5, { tone: 'hi', crease: 'none' });
  const gauge = [29, 49], radius = 15;
  cylinder('gauge-foot', ...gauge, 8, 0, 3);
  cylinder('gauge-post', ...gauge, 3, 3, 20);
  cylinder('gauge-body', ...gauge, radius, 23, 5, {
    inner: line(k.knurl(...gauge, radius, 24, 28, 64, projection), { tone: 'lo' })
  });
  const dialTicks = k.radialTicks(...gauge, 11.3, 40, 5, 28.6, [1.2, 2.7], projection);
  const load = model.loadPercent === null ? 1.5 : Math.min(1.5, model.loadPercent / 100);
  const needle = -Math.PI * 0.75 + load / 1.5 * Math.PI * 1.5;
  cylinder('gauge-face', ...gauge, 12.2, 28, 0.6, {
    tone: 'hi', inner: line(dialTicks.minor, { tone: 'lo' }) + line(dialTicks.major, { tone: 'mid' }) +
      line(k.lineOnTop([gauge[0] - Math.sin(needle) * 2, gauge[1] + Math.cos(needle) * 2], [gauge[0] + Math.sin(needle) * 9.8, gauge[1] - Math.cos(needle) * 9.8], 28.6, projection), { tone: 'lit', free: true, className: 'workbench-needle' })
  });
  cylinder('gauge-hub', ...gauge, 1.4, 28.6, 0.8, { tone: 'hi' });
  return { model, parts };
}

export function renderWorkbench(input, label, order) {
  const { parts } = workbenchScene(input);
  const indices = new Map(order.map((name, index) => [name, index]));
  for (const part of parts) if (!indices.has(part.name)) throw new Error(`Workbench order needs rebuilding: ${part.name}`);
  const body = [`<path class="iso-halo" d="${k.haloOf(BASE, -15, 9, projection)}"/>`,
    ...parts.sort((a, b) => indices.get(a.name) - indices.get(b.name)).map(part => `<g data-bench-part="${part.name}">${part.svg}</g>`)];
  return k.figureSvg({ width: WIDTH, height: HEIGHT, label, body });
}
