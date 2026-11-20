import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = path => readFileSync(new URL('../public/' + path, import.meta.url), 'utf8');
const stages = [['attention', 5], ['mechanism', 6], ['fit', 3], ['action', 3]];
for (const lang of ['fa', 'en']) {
  test('the ' + lang + ' ad storyboard ships all four selectable shots and their source counts', () => {
    const html = read('reading/' + lang + '/cold-traffic-ad.html');
    const figure = html.match(/<figure class="drawer-storyboard">([\s\S]*?)<\/figure>/)?.[1];
    assert.ok(figure, 'figure in the first response');
    const radios = [...figure.matchAll(/<input\b[^>]*type="radio"[^>]*>/g)].map(match => match[0]);
    assert.equal(radios.length, stages.length);
    assert.equal(radios.filter(tag => /\bchecked\b/.test(tag)).length, 1);
    assert.match(radios[0], /\bchecked\b/);
    const counts = [];
    for (const [index, [key, count]] of stages.entries()) {
      const id = 'storyboard-' + lang + '-drawer-' + key;
      assert.ok(radios[index].includes('aria-controls="' + id + '-panel"'));
      const label = figure.match(new RegExp('<label[^>]*for="' + id + '"[^>]*>([\\s\\S]*?)</label>'))?.[1];
      assert.ok(label);
      const marks = (label.match(/class="storyboard-mark"/g) || []).length;
      assert.equal(marks, count);
      counts.push(marks);
      assert.ok(figure.includes('id="' + id + '-panel" aria-labelledby="' + id + '-label"'));
      assert.ok(figure.includes('<td>' + new Intl.NumberFormat(lang).format(count) + '</td>'));
    }
    assert.equal(counts.reduce((a, b) => a + b, 0), 17);
    assert.ok(html.includes('https://x.com/derickcarneiro_/status/2123414633935520052'));
    assert.ok(read('blog.' + lang + '.html').includes('article.html?post=cold-traffic-ad&amp;lang=' + lang));
  });
}
