export const post = {
  slug: 'enterprise-data-at-work', status: 'published', date: '2026-10-26', reviewed: '2026-10-26',
  fa: {
    title: 'داده‌های شرکت را وارد کار کن', excerpt: 'از یک تصمیم واقعی شروع کن؛ بعد ببین کدام داده، تعریف و مسئول برای انجام آن لازم است.', category: "داده و سنجش", readTime: '۴ دقیقه + بررسی',
    credit: 'نوشته‌ای مستقل با الهام از گفت‌وگوی McKinsey با آنتونیو کاسترو.',
    sourceNote: 'گفت‌وگو دیدگاه حرفه‌ای است؛ چارچوب NIST راهنمای داوطلبانه است. تمرین‌ها و مثال سفارش، پیشنهادهای مستقل این مقاله‌اند.',
    takeaways: ['برای یک تصمیم مشخص داده آماده کن.', 'تعریف و مسئول هر داده را روشن کن.', 'پاسخ درست را در جریان واقعی کار بررسی کن.']
  },
  en: {
    title: 'Put Enterprise Data to Work', excerpt: 'Start with a real decision, then identify the information, definitions and owners needed to make it.', category: "DATA & MEASUREMENT", readTime: '4 minutes + exploration',
    credit: 'An independent article prompted by McKinsey’s interview with Antonio Castro.',
    sourceNote: 'The interview offers professional opinion; NIST provides voluntary guidance. The order example and exercises are this article’s own proposals.',
    takeaways: ['Prepare data for a specific decision.', 'Give each field a definition and an owner.', 'Test correct answers inside the actual workflow.']
  },
  sources: [
    { id: 'castro', url: 'https://www.mckinsey.com/about-us/new-at-mckinsey-blog/antonio-castro-on-putting-enterprise-data-to-work-in-the-age-of-ai', publisher: 'McKinsey & Company', kind: 'analysis', fa: { title: 'کاسترو: دادهٔ سازمان و AI', note: 'متن گفت‌وگو خوانده شد؛ دیدگاه مشاور، نه آزمایش اثر مالی.' }, en: { title: 'Castro on enterprise data and AI', note: 'Interview text accessed; a consultant’s perspective, not a financial-impact experiment.' } },
    { id: 'nist-core', url: 'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/', publisher: 'NIST', kind: 'guide', fa: { title: 'هستهٔ چارچوب مدیریت ریسک AI', note: 'راهنمای نقش‌ها، نظارت انسانی و بازبینی؛ تضمین نتیجه نیست.' }, en: { title: 'AI Risk Management Framework Core', note: 'Guidance on roles, human oversight and review, not an outcome guarantee.' } }
  ],
  sections: [
    { id: 'decision-first', fa: { title: 'اول تصمیم، بعد انبار داده' }, en: { title: 'Choose the decision first' }, blocks: [
      { type: 'paragraph', fa: 'اگر قرار است داده وارد کار شود، باید بتوانی بگویی چه کسی با آن چه تصمیمی می‌گیرد. «همهٔ اسناد را به AI وصل کنیم» هنوز مسئلهٔ عملیاتی روشنی نیست. یک موقعیت انتخاب کن: آیا این سفارش را با زمان تحویل فعلی تأیید کنیم؟', en: 'If data is going to work, name the person and the decision it will support. Connecting every document to AI leaves the operational question open. Pick a concrete moment: should this order be accepted with the currently promised delivery date?' },
      { type: 'paragraph', fa: 'کاسترو پیشنهاد می‌کند از مسئلهٔ کسب‌وکار به دادهٔ لازم برسیم؛ دادهٔ مناسب گزارش‌گیری لزوماً برای تصمیم روزمره آماده نیست. او مالکیت و نظارت انسانی را هم مهم می‌داند. این نظر حرفه‌ای را نقطهٔ شروع بررسی بگیر، نه شاهد قطعی بازده سرمایه‌گذاری.', en: 'Castro recommends working backward from the business problem to the necessary data. Reporting data may need changes before it supports daily decisions. He also stresses ownership and human oversight. Treat this professional view as a starting point for investigation, rather than proof of investment returns.' }
    ] },
    { id: 'trace-an-order', fa: { title: 'ردِ پاسخ را دنبال کن' }, en: { title: 'Trace the answer' }, blocks: [
      { type: 'explorer', fa: { title: 'برای تأیید سفارش چه چیز کم است؟', hint: 'هر کارت، یک پرسش پیشنهادی برای بررسی تیم توست؛ مطالعهٔ موردی واقعی نیست.' }, en: { title: 'What is missing before accepting an order?', hint: 'Each card proposes a question for your team; this is not a reported case study.' }, items: [
        { id: 'meaning', fa: { title: 'معنا', text: 'موجودی یعنی چه؟', detail: 'بپرس موجودی شامل کالای رزروشده هم هست؟ تعریف را کنار فیلد ثبت کن. اگر فروش و انبار دو تعریف دارند، پاسخ روان مدل اختلاف را حل نمی‌کند.' }, en: { title: 'Meaning', text: 'What counts as available?', detail: 'Does stock include reserved items? Put the definition beside the field. If sales and warehouse teams use different definitions, a fluent answer cannot settle the disagreement.' } },
        { id: 'freshness', fa: { title: 'زمان', text: 'این مقدار برای کی است؟', detail: 'زمان آخرین تغییر و منبع را ببین. برای دادهٔ قدیمی، مسیر پرسیدن از مسئول را تعیین کن؛ نبودِ اطلاعات تازه را به تأیید سفارش تبدیل نکن.' }, en: { title: 'Time', text: 'When was this value valid?', detail: 'Inspect the update time and source. Define who to ask when information is stale; an absent fresh value should not silently become order approval.' } },
        { id: 'authority', fa: { title: 'اختیار', text: 'چه کسی اجازهٔ تعهد دارد؟', detail: 'پاسخ پیشنهادی را از ثبت تعهد جدا کن. مشخص کن چه کسی می‌تواند تاریخ تحویل را تأیید کند و در صورت خطا، چه کسی سفارش را اصلاح می‌کند.' }, en: { title: 'Authority', text: 'Who may make the commitment?', detail: 'Separate a suggested answer from a recorded commitment. Name the person who can approve delivery and the person who corrects the order if it goes wrong.' } }
      ] }
    ] },
    { id: 'responsibility', fa: { title: 'مسئولیت را هم مستند کن' }, en: { title: 'Document responsibility too' }, blocks: [
      { type: 'paragraph', fa: 'NIST در هستهٔ AI RMF بر روشن‌بودن نقش‌ها و تعریف نظارت انسانی تأکید دارد. برای تمرین بالا، پیشنهاد من یک برگهٔ کوتاه است: صاحب تعریف، مسئول به‌روزرسانی، تأییدکننده و راه برگشت. اسم یک کمیته به‌تنهایی جای این پاسخ‌ها را نمی‌گیرد.', en: 'The NIST AI RMF Core calls for clear responsibilities and defined human oversight. For the exercise above, I suggest a short record: definition owner, update owner, approver and recovery route. Naming a committee alone does not answer those questions.' },
      { type: 'details', fa: { title: 'اگر جواب درست است اما کار جلو نمی‌رود؟', text: 'در این مثال پیشنهادی، شاید پاسخ در صفحه‌ای جدا باشد و کارشناس هنوز سفارش را دوباره وارد کند. مشاهده کن پاسخ دقیقاً کجا استفاده می‌شود. کوچک‌ترین تغییر مفید ممکن است انتقال درست همان پاسخ به محل تصمیم باشد.' }, en: { title: 'What if the answer is correct but work stalls?', text: 'In this proposed example, the answer may sit on a separate screen while an employee re-enters the order. Observe where the answer is used. Moving that answer into the decision point may be the smallest useful change.' } }
    ] },
    { id: 'test-one-decision', fa: { title: 'با یک تصمیم امتحان کن' }, en: { title: 'Try one decision' }, blocks: [
      { type: 'paragraph', fa: 'یک سفارش بسته‌شده را با کارشناس مرور کن. داده‌ای را که آن زمان در دسترس بوده بازسازی کن؛ از دانسته‌های امروز برای قضاوت دیروز استفاده نکن. پاسخ پیشنهادی، دلیل پذیرش یا رد و اصلاح لازم را بنویس. سپس تصمیم بگیر اصلاح داده مهم‌تر است، تغییر فرایند یا کنارگذاشتن همین کاربرد.', en: 'Review a completed order with an employee. Reconstruct what was available at that moment; avoid judging yesterday with today’s information. Record the suggested answer, the reason to accept or reject it, and the correction required. Then choose whether to improve data, change the process or abandon this use case.' }
    ] }
  ],
  related: [{ target: 'post:forward-deployed-engineer', fa: { title: 'مهندسی که کنار مسئله کار می‌کند', description: 'از آماده‌بودن داده تا ساختن ابزار در محل کار.' }, en: { title: 'The Engineer Next to the Problem', description: 'From usable data to a tool built inside the workflow.' } }, { target: 'post:data-to-decisions', fa: { title: 'داده وقتی ارزش دارد که تصمیم عوض شود', description: 'رابطهٔ سنجش و اقدام را دنبال کن.' }, en: { title: 'Data Matters When Decisions Change', description: 'Follow the connection between measurement and action.' } }]
};
