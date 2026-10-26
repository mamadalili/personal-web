import { publishedPosts } from './blog-core.mjs';
const normalized=value=>String(value??'').normalize('NFKC').replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/\u200c/g,' ').replace(/\s+/g,' ').trim().toLocaleLowerCase();
export function blogLibrarySelection(posts,{lang='fa',query='',category=''}={}){
 const language=lang==='en'?'en':'fa',live=publishedPosts(posts).filter(post=>post.fa?.title&&post.en?.title);
 const categories=[...new Set(live.map(post=>post[language].category).filter(Boolean))];
 const terms=normalized(query).split(' ').filter(Boolean),filtered=terms.length>0||!!category;
 const matches=live.filter(post=>{
  const text=normalized(['fa','en'].flatMap(key=>[post[key].title,post[key].excerpt,post[key].category]).join(' '));
  return (!category||post[language].category===category)&&terms.every(term=>text.includes(term));
 });
 return {featured:filtered?null:matches[0]||null,items:filtered?matches:matches.slice(1),categories,filtered};
}
