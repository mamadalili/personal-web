export const post = {
  slug: 'ceo-time-decisions', status: 'published', date: '2026-10-26', reviewed: '2026-10-26',
  fa: {
    title: 'تقویم مدیر، جای تصمیم است',
    excerpt: 'سه جلسه دربارهٔ یک سفارش برگزار شده و مشتری هنوز منتظر جوابه. قبل از باز کردن وقت تازه در تقویم، ببین تیم برای تصمیم گرفتن چه چیزی کم داره و آیا واقعاً تو باید توی اتاق باشی.',
    category: "استراتژی و تصمیم", readTime: '۴ دقیقه + مرور تقویم',
    credit: 'با استفاده از گزارش Fast Company و راهنمای نقش‌ها در تصمیم‌گیری از Atlassian.',
    sourceNote: 'مدیرها توی گزارش Fast Company وقتشون رو از دید خودشون توضیح می‌دن. این روایت‌ها مبنای تعیین ساعت کار مدیرهای دیگه نیستن. مثال سفارش و تمرین تقویم برای این مقاله نوشته شده.',
    takeaways: ['قبل از جلسه بپرس مشتری آخرش باید چه جوابی بگیره.', 'کسی که کار رو پیگیری می‌کنه ممکنه اختیار قول دادن نداشته باشه.', 'برای وقت خلوتت سؤالی بذار که وسط کار روزمره عقب می‌افته.']
  },
  en: {
    title: 'A Leader’s Calendar Is for Decisions',
    excerpt: 'Three meetings about one order, and the customer is still waiting. Before finding another slot, work out what the team needs to decide and whether you’re the person they need in the room.',
    category: "STRATEGY & DECISIONS", readTime: '4 minutes + calendar review',
    credit: 'Draws on Fast Company’s executive interviews and Atlassian’s guide to decision roles.',
    sourceNote: 'The executives in Fast Company describe their own time. Their accounts don’t establish how other leaders should allocate their hours. The order and calendar exercise are original examples.',
    takeaways: ['Ask what answer the customer needs from the meeting.', 'The person chasing progress may need someone else to authorise a promise.', 'Save a quiet hour for a question that keeps getting postponed.']
  },
  sources: [
    { id: 'fc-ceo', url: 'https://www.fastcompany.com/91628235/9-ceos-tell-us-how-they-manage-time', publisher: 'Fast Company', date: '2026-10-26', kind: 'analysis', fa: { title: 'مدیران چگونه زمان خود را توصیف می‌کنند؟', note: 'گزارش Stephanie Mehta؛ روایت مدیران و مسئلهٔ تفاوت روایت با مشاهده.' }, en: { title: '9 CEOs tell us how they manage time', note: 'Stephanie Mehta’s report; executive accounts and the distinction between accounts and observation.' } },
    { id: 'daci', url: 'https://www.atlassian.com/team-playbook/plays/daci', publisher: 'Atlassian', kind: 'guide', fa: { title: 'چارچوب نقش‌ها در تصمیم: DACI', note: 'روش پیشنهادی ناشر؛ پشتیبان تفکیک هماهنگ‌کننده، تصمیم‌گیرنده و مشورت‌دهنده.' }, en: { title: 'DACI decision-making framework', note: 'Publisher’s method for distinguishing coordination, final authority and contribution.' } }
  ],
  sections: [
    { id: 'start-from-a-decision', fa: { title: 'از تصمیم هفته شروع کن' }, en: { title: 'Start with the week’s decision' }, blocks: [
      { type: 'paragraph', fa: 'توی تقویم این هفته یک ساعت برای «پیگیری مشتری» کنار گذاشتی. فروش به مشتری زمانی قول داده و تیم اجرا می‌گه تا اون روز نمی‌رسه. جلسهٔ قبل وضعیت رو شنیدی، این هفته هم همون آدم‌ها دعوتن. قبل از قبول کردن، از خودت بپرس این بار آخر جلسه چه جوابی باید به مشتری برسه و چه کسی می‌تونه درباره‌اش تصمیم بگیره.', en: 'An hour in this week’s calendar says “customer follow-up.” Sales promised a date that delivery says it can’t meet. You heard the update last time, and the same people are invited again. Before accepting, ask what answer the customer needs after this meeting and who has the authority to give it.' },
      { type: 'paragraph', fa: 'Fast Company از چند مدیر دربارهٔ وقتشون پرسیده و به فاصلهٔ بین روایت آدم‌ها و مشاهدهٔ واقعی روزشون اشاره می‌کنه. برای همین جلسه هم می‌تونی هر دو رو ببینی. شاید توی تقویم اسمش «مشتری» باشه، ولی تمام ساعت به خوندن گزارش بگذره و کسی فرصت نکنه علت تأخیر رو از آدمی که سفارش دستشه بپرسه.', en: 'Fast Company asked executives about their time and discussed the difference between how people describe a day and what observation shows. You can look for that gap in this meeting. It might be labelled “customer” while the whole hour goes on reading updates and nobody gets to ask the person handling the order why it’s late.' }
    ] },
    { id: 'inspect-the-invitation', fa: { title: 'دعوت جلسه چه می‌خواهد؟' }, en: { title: 'What does the invitation need?' }, blocks: [
      { type: 'explorer', fa: { title: 'یک دعوت واقعی را انتخاب کن', hint: 'ببین این دعوت برای تصمیم گرفتنه، فهمیدن یک موضوع یا رساندن خبر. بعد سؤال همون گزینه رو بخون.' }, en: { title: 'Inspect a real invitation', hint: 'Is the invitation about a decision, a question or an update? Choose one to see what to ask before accepting.' }, items: [
        { id: 'decide', fa: { title: 'تصمیم', text: 'یک انتخاب منتظر مانده', detail: 'اگر قراره بین دو تاریخ یکی رو انتخاب کنین، هر دو تاریخ، محدودیت تحویل و اسم کسی رو که اختیار قول دادن داره پیش از جلسه بیارین. اگر زمان‌های ممکن هنوز معلوم نیستن، اول باید همون‌ها رو پیدا کنین.' }, en: { title: 'Decision', text: 'A choice is waiting', detail: 'If you need to choose between two dates, bring both dates, the delivery constraint and the name of the person who can commit. If the possible dates are still unknown, finding them is the first job.' } },
        { id: 'learn', fa: { title: 'یادگیری', text: 'چیزی را هنوز نمی‌دانیم', detail: 'اگر هنوز نمی‌دونین چرا سفارش دیر شده، کسی رو دعوت کن که خودش کار رو تحویل گرفته. سؤال رو ازش بپرس و جایی که هنوز مطمئن نیست رو ثبت کن. با خبر ناقص همین امروز برای مشتری موعد تازه نساز.' }, en: { title: 'Learning', text: 'Something remains unknown', detail: 'If nobody knows why the order is late, invite the person who took it on. Ask what happened and record the part they’re still unsure about. You can take that question further before committing the customer to another date.' } },
        { id: 'update', fa: { title: 'اطلاع‌رسانی', text: 'خبر باید به افراد برسد', detail: 'اگر زمان تازه تأیید شده، ببین چه کسی فقط باید خبر رو بگیره و چه کسی باید بعدش کاری انجام بده. یک پیام کوتاه می‌تونه برای حالت اول کافی باشه. جایی که نگرانی واقعی هست، فرصت گفت‌وگو رو نگه دار.' }, en: { title: 'Update', text: 'People need the news', detail: 'If a new date is agreed, distinguish the people who need an update from anyone who has to act on it. A short note may do for the first group. Leave room for conversation when someone has a concern that needs an answer.' } }
      ] }
    ] },
    { id: 'make-authority-explicit', fa: { title: 'اختیار را از حضور جدا کن' }, en: { title: 'Separate attendance from authority' }, blocks: [
      { type: 'paragraph', fa: 'برای روشن شدن نقش‌ها، Atlassian در روش DACI بین نفر پیگیر کار، تصمیم‌گیر نهایی، همکارهای صاحب‌نظر و کسانی که باید خبر رو بگیرن فرق می‌ذاره. برای همین سفارش ببین چه کسی زمان شدنی رو از اجرا می‌گیره و چه کسی اجازه داره به مشتری پیشنهاد تازه بده. شاید مدیر فقط باید از نتیجه باخبر بشه. [راهنمای DACI](https://www.atlassian.com/team-playbook/plays/daci).', en: 'Atlassian’s DACI approach distinguishes the person moving a decision along, the final decision maker, contributors and people who need to hear the outcome. For this order, who will get a workable date from delivery, and who can offer it to the customer? The leader might only need to hear what was agreed. [Atlassian’s DACI guide](https://www.atlassian.com/team-playbook/plays/daci).' },
      { type: 'details', fa: { title: 'وقتی جلسه تموم می‌شه، چه کسی به مشتری جواب می‌ده؟', text: 'یک جمله بنویس که تصمیم، دلیلش و نفری که خبر رو می‌ده توش معلوم باشه. اگه هنوز نمی‌شه زمان تازه‌ای گفت، بنویس چه اطلاعاتی کمه و چه کسی تا دفعهٔ بعد اون رو پیدا می‌کنه.' }, en: { title: 'Who will get back to the customer?', text: 'Write down the decision, why it was made and who will pass it on. If you still can’t offer a date, record which piece of information is missing and who will get it before the next conversation.' } }
    ] },
    { id: 'protect-a-question', fa: { title: 'برای فکرکردن یک پرسش نگه دار' }, en: { title: 'Protect a question for reflection' }, blocks: [
      { type: 'paragraph', fa: 'برای وقت خلوت هفتهٔ بعد همون سفارش می‌تونه یک سؤال جا بذاره. چرا قولی داده بودیم که تیم اجرا نمی‌تونست انجام بده؟ یک موردی رو که خلاف توضیح اولیه‌اته هم ببین. شاید آخر اون ساعت هنوز جواب قطعی نداشته باشی، اما بدونی باید با کدوم همکار حرف بزنی یا چه رکوردی رو نگاه کنی. این چیزی‌یه که جلسهٔ پیگیری بعدی می‌تونه ازش شروع کنه.', en: 'Keep a question from this order for a quiet hour next week. Why did the shop promise a date the delivery team couldn’t meet? Look for a case that challenges your first explanation. You might end the hour without a firm answer but know which colleague to speak to or which record to inspect. That gives the next follow-up a place to start.' }
    ] }
  ],
  related: [
    { target: 'post:strategy-means-choices', fa: { title: 'استراتژی یعنی انتخاب‌های روشن', description: 'تقویم را به انتخاب‌های مهم وصل کن.' }, en: { title: 'Strategy Means Clear Choices', description: 'Connect the calendar to consequential choices.' } },
    { target: 'post:normalized-friction', fa: { title: 'هزینهٔ کارهایی که عادی شده‌اند', description: 'کارِ منتظر تصمیم را در مسیر واقعی ببین.' }, en: { title: 'The Cost of Friction We Accept', description: 'Find work waiting for a decision in the actual process.' } }
  ]
};
