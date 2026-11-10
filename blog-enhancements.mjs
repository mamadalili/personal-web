import {readingWidget} from './blog-reading.mjs';

const modules = {
  'decision-audit': ['./blog-decision-audit.mjs', 'createDecisionAudits'],
  workflow: ['./blog-workflow.mjs', 'createWorkflowWidgets'],
  'data-motion': ['./blog-data-motion.mjs?v=20261102-unit-objects', 'createDataMotionWidgets'],
  finance: ['./blog-finance.mjs', 'createFinanceWidgets'],
  'content-studio': ['./blog-content-studio.mjs', 'createContentStudios'],
  opportunities: ['./blog-solo.mjs', 'createSoloWidgets'],
  'skill-route': ['./blog-skill-route.mjs?v=20261106', 'createSkillRoutes', 'loadSkillRouteStyle'],
  'company-brain': ['./blog-company-brain.mjs?v=20261106', 'createCompanyBrains', 'loadCompanyBrainStyle'],
  'shot-review': ['./blog-shot-review.mjs?v=20261107', 'createShotReviews', 'loadShotReviewStyle'],
  'campaign-trace': ['./blog-campaign-trace.mjs'],
  'market-atlas': ['./blog-market.mjs?v=20261101-data-motion']
};

export function addonKind(type) {
  if (type === 'context-lab' || type === 'brain-check') return 'company-brain';
  return Object.hasOwn(modules,type) ? type : null;
}

export function enhanceArticle(root, context) {
  const {article, lang, signal} = context;
  const groups = new Map();
  for (const slot of root.querySelectorAll('[data-article-addon]')) {
    const kind = slot.dataset.articleAddon;
    if (!groups.has(kind)) groups.set(kind, []);
    groups.get(kind).push(slot);
  }
  if (article.presentation === 'market-atlas') {
    const slot = document.createElement('div');
    root.querySelector('.article-body')?.prepend(slot);
    groups.set('market-atlas', [slot]);
  }

  async function mount(kind, slots, retry = false) {
    const attempt = new AbortController();
    const stop = () => attempt.abort();
    signal.addEventListener('abort', stop, {once:true});
    const retryControl = slots[0].querySelector('[data-retry-addon]');
    if (retryControl) retryControl.disabled = true;
    try {
      const [path, factory, loadStyle] = modules[kind];
      const url = new URL(path, import.meta.url);
      if (retry) url.searchParams.set('retry', String(Date.now()));
      const module = await import(url.href);
      if (loadStyle) await module[loadStyle]();
      if (signal.aborted || !root.isConnected) return;
      const options = {...context, signal:attempt.signal};
      if (kind === 'market-atlas') {
        module.mountMarketArticle(root, options);
        slots[0].remove();
      } else {
        const widget = kind === 'campaign-trace' ? {
          render: (block,id) => module.renderTrace(block,id,lang),
          mount: container => module.mountTraces(container,context.blocks,lang,attempt.signal)
        } : module[factory](options);
        for (const slot of slots) {
          const id = slot.dataset.blockId;
          slot.innerHTML = widget.render(context.blocks.get(id),id);
        }
        widget.mount(root);
      }
    } catch (error) {
      stop();
      signal.removeEventListener('abort', stop);
      if (signal.aborted || !root.isConnected) return;
      console.warn('Article interaction unavailable', kind, error);
      for (const slot of slots) {
        const block=context.blocks.get(slot.dataset.blockId);
        slot.innerHTML=block?readingWidget(block,lang,context.rich):'';
      }
      const note = document.createElement('p');
      note.className = 'reading-recovery';
      note.setAttribute('role','status');
      note.textContent = lang === 'fa' ? 'این بخش تعاملی بارگیری نشد. ' : 'This interaction did not load. ';
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.retryAddon = kind;
      button.textContent = lang === 'fa' ? 'تلاش دوباره' : 'Try again';
      button.addEventListener('click', () => mount(kind,slots,true), {once:true,signal});
      note.append(button);
      slots[0].append(note);
    }
  }
  for (const [kind, slots] of groups) void mount(kind, slots);
}
