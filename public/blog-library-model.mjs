import { publishedPosts } from './blog-core.mjs';
export const normalizeLibraryText=value=>String(value??'').normalize('NFKC').replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/\u200c/g,' ').replace(/\s+/g,' ').trim().toLocaleLowerCase();
export function blogLibrarySelection(posts,{lang='fa',query='',category=''}={}){
 const language=lang==='en'?'en':'fa',live=publishedPosts(posts).filter(post=>post.fa?.title&&post.en?.title);
 const categories=[...new Map(live.map(post=>post[language].category).filter(Boolean).map(name=>[normalizeLibraryText(name),name])).values()];
 const terms=normalizeLibraryText(query).split(' ').filter(Boolean),filtered=terms.length>0||!!category;
 const matches=live.filter(post=>{
  const text=normalizeLibraryText(['fa','en'].flatMap(key=>[post[key].title,post[key].subtitle,post[key].excerpt,post[key].category]).join(' '));
  return (!category||normalizeLibraryText(post[language].category)===normalizeLibraryText(category))&&terms.every(term=>text.includes(term));
 });
 return {featured:filtered?null:matches[0]||null,items:filtered?matches:matches.slice(1),categories,filtered};
}

const editorPicks = ['strategic-next-move', 'ai-video-production'];
const purchaseJourney = [
  {slug:'search-to-sale', fa:'پیدا کردن محصول', en:'Discovery'},
  {slug:'product-page-decisions', fa:'انتخاب مدل', en:'Choosing a model'},
  {slug:'boomerang-channels', fa:'پیگیری پرداخت', en:'Tracing a payment'},
];

export function journalEdition(posts, lang) {
  const {featured, items, categories} = blogLibrarySelection(posts, {lang});
  const ordered = featured ? [featured, ...items] : [];
  const available = new Map(items.map(post => [post.slug, post]));
  const picks = editorPicks.map(slug => available.get(slug)).filter(Boolean);
  for (const post of picks) available.delete(post.slug);
  const journey = purchaseJourney.map(step => ({post:available.get(step.slug), label:step[lang]}));
  // The collection promises a complete journey from discovery to payment.
  const collection = journey.every(step => step.post) ? journey : [];
  const front = new Set([featured, ...picks, ...collection.map(step => step.post)].filter(Boolean).map(post => post.slug));
  return {featured, picks, collection, ordered, front, categories};
}
