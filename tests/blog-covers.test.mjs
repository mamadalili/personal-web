import test from 'node:test';
import assert from 'node:assert/strict';
import { coverFor, renderPostCover } from '../blog-covers.mjs';
import { existsSync } from 'node:fs';
import { posts } from '../blog-data.mjs';
import { homePostPages } from '../home-blog.mjs';

const fa = { src: 'assets/blog/example-fa.webp', alt: 'تصویر', width: 1672, height: 941 };
const en = { src: 'assets/blog/example-en.webp', alt: 'An image', width: 1672, height: 941 };
const post = { cover: { fa, en } };

test('covers select the requested native language without leaking a foreign headline', () => {
  assert.deepEqual(coverFor(post, 'fa'), fa);
  assert.deepEqual(coverFor(post, 'en'), en);
  assert.equal(coverFor({ cover: { fa } }, 'en'), null);
  assert.equal(coverFor(post, 'de'), null);
  assert.notEqual(coverFor(post, 'fa'), fa);
});

test('cover paths and dimensions cannot embed arbitrary documents or private filesystem paths', () => {
  for (const src of ['https://site.test/image.webp', '//site.test/a.webp', 'javascript:alert(1)',
    'C:/private/photo.webp', 'assets/blog/../private.webp', 'assets/blog/a.svg', 'assets/blog/a.webp?x=1', 'assets/blog/a".webp']) {
    assert.equal(coverFor({ cover: { fa: { ...fa, src } } }, 'fa'), null, src);
  }
  for (const width of [0, -1, 1.5, Infinity, '1672', 10000]) {
    assert.equal(coverFor({ cover: { fa: { ...fa, width } } }, 'fa'), null);
  }
  assert.equal(coverFor(null, 'fa'), null);
  assert.equal(coverFor({ cover: { fa: { ...fa, alt: null } } }, 'fa'), null);
});

test('article covers retain localized alternatives while link thumbnails avoid duplicate announcements', () => {
  const article = renderPostCover(post, 'fa', { eager: true, decorative: false });
  assert.ok(article.includes('alt="تصویر"'));
  assert.ok(article.includes('loading="eager"'));
  assert.ok(article.includes('fetchpriority="high"'));
  const card = renderPostCover(post, 'en');
  assert.ok(card.includes('alt=""'));
  assert.ok(card.includes('loading="lazy"'));
  assert.ok(card.includes(en.src));
  assert.equal(renderPostCover({}, 'fa'), '');
});

test('published articles have real native cover files and the third post appears in the first Home pair', () => {
  for (const article of posts) {
    for (const language of ['fa', 'en']) {
      const cover = coverFor(article, language);
      assert.ok(cover, `${article.slug}: ${language}`);
      assert.ok(existsSync(new URL(`../${cover.src}`, import.meta.url)), cover.src);
    }
    assert.notEqual(article.cover.fa.src, article.cover.en.src);
  }
  assert.deepEqual(homePostPages(posts).map(page => page.map(item => item.slug)),
    [['ai-payoff-workload', 'solo-business'], ['ai-model-market']]);
});
