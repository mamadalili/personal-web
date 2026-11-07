import {escapeHTML as esc} from './blog-core.mjs';
import {shotChecks,shotReview,shotReviewSheet} from './blog-shot-review-model.mjs';

export function loadShotReviewStyle() {
  const href = new URL('./blog-shot-review.css?v=20261107',import.meta.url).href;
  let link = [...document.querySelectorAll('link[rel="stylesheet"]')].find(item => item.href === href);
  if (link?.sheet) return Promise.resolve();
  const fresh = !link;
  if (!link) { link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; }
  return new Promise((resolve,reject) => {
    link.addEventListener('load',resolve,{once:true});
    link.addEventListener('error',() => {link.remove();reject(new Error('Shot review style could not be loaded'));},{once:true});
    if (fresh) document.head.append(link);
  });
}

export function createShotReviews({lang,signal}) {
  const states = new Map(),urls = new Set();
  const t = lang === 'fa' ? {
    first:'تصویر اول',last:'تصویر آخر',expect:'قرار است دوربین ثابت بماند و جعبه به سمت راستِ تصویر برود.',
    labels:['جعبه در تصویر اول هم باشد','اندازهٔ جعبه در دو تصویر یکی باشد','روبان قرمز در تصویر آخر هم بماند','جعبه به سمت راستِ تصویر برود'],
    faults:['جعبه از هیچ ظاهر می‌شود؛ جای آن را در تصویر اول هم مشخص کن.','بدون تغییر دوربین، جعبه بزرگ‌تر شده؛ اندازهٔ آن در تصویر آخر را اصلاح کن.','روبان در تصویر آخر حذف شده؛ ویژگی ثابت محصول را برگردان.','جای نهایی جعبه سمت چپ است، اما متن حرکت به راست می‌خواهد؛ مقصد و متن را هماهنگ کن.'],
    clear:'این چهار مورد در نمونه هماهنگ‌اند. حرکت و صدا هنوز بررسی نشده‌اند.',
    missing:'موارد ناهماهنگ',empty:'جعبه در این تصویر وجود ندارد',red:'روبان قرمز',noRibbon:'بدون روبان',left:'سمت چپ تصویر',right:'سمت راست تصویر',sameSize:'اندازهٔ مرجع',larger:'بزرگ‌تر از مرجع',
    download:'برگهٔ بررسی را بگیر',reset:'بازنشانی نمونه',saved:'برگهٔ آموزشی دانلود شد.',failed:'دانلود انجام نشد؛ نتیجهٔ متنی همین‌جا در دسترس است.',
    note:'نمونهٔ آموزشی با دادهٔ دستی؛ تیک‌ها فقط همین تصویرهای شماتیک را تغییر می‌دهند. این ابزار عکس یا ویدیو را تحلیل نمی‌کند، فایل نمی‌فرستد و هزینه‌ای ایجاد نمی‌کند. راست و چپ، جهت داخل تصویر است و با زبان صفحه عوض نمی‌شود.'
  } : {
    first:'First frame',last:'Last frame',expect:'The camera should stay fixed while the box moves toward screen-right.',
    labels:['Include the box in the first frame','Keep the box the same size','Keep the red ribbon in the last frame','Move the box toward screen-right'],
    faults:['The box appears from nowhere. Establish it in the first frame.','The box grows although the camera is fixed. Correct its size in the last frame.','The ribbon disappears in the last frame. Restore the fixed product detail.','The final position is on the left, but the prompt asks for rightward motion. Align the destination and wording.'],
    clear:'These four details align in this example. Real motion and audio have not been reviewed.',
    missing:'Remaining inconsistencies',empty:'The box is absent from this frame',red:'Red ribbon',noRibbon:'No ribbon',left:'screen-left',right:'screen-right',sameSize:'reference size',larger:'larger than reference',
    download:'Download the review sheet',reset:'Reset example',saved:'The educational worksheet was downloaded.',failed:'Download failed. The text result remains available here.',
    note:'Hand-authored educational example. Checkboxes only change these schematic frames. This tool does not analyse images or video, send files or incur charges. Screen-left and screen-right stay the same when the page language changes.'
  };
  function frame(data,label,referenceWidth) {
    const description=data.present?`${lang==='fa'?'جعبه، ': 'Box, '}${data.x>50?t.right:t.left} · ${data.width===referenceWidth?t.sameSize:t.larger} · ${data.ribbon?t.red:t.noRibbon}`:t.empty;
    return `<figure><figcaption>${label}</figcaption><div class="shot-review-frame" aria-hidden="true">${data.present?`<div class="shot-review-box${data.ribbon?' has-ribbon':''}" style="--box-x:${data.x}%;--box-width:${data.width}%"><i></i></div>`:'<span class="shot-review-absence">∅</span>'}</div><p class="shot-review-description">${description}</p></figure>`;
  }
  function result(fixes) {
    const state = shotReview([...fixes]);
    return {frames:frame(state.first,t.first,state.first.width)+frame(state.last,t.last,state.first.width),text:state.aligned?`<p class="shot-review-clear">${t.clear}</p>`:`<h4>${t.missing}</h4><ul>${state.unresolved.map(key=>`<li>${t.faults[shotChecks.indexOf(key)]}</li>`).join('')}</ul>`};
  }
  return {
    render(block,id) {
      const fixes = new Set(),view = result(fixes);states.set(id,fixes);
      return `<section class="shot-review" data-shot-review="${id}" aria-labelledby="${id}-title"><header><h3 id="${id}-title">${esc(block[lang].title)}</h3><p>${esc(block[lang].hint)}</p></header><p class="shot-review-brief">${t.expect}</p><div class="shot-review-frames" data-shot-frames>${view.frames}</div><fieldset><legend>${lang==='fa'?'هر مورد را اصلاح کن و دو تصویر را دوباره مقایسه کن':'Correct a detail, then compare the two frames'}</legend>${shotChecks.map((key,i)=>`<label><input type="checkbox" value="${key}" data-shot-fix aria-controls="${id}-result"><span>${t.labels[i]}</span></label>`).join('')}</fieldset><div id="${id}-result" data-shot-result aria-live="polite" aria-atomic="true">${view.text}</div><div class="shot-review-actions"><button type="button" class="blog-button" data-shot-download>${t.download}</button><button type="button" data-shot-reset>${t.reset}</button><span role="status" data-shot-status></span></div><p class="shot-review-note">${t.note}</p></section>`;
    },
    mount(root) {
      const update = element => {
        const fixes = states.get(element.dataset.shotReview),view=result(fixes);
        element.querySelector('[data-shot-frames]').innerHTML=view.frames;
        element.querySelector('[data-shot-result]').innerHTML=view.text;
        element.querySelector('[data-shot-status]').textContent='';
      };
      root.addEventListener('change',event=>{
        if (!event.target.matches('[data-shot-fix]')) return;
        const element=event.target.closest('[data-shot-review]'),fixes=states.get(element?.dataset.shotReview);
        if (!fixes) return;
        if (event.target.checked) fixes.add(event.target.value);else fixes.delete(event.target.value);
        update(element);
      },{signal});
      root.addEventListener('click',event=>{
        const button=event.target.closest('[data-shot-download],[data-shot-reset]');if(!button)return;
        const element=button.closest('[data-shot-review]'),fixes=states.get(element?.dataset.shotReview);if(!fixes)return;
        if(button.hasAttribute('data-shot-reset')){
          fixes.clear();element.querySelectorAll('[data-shot-fix]').forEach(input=>{input.checked=false;});update(element);return;
        }
        try {
          const url=URL.createObjectURL(new Blob(['\ufeff'+shotReviewSheet([...fixes],lang)],{type:'text/plain;charset=utf-8'}));urls.add(url);
          const link=document.createElement('a');link.href=url;link.download=`shot-review-${lang}.txt`;link.click();
          element.querySelector('[data-shot-status]').textContent=t.saved;
          setTimeout(()=>{URL.revokeObjectURL(url);urls.delete(url);},1500);
        } catch {element.querySelector('[data-shot-status]').textContent=t.failed;}
      },{signal});
      signal.addEventListener('abort',()=>{for(const url of urls)URL.revokeObjectURL(url);urls.clear();states.clear();},{once:true});
    }
  };
}
