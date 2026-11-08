const paragraph = (fa, en) => ({ type: 'paragraph', fa, en });
const section = (id, fa, en, blocks) => ({ id, fa: { title: fa }, en: { title: en }, blocks });
const option = (labelFa, labelEn, feedbackFa, feedbackEn) => ({
  fa: { label: labelFa, feedback: feedbackFa },
  en: { label: labelEn, feedback: feedbackEn }
});

const calendar = {
  type: 'chart', id: 'video-mix', views: ['bars'],
  fa: {
    title: 'اگر ده ویدیو جا داشته باشی، چندتاش برای مشتریِ آمادهٔ خریده؟',
    source: 'پیشنهاد پی‌یر فرانسوا برای ترکیب محتوا. این عددها سهم ویدیوهای تقویم‌اند. آماری از بازدید یا خرید نیستند.',
    method: 'پیشنهاد منبع برای آشنایی، بررسی و تصمیم خرید به‌ترتیب ۶۰، ۳۰ و ۱۰ درصده. با انتخاب تقویم ده یا بیست‌ویدیویی، همون سهم‌ها رو به تعداد ویدیو می‌بینی.'
  },
  en: {
    title: 'In a ten-video calendar, how many slots go to someone ready to buy?',
    source: 'Pierre François’s suggested mix. These are shares of the publishing calendar, not observed shares of views or purchases.',
    method: 'The source suggests 60%, 30% and 10% for discovery, evaluation and purchase decisions. Switch between ten and twenty slots to see the same proportions as video counts.'
  },
  labels: { fa: ['آشنایی', 'بررسی', 'تصمیم خرید'], en: ['Discovery', 'Evaluation', 'Purchase decision'] },
  metrics: [
    { id: 'ten', key: 'ten', format: 'number', fa: 'تقویم ده‌ویدیویی', en: 'Ten-video calendar' },
    { id: 'twenty', key: 'twenty', format: 'number', fa: 'تقویم بیست‌ویدیویی', en: 'Twenty-video calendar' }
  ],
  series: [{ id: 'calendar', fa: 'تعداد ویدیو', en: 'Video slots', values: { ten: [6, 3, 1], twenty: [12, 6, 2] } }]
};

export const post = {
  slug: 'youtube-for-buyers', status: 'published', date: '2026-11-08', reviewed: '2026-11-08',
  bannerPair: { id: 'plum-guava-pair', position: 2 },
  cover: {
    fa: { src: 'assets/blog/youtube-for-buyers-fa.webp', width: 1600, height: 900, alt: 'ارزشمندترین بلاگ آموزشی بوتیوب. تصویرسازی صاحب یک کارگاه دوخت که از جیب پیش‌بند فیلم می‌گیرد.' },
    en: { src: 'assets/blog/youtube-for-buyers-en.webp', width: 1600, height: 900, alt: 'The Most Valuable YouTube Guide. A textile studio founder films the detail of an apron pocket.' }
  },
  fa: {
    title: 'ارزشمندترین بلاگ آموزشی بوتیوب', subtitle: 'به فارسی و انگلیسی',
    category: 'بازاریابی و فروش آنلاین', readTime: '۶ تا ۹ دقیقه با تمرین',
    excerpt: 'ویدیوی پشت‌صحنهٔ کارگاه رو کلی آدم دیده. ولی مدیر کافه قبل از سفارش هنوز می‌پرسه جیب پیش‌بند به درد باریستا می‌خوره یا نه. برای کانال این کارگاه، ویدیوی بعدی رو از همین سؤال می‌سازیم.',
    credit: 'با الهام از تجربهٔ پی‌یر فرانسوا در ساخت کانال یوتیوب برای کسب‌وکارها.',
    sourceNote: 'کارگاه دوخت و گفت‌وگوهای این نوشته مثال آموزشی‌اند. ترکیب پیشنهادی ویدیوها از پی‌یر فرانسواست. روش خواندن نمودار ماندگاری و آزمون کاور از راهنمای خود یوتیوب آمده.',
    takeaways: ['موضوع ویدیو رو از سؤال خریدار دربیار.', 'وعدهٔ کاور رو توی تصویر اول نشون بده.', 'بین تماشا، درخواست نمونه و سفارش فرق بذار.']
  },
  en: {
    title: 'The Most Valuable YouTube Guide', subtitle: 'In Persian and English',
    category: 'Marketing & online sales', readTime: '5–8 min with the exercise',
    excerpt: 'The studio tour gets plenty of views. The café owner still wants to know whether a barista can reach the apron pocket during a shift. That question gives a workwear studio its next video.',
    credit: 'Inspired by Pierre François’s account of building business YouTube channels.',
    sourceNote: 'The workwear studio and its conversations are teaching examples. The proposed video mix comes from François. The retention and thumbnail-testing details come from YouTube Help.',
    takeaways: ['Find an idea in a buyer’s question.', 'Deliver the cover’s promise in the opening shot.', 'Track a view, a sample request and an order separately.']
  },
  sections: [
    section('buyer', 'یک مشتری پشت تلفنه. دقیقاً چی می‌پرسه؟', 'Listen to the person who has to place the order', [
      paragraph('فرض کن برای کافه‌ها پیش‌بند می‌دوزی. یه نفر زیر ویدیوی کارگاه می‌نویسه «چه رنگ قشنگی!». همون روز مدیر یه کافه زنگ می‌زنه و می‌پرسه «باریستای من وقتی یه دستش بنده، می‌تونه دستمال رو از جیب دربیاره؟». هر دو حرف ارزش شنیدن داره. دومی اون‌قدر مشخصه که همین الان می‌تونی دوربین رو روشن کنی و جواب بدی.', 'Imagine you sew aprons for cafés. Someone comments on your studio tour to say they love the colour. Later, a café manager calls. Can a barista pull a cloth from the pocket with one hand? Both are telling you something. The second question is precise enough to film an answer this afternoon.'),
      paragraph('پی‌یر فرانسوا پیشنهاد می‌کنه کانال رو برای مشتری‌ای بسازی که دوست داری بیشتر شبیهش داشته باشی. برای این کارگاه، اون آدم مسئوله برای یک شیفت کامل لباس بخره. از مکالمهٔ آخرش سه چیز بردار. **چه تصمیمی داشت می‌گرفت؟ چه چیزی نگرانش می‌کرد؟ با چه کلمه‌هایی پرسید؟** اگه گفته «جیبش گیر نمی‌کنه؟»، همین عبارت برای نوشتن عنوان به دردت می‌خوره.', 'François suggests making videos for the kind of customer you want more of. Here that person buys uniforms for an entire shift. Pull three things from their last call: the decision they faced, the risk on their mind and the words they actually used. “Will the pocket catch?” already sounds like a title.'),
      { type: 'quote', fa: '«اگه قراره برای کل تیم بخرم، اول بذار یکی‌شو سرِ شیفت امتحان کنیم.»', en: '“Before I order these for everyone, let me try one during a shift.”' }
    ]),
    section('calendar', 'سه ویدیو برای سه جای متفاوتِ مسیر خرید', 'Three different reasons to press play', [
      paragraph('یه مدیر تازه‌کار شاید هنوز به شکل جیب فکر نکرده باشه. ویدیوی «پیش‌بند باریستا وسط شیفت کجا گیر می‌کنه؟» می‌تونه توجهش رو جلب کنه. کسی که همین مشکل رو داره، از مقایسهٔ دو مدل جیب چیز بیشتری یاد می‌گیره. مدیری که مدلش رو هم انتخاب کرده، حالا می‌خواد بدونه نمونه چطور به دستش می‌رسه و قبل از سفارش گروهی چی رو می‌تونه عوض کنه. برای این سه نفر سه ویدیوی متفاوت لازمه.', 'A first-time café owner might never have thought about pocket placement. A video showing where an apron catches during a shift could get their attention. Someone already dealing with it will learn more from two pocket designs tested side by side. Someone who has chosen a design wants to see how a sample arrives and what they can change before a team order. That gives the channel three distinct assignments.'),
      calendar,
      paragraph('این نسبت یه نقطهٔ شروعه. ده ویدیوی آخرت رو به همین سه دسته تقسیم کن. شاید همشون آدم تازه بیارن، ولی برای کسی که می‌خواد نمونه بگیره چیزی نداشته باشی. اون‌وقت یک جای خالی واقعی توی تقویمت پیدا کردی. می‌تونی ویدیویی بسازی که حتی فروشندهٔ کارگاه هم بعد از تماس برای مشتری بفرسته.', 'Try sorting your last ten uploads into those groups. If they all bring in newcomers and none addresses a sample order, the empty column tells you something a total view count can’t. Make the video your salesperson would actually send after that call.')
    ]),
    section('cover', 'قول روی کاور رو همون اول نشون بده', 'Put the cover’s promise on camera', [
      paragraph('عنوان پیشنهادی ما اینه «کدوم جیب پیش‌بند با یه دست باز می‌شه؟». برای کاورش دو عکس داریم. یکی عکس مرتب پیش‌بند روی مانکنه. اون یکی نمای نزدیک دست باریستاست که می‌ره سراغ جیب. عکس دوم یه چیزی به عنوان اضافه می‌کنه. قبل از کلیک می‌فهمی قراره حرکت واقعی رو ببینی.', 'Our working title is “Which apron pocket can you use one-handed?” One possible cover shows the whole apron on a mannequin. Another shows a barista reaching for the cloth. The second adds information to the title: you can already see what the test will involve.'),
      { type: 'image', src: 'assets/blog/youtube-for-buyers-pocket.webp', width: 1440, height: 810,
        fa: { alt: 'دو قاب از پیش‌بند مرجانی. یکی روی مانکن، دیگری در کافه با دست باریستا روی جیب.', caption: 'عکس اول برای دیدن ظاهر پیش‌بند خوبه. عکس دوم کمک می‌کنه بفهمی چرا باید ویدیوی آزمایش جیب رو باز کنی.' },
        en: { alt: 'A coral apron on a dress form beside a shot of a barista reaching into its pocket.', caption: 'The product shot helps you judge the look. The working shot gives you a reason to watch the pocket test.' } },
      paragraph('اگه امکان آزمون کاور در YouTube Studio برای ویدیوت فعاله، همین دو ایده رو با یک عنوان امتحان کن. یوتیوب برای انتخاب برنده به زمان تماشا نگاه می‌کنه. ممکنه نتیجه هم قطعی نباشه. عوض کردن رنگ نوشته روی دو عکس تقریباً یکسان، جواب سؤال اصلی ما رو نمی‌ده. اینجا داریم می‌پرسیم مخاطب برای دیدن ظاهر لباس میاد یا برای دیدن طرز استفاده‌ش.', 'If your video is eligible for YouTube Studio’s A/B test, try these two ideas with the same title. YouTube uses watch time to choose a winner, and a test can be inconclusive. A minor lettering change wouldn’t answer the question we have here: does the audience come for a look at the garment or to see how it works?')
    ]),
    section('opening', 'دوربین که روشن شد، از کجا شروع کنی؟', 'What belongs in the first shot?', [
      paragraph('باریستا پشت دستگاهه. دست چپش درگیره و با دست راست می‌ره سراغ دستمال. بذار همین تلاش رو ببینیم. بعد جیب دوم رو تحت همون شرایط امتحان کن. حالا برای توضیح جا داری. کجای دوخت فرق داره؟ برای کسی که چپ‌دسته هم همین جواب رو می‌گیری؟ چیزی که امتحان نکردی می‌تونه موضوع ویدیوی بعدی باشه.', 'Open at the espresso machine. The barista has one hand occupied and reaches for the cloth with the other. Let that attempt play out. Try the second pocket under the same conditions. Now there’s a reason to explain the seam. Would a left-handed barista get the same result? An untested detail makes an honest follow-up.'),
      { type: 'quiz', fa: 'تدوینگر سه شروع فرستاده. کدوم یکی به وعدهٔ عنوان وفا می‌کنه؟', en: 'The editor sends three openings. Which one delivers what the title promised?',
        options: [
          option('نمای مانکن با معرفی پارچه و رنگ‌ها', 'A mannequin and a rundown of colours', 'برای ویدیوی انتخاب رنگ شروع خوبیه. خریدار اینجا هنوز نمی‌بینه با یه دست چه اتفاقی می‌افته.', 'Useful for a colour guide. The viewer who clicked for the pocket test still hasn’t seen a hand use it.'),
          option('باریستا هر دو جیب رو پشت دستگاه امتحان کنه', 'A barista trying both pockets at the machine', 'همینه. خودِ حرکت تفاوت رو نشون می‌ده. بعد از این نما، توضیح دوخت برای بیننده معنا داره.', 'Yes. The movement shows what differs. Once you have seen it, the stitching detail has a purpose.'),
          option('صحبت صاحب کارگاه دربارهٔ تعداد مشتری‌ها', 'The founder describing how many clients the studio has', 'سابقه می‌تونه اعتماد بسازه. برای این سؤال، دیدن یک آزمایش کوتاه مدرک مستقیم‌تریه.', 'Experience can build trust. For this particular question, a short demonstration provides more direct evidence.')
        ] },
      paragraph('بعد از انتشار، توی گزارش ماندگاری مخاطب ببین سرِ همون نما چند نفر هنوز ویدیو رو می‌دیدن. طبق راهنمای یوتیوب، افت نمودار می‌تونه یعنی عده‌ای رد کردن یا رفتن. اون چند ثانیه رو دوباره تماشا کن. شاید دست باریستا پشت پیشخوان پنهانه. به تدوینگر بگو «وقتی دست می‌ره توی جیب، روی نمای نزدیک بمون تا دستمال بیرون بیاد». این تغییر رو می‌شه دید و بعداً سنجید.', 'After publication, open the audience retention report and revisit that shot. YouTube says a dip can indicate skipping or leaving. Watch those seconds again. Perhaps the counter hides the hand. Give the editor a time-specific note: “Stay on the close-up from the moment the hand goes in until the cloth comes out.” That’s an edit you can see and later evaluate.')
    ]),
    section('team', 'سؤال مشتری توی راهِ تدوین گم نشه', 'Keep the customer’s question attached to the footage', [
      paragraph('اگه تو فروش حرف مشتری رو شنیدی و فیلم رو یکی دیگه می‌سازه، همون روز یه یادداشت کوتاه بفرست. برای این ویدیو کارت کار می‌تونه این‌قدر ساده باشه. سؤال مشتری بالاش، دو مدلی که باید فیلم بگیریم زیرش، و اسم کسی که نمونه‌ها رو تا روز ضبط می‌رسونه کنارش. تدوینگر هم می‌دونه کدوم حرکت رو باید کامل نگه داره. برای ثبت سؤال‌ها لازم نیست صدای خصوصی مشتری رو منتشر کنی.', 'If you hear the question on a sales call and someone else shoots the video, send a short note that day. Write the question at the top of the production card, list both samples underneath, and name the person bringing them to the shoot. The editor now knows which movement must survive the cut. A paraphrased question is enough to brief the team.'),
      paragraph('پی‌یر برای هر مرحله یک مسئول می‌گذاره. حتی توی یه تیم دونفره هم می‌شه این رو اجرا کرد. یک نفر جواب درست و نمونه رو آماده می‌کنه، یکی تصویر و تدوین رو تحویل می‌ده. قبل از انتشار معلوم کن کی لینک سفارش نمونه رو با گوشی امتحان می‌کنه و کی هفتهٔ بعد درخواست‌های رسیده رو با فروشنده مرور می‌کنه. اگه همیشه کار همون‌جا گیر می‌کنه، تازه می‌دونی برای چه کاری کمک لازم داری.', 'François assigns one owner to each stage. In a two-person studio, one person can check the answer and prepare the garments while the other films and edits. Decide who will try the sample request on a phone and who will review the enquiries next week. If the same handoff keeps failing, you have a specific job to get help with.')
    ]),
    section('sales', 'آخر ویدیو از بیننده چه می‌خوای؟', 'Give the buyer somewhere useful to go', [
      paragraph('باریستا آزمایش رو انجام داده. حالا پیشنهاد «یه نمونه برای امتحان سرِ شیفت بگیر» ادامهٔ طبیعی همون تماشا کردنه. لینک مستقیم صفحهٔ نمونه رو در توضیحات بذار و روش دسترسی رو توی خود ویدیو هم بگو. مقصد باید دربارهٔ اندازه، شرایط نمونه و زمان پاسخ توضیح بده. اگه مشتری به صفحهٔ اول سایت برسه و مجبور بشه دنبال راه تماس بگرده، بخشی از کاری رو که کردی از دست می‌دی.', 'The barista has finished the test. “Try a sample on your own shift” follows naturally. Put a direct link in the description and explain where to find it in the video. The destination should answer the next questions: sizing, sample terms and when to expect a reply. Sending people to a home page to hunt for a contact form adds work at the moment they are ready to act.'),
      paragraph('برای این ویدیو یک لینک قابل‌ردیابی بذار. کنار هر درخواست ثبت کن مربوط به کدوم ویدیو بوده و آیا واقعاً از طرف یه کافه اومده. چند سفارش پرداخت‌شده از اون درخواست‌ها دراومد؟ **کلیک، درخواست نمونه و سفارش سه اتفاق جدا هستن.** اگر مشتری ویدیو رو دید و بعداً تلفن زد، ممکنه لینک چیزی ثبت نکنه. فروشنده می‌تونه بپرسه «از کجا با ما آشنا شدین؟» و جواب رو جدا یادداشت کنه. توی [جذب ورودی و تبدیل به فروش](@post:search-to-sale) همین فاصله رو از سمت جست‌وجو دنبال کردیم.', 'Give this upload its own tracked link. Record which requests came through it and which were actually from cafés. Then follow those requests through to paid orders. **A click, a sample request and a paid order are three different events.** A manager who watches and phones later may never use the link. Keep their answer to “How did you hear about us?” as a separate clue. [Turning Search Traffic into Sales](@post:search-to-sale) follows that same gap from a search result.')
    ]),
    section('review', 'این هفته چی رو عوض کنیم؟', 'Choose one change for the next shoot', [
      paragraph('فرض کن ویدیو دیده شده، بیننده‌ها تا آزمایش موندن، ولی از مدیرهای کافه درخواست نمونه نرسیده. قبل از ضبط دوباره، خودت با گوشی از توضیحات ویدیو برو تا انتهای فرم. شاید صفحه هیچ‌جا نمی‌گه نمونه تکی هم می‌فرستین. اگه سفارش گروهی معمولاً بعد از چند شیفت امتحان ثبت می‌شه، به درخواست‌های تازه هم فرصت بده. از یه هفته سکوت نمی‌شه دربارهٔ فروش نهایی حکم داد.', 'Suppose people watched the experiment, yet café managers haven’t asked for samples. Before a reshoot, follow the link on your phone and finish the form. Maybe the page never says an individual sample is available. If cafés decide after several shifts, give the newest requests time to mature. One quiet week can’t settle the sales question.'),
      paragraph('برای جلسهٔ بعد، یکی از ویدیوهای خودت رو بیار. قول عنوان رو بلند بخون، تصویر اول رو بی‌صدا پخش کن و بعد لینک رو روی گوشی باز کن. اولین جایی که مشتری جوابش رو نمی‌گیره یادداشت کن. همون‌جا رو به یک نفر بسپار و روزی رو مشخص کن که دوباره با هم نگاهش می‌کنین. نتیجهٔ این جلسه می‌تونه فقط یک نمای نزدیک بهتر باشه.', 'Take one of your own uploads to the next review. Read its title aloud, play the opening on mute, then follow the link on a phone. Mark the first point at which the customer’s question goes unanswered. Give that change an owner and a date to look again. Sometimes the whole meeting earns its keep by getting you one better close-up.')
    ])
  ],
  sources: [
    { id: 'pierre', publisher: 'Pierre François / X', date: '2026-11-07', kind: 'inspiration', url: 'https://x.com/pierrestories/status/2119162449928827320', fa: { title: 'تجربهٔ ساخت کانال یوتیوب برای کسب‌وکارها', note: 'مخاطب، ترکیب تقویم، کاور، متن، تدوین، تقسیم کار و پیگیری فروش. عددهای درآمد مشتری‌های نویسنده به این کارگاه نسبت داده نشده‌اند.' }, en: { title: 'Pierre François on running a business YouTube channel', note: 'Source for the proposed content mix and production decisions. The author’s client revenue is not treated as a forecast.' } },
    { id: 'retention', publisher: 'YouTube Help', kind: 'guide', url: 'https://support.google.com/youtube/answer/9314415', fa: { title: 'چطور نمودار ماندگاری مخاطب را بخوانیم؟', note: 'معنی افت، تماشای دوباره و شاخص سی ثانیهٔ اول.' }, en: { title: 'Key moments for audience retention', note: 'Dips, repeated viewing and the first thirty seconds.' } },
    { id: 'testing', publisher: 'YouTube Help', kind: 'guide', url: 'https://support.google.com/youtube/answer/16391400', fa: { title: 'آزمون عنوان و تصویر بندانگشتی', note: 'شرایط دسترسی، معیار زمان تماشا و نتیجه‌های بدون برندهٔ مشخص.' }, en: { title: 'Testing titles and thumbnails', note: 'Eligibility, watch time and inconclusive results.' } }
  ],
  related: [{ target: 'post:ai-video-production', fa: { title: 'ویدیوی AI از ایده تا تدوین', description: 'وقتی موضوع معلومه، برای ساخت و بازبینی نماها از اینجا شروع کن.' }, en: { title: 'AI Video: From Idea to Final Cut', description: 'Turn the brief into shots you can review before editing.' } }]
};
