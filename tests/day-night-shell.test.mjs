import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';

const root = new URL('../', import.meta.url);
const shells = readdirSync(root).filter(name => name.endsWith('.html'))
  .map(name => ({name, html: readFileSync(new URL(name, root), 'utf8')}))
  .filter(({html}) => html.includes('class="site-header"'));

test('every shared header exposes one switch and resolves the theme before the first stylesheet', () => {
  for (const {name, html} of shells) {
    const init = html.indexOf("localStorage.getItem('portfolio-color-mode')");
    assert.match(html, /<script src="\/?day-night\.js\?[^"]+" defer>/);
    assert.ok(init >= 0 && init < html.indexOf('rel="stylesheet"'), name);
    assert.match(html, /class="header-end">[^\n]*?<day-night-switch><\/day-night-switch>[^\n]*?id="language"/, name);
    assert.equal(html.match(/<day-night-switch>/g)?.length, 1, name);
    assert.match(html, /href="\/?color-mode\.css\?[^"]+">/, name);
  }
});
