import {escapeHTML as esc} from './blog-core.mjs';

export function renderStockReservation(block, lang) {
  const id = `stock-${lang}-${esc(block.id)}`;
  const text = Object.fromEntries(Object.entries(block[lang]).map(([key, value]) => [key, esc(value)]));
  const number = new Intl.NumberFormat(lang);
  const onHand = block.available + block.damaged + block.reserved;
  const states = [
    {key: 'held', onHand, forSale: block.available, note: text.heldNote},
    {key: 'released', onHand, forSale: block.available + 1, note: text.releasedNote},
    {key: 'collected', onHand: onHand - 1, forSale: block.available, note: text.collectedNote},
  ];

  const choices = states.map(({key}) => `
    <input class="stock-choice" type="radio" name="${id}" id="${id}-${key}" value="${key}" aria-describedby="${id}-${key}-result"${key === 'held' ? ' checked' : ''}>
    <label for="${id}-${key}">${text[key]}</label>`).join('');
  const results = states.map(({key, onHand, forSale, note}) => `
    <div class="stock-result" data-case="${key}" id="${id}-${key}-result">
      <strong class="stock-case-title">${text[key]}</strong>
      <dl><div><dt>${text.onHand}</dt><dd>${number.format(onHand)}</dd></div>
      <div><dt>${text.forSale}</dt><dd>${number.format(forSale)}</dd></div></dl>
      <p>${note}</p>
    </div>`).join('');

  const release = {key: 'released', event: text.cancel, state: text.shelf};
  const pickup = {key: 'collected', event: text.pickup, state: text.customer};
  const [left, right] = lang === 'fa' ? [pickup, release] : [release, pickup];
  function destination(lane, x) {
    return `<g class="stock-destination ${lane.key}">
      <text class="stock-event" x="${x}" y="89">${lane.event}</text>
      <rect x="${x - 71}" y="144" width="142" height="42" rx="8"/>
      <text x="${x}" y="171">${lane.state}</text>
    </g>`;
  }

  return `<link rel="stylesheet" href="/blog-stock-reservation.css">
    <figure class="stock-reservation" aria-label="${text.title}">
      <fieldset><legend>${text.question}</legend>${choices}
        <div class="stock-state-plot">
          <svg viewBox="0 0 320 200" width="320" height="200" role="img" aria-labelledby="${id}-title ${id}-desc">
            <title id="${id}-title">${text.title}</title><desc id="${id}-desc">${text.description}</desc>
            <g class="stock-wires" data-entry-series="down" fill="none" stroke="currentColor">
              <path class="${left.key}" d="M144 58 V96 Q144 104 136 104 H88 Q80 104 80 112 V138 M76 133 l4 5 4 -5"/>
              <path class="${right.key}" d="M176 58 V96 Q176 104 184 104 H232 Q240 104 240 112 V138 M236 133 l4 5 4 -5"/>
            </g>
            <g class="stock-origin">
              <rect x="66" y="12" width="188" height="46" rx="8"/>
              <g class="stock-notebook" transform="translate(${lang === 'fa' ? 227 : 81} 25)" aria-hidden="true" fill="none" stroke="currentColor">
                <rect width="14" height="19" rx="2"/><path d="M4 0v19 M8 6h3 M8 9h3"/>
              </g>
              <text x="${lang === 'fa' ? 147 : 173}" y="40">${text.subject}</text>
            </g>
            ${destination(left, 80)}${destination(right, 240)}
          </svg>
        </div>${results}
      </fieldset>
    </figure>`;
}
