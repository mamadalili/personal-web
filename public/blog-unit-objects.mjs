import { escapeHTML as esc } from './blog-core.mjs';
import { unitObjectLayout, unitObjectFrame } from './blog-data-motion-model.mjs?v=20261102-unit-objects';

const copy = {
  fa: { unit: 'هر قطعه = یک دقیقه', work: 'زمانِ همان کار', difference: 'اختلاف دو زمان', before: 'پیش از تغییر', moving: 'بازچینی قطعه‌ها برای مقایسه', after: 'پس از تغییر', minutes: 'دقیقه', table: 'عددهای این مقایسه', note: 'جابه‌جایی قطعه‌ها اختلاف دو زمان گزارش‌شده را نشان می‌دهد. مسیر واقعی اجرای کار، دقیقه‌به‌دقیقه ثبت نشده است.' },
  en: { unit: 'Each tile = one minute', work: 'Time for the same task', difference: 'Difference in time', before: 'Before the change', moving: 'Regrouping the tiles for comparison', after: 'After the change', minutes: 'minutes', table: 'The comparison in numbers', note: 'Moving the minute tiles explains the difference between the two reported durations. The interview does not track the actual work minute by minute.' }
};
const number = (n, lang) => new Intl.NumberFormat(lang).format(n);
const trayPath = (center, rtl, offset = 0, width = 640) => {
  const x = value => rtl ? width - value : value;
  return `M${x(center - 127)} ${158 + offset} L${x(center - 5)} ${86 + offset} L${x(center + 127)} ${148 + offset} L${x(center + 5)} ${220 + offset}Z`;
};
const phaseText = (model, lang, state) => {
  const t = copy[lang];
  if (state === 'moving') return t.moving;
  const row = model.rows[state === 'before' ? 0 : 1];
  const detail = `${t[state]}: ${number(row.value, lang)} ${t.minutes}`;
  if (state === 'before') return detail;
  const difference = number(model.rows[0].value - model.rows[1].value, lang);
  return lang === 'fa' ? `${detail}، با ${difference} دقیقه اختلاف` : `${detail}, a difference of ${difference} minutes`;
};

export function renderUnitObjects(model, lang) {
  const objects = unitObjectLayout(model);
  if (!objects.length) return '';
  const rtl = lang === 'fa', t = copy[lang], frame = unitObjectFrame(objects, 1, { rtl });
  const x = value => rtl ? 640 - value : value;
  const tray = center => `<path class="dm-object-tray" data-dm-tray d="${trayPath(center, rtl)}"/>`;
  const tile = 'M0-5 4.7-2.5 0 0-4.7-2.5Z';
  const sorted = frame.map((point, index) => ({ ...point, index })).sort((a, b) => a.y - b.y || a.x - b.x);
  return `<div class="dm-object-scene" data-dm-object-scene>
    <p class="dm-object-key"><span aria-hidden="true"></span>${t.unit}</p>
    <svg class="dm-object-plot" viewBox="0 65 640 168" width="640" height="168" aria-hidden="true" focusable="false">
      ${tray(170)}${tray(460)}
      <path class="dm-object-connection" d="M${x(286)} 165H${x(327)}"/>
      <g data-dm-object-layer>${sorted.map(point => `<g class="dm-object dm-object--${point.group}" data-dm-object="${point.index}" transform="translate(${point.x} ${point.y})"><path class="dm-object-shadow" d="M0-1 6 2 0 5-6 2Z"/><path class="dm-object-front" d="M-4.7-2.5 0 0 0 5-4.7 2.5Z"/><path class="dm-object-side" d="M0 0 4.7-2.5 4.7 2.5 0 5Z"/><path class="dm-object-top" d="${tile}"/></g>`).join('')}</g>
      <g class="dm-object-stacked-labels" style="display:none"><text x="170" y="243">${t.work}</text><text x="170" y="433">${t.difference}</text></g>
    </svg>
    <div class="dm-object-pool-labels" aria-hidden="true"><span>${t.work}</span><span>${t.difference}</span></div>
    <p class="dm-object-phase" data-dm-object-phase>${phaseText(model, lang, 'after')}</p>
    <dl class="dm-object-numbers" aria-label="${t.table}"><div><dt>${esc(model.rows[0][lang].label)}</dt><dd>${number(model.rows[0].value, lang)} <small>${t.minutes}</small></dd></div><div><dt>${esc(model.rows[1][lang].label)}</dt><dd>${number(model.rows[1].value, lang)} <small>${t.minutes}</small></dd></div><div><dt>${t.difference}</dt><dd>${number(model.rows[0].value - model.rows[1].value, lang)} <small>${t.minutes}</small></dd></div></dl>
    <p class="dm-object-note">${t.note}</p>
  </div>`;
}

export function mountUnitObjects(figure, model, lang, signal) {
  const objects = unitObjectLayout(model), nodes = [...figure.querySelectorAll('[data-dm-object]')];
  const phase = figure.querySelector('[data-dm-object-phase]');
  if (!objects.length || nodes.length !== objects.length || !phase) return null;
  const layer = figure.querySelector('[data-dm-object-layer]'), plot = figure.querySelector('.dm-object-plot');
  const scene = figure.querySelector('[data-dm-object-scene]');
  const trays = [...plot.querySelectorAll('[data-dm-tray]')];
  const byId = new Map(nodes.map(node => [Number(node.dataset.dmObject), node]));
  let previousPhase, previousOrder = '', stacked = null, lastProgress = 1;
  const draw = progress => {
    lastProgress = progress;
    const frame = unitObjectFrame(objects, progress, { rtl: lang === 'fa', stacked });
    for (const node of nodes) {
      const point = frame[Number(node.dataset.dmObject)];
      node.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
    }
    const order = frame.map((point, index) => ({ ...point, index })).sort((a, b) => a.y - b.y || a.x - b.x).map(point => point.index);
    const orderKey = order.join(',');
    if (orderKey !== previousOrder) {
      layer.append(...order.map(index => byId.get(index)));
      previousOrder = orderKey;
    }
    const state = progress <= 0 ? 'before' : progress >= 0.9 ? 'after' : 'moving';
    if (state !== previousPhase) {
      phase.textContent = phaseText(model, lang, state);
      figure.dataset.objectPhase = state;
      previousPhase = state;
    }
  };
  const updateLayout = () => {
    const next = scene.getBoundingClientRect().width < 400;
    if (next === stacked) return;
    stacked = next;
    plot.setAttribute('viewBox', stacked ? '0 65 340 390' : '0 65 640 168');
    plot.setAttribute('width', stacked ? '340' : '640');
    plot.setAttribute('height', stacked ? '390' : '168');
    trays[0].setAttribute('d', trayPath(170, lang === 'fa', 0, stacked ? 340 : 640));
    trays[1].setAttribute('d', trayPath(stacked ? 170 : 460, lang === 'fa', stacked ? 190 : 0, stacked ? 340 : 640));
    plot.querySelector('.dm-object-connection').setAttribute('d', stacked ? 'M170 250V270' : `M${lang === 'fa' ? 354 : 286} 165H${lang === 'fa' ? 313 : 327}`);
    plot.querySelector('.dm-object-stacked-labels').style.display = stacked ? '' : 'none';
    figure.querySelector('.dm-object-pool-labels').hidden = stacked;
    draw(lastProgress);
  };
  updateLayout();
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(updateLayout);
    observer.observe(scene);
    signal.addEventListener('abort', () => observer.disconnect(), { once: true });
  } else window.addEventListener('resize', updateLayout, { signal });
  return draw;
}
