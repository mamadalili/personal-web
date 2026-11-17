import {escapeHTML as esc} from './blog-core.mjs';

export function renderStrategyBrief(block, lang) {
  const text = block[lang];
  const group = 'strategy-' + lang + '-' + String(block.id).replace(/[^a-z0-9-]/gi, '');
  const choices = block.cases.map((item, index) => {
    const local = item[lang];
    const id = group + '-' + item.id;
    return `
      <input class="brief-choice" type="radio" name="${group}" id="${id}"
        aria-controls="${id}-panel"${index === 0 ? ' checked' : ''}>
      <label class="brief-option" for="${id}" id="${id}-label">
        <span class="brief-horizon" dir="ltr">${esc(item.horizon)}</span>
        <strong>${esc(local.label)}</strong>
      </label>
      <section class="brief-panel" id="${id}-panel" aria-labelledby="${id}-label">
        <div class="brief-stages">
          <div class="brief-stage"><h4>${esc(text.choice)}</h4><p>${esc(local.promise)}</p></div>
          <div class="brief-stage"><h4>${esc(text.work)}</h4><p>${esc(local.action)}</p>
            <dl><div><dt>${esc(text.owner)}</dt><dd>${esc(local.owner)}</dd></div></dl>
          </div>
          <div class="brief-stage"><h4>${esc(text.evidence)}</h4><p>${esc(local.evidence)}</p>
            <dl><div><dt>${esc(text.review)}</dt><dd>${esc(local.review)}</dd></div></dl>
          </div>
        </div>
        <p class="brief-learning"><strong>${esc(text.next)}</strong> ${esc(local.learning)}</p>
      </section>`;
  }).join('');
  return `<link rel="stylesheet" href="/blog-strategy-brief.css">
    <figure class="strategy-brief">
      <figcaption><h3>${esc(text.title)}</h3><p>${esc(text.note)}</p></figcaption>
      <fieldset><legend>${esc(text.select)}</legend><div class="brief-grid">${choices}</div></fieldset>
    </figure>`;
}
