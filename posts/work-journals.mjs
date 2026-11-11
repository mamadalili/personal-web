import {workEditions} from '../work-editions.mjs';
import {workStoryCoverSrc} from '../work-story-covers.mjs';
import {stories as boomerang} from './work-boomerang.mjs';
import {stories as turbin} from './work-turbin.mjs';
import {stories as can} from './work-can.mjs';
import {stories as datis} from './work-datis.mjs';
import {stories as binici} from './work-binici.mjs';

const manuscripts = {boomerang, turbin, can, datis, binici};
const palettes = ['brick-paper','tide-ink','spruce-peach','cobalt-straw','cherry-mist','aqua-oxide','indigo-flax','plum-apricot','olive-silk','ink-tangerine'];
const localized = copy => ({fa:{title:copy.fa}, en:{title:copy.en}});
const paragraph = copy => ({type:'paragraph', ...copy});
const illustratedCoverAlts = {
  'boomerang-online-sales': {
    fa:'سردوش و رابط برنجی در جعبه، جلوی ویترین فروشگاه بومرنگ‌کالا',
    en:'A handheld shower and brass adapter in a presentation box in front of the Boomerang Kala storefront',
  },
  'boomerang-four-languages': {
    fa:'نمای سایت بومرنگ روی کاتالوگی تاشو با زبانه‌های انگلیسی، فارسی، عربی و روسی و دو برچسب محصول',
    en:'The Boomerang website on a fold-out catalog with English, Persian, Arabic and Russian tabs and two product tags',
  },
  'boomerang-content': {
    fa:'یک محصول بومرنگ در بنر مجموعه، صفحهٔ محصول و نسخهٔ موبایل',
    en:'One Boomerang vanity featured in a campaign banner, a product detail page and a mobile layout',
  },
};

function option(copy) {
  return Object.fromEntries(['fa','en'].map(lang => {
    const [label, feedback] = copy[lang].split(' ~ ');
    return [lang, {label, feedback}];
  }));
}

function edition(role, org, row, number, adjacent) {
  const [id, faTitle, enTitle, faKeys, enKeys] = row;
  const slug = role + '-' + id;
  const copy = manuscripts[role][id];
  const quiz = {type:'quiz', ...copy.question, options:(number % 2 ? [copy.second,copy.first] : [copy.first,copy.second]).map(option)};
  const practice = {id:'practice', ...localized(copy.practice), blocks:[paragraph(copy.method)]};
  const sections = [
    {id:'experience', ...localized(copy.opening), blocks:[paragraph(copy.role), paragraph(copy.example)]},
    practice,
  ];
  if (copy.exerciseHeading) {
    practice.blocks.push(paragraph(copy.closing));
    sections.push({id:'exercise', ...localized(copy.exerciseHeading), blocks:[quiz]});
  } else {
    practice.blocks.push(quiz, paragraph(copy.closing));
  }
  const post = {
    slug, status:'published', date:'2026-11-11', reviewed:'2026-11-11',
    bannerPair:{id:palettes[Math.floor(number / 2)], position:number % 2 + 1},
    cover:{}, sections,
    related:[{target:'post:' + role + '-' + adjacent[0], fa:{title:adjacent[1],description:manuscripts[role][adjacent[0]].intro.fa},en:{title:adjacent[2],description:manuscripts[role][adjacent[0]].intro.en}}],
    sources:[{id:'career',kind:'context',publisher:'Mohammadreza Dalili',url:'https://mrdalili.ir/profile.html?tab=experience&role='+role,
      fa:{title:'سابقهٔ کاری من در '+org.fa,note:'شرح نقش و مسئولیت‌ها در رزومهٔ من.'},
      en:{title:'My role at '+org.en,note:'Role and responsibilities from my CV.'}}]
  };
  for (const lang of ['fa','en']) {
    const fa = lang === 'fa', title = fa ? faTitle : enTitle;
    const words = [copy.intro,copy.role,copy.example,copy.method,copy.question,copy.first,copy.second,copy.closing].map(p=>p[lang]).join(' ').split(/\s+/).length;
    const low = Math.max(1,Math.ceil(words/180)), high = low+1;
    const digits = n=>new Intl.NumberFormat(fa?'fa-IR':'en').format(n);
    post[lang] = {title,subtitle:(fa?'در ':'At ')+org[lang],category:fa?'روایت‌های کاری':'Work stories',
      sourceNote:fa?'شرح مسئولیت من در رزومه آمده. مثال و تمرین این نوشته برای توضیح موضوع‌اند.':'My CV documents the role. The situations and choices in this story are illustrative.',
      excerpt:copy.intro[lang],readTime:fa?digits(low)+' تا '+digits(high)+' دقیقه با تمرین':low+'–'+high+' min with the exercise'};
    const alt = illustratedCoverAlts[slug]?.[lang] ?? [title,org[lang],fa?faKeys:enKeys].join(' — ');
    post.cover[lang] = {src:workStoryCoverSrc(slug,lang),width:1600,height:900,alt};
  }
  return post;
}

export const workJournals = [];
for (const [role,org] of Object.entries(workEditions)) {
  for (const [index,row] of org.topics.entries()) {
    workJournals.push(edition(role, org, row, workJournals.length, org.topics[(index+1)%org.topics.length]));
  }
}
