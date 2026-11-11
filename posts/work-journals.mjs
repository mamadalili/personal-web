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
  'boomerang-channels': {
    fa:'رسید پرداخت و برگهٔ سفارش شمارهٔ ۴۲۷ کنار هم. روی رسید تیک خورده و جای تأیید سفارش خالی است.',
    en:'A checked payment receipt and an order card share reference 427. The order confirmation box is still empty.',
  },
  'boomerang-logistics': {
    fa:'بستهٔ برچسب‌خورده روی میز بسته‌بندی است و چرخ حمل نارنجی بیرون درِ انبار منتظر است.',
    en:'A labelled parcel sits on the packing bench. An empty orange hand truck waits outside the warehouse door.',
  },
  'boomerang-ai-operations': {
    fa:'برگه‌های دو مدل روشویی با کدهای مشابه کنار هم‌اند. ذره‌بین روی خانهٔ خالی مشخصات در کاتالوگ قرار دارد.',
    en:'Two basin catalog sheets have nearly identical model codes. A magnifying glass rests over an empty specification field.',
  },
  'turbin-marketplaces': {
    fa:'یک بسته مداد آبی روی یک قفسه، جلوی قاب مرورگر و ویترین کاغذی بازارگاه.',
    en:'One pack of blue pencils sits on a shared shelf in front of a browser frame and a paper marketplace storefront.',
  },
  'turbin-launch': {
    fa:'رسید انبار به کارتن دفترها وصل است. روی نوار دور دفترها «یک بسته» و روی جلد دفتر جداشده «یک دفتر» نوشته شده است.',
    en:'A receiving tag hangs from a carton of notebooks. A band identifies one pack, and the separate notebook is marked as one selling unit.',
  },
  'turbin-warehouse': {
    fa:'سه دفتر روی قفسه‌اند. یکی مهر رزرو دارد، جلد دومی پاره است و فقط روی سومی برچسب «قابل فروش» دیده می‌شود.',
    en:'Three notebooks sit on a shelf. One is reserved, one has a torn cover, and only the third is marked available.',
  },
  'turbin-ai': {
    fa:'کنار خودکار آبی، دستگاهی با نشان ChatGPT پیش‌نویس پاسخ را چاپ می‌کند. روی پروندهٔ بازگشت وجه مهر «ارجاع به پشتیبان» خورده است.',
    en:'Beside a blue pen, a printer bearing the ChatGPT logo issues a draft reply. A refund enquiry is stamped for a support agent.',
  },
  'turbin-migration': {
    fa:'روبان قرمز از لینک ذخیره‌شده به صفحهٔ جدید یک دفتر چهارخانه می‌رسد. روی رسید خرید آزمایشی هم نام همان دفتر آمده است.',
    en:'A red ribbon leads from a saved link to the new page for a red gingham notebook. The test receipt names the same notebook.',
  },
  'can-exhibitions': {
    fa:'پرده کنار رفته و هود روی صحنهٔ کن پیداست. کنار میز گفت‌وگو، نقشهٔ نصب هود و پیش‌نویس قرارداد نمایندگی باز مانده‌اند.',
    en:'A curtain lifts to reveal a CAN range hood. At the meeting table, its installation drawing sits beside an open draft dealership agreement.',
  },
  'can-sales-network': {
    fa:'زیر هود ویترین کن، عکس کابینت خریدار روی گوشی دیده می‌شود. روی نقشهٔ همان مدل، شابلون سبز عرض برش را کنار خط اندازهٔ عرض بیرونی نشان می‌دهد.',
    en:'Below a CAN showroom hood, a phone shows the shopper’s cabinet. A green template marks the cut-out on the model’s fitting drawing, beside the overall width.',
  },
  'can-partnerships': {
    fa:'بلاگر و کارشناس نمایندگی کنار فر توکار یک ریلز مشترک ضبط می‌کنند. روی میز، کنار کلاکت، برگه‌ای برای اجازهٔ ارجاع درخواست مشتری و پیگیری نمایندگی دیده می‌شود.',
    en:'A creator and a showroom specialist film a joint reel beside a built-in oven. A referral slip next to the clapperboard records customer consent and assigns follow-up to the dealer.',
  },
  'datis-webinars': {
    fa:'در استودیوی وبینار داتیس، مجری دو وب‌کم را مقایسه می‌کند. روی لپ‌تاپ می‌پرسند آیا مدل دوم ارزش هزینهٔ بیشتر را دارد. کنار چراغ پخش زنده، کارت مجری یادآوری می‌کند که بخش مقایسه را برای مخاطب بفرستد.',
    en:'A Datis webinar host compares two webcams. A viewer asks on the laptop whether the second is worth the extra cost. A cue card beside the on-air light reminds the host to share the comparison clip.',
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
