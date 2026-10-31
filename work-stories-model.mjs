import { internalHref, publishedPosts } from './blog-core.mjs';

const hasText=value=>typeof value==='string'&&!!value.trim();
function nativeCopyPair(fa,en){
  if(typeof fa==='string'||typeof en==='string')return hasText(fa)&&hasText(en);
  if(Array.isArray(fa)||Array.isArray(en))return Array.isArray(fa)&&Array.isArray(en)&&fa.length>0&&fa.length===en.length&&fa.every((value,index)=>nativeCopyPair(value,en[index]));
  if(!fa||!en||typeof fa!=='object'||typeof en!=='object')return false;
  const keys=Object.keys(fa);
  return keys.length>0&&keys.length===Object.keys(en).length&&keys.every(key=>Object.hasOwn(en,key)&&nativeCopyPair(fa[key],en[key]));
}

// Walk the shared article's localized copy, including nested tabs, choices,
// chart labels and quiz explanations. A partial translation fails as a whole.
function nativePairs(value){
  if(!value||typeof value!=='object')return 0;
  let count=0;
  for(const [fa,en] of [['fa','en'],['faExplanation','enExplanation']]){
    if(Object.hasOwn(value,fa)||Object.hasOwn(value,en)){
      if(!nativeCopyPair(value[fa],value[en]))return -1;
      count++;
    }
  }
  for(const [key,child] of Object.entries(value)){
    if(['fa','en','faExplanation','enExplanation'].includes(key))continue;
    const nested=nativePairs(child);if(nested<0)return -1;count+=nested;
  }
  return count;
}

function completeNativeBody(article){
  return ['fa','en'].every(lang=>hasText(article[lang]?.title)&&hasText(article[lang]?.excerpt))&&
    Array.isArray(article.sections)&&article.sections.length>0&&article.sections.every(section=>
      ['fa','en'].every(lang=>hasText(section[lang]?.title))&&Array.isArray(section.blocks)&&section.blocks.length>0&&
      section.blocks.every(block=>{
        if(!block||typeof block.type!=='string')return false;
        if(['paragraph','callout'].includes(block.type)&&!['fa','en'].every(lang=>hasText(block[lang])))return false;
        return nativePairs(block)>0;
      }));
}

export function selectWorkRole(roles,requested){
  return roles.find(role=>role.id===requested)||roles[0]||null;
}

export function workStoryHref(story,language,posts=[],base='https://example.invalid/'){
  if(typeof story?.post!=='string'||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(story.post))return null;
  const article=publishedPosts(posts).find(post=>post.slug===story.post);
  if(!article||!completeNativeBody(article))return null;
  return internalHref(`post:${article.slug}`,language,posts,base);
}
