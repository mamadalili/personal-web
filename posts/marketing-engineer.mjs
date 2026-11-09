const p = (fa, en) => ({ type: 'paragraph', fa, en });
const section = (id, fa, en, blocks) => ({ id, fa: { title: fa }, en: { title: en }, blocks });
const choice = (fa, en, feedbackFa, feedbackEn) => ({
  fa: { label: fa, feedback: feedbackFa }, en: { label: en, feedback: feedbackEn }
});

export const post = {
  slug: 'marketing-engineer', date: '2026-11-09', reviewed: '2026-11-09', status: 'published',
  bannerPair: { id: 'forest-citron-register', position: 1 },
  cover: {
    fa: { src: 'assets/blog/marketing-engineer-fa-v2.webp', width: 1600, height: 900, alt: 'چطور مهندس بازاریابی شویم؟ زنی دو لایهٔ شفاف یک طرح فنجان را روی میز چاپ با هم میزان می‌کند.' },
    en: { src: 'assets/blog/marketing-engineer-en-v2.webp', width: 1600, height: 900, alt: 'How to Become a Marketing Engineer. A woman aligns transparent prints of a ceramic cup at a registration table.' }
  },
  fa: {
    title: 'چطور مهندس بازاریابی شویم؟', subtitle: 'اولین گردش کار را با یک کمپین واقعی بساز',
    category: 'بازاریابی و فروش آنلاین', readTime: '۶ تا ۹ دقیقه با تمرین',
    excerpt: 'کارگاه گفته نمونهٔ فنجان رو دو روزه می‌فرسته. توی تبلیغ نوشته «سرویس کافه‌ات رو دو روزه تحویل بگیر». فقط یک کلمه عوض شده و حالا فروش باید قولی رو جواب بده که تولید هیچ‌وقت نداده. کار مهندس بازاریابی همین‌جا شروع می‌شه.',
    credit: 'با الهام از راهنمای شان هولمبرگ دربارهٔ مهندسی بازاریابی.',
    sourceNote: 'مسیر پیوند دادن شناخت مشتری، دادهٔ کمپین و کار ایجنت‌ها از نوشتهٔ شان هولمبرگ میاد. کارگاه سفال، گفت‌وگوها و پنج درخواست زیر مثال آموزشی‌اند.',
    takeaways: ['یک کار تکراری انتخاب کن که کیفیتش رو می‌شناسی.', 'برای هر ادعا یک مرجع قابل‌بررسی بذار.', 'دادهٔ ناقص رو توی گزارش هم ناقص نگه دار.']
  },
  en: {
    title: 'How to Become a Marketing Engineer', subtitle: 'Build your first workflow around a real campaign',
    category: 'Marketing & online sales', readTime: '5–8 min with the exercise',
    excerpt: 'The pottery studio can send a sample cup in two days. The ad says it can deliver a café’s entire order in two days. One missing word has committed the sales team to a promise the kiln can’t keep. That’s a marketing engineering problem.',
    credit: 'Inspired by Shann Holmberg’s guide to marketing engineering.',
    sourceNote: 'Holmberg is the source for the approach to connecting business knowledge, campaign records and agents. The studio, dialogue and five enquiries are teaching examples.',
    takeaways: ['Pick a recurring task you already know how to judge.', 'Give consequential claims a source you can check.', 'Keep gaps visible when you report the results.']
  },
  sections: [
    section('brief', 'از کاری شروع کن که همین هفته باید تحویل بدی', 'Start with something due this week', [
      p('فرض کن بازاریابی یه کارگاه سفال دست توئه. هر بار که قراره برای کافه‌ها تبلیغ بسازین، یکی از فروش می‌پرسه مشتری‌ها چی می‌خوان، یکی از کارگاه می‌پرسه چی حاضره و یه نفر همهٔ جواب‌ها رو برای طراح می‌فرسته. دفعهٔ بعد دوباره از اول. اگه این کار رو بلدی، برای شروع مهندسی بازاریابی یه پروژهٔ مناسب داری. خروجی‌ات می‌تونه فقط **یک سفارش کارِ قابل‌تحویل به طراح** باشه.', 'Say you handle marketing for a pottery studio. Each time it runs a café campaign, someone asks sales what buyers want, checks with the potter about what’s ready, and pulls the answers together for the designer. Next month they start over. If you already do this, you have a good first engineering project: deliver one brief a designer can actually use.'),
      p('ایجنت اینجا یه دستیار نرم‌افزاریه که می‌تونه با ابزارهایی که در اختیارش گذاشتی چند قدم از کار رو انجام بده. مهندسیِ این کار یعنی تعیین کنی به چی دسترسی داره، جواب کدوم سؤال رو از کجا دربیاره، چی تحویل بده و کدوم تصمیم رو برگردونه پیش تو. برای بار اول، همین که از چند سند یک پیش‌نویس درست دربیاد، خودش کار قابل‌آزمایشیه.', 'Here an agent is software that can take several steps using the tools you give it. Your job is to decide what it can read, where each answer should come from, what it must deliver and which decisions come back to you. Turning several documents into one usable draft is already a task you can test.')
    ]),
    section('knowledge', 'نمونه دو روزه می‌رسه یا کل سفارش؟', 'What exactly ships in two days?', [
      { type: 'image', src: 'assets/blog/marketing-engineer-sample.webp', width: 1440, height: 810,
        fa: { alt: 'یک فنجان لعاب‌خورده در جعبهٔ نمونه، کنار قفسه‌های فنجان‌های نیمه‌ساختهٔ کارگاه.', caption: 'روی میز یک نمونهٔ آماده داریم. فنجان‌های روی قفسه هنوز باید لعاب بخورن. توی متن تبلیغ هم باید بشه این دوتا رو از هم تشخیص داد.' },
        en: { alt: 'One glazed sample cup in an open box beside shelves of unfinished ceramic cups.', caption: 'The sample on the table can leave now. The cups on the shelves still need glazing. The distinction should survive the trip into the ad.' } },
      p('آخرین پیام‌های مشتری می‌گن مدیر کافه دوست داره قبل از خرید، رنگ لعاب رو زیر نور مغازهٔ خودش ببینه. برگهٔ تأییدشدهٔ کارگاه می‌گه «نمونهٔ رنگ موجود تا دو روز کاری ارسال می‌شه». تبلیغ رقیب هم تحویل سریع رو برجسته کرده. هر سه به درد تحقیق می‌خورن، ولی فقط برگهٔ کارگاه می‌تونه پشتوانهٔ قولی باشه که از طرف ما منتشر می‌شه.', 'Buyers have told sales they want to see how the glaze looks under their own lights. The studio’s approved offer says it dispatches an in-stock colour sample within two working days. A rival ad also talks about fast delivery. All three belong in the research. Only the studio’s offer establishes what this business can promise.'),
      p('برای شروع، متن پیشنهاد و تاریخ تأییدش رو یک جا بذار. سؤال‌های پرتکرار مشتری‌ها رو بدون اسم و شماره کنار هم بنویس. تحقیق همین کمپین و نسخه‌های پیش‌نویسش هم جای خودشون رو داشته باشن. توی یک راهنمای کوتاه بنویس **اگر زمان تحویل سفارش کامل جایی ثبت نشده، از مسئول تولید بپرس**. حالا دفعهٔ بعد هم جواب درست پیدا می‌شه، حتی اگه توی گفت‌وگوی قبلی ایجنت نبوده باشی.', 'Keep the offer and its approval date together. Write down recurring buyer questions without names or phone numbers. Give this campaign’s research and drafts their own place. Add one instruction: **if the lead time for a full order is missing, ask production**. A new run can now find its way without relying on the last chat.'),
      { type: 'quote', fa: '«نمونه رو تا دو روز کاری می‌فرستیم. برای خودِ سفارش، اول باید تعداد فنجان و رنگ لعاب معلوم بشه.»', en: '“We can dispatch the sample within two working days. For the full order, we need the quantity and glaze first.”' }
    ]),
    section('connections', 'وصل کردن ابزار یعنی اجازهٔ انجام کدوم کار؟', 'What should the connection actually do?', [
      p('برای نوشتن سفارش کار، دستیار باید پیشنهاد تأییدشده رو بخونه و پیش‌نویس رو ذخیره کنه. لازم نیست همون لحظه بتونه تبلیغ رو منتشر کنه یا بودجه رو عوض کنه. اگه آمار تبلیغ توی یه ابزار دیگه‌ست، اتصال می‌تونه فقط برای خوندن باشه. API همون راهیه که یک نرم‌افزار از نرم‌افزار دیگه داده می‌گیره یا کاری ازش می‌خواد. اسم ابزار توی دستور، به‌تنهایی چنین دسترسی‌ای ایجاد نمی‌کنه.', 'For this brief, the assistant needs to read the approved offer and save a draft. Publishing ads and changing budgets are separate jobs. Give the reporting connection read access if that’s all it needs. An API is a way for one program to request information or an action from another. Naming a tool in a brief doesn’t connect it.'),
      p('قبل از اینکه کل پروژه رو وصل کنی، یک ردیف از گزارش دیروز رو بگیر. شناسهٔ کمپین، تاریخ و عددش رو با خود گزارش مقایسه کن. برای دفعات بعد معلوم کن داده کِی به‌روز می‌شه. اگه اتصال امروز قطع شده، گزارش باید تاریخ آخرین دریافت رو نشون بده. کلید دسترسی هم توی محل نگهداری رمزها بمونه تا همراه فایل سفارش کار به طراح نرسه.', 'Fetch one row from yesterday’s report. Check its campaign ID, date and value against the original. Decide how later runs will refresh it. If today’s refresh fails, the report should show the date of the last successful one. Store credentials separately so sharing the brief with a designer doesn’t share the key.')
    ]),
    section('join', 'این درخواست از کدوم تبلیغ اومده؟', 'Which ad brought this enquiry?', [
      p('کارگاه دو پیام رو امتحان کرده. یکی دربارهٔ دیدن **لعاب زیر نور کافه**، یکی دربارهٔ **زمان ارسال نمونه**. پنج درخواست رسیده. فرم می‌تونه شناسهٔ تبلیغ رو نگه داره، فروش هم بعد از تماس یادداشت می‌کنه درخواست واقعاً از طرف کافه بوده یا نه. با روشن کردن هر منبع ببین کدوم قسمت داستان معلوم می‌شه. همهٔ عددهای این میز فرضی‌ان.', 'The studio tested two messages: seeing the glaze under café lighting and getting a sample dispatched quickly. Five enquiries came in. The form can carry the ad ID. Sales records whether the enquiry actually came from a café. Switch each source on and see which question becomes answerable. All five records are fictional.'),
      { type: 'campaign-trace',
        campaigns: [{id:'glaze', fa:'دیدن لعاب', en:'See the glaze'}, {id:'sample', fa:'زمان ارسال نمونه', en:'Sample dispatch'}],
        enquiries: [
          { id:'A', campaign:'glaze', outcome:'fit' }, { id:'B', campaign:'sample', outcome:'other' },
          { id:'C', campaign:'glaze', outcome:'fit' }, { id:'D', campaign:null, outcome:'fit' },
          { id:'E', campaign:'sample', outcome:null }
        ] },
      p('وقتی هر دو منبع رو وصل کردی، به درخواست D نگاه کن. فروش تأیید کرده یک کافه‌ست، اما شناسهٔ تبلیغ همراه فرم نیومده. پس توی جمع درخواست‌های مناسب حساب می‌شه و سهم هیچ‌کدوم از دو تبلیغ هم نیست. حالا E رو ببین. می‌دونیم از پیام ارسال نمونه اومده، ولی فروش هنوز تماس رو ثبت نکرده. این دو تا جای خالی، دو کار متفاوت می‌خوان. یکی بررسی مسیر فرم، اون یکی پیگیری تماس.', 'With both sources on, look at D. Sales confirmed it was a café, but the form arrived without an ad ID. Count it in the total of suitable enquiries and leave it unattributed. E has the opposite gap: the ad is known, the sales outcome is pending. D calls for a look at tracking. E calls for a follow-up.'),
      { type: 'quiz', fa: 'فروش می‌گه D از طرف یک کافه بوده. توی گزارش کجا بذاریمش؟', en: 'Sales confirmed D came from a café. Where does it belong in the report?',
        options: [
          choice('کنار تبلیغ لعاب، چون اون بهتر جواب داده', 'Under glaze, since it seems to be doing better', 'عملکرد بقیهٔ درخواست‌ها منشأ این یکی رو ثابت نمی‌کنه.', 'The other enquiries can’t tell us where this one came from.'),
          choice('درخواست مناسب با منشأ نامعلوم', 'Qualified enquiry, source unknown', 'دقیقاً. نتیجهٔ تماس و منشأ تبلیغ دو دادهٔ جدا هستن. اولی رو داریم.', 'Exactly. Qualification and attribution are separate facts. Only the first is known.'),
          choice('تا معلوم شدن منشأ از کل گزارش حذفش کنیم', 'Leave it out of every total until the source is known', 'این کار تعداد درخواست‌های مناسب رو هم کم نشون می‌ده. فقط در مقایسهٔ دو تبلیغ نمی‌شه بهش سهم داد.', 'That would undercount qualified enquiries. It only needs to stay out of the two attributed totals.')
        ] }
    ]),
    section('handoff', 'یک سفارش کار بساز که نفر بعدی بفهمه', 'Write a brief someone else can use', [
      p('حالا به دستیار بگو برای مدیر کافه‌ای که رنگ فنجان براش مهمه، متن تبلیغ درخواست نمونه رو آماده کنه. توی خروجی سه چیز کنار هم بخواه. جمله‌ای که مشتری می‌بینه، مدرکی که پشتشه و سؤالی که هنوز جواب نداره. اگه متن می‌گه «ارسال دو روزه» ولی معلوم نیست چی ارسال می‌شه، برگردونش. بازخوردت رو دقیق ثبت کن تا دفعهٔ بعد «نمونهٔ رنگ موجود» از جمله حذف نشه.', 'Ask for a sample-request ad aimed at a café manager choosing a glaze. Have the assistant return the customer-facing line, its supporting source and any unresolved question together. If the draft says “two-day dispatch” without saying what ships, send it back. Save the specific correction so the words “in-stock sample” survive the next draft.'),
      p('وقتی پیشنهاد رو تأیید کردی، همون نسخه مرجع طراح، نویسندهٔ صفحه و کسی می‌شه که ایمیل پیگیری رو می‌نویسه. بررسی تبلیغ رقیب و مرور تماس‌های قبلی می‌تونن هم‌زمان پیش برن. متن نهایی ایمیل باید منتظر بمونه تا معلوم بشه توی فرم دقیقاً چه قولی دادین. کل مسیر رو یک بار مثل مشتری طی کن. ممکنه هر سه متن به‌تنهایی خوب باشن، ولی کنار هم سه زمان تحویل مختلف بگن.', 'Once you approve the offer, give that same version to the designer, the landing-page writer and whoever drafts the follow-up email. Competitor research and a review of past calls can run in parallel. The final email depends on what the form promised. Read the ad, page and email as one customer would. Three polished pieces can still give three different delivery times.')
    ]),
    section('next-run', 'از کجا بفهمی این روش دفعهٔ بعد هم کار می‌کنه؟', 'Find out whether the workflow survives a second run', [
      p('کمپین بعدی رو با یک تغییر واقعی اجرا کن. مثلاً این بار لعاب سبز موجود نیست. فقط موجودیِ تأییدشده رو به‌روز کن و ببین دستیار هنوز همون نمونه رو پیشنهاد می‌ده یا نه. اگه داد، قبل از اضافه کردن ایجنت تازه بررسی کن کدوم فایل قدیمی رو خونده. توی دفتر کمپین بنویس چه چیزی خراب شد، کجاش رو درست کردی و در اجرای بعد چه دیدی. این دفتر برای همکارت از یک عکس قشنگِ خروجی مفیدتره.', 'Run the next brief with one real change. Suppose green glaze is out of stock. Update the approved inventory and see whether the old sample still appears in the copy. If it does, find out which file the assistant read. Keep the faulty draft, your correction and the next result together. A teammate can learn more from that record than from a screenshot of the finished ad.'),
      p('اگر گزارش هفتگی چند بار با دادهٔ تازه و نتیجهٔ قابل‌بررسی درآمد، اون‌وقت زمان‌بندی معنا پیدا می‌کنه. تعریف کن با دریافت ناموفق چی بشه، چند بار تکرار مجازه و کِی کار به تو برگرده. برای شروع این هفته همون کار کوچیک رو تحویل بده. یک سفارش کار، پیش‌نویس قبل و بعد از اصلاح، و یادداشت چیزی که هنوز قضاوت آدم می‌خواد. این‌ها اولین نمونه‌کار مهندسی بازاریابی تو هستن.', 'Schedule a weekly report once you’ve run it several times with fresh data and checked the result. Decide how it signals a failed import, when retries stop and which decision comes back to you. For this week, deliver a brief, a draft before and after review, and a note about what still needed your judgement. That’s a first piece of marketing engineering you can show someone.')
    ])
  ],
  sources: [{ id:'shann', kind:'inspiration', publisher:'Shann Holmberg / X', date:'2026-09-10', url:'https://x.com/shannholmberg/status/2098004743536750869',
    fa:{ title:'چطور مهندس بازاریابی شویم؟', note:'رویکرد نویسنده برای ساخت یک گردش کار، اتصال ابزار و داده، تأیید انسانی و ثبت یادگیری کمپین. اعداد تمرین ساختهٔ همین مقاله‌اند.' },
    en:{ title:'How to Become a Marketing Engineer', note:'The source for starting with one workflow, connecting tools and records, reviewing drafts and carrying learning forward. The exercise uses original illustrative records.' } }],
  related: [
    {target:'post:company-brain',fa:{title:'مغز شرکت',description:'دانسته‌های مشترک تیم رو کجا نگه داریم؟'},en:{title:'A Company Brain',description:'Where should shared decisions and supporting records live?'}},
    {target:'post:ai-marketing-workflow',fa:{title:'تیم بازاریابی AI',description:'برای تقسیم کار بین آدم و دستیار از اینجا ادامه بده.'},en:{title:'The AI Marketing Team',description:'Explore how to divide work between people and assistants.'}}
  ]
};
