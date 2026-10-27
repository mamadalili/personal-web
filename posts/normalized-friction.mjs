export const post = {
  slug: 'normalized-friction', status: 'published', date: '2026-10-26', reviewed: '2026-10-26',
  fa: {
    title: 'هزینهٔ کارهایی که عادی شده‌اند',
    excerpt: 'کار دستی تکراری، انتظار و دوباره‌کاری ممکن است دیگر دیده نشوند. یک تحویل واقعی را دنبال کن تا مسئله‌ای قابل اصلاح پیدا شود.',
    category: "اجرا و بهبود کار", readTime: '۴ دقیقه + مقایسه',
    credit: 'نقطهٔ شروع: محتوای حمایت‌شدهٔ Retail Dive؛ با رجوع به ASQ و تمرین‌های مستقل این مقاله.',
    sourceNote: 'این مطلب محتوای حمایت‌شدهٔ D-Wave است؛ نمونهٔ مشتری، روایت فروشنده است و تأیید مستقلِ بازده پروژهٔ دیگر نیست.',
    takeaways: ['عادت‌کردن به یک مشکل، هزینه‌اش را حذف نمی‌کند.', 'مسیر واقعی کار را ببین، از جمله انتظار و برگشت.', 'یک تحویل را اصلاح کن و اثرش را در ادامهٔ مسیر بررسی کن.']
  },
  en: {
    title: 'The Cost of Friction We Accept',
    excerpt: 'Repeated manual work, waiting and rework can disappear from view. Follow one real handoff to find a problem that can be changed.',
    category: "EXECUTION & IMPROVEMENT", readTime: '4 minutes + comparison',
    credit: 'Prompted by sponsored Retail Dive content, with ASQ guidance and independently proposed exercises.',
    sourceNote: 'This is D-Wave sponsored content; the customer case is the vendor’s account, not independent evidence of another project’s return.',
    takeaways: ['Getting used to a problem does not remove its cost.', 'Observe the actual route, including waits and returns.', 'Change one handoff and inspect what happens downstream.']
  },
  sources: [
    { id: 'retail-sponsored', url: 'https://www.retaildive.com/spons/the-most-expensive-problems-are-the-ones-youve-learned-to-live-with/833681/', publisher: 'Retail Dive · Sponsored', kind: 'sponsored', fa: { title: 'محتوای حمایت‌شده: مشکلاتی که به آن‌ها عادت کرده‌ایم', note: 'نمونهٔ برنامه‌ریزی راننده و ادعای کاهش زمان، روایت تجاری D-Wave است؛ نه ارزیابی مستقل.' }, en: { title: 'Sponsored: Problems we have learned to live with', note: 'The driver-scheduling case and claimed time saving are D-Wave’s commercial account, not an independent evaluation.' } },
    { id: 'asq-vsm', url: 'https://asq.org/quality-resources/value-stream-mapping', publisher: 'ASQ', kind: 'guide', fa: { title: 'نقشه‌برداری جریان ارزش', note: 'مرجع روش برای دیدن جریان اطلاعات، کار و انتظار؛ نه وعدهٔ صرفه‌جویی برای این تمرین.' }, en: { title: 'Value Stream Mapping', note: 'Method reference for information, work and waiting; not a savings promise for this exercise.' } }
  ],
  sections: [
    { id: 'name-the-repetition', fa: { title: 'از جملهٔ «همیشه همین است» عبور کن' }, en: { title: 'Look past “that always happens”' }, blocks: [
      { type: 'paragraph', fa: 'پیشنهاد عملی: کاری را انتخاب کن که برایش راه میان‌بر ساخته‌اند. ورود دوبارهٔ سفارش، پیگیری تأیید یا جست‌وجوی فایل، مثال‌های فرضی‌اند. بپرس: این کار چه خروجی‌ای می‌دهد و نفر بعد چه چیزی لازم دارد؟', en: 'This article proposes starting with a task around which the team has built a workaround. Rekeying order details, chasing approval in messages or finding the latest file are hypothetical examples. Before choosing a tool, ask what the task produces and exactly what the next person needs to proceed.' },
      { type: 'callout', fa: 'مطلب Retail Dive محتوای حمایت‌شدهٔ D-Wave است. نمونهٔ مشتری و نتیجهٔ آن از طرف فروشنده گزارش شده‌اند؛ آن‌ها را تضمین نتیجهٔ پروژهٔ خودت ندان. تمرین‌های این مقاله پیشنهادهای مستقل‌اند.', en: 'The Retail Dive piece is sponsored by D-Wave. Its customer case and results are vendor-reported; they do not guarantee results for your project. The exercises here are independent proposals.' }
    ] },
    { id: 'follow-one-case', fa: { title: 'یک مورد را تا پایان دنبال کن' }, en: { title: 'Follow one case through' }, blocks: [
      { type: 'paragraph', fa: 'راهنمای ASQ برای نقشهٔ جریان ارزش، مشاهدهٔ وضعیت موجود و ثبت جریان اطلاعات، پردازش و انتظار را توضیح می‌دهد. [مرجع روش](https://asq.org/quality-resources/value-stream-mapping). برداشت اجرایی این مقاله: یک درخواست واقعی را از ورود تا پذیرش خروجی دنبال کن؛ نقشهٔ آرمانیِ جلسه را جای واقعیت ننشان.', en: 'ASQ’s value-stream guidance describes observing the current state and recording information flow, processing and waiting. [Method reference](https://asq.org/quality-resources/value-stream-mapping). This article’s operational proposal is to follow one real request from arrival to accepted output, rather than substitute an ideal meeting-room process for what happens.' },
      { type: 'paragraph', fa: 'تمرین پیشنهادی: برای هر توقف، دلیل قابل مشاهده بنویس. «فلانی کند است» مشاهده نیست؛ «درخواست بدون مشخصات به واحد بعد رسید و برگشت خورد» قابل بررسی است. از انجام‌دهندهٔ کار بپرس چه اطلاعاتی دیر می‌رسد، کجا تصمیم نامشخص است و کدام کنترل برای جلوگیری از خطا لازم است. هدف، دیدن سازوکار کار است.', en: 'Suggested exercise: write an observable reason for each stop. “Someone is slow” is not an observation; “the request arrived without required details and was returned” can be checked. Ask the people doing the work what arrives late, where authority is unclear and which controls prevent errors. Examine the mechanism of the work.' }
    ] },
    { id: 'choose-a-repair', fa: { title: 'اصلاح را با علت هماهنگ کن' }, en: { title: 'Match the repair to the cause' }, blocks: [
      { type: 'tabs', items: [
        { fa: { label: 'ورودی ناقص', title: 'معیار پذیرش را روشن کن', text: 'پیشنهاد: پیش از تحویل، اطلاعات ضروری و نمونهٔ خروجی قابل قبول را مشخص کن. ببین برگشت کار کمتر می‌شود یا فقط پرکردن فرم طولانی‌تر شده است. اطلاعاتی که هیچ تصمیمی را عوض نمی‌کند، بدون دلیل جمع نکن.' }, en: { label: 'Missing inputs', title: 'Clarify acceptance', text: 'Proposal: specify required information and an acceptable output before handoff. Check whether returns decrease or the form merely takes longer. Do not collect information without a purpose in the decision.' } },
        { fa: { label: 'انتظار تصمیم', title: 'اختیار را مشخص کن', text: 'پیشنهاد: تصمیم مورد نیاز، صاحب اختیار و مسیر رسیدگی به استثنا را کنار درخواست بنویس. صرفاً یک یادآور دیگر اضافه نکن. بررسی کن آیا کارهای مشابه هنوز با دلیل یکسان معطل می‌مانند.' }, en: { label: 'Waiting for a decision', title: 'Make authority explicit', text: 'Proposal: attach the decision needed, decision owner and exception route to the request. Another reminder alone may not resolve the cause. Check whether similar cases still wait for the same reason.' } },
        { fa: { label: 'ورود دوباره', title: 'منبع معتبر را پیدا کن', text: 'پیشنهاد: مشخص کن کدام رکورد مرجع است و اصلاح خطا در کجا ثبت می‌شود. پیش از اتصال خودکار، یک تحویل محدود را دستی تطبیق بده. سرعت انتقال دادهٔ نادرست، اصلاح محسوب نمی‌شود.' }, en: { label: 'Rekeying', title: 'Find the authoritative record', text: 'Proposal: identify the reference record and where corrections belong. Reconcile one limited handoff before automating transfer. Moving incorrect information faster is not an improvement.' } }
      ] }
    ] },
    { id: 'inspect-the-whole-route', fa: { title: 'اثر را در کل مسیر ببین' }, en: { title: 'Inspect the whole route' }, blocks: [
      { type: 'paragraph', fa: 'پیشنهاد جمع‌بندی: بعد از اصلاح، زمان انتظار، برگشت کار و کیفیت خروجی پذیرفته‌شده را با تعریف ثابت ثبت کن. از نفر بعد هم بازخورد بگیر؛ ممکن است کار از میز تو حذف و به میز او منتقل شده باشد. اگر شواهد هنوز کم است، همان محدودیت را بنویس و آزمایش را کوچک نگه دار.', en: 'Proposed review: use consistent definitions to record waiting, returned work and accepted quality after the change. Ask the next person too; work may have moved from your desk to theirs. If evidence remains thin, record that limit and keep the experiment small.' },
      { type: 'details', fa: { title: 'چه چیزی را حذف نکنیم؟', text: 'هر مرحلهٔ آزاردهنده بی‌فایده نیست. برای حذف یک کنترل، ابتدا نقش آن در کیفیت، تعهد قراردادی یا رسیدگی به خطا را روشن کن. در این تمرین، صرفاً آسان‌ترشدن کار برای یک نفر کافی نیست.' }, en: { title: 'What should stay?', text: 'An inconvenient step may still serve a purpose. Before removing a control, establish its role in quality, contractual obligations or error handling. Making one person’s work easier is insufficient evidence in this exercise.' } }
    ] }
  ],
  related: [
    { target: 'post:store-beyond-storefront', fa: { title: 'فروشگاه فقط ویترین نیست', description: 'مسیر سفارش را فراتر از ظاهر سایت ببین.' }, en: { title: 'A Store Is More Than a Storefront', description: 'Follow the order beyond the storefront.' } },
    { target: 'post:ceo-time-decisions', fa: { title: 'تقویم مدیر، جای تصمیم است', description: 'انتظار تصمیم را از شلوغی تقویم جدا کن.' }, en: { title: 'A Leader’s Calendar Is for Decisions', description: 'Separate waiting for decisions from a busy calendar.' } }
  ]
};
