import test from 'node:test';
import assert from 'node:assert/strict';
import { blogLibrarySelection, journalEdition } from '../public/blog-library-model.mjs';
import { internalHref } from '../public/blog-core.mjs';
import {renderArchive} from '../public/blog-index.mjs';
const item=(slug,date,fa,en,extra={})=>({slug,date,status:'published',fa:{title:fa,excerpt:'یادگیری',category:'فناوری'},en:{title:en,excerpt:'Practical ideas',category:'Technology'},...extra});
const items=[item('old','2026-10-20','بازار مدل‌ها','AI market'),item('new','2026-10-26','کار و بازده','Work and revenue'),item('mid','2026-10-24','کسب‌وکار مستقل','Solo business'),item('draft','2026-10-27','پیش‌نویس','Draft',{status:'draft'})];
test('editorial landing features the newest article once and retains the remaining archive',()=>{
 const result=blogLibrarySelection(items,{lang:'fa'});
 assert.equal(result.featured.slug,'new');
 assert.deepEqual(result.items.map(row=>row.slug),['mid','old']);
 assert.deepEqual(result.categories,['فناوری']);
});
test('search includes native spelling variants and the alternate-language topic without changing displayed content',()=>{
 assert.deepEqual(blogLibrarySelection(items,{lang:'fa',query:'revenue'}).items.map(row=>row.slug),['new']);
 assert.equal(blogLibrarySelection(items,{lang:'fa',query:'كسب‌وكار'}).items[0].slug,'mid');
 assert.equal(blogLibrarySelection(items,{lang:'en',query:'missing'}).items.length,0);
 assert.equal(blogLibrarySelection(items,{lang:'fa',query:'کار'}).featured,null);
});
test('category filters show real matches including the feature, with no duplication',()=>{
 const result=blogLibrarySelection(items,{lang:'en',category:'Technology'});
 assert.equal(result.featured,null);
 assert.deepEqual(result.items.map(row=>row.slug),['new','mid','old']);
 assert.equal(blogLibrarySelection(items,{lang:'en',category:'Unknown'}).items.length,0);
});
test('Solutions links enter the same canonical selectable page in both languages and deployment prefixes',()=>{
 for(const language of ['fa','en']){
  assert.equal(internalHref('solutions',language,[],'https://example.test/site/'),internalHref('strategy',language,[],'https://example.test/site/'));
 }
});

test('an editorial pick can become the lead without appearing twice; incomplete collections return to the archive', () => {
 const stories = ['ai-video-production', 'strategic-next-move', 'product-page-decisions', 'boomerang-channels'].map(
   (slug, index) => item(slug, '2026-10-' + (29 - index), 'نوشته', 'Story'));
 const draft = item('search-to-sale','2026-10-22','پیش‌نویس','Draft',{status:'draft'});
 const edition = journalEdition([...stories, draft], 'en');
 assert.equal(edition.featured.slug, 'ai-video-production');
 assert.deepEqual(edition.picks.map(post => post.slug), ['strategic-next-move']);
 assert.deepEqual(edition.collections, []);
 assert.equal(edition.ordered.length, 4);
 assert.equal(edition.front.size, 2);
 const complete = journalEdition([...stories, {...draft, status:'published'}], 'fa');
 assert.deepEqual(complete.collections[0].steps.map(step => step.post.slug), ['search-to-sale','product-page-decisions','boomerang-channels']);
 assert.equal(complete.collections[0].guided, true);
 assert.ok(complete.collections[0].steps.every(step => step.label && step.note));
 assert.equal(journalEdition([draft], 'fa').front.size, 0);
});

test('a complete AI reading path takes precedence over picks and remains navigable when a member is the latest post', () => {
 const slugs = ['make-expertise-understandable','ai-content-system','ai-video-production'];
 const articles = slugs.map(slug => item(slug,'2026-11-01','نوشته','Story'));
 for (const lang of ['fa','en']) {
  const edition = journalEdition(articles,lang);
  assert.deepEqual(edition.collections[0].steps.map(step => step.post.slug), slugs);
  assert.ok(edition.collections[0].steps.every(step => step.label && step.note));
  assert.deepEqual(edition.picks,[]);
  const html = renderArchive({items:articles,lang});
  assert.ok(html.includes(`href="#story-${edition.featured.slug}"`));
  assert.ok(html.includes(`id="story-${edition.featured.slug}" href="reading/${lang}/${edition.featured.slug}.html"`));
 }
 assert.deepEqual(journalEdition([...articles.slice(0,2), {...articles[2],status:'draft'}], 'fa').collections, []);
});
