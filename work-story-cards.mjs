import {posts} from './work-story-posts.mjs?v=20261111-work-journals';
import {escapeHTML as esc, internalHref} from './blog-core.mjs';
import {visibleWorkStories} from './work-stories-data.mjs?v=20261111-work-journals';

export function renderCareerStoryCards(roleId,language,base,stories=visibleWorkStories(roleId)){
  const lang=language==='en'?'en':'fa';
  if(!stories.length)return '';
  const target=new URL('work-stories.html',base);
  target.searchParams.set('lang',lang);
  target.searchParams.set('role',roleId);
  const title=lang==='fa'?'روایت‌های این تجربه':'Stories from this role';
  const all=lang==='fa'?'دیدن روایت‌ها':'Explore the stories';
  const plan=lang==='fa'?'طرح روایت':'Story outline';
  const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  return `<section class="career-stories-preview" aria-label="${title}"><header class="story-preview-head"><h4>${title}</h4><a class="career-story-all" href="${esc(target.href)}">${all}<span class="story-preview-arrow">${arrow}</span></a></header><div class="story-preview-rail">${stories.map(story=>{
    const link=new URL(target);link.searchParams.set('story',story.id);link.hash=story.id;
    const article=story.post && internalHref('post:'+story.post,lang,posts,base);
    const thumbnail=article ? '<img class="work-story-cover" src="assets/blog/previews/'+esc(story.post)+'-'+lang+'.webp" width="768" height="432" alt="" loading="lazy">' : '';
    const label=article?(lang==='fa'?'روایت کاری':'Work story'):plan;
    return `<a class="story-preview-card" href="${esc(article||link.href)}">${thumbnail}<span class="story-preview-state">${label}</span><strong>${esc(story[lang].title)}</strong><span class="story-preview-arrow">${arrow}</span></a>`;
  }).join('')}</div></section>`;
}
