import { escapeHTML as esc } from './blog-core.mjs';

export function renderArticleImage(block,lang){
  if(!['fa','en'].includes(lang)||!/^assets\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/.test(block?.src||'')||
    ![block.width,block.height].every(value=>Number.isInteger(value)&&value>0&&value<=8192)||
    !['fa','en'].every(language=>typeof block[language]?.alt==='string'&&block[language].alt.trim()&&typeof block[language]?.caption==='string'&&block[language].caption.trim()))return '';
  return `<figure class="article-inline-image"><img src="${esc(block.src)}" alt="${esc(block[lang].alt)}" width="${block.width}" height="${block.height}" loading="lazy" decoding="async"><figcaption>${esc(block[lang].caption)}</figcaption></figure>`;
}
