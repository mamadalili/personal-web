import {normalizeLibraryText} from './blog-library-model.mjs';

export function attachArchiveFilters(root, signal) {
  const archive = root.querySelector('[data-library-controls]');
  const grid = archive.querySelector('#blog-post-list');
  const heading = archive.querySelector('#library-heading');
  const headingText = heading.textContent;
  const feature = root.querySelector('.library-feature');
  const featureCard = archive.querySelector('[data-feature-card]')?.content.firstElementChild?.cloneNode(true);
  const search = archive.querySelector('#blog-search');
  const clear = archive.querySelector('.library-clear');
  const status = archive.querySelector('.library-status');
  const buttons = [...archive.querySelectorAll('[data-library-filter]')];
  const cards = [featureCard, ...grid.children].filter(Boolean).map(node => {
    const topic = node.querySelector('.library-meta > span').textContent;
    const text = normalizeLibraryText([topic, node.querySelector('h3').textContent,
      node.querySelector('p').textContent, node.dataset.alternateText].join(' '));
    return {node, topic, text};
  });
  let selected = buttons[0];

  function update() {
    const topic = selected === buttons[0] ? '' : selected.textContent;
    const terms = normalizeLibraryText(search.value).split(' ').filter(Boolean);
    const filtered = Boolean(topic || terms.length);
    const matches = cards.filter(({node, topic: cardTopic, text}) =>
      (filtered || node !== featureCard) && (!topic || cardTopic === topic) && terms.every(term => text.includes(term)));
    if (feature) feature.hidden = filtered;
    grid.replaceChildren(...matches.map(card => card.node));
    heading.textContent = filtered ? archive.dataset.results : headingText;
    status.textContent = matches.length || (!filtered && feature) ? '' : cards.length ? archive.dataset.empty : archive.dataset.noPosts;
    clear.hidden = !filtered;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button === selected));
  }

  for (const button of buttons) {
    button.addEventListener('click', () => { selected = button; update(); }, {signal});
    button.disabled = false;
  }
  clear.addEventListener('click', () => {
    selected = buttons[0];
    search.value = '';
    update();
    search.focus();
  }, {signal});
  search.addEventListener('input', update, {signal});
  search.disabled = false;
  if (search.value) update();
}
