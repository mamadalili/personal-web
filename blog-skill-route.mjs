import {escapeHTML as esc} from './blog-core.mjs';
import {skillRoute, skillRouteSheet, validateSkillRoute} from './blog-skill-route-model.mjs';

export function loadSkillRouteStyle() {
  const href = new URL('./blog-skill-route.css?v=20261106',import.meta.url).href;
  let link = [...document.querySelectorAll('link[rel="stylesheet"]')].find(item => item.href === href);
  if (link?.sheet) return Promise.resolve();
  const fresh = !link;
  if (!link) { link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; }
  return new Promise((resolve,reject) => {
    link.addEventListener('load',resolve,{once:true});
    link.addEventListener('error',() => { link.remove(); reject(new Error('Skill route stylesheet could not be loaded')); },{once:true});
    if (fresh) document.head.append(link);
  });
}

export function createSkillRoutes({lang, signal}) {
  const widgets = new Map(), urls = new Set();
  const t = lang === 'fa' ? {core:'الان در کدام کار دستت راه افتاده؟',barrier:'الان کجای کار گیر می‌کنی؟',anchor:'پایه‌ای که به آن تکیه می‌کنی',bridge:'چیزی که باید کنارش یاد بگیری',output:'چیزی که تحویل می‌دهی',proof:'شاهد فعلی',next:'قدم بعدی',check:'با چه چیزی بررسی‌اش کنی؟',ai:'AI کجا کمک کند؟',note:'یک مسئلهٔ واقعی از کار خودت بنویس',placeholder:'مثلاً مشتری قبل از سفارش ابعاد محصول را پیدا نمی‌کند…',download:'برگهٔ مسیرم را بگیر',done:'برگهٔ متنی آمادهٔ دانلود شد.',failed:'دانلود انجام نشد؛ می‌توانی انتخاب‌ها و یادداشتت را از همین صفحه کپی کنی.'} : {core:'Which work can you already judge?',barrier:'Where are you getting stuck?',anchor:'The depth you build on',bridge:'What to learn alongside it',output:'What you will deliver',proof:'Current evidence',next:'Next action',check:'How will you review it?',ai:'Where can AI help?',note:'Describe a real problem from your work',placeholder:'For example, buyers cannot find product dimensions before ordering…',download:'Download my route',done:'Your text worksheet is ready to download.',failed:'The download failed. You can copy your choices and note from this page.'};
  const result = (block, coreId, barrierId) => {
    const {core,barrier} = skillRoute(block,coreId,barrierId), c = core[lang], b = barrier[lang];
    return `<div class="skill-route-objects"><article data-route-object="anchor"><small>${t.anchor}</small><h4>${esc(c.label)}</h4><p>${esc(c.depth)}</p></article><article data-route-object="bridge"><small>${t.bridge}</small><h4>${esc(b.bridge)}</h4><p>${esc(b.action)}</p></article><article data-route-object="output"><small>${t.output}</small><h4>${esc(c.output)}</h4><p>${esc(b.check)}</p></article></div><dl class="skill-route-evidence"><div><dt>${t.proof}</dt><dd>${esc(c.proof)}</dd></div><div><dt>${t.ai}</dt><dd>${esc(c.ai)}</dd></div></dl>`;
  };
  return {
    render(block,id) {
      if (!validateSkillRoute(block)) return '';
      widgets.set(id,block);
      return `<section class="skill-route" data-skill-route="${esc(id)}" aria-labelledby="${id}-title"><header><h3 id="${id}-title">${esc(block[lang].title)}</h3><p id="${id}-hint">${esc(block[lang].hint)}</p></header><div class="skill-route-controls"><label>${t.core}<select data-route-core aria-describedby="${id}-hint" aria-controls="${id}-result">${block.cores.map(row => `<option value="${esc(row.id)}">${esc(row[lang].label)}</option>`).join('')}</select></label><label>${t.barrier}<select data-route-barrier aria-controls="${id}-result">${block.barriers.map(row => `<option value="${esc(row.id)}">${esc(row[lang].label)}</option>`).join('')}</select></label></div><div id="${id}-result" data-route-result aria-live="polite" aria-atomic="true">${result(block,block.cores[0].id,block.barriers[0].id)}</div><label class="skill-route-note">${t.note}<textarea data-route-note maxlength="1200" rows="3" placeholder="${t.placeholder}"></textarea></label><div class="skill-route-footer"><button type="button" class="blog-button" data-route-download>${t.download}</button><span role="status" data-route-status></span></div><p class="skill-route-method">${esc(block[lang].note)}</p></section>`;
    },
    mount(root) {
      root.addEventListener('change',event => {
        if (!event.target.matches('[data-route-core],[data-route-barrier]')) return;
        const element = event.target.closest('[data-skill-route]'), block = widgets.get(element?.dataset.skillRoute);
        if (!block) return;
        element.querySelector('[data-route-result]').innerHTML = result(block,element.querySelector('[data-route-core]').value,element.querySelector('[data-route-barrier]').value);
        element.querySelector('[data-route-status]').textContent = '';
      },{signal});
      root.addEventListener('click',event => {
        if (!event.target.closest('[data-route-download]')) return;
        const element = event.target.closest('[data-skill-route]'), block = widgets.get(element?.dataset.skillRoute);
        if (!block) return;
        try {
          const content = skillRouteSheet(block,element.querySelector('[data-route-core]').value,element.querySelector('[data-route-barrier]').value,lang,element.querySelector('[data-route-note]').value);
          const url = URL.createObjectURL(new Blob(['\ufeff'+content],{type:'text/plain;charset=utf-8'}));
          urls.add(url);
          const link = document.createElement('a'); link.href = url; link.download = `skill-route-${lang}.txt`; link.click();
          element.querySelector('[data-route-status]').textContent = t.done;
          setTimeout(() => { URL.revokeObjectURL(url); urls.delete(url); },1500);
        } catch { element.querySelector('[data-route-status]').textContent = t.failed; }
      },{signal});
      signal.addEventListener('abort',() => { for (const url of urls) URL.revokeObjectURL(url); urls.clear(); },{once:true});
    }
  };
}
