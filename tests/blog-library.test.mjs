import test from 'node:test';
import assert from 'node:assert/strict';
import { blogLibrarySelection } from '../blog-library-model.mjs';
import { internalHref } from '../blog-core.mjs';
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
