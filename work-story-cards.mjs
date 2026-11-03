import {escapeHTML as esc} from './blog-core.mjs';
import {visibleWorkStories} from './work-stories-data.mjs?v=20261103-cv-source';

export function renderCareerStoryCards(role,language,base,stories=visibleWorkStories(role?.id)){
  const lang=language==='en'?'en':'fa';
  if(!role||!stories.length)return '';
  const c=role[lang];
  const target=new URL('work-stories.html',base);
  target.searchParams.set('lang',lang);
  target.searchParams.set('role',role.id);
  const title=lang==='fa'?'روایت‌های این تجربه':'Stories from this role';
  const all=lang==='fa'?'دیدن روایت‌ها':'Explore the stories';
  const source=lang==='fa'?'مستند در CV':'Documented in CV';
  const needs=lang==='fa'?'نیازمند تکمیل':'Needs completion';
  const storyWord=lang==='fa'?'روایت':'Story';
  const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  return '<section class="career-stories-preview" aria-label="'+title+'"><header class="story-preview-head"><h4>'+title+'</h4><a class="career-story-all" href="'+esc(target.href)+'">'+all+'<span class="story-preview-arrow">'+arrow+'</span></a></header><div class="story-preview-rail">'+stories.map((story,index)=>{
    const link=new URL(target);link.searchParams.set('story',story.id);link.hash=story.id;
    const point=c.points[story.sourceIndex];
    const label=story.post?(lang==='fa'?'روایت کاری':'Work story'):point?source:needs;
    const cardTitle=point||storyWord+' '+(index+1)+' — '+needs;
    return '<a class="story-preview-card'+(point?'':' story-preview-card--missing')+'" href="'+esc(link.href)+'"><span class="story-preview-state">'+label+'</span><strong>'+esc(cardTitle)+'</strong><span class="story-preview-arrow">'+arrow+'</span></a>';
  }).join('')+'</div></section>';
}
