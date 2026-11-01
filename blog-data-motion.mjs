import { escapeHTML as esc } from './blog-core.mjs';
import { validateMotion, valuePosition, comparisonChange, createMotionClock, createReplayTimer } from './blog-data-motion-model.mjs?v=20261101-minute-replay';

const copy = {
  fa: { play: 'حرکت را ببین', pause: 'مکث', replay: 'دوباره ببین', scrub: 'حرکت را جلو و عقب ببر', select: 'انتخاب داده یا مرحله', sources: 'منبع', detail: 'جزئیات انتخاب', input: 'چه چیزی می‌گیرد؟', output: 'چه چیزی تحویل می‌دهد؟', check: 'پیش از تحویل بررسی کن', more: 'بیشتر', less: 'کمتر', difference: 'اختلافِ دو مقدار', same: 'بدون اختلاف', log: 'هر فاصله، ده برابر', playing: 'در حال نمایش؛ عددها همان مقدارهای ثبت‌شده‌اند.', paused: 'نمایش متوقف است؛ داده‌ها قابل انتخاب‌اند.', done: 'نمایش تمام شد. هر مورد را جداگانه هم می‌توانی انتخاب کنی.', reduced: 'کاهش حرکت فعال است؛ داده‌ها ثابت‌اند و انتخاب مرحله همچنان کار می‌کند.', static: 'نمایش ثابت', motionOnly: 'این نوار فقط حرکت را کنترل می‌کند؛ محور زمانِ داده نیست.' },
  en: { play: 'Watch the motion', pause: 'Pause', replay: 'Watch again', scrub: 'Move through the animation', select: 'Choose a record or stage', sources: 'Source', detail: 'Selected detail', input: 'What comes in?', output: 'What is handed over?', check: 'Check before handoff', more: 'more', less: 'less', difference: 'Difference between the two figures', same: 'No difference', log: 'Each interval is tenfold', playing: 'Playing; numbers remain the recorded values.', paused: 'Paused. You can select any record.', done: 'Playback complete. You can also select each item separately.', reduced: 'Reduced motion is enabled. Figures are still; stage selection continues to work.', static: 'Static view', motionOnly: 'This control moves the animation. It is not a data time axis.' }
};
const clamp = n => Math.max(0, Math.min(1, n));
const ease = n => 1 - (1 - clamp(n)) ** 3;
const handoffPosition = (progress, count) => {
  const travel = progress * (count - 1), leg = Math.floor(travel), part = clamp((travel - leg - 0.18) / 0.64);
  return (leg + part * part * (3 - 2 * part)) / (count - 1);
};
const num = (value, lang, digits = 2) => new Intl.NumberFormat(lang, { maximumFractionDigits: digits }).format(value);
const rowValue = (model, row, lang) => model.kind === 'handoff' ? '' : `${num(row.value, lang, model.format === 'usd' ? 0 : 2)}${model.format === 'usd' ? (lang === 'fa' ? ' دلار' : ' USD') : ''}`;

export function renderDataMotion(model, id, lang, sources) {
  if (!validateMotion(model, sources)) return '';
  const t = copy[lang], a = model[lang], selected = model.rows.length - 1;
  const difference = comparisonChange(model);
  const differenceLabel = difference === null ? '' : `${Number.isInteger(difference) ? '' : '≈'}${num(Math.abs(difference), lang, 0)}${lang === 'fa' ? '٪' : '%'}`;
  const sourceIds = [...new Set(model.rows.flatMap(row => row.sourceIds))];
  const axis = model.kind === 'magnitude' ? `<div class="dm-axis" dir="ltr" aria-hidden="true">${[1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9].map(v => {
    const label = v === 1e3 ? (lang === 'fa' ? 'هزار' : '1k') : v === 1e6 ? (lang === 'fa' ? 'میلیون' : '1m') : v === 1e9 ? (lang === 'fa' ? 'میلیارد' : '1bn') : '&nbsp;';
    return `<span style="--at:${valuePosition(v, model) * 100}%">${label}</span>`;
  }).join('')}</div>` : '';
  const route = model.kind === 'handoff' ? `<svg class="dm-route" viewBox="0 0 660 200" width="660" height="200" aria-hidden="true"><path class="dm-route-rail" d="M60 114 H600"/><path class="dm-route-travel" data-dm-travel d="M60 114 H600" pathLength="1"/>${model.rows.map((row, i) => { const x = 60 + i * 540 / (model.rows.length - 1); return `<g data-dm-node="${i}"><circle cx="${x}" cy="114" r="22"/><rect x="${x - 4}" y="110" width="8" height="8" rx="1"/></g>`; }).join('')}<g data-dm-parcel transform="translate(600 44)"><rect x="-25" y="-31" width="50" height="62" rx="7"/><path d="M-13-13H13 M-13-3H13 M-13 7H4"/><circle cy="47" r="5"/></g></svg>` : '';
  const headline = model.kind === 'comparison' ? `<div class="dm-difference"><strong>${difference === 0 ? t.same : `${differenceLabel} <span>${difference > 0 ? t.more : t.less}</span>`}</strong><span>${t.difference}</span></div>` : model.kind === 'magnitude' ? `<div class="dm-log-key"><strong dir="ltr">×${num(10, lang, 0)}</strong><span>${t.log}</span></div>` : '';
  const choices = `<div class="dm-records" role="group" aria-label="${t.select}">${model.rows.map((row, i) => `<button type="button" class="dm-record" data-dm-step="${i}" aria-pressed="${i === selected}" aria-controls="${id}-detail"><span class="dm-record-heading"><span>${esc(row[lang].label)}${row.year ? `<small>${new Intl.NumberFormat(lang, { useGrouping: false }).format(row.year)}</small>` : ''}</span>${model.kind !== 'handoff' ? `<strong dir="auto">${esc(rowValue(model, row, lang))}</strong>` : ''}</span>${model.kind !== 'handoff' ? `<span class="dm-track" aria-hidden="true"><i data-dm-bar="${i}" style="width:${valuePosition(row.value, model) * 100}%"></i></span>` : ''}</button>`).join('')}</div>`;
  const row = model.rows[selected][lang];
  const controls = `<div class="dm-controls"><button type="button" class="dm-replay" data-dm-play aria-label="${t.replay}" title="${t.replay}"><svg data-dm-refresh viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7v5h-5M19.3 12a7.5 7.5 0 1 0-1.8 5"/></svg><svg data-dm-pause hidden viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg></button><label for="${id}-scrub">${t.scrub}<input id="${id}-scrub" type="range" min="0" max="100" step="1" value="100" data-dm-scrub aria-describedby="${id}-motion-note"></label></div><label class="dm-auto"><input type="checkbox" data-dm-auto checked>${lang === 'fa' ? 'تکرار هر دقیقه' : 'Replay every minute'}</label><p class="dm-playback-note" id="${id}-motion-note">${t.motionOnly}</p>`;
  const detail = model.kind !== 'handoff' ? `<strong class="dm-selected-value" data-dm-value>${esc(rowValue(model, model.rows[selected], lang))}</strong><p data-dm-description>${esc(row.detail)}</p>` : `<dl><div><dt>${t.input}</dt><dd data-dm-input>${esc(row.input)}</dd></div><div><dt>${t.output}</dt><dd data-dm-output>${esc(row.output)}</dd></div></dl><p class="dm-check"><strong>${t.check}</strong><span data-dm-check>${esc(row.check)}</span></p>`;
  const sourceLinks = sourceIds.map(sourceId => {
    const source = sources.find(s => s.id === sourceId);
    return `<a href="#source-${esc(sourceId)}">${t.sources}: ${esc(source[lang]?.title || source.publisher)}</a>`;
  }).join('');
  return `<figure class="data-motion dm--${model.kind}" data-data-motion="${esc(id)}">
    <figcaption><p class="dm-intro">${esc(a.intro)}</p><p class="dm-evidence">${esc(a.evidence)}</p></figcaption>
    <div class="dm-composition">
      <div class="dm-stage"><p class="dm-unit">${esc(a.unit)}</p>${headline}${route}${axis}${choices}${controls}</div>
      <div class="dm-detail" id="${id}-detail"><span class="dm-detail-label">${t.detail}</span><h3 data-dm-title>${esc(row.label)}</h3>${detail}</div>
    </div>
    <p class="dm-state" data-dm-state>${t.done}</p><p class="visually-hidden" data-dm-announcement role="status" aria-live="polite"></p>
    <div class="dm-footnote"><p>${esc(a.note)}</p><div class="dm-source-links">${sourceLinks}</div></div>
  </figure>`;
}

export function createDataMotionWidgets({ lang, article, signal }) {
  const models = new Map();
  return {
    render(block, id) {
      const html = renderDataMotion(block.model, id, lang, article.sources);
      if (html) models.set(id, block.model);
      return html;
    },
    mount(root) {
      for (const figure of root.querySelectorAll('[data-data-motion]')) {
        const model = models.get(figure.dataset.dataMotion);
        if (!model || signal.aborted) continue;
        const t = copy[lang], media = matchMedia('(prefers-reduced-motion: reduce)');
        const buttons = [...figure.querySelectorAll('[data-dm-step]')];
        const bars = [...figure.querySelectorAll('[data-dm-bar]')];
        const play = figure.querySelector('[data-dm-play]'), scrub = figure.querySelector('[data-dm-scrub]'), automatic = figure.querySelector('[data-dm-auto]');
        let selected = model.rows.length - 1, touched = false, autoPlayed = false;
        const choose = index => {
          selected = index;
          const row = model.rows[index], data = row[lang];
          buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
          figure.querySelector('[data-dm-title]').textContent = data.label;
          if (model.kind === 'handoff') {
            for (const key of ['input', 'output', 'check']) figure.querySelector(`[data-dm-${key}]`).textContent = data[key];
            figure.querySelectorAll('[data-dm-node]').forEach((node, i) => node.classList.toggle('is-current', i === index));
          } else {
            figure.querySelector('[data-dm-value]').textContent = rowValue(model, row, lang);
            figure.querySelector('[data-dm-description]').textContent = data.detail;
          }
        };
        const moveParcel = position => {
          if (model.kind !== 'handoff') return;
          figure.querySelector('[data-dm-parcel]').setAttribute('transform', `translate(${60 + position * 540} 44)`);
          figure.querySelector('[data-dm-travel]').style.strokeDashoffset = 1 - position;
        };
        const clock = createMotionClock({
          duration: model.kind === 'magnitude' ? 4800 : model.kind === 'handoff' ? 4600 : 3400,
          onFrame(progress) {
            const position = model.kind === 'handoff' ? handoffPosition(progress, model.rows.length) : progress;
            const step = model.kind === 'handoff' ? Math.round(position * (model.rows.length - 1)) : Math.min(model.rows.length - 1, Math.floor(progress * model.rows.length));
            if (step !== selected) choose(step);
            const fixed = media.matches;
            bars.forEach((bar, i) => { bar.style.transform = `scaleX(${fixed ? 1 : ease((progress - i * 0.07) / 0.65)})`; });
            moveParcel(fixed ? selected / (model.rows.length - 1) : position);
            scrub.value = Math.round(progress * 100);
            scrub.setAttribute('aria-valuetext', `${model.rows[selected][lang].label} · ${Math.round(progress * 100)}${lang === 'fa' ? '٪ نمایش' : '% of playback'}`);
          },
          onState(state) {
            play.disabled = state.reduced;
            figure.dataset.playing = String(state.running);
            const label = state.reduced ? t.static : state.wanted ? t.pause : state.progress >= 1 ? t.replay : t.play;
            play.setAttribute('aria-label', label); play.title = label;
            play.querySelector('[data-dm-refresh]').toggleAttribute('hidden', state.wanted);
            play.querySelector('[data-dm-pause]').toggleAttribute('hidden', !state.wanted);
            automatic.disabled = state.reduced;
            figure.querySelector('[data-dm-state]').textContent = state.reduced ? t.reduced : state.running ? t.playing : state.progress >= 1 ? t.done : t.paused;
          }
        });
        const repeat = createReplayTimer({ onReplay: () => { clock.seek(0); clock.play(); } });
        const announce = () => { figure.querySelector('[data-dm-announcement]').textContent = `${model.rows[selected][lang].label}. ${rowValue(model, model.rows[selected], lang)}. ${model.rows[selected][lang].detail}`; };
        play.addEventListener('click', () => {
          touched = true;
          if (clock.state().wanted) { clock.pause(); automatic.checked = false; repeat.setEnabled(false); }
          else { clock.play(); repeat.restart(); }
        }, { signal });
        automatic.addEventListener('change', () => { touched = true; repeat.setEnabled(automatic.checked); }, { signal });
        scrub.addEventListener('input', () => { touched = true; clock.seek(Number(scrub.value) / 100); repeat.restart(); }, { signal });
        scrub.addEventListener('change', announce, { signal });
        buttons.forEach((button, i) => button.addEventListener('click', () => {
          touched = true;
          clock.seek(i / (model.rows.length - 1));
          choose(i);
          bars.forEach(bar => { bar.style.transform = 'scaleX(1)'; });
          moveParcel(i / (model.rows.length - 1));
          repeat.restart();
          announce();
        }, { signal }));
        const updateEnvironment = () => { const environment = { hidden: document.hidden, reduced: media.matches }; clock.setEnvironment(environment); repeat.setEnvironment(environment); };
        document.addEventListener('visibilitychange', updateEnvironment, { signal });
        media.addEventListener('change', updateEnvironment, { signal });
        clock.seek(1);
        clock.setEnvironment({ visible: false, hidden: document.hidden, reduced: media.matches });
        repeat.setEnvironment({ hidden: document.hidden, reduced: media.matches });
        choose(selected);
        let observer;
        if (typeof IntersectionObserver !== 'undefined') {
          observer = new IntersectionObserver(entries => {
            const visible = entries[0].isIntersecting;
            clock.setEnvironment({ visible });
            repeat.setEnvironment({ visible });
            if (visible && !autoPlayed) { autoPlayed = true; if (!touched && !media.matches) clock.play(); }
          }, { threshold: 0.15 });
          observer.observe(figure.querySelector('.dm-stage'));
        } else { clock.setEnvironment({ visible: true }); repeat.setEnvironment({ visible: true }); }
        signal.addEventListener('abort', () => { clock.dispose(); repeat.dispose(); observer?.disconnect(); }, { once: true });
      }
    }
  };
}
