import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

for (const [lang, dir] of [['fa', 'rtl'], ['en', 'ltr']]) {
  for (const page of ['index', 'profile']) {
    test(`the ${lang} ${page} response includes its introduction before JavaScript runs`, () => {
      const file = page + (lang === 'en' ? '.en.html' : '.html');
      const html = readFileSync(new URL('../' + file, import.meta.url), 'utf8');
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
      assert.match(html, new RegExp(`<html lang="${lang}" dir="${dir}"`));
      assert.ok(main);
      assert.equal((main.match(/<h1\b/g) ?? []).length, 1);
      assert.doesNotMatch(main, /class="site-loader|\{(?:role|home)\}/);
      if (page === 'index') {
        assert.match(main, /<h1 id="home-title">[^<]+<br><em>[^<]+<\/em><\/h1><p>[^<]+/);
        assert.equal((main.match(/class="home-folder-link"/g) ?? []).length, 4);
        assert.match(main, new RegExp(`strategy\\.html\\?lang=${lang}`));
      } else {
        assert.match(main, /class="bio">[^<]+<\/p>/);
        assert.match(main, /id="intro"[\s\S]*?<h2>[\s\S]+?<\/h2><p>[^<]+<\/p>/);
        assert.match(main, /href="assets\/cv\/[^"]+\.pdf"/);
      }
    });
  }
}
