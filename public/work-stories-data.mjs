import {workEditions} from './work-editions.mjs';

const topics=(role,entries)=>entries.map(([id,fa,en])=>({id:`${role}-${id}`,post:null,fa:{title:fa},en:{title:en}}));

const visibleCounts={'safir-lead':3,'safir-field':3,asiatech:3};
export function visibleWorkStories(roleId){
  return Object.hasOwn(workStoryTopics,roleId)?workStoryTopics[roleId].slice(0,workEditions[roleId]?.topics.length ?? visibleCounts[roleId]):[];
}

const outlines={
  boomerang:topics('boomerang',[
    ['online-sales','فروش آنلاین از کجا شروع شد؟','Where online sales began'],
    ['store','از محصول تا فروشگاه اینترنتی','From a product to an online store'],
    ['four-languages','چهار زبان، یک تجربهٔ خرید','Four languages, one shopping experience'],
    ['channels','وقتی کانال‌های فروش کنار هم قرار می‌گیرند','Bringing sales channels together'],
    ['ai-operations','AI کجای کار به کمک آمد؟','Where AI helped with the work']
  ]),
  turbin:topics('turbin',[
    ['launch','راه‌اندازی فروش آنلاین با یک تیم کوچک','Launching online sales with a small team'],
    ['team','کار بین اعضای تیم چطور تقسیم شد؟','How the team divided the work'],
    ['marketplaces','فروشگاه و مارکت‌پلیس؛ دو مسیر برای فروش','The store and the marketplace'],
    ['content','محتوا چطور به کار فروش می‌آمد؟','Making content useful to sales'],
    ['after-sales','داستان فروش با سفارش تمام نمی‌شود','The work after an order is placed']
  ]),
  can:topics('can',[
    ['strategy','از هدف بازاریابی تا برنامهٔ اجرا','From a marketing goal to a working plan'],
    ['budget','بودجهٔ تبلیغات را کجا خرج کنیم؟','Where the advertising budget should go'],
    ['channels','یک پیام در کانال‌های آنلاین و آفلاین','One message across online and offline channels'],
    ['exhibitions','بازاریابی در نمایشگاه، از نزدیک','Marketing on the exhibition floor'],
    ['sales-network','محتوایی که شبکهٔ فروش لازم داشت','Content the sales network needed']
  ]),
  datis:topics('datis',[
    ['question','پیش از تحقیق، سؤال درست چه بود؟','Finding the question before the research'],
    ['fieldwork','چیزی که باید از بازار می‌پرسیدیم','What we needed to ask the market'],
    ['online-data','از داده‌های آنلاین چه می‌شد فهمید؟','What online data could tell us'],
    ['products','تحقیق برای محصول موجود و محصول تازه','Research for existing and new products'],
    ['decisions','تحقیق چطور وارد تصمیم بازاریابی شد؟','Turning research into marketing decisions']
  ]),
  binici:topics('binici',[
    ['dashboard','داشبورد فروش قرار بود به چه سؤالی جواب بدهد؟','The question behind the sales dashboard'],
    ['demand','تقاضای بازار را چطور می‌دیدیم؟','Understanding market demand'],
    ['budget','وقتی بودجه به دادهٔ فروش وصل می‌شود','Connecting budgets to sales data'],
    ['products','استراتژی فروش برای محصولات مختلف','Sales strategy across products'],
    ['marketing','از عددهای فروش تا برنامهٔ مارکتینگ','From sales figures to a marketing plan']
  ]),
  'safir-lead':topics('safir-lead',[
    ['regions','یک مؤسسه، بازارهای محلی متفاوت','One academy, different local markets'],
    ['customer-voice','صدای مشتری چه چیزی به ما می‌گفت؟','What the voice of the customer told us'],
    ['cinema','یادگیری زبان در سینما','Language learning at the cinema'],
    ['tour','یک روز بیرون از کلاس، به زبان انگلیسی','A day outside the classroom, in English'],
    ['services','بازاریابی برای خدمات مکمل آموزشی','Marketing complementary learning services']
  ]),
  'safir-field':topics('safir-field',[
    ['counters','کانتر تبلیغاتی از نگاه کسی که از کنارش می‌گذرد','A promotional counter through a passerby’s eyes'],
    ['promoters','هماهنگی تیم پروموتر در میدان','Coordinating promoters in the field'],
    ['organisations','شروع گفت‌وگو با سازمان‌های منطقه','Starting conversations with local organisations'],
    ['leads','از اطلاعات اولیه تا سرنخ قابل پیگیری','From initial information to a lead worth following'],
    ['follow-up','تماسی که بعد از معرفی اولیه برقرار می‌شود','Following up after the first introduction']
  ]),
  asiatech:topics('asiatech',[
    ['installation','پیش از نصب، چه چیزی را بررسی می‌کردم؟','What I checked before an installation'],
    ['diagnosis','از شرح مشکل تا عیب‌یابی','From a problem report to a diagnosis'],
    ['explanation','پاسخ فنی چطور برای کاربر روشن می‌شود؟','Making a technical answer clear to a user'],
    ['support','پشتیبانی از نگاه کسی که منتظر اتصال است','Support through the eyes of someone waiting to connect'],
    ['learning','چیزی که کار فنی به مسیر بعدی من اضافه کرد','What technical work brought to the rest of my career']
  ])
};

export const workStoryTopics = Object.fromEntries(Object.entries(outlines).map(([role, plans]) => {
  const published = (workEditions[role]?.topics ?? []).map(([key, fa, en]) => {
    const id = role + '-' + key;
    return {id, post:id, fa:{title:fa}, en:{title:en}};
  });
  return [role, [...published, ...plans.filter(plan => !published.some(story => story.id === plan.id))]];
}));
