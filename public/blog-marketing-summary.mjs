import {escapeHTML as esc} from './blog-core.mjs';

export function renderMarketingSummary(block, lang) {
  const text = block[lang];
  const group = 'summary-' + lang + '-' + String(block.id).replace(/[^a-z0-9-]/gi, '');
  const local = item => item[lang];
  const heading = (title, note) => `<header><h3>${esc(title)}</h3><p>${esc(note)}</p></header>`;
  const objects = (items, className) => `<div class="${className}">${items.map(item => {
    const value = local(item);
    return `<div><h5>${esc(value.title)}</h5><p>${esc(value.text)}</p></div>`;
  }).join('')}</div>`;
  const files = block.files.map(item => {
    const value = local(item);
    return `<details class="ms-file"><summary><code dir="ltr">${esc(item.path)}</code><strong>${esc(value.title)}</strong><span>${esc(value.note)}</span></summary><p>${esc(value.example)}</p></details>`;
  }).join('');
  const roles = block.agents.map((item, index) => {
    const value = local(item), id = group + '-' + item.id;
    return `<input class="ms-role-choice" type="radio" name="${group}-roles" id="${id}" aria-controls="${id}-panel"${index === 0 ? ' checked' : ''}>
      <label class="ms-role-label" for="${id}" id="${id}-label"><strong>${esc(value.name)}</strong><span>${esc(value.task)}</span></label>
      <section class="ms-role-panel" id="${id}-panel" aria-labelledby="${id}-label"><h5>${esc(value.name)}</h5><dl>${['input','output','review','failure'].map(key => `<div><dt>${esc(text[key])}</dt><dd>${esc(value[key])}</dd></div>`).join('')}</dl></section>`;
  }).join('');
  return `<link rel="stylesheet" href="/blog-marketing-summary.css">
    <figure class="marketing-summary" aria-labelledby="${group}-title">
      <figcaption><h3 id="${group}-title">${esc(text.title)}</h3><p>${esc(text.intro)}</p></figcaption>
      <section class="ms-sheet ms-desk">
        ${heading(text.desk, text.deskNote)}
        <div class="ms-block"><h4>${esc(text.eras)}</h4><div class="ms-eras">${block.eras.map(item => `<div><strong>${esc(local(item).name)}</strong><span>${esc(local(item).unit)}</span></div>`).join('')}</div><p class="ms-note">${esc(text.erasNote)}</p></div>
        <div class="ms-block"><h4>${esc(text.memory)}</h4><p class="ms-hint">${esc(text.memoryHint)}</p><div class="ms-files">${files}</div><p class="ms-rule">${esc(text.memoryRule)}</p></div>
      </section>
      <section class="ms-sheet ms-connections">
        ${heading(text.connections, text.connectionsNote)}
        <div class="ms-block"><h4>${esc(text.idTitle)}</h4><ul class="ms-sources">${text.sources.map(value => `<li>${esc(value)}</li>`).join('')}</ul><div class="ms-records">${text.records.map(value => `<div><strong>${esc(value)}</strong><code dir="ltr">CAFE-SAMPLE</code></div>`).join('')}</div><p class="ms-note">${esc(text.idNote)}</p></div>
        <fieldset class="ms-roles"><legend>${esc(text.roles)}</legend><p class="ms-hint">${esc(text.rolesHint)}</p><div class="ms-role-grid">${roles}</div></fieldset>
        <div class="ms-block"><h4>${esc(text.controls)}</h4><div class="ms-permissions"><div><h5>${esc(text.prompt)}</h5><p>${esc(text.promptText)}</p></div><div><h5>${esc(text.tools)}</h5><p>${esc(text.toolsText)}</p></div></div></div>
      </section>
      <section class="ms-sheet ms-operation">
        ${heading(text.operation, text.operationNote)}
        <div class="ms-block"><h4>${esc(text.campaign)}</h4>${objects(block.campaign, 'ms-campaign')}<p class="ms-note">${esc(text.campaignNote)}</p></div>
        <div class="ms-block"><h4>${esc(text.week)}</h4>${objects(block.week, 'ms-week')}</div>
        <div class="ms-block"><h4>${esc(text.start)}</h4>${objects(block.starters, 'ms-starters')}</div>
        <fieldset class="ms-checklist"><legend>${esc(text.checklist)}</legend><div>${block.checks.map((item, index) => `<label for="${group}-check-${index}"><input id="${group}-check-${index}" type="checkbox"><span>${esc(local(item))}</span></label>`).join('')}</div><p class="ms-note">${esc(text.checkNote)}</p></fieldset>
      </section>
      <details class="ms-limits"><summary>${esc(text.limits)}</summary><p>${esc(text.limitsText)}</p></details>
      <p class="ms-closing">${esc(text.closing)}</p>
      <p class="ms-credit">${esc(text.credit)}</p>
    </figure>`;
}
