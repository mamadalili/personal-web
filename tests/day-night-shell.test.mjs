import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';

const root = new URL('../', import.meta.url);
const shells = readdirSync(root).filter(name => name.endsWith('.html'))
  .map(name => ({name, html: readFileSync(new URL(name, root), 'utf8')}))
  .filter(({html}) => html.includes('class="site-header"'));

test('a saved dark choice or a dark OS cannot select the starting theme', () => {
  const runtime = readFileSync(new URL('day-night.js', root), 'utf8');
  assert.doesNotMatch(runtime, /prefers-color-scheme|localStorage|sessionStorage/);
  for (const lang of ['fa','en']) {
    const dir = new URL(`reading/${lang}/`, root);
    for (const name of readdirSync(dir).filter(name => name.endsWith('.html'))) {
      const html = readFileSync(new URL(name, dir), 'utf8');
      assert.match(html, new RegExp(`<html lang="${lang}"[^>]* data-theme="light">`), name);
      assert.match(html, /<meta name="color-scheme" content="only light">/, name);
    }
  }
});

test('every shared header exposes one switch and starts in light mode before the first stylesheet', () => {
  for (const {name, html} of shells) {
    const init = html.indexOf('<meta name="color-scheme" content="only light">');
    assert.match(html, /<html[^>]* data-theme="light">/);
    assert.doesNotMatch(html, /prefers-color-scheme|portfolio-color-mode/);
    assert.match(html, /<script src="\/?day-night\.js\?[^"]+" defer>/);
    assert.ok(init >= 0 && init < html.indexOf('rel="stylesheet"'), name);
    assert.match(html, /class="header-end">[^\n]*?<day-night-switch><\/day-night-switch>[^\n]*?id="language"/, name);
    assert.equal(html.match(/<day-night-switch>/g)?.length, 1, name);
    assert.match(html, /href="\/?color-mode\.css\?[^"]+">/, name);
  }
});
