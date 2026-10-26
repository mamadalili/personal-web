// Original editorial experiments, not a rate survey or a claim of proven demand.
export const soloGroups = [
  { id: 'commerce', fa: 'فروش و تجارت', en: 'Commerce' },
  { id: 'content', fa: 'نوشتن و محتوا', en: 'Content' },
  { id: 'design', fa: 'طراحی و تجربه', en: 'Design' },
  { id: 'systems', fa: 'فناوری و عملیات', en: 'Systems' },
  { id: 'teaching', fa: 'آموزش', en: 'Teaching' },
  { id: 'expertise', fa: 'دانش تخصصی', en: 'Domain knowledge' }
];

export const soloOpportunities = [
  {
    id: 'catalog', group: 'commerce', target: 'execution',
    fa: {
      title: 'کاتالوگی که آمادهٔ فروش است', buyer: 'فروشگاهی با اطلاعات محصول پراکنده و ناقص',
      outcome: 'یک دستهٔ محصول با ویژگی‌های یکدست، متن دقیق و فایل تحویل قابل ورود به فروشگاه.',
      proof: 'نمونهٔ قبل و بعد از چند محصول، همراه فهرست خطاهایی که با منبع معتبر اصلاح شده‌اند.',
      ai: 'دسته‌بندی اطلاعات مجاز، پیشنهاد ساختار و پیش‌نویس توضیحات.',
      human: 'تطبیق مشخصات با محصول واقعی، حق استفاده از تصویر و تأیید ادعاهای فروش.',
      experiment: 'با اجازهٔ صاحب فروشگاه، یک دستهٔ کوچک را بررسی کن و نمونهٔ تحویل بساز.',
      boundary: 'ورود محصول نامحدود، تولید مشخصات خیالی و وعدهٔ افزایش فروش در این دامنه نیست.'
    },
    en: {
      title: 'A catalog ready to sell', buyer: 'A store with scattered or incomplete product information',
      outcome: 'One product category with consistent attributes, accurate copy and an import-ready handover file.',
      proof: 'Before-and-after samples with a log of corrections checked against reliable product information.',
      ai: 'Organize permitted information, suggest a structure and draft descriptions.',
      human: 'Verify physical specifications, image rights and sales claims.',
      experiment: 'With the store owner’s permission, audit a small category and make a sample handover.',
      boundary: 'Unlimited uploads, invented specifications and promised sales lifts are outside this scope.'
    }
  },
  {
    id: 'buying-journey', group: 'commerce', target: 'strategy',
    fa: {
      title: 'یک مسیر خریدِ قابل آزمایش', buyer: 'کسب‌وکاری که می‌خواهد اصطکاک خرید را بشناسد',
      outcome: 'نقشهٔ مسیر خرید، موانع مستند و یک فرضیهٔ اولویت‌دار برای آزمایش.',
      proof: 'مسیر قابل بازپخش، مشاهده‌های واقعی و تعریف معیار موفقیت پیش از تغییر.',
      ai: 'مرتب‌کردن یادداشت‌های مجاز و یافتن الگوهای تکراری در بازخوردها.',
      human: 'گفت‌وگو با کاربر، تشخیص علت و تفکیک همبستگی از اثر واقعی.',
      experiment: 'یک خرید آزمایشی انجام بده و با چند خریدار دربارهٔ همان مسیر گفت‌وگو کن.',
      boundary: 'این پیشنهاد، ممیزی و طراحی آزمایش است؛ نتیجهٔ رشد تا پیش از سنجش معلوم نیست.'
    },
    en: {
      title: 'A buying journey you can test', buyer: 'A business that wants to understand purchasing friction',
      outcome: 'A journey map, documented obstacles and one prioritized test hypothesis.',
      proof: 'A reproducible journey, actual observations and a success metric defined before changes.',
      ai: 'Organize permitted notes and identify recurring feedback themes.',
      human: 'Talk to users, diagnose causes and separate correlation from actual effects.',
      experiment: 'Run a test purchase and interview a few buyers about that same journey.',
      boundary: 'This is an audit and experiment design; any growth effect remains unknown until measured.'
    }
  },
  {
    id: 'answer-library', group: 'content', target: 'ai-tools',
    fa: {
      title: 'پاسخ‌های قابل اتکا برای مشتری', buyer: 'تیمی با پرسش‌های تکراری دربارهٔ یک محصول یا خدمت',
      outcome: 'کتابخانهٔ پاسخ‌های تأییدشده، منبع هر پاسخ و فهرست موارد نیازمند ارجاع.',
      proof: 'مجموعهٔ پرسش‌های آزمون و نمونهٔ پاسخ‌هایی که به منبع درست برمی‌گردند.',
      ai: 'خوشه‌بندی پرسش‌ها و پیش‌نویس پاسخ از اسناد مجاز.',
      human: 'تأیید سیاست‌ها، حل تعارض اسناد و تعیین مرز پاسخ‌گویی.',
      experiment: 'با پرسش‌های واقعی و بدون اطلاعات شخصی، یک نمونهٔ کوچک بساز.',
      boundary: 'اطلاعات محرمانه یا پاسخ بدون منبع وارد سیستم نکن؛ مسیر ارجاع را حفظ کن.'
    },
    en: {
      title: 'Answers customers can rely on', buyer: 'A team repeatedly answering questions about one product or service',
      outcome: 'An approved answer library, source references and a clear escalation list.',
      proof: 'A question test set and examples that trace answers to the right documents.',
      ai: 'Cluster questions and draft answers from permitted documents.',
      human: 'Approve policies, resolve conflicting documents and define response boundaries.',
      experiment: 'Make a small prototype using real questions with personal information removed.',
      boundary: 'Keep confidential data and unsupported answers out; preserve a human escalation route.'
    }
  },
  {
    id: 'editorial-kit', group: 'content', target: 'execution',
    fa: {
      title: 'از یک گفت‌وگو تا یک بستهٔ محتوا', buyer: 'متخصصی که تجربه دارد و برای تدوین آن وقت کم دارد',
      outcome: 'یک مصاحبهٔ تدوین‌شده، مقالهٔ اصلی و چند خروجی متناسب با کانال‌های مشخص.',
      proof: 'ردیابی ادعاها به گفت‌وگو، نمونهٔ لحن و تأیید نهایی صاحب محتوا.',
      ai: 'رونویسیِ مجاز، پیشنهاد ساختار و ساخت پیش‌نویس‌های متفاوت.',
      human: 'حفظ معنا و صدا، بررسی ادعا و انتخاب آنچه ارزش انتشار دارد.',
      experiment: 'یک گفت‌وگوی کوتاه را با اجازه ضبط کن و فقط یک بستهٔ نمونه تحویل بده.',
      boundary: 'تجربه و نقل‌قول ساختگی یا انتشار بدون تأیید صاحب محتوا مجاز نیست.'
    },
    en: {
      title: 'One conversation, a coherent content kit', buyer: 'An expert with experience but little time to shape it',
      outcome: 'An edited interview, one central article and adaptations for named channels.',
      proof: 'Claims traceable to the conversation, a voice sample and the expert’s final approval.',
      ai: 'Permitted transcription, structural suggestions and alternative drafts.',
      human: 'Preserve meaning and voice, check claims and choose what deserves publication.',
      experiment: 'Record a short interview with permission and deliver one sample kit.',
      boundary: 'Do not invent experience or quotations, or publish without the speaker’s approval.'
    }
  },
  {
    id: 'campaign-kit', group: 'design', target: 'execution',
    fa: {
      title: 'یک سیستم بصری برای یک کمپین', buyer: 'برندی با یک پیشنهاد روشن و خروجی‌های پراکنده',
      outcome: 'قواعد بصری، چند قالب هماهنگ و راهنمای استفاده برای یک کمپین مشخص.',
      proof: 'نمونه‌های سازگار در چند اندازه و فایل‌هایی که تیم مشتری می‌تواند ادامه دهد.',
      ai: 'کاوش ترکیب‌بندی، تولید واریانت و آماده‌سازی اولیهٔ اندازه‌ها.',
      human: 'جهت هنری، دقت نمایش محصول، حقوق دارایی‌ها و کنترل کیفیت خروجی.',
      experiment: 'برای یک محصول واقعی، یک مجموعهٔ کوچک بساز و آن را در اندازهٔ انتشار بررسی کن.',
      boundary: 'نمای محصول باید با واقعیت تطبیق داشته باشد؛ واریانت تصویری، نتیجهٔ آزمایش تبلیغ نیست.'
    },
    en: {
      title: 'A visual system for one campaign', buyer: 'A brand with a clear offer and inconsistent creative assets',
      outcome: 'Visual rules, coordinated templates and a usage guide for one defined campaign.',
      proof: 'Consistent examples at several sizes and files the client team can maintain.',
      ai: 'Explore compositions, generate variants and prepare initial size adaptations.',
      human: 'Art direction, product accuracy, asset rights and output quality.',
      experiment: 'Build a small set for a real product and inspect it at publication size.',
      boundary: 'Represent the product accurately; a creative variant is not an advertising test result.'
    }
  },
  {
    id: 'service-prototype', group: 'design', target: 'technology',
    fa: {
      title: 'نمونهٔ تعاملی یک تجربهٔ خدمت', buyer: 'تیمی که می‌خواهد یک جریان جدید را پیش از ساخت بررسی کند',
      outcome: 'نمونهٔ قابل کلیک از یک کار مشخص، همراه حالت خطا و راهنمای تحویل.',
      proof: 'مشاهدهٔ انجام همان کار توسط کاربر و ثبت نقاط ابهام.',
      ai: 'ساخت پیش‌نویس متن رابط، حالت‌های اولیه و اجزای سادهٔ نمونه.',
      human: 'معماری تجربه، دسترس‌پذیری، منطق حالت‌ها و تفسیر بازخورد.',
      experiment: 'یک جریان کوتاه مثل درخواست مشاوره را نمونه‌سازی و با کاربر امتحان کن.',
      boundary: 'نمونهٔ نمایشی را محصول آمادهٔ بهره‌برداری معرفی نکن.'
    },
    en: {
      title: 'An interactive service prototype', buyer: 'A team testing a new workflow before implementation',
      outcome: 'A clickable prototype of one task, including an error state and handover notes.',
      proof: 'Observed task completion and a record of where users become confused.',
      ai: 'Draft interface copy, initial states and simple prototype components.',
      human: 'Experience architecture, accessibility, state logic and interpretation of feedback.',
      experiment: 'Prototype a short journey such as requesting a consultation, then test it with a user.',
      boundary: 'Do not present a demonstration prototype as production-ready software.'
    }
  },
  {
    id: 'intake-flow', group: 'systems', target: 'technology',
    fa: {
      title: 'ورودی منظم برای درخواست‌ها', buyer: 'تیمی که درخواست‌ها را میان فرم، ایمیل و فایل گم می‌کند',
      outcome: 'یک جریان مشخص برای دریافت، دسته‌بندی و ارجاع درخواست، با ثبت خطا و مسیر دستی.',
      proof: 'آزمون با دادهٔ نمونه، سناریوی خطا و امکان بازگشت به روش قبلی.',
      ai: 'پیشنهاد دسته‌بندی یا خلاصه‌سازی محتوای مجاز.',
      human: 'تعیین دسترسی، اعتبارسنجی، کنترل عملیات حساس و نگه‌داری.',
      experiment: 'یک گام کم‌ریسک را جدا کن و نخست با دادهٔ ساختگیِ برچسب‌خورده آزمایش کن.',
      boundary: 'تغییر اطلاعات مشتری، پرداخت و حذف را بدون مجوز و کنترل مناسب خودکار نکن.'
    },
    en: {
      title: 'An orderly request intake', buyer: 'A team losing requests between forms, email and files',
      outcome: 'One defined intake, categorization and routing flow with error logging and a manual path.',
      proof: 'Sample-data tests, a failure scenario and a route back to the previous process.',
      ai: 'Suggest categories or summarize permitted content.',
      human: 'Set access, validate data, control sensitive actions and maintain the workflow.',
      experiment: 'Isolate a low-risk step and first test it with clearly labelled synthetic data.',
      boundary: 'Do not automate customer-record changes, payments or deletion without suitable authorization and controls.'
    }
  },
  {
    id: 'decision-report', group: 'systems', target: 'strategy',
    fa: {
      title: 'گزارشی که به یک تصمیم ختم می‌شود', buyer: 'مدیری با داده‌های پراکنده و پرسش تجاری مشخص',
      outcome: 'یک گزارش تکرارپذیر برای یک تصمیم، با تعریف شاخص و امکان برگشت به دادهٔ مبنا.',
      proof: 'بازمحاسبهٔ دستی یک نمونه و توضیح اختلاف‌ها یا داده‌های مفقود.',
      ai: 'پیش‌نویس خلاصه و پیشنهاد پرسش‌های پیگیری پس از محاسبهٔ معتبر.',
      human: 'تعریف درست شاخص، کنترل کیفیت داده و تفسیر محدودیت‌ها.',
      experiment: 'با یک فایل مجاز و یک پرسش، نسخهٔ ساده‌ای بساز که قابل بازبینی باشد.',
      boundary: 'همبستگی را علت و دادهٔ مفقود را صفر فرض نکن.'
    },
    en: {
      title: 'A report that serves one decision', buyer: 'A manager with scattered data and a specific business question',
      outcome: 'A repeatable report for one decision, with metric definitions and traceable source data.',
      proof: 'A manually recalculated sample and explanations for discrepancies or missing data.',
      ai: 'Draft a summary and suggest follow-up questions after valid calculations.',
      human: 'Define metrics correctly, check data quality and interpret limitations.',
      experiment: 'Use one permitted file and one question to make a simple, reviewable report.',
      boundary: 'Do not treat correlation as causation or missing data as zero.'
    }
  },
  {
    id: 'team-lab', group: 'teaching', target: 'ai-tools',
    fa: {
      title: 'کارگاه حول یک کار واقعی تیم', buyer: 'تیمی که ابزار AI دارد ولی روش استفادهٔ مشترک ندارد',
      outcome: 'یک تمرین مرتبط با کار، معیار بررسی خروجی و راهنمای استفادهٔ امن.',
      proof: 'انجام مستقل همان تمرین توسط شرکت‌کننده و مشاهدهٔ خطاهای باقی‌مانده.',
      ai: 'تولید مثال، پیش‌نویس تمرین و پاسخ اولیه برای نقد جمعی.',
      human: 'طراحی یادگیری، تسهیل گفت‌وگو و سنجش انتقال مهارت به کار.',
      experiment: 'با یک تیم کوچک، یک مسئله را از شروع تا بازبینی خروجی تمرین کن.',
      boundary: 'تعداد ابزارهای معرفی‌شده را جای یادگیری یا بهره‌وری سنجیده ننشان.'
    },
    en: {
      title: 'A workshop around a real team task', buyer: 'A team with AI tools but no shared working method',
      outcome: 'A relevant exercise, an output-review rubric and safe-use guidance.',
      proof: 'A participant completing the same task independently, with remaining errors observed.',
      ai: 'Generate examples, draft exercises and make an initial answer for group critique.',
      human: 'Design learning, facilitate discussion and assess transfer to actual work.',
      experiment: 'Take a small team through one problem, from the brief to reviewing the result.',
      boundary: 'Tool counts are not a substitute for demonstrated learning or measured productivity.'
    }
  },
  {
    id: 'onboarding', group: 'teaching', target: 'execution',
    fa: {
      title: 'بستهٔ شروع به کار برای یک نقش', buyer: 'تیمی که آموزش نفر جدید را هر بار از نو انجام می‌دهد',
      outcome: 'مسیر شروع، تمرین، پرسش‌های رایج و نقطه‌های کنترل برای یک نقش مشخص.',
      proof: 'تازه‌وارد بتواند یک کار نمونه را با راهنما و کمترین ابهام انجام دهد.',
      ai: 'ساختاردهی به اسناد تأییدشده و پیشنهاد پرسش و تمرین.',
      human: 'اعتبارسنجی روند واقعی و تعیین جایی که مربی باید وارد شود.',
      experiment: 'یک کار روزمره را مستند کن و اجرای آن را با یک نفر تازه بررسی کن.',
      boundary: 'اسناد داخلی را بدون اجازه به ابزار بیرونی منتقل نکن.'
    },
    en: {
      title: 'An onboarding kit for one role', buyer: 'A team repeatedly rebuilding its new-hire training',
      outcome: 'A starting path, exercise, FAQ and checkpoints for one defined role.',
      proof: 'A newcomer completing a sample task with the guide and minimal ambiguity.',
      ai: 'Structure approved documents and suggest questions and exercises.',
      human: 'Validate the actual process and decide where a mentor must step in.',
      experiment: 'Document one routine task, then observe a newcomer trying it.',
      boundary: 'Do not transfer internal documents to external tools without permission.'
    }
  },
  {
    id: 'expert-library', group: 'expertise', target: 'ai-tools',
    fa: {
      title: 'دانش تخصصیِ قابل جست‌وجو', buyer: 'متخصص یا تیمی با اسناد معتبر و دشوار برای بازیابی',
      outcome: 'ساختار موضوعی، فهرست منابع و نمونهٔ جست‌وجو با پاسخِ قابل ارجاع.',
      proof: 'پرسش‌های آزمون، ارجاع صحیح و نمایش صریحِ نبود پاسخ در منبع.',
      ai: 'پیشنهاد برچسب‌ها و بازیابی یا پیش‌نویس از محدودهٔ اسناد مجاز.',
      human: 'تأیید اعتبار منابع، کنترل دسترسی و بازبینی متخصص مسئول.',
      experiment: 'با چند سند مجاز و غیرحساس، مجموعهٔ آزمون کوچکی تعریف کن.',
      boundary: 'تصمیم پزشکی، حقوقی یا مالی را به پاسخِ بررسی‌نشدهٔ مدل واگذار نکن.'
    },
    en: {
      title: 'Searchable specialist knowledge', buyer: 'An expert or team with credible but hard-to-retrieve documents',
      outcome: 'A topic structure, source index and a search prototype with traceable answers.',
      proof: 'Test questions, correct citations and an explicit response when the sources do not answer.',
      ai: 'Suggest tags and retrieve or draft within permitted documents.',
      human: 'Validate sources, control access and retain review by the responsible specialist.',
      experiment: 'Define a small test set using a few permitted, non-sensitive documents.',
      boundary: 'Do not delegate medical, legal or financial decisions to unreviewed model output.'
    }
  },
  {
    id: 'quality-checklist', group: 'expertise', target: 'strategy',
    fa: {
      title: 'چک‌لیست تحویل از دل تجربه', buyer: 'تیمی که کیفیت یک کار به حافظهٔ چند نفر وابسته است',
      outcome: 'چک‌لیست قابل اجرا با شاهد پذیرش، استثناها و مسئول هر تصمیم.',
      proof: 'اجرای آزمایشی روی یک کار واقعی و ثبت مواردی که چک‌لیست جا انداخته است.',
      ai: 'مرتب‌کردن یادداشت‌های مجاز و پیشنهاد خلأها برای بررسی.',
      human: 'انتخاب معیار، تشخیص استثنا و تأیید کفایتِ تخصصی.',
      experiment: 'یک تحویل اخیر را مرور کن و معیارهای واقعاً مؤثر آن را بیرون بکش.',
      boundary: 'چک‌لیست کمک به تصمیم است؛ گواهی انطباق یا تضمین نبود خطا نیست.'
    },
    en: {
      title: 'A handover checklist from experience', buyer: 'A team whose quality depends on a few people’s memory',
      outcome: 'An actionable checklist with acceptance evidence, exceptions and decision owners.',
      proof: 'A trial on a real task and a record of what the checklist missed.',
      ai: 'Organize permitted notes and suggest gaps for investigation.',
      human: 'Choose criteria, recognize exceptions and confirm specialist adequacy.',
      experiment: 'Review a recent handover and extract the criteria that actually mattered.',
      boundary: 'A checklist assists decisions; it is not compliance certification or a guarantee against errors.'
    }
  }
];
