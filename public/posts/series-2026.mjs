import { series2026 } from './series-2026-manifest.mjs';
import { seriesCovers } from './series-2026-covers.mjs';
import { commerceDepth } from './series-depth-commerce.mjs';
import { decisionDepth } from './series-depth-decisions.mjs';
import { operationsDepth } from './series-depth-operations.mjs';
import { contextDepth } from './series-depth-context.mjs';
import { post as p0 } from './product-page-decisions.mjs';
import { post as p1 } from './store-beyond-storefront.mjs';
import { post as p2 } from './customer-before-brand.mjs';
import { post as p3 } from './strategy-means-choices.mjs';
import { post as p4 } from './data-to-decisions.mjs';
import { post as p5 } from './agentic-ai-operating-model.mjs';
import { post as p6 } from './planning-with-four-futures.mjs';
import { post as p7 } from './ai-nature-conservation.mjs';
import { post as p8 } from './enterprise-data-at-work.mjs';
import { post as p9 } from './forward-deployed-engineer.mjs';
import { post as p10 } from './marketing-beyond-screen.mjs';
import { post as p11 } from './measuring-ai-search.mjs';
import { post as p12 } from './ai-influencer-ctv.mjs';
import { post as p13 } from './normalized-friction.mjs';
import { post as p14 } from './ceo-time-decisions.mjs';
import { post as p15 } from './housing-offer-terms.mjs';

const depth={...commerceDepth,...decisionDepth,...operationsDepth,...contextDepth};
const expandedReadTime=(value,lang)=>lang==='fa'
 ? value.replace(/^[۰-۹0-9]+ دقیقه/,'۷ دقیقه')
 : value.replace(/^[0-9]+ (?:minutes|min)/,'7 min');
// Keep each published article's identity and native cover; expand its body before the closing action.
export const seriesPosts=[p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15].map((post,index)=>({
 ...post,
 reviewed:post.slug==='normalized-friction'?'2026-10-29':'2026-10-27',
 fa:{...post.fa,readTime:post.slug==='normalized-friction'?post.fa.readTime:expandedReadTime(post.fa.readTime,'fa')},
 en:{...post.en,readTime:post.slug==='normalized-friction'?post.en.readTime:expandedReadTime(post.en.readTime,'en')},
 sections:post.slug==='normalized-friction'?post.sections:[...post.sections.slice(0,-1),...depth[post.slug],post.sections.at(-1)],
 cover:seriesCovers[post.slug],
 bannerPair:{id:series2026[index].pair,position:series2026[index].position}
}));
