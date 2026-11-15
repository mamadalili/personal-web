import {posts} from './work-story-posts.mjs?v=20261111-work-journals';
import {visibleWorkStories} from './work-stories-data.mjs?v=20261111-work-journals';
import {selectWorkRole} from './work-stories-model.mjs?v=20261031-work-stories-2';
import {roleURL, workStoriesCopy, renderWorkStoriesMarkup} from './work-stories-view.mjs';
export {workStoriesCopy, renderWorkStoriesMarkup} from './work-stories-view.mjs';

export function mountWorkStories(root,{language='fa',roles,formatYears=value=>value,renderWebsite=()=>'',activateStory=true}){
  const lang=language==='en'?'en':'fa',t=workStoriesCopy[lang],controller=new AbortController(),signal=controller.signal;
  let selected=selectWorkRole(roles,new URLSearchParams(location.search).get('role'));
  if(!selected)return ()=>controller.abort();
  root.classList.add('work-stories-page');
  if(root.dataset.entryLang!==lang || !root.querySelector('[data-work-panel]')){
    root.innerHTML=renderWorkStoriesMarkup({language:lang,roles,formatYears,renderWebsite,storyPosts:posts});
  }
  function revealSelectedLink(){
    const list=root.querySelector('.work-role-list'),link=list.querySelector('[aria-current]');
    if(!link)return;
    const outer=list.getBoundingClientRect(),inner=link.getBoundingClientRect();
    const left=inner.left<outer.left?inner.left-outer.left:inner.right>outer.right?inner.right-outer.right:0;
    const top=inner.top<outer.top?inner.top-outer.top:inner.bottom>outer.bottom?inner.bottom-outer.bottom:0;
    list.scrollBy({left,top,behavior:'auto'});
  }
  function renderSelected(announce=false,activateTopic=false){
    const role=selected,c=role[lang],topics=visibleWorkStories(role.id);
    root.querySelectorAll('[data-work-role]').forEach(link=>{if(link.dataset.workRole===role.id)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
    root.querySelectorAll('[data-work-panel]').forEach(panel=>{panel.hidden=panel.dataset.workPanel!==role.id;});
    revealSelectedLink();
    const requested=new URLSearchParams(location.search).get('story')||location.hash.slice(1);
    const story=topics.find(item=>item.id===requested);
    if(activateTopic&&story){
      const card=document.getElementById(story.id);
      card?.scrollIntoView({block:'nearest',inline:'center',behavior:'instant'});
      card?.focus({preventScroll:true});
    }
    if(announce)root.querySelector('[data-work-announcement]').textContent=`${t.selected}: ${c.company} — ${c.role}`;
  }
  function select(id,{write=false,focusPanel=false,activateTopic=false}={}){
    const next=selectWorkRole(roles,id),changed=next.id!==selected.id;
    selected=next;renderSelected(write&&changed,activateTopic);
    if(write&&changed)history.pushState(null,'',roleURL(lang,selected.id));
    if(focusPanel&&matchMedia('(max-width:760px)').matches)root.querySelector('[data-work-panel]:not([hidden])').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  }
  root.addEventListener('click',event=>{
    const link=event.target.closest('[data-work-role]');
    if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    event.preventDefault();if(link.dataset.workRole!==selected.id)select(link.dataset.workRole,{write:true,focusPanel:true});
  },{signal});
  root.addEventListener('keydown',event=>{
    const link=event.target.closest('[data-work-role]');if(!link)return;
    const links=[...root.querySelectorAll('[data-work-role]')];let index=links.indexOf(link);
    if(event.key==='Home')index=0;else if(event.key==='End')index=links.length-1;
    else if(['ArrowDown','ArrowUp'].includes(event.key))index+=event.key==='ArrowDown'?1:-1;
    else if(['ArrowRight','ArrowLeft'].includes(event.key))index+=(event.key==='ArrowRight'?1:-1)*(lang==='fa'?-1:1);else return;
    event.preventDefault();const next=links[(index+links.length)%links.length];select(next.dataset.workRole,{write:true});next.focus();
  },{signal});
  window.addEventListener('popstate',()=>{
    const query=new URLSearchParams(location.search);
    if(['fa','en'].includes(query.get('lang'))&&query.get('lang')!==lang){location.reload();return;}
    select(query.get('role'),{activateTopic:true});
  },{signal});
  renderSelected(false,activateStory);
  return ()=>controller.abort();
}
