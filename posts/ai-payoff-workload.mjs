export const aiPayoffWorkload = {
  slug: 'ai-payoff-workload', status: 'published', date: '2026-10-26', reviewed: '2026-10-26',
  cover: {
    fa: { src: 'assets/blog/ai-payoff-workload-fa.webp', alt: 'فردی میان انبوه کارهای دیجیتال؛ هوش مصنوعی، کار بیشتر و پرسش بازده.', width: 1672, height: 941 },
    en: { src: 'assets/blog/ai-payoff-workload-en.webp', alt: 'A person surrounded by multiplying digital tasks, asking where AI’s return goes.', width: 1672, height: 941 }
  },
  fa: {
    title: 'هوش مصنوعی؛ کار بیشتر، بازده کجاست؟',
    excerpt: 'سریع‌تر ساختن، بیشتر کار کردن و سودآورتر شدن سه نتیجهٔ متفاوت‌اند. شواهد را در مقیاس خودشان بخوان و ببین زمان آزادشده در تیم تو قرار است کجا برود.',
    category: 'فناوری و آیندهٔ کار', readTime: '۸ دقیقه + تجربه',
    credit: 'تحلیل مستقل با الهام از دو گزارش TechCrunch، همراه با رجوع به منابع اصلی و به‌روزرسانی‌های پژوهش‌ها.',
    sourceNote: 'دو گزارش خبری نقطهٔ شروع‌اند. یافته‌های پژوهشی، نظر تحلیلی و پیشنهادهای اجرایی این مقاله از هم جدا شده‌اند؛ نمودار، بازطراحیِ شاخصی از یک نتیجهٔ منتشرشده است.',
    takeaways: ['شاخص را پیش از ابزار انتخاب کن.', 'زمان بازبینی و هزینهٔ هماهنگی را بشمار.', 'برای زمان آزادشده تصمیم بگیر؛ خودبه‌خود به سود تبدیل نمی‌شود.']
  },
  en: {
    title: 'AI: More Work. Where’s the Return?',
    excerpt: 'Faster production, more work and better margins are different outcomes. Read evidence at the scale it measures, then decide where your team’s freed-up time should go.',
    category: 'TECHNOLOGY & WORK', readTime: '8 minutes + exploration',
    credit: 'Independent analysis prompted by two TechCrunch reports, checked against original evidence and subsequent research updates.',
    sourceNote: 'The news reports are starting points. Research findings, analytical opinion and this article’s operational proposals are distinguished. The chart is an original indexed rendering of a published result.',
    takeaways: ['Choose the outcome before the tool.', 'Count review and coordination effort.', 'Decide what happens to freed-up time; profit is not automatic.']
  },
  glossary: {
    'work-intensity': {
      fa: { title: 'شدت کار', text: 'در این بحث، تراکم کار، گستردگی مسئولیت و ناپدیدشدن وقفه‌ها مهم‌اند؛ حتی وقتی ساعت ثبت‌شدهٔ کار تغییر بزرگی ندارد. تعداد خروجی به‌تنهایی این تجربه را نشان نمی‌دهد.' },
      en: { title: 'Work intensity', text: 'Here, density of work, expanding responsibilities and disappearing pauses matter, even without a large change in recorded hours. Output counts alone do not describe that experience.' }
    },
    'accepted-output': {
      fa: { title: 'خروجی پذیرفته‌شده', text: 'خروجی‌ای که از معیار کیفیت توافق‌شده عبور کرده است. پیش‌نویس، پاسخ اولیه یا کدی که هنوز بازبینی نشده، واحد مناسبی برای شمارش تحویل نهایی نیست.' },
      en: { title: 'Accepted output', text: 'A deliverable that meets the agreed quality standard. A draft, first response or unreviewed code is not the same unit as a completed, accepted delivery.' }
    },
    'aggregate-effect': {
      fa: { title: 'اثر تجمیعی', text: 'نتیجه‌ای در سطح یک گروه، شرکت یا اقتصاد. میانگین می‌تواند تغییرات متفاوت زیرگروه‌ها را پنهان کند؛ از آن نباید نتیجهٔ قطعی برای هر فرد یا سازمان گرفت.' },
      en: { title: 'Aggregate effect', text: 'An outcome measured for a group, firm or economy. An average can conceal different subgroup experiences; it does not determine the result for every person or organization.' }
    }
  },
  sources: [
    { id: 'tc-payoff', url: 'https://techcrunch.com/2026/10/25/ai-delivers-zero-financial-payoff-to-most-companies-according-to-apollo-economist/', publisher: 'TechCrunch', date: '2026-10-25', kind: 'inspiration', fa: { title: 'گزارش بازده AI', note: 'نقطهٔ شروع این نوشته.' }, en: { title: 'AI payoff report', note: 'A starting point for this article.' } },
    { id: 'tc-work', url: 'https://techcrunch.com/2026/02/09/the-first-signs-of-burnout-are-coming-from-the-people-who-embrace-ai-the-most/', publisher: 'TechCrunch', date: '2026-02-09', kind: 'inspiration', fa: { title: 'گزارش AI و فرسودگی', note: 'نقطهٔ شروع این نوشته.' }, en: { title: 'AI and burnout report', note: 'A starting point for this article.' } },
    { id: 'apollo-note', url: 'https://www.apollo.com/wealth/insights-news/insights/daily-spark/no-signs-of-ai-payoff-outside-the-tech-sector', publisher: 'Apollo · Torsten Slok', date: '2026-10-24', kind: 'analysis', fa: { title: 'یادداشت بازده مالی Apollo', note: 'نظر تحلیلی با نمودارهای تجمیعی؛ آزمایش علّیِ پذیرش AI نیست.' }, en: { title: 'Apollo’s financial-payoff note', note: 'An analytical opinion using aggregate charts, not a causal AI-adoption experiment.' } },
    { id: 'berkeley-work', url: 'https://www.universityofcalifornia.edu/news/ai-promised-free-workers-time-uc-berkeley-haas-researchers-found-opposite', publisher: 'University of California · Berkeley Haas', date: '2026-02-26', kind: 'research', fa: { title: 'گفت‌وگو دربارهٔ پژوهش شدت کار', note: 'گزارش مستقیم از پژوهشگر؛ مطالعهٔ کیفی در یک سازمان.' }, en: { title: 'Researcher interview on work intensification', note: 'A direct researcher interview about a qualitative study in one organization.' } },
    { id: 'metr-2025', url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/', publisher: 'METR', date: '2025-07-10', kind: 'research', fa: { title: 'آزمایش توسعه‌دهندگان در ۲۰۲۵', note: 'مبنای شاخص زمانی نمودار؛ محدود به زمینهٔ مطالعه.' }, en: { title: 'The 2025 developer experiment', note: 'Source of the time index; limited to the study setting.' } },
    { id: 'metr-update', url: 'https://metr.org/blog/2026-02-24-uplift-update/', publisher: 'METR', date: '2026-02-24', kind: 'research', fa: { title: 'تغییر طراحی آزمایش در ۲۰۲۶', note: 'پیگیری بعدی و مسئلهٔ سوگیری انتخاب؛ کنار نتیجهٔ قدیمی خوانده شود.' }, en: { title: 'The 2026 experiment-design update', note: 'Follow-up and selection problems; read alongside the earlier result.' } },
    { id: 'qje-support', url: 'https://doi.org/10.1093/qje/qjae044', publisher: 'Quarterly Journal of Economics · Brynjolfsson, Li & Raymond', date: '2025-02-04', kind: 'research', fa: { title: 'AI مولد در پشتیبانی مشتری', note: 'مقالهٔ داوری‌شده؛ شاخص وظیفه‌ای در یک محیط مشخص.' }, en: { title: 'Generative AI in customer support', note: 'A peer-reviewed paper measuring a task outcome in a specific setting.' } },
    { id: 'nber-denmark', url: 'https://www.nber.org/papers/w33777', publisher: 'NBER · Humlum & Vestergaard', kind: 'research', fa: { title: 'بازار کار دانمارک؛ نسخهٔ مارس ۲۰۲۶', note: 'نسخهٔ کاری؛ روزِ بازنگری در منبع اعلام نشده و تاریخ دقیق را ادعا نمی‌کنیم.' }, en: { title: 'Denmark’s labor market · March 2026 revision', note: 'A working paper; the source specifies a revision month, not an exact day.' } }
  ],
  sections: [
    {
      id: 'three-outcomes', fa: { title: 'سه نتیجه را با یک واژه صدا نزنیم' }, en: { title: 'Separate three different outcomes' }, blocks: [
        { type: 'paragraph', fa: 'با AI ممکن است پیش‌نویس‌ها سریع‌تر آماده شوند و صف کار هم بزرگ‌تر شود. این هنوز نشان نمی‌دهد نتیجهٔ مالی بهتر شده است. باید ببینیم کدام گلوگاه جابه‌جا شده و اثرش را کجا می‌سنجیم.', en: 'AI may help a team prepare drafts faster while its queue of work keeps growing. That does not yet show a better financial result. We need to see which bottleneck moved and where its effect is measured.' },
        { type: 'explorer', fa: { title: 'مقیاس را انتخاب کن', hint: 'روی هر سطح بزن؛ پرسش و محدودیتِ شواهد آن فرق می‌کند.' }, en: { title: 'Choose the scale', hint: 'Select a level: its question and evidence limits differ.' }, items: [
          { id: 'task', fa: { title: 'وظیفه', text: 'زمان و کیفیت یک خروجی', detail: 'به زمان رسیدن به [[accepted-output|خروجی پذیرفته‌شده]] نگاه کن؛ با احتساب توضیح‌دادن به ابزار، انتظار، اصلاح و بازبینی. یک نتیجهٔ سریع‌تر در همین مرحله، صورت سود و زیان شرکت نیست. [آزمایش تاریخیِ زمان را پایین‌تر ببین](#historical-test).' }, en: { title: 'Task', text: 'Time and quality of a deliverable', detail: 'Measure time to [[accepted-output|accepted output]], including prompting, waiting, revision and review. A faster task is not a company income statement. [Inspect the historical time experiment below](#historical-test).' } },
          { id: 'team', fa: { title: 'تیم', text: 'دامنه، وقفه و شدت کار', detail: 'پژوهش کیفی هشت‌ماهه در یک شرکت فناوری ۲۰۰نفری، گسترش کار و نفوذ آن به زمان‌های وقفه را توصیف می‌کند. این مشاهده، شیوع فرسودگی در همهٔ کارکنان را اندازه نمی‌گیرد. [گفت‌وگوی پژوهشگر](https://www.universityofcalifornia.edu/news/ai-promised-free-workers-time-uc-berkeley-haas-researchers-found-opposite) زمینه را روشن می‌کند.' }, en: { title: 'Team', text: 'Scope, pauses and work intensity', detail: 'An eight-month qualitative study in a 200-person technology company describes expanding work and its spillover into pauses. It does not estimate burnout prevalence across all workers. The [researcher interview](https://www.universityofcalifornia.edu/news/ai-promised-free-workers-time-uc-berkeley-haas-researchers-found-opposite) explains its context.' } },
          { id: 'company', fa: { title: 'شرکت', text: 'درآمد، هزینه و حاشیهٔ سود', detail: '[یادداشت Apollo](https://www.apollo.com/wealth/insights-news/insights/daily-spark/no-signs-of-ai-payoff-outside-the-tech-sector) در ۲۴ اکتبر ۲۰۲۶، روند درآمد به‌ازای نیروی کار و حاشیهٔ سود S&P 493 را تخت می‌خواند. این گروه، S&P 500 منهای هفت شرکت بزرگ است؛ همهٔ شرکت‌های غیرتکنولوژی جهان نیست. نمودار تجمیعی هم اثر علّی AI یا بازده صفرِ تک‌تک شرکت‌ها را اثبات نمی‌کند.' }, en: { title: 'Company', text: 'Revenue, cost and margins', detail: '[Apollo’s October 24, 2026 note](https://www.apollo.com/wealth/insights-news/insights/daily-spark/no-signs-of-ai-payoff-outside-the-tech-sector) characterizes S&P 493 revenue-per-worker and margin trends as flat. That group is the S&P 500 minus seven large firms, not every nontechnology company worldwide. Aggregate charts do not establish AI causation or zero returns at every firm.' } }
        ] }
      ]
    },
    {
      id: 'historical-test', fa: { title: 'یک عدد تاریخی، با برچسب درست' }, en: { title: 'Read a historical number with its context' }, blocks: [
        { type: 'chart', views: ['bars', 'dots'],
          fa: { title: 'زمان انجام کار در آزمایش METR؛ ابتدای ۲۰۲۵', source: 'شاخص زمان، مبنای بدون AI = ۱۰۰. عدد کمتر یعنی زمان کمتر؛ این نمودار وضعیت ابزارهای امروز نیست.', method: 'نرمال‌سازی نتیجهٔ گزارش‌شده: ۱۰۰ × ۱٫۱۹ = ۱۱۹. این مقدار دقیقه یا پیش‌بینی شخصی نیست. گزارش، ۱۶ توسعه‌دهنده و ۲۴۶ کار را پوشش می‌دهد؛ برای محدودیت‌های نسخهٔ بعد، یادداشت زیر نمودار را بخوان.' },
          en: { title: 'Task time in METR’s early-2025 experiment', source: 'Time index, no-AI baseline = 100. Lower means less time; this is not a measurement of today’s tools.', method: 'Normalize the reported result: 100 × 1.19 = 119. These are not minutes or a personal forecast. The report covers 16 developers and 246 tasks; see the follow-up note below.' },
          labels: { fa: ['بدون AI', 'با AI'], en: ['Without AI', 'With AI'] },
          metrics: [{ id: 'time', key: 'time', format: 'number', fa: 'شاخص زمان', en: 'Time index' }],
          series: [{ id: 'historical', fa: 'آزمایش ابتدای ۲۰۲۵', en: 'Early-2025 experiment', values: { time: [100, 119] } }],
          observations: [
            { date: '2025-07-10', source: 'metr-2025', fa: 'مبنای نرمال‌شده؛ زمان واقعیِ ثابت برای همهٔ کارها نیست.', en: 'Normalized baseline, not one fixed duration for every task.' },
            { date: '2025-07-10', source: 'metr-2025', fa: 'برآورد نقطه‌ای: ۱۹٪ زمان بیشتر در همین زمینهٔ آزمایش.', en: 'Point estimate: 19% more time in this experimental setting.' }
          ]
        },
        { type: 'callout', fa: 'به‌روزرسانی ۲۴ فوریهٔ ۲۰۲۶: METR دادهٔ پیگیری را به‌دلیل مشکلات انتخاب شرکت‌کنندگان و کارها، نشانهٔ قابل اتکایی از اندازهٔ اثر جاری نمی‌داند. نتیجهٔ قدیمی را به حکم همیشگی دربارهٔ برنامه‌نویسی تبدیل نکن. [یادداشت پیگیری](https://metr.org/blog/2026-02-24-uplift-update/).', en: 'February 24, 2026 update: METR says selection problems make its follow-up data an unreliable signal of the current effect’s size. The earlier result is not a timeless verdict on programming. [Read the follow-up](https://metr.org/blog/2026-02-24-uplift-update/).' },
        { type: 'details', fa: { title: 'آیا شاهد مثبت هم داریم؟', text: 'بله. یک مطالعهٔ منتشرشده در QJE با دادهٔ ۵٬۱۷۲ کارشناس پشتیبانی، افزایش میانگین ۱۵٪ در مسائل حل‌شده در ساعت را گزارش می‌کند. این نتیجه به همان شغل و محیط مربوط است، نه رشد سود همهٔ شرکت‌ها. [مقالهٔ اصلی](https://doi.org/10.1093/qje/qjae044).' }, en: { title: 'Is there positive evidence too?', text: 'Yes. A QJE study using data from 5,172 support agents reports a 15% average increase in issues resolved per hour. That result concerns that occupation and setting, not profit growth at every firm. [Read the paper](https://doi.org/10.1093/qje/qjae044).' } }
      ]
    },
    {
      id: 'time-destination', fa: { title: 'زمان آزادشده کجا می‌رود؟' }, en: { title: 'Where does freed-up time go?' }, blocks: [
        { type: 'paragraph', fa: 'پیشنهاد اجرایی من این است که پیش از گسترش استفاده، دربارهٔ مقصد زمان آزادشده توافق کنیم. تب‌ها سه انتخاب مدیریتی را نشان می‌دهند؛ سناریو هستند و نتیجهٔ عددیِ یک پژوهش نیستند.', en: 'My operational proposal is to agree on the destination of freed-up time before scaling adoption. These tabs describe three management choices, not measured numerical research outcomes.' },
        { type: 'tabs', items: [
          { fa: { label: 'کار بیشتر', title: 'وقتی صفِ کار بزرگ‌تر می‌شود', text: 'اگر هر صرفه‌جویی فوراً با درخواست تازه پر شود، افزایش خروجی می‌تواند با [[work-intensity|تراکم کار]] همراه شود. پیش از افزودن تعهد، ظرفیت بازبینی و هماهنگی را بررسی کن. شاخص پیشنهادی: تحویل پذیرفته‌شده در کنار کار نیمه‌تمام و کار خارج از ساعت توافق‌شده.' }, en: { label: 'More work', title: 'When the queue keeps growing', text: 'If every saved interval is immediately filled with new requests, more output can coexist with greater [[work-intensity|work density]]. Check review and coordination capacity before adding commitments. Proposed measures: accepted deliveries alongside work in progress and work outside agreed hours.' } },
          { fa: { label: 'کیفیت بهتر', title: 'وقتی زمان صرفه‌جویی‌شده دوباره سرمایه‌گذاری می‌شود', text: 'بخشی از زمان را برای بررسی منبع، تست و اصلاح خروجی اختصاص بده. بیشترشدن بازبینی، به‌تنهایی اتلاف نیست؛ باید ببینی خطا یا دوباره‌کاریِ تحویل نهایی کمتر شده است یا نه. شاخص پیشنهادی: خروجی پذیرفته‌شده و میزان اصلاح پس از تحویل.' }, en: { label: 'Better quality', title: 'When saved time is reinvested', text: 'Reserve some time for checking sources, testing and revision. Additional review is not automatically waste; ask whether final errors or rework decrease. Proposed measures: accepted output and corrections needed after handover.' } },
          { fa: { label: 'ظرفیت پایدار', title: 'وقتی توقف هم بخشی از طراحی کار است', text: 'برای شروع کار تازه، تعداد کارهای باز و زمان پاسخ مرز مشخص بگذار. زمان آزادشده می‌تواند به یادگیری، هماهنگی یا وقفه برگردد. شاخص پیشنهادی: حفظ کیفیت و تحویل در محدودهٔ زمان توافق‌شده؛ تصمیم دربارهٔ افزایش حجم کار را جداگانه بگیر.' }, en: { label: 'Sustainable capacity', title: 'When stopping belongs in the workflow', text: 'Set boundaries for new starts, work in progress and response time. Freed-up time can return to learning, coordination or pauses. Proposed measures: quality and delivery within agreed hours; make expansion a separate decision.' } }
        ] }
      ]
    },
    {
      id: 'measure-an-experiment', fa: { title: 'به‌جای شمارش پرامپت، یک آزمایش قابل مقایسه بساز' }, en: { title: 'Build a comparable experiment, not a prompt counter' }, blocks: [
        { type: 'paragraph', fa: 'این چک‌لیست، پیشنهاد این مقاله برای یک آزمایش محدود است. هر بخش را باز کن و خروجیِ تصمیم را ببین. یک ابزار و یک جریان کاری مشخص را بررسی کن؛ بعد دربارهٔ ادامه، اصلاح یا توقف تصمیم بگیر.', en: 'This checklist is my proposal for a bounded trial. Open each step to inspect the decision it should produce. Examine one tool in one workflow, then decide whether to continue, revise or stop.' },
        { type: 'details', fa: { title: 'واحدِ خروجی و خط مبنا', text: 'یک تحویل پذیرفته‌شده را تعریف کن و کارهای قابل مقایسه انتخاب کن. زمان تا تأیید نهایی و خطاهای پس از تحویل را با روش یکسان ثبت کن. تفاوت دشواری کارها و تجربهٔ افراد را در تفسیر لحاظ کن.' }, en: { title: 'Output unit and baseline', text: 'Define an accepted delivery and choose comparable tasks. Record time to approval and post-handover errors consistently. Consider task difficulty and worker experience when interpreting differences.' } },
        { type: 'details', fa: { title: 'هزینهٔ کاملِ رسیدن به خروجی', text: 'هزینهٔ ابزار، یکپارچه‌سازی، آموزش، انتظار، بررسی و دوباره‌کاری را بشمار. زمان بالقوهٔ صرفه‌جویی‌شده را بی‌توضیح درآمد نقدی ننام؛ روشن کن به کاهش هزینه، ظرفیت فروش‌پذیر یا کیفیت تبدیل شده است یا هنوز نه.' }, en: { title: 'The full cost of reaching output', text: 'Count tools, integration, training, waiting, checking and rework. Do not label potential time savings as realized cash revenue without an explanation; establish whether they become lower cost, sellable capacity, better quality or none of these yet.' } },
        { type: 'details', fa: { title: 'مرز کار و معیار توقف', text: 'سقف کار نیمه‌تمام، زمان پاسخ و زمان بازبینی را با تیم روشن کن. پیشاپیش مشخص کن چه خطا یا فشار اضافی نیازمند محدودکردن آزمایش است. معیارها را در میانهٔ کار برای زیباتر شدن نتیجه عوض نکن.' }, en: { title: 'Work boundaries and a stop rule', text: 'Agree on work-in-progress limits, response expectations and review time. Specify in advance which errors or additional strain warrant limiting the trial. Do not change the criteria midway to make the result look better.' } },
        { type: 'details', fa: { title: 'تصمیم با شواهد، در همان مقیاس', text: 'اگر در یک وظیفه پیشرفت دیدی، همان را گزارش کن. برای تعمیم به تیم یا شرکت، هزینه و پیامدهای همان سطح را هم بررسی کن. برای طراحی این سنجش، [استراتژی](@strategy)، [اجرای یکپارچه](@execution) و [جریان کار AI](@ai-tools) به هم وصل‌اند.' }, en: { title: 'A decision at the scale of the evidence', text: 'If one task improves, report that result. To extend the claim to a team or company, examine that level’s costs and consequences too. Designing the measurement connects [strategy](@strategy), [execution](@execution) and [AI workflows](@ai-tools).' } }
      ]
    },
    {
      id: 'what-we-can-conclude', fa: { title: 'نتیجه‌ای که شواهد تحمل می‌کند' }, en: { title: 'A conclusion the evidence can carry' }, blocks: [
        { type: 'paragraph', fa: 'چکیدهٔ نسخهٔ مارس ۲۰۲۶ پژوهش دانمارک، اثر متوسط قابل تشخیصی بر درآمد و ساعتِ ثبت‌شده گزارش نمی‌کند؛ هم‌زمان از بازآرایی وظایف می‌گوید. این نمونه یادآور است که [[aggregate-effect|اثر تجمیعی]] و تغییر روزمرهٔ کار می‌توانند با زمان‌بندی متفاوتی دیده شوند. [چکیدهٔ مقالهٔ کاری](https://www.nber.org/papers/w33777).', en: 'The March 2026 Denmark working-paper abstract reports no detectable average effect on earnings or recorded hours, alongside task reorganization. It illustrates why an [[aggregate-effect|aggregate outcome]] and day-to-day work changes may appear on different timelines. [Read the working-paper abstract](https://www.nber.org/papers/w33777).' },
        { type: 'quiz', fa: { question: 'تعداد پیش‌نویس‌ها بالا رفته؛ هزینهٔ بازبینی و نتیجهٔ تجاری هنوز ثبت نشده. کدام نتیجه مجاز است؟' }, en: { question: 'Draft counts increased; review cost and business outcomes are unmeasured. Which conclusion is supported?' }, choices: [
          { correct: false, fa: 'AI قطعاً سود شرکت را بیشتر کرده است.', en: 'AI definitely increased company profit.' },
          { correct: true, fa: 'خروجی اولیه بیشتر شده؛ دربارهٔ بازده نهایی هنوز دادهٔ کافی نداریم.', en: 'Initial output increased; final returns remain insufficiently measured.' },
          { correct: false, fa: 'AI در هیچ کاری ارزش ندارد.', en: 'AI has no value in any task.' }
        ], faExplanation: 'شمارش پیش‌نویس فقط یک مشاهده است. برای ادعای بازده، کیفیت پذیرفته‌شده، هزینهٔ کل و نتیجهٔ تجاری مرتبط را هم لازم داریم.', enExplanation: 'Draft counts are one observation. A return claim also needs accepted quality, total cost and the relevant business outcome.' },
        { type: 'callout', fa: 'قبل از اضافه‌کردن ابزار تازه، یک جریان کار را انتخاب کن: خروجی مطلوب چیست، شاهد بهبود کدام است، بازبینی چقدر وقت می‌گیرد و تیم تا کجا ظرفیت دارد؟ بعد دربارهٔ گسترش استفاده تصمیم بگیر.', en: 'Before adding another tool, choose one workflow. What result do you want, what evidence would show improvement, how long will review take, and how much capacity does the team have? Then decide whether to expand its use.' }
      ]
    }
  ],
  related: [
    { target: 'post:solo-business', fa: { title: 'یک نفر، چند نقش؛ با کمک AI', description: 'پیشنهاد، نقش انسانی و اولین آزمایش را روشن کن.' }, en: { title: 'One person, many roles', description: 'Clarify the offer, human responsibility and first experiment.' } },
    { target: 'post:ai-model-market', fa: { title: 'درون بازار مدل‌های AI', description: 'درآمد، هزینه و فرض را از هم جدا کن.' }, en: { title: 'Inside the AI model market', description: 'Separate revenue, cost and assumptions.' } },
    { target: 'solutions', fa: { title: 'از ابزار به جریان کارِ قابل سنجش', description: 'راهکارهای استراتژی، اجرا، فناوری و AI.' }, en: { title: 'From tools to a measurable workflow', description: 'Strategy, execution, technology and AI solutions.' } }
  ]
};
