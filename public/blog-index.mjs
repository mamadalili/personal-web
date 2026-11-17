import {attachArchiveFilters} from './archive-controls.mjs';
import {escapeHTML as esc} from './blog-core.mjs';
import {renderPostCover} from './blog-covers.mjs';
import {journalEdition} from './blog-library-model.mjs';

export const libraryCopy = {
  fa: {
    title:'مجلهٔ بازاریابی و فناوری', intro:'دربارهٔ آدمی می‌نویسم که چیزی می‌خرد، تیمی که آن را می‌فروشد و تصمیم‌هایی که بین این دو گرفته می‌شود.',
    archive:'آرشیو نوشته‌ها', browse:'جست‌وجو در آرشیو', latest:'تازه‌ترین نوشته', picks:'انتخاب‌های من',
    inCollection:'در پرونده بخوان',
    search:'جست‌وجو در همهٔ نوشته‌ها', placeholder:'عنوان، موضوع یا نام شرکت', all:'همهٔ موضوع‌ها', topics:'موضوع',
    more:'نوشتهٔ دیگر', articles:'نوشته', results:'{count} نوشته از {total}', clear:'پاک کردن فیلترها',
    empty:'نوشته‌ای با این انتخاب پیدا نشد. یک واژه یا موضوع دیگر را امتحان کن.', noPosts:'اولین نوشته به‌زودی اینجا منتشر می‌شود.',
  },
  en: {
    title:'Marketing & Technology Journal', intro:'I write about the person buying a product, the team selling it and the decisions each of them makes along the way.',
    archive:'The archive', browse:'Search the archive', latest:'Latest story', picks:'Editor’s picks',
    inCollection:'Find it in the collection',
    search:'Search all articles', placeholder:'Title, topic or company', all:'All topics', topics:'Topic',
    more:'more articles', articles:'articles', results:'{count} of {total} articles', clear:'Clear filters',
    empty:'No articles match. Try a different word or topic.', noPosts:'The first article will appear here.',
  },
};

const searchIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>';

export function renderArchive({lang, items}) {
  const t = libraryCopy[lang], edition = journalEdition(items, lang);
  const {featured, picks, collections, ordered, front, categories} = edition;
  const other = lang === 'fa' ? 'en' : 'fa';
  const dates = new Intl.DateTimeFormat(lang, {dateStyle:'medium'});
  const numbers = new Intl.NumberFormat(lang);
  const href = post => 'reading/' + lang + '/' + esc(post.slug) + '.html';
  const time = post => `<time datetime="${esc(post.date)}">${esc(dates.format(new Date(post.date + 'T12:00:00Z')))}</time>`;
  const topic = post => `<span class="journal-topic">${esc(post[lang].category)}</span>`;
  const employer = post => post.fa.category === 'روایت‌های کاری' && post[lang].subtitle
    ? `<span class="journal-employer">${esc(post[lang].subtitle)}</span>` : '';
  const art = (post, options = {}) => renderPostCover(post, lang, {className:'journal-art', preview:true, ...options});

  function lead(post) {
    const local = post[lang];
    const inCollection = collections.some(group => group.steps.some(step => step.post.slug === post.slug));
    return `<article class="journal-lead">
      <div class="journal-rubric"><span>${t.latest}</span>${time(post)}</div>
      <a href="${inCollection ? '#story-' + esc(post.slug) : href(post)}" aria-labelledby="journal-lead-title">
        ${art(post, {preview:false, eager:true, sizes:'(max-width: 740px) 95vw, (max-width: 1220px) 60vw, 700px'})}
        <div class="journal-lead-copy">
          <div class="journal-byline">${topic(post)}${employer(post)}</div>
          <h2 id="journal-lead-title">${esc(local.title)}</h2>
          <p>${esc(local.excerpt)}</p>${inCollection ? `<small>${t.inCollection}</small>` : ''}
        </div>
      </a></article>`;
  }

  function pick(post) {
    return `<a class="journal-pick" href="${href(post)}">
      ${art(post)}
      <div>${topic(post)}<h3>${esc(post[lang].title)}</h3><small>${esc(post[lang].readTime)}</small></div>
    </a>`;
  }

  function collectionPanel(group) {
    const steps = group.steps.map(({post, label, note}, index) =>
      `<li><a id="story-${esc(post.slug)}" href="${href(post)}">
        <span class="journal-stage">${group.guided ? `<b aria-hidden="true">${numbers.format(index + 1)}</b>` : ''}${esc(label)}</span>
        ${art(post)}<h3>${esc(post[lang].title)}</h3>${note ? `<p>${esc(note)}</p>` : ''}
      </a></li>`);
    return `<section class="journal-collection${group.guided ? ' journal-collection-guided' : ''}" id="${group.id}" aria-labelledby="${group.id}-title" data-journal-front>
      <header><span class="journal-kicker">${esc(group.name)}</span><h2 id="${group.id}-title">${esc(group.title)}</h2><p>${esc(group.intro)}</p></header>
      <ol role="list">${steps.join('')}</ol>
    </section>`;
  }

  function row(post) {
    const local = post[lang], alternate = post[other];
    const keywords = [local.subtitle, local.excerpt, alternate.title, alternate.subtitle, alternate.category, alternate.excerpt].filter(Boolean).join(' ');
    return `<a class="journal-row" href="${href(post)}" data-topic="${esc(local.category)}" data-alternate-text="${esc(keywords)}"${front.has(post.slug) ? ' data-on-front hidden' : ''}>
      ${art(post)}
      <div class="journal-row-copy"><div class="journal-byline">${topic(post)}${employer(post)}</div>
        <h3>${esc(local.title)}</h3><div class="journal-row-meta">${time(post)}<small>${esc(local.readTime)}</small></div></div>
    </a>`;
  }

  const count = ordered.length - front.size;
  return `<header class="journal-masthead">
    <h1>${esc(t.title)}</h1><p>${esc(t.intro)}</p>
    <nav class="journal-jumps" aria-label="${lang === 'fa' ? 'بخش‌های مجله' : 'Journal sections'}">
      ${collections.map(group => `<a href="#${group.id}" data-front-link>${esc(group.name)}</a>`).join('')}
      <a href="#library-heading">${t.browse}</a>
    </nav>
  </header>
  ${featured ? `<div class="journal-front${picks.length ? '' : ' journal-front-solo'}" data-journal-front>
    ${lead(featured)}
    ${picks.length ? `<section class="journal-picks" aria-labelledby="journal-picks-heading"><h2 class="journal-rubric" id="journal-picks-heading">${t.picks}</h2>${picks.map(pick).join('')}</section>` : ''}
  </div>` : ''}
  ${collections.map(collectionPanel).join('')}
  <section class="journal-archive" data-library-controls aria-labelledby="library-heading" data-count-label="${t.results}" data-empty="${t.empty}" data-no-posts="${t.noPosts}">
    <div class="journal-archive-head library-tools"><h2 id="library-heading" tabindex="-1">${t.archive}</h2>
      <div class="journal-controls">
        <label class="journal-search">${searchIcon}<span class="visually-hidden">${t.search}</span><input id="blog-search" disabled type="search" autocomplete="off" placeholder="${t.placeholder}"></label>
        <label class="journal-select"><span class="visually-hidden">${t.topics}</span><select id="journal-topic" disabled><option value="">${t.all}</option>${categories.map(name => `<option value="${esc(name)}">${esc(name)}</option>`).join('')}</select></label>
      </div>
    </div>
    <div class="journal-feedback"><p class="library-status" role="status" aria-live="polite" aria-atomic="true">${ordered.length ? numbers.format(count) + ' ' + (front.size ? t.more : t.articles) : t.noPosts}</p>
      <button type="button" class="library-clear" hidden>${t.clear}</button></div>
    <div id="blog-post-list" class="journal-list">${ordered.map(row).join('')}</div>
  </section>`;
}

export function mountBlogIndex(root, {lang, items, signal}) {
  root.classList.add('blog-index');
  root.classList.remove('article-page');
  if (root.dataset.readingLang !== lang || !root.querySelector('.journal-masthead')) {
    root.innerHTML = renderArchive({lang, items});
  }
  attachArchiveFilters(root, signal);
}
