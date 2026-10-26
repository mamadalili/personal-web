import { series2026 } from './series-2026-manifest.mjs';

// Shared metadata only; each article supplies its own argument and exercises.
export const p = (fa,en) => ({type:'paragraph',fa,en});
export const note = (fa,en) => ({type:'callout',fa,en});
export const section = (id,fa,en,...blocks) => ({id,fa:{title:fa},en:{title:en},blocks});
export const tab = (labelFa,labelEn,titleFa,titleEn,textFa,textEn) => ({fa:{label:labelFa,title:titleFa,text:textFa},en:{label:labelEn,title:titleEn,text:textEn}});
export const detail = (titleFa,titleEn,fa,en) => ({type:'details',fa:{title:titleFa,text:fa},en:{title:titleEn,text:en}});
export function article(slug,copy,sections,sources,related){
 const m=series2026.find(item=>item.slug===slug);
 return {slug,status:'published',date:'2026-10-26',reviewed:'2026-10-26',fa:{title:m.fa,readTime:'۵ دقیقه + تجربه',...copy.fa},en:{title:m.en,readTime:'5 minutes + exploration',...copy.en},glossary:{},sections,sources,related};
}
export function reference(id,url,publisher,titleFa,titleEn,noteFa,noteEn,kind='analysis'){
 return {id,url,publisher,kind,fa:{title:titleFa,note:noteFa},en:{title:titleEn,note:noteEn}};
}
export function related(slug,fa,en,descriptionFa,descriptionEn){return {target:`post:${slug}`,fa:{title:fa,description:descriptionFa},en:{title:en,description:descriptionEn}};}
