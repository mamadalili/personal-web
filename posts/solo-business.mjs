import { soloGroups, soloOpportunities } from './solo-opportunities.mjs';

export const soloBusiness = {
  slug: 'solo-business', status: 'published', date: '2026-10-26', reviewed: '2026-10-25',
  fa: {
    title: 'یک نفر، چند نقش؛ کسب‌وکار با کمک AI',
    excerpt: 'از توانایی فعلی‌ات به یک پیشنهاد روشن برس. مسیرها را باز کن، سهم AI و مسئولیت خودت را ببین و ظرفیت تحویل را روی یک میز کار تعاملی امتحان کن.',
    category: 'کسب‌وکار و هوش مصنوعی', readTime: '۹ دقیقه + تجربه',
    credit: 'نوشته و تجربهٔ تعاملی مستقل، با الهام از Solo اثر کوشیار؛ همراه با منابع تکمیلی و مدل آموزشی اختصاصی.',
    sourceNote: 'مرجع Solo الهام‌بخش تجربهٔ انتخاب مسیر است. پیشنهادها و مدل زمان، سناریوهای آموزشیِ این مقاله‌اند؛ نرخ بازار، درآمد گزارش‌شده یا نتیجهٔ تضمینی نیستند. منابع تکمیلی برای روش شناخت مشتری و طراحی استفادهٔ مسئولانه از AI آمده‌اند.',
    takeaways: ['توانایی را به خروجی قابل تحویل تبدیل کن.', 'زمان بازبینی و ارتباط با مشتری را حساب کن.', 'با یک نمونه و معیار پذیرش شروع کن.']
  },
  en: {
    title: 'One person, many roles: building a business with AI',
    excerpt: 'Turn an existing capability into a clear offer. Explore possible paths, separate AI assistance from your responsibilities, and test delivery capacity on an interactive workbench.',
    category: 'BUSINESS & AI', readTime: '9 minutes + exploration',
    credit: 'Independent writing and interaction design inspired by Kooshiar’s Solo, with additional sources and an original educational model.',
    sourceNote: 'Solo inspired the path-selection experience. The offers and workload model are educational scenarios developed for this article, not market rates, reported earnings or guaranteed results. Additional sources inform customer research and responsible AI workflow design.',
    takeaways: ['Turn a capability into a bounded deliverable.', 'Count review and client-communication time.', 'Start with a sample and acceptance evidence.']
  },
  glossary: {
    'bounded-offer': {
      fa: { title: 'پیشنهاد با دامنهٔ روشن', text: 'توافقی مشخص دربارهٔ خریدار، مسئله، خروجی، معیار پذیرش و چیزهایی که شامل کار نیست. روشن‌بودن این مرزها به برآورد زمان و گفت‌وگوی بهتر کمک می‌کند.' },
      en: { title: 'A bounded offer', text: 'A clear agreement about the buyer, problem, deliverable, acceptance evidence and exclusions. These boundaries make workload estimation and the client conversation more concrete.' }
    },
    'retainer': {
      fa: { title: 'همکاری مستمر با دامنهٔ مشخص', text: 'توافق تکرارشونده برای کاری که واقعاً نیاز تکراری دارد؛ مثلاً نگه‌داری یک جریان یا تدوین بستهٔ محتوای تعریف‌شده. ظرفیت، خروجی، زمان پاسخ و موارد خارج از دامنه باید روشن بمانند.' },
      en: { title: 'A scoped retainer', text: 'A recurring agreement for a genuinely recurring need, such as maintaining a workflow or producing a defined content package. Capacity, outputs, response expectations and exclusions still need to be explicit.' }
    },
    'acceptance-evidence': {
      fa: { title: 'شاهد پذیرش', text: 'نشانه‌ای قابل بررسی که نشان دهد خروجی با توافق اولیه سازگار است؛ مانند بازاجرای یک گزارش از دادهٔ مبنا، عبور از آزمون مشخص یا انجام یک کار نمونه توسط کاربر.' },
      en: { title: 'Acceptance evidence', text: 'A checkable sign that a deliverable meets the original agreement: reproducing a report from source data, passing a defined test or observing a user complete a sample task.' }
    }
  },
  sources: [
    {
      id: 'solo-reference', url: 'https://kooshiar.com/solo', publisher: 'Kooshiar', kind: 'inspiration',
      fa: { title: 'Solo — مرجع تجربهٔ انتخاب مسیر', note: 'الهام از انتخاب پیشینه و بازکردن جزئیات مسیر. متن، دسته‌بندی پیشنهادها، تصویر و مدل این صفحه مستقل ساخته شده‌اند. برآوردهای درآمد و جدول زمانی مرجع به‌عنوان واقعیت به این مقاله منتقل نشده‌اند.' },
      en: { title: 'Solo — inspiration for choosing a path', note: 'Inspiration for selecting a starting point and opening focused details. This article’s writing, offer taxonomy, figure and model were developed independently. The reference’s earnings estimates and timeline are not imported as facts.' }
    },
    {
      id: 'sba-research', url: 'https://www.sba.gov/counseling/plan-your-business/', publisher: 'U.S. Small Business Administration', kind: 'guide',
      fa: { title: 'شناخت مشتری و تحلیل رقبا', note: 'مرجع روش بررسی تقاضا، جایگزین‌ها و شناخت مستقیم مشتری. پیشنهادهای این مقاله باید در بازار و شرایط خود خواننده اعتبارسنجی شوند؛ این راهنما شاهد تقاضای اثبات‌شده برای آن‌ها نیست.' },
      en: { title: 'Market research and competitive analysis', note: 'A reference for investigating demand, alternatives and customers directly. Readers must validate these offers in their own market and circumstances; this guide does not establish demand for them.' }
    },
    {
      id: 'openai-agents', url: 'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/', publisher: 'OpenAI', kind: 'guide', date: '2026-01-15',
      fa: { title: 'طراحی جریان AI با مرز و بازبینی انسانی', note: 'مبنای تأکید بر دامنهٔ روشن ابزار، کنترل دسترسی و ارجاع به انسان در خطا یا عملیات حساس. مثال زمان این مقاله، دادهٔ عملکرد این راهنما نیست.' },
      en: { title: 'AI workflows with boundaries and human intervention', note: 'Supports clear tool boundaries, access controls and human escalation for failures or sensitive actions. This article’s timing assumptions are not performance data from the guide.' }
    }
  ],
  sections: [
    {
      id: 'delivery-capacity', fa: { title: 'میز کار تک‌نفره‌ات را تنظیم کن' }, en: { title: 'Set up your one-person workbench' },
      blocks: [
        { type: 'paragraph', fa: 'یک کسب‌وکار تک‌نفره به چند نقش نیاز دارد: فهم مسئله، فروش، ساخت، بازبینی و ارتباط. AI می‌تواند در بخشی از این کارها کمک کند. نقطهٔ شروع، یک [[bounded-offer|پیشنهاد با دامنهٔ روشن]] است که بتوانی کیفیتش را بررسی و در زمان موجود تحویل بدهی.', en: 'A one-person business still needs several roles: understanding a problem, selling, making, reviewing and communicating. AI can assist with parts of that work. Start with a [[bounded-offer|bounded offer]] whose quality you can check and whose delivery fits your available time.' },
        {
          type: 'capacity-rig', model: 'solo-capacity', defaults: { hours: 12, orders: 12, automation: 60 },
          fa: { title: 'AI چقدر جا روی میزت باز می‌کند؟', note: 'ورودی‌ها را تغییر بده. کارت‌ها، فاصلهٔ پرس و عقربه از یک مدل مشترک پیروی می‌کنند؛ زمان بازبینی و ارتباط با مشتری در محاسبه باقی می‌ماند.' },
          en: { title: 'How much room can AI make on your bench?', note: 'Change the inputs. Cards, the press gap and the dial follow one shared model; review and client-communication time stay in the calculation.' }
        },
        { type: 'callout', fa: 'فرض آموزشی هر سفارش: ۷۵ دقیقه آماده‌سازی، ۲۵ دقیقه بازبینی و ۲۰ دقیقه ارتباط. نوار واگذاری فقط از زمان آماده‌سازی کم می‌کند. «قابل تحویل» سقف زمانی همین مثال است؛ پیدا شدن مشتری و پذیرش خروجی باید جداگانه بررسی شوند.', en: 'Educational assumptions per order: 75 preparation minutes, 25 review minutes and 20 communication minutes. Delegation reduces preparation only. “Can be delivered” is this example’s time constraint; finding buyers and getting work accepted require separate validation.' }
      ]
    },
    {
      id: 'choose-a-path', fa: { title: 'از توانایی فعلی‌ات شروع کن' }, en: { title: 'Start from a capability you already have' },
      blocks: [
        {
          type: 'opportunities', groups: soloGroups, items: soloOpportunities,
          fa: { eyebrow: 'پیشنهادهایی برای آزمایش', title: 'چه چیزی می‌توانی تحویل بدهی؟', note: 'یک نقطهٔ شروع انتخاب کن یا جست‌وجو کن. جزئیات هر کارت، خریدار پیشنهادی، شاهد کیفیت، نقش AI و اولین آزمایش را نشان می‌دهد. این‌ها ایده‌های تدوین‌شده‌اند و تقاضای اثبات‌شده یا درآمد تضمینی نیستند.' },
          en: { eyebrow: 'OFFERS TO TEST', title: 'What could you deliver?', note: 'Choose a starting point or search. Each card explains a proposed buyer, quality evidence, AI’s role and a first experiment. These are editorial offer ideas, not established demand or promised earnings.' }
        },
        { type: 'paragraph', fa: 'اگر هنوز تخصص مشخصی نداری، یک کار کوچک با خروجی قابل بررسی انتخاب کن و برای یادگیری و بازخورد وقت بگذار. برای دیدن پیوند این نگاه با کار واقعی من، [مهارت‌ها](@skills) و [تجربه‌های کاری](@cv) را ببین.', en: 'If you do not yet have a specialist skill, choose a small task with a checkable output and allow time for learning and feedback. Explore [my capabilities](@skills) and [work experience](@cv) to see how this approach connects to my own practice.' }
      ]
    },
    {
      id: 'shape-the-offer', fa: { title: 'شکل همکاری را با مسئله هماهنگ کن' }, en: { title: 'Match the engagement to the problem' },
      blocks: [
        { type: 'paragraph', fa: 'پیش از انتخاب ابزار، با خریدار دربارهٔ مسئله، راه‌حل فعلی و معیار پذیرش حرف بزن. [راهنمای شناخت بازار SBA](https://www.sba.gov/counseling/plan-your-business/) بررسی تقاضا، جایگزین‌ها و گفت‌وگوی مستقیم با مشتری را پیشنهاد می‌کند. انتخاب‌های زیر چارچوب پیشنهادی این مقاله برای روشن‌کردن دامنه‌اند.', en: 'Before choosing tools, discuss the problem, current alternatives and acceptance criteria with a potential buyer. [SBA’s market-research guidance](https://www.sba.gov/counseling/plan-your-business/) covers demand, alternatives and direct customer research. The options below are this article’s proposed ways to clarify scope.' },
        { type: 'tabs', items: [
          { fa: { label: 'پروژهٔ محدود', title: 'وقتی پایان کار روشن است', text: 'یک خروجی مشخص مثل نمونهٔ تعاملی یا ممیزی یک دستهٔ محصول تعریف کن. ورودی لازم، تعداد بازبینی، معیار پذیرش و فایل‌های تحویل را پیشاپیش روشن کن. پس از نمونهٔ اولیه، زمان واقعی را با برآورد مقایسه کن.' }, en: { label: 'Bounded project', title: 'When the finish line is clear', text: 'Define one deliverable, such as an interactive prototype or a category audit. Agree on inputs, review rounds, acceptance evidence and handover files. After the initial sample, compare actual effort with the estimate.' } },
          { fa: { label: 'همکاری مستمر', title: 'وقتی نیاز واقعاً تکرار می‌شود', text: 'برای نگه‌داری، گزارش یا تولیدِ تکرارشونده، [[retainer|همکاری مستمر]] می‌تواند مناسب باشد. خروجی هر دوره، ظرفیت، زمان پاسخ و تغییرات خارج از دامنه را روشن کن؛ تکرار قرارداد، به‌تنهایی تضمین ثبات درآمد نیست.' }, en: { label: 'Recurring work', title: 'When the need genuinely repeats', text: 'A [[retainer|scoped retainer]] may fit maintenance, reporting or recurring production. Define period outputs, capacity, response expectations and out-of-scope changes. A recurring contract alone does not guarantee stable earnings.' } },
          { fa: { label: 'آزمایش اولیه', title: 'وقتی مسئله هنوز مبهم است', text: 'یک آزمایش کوچک تعریف کن که فقط یک ابهام را کم کند: آیا خروجی قابل استفاده است؟ آیا خریدار همین مسئله را مهم می‌داند؟ نتیجه می‌تواند ادامه، اصلاح یا کنارگذاشتن پیشنهاد باشد. شواهد را پیش از بزرگ‌کردن تعهد جمع کن.' }, en: { label: 'Initial experiment', title: 'When the problem is still unclear', text: 'Define a small experiment that resolves one uncertainty: is the output useful, or does the buyer consider this problem important? The result can support continuing, revising or dropping the offer. Gather evidence before expanding the commitment.' } }
        ] }
      ]
    },
    {
      id: 'from-sample-to-client', fa: { title: 'از نمونه تا همکاری؛ با شاهد جلو برو' }, en: { title: 'From sample to engagement, with evidence' },
      blocks: [
        { type: 'paragraph', fa: 'برای این مسیر، ماهِ قطعیِ رسیدن به درآمد تعیین نمی‌کنیم. هر مرحله با یک شاهد جلو می‌رود. عنوان‌ها را باز کن و خروجی لازم را ببین.', en: 'This path has no fixed month in which earnings are supposed to arrive. Move between stages when you have evidence. Open each stage to inspect the required output.' },
        { type: 'details', fa: { title: 'مسئله را با یک خریدار واقعی روشن کن', text: 'در پایان گفت‌وگو باید بدانی چه کسی از خروجی استفاده می‌کند، اکنون چه روشی دارد و پذیرش را با چه شاهدی می‌سنجد. اگر مسئله روشن نشد، پیشنهاد را محدودتر یا پرسش را دقیق‌تر کن.' }, en: { title: 'Clarify the problem with a real potential buyer', text: 'Know who will use the output, how they handle the task today and what evidence will establish acceptance. If the problem remains unclear, narrow the offer or improve the question.' } },
        { type: 'details', fa: { title: 'یک نمونهٔ مجاز و قابل بازبینی بساز', text: 'با دادهٔ مجاز یا نمونهٔ فرضیِ مشخص کار کن. خروجی، محدودیت و زمان واقعی را ثبت کن. برای نمونهٔ قابل انتشار، اجازهٔ مناسب بگیر و اطلاعات محرمانه را حذف کن.' }, en: { title: 'Make a permitted, reviewable sample', text: 'Use permitted data or a clearly identified synthetic sample. Record the output, limits and actual effort. Obtain suitable permission for a public example and remove confidential information.' } },
        { type: 'details', fa: { title: 'یک تحویل را با دامنهٔ روشن انجام بده', text: 'ورودی‌ها، خروجی، بازبینی و معیار پذیرش را روشن کن. زمان فروش و هماهنگی را هم جداگانه ثبت کن تا ظرفیت واقعی را بهتر بشناسی. شلوغ‌بودن را با تحویل موفق یکسان فرض نکن.' }, en: { title: 'Complete one clearly scoped handover', text: 'Clarify inputs, output, review rounds and acceptance evidence. Track selling and coordination time separately to understand actual capacity. Being busy and completing an accepted delivery are different observations.' } },
        { type: 'details', fa: { title: 'فقط آنچه تکرار می‌شود را استاندارد کن', text: 'بخش‌های تکرارشونده را به قالب و چک‌لیست تبدیل کن و استثناها را نگه دار. گام خودکار باید قابل آزمون و بازگشت باشد. برای طراحی این مسیر می‌توانی از [راهکارهای من](@solutions) شروع کنی.' }, en: { title: 'Standardize what actually repeats', text: 'Turn recurring parts into templates and checklists while preserving exceptions. An automated step should be testable and reversible. Explore [my solutions](@solutions) for ways to design this process.' } }
      ]
    },
    {
      id: 'quality-and-responsibility', fa: { title: 'کیفیت، داده و مسئولیت روی میز می‌مانند' }, en: { title: 'Quality, data and responsibility stay on the bench' },
      blocks: [
        { type: 'paragraph', fa: 'برای خروجی، [[acceptance-evidence|شاهد پذیرش]] تعریف کن و مسیر ارجاع را روشن نگه دار. [راهنمای OpenAI](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) بر مرز ابزار، کنترل دسترسی و ورود انسان در خطاها و عملیات حساس تأکید می‌کند. در پیشنهاد تو هم باید معلوم باشد چه کاری کمک‌گرفته از AI است و چه کسی نتیجه را تأیید می‌کند.', en: 'Define [[acceptance-evidence|acceptance evidence]] and keep an escalation path clear. [OpenAI’s guide](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) emphasizes tool boundaries, access controls and human intervention for failures and sensitive actions. Your offer should also make clear where AI assists and who approves the result.' },
        { type: 'callout', fa: 'پیش از واگذاری یک گام، بپرس: داده مجاز است؟ خروجی چطور بررسی می‌شود؟ در خطا چه اتفاقی می‌افتد؟ برای تصمیم حساس، متخصص مسئول و کنترل مناسب لازم است. این پرسش‌ها بخشی از طراحی تحویل‌اند.', en: 'Before delegating a step, ask: is the data permitted, how will the output be checked, and what happens on failure? Sensitive decisions require the responsible specialist and appropriate controls. These questions belong in the delivery design.' },
        { type: 'quiz', fa: { question: 'پرس سریع‌تر شده، اما سفارش‌ها هنوز بیرون از ظرفیت‌اند. قدم مناسب چیست؟' }, en: { question: 'Preparation is faster, but requests still exceed capacity. What is a useful next step?' }, choices: [
          { correct: false, fa: 'زمان بازبینی را از برنامه حذف کنم.', en: 'Remove review time from the plan.' },
          { correct: true, fa: 'دامنه، تعداد سفارش و زمان واقعی تحویل را دوباره بررسی کنم.', en: 'Revisit scope, order count and actual delivery time.' },
          { correct: false, fa: 'عدد درآمد را از سرعت تولید نتیجه بگیرم.', en: 'Infer earnings from production speed.' }
        ], faExplanation: 'ظرفیت این مدل به زمان انسانی و تقاضا وابسته است. سرعت آماده‌سازی، کیفیتِ پذیرفته‌شده یا درآمد را به‌تنهایی تعیین نمی‌کند.', enExplanation: 'This model’s capacity depends on human time and demand. Preparation speed alone establishes neither accepted quality nor earnings.' }
      ]
    }
  ],
  related: [
    { target: 'post:ai-model-market', fa: { title: 'درون بازار مدل‌های AI', description: 'مقالهٔ اول؛ برای تفکیک داده، فرض و برداشت در بازار هوش مصنوعی.' }, en: { title: 'Inside the AI model market', description: 'The first article: separating data, assumptions and interpretation.' } },
    { target: 'solutions', fa: { title: 'یک مسئلهٔ واقعی روی میز بگذاریم', description: 'از استراتژی و اجرا تا فناوری و ابزارهای AI.' }, en: { title: 'Put a real problem on the bench', description: 'Explore strategy, execution, technology and AI tools.' } },
    { target: 'cv:projects', fa: { title: 'پروژه‌ها و تجربه‌های من', description: 'نگاهی به زمینهٔ کاری پشت این رویکرد.' }, en: { title: 'My projects and experience', description: 'The professional background behind this approach.' } }
  ]
};
