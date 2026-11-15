const paragraph = (fa, en) => ({ type: 'paragraph', fa, en });
const section = (id, fa, en, blocks) => ({ id, fa: { title: fa }, en: { title: en }, blocks });

const invitations = {
  type: 'chart', id: 'invitation-plan', views: ['bars'],
  fa: {
    title: 'برای چهار صندلی خالی، به چند نفر پیام بدیم؟',
    source: 'تمرین فرضی کارگاه چاپ دستی. نرخ واقعی ثبت‌نام هنوز معلوم نیست.',
    method: 'تعداد صندلی خالی رو در تعداد دعوت به‌ازای یک ثبت‌نام ضرب کن. مثلاً برای چهار صندلی با فرض یک ثبت‌نام از هر چهار دعوت، به شانزده دعوت می‌رسی. فهرست کارگاه فقط بیست نفر داره.'
  },
  en: {
    title: 'How many invitations would four empty seats take?',
    source: 'An illustrative printmaking class. Its actual booking rate is unknown.',
    method: 'Multiply the number of empty seats by invitations per booking. Four empty seats at one booking per four invitations gives sixteen invitations. There are only twenty people on the list.'
  },
  labels: { fa: ['۲ صندلی خالی', '۴ صندلی خالی', '۶ صندلی خالی'], en: ['2 empty seats', '4 empty seats', '6 empty seats'] },
  metrics: [
    { id: 'one-in-two', key: 'half', format: 'number', fa: 'یک ثبت‌نام از هر دو دعوت', en: 'One booking per two invitations' },
    { id: 'one-in-four', key: 'quarter', format: 'number', fa: 'یک ثبت‌نام از هر چهار دعوت', en: 'One booking per four invitations' },
    { id: 'one-in-eight', key: 'eighth', format: 'number', fa: 'یک ثبت‌نام از هر هشت دعوت', en: 'One booking per eight invitations' }
  ],
  series: [{ id: 'invitations', fa: 'تعداد دعوت', en: 'Invitations', values: { half: [4, 8, 12], quarter: [8, 16, 24], eighth: [16, 32, 48] } }]
};

export const post = {
  slug: 'strategic-next-move', status: 'published', date: '2026-11-09', reviewed: '2026-11-09',
  bannerPair: { id: 'forest-citron-register', position: 2 },
  cover: {
    fa: { src: 'assets/blog/strategic-next-move-fa.webp', width: 1600, height: 900, alt: 'چطور مثل یک شطرنج‌باز تصمیم بگیریم؟ تصویر حکاکی‌شدهٔ زنی که پشت صفحهٔ شطرنج به اسب سفید نگاه می‌کند.' },
    en: { src: 'assets/blog/strategic-next-move-en.webp', width: 1600, height: 900, alt: 'How to Think Like a Chess Player. An engraved portrait of a woman studying a white knight across a chessboard.' }
  },
  fa: {
    title: 'چطور مثل یک شطرنج‌باز تصمیم بگیریم؟', subtitle: 'چهار صندلی خالی برای کلاس جمعه',
    category: 'استراتژی و تصمیم‌گیری', readTime: '۴ تا ۶ دقیقه با تمرین',
    excerpt: 'کلاس چاپ دستی جمعه دوازده تا صندلی داره. هشت نفر پولش رو دادن. برای چهار جای خالی تبلیغ می‌کنی، تخفیف می‌دی یا به آدم‌هایی پیام می‌دی که قبلاً سراغ کلاس رو گرفتن؟ جواب به چیزی بستگی داره که هنوز درباره‌شون نمی‌دونی.',
    credit: 'با الهام از نوشتهٔ استاین نورمن دربارهٔ تصمیم‌گیری با نگاه یک شطرنج‌باز.',
    sourceNote: 'پنج قدمِ انتخاب هدف، بررسی موقعیت، سنجیدن گزینه‌ها، اجرا و تغییر نقشه از ایدهٔ نویسنده میاد. کارگاه چاپ دستی و عددهای تمرین رو برای این مقاله ساختیم.',
    takeaways: ['برای جمعه چهار ثبت‌نام قطعی کم داریم. همین عدد محدود می‌کنه چه کاری ارزش انجام دادن داره.', 'قبل از خرج کردن، با آدم‌هایی حرف بزن که یک قدم تا خرید فاصله دارن.', 'از قبل مشخص کن چه جوابی باعث می‌شه نقشه‌ات رو عوض کنی.']
  },
  en: {
    title: 'How to Think Like a Chess Player', subtitle: 'Four empty seats for the Friday class',
    category: 'Strategy & decisions', readTime: '4–6 min with the exercise',
    excerpt: 'Friday’s printmaking class has twelve stools. Eight people have paid. Would you buy an ad, cut the price or write to the people who asked about the last class? The choice turns on something you haven’t learned about them yet.',
    credit: 'Inspired by Stijn Noorman’s article on thinking strategically through chess.',
    sourceNote: 'Noorman supplies the five moves: choose an outcome, read the position, weigh alternatives, act and adapt. The print studio and all the numbers in the exercise are original illustrative examples.',
    takeaways: ['Four paid bookings by Friday is a small enough goal to guide a decision today.', 'People who almost booked can tell you something an impression count can’t.', 'Decide in advance what answer would make you change your plan.']
  },
  sections: [
    section('position', 'قبل از حرکت، ببین جمعه قراره چه شکلی باشه', 'Before you move, picture Friday', [
      paragraph('تو شطرنج گاهی می‌شه سرباز حریف رو مجانی گرفت. دستت می‌ره سمت مهره، ولی یه لحظه صبر می‌کنی. اگه اسبم بره اون‌جا، کی از شاهم دفاع می‌کنه؟ پیشنهاد تخفیف هم ممکنه همین‌قدر وسوسه‌کننده باشه. زدن کد تخفیف ده دقیقه طول می‌کشه. فهمیدن اینکه اصلاً قیمت مانع ثبت‌نام بوده، کار دیگه‌ایه.', 'In chess you sometimes spot a pawn you could take for free. Your hand goes to the knight, then you stop. Once it moves, what’s left guarding your king? A discount code can be just as tempting. It takes ten minutes to make one. Finding out whether the price put anyone off is a different job.'),
      paragraph('خودت رو جای صاحب یه کارگاه چاپ دستی بذار. چهارشنبه‌ست و برای هر دوازده نفر کاغذ و مرکب خریدی. جمعه که در رو باز می‌کنی، دوست داری دوازده نفر پیش‌بند ببندن و پشت میز بشینن. برای تصمیم امروز، «بیشتر دیده شدن» زیادی گنگه. **تا پنجشنبه‌شب چهار پرداخت دیگه لازم داری.** حالا می‌تونی از آخر به اول حساب کنی.', 'Put yourself in a printmaker’s apron. It’s Wednesday. You’ve bought ink and paper for twelve. When you unlock the studio on Friday, you’d like twelve people tying on aprons. “Get more exposure” gives you little to go on today. **Four more paid bookings by Thursday night** gives you something you can work backwards from.'),
      invitations,
      paragraph('روی «یک ثبت‌نام از هر چهار دعوت» بزن و ستون چهار صندلی رو بخون. شانزده دعوته؛ توی فهرست بیست‌نفره‌ات جا می‌شه. حالا «هر هشت دعوت» رو امتحان کن. سی‌ودو نفر لازم داری و دوازده نفر کم میاری. این حساب فروش رو پیش‌بینی نمی‌کنه. بهت می‌گه نقشه‌ات تحت کدوم فرض اصلاً شدنیه.', 'Choose one booking per four invitations and look at the four-seat column. Sixteen invitations fit inside your list of twenty. Now try one per eight. You’d need thirty-two people, twelve more than you have. This arithmetic won’t tell you how many will buy. It tells you which assumption makes your plan possible.')
    ]),
    section('read-board', 'روی صفحه‌ات چی داری؟', 'Read the pieces already on your board', [
      paragraph('دفتر کارگاه رو باز کن. هشت رسید پرداخت داری، بیست نفر هم موقع تکمیل شدن کلاس قبلی خواستن خبرشون کنی. این دو تا رو دیدی و می‌دونی. اینکه اون بیست نفر صبح جمعه وقت دارن، حدس توئه. کسی که ماه پیش پرسیده «دورهٔ بعدی کیه؟» شاید امروز دنبال کلاس عصر باشه. اسمش توی فهرست هست، پولش توی صندوق نیست.', 'Open the studio notebook. There are eight receipts and twenty people who asked to hear when the next class opened. Those are things you know. Whether those twenty have Friday morning free is a guess. Someone who asked about the next class last month may have been looking for an evening session. A name on the list isn’t money in the till.'),
      paragraph('یه محدودیت دیگه هم هست. امروز بین بستن کارگاه و بردن سفارش‌ها به پست، فقط یک ساعت وقت داری. اگه این ساعت رو صرف ساختن ویدئوی تبلیغاتی کنی، دیگه امروز کسی جواب سؤال آدم‌های فهرست رو نمی‌ده. همین هزینهٔ انتخاب توئه، حتی اگه ساختن ویدئو پولی نخواد.', 'There’s another constraint: between cleaning the press and taking orders to the post office, you have one free hour. Spend it filming an ad and nobody answers the waiting list today. That lost conversation is a cost, even if filming the ad is free.')
    ]),
    section('choose', 'سه حرکت داری. کدومش به دردت می‌خوره؟', 'Which of these three moves fits?', [
      paragraph('هر سه کار رو می‌شه انجام داد. روی هر گزینه بزن و ببین برای اینکه ارزش اون یک ساعت رو داشته باشه، باید چه چیزی دربارهٔ مشتری بدونی.', 'You could do any of these. Open each option and consider what would have to be true about your customers for it to earn that hour.'),
      { type: 'tabs', id: 'candidate-moves', items: [
        { fa: { label: 'دعوت از فهرست', title: 'آدم‌ها قبلاً گفتن علاقه دارن', text: 'تاریخ، ساعت، قیمت و راه رزرو رو مستقیم بفرست. این کار هم ممکنه چند صندلی رو پر کنه، هم معلوم کنه چرا بعضی‌ها نمیان. برای این جمعه از همین‌جا شروع می‌کنیم.' }, en: { label: 'Invite the list', title: 'These people asked to hear from you', text: 'Send the date, time, price and booking link. Some may book. Others may explain what’s stopping them. For this Friday, start here.' } },
        { fa: { label: 'تخفیف', title: 'قیمت برای چه کسی مانع بوده؟', text: 'اگه چند نفر مشخص گفته باشن هزینهٔ کلاس از بودجه‌شون بیشتره، جا داره دربارهٔ قیمت فکر کنی. تخفیف عمومی حاشیهٔ سود هر صندلی رو کم می‌کنه. مشکل کسی که جمعه سر کاره هم سر جاش می‌مونه.' }, en: { label: 'Cut the price', title: 'Who actually said it costs too much?', text: 'If several people told you the fee is beyond their budget, price deserves a look. A blanket discount cuts the margin on each seat. It does nothing for someone working on Friday.' } },
        { fa: { label: 'تبلیغ تازه', title: 'شاید آدم مناسب هنوز از کلاس خبر نداره', text: 'اگه فهرست کوتاهه و می‌دونی معرفی کارگاه به مخاطب تازه قبلاً ثبت‌نام آورده، تبلیغ ارزش امتحان داره. هزینه و زمانی که تا پنجشنبه برای دیدن نتیجه داری رو هم حساب کن.' }, en: { label: 'Run an ad', title: 'Maybe the right people haven’t heard about it', text: 'If the list is small and reaching new people has filled previous classes, an ad is worth considering. Check both its cost and the time left before bookings close.' } }
      ] }
    ]),
    section('act', 'یک دعوت بفرست که بشه بهش جواب داد', 'Send an invitation people can answer', [
      paragraph('به چند نفر اول که خواسته بودن خبرشون کنی، بنویس «کلاس چاپ دستی جمعه ساعت ده تا یکه. قیمت و لینک رزرو اینجاست. اگه هنوز دوست داری بیای ولی این نوبت برات جور نیست، می‌گی چرا؟» خودت یک بار مسیر پرداخت رو با گوشی برو. بعد توی دفتر، پرداخت، جوابِ بدون پرداخت و بی‌جواب رو جدا بنویس. سکوت دلیل نمی‌شه اسم کسی رو بذاری توی ستون «گرون بود».', 'Write to a few of the people who asked for updates. Give the Friday time, price and booking link. Ask one short question: if they’d still like to come but this session doesn’t work, what gets in the way? Try the payment link on your own phone first. In your notebook separate payments, replies without payment and silence. Silence doesn’t belong in a column marked “too expensive.”')
    ]),
    section('adapt', 'اگه جواب مشتری نقشه رو عوض کرد چی؟', 'What if the replies change your plan?', [
      paragraph('تا ظهر شش نفر جواب می‌دن «صبح جمعه سر کاریم. عصر هم کلاس دارین؟» حالا یک چیز تازه می‌دونی. دربارهٔ همین شش نفر شاهد داری. هنوز نمی‌دونی کسی برای عصر پول می‌ده یا مدرس اصلاً وقت داره. حرکت بعدی رو تو انتخاب کن.', 'By noon six people have replied: “I work Friday mornings. Do you ever run this in the evening?” You have evidence about those six. You don’t yet know if they’d pay for an evening seat, or even if the teacher is free. What would you do next?'),
      { type: 'quiz', fa: 'با هشت ثبت‌نام قطعی برای صبح، کدوم کار رو اول انجام بدی؟', en: 'Eight people have paid for the morning. What would you do first?', options: [
        { fa: { label: 'همین کلاس رو ببرم عصر', feedback: 'هشت نفر برای صبح برنامه ریختن. شش سؤال دربارهٔ عصر، تعهد قبلی کارگاه رو عوض نمی‌کنه.' }, en: { label: 'Move the whole class to the evening', feedback: 'Eight people made plans for the morning. Six questions about evenings don’t change that commitment.' } },
        { fa: { label: 'وقت مدرس رو بپرسم و یک نوبت عصر جدا پیشنهاد بدم', feedback: 'این‌طوری می‌تونی علاقه رو با یک تاریخ واقعی بسنجی و صبح رو طبق قولت برگزار کنی. رزروهای عصر رو جدا بشمار؛ صندلی‌های جمعه‌صبح هنوز خالی‌ان.' }, en: { label: 'Check the teacher’s availability and offer a separate evening date', feedback: 'That tests interest against an actual date and honours the morning bookings. Count evening reservations separately: they don’t fill Friday morning’s seats.' } },
        { fa: { label: 'به هر شش نفر کد تخفیف بدم', feedback: 'جواب هر شش نفر دربارهٔ ساعت بود. اول ببین با یک زمانِ شدنی واقعاً رزرو می‌کنن یا نه.' }, en: { label: 'Send all six a discount', feedback: 'All six mentioned timing. First see whether any of them will book a date they can actually attend.' } }
      ] },
      paragraph('پنجشنبه‌شب دفتر رو ببند، حتی اگه جمعه فقط ده نفر میان. برای دفعهٔ بعد بنویس چند نفر رو خبر کردی، چند نفر پرداخت کردن و چند نفر مشخصاً عصر خواستن. اون وقت وقتی دوباره وسوسه شدی تخفیف بدی، یه تکه از بازی قبلی رو پیش رو داری که به تصمیم امروزت کمک می‌کنه.', 'Close the notebook on Thursday night, even if only ten people are coming. Write down how many you invited, how many paid and how many specifically asked about evenings. The next time your hand goes to the discount button, you’ll have a position from a previous game worth looking at.')
    ])
  ],
  sources: [{ id: 'noorman', kind: 'inspiration', publisher: 'Stijn Noorman / X', date: '2026-11-09', url: 'https://x.com/stijnnoorman/status/2119781289737802115',
    fa: { title: 'How to Think Like a Strategic Genius', note: 'نوشتهٔ اصلی استاین نورمن دربارهٔ پنج قدم تصمیم‌گیری و تشبیه آن‌ها به بازی شطرنج.' },
    en: { title: 'How to Think Like a Strategic Genius', note: 'Noorman’s original chess analogy and five steps for making strategic decisions.' } }],
  related: [
    { target: 'post:team-capacity', fa: { title: 'وقتی کار از ظرفیت تیم بیشتره', description: 'وقتی یک ساعت وقت داری و سه کار روی میز مونده، کدوم رو عقب می‌اندازی؟' }, en: { title: 'When work exceeds team capacity', description: 'What can you defer when the team has an hour and three competing jobs?' } },
    { target: 'post:search-to-sale', fa: { title: 'جذب ورودی و تبدیل به فروش', description: 'ببین بین علاقه‌مند شدن و پرداخت کردن کجا مشتری رو از دست می‌دی.' }, en: { title: 'From search to sale', description: 'Follow the gap between someone showing interest and paying for a service.' } }
  ]
};
