// Keep sticky shells, navigation, first headings and reading text in their normal flow.
const sections = [
  '.skills-card-copy', '.home-blog-header',
  '.cv-about', '.cv-focus', '.section-heading', '.story-preview-head',
  '.solution-fit > h2', '.home-section-heading', '.solution-process > h2',
  '.solution-faq > h2', '.collaboration-copy',
  '.work-role-header', '.work-role-background', '.work-story-heading',
  '.contact-glass-copy', '.contact-channels-header', '.employer-rail > header',
  '.library-feature-copy', '.journal-lead-copy', '.journal-collection > header', '#library-heading', '.article-byline', '.article-section > h2',
  '.article-inline-image', '.article-callout', '.article-related > h2',
  '.market-chapter-copy > h2', '.market-figure-label', '.simulator-result',
].join(',');

const cards = [
  '.home-folder-link', '.home-post-card', '.home-quick-links > article',
  '.career-metric', '.story-preview-card', '.project-list > details', '.capability-grid > div',
  '.work-story', '.contact-method', '.employer-logo-card', '.library-card', '.journal-pick', '.journal-row', '.journal-collection li',
  '.solution-outputs > article', '.solution-process article', '.solution-card',
].join(',');

const figures = '.chart-plot, .sl-figure, .market-finance-row, .market-multiple-row, .market-country, .stock-state-plot, .payment-trace-plot';
const chartInk = '[data-entry-series], .sl-receipt-row i, .market-track i, .market-multiple-track i, .market-dot-lane';
const objects = '.sl-stock .sl-drawing, .sl-tray .sl-drawing';
const targets = [sections, cards, figures].join(',');
const lift = [{opacity: .62, translate: '0 12px'}, {opacity: 1, translate: '0 0'}];
const settle = [{opacity: .72, translate: '0 8px'}, {opacity: 1, translate: '0 0'}];

export function watchSectionEntrances(root) {
  if (!root || typeof IntersectionObserver === 'undefined' ||
      typeof MutationObserver === 'undefined' || !root.animate) return () => {};

  const doc = root.ownerDocument;
  const motion = matchMedia('screen and (prefers-reduced-motion: no-preference)');
  const seen = new WeakSet();
  const shownFolders = new Set();
  const playing = new Set();

  function play(element, frames, id, duration, delay = 0) {
    const animation = element.animate(frames, {
      id: 'portfolio-entry-' + id, duration, delay, fill: 'backwards',
      easing: 'cubic-bezier(.2,.75,.22,1)',
    });
    playing.add(animation);
    animation.onfinish = animation.oncancel = () => playing.delete(animation);
  }

  function enterFigure(figure) {
    // The SVG and market finance axes increase left to right in both languages.
    const marks = figure.querySelectorAll(chartInk);
    const drawings = figure.querySelectorAll(objects);
    marks.forEach((mark, index) => {
      const fromRight = mark.matches('.sl-receipt-row i, .market-dot-lane') && doc.documentElement.dir === 'rtl';
      let start = fromRight ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
      if (mark.dataset.entrySeries === 'columns') start = 'inset(100% 0 0 0)';
      if (mark.dataset.entrySeries === 'down') start = 'inset(0 0 100% 0)';
      play(mark, [{clipPath: start}, {clipPath: 'inset(0 0% 0 0%)'}], 'ink', 420, index * 36);
    });
    drawings.forEach((drawing, index) => {
      play(drawing, settle, 'object', 320, index * 36);
    });
    return marks.length + drawings.length > 0;
  }

  const observer = new IntersectionObserver(entries => {
    let cardIndex = 0;
    for (const entry of entries) {
      const element = entry.target;
      if (!entry.isIntersecting || entry.intersectionRatio <= 0 || !root.contains(element)) continue;
      observer.unobserve(element);
      if (!motion.matches || doc.hidden) continue;
      // Switching a solution replaces the panel and recreates the same four folder links.
      if (element.matches('.solutions-selector .home-folder-link')) {
        if (shownFolders.has(element.href)) { seen.add(element); continue; }
        shownFolders.add(element.href);
      }
      if (!element.contains(doc.activeElement) && !element.closest(':target')) {
        if (element.matches(figures)) {
          if (!enterFigure(element)) continue; // A lazy chart can be on screen before its marks arrive.
        } else if (element.matches(cards)) play(element, settle, 'card', 310, Math.min(cardIndex++, 3) * 42);
        else play(element, lift, 'section', 380);
      }
      seen.add(element);
    }
  }, {threshold: [0, .01]});

  function observe(element) {
    if (!seen.has(element)) observer.observe(element);
  }
  function visit(node, action) {
    if (node.nodeType !== 1 || node.namespaceURI !== root.namespaceURI) return;
    if (node.matches(targets)) action(node);
    if (node.firstElementChild) node.querySelectorAll(targets).forEach(action);
  }
  const changes = new MutationObserver(records => {
    for (const record of records) {
      // Controls redraw marks inside a stable figure. Their updates must be immediate.
      if (record.target.closest?.('[data-data-motion]')) continue;
      const figure = record.target.closest?.(figures);
      if (figure) {
        if (record.addedNodes.length && root.contains(figure)) observe(figure);
        continue;
      }
      for (const node of record.removedNodes) {
        if (node.nodeType === 1 && !root.contains(node)) visit(node, element => observer.unobserve(element));
      }
      for (const node of record.addedNodes) {
        if (node.nodeType === 1 && root.contains(node)) visit(node, observe);
      }
    }
  });

  function stop() {
    changes.disconnect();
    observer.disconnect();
    for (const animation of playing) animation.cancel();
    playing.clear();
  }
  function sync() {
    stop();
    if (doc.hidden || !motion.matches) return;
    root.querySelectorAll(targets).forEach(observe);
    changes.observe(root, {childList: true, subtree: true});
  }
  motion.addEventListener('change', sync);
  doc.addEventListener('visibilitychange', sync);
  sync();
  return () => {
    stop();
    motion.removeEventListener('change', sync);
    doc.removeEventListener('visibilitychange', sync);
  };
}
