import {escapeHTML as esc} from './blog-core.mjs';
import {visibleWorkStories} from './work-stories-data.mjs?v=20261102-story-cards';

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
    const label=story.post?(lang==='fa'?'روایت کاری':'Work story'):plan;
    return `<a class="story-preview-card" href="${esc(link.href)}"><span class="story-preview-state">${label}</span><strong>${esc(story[lang].title)}</strong><span class="story-preview-arrow">${arrow}</span></a>`;
  }).join('')}</div></section>`;
}
