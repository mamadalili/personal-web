import {career, copy, siteCopy, skillsCopy, homePortalCopy, collaborationCopy, contactCopy, contactChannels} from '../../../src/content/index.mjs';
import {iconPaths,skillIconPaths} from '../../../src/portfolio/icons.mjs';
import {createPortfolioView} from '../../../src/portfolio/view.mjs';
import {renderHomeFolderArt,renderHomeCapabilityArt} from '../../../public/home-hero-art.mjs';
import {solutions,solutionsCopy} from '../../../public/solutions-data.mjs';
import {posts} from '../../../public/blog-summaries.mjs';
import {homeSummaries} from './home-posts.mjs';

const langs=['fa','en'];
const localize=fn=>Object.fromEntries(langs.map(lang=>[lang,fn(lang)]));
const bySolution=fn=>Object.fromEntries(solutions.map(({id})=>[id,fn(id)]));
const seenLogos=new Set();
const atRoot=svg=>svg.replaceAll('href="assets/','href="/assets/');

export const siteContent={
  identity:localize(lang=>({name:copy[lang].name,role:copy[lang].role})),
  contact:localize(lang=>({intro:siteCopy[lang].contactIntro,cvLink:siteCopy[lang].cvLink,...contactCopy[lang]})),
  navigation:localize(lang=>({labels:siteCopy[lang].nav,label:siteCopy[lang].navLabel})),
  channels:contactChannels,
  employers:career.flatMap(role=>{
    if(!role.logo||seenLogos.has(role.logo.src))return [];
    seenLogos.add(role.logo.src);
    return [{id:role.id,logo:role.logo,fa:role.fa.company,en:role.en.company}];
  }),
  icons:{...skillIconPaths,...iconPaths}, home:siteCopy, skills:skillsCopy, portals:homePortalCopy,
  collaboration:collaborationCopy, solutions, solutionsCopy, posts:homeSummaries(posts), year:new Date().getUTCFullYear(),
  art:{
    folders:bySolution(id=>atRoot(renderHomeFolderArt(id))),
    capsules:bySolution(id=>atRoot(renderHomeCapabilityArt(id))),
    scenes:localize(lang=>{
      const view=createPortfolioView(lang);
      return {home:atRoot(view.renderMotionScene('home')),solutions:bySolution(id=>atRoot(view.renderMotionScene('solution',id)))};
    })
  }
};
