import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {posts, articleTemplate} from '../blog-data.mjs';
import {posts as summaries, templateSrc} from '../blog-summaries.mjs';
import {postSummaries} from '../blog-summary-model.mjs';
import {buildBlogRuntime} from '../scripts/generate-blog-runtime.mjs';
import {loadArticleData} from '../blog-article-data.mjs';
import {blogLibrarySelection} from '../blog-library-model.mjs';
import {homePostPages} from '../home-blog.mjs';

test('Home and archive dependency graphs exclude article bodies and article-only widgets', () => {
  const visit = (file, seen = new Set()) => {
    if (seen.has(file.href)) return seen;
    seen.add(file.href);
    const source = readFileSync(file, 'utf8');
    for (const [, path] of source.matchAll(/\bfrom\s+['"](\.\/[^'"]+\.mjs)(?:\?[^'"]*)?['"]/g)) visit(new URL(path, file), seen);
    return seen;
  };
  for (const entry of ['home-blog.mjs', 'blog-list.mjs']) {
    const graph = [...visit(new URL(`../${entry}`, import.meta.url))];
    assert.ok(graph.some(path => path.endsWith('/blog-summaries.mjs')));
    assert.ok(graph.every(path => !/\/(?:posts\/|blog-data\.mjs|blog-widgets\.mjs|blog-market\.mjs)/.test(path)), entry);
  }
});

test('lightweight lists preserve the complete published inventory, native search and ordering', () => {
  assert.deepEqual(summaries.map(({dataSrc, ...post}) => post), postSummaries(posts));
  assert.deepEqual(homePostPages(summaries).map(page => page.map(post => post.slug)), homePostPages(posts).map(page => page.map(post => post.slug)));
  for (const lang of ['fa', 'en']) {
    for (const query of ['', 'AI', 'بازار', 'Strategy']) {
      const select = items => blogLibrarySelection(items, {lang, query});
      assert.deepEqual(select(summaries).items.map(post => post.slug), select(posts).items.map(post => post.slug));
    }
  }
  for (const summary of summaries) {
    assert.equal(summary.sections, undefined);
    assert.equal(summary.sources, undefined);
  }
});

test('generated article data retains every original field and stays in sync', () => {
  for (const [name, content] of buildBlogRuntime(posts, articleTemplate)) {
    assert.equal(readFileSync(new URL(`../${name}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n'), content, name);
  }
  for (const summary of summaries) {
    assert.deepEqual(JSON.parse(readFileSync(new URL(`../${summary.dataSrc}`, import.meta.url))), posts.find(post => post.slug === summary.slug));
  }
  assert.deepEqual(JSON.parse(readFileSync(new URL(`../${templateSrc}`, import.meta.url))), articleTemplate);
});

test('only the requested public article is fetched, with cancellation and failure handling', async () => {
  const controller = new AbortController(), seen = [];
  const value = await loadArticleData(summaries[0].dataSrc, {signal: controller.signal, base: 'https://site.test/sub/blog-article-data.mjs', fetcher: async (url, options) => {
    seen.push({url: url.href, signal: options.signal});
    return {ok: true, json: async () => ({slug: summaries[0].slug})};
  }});
  assert.deepEqual(value, {slug: summaries[0].slug});
  assert.deepEqual(seen, [{url: `https://site.test/sub/${summaries[0].dataSrc}`, signal: controller.signal}]);
  await assert.rejects(loadArticleData(summaries[0].dataSrc, {fetcher: async () => ({ok: false, status: 404})}), /404/);
  for (const source of ['../private.json', 'https://other.test/a.json', 'assets/posts/a.json', 'assets/posts/../a-aaaaaaaaaaaaaaaa.json']) {
    await assert.rejects(loadArticleData(source, {fetcher: () => assert.fail('Unsafe fetch')}), /Invalid/);
  }
});

test('unmount cancels an in-flight article before a language switch replaces its DOM', async () => {
  const {mountBlog, unmountBlog} = await import('../blog.mjs');
  const previousFetch = globalThis.fetch, previousLocation = globalThis.location;
  let release, signal;
  globalThis.location = {href: 'https://site.test/article.html', search: `?post=${summaries[0].slug}`};
  globalThis.fetch = async (_, options) => {
    signal = options.signal;
    return new Promise(resolve => { release = resolve; });
  };
  const root = {classList: {remove() {}}, isConnected: true, innerHTML: 'New language loading'};
  try {
    const pending = mountBlog(root, {mode: 'article'});
    unmountBlog();
    assert.equal(signal.aborted, true);
    release({ok: true, json: async () => posts.find(post => post.slug === summaries[0].slug)});
    await pending;
    assert.equal(root.innerHTML, 'New language loading');
  } finally {
    unmountBlog();
    globalThis.fetch = previousFetch;
    if (previousLocation === undefined) delete globalThis.location; else globalThis.location = previousLocation;
  }
});
