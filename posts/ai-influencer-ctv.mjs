export const post = {
  slug: 'ai-influencer-ctv', status: 'published', date: '2026-10-26', reviewed: '2026-10-26',
  fa: {
    title: 'AI در تبلیغات؛ کجا شروع کنیم؟',
    excerpt: 'ورود AI به تبلیغات یک تصمیم واحد نیست. تحلیل، تولید محتوا و انتشار را جدا کن تا اولین آزمایش، مسئول و معیار روشنی داشته باشد.',
    category: "مشتری و بازاریابی", readTime: '۴ دقیقه + انتخاب مسیر',
    credit: 'تحلیل مستقل با نقطهٔ شروع از گزارش Digiday و راهنمای رسمی FTC؛ مسیرهای آزمایش پیشنهاد این مقاله‌اند.',
    sourceNote: 'متن گزارش Digiday در زمان بررسی قابل خواندن بود. آمار پیمایش آن در این مقاله بازنشر نشده؛ راهنمای FTC مربوط به زمینهٔ حقوقی آمریکاست.',
    takeaways: ['برای یک وظیفه تصمیم بگیر، نه برای کل کانال.', 'پیش‌نویس AI به مجوز انتشار تبدیل نمی‌شود.', 'کیفیت، زمان بازبینی و نتیجه را کنار هم ثبت کن.']
  },
  en: {
    title: 'Where Should AI Enter Advertising?',
    excerpt: 'AI adoption is several decisions. Separate analysis, creative production and publication so the first experiment has a clear owner and a useful test.',
    category: "CUSTOMER & MARKETING", readTime: '4 minutes + exploration',
    credit: 'Independent analysis prompted by Digiday and official FTC guidance. The experiment paths are this article’s proposals.',
    sourceNote: 'The Digiday report was readable when reviewed. Its survey figures are not reproduced here. FTC guidance addresses the US legal context.',
    takeaways: ['Choose one task before choosing a channel.', 'An AI draft is not permission to publish.', 'Record quality, review effort and outcomes together.']
  },
  sources: [
    { id: 'digiday-ai', url: 'https://digiday.com/marketing/d-research-marketers-hesitate-to-adopt-ai-for-influencer-and-ctv-marketing/', publisher: 'Digiday', date: '2026-07-09', kind: 'research', fa: { title: 'تردید در استفاده از AI برای اینفلوئنسر و CTV', note: 'گزارش پژوهش اختصاصی ناشر؛ موضوع آغاز بحث، نه شاهد سودآوری یک ابزار.' }, en: { title: 'AI adoption in influencer and CTV marketing', note: 'Publisher’s proprietary research report; a starting question, not evidence of a tool’s return.' } },
    { id: 'ftc-disclosure', url: 'https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers', publisher: 'Federal Trade Commission', kind: 'guide', fa: { title: 'راهنمای افشای رابطهٔ تبلیغاتی', note: 'راهنمای رسمی آمریکا دربارهٔ رابطه با برند و بیان روشن آن.' }, en: { title: 'Disclosures 101 for Social Media Influencers', note: 'Official US guidance on brand relationships and clear disclosure.' } }
  ],
  sections: [
    { id: 'choose-the-task', fa: { title: 'از یک کار مشخص شروع کن' }, en: { title: 'Start with one task' }, blocks: [
      { type: 'paragraph', fa: 'پیشنهاد عملی: پیش از خرید ابزار، نام کاری را بنویس که قرار است تغییر کند. «AI برای تبلیغات» مبهم است؛ «دسته‌بندی پرسش‌های مخاطبان برای آماده‌کردن بریف» قابل بررسی است. خروجی باید به یک تصمیم واقعی وصل باشد: چه پیامی را آزمایش می‌کنیم، کدام ادعا نیاز به شاهد دارد و چه کسی اجازهٔ انتشار می‌دهد؟', en: 'Practical proposal: name the task before buying a tool. “AI for advertising” is vague; “group audience questions to prepare a creative brief” can be examined. Connect the output to a real decision: which message to test, which claim needs evidence and who can approve publication.' },
      { type: 'paragraph', fa: 'گزارش Digiday استفاده از AI در کار با اینفلوئنسرها و تلویزیون متصل به اینترنت، یا CTV، را بررسی می‌کند. موضوع گزارش را نباید به نسخه‌ای برای تیم خودمان تبدیل کنیم. میزان پذیرش یک فناوری، نتیجهٔ آزمایش ما را پیش‌بینی نمی‌کند.', en: 'Digiday examines AI use in influencer work and connected television, or CTV. That topic is not a prescription for our team. Adoption of a technology does not predict the result of our own experiment.' }
    ] },
    { id: 'select-a-boundary', fa: { title: 'مرز آزمایش را انتخاب کن' }, en: { title: 'Choose an experiment boundary' }, blocks: [
      { type: 'explorer', fa: { title: 'خروجی تو کجا استفاده می‌شود؟', hint: 'این مسیرهای پیشنهادی را انتخاب کن؛ مسئولیت و شاهد لازم تغییر می‌کند.' }, en: { title: 'Where will the output be used?', hint: 'Select a proposed path to reveal the owner and evidence needed.' }, items: [
        { id: 'brief', fa: { title: 'تحلیل برای بریف', text: 'پیش از ساخت پیام', detail: 'پیشنهاد آزمایش: از دادهٔ مجاز و بی‌نام، دسته‌های پرسش بساز. تحلیلگر هر دسته را با نمونه‌های اصلی تطبیق دهد. خروجی قابل قبول، فهرستی قابل ردیابی از پرسش‌هاست؛ برداشت AI را صدای قطعی مشتری معرفی نکن.' }, en: { title: 'Brief analysis', text: 'Before writing the message', detail: 'Proposed test: group questions from permitted, de-identified material. An analyst checks each group against the original examples. Accept a traceable question list; do not present an AI interpretation as the definitive customer voice.' } },
        { id: 'creator', fa: { title: 'پیش‌نویس برای خالق محتوا', text: 'پیش از تأیید خالق', detail: 'پیشنهاد آزمایش: چند زاویهٔ پیام از یک بریف تأییدشده بساز. خالق محتوا لحن و تجربهٔ واقعی خود را بررسی کند و مسئول برند ادعاها و حقوق استفاده را ببیند. شمار نسخه‌های ساخته‌شده معیار موفقیت نیست.' }, en: { title: 'Creator drafts', text: 'Before creator approval', detail: 'Proposed test: produce message angles from an approved brief. The creator checks voice and actual experience; the brand owner checks claims and usage rights. The number of generated versions is not the success measure.' } },
        { id: 'ctv', fa: { title: 'نسخهٔ تبلیغ تلویزیونی', text: 'پیش از تحویل رسانه', detail: 'پیشنهاد آزمایش: یک نسخهٔ داخلی بساز و آن را روی نمایشگر مقصد ببین. مسئول خلاقه، متن، تصویر، صدا و سازگاری پیام را بررسی کند. تغییر خودکار بودجه یا انتشار را وارد همین آزمایش نکن؛ هر کدام تصمیم و معیار جدا می‌خواهند.' }, en: { title: 'CTV creative', text: 'Before media delivery', detail: 'Proposed test: make an internal version and inspect it on the destination display. The creative owner reviews text, image, sound and message consistency. Automated spending or publication needs its own decision and criteria.' } }
      ] }
    ] },
    { id: 'keep-trust-visible', fa: { title: 'اعتماد را در تحویل کار نگه دار' }, en: { title: 'Keep trust in the handoff' }, blocks: [
      { type: 'paragraph', fa: 'در زمینهٔ آمریکا، FTC می‌گوید رابطهٔ مؤثر با برند باید برای مخاطب روشن باشد؛ تأیید محصول هم نباید تجربه‌ای را بسازد که وجود نداشته است. [راهنمای رسمی](https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers). پیشنهاد اجرایی این مقاله: کنار هر خروجی، منبع ادعا، تأییدکننده و نسخهٔ نهایی را نگه دار تا تغییر لحن، معنای ادعا را عوض نکند.', en: 'In the US context, FTC guidance calls for clear disclosure of material brand relationships and says endorsements cannot invent product experience. [Read the official guide](https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers). This article proposes retaining the claim’s evidence, approver and final version together, so an edit to the tone does not quietly change the claim.' }
    ] },
    { id: 'review-the-experiment', fa: { title: 'پس از آزمایش چه می‌ماند؟' }, en: { title: 'What survives the experiment?' }, blocks: [
      { type: 'paragraph', fa: 'تمرین پیشنهادی: یک کار مشابه را با روش قبلی و روش تازه مرور کن. زمان ساخت و بازبینی، دلیل ردشدن نسخه‌ها و خروجی پذیرفته‌شده را ثبت کن. اگر بازبینی سنگین‌تر شد، مرز کار را کوچک‌تر کن. فقط بعد از دیدن شاهد تصمیم بگیر این روش تکرار شود، اصلاح شود یا کنار برود.', en: 'Suggested exercise: review comparable work using the previous and proposed approaches. Record production and review effort, rejection reasons and accepted output. If review becomes heavier, narrow the task. Use the evidence to decide whether the method should continue, change or stop.' },
      { type: 'details', fa: { title: 'پرسش جلسهٔ جمع‌بندی', text: 'کدام تصمیم بهتر شد و شاهدش چیست؟ اگر پاسخ فقط «محتوای بیشتری ساختیم» است، هنوز دربارهٔ کیفیت یا نتیجهٔ کمپین چیزی ثابت نشده است.' }, en: { title: 'A question for the review meeting', text: 'Which decision improved, and what shows it? “We made more content” alone establishes neither quality nor campaign impact.' } }
    ] }
  ],
  related: [
    { target: 'post:measuring-ai-search', fa: { title: 'جست‌وجوی AI را چطور بسنجیم؟', description: 'دیده‌شدن را به نتیجهٔ قابل بررسی وصل کن.' }, en: { title: 'How Do We Measure AI Search?', description: 'Connect visibility with an outcome you can examine.' } },
    { target: 'post:ai-payoff-workload', fa: { title: 'هوش مصنوعی؛ کار بیشتر، بازده کجاست؟', description: 'تولید بیشتر و بازده را از هم جدا کن.' }, en: { title: 'AI: More Work. Where’s the Return?', description: 'Separate increased production from return.' } }
  ]
};
