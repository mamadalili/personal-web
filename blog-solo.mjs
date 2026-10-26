import { escapeHTML as esc } from './blog-core.mjs';
import { soloCapacity, filterOpportunities } from './figures/solo-model.mjs';
import { renderWorkbench } from './figures/solo-workbench.mjs';
import { workbenchOrder } from './figures/solo-order.mjs';

const copy = {
  fa: {
    all: 'همهٔ مسیرها', filter: 'پیشینه یا نقطهٔ شروع', search: 'جست‌وجو در پیشنهادها', clear: 'پاک‌کردن فیلترها',
    results: 'پیشنهاد قابل بررسی', empty: 'پیشنهادی با این عبارت پیدا نشد. عبارت یا مسیر را تغییر بده.',
    detail: 'دیدن جزئیات مسیر', buyer: 'خریدار پیشنهادی', proof: 'چه چیزی باید ثابت شود؟',
    ai: 'سهم AI', human: 'مسئولیت انسانی', experiment: 'اولین آزمایش', boundary: 'مرز کار', related: 'راهکار مرتبط',
    badge: 'مدل آموزشی · ورودی‌های فرضی', hours: 'زمان تحویل در هفته (ساعت)', orders: 'سفارش درخواستی در هفته',
    automation: 'واگذاری آماده‌سازی به AI (%)', completed: 'قابل تحویل', pending: 'بیرون از ظرفیت',
    perOrder: 'دقیقهٔ انسانی برای هر سفارش', manual: 'بدون واگذاری', assisted: 'واگذاری ۶۰٪', reset: 'بازنشانی',
    load: 'بارِ درخواست نسبت به زمان', zero: 'برای این حجم درخواست، زمانی اختصاص داده نشده است.',
    fits: 'در این مثال، درخواست‌ها در زمان تعیین‌شده جا می‌شوند.', overloaded: 'در این مثال، دامنه یا تعداد سفارش باید بازبینی شود.',
    legend: ['سینی ورودی: تقاضای انتخاب‌شده', 'فاصلهٔ پرس: آماده‌سازیِ باقی‌مانده', 'سینی خروجی: قابل تحویل در زمان شما'],
    method: 'فرض‌ها و روش محاسبه',
    formula: 'هر سفارش: ۷۵ × (۱ − درصد واگذاری ÷ ۱۰۰) + ۲۵ دقیقه بازبینی + ۲۰ دقیقه ارتباط با مشتری. ظرفیت: بخش صحیحِ دقیقه‌های در دسترس ÷ زمان انسانی هر سفارش.',
    limit: 'عقربه تا ۱۵۰٪ بار را نمایش می‌دهد؛ عدد دقیق زیر تصویر است. این مدل، اندازه‌گیری عملکرد ابزار یا پیش‌بینی درآمد نیست. زمان فروش، استراحت و هزینه‌ها را جداگانه در برنامه‌ات لحاظ کن.',
    invalid: 'ورودی‌ها باید در محدودهٔ مشخص باشند.',
    capacityResult: 'نتیجهٔ مدل ظرفیت',
    image: 'میز کار با پرس، چرخ تنظیم و عقربهٔ بار. تعداد کارت‌های ورودی و خروجی از همان مدل ظرفیت خوانده می‌شود.'
  },
  en: {
    all: 'All paths', filter: 'Background or starting point', search: 'Search the offers', clear: 'Clear filters',
    results: 'offers to explore', empty: 'No matching offers. Try another phrase or starting point.',
    detail: 'Explore this path', buyer: 'Proposed buyer', proof: 'What needs to be demonstrated?',
    ai: 'AI contribution', human: 'Human responsibility', experiment: 'First experiment', boundary: 'Scope boundary', related: 'Related solution',
    badge: 'Learning model · hypothetical inputs', hours: 'Weekly delivery time (hours)', orders: 'Requested orders per week',
    automation: 'Preparation delegated to AI (%)', completed: 'Can be delivered', pending: 'Beyond capacity',
    perOrder: 'Human minutes per order', manual: 'No delegation', assisted: 'Delegate 60%', reset: 'Reset',
    load: 'Requested workload / available time', zero: 'No time has been allocated to these requests.',
    fits: 'In this example, the requests fit within the selected time.', overloaded: 'In this example, scope or order count needs revisiting.',
    legend: ['Input tray: selected demand', 'Press gap: remaining preparation', 'Output tray: deliverable within your time'],
    method: 'Assumptions & calculation',
    formula: 'Per order: 75 × (1 − delegation percentage ÷ 100) + 25 review minutes + 20 client-communication minutes. Capacity: floor(available minutes ÷ human minutes per order).',
    limit: 'The dial stops at 150% load; the exact number appears below. This is not a tool-performance measurement or an earnings forecast. Allow separately for sales, breaks and costs.',
    invalid: 'Keep the inputs within the stated ranges.',
    capacityResult: 'Capacity model result',
    image: 'A workbench with a press, adjustment wheel and workload dial. Input and output card counts come from the same capacity model.'
  }
};

export function createSoloWidgets({ lang, number, rich, href, openDialog, signal }) {
  const t = copy[lang], widgets = new Map();
  function render(block, id) {
    if (block.type === 'opportunities') {
      widgets.set(id, { block, group: 'all', query: '' });
      return `<section class="opportunity-browser" data-opportunities="${id}"><header><span class="small-label">${esc(block[lang].eyebrow)}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].note)}</p></header><div class="opportunity-filters" role="group" aria-label="${t.filter}">${[{ id: 'all', [lang]: t.all }, ...block.groups].map(group => `<button type="button" data-opportunity-group="${esc(group.id)}" data-widget="${id}" aria-pressed="${group.id === 'all'}" aria-controls="${id}-cards">${esc(group[lang])}</button>`).join('')}</div><label class="opportunity-search" for="${id}-search">${t.search}<input type="search" id="${id}-search" data-opportunity-search="${id}" autocomplete="off"></label><p class="opportunity-status" role="status" aria-live="polite"></p><div class="opportunity-grid" id="${id}-cards"></div><button type="button" class="blog-text-button" data-opportunity-clear="${id}">${t.clear}</button></section>`;
    }
    if (block.type !== 'capacity-rig' || block.model !== 'solo-capacity') return '';
    const defaults = block.defaults || { hours: 12, orders: 12, automation: 60 };
    if (!soloCapacity(defaults)) throw new Error('Invalid capacity-rig defaults.');
    widgets.set(id, { block, target: { ...defaults }, current: { ...defaults }, defaults, frame: 0, announcementTimer: 0, visible: false });
    return `<figure class="capacity-card" data-capacity="${id}"><figcaption><span class="scenario-badge">${t.badge}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].note)}</p></figcaption><div class="capacity-stage iso" data-theme="light">${renderWorkbench(defaults, t.image, workbenchOrder)}</div><ul class="capacity-legend">${t.legend.map(text => `<li>${text}</li>`).join('')}</ul><div class="capacity-controls">${[['hours', 0, 40], ['orders', 0, 16], ['automation', 0, 90]].map(([key, min, max]) => `<label for="${id}-${key}"><span>${t[key]}<output for="${id}-${key}" data-cap-value="${key}">${number(defaults[key])}</output></span><input id="${id}-${key}" type="range" min="${min}" max="${max}" step="1" value="${defaults[key]}" data-cap-input="${key}" data-widget="${id}"></label>`).join('')}</div><div class="capacity-presets">${[['manual', t.manual], ['assisted', t.assisted], ['reset', t.reset]].map(([key, text]) => `<button type="button" data-cap-preset="${key}" data-widget="${id}">${text}</button>`).join('')}</div><div class="capacity-results" role="group" aria-label="${t.capacityResult}"></div><p class="capacity-announcement" role="status" aria-live="polite" aria-atomic="true"></p><p class="capacity-load"></p><details class="capacity-method"><summary>${t.method}</summary><p>${t.formula}</p><p>${t.limit}</p></details></figure>`;
  }

  function mount(root) {
    if (!widgets.size) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    function updateOffers(id) {
      const state = widgets.get(id), container = root.querySelector(`[data-opportunities="${id}"]`);
      const items = filterOpportunities(state.block.items, { group: state.group, query: state.query, lang });
      container.querySelector('.opportunity-status').textContent = `${number(items.length)} ${t.results}`;
      container.querySelector('.opportunity-grid').innerHTML = items.length ? items.map(item => {
        const a = item[lang], group = state.block.groups.find(group => group.id === item.group);
        return `<article class="opportunity-card"><span class="opportunity-group">${esc(group?.[lang] || '')}</span><h4>${esc(a.title)}</h4><p>${esc(a.outcome)}</p><small>${esc(a.buyer)}</small><button type="button" data-opportunity-detail="${id}" data-offer="${esc(item.id)}" aria-haspopup="dialog">${t.detail}<span aria-hidden="true">↗</span></button></article>`;
      }).join('') : `<p class="opportunity-empty">${t.empty}</p>`;
      for (const button of container.querySelectorAll('[data-opportunity-group]')) button.setAttribute('aria-pressed', String(button.dataset.opportunityGroup === state.group));
    }
    function paintCapacity(id, input, announce = false) {
      if (signal.aborted) return;
      const container = root.querySelector(`[data-capacity="${id}"]`), model = soloCapacity(input);
      if (!container?.isConnected) return;
      if (!model) { container.querySelector('.capacity-results').textContent = t.invalid; return; }
      const label = `${t.image} ${t.completed}: ${number(model.completed)}. ${t.pending}: ${number(model.pending)}.`;
      container.querySelector('.capacity-stage').innerHTML = renderWorkbench(input, label, workbenchOrder);
      container.querySelector('.capacity-results').innerHTML = `<div><strong>${number(model.completed)}</strong><span>${t.completed}</span></div><div><strong>${number(model.pending)}</strong><span>${t.pending}</span></div><div><strong>${number(model.perOrderMinutes, 'decimal')}</strong><span>${t.perOrder}</span></div>`;
      const load = container.querySelector('.capacity-load');
      load.textContent = model.loadPercent === null ? t.zero : `${t.load}: ${number(model.loadPercent, 'percent')} · ${model.pending ? t.overloaded : t.fits}`;
      load.classList.toggle('is-overloaded', model.pending > 0);
      if (announce) {
        const state = widgets.get(id), message = `${t.completed}: ${number(model.completed)}. ${t.pending}: ${number(model.pending)}. ${t.perOrder}: ${number(model.perOrderMinutes, 'decimal')}. ${load.textContent}`;
        clearTimeout(state.announcementTimer);
        state.announcementTimer = setTimeout(() => {
          if (!signal.aborted && container.isConnected && !document.hidden) container.querySelector('.capacity-announcement').textContent = message;
          state.announcementTimer = 0;
        }, 200);
      }
    }
    function stop(id) {
      const state = widgets.get(id);
      cancelAnimationFrame(state.frame); state.frame = 0;
      state.current = { ...state.target };
      paintCapacity(id, state.current, true);
    }
    function setCapacity(id, next) {
      const state = widgets.get(id), container = root.querySelector(`[data-capacity="${id}"]`);
      if (!soloCapacity(next)) return;
      cancelAnimationFrame(state.frame);
      clearTimeout(state.announcementTimer);
      state.target = { ...next };
      for (const field of container.querySelectorAll('[data-cap-input]')) {
        const key = field.dataset.capInput;
        field.value = String(next[key]);
        container.querySelector(`[data-cap-value="${key}"]`).textContent = number(next[key]);
      }
      if (reduced.matches || !state.visible || document.hidden || Math.abs(state.current.automation - next.automation) < 0.01) { stop(id); return; }
      const from = state.current.automation, started = performance.now();
      function tick(now) {
        if (signal.aborted) return;
        const fraction = Math.min(1, (now - started) / 320);
        state.current = { ...next, automation: from + (next.automation - from) * (1 - (1 - fraction) ** 3) };
        paintCapacity(id, state.current, fraction === 1);
        state.frame = fraction < 1 ? requestAnimationFrame(tick) : 0;
      }
      state.frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const id = entry.target.dataset.capacity, state = widgets.get(id);
        state.visible = entry.isIntersecting;
        if (!state.visible && state.frame) stop(id);
      }
    });
    for (const [id, state] of widgets) {
      if (state.block.type === 'opportunities') updateOffers(id);
      else { paintCapacity(id, state.current); observer.observe(root.querySelector(`[data-capacity="${id}"]`)); }
    }
    root.addEventListener('input', event => {
      const field = event.target;
      if (field.dataset.opportunitySearch) {
        const id = field.dataset.opportunitySearch;
        widgets.get(id).query = field.value;
        updateOffers(id);
      }
      if (field.dataset.capInput) {
        const state = widgets.get(field.dataset.widget);
        setCapacity(field.dataset.widget, { ...state.target, [field.dataset.capInput]: Number(field.value) });
      }
    }, { signal });
    root.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      const data = button.dataset;
      if (data.opportunityGroup) { widgets.get(data.widget).group = data.opportunityGroup; updateOffers(data.widget); }
      if (data.opportunityClear) {
        const id = data.opportunityClear, state = widgets.get(id);
        state.query = ''; state.group = 'all';
        root.querySelector(`[data-opportunity-search="${id}"]`).value = '';
        updateOffers(id);
      }
      if (data.opportunityDetail) {
        const item = widgets.get(data.opportunityDetail).block.items.find(item => item.id === data.offer);
        if (!item) return;
        const a = item[lang], url = href(item.target);
        const fields = [['buyer', t.buyer], ['proof', t.proof], ['ai', t.ai], ['human', t.human], ['experiment', t.experiment], ['boundary', t.boundary]];
        openDialog(a.title, `<div class="offer-detail"><p>${rich(a.outcome)}</p><dl>${fields.map(([key, label]) => `<div><dt>${label}</dt><dd>${rich(a[key])}</dd></div>`).join('')}</dl>${url ? `<a class="offer-solution-link" href="${esc(url)}">${t.related} ↗</a>` : ''}</div>`, button);
      }
      if (data.capPreset) {
        const state = widgets.get(data.widget);
        setCapacity(data.widget, data.capPreset === 'reset' ? { ...state.defaults } : { ...state.target, automation: data.capPreset === 'manual' ? 0 : 60 });
      }
    }, { signal });
    const settleAll = () => { for (const [id, state] of widgets) if (state.block.type === 'capacity-rig' && state.frame) stop(id); };
    reduced.addEventListener('change', settleAll, { signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) settleAll(); }, { signal });
    signal.addEventListener('abort', () => {
      observer.disconnect();
      for (const state of widgets.values()) {
        if (state.frame) cancelAnimationFrame(state.frame);
        if (state.announcementTimer) clearTimeout(state.announcementTimer);
      }
    }, { once: true });
  }
  return { render, mount };
}
