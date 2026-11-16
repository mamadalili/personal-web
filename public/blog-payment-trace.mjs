import {escapeHTML as esc} from './blog-core.mjs';

const participants = [
  ['bank', 'M2 8 12 3l10 5H2Zm2 12h16M6 11v6m6-6v6m6-6v6'],
  ['store', 'M3 10l2-6h14l2 6M3 10q2 4 4.5 0Q10 14 12 10q2 4 4.5 0Q19 14 21 10M5 12v8h14v-8M10 20v-6h4v6'],
  ['support', 'M3 13v-2a9 9 0 0 1 18 0v5q0 5-7 5M3 12h4v6H4q-1 0-1-1Zm18 0h-4v6h3q1 0 1-1Z'],
];

function handoff(from, to, y, reply = false) {
  const sign = Math.sign(to - from);
  const tip = to - sign * 3;
  const base = tip - sign * 7;
  return `<g class="trace-arrow${reply ? ' trace-return' : ''}">
    <circle cx="${from}" cy="${y}" r="2.7"/>
    <line x1="${from}" y1="${y}" x2="${base}" y2="${y}"/>
    <path d="M${tip} ${y}l${-sign * 7} -4.5v9z"/>
  </g>`;
}

export function renderPaymentTrace(block, lang) {
  const local = block[lang];
  const id = `trace-${esc(lang)}-${esc(block.id)}`;
  const [bank, store, support] = lang === 'fa' ? [286, 168, 50] : [50, 168, 286];
  const actors = participants.map(([key, icon], index) => {
    const x = [bank, store, support][index];
    return `<g class="trace-participant" data-actor="${key}">
      <path class="trace-actor-icon" d="${icon}" transform="translate(${x - 12} 3)" fill="none"/>
      <text x="${x}" y="47">${esc(local[key])}</text>
      <line class="trace-lifeline" x1="${x}" y1="58" x2="${x}" y2="202"/>
    </g>`;
  }).join('');
  const choices = block.cases.map(({id: key, [lang]: item}, index) =>
    `<input class="trace-choice" type="radio" name="${id}" id="${id}-${esc(key)}" value="${esc(key)}" aria-describedby="${id}-${esc(key)}-note"${index === 0 ? ' checked' : ''}>
     <label for="${id}-${esc(key)}">${esc(item.label)}</label>`
  ).join('');
  const outcomes = block.cases.map(({id: key, [lang]: item}) =>
    `<div class="trace-outcome" data-case="${esc(key)}" id="${id}-${esc(key)}-note">
      <h3>${esc(item.next)}</h3><p>${esc(item.detail)}</p>
      <blockquote><strong>${esc(local.customer)}</strong><p>${esc(item.reply)}</p></blockquote>
    </div>`
  ).join('');
  const midpoint = (store + support) / 2;
  const replies = block.cases.filter(item => item[lang].handoff).map(({id: key, [lang]: item}) =>
    `<text class="trace-conditional" data-case="${esc(key)}" x="${midpoint}" y="184">${esc(item.handoff)}</text>`
  ).join('');

  return `<link rel="stylesheet" href="/blog-payment-trace.css">
    <figure class="payment-trace" aria-label="${esc(local.title)}">
      <fieldset><legend>${esc(local.legend)}</legend>${choices}
        <div class="trace-body">
          <div class="payment-trace-plot">
            <svg viewBox="0 0 336 218" width="336" height="218" role="img" aria-labelledby="${id}-title ${id}-desc">
              <title id="${id}-title">${esc(local.title)}</title>
              <desc id="${id}-desc">${esc(local.description)}</desc>
              ${actors}
              <g class="trace-ink" data-entry-series="down">
                ${handoff(bank, support, 94)}
                ${handoff(support, store, 145)}
                <g class="trace-reply-arrow">${handoff(store, support, 199, true)}</g>
              </g>
              <g class="trace-labels">
                <text x="${store}" y="81">${esc(local.reference)}</text>
                <text x="${midpoint}" y="132">${esc(local.lookup)}</text>
                <g class="trace-conditional trace-pending" data-case="notice">
                  <rect x="${store - 81}" y="164" width="162" height="31" rx="5"/>
                  <text x="${store}" y="185">${esc(local.waiting)}</text>
                </g>${replies}
              </g>
            </svg>
          </div>
          <div class="trace-notes">${outcomes}</div>
        </div>
      </fieldset>
    </figure>`;
}
