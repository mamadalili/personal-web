import { escapeHTML as esc } from './blog-core.mjs';
import { renderPostCover } from './blog-covers.mjs';
import { blogLibrarySelection } from './blog-library-model.mjs';

const copy={
 fa:{eyebrow:'یادداشت‌ها و تجربه‌ها',title:"پرسش‌های بازاریابی و فناوری،<br>با مثال و دیتا.",intro:"مطالبی درباره بازار، فروش آنلاین و کار با AI؛ با نمودار، مقایسه یا تمرین که فهم موضوع را آسان‌تر می‌کند.",latest:'تازه‌ترین یادداشت',read:'خواندن و کشف مقاله',archive:'در کتابخانهٔ یادداشت‌ها',search:'دنبال چه موضوعی هستید؟',placeholder:'جست‌وجوی موضوع یا کلیدواژه',all:'همهٔ موضوع‌ها',topics:'موضوع نوشته‌ها',results:'نوشته‌های انتخاب‌شده',empty:'نوشته‌ای با این انتخاب پیدا نشد.',clear:'پاک‌کردن انتخاب‌ها',noPosts:'اولین نوشته به‌زودی از اینجا در دسترس خواهد بود.'},
 en:{eyebrow:'NOTES & EXPERIENCES',title:"Marketing and technology questions,<br>explored through examples and data.",intro:"Writing on markets, online sales and working with AI, with charts, comparisons or exercises that make the subject clearer.",latest:'LATEST NOTE',read:'Read & explore',archive:'The reading library',search:'What are you curious about?',placeholder:'Search a topic or keyword',all:'All topics',topics:'Article topics',results:'Selected notes',empty:'No notes match this selection.',clear:'Clear selections',noPosts:'The first published note will appear here.'}
};
const arrow='<svg class="library-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';

export function mountBlogIndex(root,{lang,items,href,signal}){
 const t=copy[lang],initial=blogLibrarySelection(items,{lang});
 const date=value=>new Intl.DateTimeFormat(lang,{dateStyle:'medium'}).format(new Date(value+'T12:00:00Z'));
 const meta=post=>'<div class="library-meta"><span>'+esc(post[lang].category)+'</span><time datetime="'+esc(post.date)+'">'+esc(date(post.date))+'</time></div>';
 const card=post=>'<a class="library-card" href="'+esc(href('post:'+post.slug))+'">'+renderPostCover(post,lang,{className:'library-card-cover'})+'<div class="library-card-copy">'+meta(post)+'<h3>'+esc(post[lang].title)+'</h3><p>'+esc(post[lang].excerpt)+'</p><div class="library-card-foot"><small>'+esc(post[lang].readTime)+'</small><span>'+t.read+arrow+'</span></div></div></a>';
 root.classList.add('blog-index');root.classList.remove('article-page');
 root.innerHTML='<header class="library-header"><div class="eyebrow">'+t.eyebrow+'</div><h1>'+t.title+'</h1><p>'+t.intro+'</p><span class="library-header-glow" aria-hidden="true"></span></header>'+(initial.featured?'<section class="library-feature" aria-label="'+t.latest+'"><a href="'+esc(href('post:'+initial.featured.slug))+'"><div class="library-feature-art">'+renderPostCover(initial.featured,lang,{className:'library-feature-cover',eager:true})+'<span>'+t.latest+'</span></div><div class="library-feature-copy">'+meta(initial.featured)+'<h2>'+esc(initial.featured[lang].title)+'</h2><p>'+esc(initial.featured[lang].excerpt)+'</p><span class="library-feature-action">'+t.read+arrow+'</span></div></a></section>':'')+'<section class="library-archive" aria-labelledby="library-heading"><div class="library-tools"><h2 id="library-heading">'+t.archive+'</h2><label class="library-search"><span class="sr-only">'+t.search+'</span><input id="blog-search" type="search" autocomplete="off" placeholder="'+t.placeholder+'"></label></div><div class="library-filters" role="group" aria-label="'+t.topics+'"><button type="button" data-library-filter="-1" aria-pressed="true"><span>'+t.all+'</span></button>'+initial.categories.map((category,index)=>'<button type="button" data-library-filter="'+index+'" aria-pressed="false"><span>'+esc(category)+'</span></button>').join('')+'</div><div class="library-grid" id="blog-post-list"></div><p class="library-status" role="status" aria-live="polite"></p><button class="library-clear" type="button" hidden>'+t.clear+'</button></section>';
 let query='',category='';
 const update=()=>{
  const result=blogLibrarySelection(items,{lang,query,category});
  const feature=root.querySelector('.library-feature');if(feature)feature.hidden=result.filtered;
  root.querySelector('#library-heading').textContent=result.filtered?t.results:t.archive;
  root.querySelector('#blog-post-list').innerHTML=result.items.map(card).join('');
  root.querySelector('.library-status').textContent=result.items.length?'':initial.featured?t.empty:t.noPosts;
  root.querySelector('.library-clear').hidden=!result.filtered;
  root.querySelectorAll('[data-library-filter]').forEach(button=>button.setAttribute('aria-pressed',String((initial.categories[Number(button.dataset.libraryFilter)]||'')===category)));
 };
 root.querySelector('#blog-search').addEventListener('input',event=>{query=event.target.value;update();},{signal});
 root.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.hasAttribute('data-library-filter')){category=initial.categories[Number(button.dataset.libraryFilter)]||'';update();}
  if(button.classList.contains('library-clear')){query='';category='';root.querySelector('#blog-search').value='';update();root.querySelector('#blog-search').focus();}
 },{signal});
 update();
}
