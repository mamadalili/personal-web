export const post = {
  slug: 'ceo-time-decisions', status: 'published', date: '2026-10-26', reviewed: '2026-10-26',
  fa: {
    title: 'تقویم مدیر، جای تصمیم است',
    excerpt: 'تقویم پر، معیار روشنی برای رهبری نیست. ببین کدام تصمیم به حضور تو نیاز دارد و هر جلسه چه چیزی را باید تغییر دهد.',
    category: "استراتژی و تصمیم", readTime: '۴ دقیقه + مرور تقویم',
    credit: 'تحلیل مستقل با نقطهٔ شروع از Fast Company و مرجع نقش‌های تصمیم از Atlassian؛ مرور تقویم پیشنهاد این مقاله است.',
    sourceNote: 'متن عمومی Fast Company خوانده شد. گفته‌های مدیران دربارهٔ زمانشان، اندازه‌گیری مستقل یا نمونهٔ نمایندهٔ همهٔ مدیران نیست.',
    takeaways: ['جلسه را به تصمیم مورد نیاز وصل کن.', 'حضور مدیر جای تعیین صاحب اختیار را نمی‌گیرد.', 'برای فکرکردن، پرسش و خروجی تعریف کن.']
  },
  en: {
    title: 'A Leader’s Calendar Is for Decisions',
    excerpt: 'A full calendar is a poor definition of leadership. Identify which decisions need you and what each meeting is meant to change.',
    category: "STRATEGY & DECISIONS", readTime: '4 minutes + calendar review',
    credit: 'Independent analysis prompted by Fast Company, with decision-role guidance from Atlassian. The calendar exercise is this article’s proposal.',
    sourceNote: 'Fast Company’s public article was read. Executives’ accounts of their time are neither independent measurement nor a representative sample of all leaders.',
    takeaways: ['Connect a meeting to the decision needed.', 'A leader’s attendance does not establish decision ownership.', 'Give reflection a question and an output.']
  },
  sources: [
    { id: 'fc-ceo', url: 'https://www.fastcompany.com/91628235/9-ceos-tell-us-how-they-manage-time', publisher: 'Fast Company', date: '2026-10-26', kind: 'analysis', fa: { title: 'مدیران چگونه زمان خود را توصیف می‌کنند؟', note: 'گزارش Stephanie Mehta؛ روایت مدیران و مسئلهٔ تفاوت روایت با مشاهده.' }, en: { title: '9 CEOs tell us how they manage time', note: 'Stephanie Mehta’s report; executive accounts and the distinction between accounts and observation.' } },
    { id: 'daci', url: 'https://www.atlassian.com/team-playbook/plays/daci', publisher: 'Atlassian', kind: 'guide', fa: { title: 'چارچوب نقش‌ها در تصمیم: DACI', note: 'روش پیشنهادی ناشر؛ پشتیبان تفکیک هماهنگ‌کننده، تصمیم‌گیرنده و مشورت‌دهنده.' }, en: { title: 'DACI decision-making framework', note: 'Publisher’s method for distinguishing coordination, final authority and contribution.' } }
  ],
  sections: [
    { id: 'start-from-a-decision', fa: { title: 'از تصمیم هفته شروع کن' }, en: { title: 'Start with the week’s decision' }, blocks: [
      { type: 'paragraph', fa: 'پیشنهاد این مقاله: پیش از مرتب‌کردن ساعت‌های تقویم، تصمیمی را بنویس که این هفته باید روشن شود. مثلاً انتخاب بین دو مسیر محصول یا حل تعارض بر سر یک تعهد مشتری؛ این‌ها مثال فرضی‌اند. سپس بپرس اگر تو در جلسه نباشی، چه اختیار یا اطلاعاتی واقعاً کم می‌آید؟ پاسخ، از عنوان جلسه راهنمای بهتری برای حضور است.', en: 'This article proposes writing down a decision that needs resolution this week before rearranging calendar slots. Choosing between product directions or resolving conflicting customer commitments are hypothetical examples. Ask which authority or information would actually be missing without you. That answer is a better guide to attendance than the meeting title.' },
      { type: 'paragraph', fa: 'گزارش Fast Company تفاوت میان روایت مدیران از زمانشان و مشاهدهٔ زمان را مطرح می‌کند. این یادآور ساده‌ای است: احساس مشغول‌بودن، به‌تنهایی شاهد اولویت‌بندی نیست.', en: 'Fast Company raises the gap between executives’ accounts of their time and observation. The useful reminder is simple: feeling busy is not evidence of prioritization.' }
    ] },
    { id: 'inspect-the-invitation', fa: { title: 'دعوت جلسه چه می‌خواهد؟' }, en: { title: 'What does the invitation need?' }, blocks: [
      { type: 'explorer', fa: { title: 'یک دعوت واقعی را انتخاب کن', hint: 'این دسته‌بندی پیشنهادی نشان می‌دهد پیش از قبول جلسه چه چیزی روشن شود.' }, en: { title: 'Inspect a real invitation', hint: 'This proposed classification reveals what to clarify before accepting.' }, items: [
        { id: 'decide', fa: { title: 'تصمیم', text: 'یک انتخاب منتظر مانده', detail: 'پیشنهاد: پرسش تصمیم، گزینه‌ها، محدودیت و صاحب اختیار را پیش از جلسه بخواه. اگر هیچ گزینه‌ای آماده نیست، جلسه شاید برای آماده‌سازی مسئله باشد؛ نام و انتظارش را متناسب کن.' }, en: { title: 'Decision', text: 'A choice is waiting', detail: 'Proposal: request the decision question, options, constraint and decision owner in advance. If no options are ready, this may be preparation rather than a decision meeting; adjust its purpose and expectations.' } },
        { id: 'learn', fa: { title: 'یادگیری', text: 'چیزی را هنوز نمی‌دانیم', detail: 'پیشنهاد: مجهول را نام ببر و کسی را دعوت کن که شاهد مستقیم دارد. خروجی، فهم تازه یا پرسش دقیق‌تر است. برای ساختن ظاهر تصمیم‌گیری، زودتر از شواهد تعهد نساز.' }, en: { title: 'Learning', text: 'Something remains unknown', detail: 'Proposal: name the uncertainty and involve someone with direct evidence. The output is new understanding or a sharper question. Avoid making a premature commitment simply to make the meeting look decisive.' } },
        { id: 'update', fa: { title: 'اطلاع‌رسانی', text: 'خبر باید به افراد برسد', detail: 'پیشنهاد: مشخص کن چه کسی پس از دریافت خبر باید کاری انجام دهد. اگر گفت‌وگو لازم نیست، یک یادداشت کوتاه با مسیر پرسش را امتحان کن. اگر ابهام یا نگرانی مهمی هست، فرصت گفت‌وگو را حفظ کن.' }, en: { title: 'Update', text: 'People need the news', detail: 'Proposal: identify who must act after receiving the information. If discussion is unnecessary, try a short note with a route for questions. Preserve conversation when significant uncertainty or concern needs attention.' } }
      ] }
    ] },
    { id: 'make-authority-explicit', fa: { title: 'اختیار را از حضور جدا کن' }, en: { title: 'Separate attendance from authority' }, blocks: [
      { type: 'paragraph', fa: 'در چارچوب DACI شرکت Atlassian، هماهنگی تصمیم، اختیار نهایی، مشورت تخصصی و مطلع‌شدن نقش‌های جدا هستند. [مرجع چارچوب](https://www.atlassian.com/team-playbook/plays/daci). پیشنهاد این مقاله: در یک تصمیم جاری، نام صاحب اختیار و کسی که موضوع را تا نتیجه پیگیری می‌کند ثبت کن. اگر همه منتظر مدیرند، بررسی کن آیا مرز اختیار واقعاً روشن شده است.', en: 'Atlassian’s DACI framework separates driving the decision, final approval, expert contribution and being informed. [Framework reference](https://www.atlassian.com/team-playbook/plays/daci). This article proposes naming the final authority and the person who moves one current decision to resolution. If everyone waits for the leader, check whether authority has actually been defined.' },
      { type: 'details', fa: { title: 'پایان جلسه را قابل پیگیری کن', text: 'تمرین پیشنهادی: انتخاب انجام‌شده، دلیل، صاحب اقدام و شرط بازنگری را در چند جمله ثبت کن. اگر تصمیم هنوز ممکن نیست، شاهدِ کم‌شده و مسئول تهیهٔ آن را بنویس. عبارت «بعداً بررسی می‌کنیم» به‌تنهایی مسیر بعد را مشخص نمی‌کند.' }, en: { title: 'Make the ending actionable', text: 'Suggested exercise: record the choice, reason, action owner and condition for reconsideration. If a decision remains impossible, name the missing evidence and who will obtain it. “We will revisit this” alone does not establish the next step.' } }
    ] },
    { id: 'protect-a-question', fa: { title: 'برای فکرکردن یک پرسش نگه دار' }, en: { title: 'Protect a question for reflection' }, blocks: [
      { type: 'paragraph', fa: 'تمرین پیشنهادی: یک فضای خالی تقویم را با پرسشی واقعی همراه کن، نه فقط عنوان «تمرکز». فرضیه‌ای را که به آن تکیه کرده‌ای، شاهد مخالف و انتخاب عقب‌افتاده را یادداشت کن. در مرور بعدی، ببین کدام تصمیم جلو رفت و چه چیزی هنوز گیر دارد. این تمرین وعدهٔ افزایش بهره‌وری نیست؛ راهی برای قابل مشاهده‌کردن توجه مدیر است.', en: 'Suggested exercise: attach a real question to a protected calendar space, beyond the label “focus.” Write the assumption you rely on, evidence against it and a deferred choice. At the next review, inspect which decision moved and what remains stuck. This is not a productivity promise; it makes the leader’s attention inspectable.' }
    ] }
  ],
  related: [
    { target: 'post:strategy-means-choices', fa: { title: 'استراتژی یعنی انتخاب‌های روشن', description: 'تقویم را به انتخاب‌های مهم وصل کن.' }, en: { title: 'Strategy Means Clear Choices', description: 'Connect the calendar to consequential choices.' } },
    { target: 'post:normalized-friction', fa: { title: 'هزینهٔ کارهایی که عادی شده‌اند', description: 'کارِ منتظر تصمیم را در مسیر واقعی ببین.' }, en: { title: 'The Cost of Friction We Accept', description: 'Find work waiting for a decision in the actual process.' } }
  ]
};
