import {escapeHTML as esc} from './blog-core.mjs';
import {composeContentPrompt,createContentStarter} from './blog-content-model.mjs';

const copy={
 fa:{tool:'محیطی که استفاده می‌کنی',goal:'هدف همین پست',trust:'پاسخ و اعتماد',enquiry:'شروع گفت‌وگو',learn:'آموزش یک نکته',audience:'برای چه کسی می‌نویسی؟',note:'یادداشت تو',hint:'متن فعلی یک مثال آموزشی است؛ یادداشت خودت را جایگزین کن.',bounds:'مخاطب: ۲ تا ۱۴۰ نویسه. یادداشت: ۱۰ تا ۱۲۰۰ نویسه.',output:'دستور آماده برای بازبینی',copy:'کپی دستور',download:'گرفتن برگهٔ شروع',reset:'برگرداندن مثال',copied:'دستور کپی شد.',copyFallback:'کپی خودکار انجام نشد؛ متن انتخاب شد. از گزینهٔ Copy یا Ctrl/Cmd+C استفاده کن.',downloaded:'برگهٔ Markdown آمادهٔ دریافت شد.',invalid:'مخاطب و یادداشت را در بازهٔ نوشته‌شده کامل کن.',privacy:'متن این بخش در همین صفحه می‌ماند. اینجا دستور را آماده می‌کنی؛ تولید پیش‌نویس در ابزار انتخابی تو انجام می‌شود.',ready:'دستور با انتخاب‌های تو به‌روز شد.',defaultAudience:'خریداران لوازم خانه با فضای محدود',defaultNote:'مثال آموزشی: یک خریدار پرسیده این محصول در فضای کوچک جا می‌شود؟ در اطلاعاتی که داریم، ابعاد تأییدشده ثبت نشده. باید قبل از نوشتن پاسخ، آن را بپرسیم.',chat:'ChatGPT Project',claude:'Claude Code · پوشهٔ محلی'},
 en:{tool:'Your working environment',goal:'Purpose of this post',trust:'Answer and build trust',enquiry:'Start a conversation',learn:'Teach one useful idea',audience:'Who are you writing for?',note:'Your working note',hint:'The current text is an educational example. Replace it with your own note.',bounds:'Audience: 2–140 characters. Note: 10–1,200 characters.',output:'Prompt ready for review',copy:'Copy prompt',download:'Get the starter sheet',reset:'Restore example',copied:'Prompt copied.',copyFallback:'Automatic copy was unavailable. The text is selected; use Copy or Ctrl/Cmd+C.',downloaded:'The Markdown starter is ready to download.',invalid:'Complete the audience and note within the stated bounds.',privacy:'This text stays on this page. Prepare the instructions here, then run them in your chosen tool.',ready:'The prompt now reflects your choices.',defaultAudience:'Homeware buyers with limited space',defaultNote:'Educational example: a buyer asked whether this product fits a small space. Verified dimensions are missing from the information available to us. We need to ask for them before writing an answer.',chat:'ChatGPT Project',claude:'Claude Code · local folder'}
};

export function createContentStudios({lang,signal}){
 const t=copy[lang],blocks=new Map(),urls=new Set();
 const values=figure=>Object.fromEntries(['tool','goal','audience','note'].map(key=>[key,figure.querySelector(`[data-content-input="${key}"]`).value]));
 function update(figure,announce=false){
  const state={lang,...values(figure)},prompt=composeContentPrompt(state),output=figure.querySelector('[data-content-output]');
  output.value=prompt||'';
  figure.querySelector('[data-content-error]').textContent=prompt?'':t.invalid;
  for(const key of ['audience','note']){const input=figure.querySelector(`[data-content-input="${key}"]`);input.setAttribute('aria-invalid',String(!input.checkValidity()||input.value.trim().length<(key==='audience'?2:10)));}
  for(const button of figure.querySelectorAll('[data-content-action="copy"],[data-content-action="download"]'))button.disabled=!prompt;
  figure.querySelector('[data-content-status]').textContent=announce?(prompt?t.ready:t.invalid):'';
  return {state,prompt};
 }
 return {
  render(block,id){
   if(!block?.[lang]?.title)return '';
   blocks.set(id,block);
   return `<section class="content-studio" data-content-studio="${esc(id)}" aria-labelledby="${id}-title"><header><p class="content-studio-kicker">${lang==='fa'?'برگهٔ کار خودت را بساز':'Build your working brief'}</p><h3 id="${id}-title">${esc(block[lang].title)}</h3><p>${esc(block[lang].hint||'')}</p></header><fieldset><legend class="sr-only">${esc(t.tool)}</legend><div class="content-studio-selects"><label for="${id}-tool">${esc(t.tool)}<select id="${id}-tool" data-content-input="tool"><option value="chatgpt">${esc(t.chat)}</option><option value="claude">${esc(t.claude)}</option></select></label><label for="${id}-goal">${esc(t.goal)}<select id="${id}-goal" data-content-input="goal"><option value="trust">${esc(t.trust)}</option><option value="enquiry">${esc(t.enquiry)}</option><option value="learn">${esc(t.learn)}</option></select></label></div><label for="${id}-audience">${esc(t.audience)}<input id="${id}-audience" data-content-input="audience" type="text" required minlength="2" maxlength="140" aria-describedby="${id}-bounds" value="${esc(t.defaultAudience)}"></label><label for="${id}-note">${esc(t.note)}<textarea id="${id}-note" data-content-input="note" rows="4" required minlength="10" maxlength="1200" aria-describedby="${id}-hint ${id}-bounds">${esc(t.defaultNote)}</textarea></label><p class="content-studio-hint" id="${id}-hint">${esc(t.hint)}</p><p class="content-studio-hint" id="${id}-bounds">${esc(t.bounds)}</p></fieldset><p class="content-studio-error" data-content-error></p><div class="content-studio-result"><label for="${id}-output">${esc(t.output)}</label><textarea id="${id}-output" data-content-output rows="12" readonly spellcheck="false" dir="${lang==='fa'?'rtl':'ltr'}"></textarea></div><div class="content-studio-actions"><button type="button" data-content-action="copy">${esc(t.copy)}</button><button type="button" data-content-action="download">${esc(t.download)}</button><button type="button" data-content-action="reset">${esc(t.reset)}</button></div><p class="content-studio-status" role="status" data-content-status></p><p class="content-studio-hint">${esc(t.privacy)}</p></section>`;
  },
  mount(root){
   for(const figure of root.querySelectorAll('[data-content-studio]'))update(figure);
   root.addEventListener('input',event=>{const figure=event.target.closest('[data-content-studio]');if(figure&&event.target.matches('[data-content-input]'))update(figure);},{signal});
   root.addEventListener('change',event=>{const figure=event.target.closest('[data-content-studio]');if(figure&&event.target.matches('select[data-content-input]'))update(figure,true);},{signal});
   root.addEventListener('click',async event=>{
    const button=event.target.closest('[data-content-action]');if(!button)return;
    const figure=button.closest('[data-content-studio]');if(!figure||!blocks.has(figure.dataset.contentStudio))return;
    if(button.dataset.contentAction==='reset'){
     for(const [key,value] of Object.entries({tool:'chatgpt',goal:'trust',audience:t.defaultAudience,note:t.defaultNote}))figure.querySelector(`[data-content-input="${key}"]`).value=value;
     update(figure,true);return;
    }
    const {state,prompt}=update(figure);if(!prompt)return;
    const output=figure.querySelector('[data-content-output]'),status=figure.querySelector('[data-content-status]');
    if(button.dataset.contentAction==='copy'){
     try{await navigator.clipboard.writeText(prompt);if(!signal.aborted&&figure.isConnected&&output.value===prompt)status.textContent=t.copied;}
     catch{if(!signal.aborted&&figure.isConnected&&output.value===prompt){output.focus();output.select();status.textContent=t.copyFallback;}}
    }else if(button.dataset.contentAction==='download'){
     const file=createContentStarter(state);if(!file)return;
     const url=URL.createObjectURL(new Blob([file],{type:'text/markdown;charset=utf-8'}));urls.add(url);
     const anchor=document.createElement('a');anchor.href=url;anchor.download=`content-system-${lang}.md`;anchor.click();status.textContent=t.downloaded;
    }
   },{signal});
   signal.addEventListener('abort',()=>{for(const url of urls)URL.revokeObjectURL(url);urls.clear();blocks.clear();},{once:true});
  }
 };
}
