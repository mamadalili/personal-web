import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const root = new URL('../', import.meta.url);
const shells = readdirSync(root).filter(name => name.endsWith('.html'))
  .map(name => ({name, html: readFileSync(new URL(name, root), 'utf8')}))
  .filter(({html}) => html.includes('class="site-header"'));

function visit(storage, blocked = false) {
  const events = new Map(), metas = new Map(), buttons = [], elements = [];
  const html = {dataset:{theme:'light'},lang:'fa'};
  class HTMLElement {
    attachShadow() {
      const button = {attributes:{},setAttribute(key,value){this.attributes[key]=value;},
        addEventListener(name,callback){if(name==='click')this.click=callback;}};
      buttons.push(button);
      return {set innerHTML(value){},querySelector(){return button;}};
    }
  }
  let Switch;
  runInNewContext(readFileSync(new URL('day-night.js',root),'utf8'), {
    document:{documentElement:html,querySelectorAll:()=>elements,
      querySelector(selector){if(!metas.has(selector))metas.set(selector,{});return metas.get(selector);}},
    HTMLElement,customElements:{define(name,constructor){Switch=constructor;}},
    MutationObserver:class {observe(){}},
    sessionStorage:{getItem(key){if(blocked)throw Error('Blocked');return storage.get(key);},
      setItem(key,value){if(blocked)throw Error('Blocked');storage.set(key,value);}},
    window:{addEventListener(name,callback){events.set(name,callback);}}
  });
  const control = new Switch();elements.push(control);control.connectedCallback();
  return {html,button:buttons[0],restore:()=>events.get('pageshow')()};
}

test('manual theme survives navigation, refresh and history in the current tab', () => {
  const storage = new Map(), home = visit(storage);
  assert.equal(home.html.dataset.theme,'light');
  home.button.click();
  assert.equal(home.html.dataset.theme,'dark');
  assert.equal(home.button.attributes['aria-checked'],'true');
  const solution = visit(storage);
  assert.equal(solution.html.dataset.theme,'dark');
  assert.equal(visit(storage).html.dataset.theme,'dark');
  solution.button.click();
  home.restore();
  assert.equal(home.html.dataset.theme,'light');
  assert.equal(home.button.attributes['aria-checked'],'false');
  assert.equal(visit(new Map()).html.dataset.theme,'light');
});

test('blocked browser storage still permits manually switching the current page', () => {
  const page = visit(new Map(),true);
  page.button.click();
  assert.equal(page.html.dataset.theme,'dark');
  page.button.click();
  assert.equal(page.html.dataset.theme,'light');
});

test('a saved dark choice or a dark OS cannot select the starting theme', () => {
  const runtime = readFileSync(new URL('day-night.js', root), 'utf8');
  assert.doesNotMatch(runtime, /prefers-color-scheme|localStorage/);
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
    const script = html.match(/<script src="\/?day-night\.js\?[^"]+"><\/script>/);
    assert.ok(script && html.indexOf(script[0]) < html.indexOf('rel="stylesheet"'), name);
    assert.ok(init >= 0 && init < html.indexOf('rel="stylesheet"'), name);
    assert.match(html, /class="header-end">[^\n]*?<day-night-switch><\/day-night-switch>[^\n]*?id="language"/, name);
    assert.equal(html.match(/<day-night-switch>/g)?.length, 1, name);
    assert.match(html, /href="\/?color-mode\.css\?[^"]+">/, name);
  }
});
