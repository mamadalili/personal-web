import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {solutions} from '../public/solutions-data.mjs';
import {escapeHTML} from '../public/blog-core.mjs';
import {posts} from '../public/blog-summaries.mjs';
import {homeDocument, siteUrl} from '../public/site-config.mjs';
import {buildSitemapEntries} from '../public/sitemap-core.mjs';
import {publicFile} from '../scripts/public-preview.mjs';

test('every published route includes the shared entrance runtime and its content root', () => {
  const publicRoot = new URL('../public/', import.meta.url);
  for (const {loc} of buildSitemapEntries(siteUrl, {posts, solutions})) {
    const url = new URL(loc);
    const path = publicFile(url.pathname, url.searchParams);
    assert.ok(path, loc);
    const html = readFileSync(new URL('.' + path, publicRoot), 'utf8');
    assert.equal((html.match(/<main\b[^>]*\sid=["']main["']/gi) ?? []).length, 1, loc);
    const scripts = [...html.matchAll(/<script\b[^>]*\ssrc=["']([^"']+)["']/gi)];
    const runtime = scripts.filter(([, src]) => {
      const script = new URL(src, url);
      return script.origin === url.origin && script.pathname === '/portfolio.js';
    });
    assert.equal(runtime.length, 1, loc);
  }
});

for (const [lang, dir] of [['fa', 'rtl'], ['en', 'ltr']]) {
  for (const page of ['index', 'profile', 'contact', ...solutions.map(item => item.id)]) {
    test(`the ${lang} ${page} response includes its introduction before JavaScript runs`, () => {
      const file = page === 'index' ? homeDocument(lang) : page + (lang === 'en' ? '.en.html' : '.html');
      const html = readFileSync(new URL('../public/' + file, import.meta.url), 'utf8');
      if (lang === 'fa' && (page === 'contact' || solutions.some(item => item.id === page))) {
        assert.equal(readFileSync(new URL('../public/' + page + '.fa.html', import.meta.url), 'utf8'), html);
      }
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
      assert.match(html, new RegExp(`<html lang="${lang}" dir="${dir}"`));
      assert.ok(main);
      assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
      assert.doesNotMatch(main, /class="site-loader|\{(?:role|home)\}/);
      if (page === 'index') {
        assert.match(main, /<h1 id="home-title">[^<]+<br><em>[^<]+<\/em><\/h1><p>[^<]+/);
        assert.equal((main.match(/class="home-folder-link"/g) ?? []).length, 4);
        assert.match(main, new RegExp(`strategy\\.${lang}\\.html\\?lang=${lang}`));
      } else if (page === 'profile') {
        assert.match(main, /class="bio">[^<]+<\/p>/);
        assert.match(main, /id="intro"[\s\S]*?<h2>[\s\S]+?<\/h2><p>[^<]+<\/p>/);
        assert.match(main, /href="assets\/cv\/[^"]+\.pdf"/);
      } else if (page === 'contact') {
        assert.match(main, /<h1 id="contact-title">[^<]+<\/h1>/);
        assert.match(main, /class="contact-glass-copy">[\s\S]*?<p>[^<]+<\/p>/);
        assert.equal((main.match(/data-contact="/g) ?? []).length, 5);
      } else {
        const current = solutions.find(item => item.id === page);
        const {headline, intro} = current[lang];
        assert.ok(main.includes('<h1 id="solution-title">' + escapeHTML(headline[0]) + '<br><em>' + escapeHTML(headline[1]) + '</em></h1>'));
        assert.ok(main.includes('<p>' + escapeHTML(intro)));
        assert.ok(html.includes('content="' + escapeHTML(intro) + '"'));
        assert.ok(html.includes('data-solution="' + page + '"'));
        assert.equal((main.match(/class="home-folder-link"/g) ?? []).length, 4);
        if (current.story) assert.ok(main.includes('article.html?lang='+lang+'&amp;post='+current.story.post));
      }
    });
  }
}
