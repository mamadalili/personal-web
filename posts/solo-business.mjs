import { soloGroups, soloOpportunities } from './solo-opportunities.mjs';

export const soloBusiness = {
  cover: {
    fa: { src: 'assets/blog/solo-business-fa.webp', alt: 'یک فرد با چند فضای کاری دیجیتال؛ یک نفر، چند نقش با کمک AI.', width: 1672, height: 940 },
    en: { src: 'assets/blog/solo-business-en.webp', alt: 'One independent professional coordinating several digital roles with AI.', width: 1672, height: 941 }
  },
  slug: 'solo-business', status: 'published', date: '2026-10-26', reviewed: '2026-10-25',
  fa: {
    title: 'یک نفر، چند نقش؛ کسب‌وکار با کمک AI',
    excerpt: 'صاحب یک فروشگاه فهرست کالاهاش رو می‌ده دستت. با کمک AI کدوم بخش رو می‌تونی آماده کنی، چی رو باید خودت چک کنی و آخرش بابت چه چیزی پول می‌گیری؟',
    category: 'کسب‌وکار و هوش مصنوعی', readTime: '۹ دقیقه + تجربه',
    credit: 'نوشته و تجربهٔ تعاملی مستقل، با الهام از Solo اثر کوشیار؛ همراه با پیشنهادهای قابل بررسی و منابع تکمیلی.',
    sourceNote: 'مرجع Solo الهام‌بخش تجربهٔ انتخاب مسیر است. پیشنهادهای این مقاله، ایده‌هایی برای آزمایش‌اند؛ نرخ بازار، درآمد گزارش‌شده یا نتیجهٔ تضمینی نیستند. منابع تکمیلی برای روش شناخت مشتری و طراحی استفادهٔ مسئولانه از AI آمده‌اند.',
    takeaways: ['یه کاری رو انتخاب کن که خودت بلدی درست یا غلط بودنش رو تشخیص بدی.', 'وقت تماس، اصلاح و تحویل رو هم توی قیمت و برنامه‌ات ببین.', 'با یک نمونه به خریدار نشون بده در آخر چی دستش می‌رسه.']
  },
  en: {
    title: 'One person, many roles: building a business with AI',
    excerpt: 'A shop owner hands you a product list. What can AI help prepare, what do you need to check yourself, and what exactly will the shop pay for?',
    category: 'BUSINESS & AI', readTime: '9 minutes + exploration',
    credit: 'Independent writing and interaction design inspired by Kooshiar’s Solo, with offers to investigate and additional sources.',
    sourceNote: 'Solo inspired the path-selection experience. These offers are ideas to test, not market rates, reported earnings or guaranteed results. Additional sources inform customer research and responsible AI workflow design.',
    takeaways: ['Pick a job where you can tell whether the result is right.', 'Allow for calls, corrections and handover when you price and schedule the job.', 'Show the buyer a small sample of exactly what they’ll receive.']
  },
  glossary: {
    'bounded-offer': {
      fa: { title: 'پیشنهاد با دامنهٔ روشن', text: '«برای فروشگاهت محتوا می‌سازم» می‌تونه چند جور معنی بده. اگر روی یک دستهٔ کالا، فایل مشخصات، تعداد اصلاح و روش تحویل توافق کنی، هم تو و هم خریدار می‌دونین چه کاری جزو سفارشه.' },
      en: { title: 'A bounded offer', text: '“I’ll make content for your shop” leaves a lot open. Agree on one category, a specification file, revision rounds and how you’ll hand it over. Now you and the shop know what’s included.' }
    },
    'retainer': {
      fa: { title: 'همکاری مستمر با دامنهٔ مشخص', text: 'اگر فروشگاه هر ماه محصول تازه میاره، ممکنه برای آماده‌کردن تعداد مشخصی کالا در هر ماه با هم توافق کنین. قبلش معلوم کن چه چیزی تحویل می‌دی، چقدر وقت داری و اگر سفارش اضافه شد چی عوض می‌شه.' },
      en: { title: 'A scoped retainer', text: 'A shop that adds stock every month might book you to prepare a set number of listings each month. Agree on the deliverable, the time available and what happens if it needs more.' }
    },
    'acceptance-evidence': {
      fa: { title: 'شاهد پذیرش', text: 'از کجا می‌فهمین کاری که تحویل دادی همونه که خریدار خواسته؟ مثلاً خودش یک ردیف فایل رو وارد فروشگاه کنه و محصولِ درست با مشخصات درست بالا بیاد. این آزمایش ساده می‌تونه معیار تحویل باشه.' },
      en: { title: 'Acceptance evidence', text: 'How will you both know the shop received what it asked for? The buyer could import one row and check that the correct product appears with the right specifications. That’s a concrete acceptance check.' }
    }
  },
  sources: [
    {
      id: 'solo-reference', url: 'https://kooshiar.com/solo', publisher: 'Kooshiar', kind: 'inspiration',
      fa: { title: 'Solo — مرجع تجربهٔ انتخاب مسیر', note: 'الهام از انتخاب پیشینه و بازکردن جزئیات مسیر. متن، دسته‌بندی پیشنهادها و طراحی تعامل این صفحه مستقل ساخته شده‌اند. برآوردهای درآمد و جدول زمانی مرجع به‌عنوان واقعیت به این مقاله منتقل نشده‌اند.' },
      en: { title: 'Solo — inspiration for choosing a path', note: 'Inspiration for selecting a starting point and opening focused details. This article’s writing, offer taxonomy and interaction design were developed independently. The reference’s earnings estimates and timeline are not imported as facts.' }
    },
    {
      id: 'sba-research', url: 'https://www.sba.gov/counseling/plan-your-business/', publisher: 'U.S. Small Business Administration', kind: 'guide',
      fa: { title: 'شناخت مشتری و تحلیل رقبا', note: 'مرجع روش بررسی تقاضا، جایگزین‌ها و شناخت مستقیم مشتری. پیشنهادهای این مقاله باید در بازار و شرایط خود خواننده اعتبارسنجی شوند؛ این راهنما شاهد تقاضای اثبات‌شده برای آن‌ها نیست.' },
      en: { title: 'Market research and competitive analysis', note: 'A reference for investigating demand, alternatives and customers directly. Readers must validate these offers in their own market and circumstances; this guide does not establish demand for them.' }
    },
    {
      id: 'openai-agents', url: 'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/', publisher: 'OpenAI', kind: 'guide', date: '2026-01-15',
      fa: { title: 'طراحی جریان AI با مرز و بازبینی انسانی', note: 'مبنای تأکید بر دامنهٔ روشن ابزار، کنترل دسترسی و ارجاع به انسان در خطا یا عملیات حساس.' },
      en: { title: 'AI workflows with boundaries and human intervention', note: 'Supports clear tool boundaries, access controls and human escalation for failures or sensitive actions.' }
    }
  ],
  sections: [
    {
      id: 'delivery-capacity', fa: { title: 'برای فروشگاه دقیقاً چه کاری انجام می‌دی؟' }, en: { title: 'What exactly will you do for the shop?' },
      blocks: [
        { type: 'paragraph', fa: 'صاحب یک فروشگاه می‌گه «می‌تونی کمک کنی این کالاها رو روی سایت بذارم؟» شاید نوشتن توضیح کالا با AI راحت باشه. ولی کسی باید بفهمه کدوم عکس مال کدوم کالاست، مشخصات رو چک کنه و فایل رو تحویل بده. توی کار تک‌نفره اون آدم خودتی. یک [[bounded-offer|پیشنهاد با محدودهٔ روشن]] از همین‌جا شروع می‌شه. خریدار می‌فهمه چه چیزی می‌گیره و تو می‌فهمی چه کاری رو قول دادی.', en: 'A shop owner asks whether you can get some products onto the website. AI can help draft the descriptions. Someone still has to match each photo to its product, check the specifications and hand over a usable file. In a one-person business, that’s you. A [[bounded-offer|clearly scoped offer]] tells the buyer what they’ll get and tells you what you’ve agreed to do.' },
        { type: 'callout', fa: 'توی فهرست پایین کاری رو باز کن که خودت بلدی کیفیتش رو بسنجی. بعد ببین چه کسی بهش نیاز داره و کوچک‌ترین نمونه‌ای که می‌تونی نشونش بدی چیه.', en: 'Open an offer whose quality you know how to judge. Who needs that work, and what’s the smallest sample you could show them?' }
      ]
    },
    {
      id: 'choose-a-path', fa: { title: 'کدوم کار رو همین حالا بلدی؟' }, en: { title: 'Which job do you already know how to do?' },
      blocks: [
        {
          type: 'opportunities', groups: soloGroups, items: soloOpportunities,
          fa: { eyebrow: 'پیشنهادهایی برای آزمایش', title: 'چه چیزی می‌توانی تحویل بدهی؟', note: 'یک نقطهٔ شروع انتخاب کن یا جست‌وجو کن. جزئیات هر کارت، خریدار پیشنهادی، شاهد کیفیت، نقش AI و اولین آزمایش را نشان می‌دهد. این‌ها ایده‌های تدوین‌شده‌اند و تقاضای اثبات‌شده یا درآمد تضمینی نیستند.' },
          en: { eyebrow: 'OFFERS TO TEST', title: 'What could you deliver?', note: 'Choose a starting point or search. Each card explains a proposed buyer, quality evidence, AI’s role and a first experiment. These are editorial offer ideas, not established demand or promised earnings.' }
        },
        { type: 'paragraph', fa: 'اگر بین چند کار مرددی، ببین توی کدوم یکی می‌تونی اشتباه ابزار رو تشخیص بدی. مثلاً کسی که فروشگاه رو می‌شناسه، ممکنه زودتر بفهمه توضیحِ یک کالا برای مدل دیگه نوشته شده. برای آشنایی با کارهایی که خودم انجام دادم، [مسیر کاری من](@cv) رو ببین.', en: 'If several offers appeal to you, which one would let you catch a bad AI draft? Someone who knows a shop’s range may immediately spot a description written for the wrong model. For the kinds of work I’ve done myself, see [my CV](@cv).' }
      ]
    },
    {
      id: 'shape-the-offer', fa: { title: 'یک سفارش کافیه یا این کار هر ماه تکرار می‌شه؟' }, en: { title: 'A one-off order or a job that comes back every month?' },
      blocks: [
        { type: 'paragraph', fa: 'برگردیم به همون فروشگاه. قبل از قیمت‌دادن بپرس «آخرین بار که محصول تازه گذاشتید، کدوم قسمت بیشتر وقت گرفت؟» شاید توضیح‌ها حاضر باشن و مشکل اصلی این باشه که فایل تأمین‌کننده توی فروشگاه باز نمی‌شه. [راهنمای شناخت بازار SBA](https://www.sba.gov/counseling/plan-your-business/) هم پیشنهاد می‌کنه با خود مشتری حرف بزنی و ببینی الان مشکل رو چطور حل می‌کنه.', en: 'Back at the shop, ask what took longest the last time a product went online. The descriptions might be ready. Perhaps the supplier’s file won’t import. The [SBA guide to market research](https://www.sba.gov/counseling/plan-your-business/) suggests talking to buyers directly and finding out what alternatives they use today.' },
        { type: 'image', src: 'assets/blog/solo-catalog-delivery.webp', width: 1672, height: 941,
          fa: { alt: 'لیوان‌های سرامیکی، عکس‌ها و یادداشت‌های محصول کنار یک کاتالوگ یکدست روی تبلت و برگهٔ تحویل.', caption: 'یک نمونهٔ فرضی از پیشنهاد کاتالوگ: عکس‌ها و مشخصات پراکنده، در یک خروجی یکدست برای فروشگاه جمع می‌شوند.' },
          en: { alt: 'Ceramic mugs, source photos and product notes beside a consistent catalog on a tablet and a handover sheet.', caption: 'An illustrative catalog offer: scattered photos and product information become one consistent deliverable for a store.' }
        },
        { type: 'paragraph', fa: 'حالا می‌تونی به‌جای «کاتالوگ می‌سازم» بگی «برای همین دستهٔ کالا یک فایل آمادهٔ ورود به فروشگاه می‌دم. عکس و مشخصات هر ردیف رو با فهرست شما چک می‌کنم.» اگر فروشگاه هر هفته کالای تازه میاره، شاید همکاری ادامه‌دار به دردش بخوره. تب‌ها رو با همین فرق بخون.', en: 'Now you can offer a file the shop can import for one product category, with every photo and specification checked against its list. If it adds stock every week, an ongoing arrangement may fit. Read the tabs with that difference in mind.' },
        { type: 'tabs', items: [
          { fa: { label: 'پروژهٔ محدود', title: 'وقتی پایان کار روشن است', text: 'برای یک دستهٔ محصول توافق کن کدوم فایل رو می‌گیری، چه چیزی برمی‌گردونی و چند بار اصلاحش می‌کنی. بعد از نمونهٔ اول ببین زمان واقعی چقدر به تخمینت نزدیک بوده.' }, en: { label: 'Bounded project', title: 'When the finish line is clear', text: 'For one category, agree which file you’ll receive, what you’ll return and the number of revisions. After the first sample, compare your estimate with the time it actually took.' } },
          { fa: { label: 'همکاری مستمر', title: 'وقتی نیاز واقعاً تکرار می‌شود', text: 'اگر هر ماه یک دسته کالای تازه می‌رسه، [[retainer|همکاری مستمر]] ارزش بررسی داره. تعداد کالا، زمان پاسخ و کارهای اضافه رو برای هر دوره روشن کن. برای ماه بعد هم باید مشتری واقعاً به همین کار نیاز داشته باشه.' }, en: { label: 'Recurring work', title: 'When the need genuinely repeats', text: 'If a new batch arrives every month, a [[retainer|retainer]] is worth considering. Agree how many products you’ll handle, how soon you’ll reply and what counts as extra. The arrangement still depends on the customer needing the work next month.' } },
          { fa: { label: 'آزمایش اولیه', title: 'وقتی مسئله هنوز مبهم است', text: 'اگر هنوز نمی‌دونی گره فروشگاه از کجاست، یک ردیف رو با اجازهٔ صاحبش امتحان کن. فایل وارد شد؟ عکس و مشخصات سر جاش بود؟ با جواب همین سؤال‌ها می‌تونی پیشنهادت رو اصلاح کنی، ادامه بدی یا کنارش بذاری.' }, en: { label: 'Initial experiment', title: 'When the problem is still unclear', text: 'If you’re unsure where the shop gets stuck, get permission to try one row. Did it import? Did the photo and specifications land in the right places? Decide whether to change the offer, continue or drop it based on what you find.' } }
        ] }
      ]
    },
    {
      id: 'from-sample-to-client', fa: { title: 'از یک نمونه چطور به اولین سفارش برسی؟' }, en: { title: 'How can a sample lead to a first order?' },
      blocks: [
        { type: 'paragraph', fa: 'از کجا بفهمی این ایده مشتری داره؟ به آخرین حرف صاحب فروشگاه فکر کن. تعریف‌کردن از نمونه یک چیزه، دادن فایل کالا برای امتحان توی فروشگاه خودش یک قدم دیگه‌ست. هر بخش رو باز کن تا ببینی برای برداشتن قدم بعدی چه چیزی لازم داری.', en: 'How can you tell whether a buyer wants this? A compliment about a sample is encouraging. A shop sending its own file for a trial tells you something more specific. Open each stage to see what you need before taking the next step.' },
        { type: 'details', fa: { title: 'مسئله را با یک خریدار واقعی روشن کن', text: 'با کسی حرف بزن که محصول رو واقعاً روی سایت می‌ذاره. ازش بخواه آخرین بار رو نشونت بده. جایی که کار گیر می‌کنه و کسی که فایل رو تأیید می‌کنه ممکنه با حدس اولت فرق کنن.' }, en: { title: 'Clarify the problem with a real potential buyer', text: 'Ask the person who actually lists products to walk you through their last upload. Where it gets stuck and who signs off the file may surprise you.' } },
        { type: 'details', fa: { title: 'یک نمونهٔ مجاز و قابل بازبینی بساز', text: 'با یک فایل مجاز یا چند کالای فرضی که مشخص کرده‌ای تمرینی هستن نمونه بساز. بنویس چقدر طول کشید و کدوم قسمت هنوز مشکل داره. پیش از نمایش عمومیِ کار مشتری، اجازه بگیر و اطلاعات محرمانه رو بیرون بذار.' }, en: { title: 'Make a permitted, reviewable sample', text: 'Build a sample with a file you have permission to use, or clearly labelled fictional products. Record how long it takes and what still fails. Get permission and remove confidential details before sharing client work.' } },
        { type: 'details', fa: { title: 'یک تحویل را با دامنهٔ روشن انجام بده', text: 'برای همون دستهٔ اول توافق کن چه فایلی می‌گیری، چند بار اصلاح می‌کنی و مشتری کی تحویل رو قبول می‌کنه. وقتی زمان می‌گیری، تماس و رفت‌وبرگشت فایل‌ها رو هم حساب کن. دفعهٔ بعد برای همین کار تخمین بهتری داری.' }, en: { title: 'Complete one clearly scoped handover', text: 'For that first category, agree on the input, revision rounds and how the shop will accept the file. Time the calls and file exchanges too. You’ll have a better estimate next time.' } },
        { type: 'details', fa: { title: 'فقط آنچه تکرار می‌شود را استاندارد کن', text: 'اگر ستون‌های فایل هر بار یکسانه، براش یک قالب بساز. اگر مشخصات بعضی کالاها استثنا داره، برای بررسی نگهشون دار. قبل از سپردن یک مرحله به ابزار، امتحان کن در صورت اشتباه چطور به فایل درست برمی‌گردی. نمونه‌هایی از این روش رو توی [راهکارهای من](@solutions) می‌بینی.' }, en: { title: 'Standardize what actually repeats', text: 'If the file uses the same columns each time, save a template. Flag unusual products for review. Before automating a step, try restoring the correct file after a mistake. See [my solutions](@solutions) for related work.' } }
      ]
    },
    {
      id: 'quality-and-responsibility', fa: { title: 'اگه عکس یا مشخصات کالا اشتباه بود چی؟' }, en: { title: 'What if the photo or specification is wrong?' },
      blocks: [
        { type: 'paragraph', fa: 'برای فروشگاه، [[acceptance-evidence|نشانهٔ تحویل موفق]] خیلی ملموسه. یک ردیف رو وارد می‌کنه و همون محصول با عکس و مشخصات درست بالا میاد. اگر ابزار مشخصه‌ای رو حدس زده، کی باید متوقفش کنه؟ [راهنمای OpenAI](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) هم روی محدودکردن دسترسی و سپردن موارد حساس یا خطادار به آدم مسئول تأکید داره.', en: 'For the shop, [[acceptance-evidence|evidence of a good delivery]] is tangible. Import a row and check that the right product appears with the right photo and specifications. If a tool has guessed a specification, who catches it? [OpenAI’s guide](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) discusses limiting access and handing sensitive actions or errors to a person.' },
        { type: 'callout', fa: 'یک کالا رو تا آخر امتحان کن. اجازهٔ استفاده از داده‌هاش رو داری؟ خریدار می‌تونه نتیجه رو چک کنه؟ اگر اشتباه بود، معلومه چه کسی درستش می‌کنه؟ جواب این سه سؤال کمک می‌کنه دربارهٔ گرفتن سفارش بعدی تصمیم بگیری.', en: 'Take one product all the way through. Do you have permission to use its data? Can the buyer check the result? If it’s wrong, who fixes it? Those answers will help you decide whether to take the next order.' },
        { type: 'quiz', fa: { question: 'AI آماده‌سازی را سریع‌تر کرده، اما زمان کافی برای تحویل سفارش‌ها نداری. قدم مناسب چیست؟' }, en: { question: 'AI makes preparation faster, but you still lack enough time to deliver the orders. What is a useful next step?' }, choices: [
          { correct: false, fa: 'زمان بازبینی را از برنامه حذف کنم.', en: 'Remove review time from the plan.' },
          { correct: true, fa: 'دامنه، تعداد سفارش و زمان واقعی تحویل را دوباره بررسی کنم.', en: 'Revisit scope, order count and actual delivery time.' },
          { correct: false, fa: 'عدد درآمد را از سرعت تولید نتیجه بگیرم.', en: 'Infer earnings from production speed.' }
        ], faExplanation: 'برای برآورد ظرفیت، زمان ساخت، بازبینی و ارتباط با مشتری را با هم حساب کن. سریع‌تر شدن آماده‌سازی، به‌تنهایی کیفیت پذیرفته‌شده، تحویل به‌موقع یا درآمد را تضمین نمی‌کند.', enExplanation: 'Estimate capacity using production, review and client-communication time together. Faster preparation alone does not guarantee accepted quality, timely delivery or earnings.' }
      ]
    }
  ],
  related: [
    { target: 'post:ai-model-market', fa: { title: 'درون بازار مدل‌های AI', description: 'مقالهٔ اول؛ برای تفکیک داده، فرض و برداشت در بازار هوش مصنوعی.' }, en: { title: 'Inside the AI model market', description: 'The first article: separating data, assumptions and interpretation.' } },
    { target: 'solutions', fa: { title: 'برای یک مسئلهٔ واقعی راهکار پیدا کنیم', description: 'از استراتژی و اجرا تا فناوری و ابزارهای AI.' }, en: { title: 'Find a solution to a real problem', description: 'Explore strategy, execution, technology and AI tools.' } },
    { target: 'cv:projects', fa: { title: 'پروژه‌ها و تجربه‌های من', description: 'نگاهی به زمینهٔ کاری پشت این رویکرد.' }, en: { title: 'My projects and experience', description: 'The professional background behind this approach.' } }
  ]
};
