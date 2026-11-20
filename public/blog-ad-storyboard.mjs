import {escapeHTML as esc} from './blog-core.mjs';

const tongs = `<path d="M-2 2 Q1 -3 4 1 L76 10 Q87 1 96 5 Q102 9 95 14 Q88 19 77 16 L3 5 M4 3 L78 -8 Q89 -15 96 -11 Q103 -7 94 -3 Q87 1 79 -2 L4 6" fill="var(--storyboard-steel)" stroke="var(--storyboard-metal)" stroke-width="2" stroke-linejoin="round"/><circle cx="3" cy="3" r="2" fill="var(--storyboard-metal)"/>`;

function drawerScene(stage, lang) {
  const number = new Intl.NumberFormat(lang);
  const separated = stage !== 'attention';
  const measure = stage === 'fit' || stage === 'action';
  const guide = stage === 'action';
  return `<svg class="storyboard-drawer" viewBox="0 0 240 162" aria-hidden="true" focusable="false">
    <rect x="9" y="11" width="218" height="134" rx="9" fill="var(--storyboard-shadow)"/>
    <rect x="6" y="7" width="218" height="134" rx="9" fill="var(--storyboard-wood)" stroke="var(--storyboard-woodline)" stroke-width="2"/>
    <rect x="15" y="16" width="200" height="113" rx="4" fill="var(--storyboard-inside)" stroke="var(--storyboard-woodline)"/>
    <path d="M20 124 H210 M26 22 H205" stroke="var(--storyboard-woodline)" opacity=".35"/>
    <path d="M90 142 v4 q0 3 4 3 h43 q4 0 4 -3 v-4" fill="none" stroke="var(--storyboard-metal)" stroke-width="3"/>
    <g transform="translate(56 92) rotate(-40)" fill="var(--storyboard-wood)" stroke="var(--storyboard-woodline)" stroke-width="1.5">
      <path d="M-3 0v-46q-9-4-8-14c1-8 5-13 11-13s10 5 11 13q1 10-8 14V0q-3 5-6 0z"/>
    </g>
    ${separated ? '<path d="M119 17h8v112h-8z" fill="var(--storyboard-divider)" stroke="var(--storyboard-woodline)" stroke-width="2"/>' : ''}
    <g transform="${separated ? 'translate(169 116) rotate(-88) scale(.88)' : 'translate(76 98) rotate(-33) scale(1.28)'}">${tongs}</g>
    ${stage === 'attention' ? '<path d="m193 26 5-8 m2 12 8-4 m-19-5 1-8" fill="none" stroke="var(--storyboard-pencil)" stroke-width="2.5" stroke-linecap="round"/>' : ''}
    ${stage === 'mechanism' ? '<path d="M135 55q11-8 20-4m-4-5 5 5-6 3" fill="none" stroke="var(--storyboard-pencil)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>' : ''}
    ${measure ? '<path d="M200 19v106 M194 19h12 M194 125h12" fill="none" stroke="var(--storyboard-pencil)" stroke-width="2.4"/><path d="M196 32h4m-4 13h4m-4 13h4m-4 13h4m-4 13h4m-4 13h4m-4 13h4" stroke="var(--storyboard-pencil)" stroke-width="1.3"/>' : ''}
    ${guide ? `<g transform="rotate(-7 75 92)"><rect x="21" y="63" width="90" height="47" rx="2" fill="var(--storyboard-slip)" stroke="var(--storyboard-woodline)"/><text x="66" y="92" direction="ltr" text-anchor="middle" font-size="18" font-family="inherit" fill="var(--storyboard-pencil)">${lang === 'fa' ? number.format(38) + ' سانت' : '38 cm'}</text></g>` : ''}
  </svg>`.replace(/^ +$/gm, '');
}

export function renderAdStoryboard(block, lang) {
  const copy = block[lang];
  const number = new Intl.NumberFormat(lang);
  const group = 'storyboard-' + lang + '-' + block.id;
  const total = block.stages.reduce((sum, stage) => sum + stage.count, 0);
  const choices = block.stages.map((stage, index) => {
    const local = stage[lang];
    const id = group + '-' + stage.id;
    const marks = '<i class="storyboard-mark"></i>'.repeat(stage.count);
    return `<input class="storyboard-radio" type="radio" name="${esc(group)}" id="${esc(id)}" aria-controls="${esc(id)}-panel"${index === 0 ? ' checked' : ''}>
      <label class="storyboard-frame" for="${esc(id)}" id="${esc(id)}-label">
        <strong>${esc(local.label)}</strong><span class="storyboard-units"><span class="storyboard-marks" aria-hidden="true">${marks}</span><span class="storyboard-count">${number.format(stage.count)}<span class="storyboard-sr"> ${esc(lang === 'fa' ? 'جزء' : 'elements')}</span></span></span>
      </label>
      <section class="storyboard-panel" id="${esc(id)}-panel" aria-labelledby="${esc(id)}-label">
        <div class="storyboard-shot">${drawerScene(stage.id, lang)}<p><b>${esc(copy.shot)}</b> ${esc(local.shot)}</p></div>
        <div class="storyboard-script"><h4>${esc(local.question)}</h4><dl>
          <dt>${esc(copy.line)}</dt><dd class="storyboard-line">${esc(local.line)}</dd>
          <dt>${esc(copy.proof)}</dt><dd>${esc(local.proof)}</dd>
        </dl></div>
      </section>`;
  }).join('');
  const rows = block.stages.map(stage => `<tr><th scope="row">${esc(stage[lang].label)}</th><td>${number.format(stage.count)}</td></tr>`).join('');
  return `<link rel="stylesheet" href="/blog-ad-storyboard.css?v=20261120-drawer">
    <figure class="drawer-storyboard">
      <figcaption><h3>${esc(copy.title)}</h3><p>${esc(copy.key)}</p></figcaption>
      <fieldset><legend>${esc(copy.legend)}</legend><div class="storyboard-track">${choices}</div></fieldset>
      <details class="storyboard-counts"><summary>${esc(copy.table)}</summary><table><caption>${esc(copy.table)}</caption>
        <thead><tr><th scope="col">${esc(copy.stage)}</th><th scope="col">${esc(copy.units)}</th></tr></thead>
        <tbody>${rows}</tbody><tfoot><tr><th scope="row">${esc(copy.total)}</th><td>${number.format(total)}</td></tr></tfoot>
      </table><p>${esc(copy.method)}</p></details>
    </figure>`;
}
