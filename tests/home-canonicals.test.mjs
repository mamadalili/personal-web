import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {readFileSync, readdirSync} from 'node:fs';
import {previewServer} from '../scripts/serve-site.mjs';
import {siteUrl} from '../public/site-config.mjs';
import {internalHref} from '../public/blog-core.mjs';

const root = new URL('../public/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const languages = ['fa', 'en'];
const expected = Object.fromEntries(languages.map(lang => [lang, siteUrl + '?lang=' + lang]));
const homePathname = /^\/(?:(?:index(?:\.(?:en|fa))?|landing)\.html)?$/;
const canonical = html => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const attribute = (tag, name) => tag.match(new RegExp('\\s' + name + '="([^"]*)"'))?.[1]?.replaceAll('&amp;', '&');

test('home canonicals and both reciprocal sitemap entries agree', () => {
  const homes = [...read('sitemap.xml').matchAll(/<url>([\s\S]*?)<\/url>/g)].filter(([, block]) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)[1];
    return homePathname.test(new URL(loc).pathname);
  });
  assert.deepEqual(homes.map(([, block]) => block.match(/<loc>([^<]+)<\/loc>/)[1]).sort(), Object.values(expected).sort());
  const alternates = {...expected, 'x-default': expected.fa};
  for (const [, block] of homes) {
    const links = [...block.matchAll(/<xhtml:link\b[^>]+\/>/g)];
    assert.equal(links.length, 3);
    assert.deepEqual(Object.fromEntries(links.map(([tag]) => [attribute(tag, 'hreflang'), attribute(tag, 'href')])), alternates);
  }
  for (const [lang, file] of [['fa', 'index.html'], ['en', 'index.en.html']]) {
    const html = read(file);
    assert.equal(canonical(html), expected[lang]);
    for (const [choice, href] of Object.entries(alternates)) {
      const tag = [...html.matchAll(/<link\b[^>]*>/g)].find(([tag]) => attribute(tag, 'hreflang') === choice);
      assert.equal(tag && attribute(tag[0], 'href'), href, file + ' ' + choice);
    }
    const other = lang === 'fa' ? 'en' : 'fa';
    const languageLink = html.match(/<noscript>[\s\S]*?<a\b([^>]+) lang="(en|fa)"/);
    assert.equal(languageLink?.[2], other);
    assert.equal(new URL(attribute(languageLink[1], 'href'), expected[lang]).href, expected[other]);
  }
});

test('home links in built page chrome, articles and language fallbacks use the target language directly', () => {
  const folders = ['', 'reading/fa/', 'reading/en/'];
  for (const folder of folders) {
    for (const file of readdirSync(new URL(folder, root)).filter(name => name.endsWith('.html'))) {
      const path = folder + file, html = read(path), lang = attribute(html.match(/<html\b[^>]*>/)[0], 'lang');
      const base = new URL(path, siteUrl);
      for (const [, attrs, content] of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
        const href = attribute(attrs, 'href');
        if (!href || href.startsWith('#')) continue;
        const url = new URL(href, base);
        const label = content.replace(/<[^>]+>/g, '').trim();
        const isHomeControl = attribute(attrs, 'class')?.split(/\s+/).includes('brand') || /^(Home|خانه|خانه \/ Home)$/.test(label);
        if (!isHomeControl && !(url.origin === base.origin && homePathname.test(url.pathname))) continue;
        assert.equal(url.href, expected[attribute(attrs, 'lang') || lang], path + ' ' + href);
      }
    }
  }
  for (const lang of languages) {
    assert.equal(internalHref('home', lang, [], 'https://example.test/personal/article.html'), 'https://example.test/personal/?lang=' + lang);
  }
});

test('old home addresses resolve in the right language, retaining campaign and CV bookmark parameters', async t => {
  const server = previewServer().listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const cases = [
    ['/', '', 302, '/?lang=fa'], ['/', 'en', 302, '/?lang=en'],
    ['/?utm_source=mail', 'en', 302, '/?lang=en&utm_source=mail'],
    ['/index.html', 'en', 302, '/?lang=en'], ['/index.en.html', 'fa', 301, '/?lang=en'],
    ['/index.html?lang=fa', 'en', 301, '/?lang=fa'], ['/index.html?lang=en', 'fa', 301, '/?lang=en'],
    ['/index.en.html?lang=fa', 'en', 301, '/?lang=fa'],
    ['/index.en.html?ref=a%2Bb', '', 301, '/?lang=en&ref=a%2Bb'],
    ['/landing.html', '', 302, '/?lang=fa'], ['/landing.html?utm_id=1&lang=en', 'fa', 301, '/?utm_id=1&lang=en'],
    ['/?tab=projects&lang=en', 'fa', 302, '/cv.en.html?tab=projects&lang=en'],
    ['/index.html?role=turbin', 'en', 302, '/cv.en.html?role=turbin'],
    ['/index.en.html?tab=about', 'fa', 302, '/cv.en.html?tab=about'],
    ['/landing.html?lang=fa&role=datis', 'en', 302, '/cv.fa.html?lang=fa&role=datis'],
  ];
  for (const [path, cookie, status, target] of cases) {
    const options = {redirect:'manual', headers:{Cookie:'portfolio_language=' + cookie}};
    const first = await fetch(origin + path, options);
    assert.equal(first.status, status, path);
    assert.equal(new URL(first.headers.get('location'), origin).href, origin + target, path);
    if (status === 302) {
      assert.match(first.headers.get('vary') || '', /Cookie/i, path);
      assert.match(first.headers.get('cache-control') || '', /no-store/i, path);
    }
    const final = await fetch(origin + target, options);
    assert.equal(final.status, 200, path);
    assert.equal(final.headers.get('location'), null, path);
    const lang = new URL(target, origin).searchParams.get('lang') || target.match(/cv\.(en|fa)\.html/)[1];
    const html = await final.text();
    assert.match(html, new RegExp('<html lang="' + lang + '"'), path);
    if (target.startsWith('/?')) assert.equal(canonical(html), expected[lang], path);
    else assert.ok(html.includes('data-page="cv"'), path);
  }
});
