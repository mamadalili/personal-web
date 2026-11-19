import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';

const site = new URL('../public/', import.meta.url);

test('the deployable directory contains the existing public entry points and shared assets', () => {
  for (const file of ['index.html', 'home.en.html', 'profile.html', 'contact.fa.html', 'contact.en.html',
    'strategy.fa.html', 'strategy.en.html', 'blog.html', 'article.html', 'portfolio.js', 'portfolio.css',
    'runtime-blog.mjs', 'assets/brand/monogram.svg', 'figures/solo-model.mjs', '.htaccess', 'sitemap.xml', 'robots.txt']) {
    assert.ok(existsSync(new URL(file, site)), `Missing public dependency: ${file}`);
  }
  const html = readFileSync(new URL('index.html', site), 'utf8');
  assert.match(html, /src="portfolio\.js\?v=/);
  assert.match(html, /href="portfolio\.css\?v=/);
});

test('development resources stay outside the deployable directory', () => {
  for (const name of ['.git', '.agents', 'docs', 'tests', 'scripts', 'react-site', 'README.md']) {
    assert.equal(existsSync(new URL(name, site)), false, name);
  }
});
