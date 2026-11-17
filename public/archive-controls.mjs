import {normalizeLibraryText} from './blog-library-model.mjs';

export function attachArchiveFilters(root, signal) {
  const document = root.ownerDocument;
  if (!document.getElementById('journal-style')) {
    const sheet = document.createElement('link');
    sheet.id = 'journal-style';
    sheet.rel = 'stylesheet';
    sheet.href = new URL('./journal.css?v=20261117', import.meta.url).href;
    document.head.append(sheet);
  }
  const archive = root.querySelector('[data-library-controls]');
  const search = archive.querySelector('#blog-search');
  const select = archive.querySelector('#journal-topic');
  const status = archive.querySelector('.library-status');
  const clear = archive.querySelector('.library-clear');
  const front = root.querySelectorAll('[data-journal-front], [data-front-link]');
  const cards = [...archive.querySelectorAll('#blog-post-list > a')].map(node => ({
    node, onFront:node.hasAttribute('data-on-front'), topic:normalizeLibraryText(node.dataset.topic),
    text:normalizeLibraryText([node.dataset.topic, node.querySelector('h3').textContent, node.dataset.alternateText].join(' ')),
  }));
  const numbers = new Intl.NumberFormat(root.ownerDocument.documentElement.lang);
  const initialStatus = status.dataset.initial ?? status.textContent;
  status.dataset.initial = initialStatus;
  const url = new URL(location.href);
  search.value = url.searchParams.get('q') || '';
  select.value = url.searchParams.get('topic') || '';
  if (select.selectedIndex < 0) select.selectedIndex = 0;

  function update(event) {
    const topic = normalizeLibraryText(select.value);
    const terms = normalizeLibraryText(search.value).split(' ').filter(Boolean);
    const filtering = Boolean(topic || terms.length);
    const top = archive.getBoundingClientRect().top;
    const moved = front.length && front[0].hidden !== filtering;
    for (const part of front) part.hidden = filtering;
    let matches = 0;
    for (const {node, onFront, topic:cardTopic, text} of cards) {
      const show = filtering ? (!topic || cardTopic === topic) && terms.every(term => text.includes(term)) : !onFront;
      node.hidden = !show;
      if (show) matches++;
    }
    status.textContent = !filtering ? initialStatus : matches
      ? archive.dataset.countLabel.replace('{count}', numbers.format(matches)).replace('{total}', numbers.format(cards.length))
      : archive.dataset.empty;
    clear.hidden = !filtering;
    if (event) {
      const address = new URL(location.href);
      for (const [key, value] of [['q', search.value.trim()], ['topic', select.value]]) {
        if (value) address.searchParams.set(key, value);
        else address.searchParams.delete(key);
      }
      if (address.href !== location.href) history.replaceState(history.state, '', address);
      // Keep the controls under the reader's hand as the edition folds or reopens above them.
      if (moved && top < innerHeight && top > -archive.offsetHeight) {
        window.scrollBy({top:archive.getBoundingClientRect().top - top, behavior:'instant'});
      }
    }
  }

  search.addEventListener('input', update, {signal});
  select.addEventListener('change', update, {signal});
  clear.addEventListener('click', event => {
    search.value = '';
    select.value = '';
    search.focus({preventScroll:true});
    update(event);
  }, {signal});
  search.disabled = select.disabled = false;
  update();
}
