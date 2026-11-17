const both = (fa,en) => ({fa,en});

export const marketingSummary = {
  type:'marketing-summary', id:'marketing-field-guide',
  fa:{
    title:'برگه همراه مهندس بازاریابی', intro:'از اینجا مسیر رو یک‌جا مرور کن. کارت فایل‌ها رو باز کن، نقش ایجنت رو انتخاب کن و آخرش ببین برای اجرای بعدی چه چیزی هنوز کم داری.',
    credit:'بازآرایی سه برگه ارسالی Founder Thoughts & Strategies بر اساس نوشته گرگ آیزنبرگ؛ مثال کارگاه فرضی است.',
    desk:'میز کار و حافظه', deskNote:'مدل باید بدونه برای چه کسی، با چه پیشنهاد و چه محدودیتی کار می‌کنه.',
    eras:'شکل کار چطور عوض شده؟', erasNote:'روایت سورس از تغییر کار بازاریابی؛ این ردیف نمودار آماریِ هزینه یا بهره‌وری نیست.',
    memory:'شش فایل که جواب‌های تأییدشده را نگه می‌دارند', memoryHint:'هر فایل رو باز کن تا کاربردش رو در همین کارگاه ببینی.', memoryRule:'گفته مشتری و حدس دستیار در پرونده تحقیق می‌مانند؛ یک نفر باید تصمیم بگیرد کدام نکته وارد پیشنهاد رسمی کسب‌وکار شود.',
    connections:'داده و نقش ایجنت‌ها', connectionsNote:'اول دسترسی خواندن. بعد یک کار مشخص که خروجی‌اش رو می‌تونی بررسی کنی.',
    idTitle:'یک شناسه همراه همان کمپین', idNote:'این شناسه فقط برای مثال است. هر درخواست و سفارش هم شناسه یکتای خودش را لازم دارد.',
    sources:['تماس مشتری','پشتیبانی','فروش','رفتار در سایت','پرداخت'],
    records:['تبلیغ','فرم','فروش','سفارش'],
    roles:'هر نقش چه چیزی تحویل می‌دهد؟', rolesHint:'از یک نقش شروع کن. این‌ها شش مسئولیت‌اند؛ لازم نیست از روز اول شش ایجنت مستقل بسازی.',
    input:'چه چیزی می‌خواند؟',output:'چه چیزی تحویل می‌دهد؟',review:'کجا آدم بررسی می‌کند؟',failure:'اگر اطلاعات کافی نبود؟',
    controls:'مجوز داخل ابزار، نه فقط داخل متن دستور', prompt:'داخل پرامپت', promptText:'«قبل از انتشار از من بپرس.»', tools:'داخل ابزار اجرا', toolsText:'پیش‌نویس مجزا؛ تأیید همان نسخه برای انتشار؛ سقف هزینه و منع ارسال تکراری؛ گزارش خطا.',
    operation:'اجرا و مرور', operationNote:'قول مشتری باید در تبلیغ، صفحه و پاسخ فروش همان معنا را داشته باشد.',
    campaign:'یک کمپین، از ابتدا تا تصمیم', campaignNote:'مسیر کارگاه فرضی ما؛ برنامه اجرایی پیشنهادی است و نتیجه فروش واقعی ندارد.',
    week:'در طول هفته چه چیزی را مرور کنیم؟',
    start:'اولین حرکت، متناسب با کار تو',
    checklist:'قبل از اجرای بعدی بررسی کن',checkNote:'علامت‌زدن این موارد فقط مرور شخصی است؛ آمادگی یا موفقیت کمپین را تضمین نمی‌کند.',
    limits:'مرز ادعاهای سورس',limitsText:'ادعای ۱۰۰ برابر آزمایش، تخمین ۷۰٪ دقت و حد ۱٪ نرخ کلیک، معیار اثبات‌شده یا قانون عمومی این مقاله نیستند. اعداد و نتیجه‌های مثال حسابداری سورس هم سناریوی فرضی‌اند. انتخاب ابزار و نتیجه تبلیغ باید جدا بررسی شود.',
    closing:'یک گردش کار قابل‌بررسی بساز؛ دلیل اصلاح‌ها را نگه دار تا اجرای بعدی از همان نقطه بهتر شروع شود.'
  },
  en:{
    title:'The marketing engineer’s field guide',intro:'Review the whole route here. Open a knowledge file, choose an agent role, then check what is still missing before the next run.',
    credit:'Adapted from the three supplied Founder Thoughts & Strategies sheets based on Greg Isenberg’s article. The studio examples are fictional.',
    desk:'Desk and memory',deskNote:'Give the assistant an audience, an approved offer and the limits it must work within.',
    eras:'How the work has changed',erasNote:'The source’s account of changing marketing work, not a statistical cost or productivity chart.',
    memory:'Six files for approved business knowledge',memoryHint:'Open a file to see what it would hold for the studio.',memoryRule:'Customer observations and assistant hypotheses stay in research. A person decides what becomes an approved business claim.',
    connections:'Data and agent roles',connectionsNote:'Begin with read access and one task whose output you can evaluate.',
    idTitle:'One identifier travels with the campaign',idNote:'This identifier is illustrative. Every enquiry and order still needs its own unique ID.',
    sources:['Customer calls','Support','Sales','Site behaviour','Payments'],records:['Ad','Form','Sales','Order'],
    roles:'What does each role deliver?',rolesHint:'Start with one role. These are six responsibilities, not a requirement for six independent agents on day one.',
    input:'What does it read?',output:'What does it deliver?',review:'Where does a person check?',failure:'If information is missing?',
    controls:'Enforce permissions in the tools',prompt:'In the prompt',promptText:'“Ask me before publishing.”',tools:'In the executing tool',toolsText:'Separate drafts; approval of the exact release version; spending limits and duplicate-send checks; visible failures.',
    operation:'Run and review',operationNote:'The customer promise needs to mean the same thing in the ad, page and sales reply.',
    campaign:'One campaign, from question to decision',campaignNote:'A proposed route for our fictional studio, not a record of actual sales results.',
    week:'What should you review during the week?',start:'A first move that fits your work',
    checklist:'Before the next run',checkNote:'These marks are for your own review. They do not certify readiness or guarantee campaign performance.',
    limits:'Where the source’s claims stop',limitsText:'The 100× experiment claim, estimated 70% accuracy and 1% click-through cut-off are not established benchmarks or universal rules here. The source’s bookkeeping example is also hypothetical. Tool suitability and campaign results need separate evaluation.',
    closing:'Build one workflow you can inspect. Keep the reasons for each correction so the next run starts with better information.'
  },
  eras:[
    both({name:'تبلیغات کلاسیک',unit:'کمپین بزرگ'},{name:'Classic advertising',unit:'The big campaign'}),
    both({name:'دیجیتال',unit:'مدیریت کانال'},{name:'Digital marketing',unit:'Channel management'}),
    both({name:'رشد',unit:'آزمایش مسیر خرید'},{name:'Growth',unit:'Testing the funnel'}),
    both({name:'کمک گرفتن از AI',unit:'پیش‌نویس سریع‌تر'},{name:'AI assistance',unit:'Faster first drafts'}),
    both({name:'مهندسی بازاریابی',unit:'ساخت و سنجش گردش کار'},{name:'Marketing engineering',unit:'Build and measure a workflow'})
  ],
  files:[
    {id:'start',path:'START-HERE.md',...both({title:'از اینجا شروع کن',note:'کسب‌وکار، اولویت و محل بقیه اطلاعات.',example:'این کمپین برای کافه‌هاست. پیشنهاد فعلی درخواست نمونه است؛ متن تأییدشده و موجودی از فایل پیشنهاد خوانده شود.'},{title:'Start here',note:'The business, priority and where to find the rest.',example:'This campaign serves cafés. Its current offer is a sample request. Read confirmed terms and availability from the offer record.'})},
    {id:'fit',path:'company/customer-fit.md',...both({title:'مشتری مناسب',note:'برای چه کسی می‌توانیم ارزش بسازیم؟',example:'نیاز کافه به سفارش چندتایی را از خرید شخصی جدا کن. اگر تعداد یا نوع مصرف معلوم نیست، سؤال بپرس.'},{title:'Customer fit',note:'Who can the business serve well?',example:'Distinguish a café’s batch order from a personal purchase. Ask when quantity or intended use is unknown.'})},
    {id:'offers',path:'company/offers.md',...both({title:'پیشنهاد و قول مجاز',note:'چه می‌فروشیم و چه چیزی تأیید می‌خواهد؟',example:'ارسال دو روزه فقط برای نمونه رنگ موجود است. زمان سفارش کامل تا تأیید تولید مشخص نیست.'},{title:'Offer and permitted claims',note:'What is sold and what needs approval?',example:'Two-day dispatch applies only to an available colour sample. Full-order timing remains unknown until production confirms it.'})},
    {id:'voice',path:'brand/voice.md',...both({title:'لحن با مثال',note:'نمونه پذیرفته و ردشده، همراه دلیل.',example:'«نمونه رنگ را ببین» پذیرفته است. «رنگ کاملاً یکسان در هر نور» رد شده، چون قابل‌تضمین نیست.'},{title:'Voice through examples',note:'Accepted and rejected wording, with reasons.',example:'“See a colour sample” is acceptable. “Exactly the same colour under every light” is rejected because it cannot be guaranteed.'})},
    {id:'opinions',path:'brand/founder-opinions.md',...both({title:'دیدگاه صاحب کسب‌وکار',note:'نظر مشخص با امضای صاحب آن.',example:'اگر صاحب کارگاه می‌گوید «قبل از سفارش عمده، نمونه را ببین»، به‌عنوان دیدگاه او ثبت کن؛ از طرفش نظر نساز.'},{title:'The founder’s perspective',note:'Specific opinions, attributed to their owner.',example:'If the owner says “See a sample before a batch order,” record that as their view. Do not invent a position on their behalf.'})},
    {id:'lessons',path:'decisions/failed-campaigns.md',...both({title:'اشتباه و یادگیری',note:'چه چیزی خراب شد و چه اصلاحی لازم بود؟',example:'در مثال مقاله، کلمه «نمونه» از تبلیغ افتاد. اصلاح: هر وعده ارسال باید نام چیزی را که ارسال می‌شود داشته باشد.'},{title:'Mistakes and learning',note:'What went wrong and what needed to change?',example:'In the article’s example, “sample” disappeared from the ad. Correction: every dispatch promise must name the item being dispatched.'})}
  ],
  agents:[
    {id:'voice',...both({name:'زبان مشتری',task:'از همین‌جا شروع کن',input:'گفت‌وگوها و سؤال‌های مجاز مشتری، با ارجاع به متن اصلی.',output:'عبارت مشتری، مسئله احتمالی و سؤال بی‌پاسخ؛ هر کدام جدا.',review:'فروش، برداشت و تکراری‌نبودن افراد را بررسی می‌کند.',failure:'گزارش می‌دهد چه گفت‌وگوهایی در دسترس نبود؛ فراوانی را حدس نمی‌زند.'},{name:'Customer language',task:'A useful first role',input:'Permitted conversations and questions, with original references.',output:'The buyer’s words, a possible problem and an open question, kept separate.',review:'Sales checks the interpretation and duplicate mentions.',failure:'Names unavailable records instead of guessing how common a concern is.'})},
    {id:'trigger',...both({name:'نشانه خرید',task:'دلیل تماس به‌موقع',input:'رویداد قابل‌بررسی، مثل اعلام افتتاح یک شعبه تازه کافه.',output:'توضیح اینکه این اتفاق چه نیازی می‌سازد و پیش‌نویس تماس مرتبط.',review:'فروش، تناسب پیشنهاد و اجازه تماس را بررسی می‌کند.',failure:'رویداد نامطمئن یا ارتباط مبهم را وارد صف ارسال نمی‌کند.'},{name:'Buying trigger',task:'A reason for timely contact',input:'A verifiable event, such as a café announcing a new branch.',output:'A specific need created by that event and a relevant outreach draft.',review:'Sales checks offer fit and contact permissions.',failure:'Unverified events and weak connections stay out of the sending queue.'})},
    {id:'search',...both({name:'جست‌وجو',task:'پاسخ پیش از خرید',input:'سؤال فروش، گزارش جست‌وجوی سایت و اطلاعات تأییدشده محصول.',output:'طرح صفحه‌ای که انتخاب نمونه، رنگ یا شرایط استفاده را روشن کند.',review:'متخصص محصول، پاسخ فنی و منبع هر قول را چک می‌کند.',failure:'رتبه یا معرفی‌شدن در پاسخ AI را تضمین نمی‌کند.'},{name:'Search',task:'Answer before purchase',input:'Sales questions, search reports and approved product information.',output:'A page brief that clarifies samples, colour or usage conditions.',review:'A product specialist checks technical answers and supporting evidence.',failure:'Does not promise a ranking or inclusion in an AI answer.'})},
    {id:'creative',...both({name:'محتوای تبلیغ',task:'ایده‌های متفاوت',input:'مسئله مشتری، پیشنهاد تأییدشده و عکس واقعی محصول.',output:'پیش‌نویس‌هایی با دلیل خرید متفاوت، همراه نام ایده و نسخه.',review:'آدم، صحت محصول و قول تبلیغ را پیش از انتشار می‌سنجد.',failure:'نبود عکس یا مشخصات را با تغییر خیالی محصول جبران نمی‌کند.'},{name:'Creative',task:'Different reasons to buy',input:'Buyer concerns, the approved offer and real product photos.',output:'Draft concepts with distinct buying reasons, named and versioned.',review:'A person checks product accuracy and claims before publication.',failure:'Missing photos or specifications do not justify inventing product features.'})},
    {id:'lost',...both({name:'فرصت ازدست‌رفته',task:'شرط شروع دوباره',input:'دلیل واقعی خریدنشدن، یادداشت فروش و ترجیح تماس مشتری.',output:'شرط پیگیری؛ مثلاً موجودشدن رنگی که قبلاً خواسته بود.',review:'فروش، تغییر واقعی شرایط و مجازبودن پیام را تأیید می‌کند.',failure:'بدون تغییر شرایط، پیام تکراری نمی‌سازد؛ انصراف مشتری رعایت می‌شود.'},{name:'Closed-lost follow-up',task:'A reason to reopen',input:'The actual lost-deal reason, sales notes and contact preferences.',output:'A reopening condition, such as availability of the requested glaze.',review:'Sales confirms that something changed and contact is permitted.',failure:'No repetitive message without a relevant change; opt-outs are respected.'})},
    {id:'performance',...both({name:'بررسی عملکرد',task:'گزارش برای تصمیم',input:'شناسه کمپین، هزینه، نتیجه تماس، سفارش و بازپرداخت موجود.',output:'پیشنهاد ادامه، اصلاح یا توقف، با دلیل و محدودیت داده.',review:'مسئول کمپین، تعریف عددها و کفایت شواهد را بررسی می‌کند.',failure:'منبع قطع‌شده، پرداخت نامعلوم یا داده قدیمی را پنهان نمی‌کند.'},{name:'Performance review',task:'A report for a decision',input:'Campaign ID, cost, follow-ups, orders and available refund records.',output:'A continue, revise or stop proposal with evidence and limitations.',review:'The campaign owner checks definitions and whether evidence is sufficient.',failure:'Failed sources, unknown payments and stale records remain visible.'})}
  ],
  campaign:[
    both({title:'سؤال',text:'رنگ فنجان زیر نور کافه چطور دیده می‌شود؟'},{title:'Question',text:'How will the glaze look under the café lights?'}),
    both({title:'پیشنهاد',text:'شرایط نمونه با تولید تأیید شود.'},{title:'Offer',text:'Confirm sample terms with production.'}),
    both({title:'ساخت و تأیید',text:'تبلیغ، صفحه و پاسخ فروش؛ یک قول و نسخه مشخص.'},{title:'Build and approve',text:'Ad, page and sales reply share one versioned promise.'}),
    both({title:'تصمیم',text:'درخواست تا سفارش پیگیری شود؛ جای خالی هم ثبت شود.'},{title:'Decision',text:'Follow enquiries to orders and retain the gaps.'})
  ],
  week:[
    both({title:'مرور نتیجه',text:'چه چیزی ادامه پیدا کند؟'},{title:'Review',text:'What is worth continuing?'}),
    both({title:'اصلاح کار',text:'کدام ورودی یا دستور خراب بود؟'},{title:'Repair',text:'Which input or instruction failed?'}),
    both({title:'شنیدن مشتری',text:'فروش و پشتیبانی چه دیدند؟'},{title:'Listen',text:'What did sales and support hear?'}),
    both({title:'ثبت یادگیری',text:'دلیل تغییر برای اجرای بعد بماند.'},{title:'Record',text:'Keep the reason for the next run.'})
  ],
  starters:[
    both({title:'مارکتر',text:'یک گفت‌وگو را به سفارش کار قابل‌بررسی تبدیل کن.'},{title:'Marketer',text:'Turn a buyer conversation into a reviewable brief.'}),
    both({title:'سازنده وب',text:'مسیر واقعی مشتری را ببین؛ بعد یک صفحه و فرم بساز.'},{title:'Web builder',text:'Observe a real buying process, then build a page and form.'}),
    both({title:'صاحب کسب‌وکار',text:'قول‌های مجاز و نظرهای خودت را با مثال ثبت کن.'},{title:'Business owner',text:'Document permitted promises and your own views with examples.'})
  ],
  checks:[
    both('اطلاعات کسب‌وکار و پیشنهاد تأییدشده در دسترس است.','Approved business knowledge and offer terms are available.'),
    both('شناسه کمپین تا رکورد فروش همراه می‌ماند.','The campaign ID survives into the sales record.'),
    both('دسترسی هر نقش به کار لازم محدود است.','Each role has only the access its task needs.'),
    both('یک کار را پیش از اضافه‌کردن نقش بعدی آزمایش کرده‌ام.','I have tested one workflow before adding another role.'),
    both('انتشار، ارسال و هزینه به تأیید همان نسخه وابسته‌اند.','Publishing, sending and spending require approval of that version.'),
    both('می‌دانم کدام نتیجه معلوم است و چه داده‌ای هنوز ندارم.','I can distinguish known results from missing evidence.')
  ]
};
