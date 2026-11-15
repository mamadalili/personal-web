import { escapeHTML as esc } from './blog-core.mjs';
import { filterOpportunities } from './figures/solo-model.mjs';

const copy = {
  fa: {
    all: 'همهٔ مسیرها', filter: 'پیشینه یا نقطهٔ شروع', search: 'جست‌وجو در پیشنهادها', clear: 'پاک‌کردن فیلترها',
    results: 'پیشنهاد قابل بررسی', empty: 'پیشنهادی با این عبارت پیدا نشد. عبارت یا مسیر را تغییر بده.',
    detail: 'دیدن جزئیات مسیر', buyer: 'خریدار پیشنهادی', proof: 'چه چیزی باید ثابت شود؟',
    ai: 'سهم AI', human: 'مسئولیت انسانی', experiment: 'اولین آزمایش', boundary: 'مرز کار', related: 'راهکار مرتبط'
  },
  en: {
    all: 'All paths', filter: 'Background or starting point', search: 'Search the offers', clear: 'Clear filters',
    results: 'offers to explore', empty: 'No matching offers. Try another phrase or starting point.',
    detail: 'Explore this path', buyer: 'Proposed buyer', proof: 'What needs to be demonstrated?',
    ai: 'AI contribution', human: 'Human responsibility', experiment: 'First experiment', boundary: 'Scope boundary', related: 'Related solution'
  }
};

export function createSoloWidgets({ lang, number, rich, href, openDialog, signal }) {
  const t = copy[lang], widgets = new Map();
  function render(block, id) {
    if (block.type !== 'opportunities') return '';
    widgets.set(id, { block, group: 'all', query: '' });
    return `<section class="opportunity-browser" data-opportunities="${id}"><header><span class="small-label">${esc(block[lang].eyebrow)}</span><h3>${esc(block[lang].title)}</h3><p>${esc(block[lang].note)}</p></header><div class="opportunity-filters" role="group" aria-label="${t.filter}">${[{ id: 'all', [lang]: t.all }, ...block.groups].map(group => `<button type="button" data-opportunity-group="${esc(group.id)}" data-widget="${id}" aria-pressed="${group.id === 'all'}" aria-controls="${id}-cards">${esc(group[lang])}</button>`).join('')}</div><label class="opportunity-search" for="${id}-search">${t.search}<input type="search" id="${id}-search" data-opportunity-search="${id}" autocomplete="off"></label><p class="opportunity-status" role="status" aria-live="polite"></p><div class="opportunity-grid" id="${id}-cards"></div><button type="button" class="blog-text-button" data-opportunity-clear="${id}">${t.clear}</button></section>`;
  }

  function mount(root) {
    if (!widgets.size) return;
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
    for (const id of widgets.keys()) updateOffers(id);
    root.addEventListener('input', event => {
      const field = event.target;
      if (field.dataset.opportunitySearch) {
        const id = field.dataset.opportunitySearch;
        widgets.get(id).query = field.value;
        updateOffers(id);
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
    }, { signal });
  }
  return { render, mount };
}
