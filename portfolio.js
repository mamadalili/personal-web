'use strict';
// Content is based on the supplied résumé. Dates remain in the Solar Hijri calendar.
const employerWebsites={boomerang:['https://www.boomerangkala.com/','https://www.boomerang-co.com/'],turbin:'https://onlinetahrir.com/',asiatech:'https://asiatech.ir/','safir-lead':'https://gosafir.com/','safir-field':'https://gosafir.com/',binici:'https://binicitradinggroup.com/',datis:'https://datisint.com/',can:'https://can.ir/'};
const career = [
  {logo:{"src":"assets/companies/boomerang.webp","width":3621,"height":1148},id:'boomerang',mark:'B',years:'1405',fa:{company:'بومرنگ',role:'مسئول فروش آنلاین',sector:"تولید و بازرگانی روشویی و شیرآلات",points:["کانال‌های فروش آنلاین بومرنگ رو راه انداختم و کار مدیریت و توسعه‌شون رو پیش بردم.",'برای فروش خارجی، کار راه‌اندازی و مدیریت فروش روی سایت چهارزبانه رو به عهده داشتم.'],tags:['فروش آنلاین','توسعهٔ کانال فروش',"تجارت الکترونیک و اپراتوری هوش مصنوعی"]},en:{company:'Boomerang',role:'Online Sales Lead',sector:"Bathroom furniture and faucet manufacturing and trade",points:["I launched, managed and expanded Boomerang’s online sales channels.",'I set up and managed international online sales through a four-language website.'],tags:['Online sales','Channel development',"E-commerce and AI operations"]}},
  {logo:{src:'assets/companies/online-tahrir.webp',width:512,height:512},id:'turbin',mark:'OT',years:'1404–1405',fa:{company:'آنلاین تحریر',role:'سرپرست دیجیتال مارکتینگ',sector:'دیجیتال مارکتینگ و فروش آنلاین',points:['فروش آنلاین رو از راه‌اندازی تا کارهای روزمرهٔ فروشگاه مدیریت کردم.','تیم پنج‌نفرهٔ دیجیتال، محتوا و پشتیبانی فروش آنلاین رو هدایت می‌کردم.'],tags:["مدیریت تیم و اپراتوری هوش مصنوعی",'دیجیتال مارکتینگ','E-Commerce']},en:{company:'Online Tahrir',role:'Digital Marketing Supervisor',sector:'Digital marketing & online sales',points:['I launched online sales and managed day-to-day e-commerce operations.','I led a five-person team covering digital channels, content and online sales support.'],tags:["Team leadership and AI operations",'Digital marketing','E-commerce']}},
  {logo:{"src":"assets/companies/can.webp","width":713,"height":429},id:'can',mark:'C',years:'1401–1404',fa:{company:'لوازم خانگی کن',role:'کارشناس بازاریابی',sector:'لوازم خانگی',points:['روی استراتژی بازاریابی کار کردم و برای تبلیغات آنلاین و آفلاین بودجه می‌چیدم.','بخشی از کارم بازاریابی در نمایشگاه‌های بین‌المللی بود و بخشی آماده‌کردن محتوای دیجیتال برای شبکهٔ فروش.'],tags:['استراتژی بازاریابی',"بودجه‌بندی و برنامه‌ریزی",'رویداد و محتوا']},en:{company:'CAN',role:'Marketing Specialist',sector:'Home appliances',points:['I developed marketing strategy and planned budgets for online and offline advertising.','My work included marketing at international exhibitions and preparing digital content for the sales network.'],tags:['Marketing strategy',"Budgeting and planning",'Events & content']}},
  {logo:{"src":"assets/companies/datis.webp","width":215,"height":235},id:'datis',mark:'D',years:'1400–1401',fa:{company:'پویش رایان داتیس',role:'کارشناس بازاریابی و تحقیقات بازار',sector:'تحقیقات بازار و ورود به بازار',points:['برنامه می‌چیدم که چه اطلاعاتی رو باید از بازار بپرسیم و کدوم رو می‌شه از داده‌های آنلاین و منابع موجود به دست آورد.','از نتیجهٔ تحقیق برای برنامه و بودجهٔ بازاریابی محصولات موجود و تازه استفاده می‌کردم.'],tags:['تحقیقات بازار','Go-to-market',"تحلیل داده و برنامه‌ریزی بازاریابی"]},en:{company:'Pouyesh Rayan Datis',role:'Marketing & Market Research Specialist',sector:'Market research & go-to-market',points:['I planned what to ask in the field and what we could learn from existing research and online data.','I used the findings to plan marketing and budgets for both existing and new products.'],tags:['Market research','Go-to-market',"Data analysis and marketing planning"]}},
  {logo:{"src":"assets/companies/binici.webp","width":509,"height":392},id:'binici',mark:'Bi',years:'1399–1400',fa:{company:'بازرگانی بی‌نی‌سی',role:'کارشناس فروش',sector:'استراتژی فروش و تحلیل داده',points:['برای برنامه‌ریزی بازاریابی، گزارش‌های فروش رو توی داشبورد هوش تجاری بررسی می‌کردم.','برای تعیین بودجه، تقاضای بازار و برنامهٔ فروش هر محصول رو کنار هم می‌گذاشتم.'],tags:['هوش تجاری','استراتژی فروش',"بودجه‌بندی و مهندسی فروش"]},en:{company:'BiNiCi Trading',role:'Sales Specialist',sector:'Sales strategy & analytics',points:['I used the sales dashboard to plan marketing activities.','I set budgets using market demand and the sales plan for each product.'],tags:['Business intelligence','Sales strategy',"Budgeting and sales engineering"]}},
  {logo:{"src":"assets/companies/safir.webp","width":300,"height":235},id:'safir-lead',mark:'S',years:'1393–1399',fa:{company:'مؤسسه زبان سفیر',role:'سرپرست بازاریابی',sector:'آموزش و بازاریابی خدمات',points:['برای هر منطقه برنامهٔ بازاریابی آنلاین و آفلاین می‌چیدم و اجراش رو پیش می‌بردم.','با بخش صدای مشتری هماهنگ بودم و روی معرفی خدماتی کار می‌کردم که کنار کلاس زبان ارائه می‌شدن.','دو نمونه از کارم معرفی برنامهٔ یادگیری زبان در سینما و تورهای یک‌روزه به زبان انگلیسی بود.'],tags:['استراتژی و اجرا','صدای مشتری','بازاریابی خدمات']},en:{company:'Safir Language Academy',role:'Marketing Supervisor',sector:'Education & service marketing',points:['I planned and ran online and offline marketing by region.','I worked with the customer feedback team and marketed services offered alongside language classes.','Two examples were promoting language learning at the cinema and day trips conducted in English.'],tags:['Strategy & execution','Voice of customer','Service marketing']}},
  {logo:{"src":"assets/companies/safir.webp","width":300,"height":235},id:'safir-field',mark:'S',years:'1391–1393',fa:{company:'مؤسسه زبان سفیر',role:'کارشناس بازاریابی منطقه‌ای',sector:'بازاریابی میدانی و ارتباط مستقیم',points:['در مراکز خرید و شعب سفیر برای تبلیغات حضوری برنامه می‌چیدم و استقرار کانتر و نیروها رو هماهنگ می‌کردم.','به سازمان‌های منطقه سر می‌زدم، اطلاعات جمع می‌کردم و با مخاطب‌هایی که شناسایی کرده بودیم تماس می‌گرفتم.'],tags:['بازاریابی میدانی','تبلیغات محیطی','جذب سرنخ']},en:{company:'Safir Language Academy',role:'Regional Marketing Specialist',sector:'Field & outbound marketing',points:['I planned in-person campaigns and coordinated promotional counters and staff in shopping centres and Safir branches.','I visited local organisations, gathered information and followed up with prospective customers.'],tags:['Field marketing','Offline campaigns','Lead generation']}},
  {logo:{"src":"assets/companies/asiatech.webp","width":1036,"height":406},id:'asiatech',mark:'A',years:'1387–1390',fa:{company:'آسیاتک',role:'کارشناس نصب و پشتیبانی اینترنت',sector:'فناوری و پشتیبانی',points:['اینترنت مشترک‌ها رو نصب می‌کردم و برای رفع مشکل اتصال پشتیبانی می‌دادم.'],tags:['پشتیبانی فنی','خدمات اینترنت']},en:{company:'Asiatech',role:'Internet Installation & Support Specialist',sector:'Technology & support',points:['I installed customers’ internet connections and helped them troubleshoot connection problems.'],tags:['Technical support','Internet services']}}
].map(role=>({...role,website:employerWebsites[role.id]}));
const projects = [
  {icon:'⌘',fa:{title:"وب‌سایت شخصی",sub:'Personal Web / طراحی و توسعه وب',body:"همین سایتیه که داری می‌خونی. اینجا دربارهٔ کارهام می‌نویسم و توی هر دو نسخهٔ فارسی و انگلیسی می‌تونی مثال‌های بلاگ رو خودت امتحان کنی.",tags:['HTML / CSS / JavaScript','دو‌زبانه']},en:{title:"Personal website",sub:'Personal Web / Web development',body:"You’re reading it now. I write about my work here, and you can try the blog’s examples in Persian or English.",tags:['HTML / CSS / JavaScript','Bilingual']} ,url:'https://github.com/mamadalili/personal-web'},
  {icon:'↗',fa:{title:'توسعهٔ فروش آنلاین و بین‌المللی',sub:"بومرنگ",body:"در بومرنگ کانال‌های فروش آنلاین رو راه انداختم و مدیریت کردم. برای بازار داخلی فروشگاه اینترنتی راه افتاد و برای فروش خارجی سایت چهارزبانه.",tags:['فروش آنلاین','سایت چهارزبانه']},en:{title:'Online & international sales',sub:"Boomerang",body:"At Boomerang I launched and managed online sales channels. The work included an online shop for domestic buyers and a four-language site for international sales.",tags:['Online sales','Four-language website']}},
  {icon:'◎',fa:{title:"راه‌اندازی و مدیریت فروش آنلاین",sub:"آنلاین تحریر",body:"در آنلاین تحریر با یک تیم پنج‌نفره فروش آنلاین رو راه انداختیم. مسئولیت من هماهنگ‌کردن فروشگاه و مارکت‌پلیس‌ها، شبکه‌های اجتماعی، تأمین کالا و خدمات بعد از خرید بود.",tags:["فروش آنلاین، حضور دیجیتال و اپراتوری AI",'عملیات فروش']},en:{title:"Launching and managing online sales",sub:"Online Tahrir",body:"At Online Tahrir I led a team of five to launch online sales. I coordinated the store and marketplaces, social media, sourcing and after-sales service.",tags:["Online sales, digital presence and AI operations",'Sales operations']}},
  {icon:'⌘',url:'https://github.com/mamadalili/cpc-final-draft',fa:{title:'وب‌سایت بادران پنوماتیک',sub:'وب‌سایت صنعتی CPC',body:'سایت بادران پنوماتیک رو با WordPress و PHP ساختم. خریدار می‌تونه شیرآلات صنعتی رو بر اساس دسته پیدا کنه و کاتالوگشون رو ببینه. برای نمایش محصولات هم قالب‌های HTML اختصاصی ساختم.',tags:['WordPress','PHP','HTML / CSS / JavaScript','مرور دسته‌بندی محصولات']},en:{title:'Badran Pneumatic website',sub:'CPC Valve Industry',body:'I built Badran Pneumatic’s site with WordPress and PHP. Buyers can browse industrial valves by category and find the catalogues. I made custom HTML templates for the product pages.',tags:['WordPress','PHP','HTML / CSS / JavaScript','Category-driven browsing']}},
  {icon:'⌘',url:'https://github.com/mamadalili/tina-nail-atelier',fa:{title:'وب‌سایت آتلیهٔ ناخن تینا',sub:'معرفی خدمات و رزرو وقت',body:'وب‌سایت فارسی آتلیهٔ ناخن تینا با معرفی خدمات، انتخاب رنگ و رزرو وقت با تقویم شمسی. پنل مدیریت برای دیدن و تغییر نوبت‌ها و بستن ساعت‌ها ساخته شده و تقویم هر متخصص جداست.',tags:['رزرو آنلاین','تقویم شمسی','پنل مدیریت']},en:{title:'Tina nail atelier website',sub:'Services and appointment booking',body:'A Persian website for Tina nail atelier, with service details, colour selection and appointment booking through a Jalali calendar. The management panel supports reviewing and changing bookings and closing time slots, with a separate calendar for each specialist.',tags:['Online booking','Jalali calendar','Management panel']}}

];
const copy = {
  fa:{name:'محمدرضا دلیلی',brand:'محمدرضا دلیلی',portfolio:'پورتفولیوی شخصی',role:'مارکتر و اپراتور هوش‌مصنوعی',location:'تهران، ایران',bio:"کارم از جایی شروع می‌شه که کسی دنبال یک محصول می‌گرده. چطور پیداش می‌کنه، برای انتخابش چه اطلاعاتی کم داره و موقع خرید کجا گیر می‌کنه؟ این سؤال‌ها بازاریابی، فروش و فناوری رو توی کار من به هم وصل می‌کنن.",aboutMe:'دربارهٔ من',focus:'حوزه‌های فعالیت',skills:['E-Commerce','استراتژی دیجیتال','SEO / CRO','تحلیل داده','توسعه وب'],connect:'بیایید در ارتباط باشیم',email:'ایمیل',eyebrow:'مسیر حرفه‌ای من',headline:'تجربه، داده و فناوری<br>برای <em>رشد فروش آنلاین.</em>',intro:"بیش از ۱۸ ساله که کار می‌کنم. از نصب و پشتیبانی اینترنت شروع کردم، بعد رفتم سراغ تحقیقات بازار، برنامه‌ریزی بازاریابی و راه‌اندازی فروش آنلاین.",stats:[["۱۸+",'سال سابقهٔ حرفه‌ای'],['۲۰×','رشد فروش آنلاین، تا'],['۱۰۰×','رشد ورودی سایت، تا']],tabs:['تجربه‌های کاری','پروژه‌ها','دربارهٔ من','ارتباط'],experience:'مسیر کاری',experienceSub:'یک شرکت رو انتخاب کن تا ببینی اونجا چه کاری به عهده‌ام بود.',scope:'فعالیت‌ها و مسئولیت‌ها',projectHeading:'منتخبی از کارها',projectSub:'از فروشگاه آنلاین تا کاتالوگ صنعتی، اینجا می‌تونی کار من رو در هر پروژه ببینی.',repo:'مشاهده در گیت‌هاب ↗',aboutHeading:'کمی بیشتر دربارهٔ من',aboutSub:'بازاریابی، فناوری و یادگیری مداوم',longBio:"در آسیاتک اینترنت نصب می‌کردم و پشتیبانی می‌دادم. بعد در سفیر با بازاریابی میدانی آشنا شدم. امروز بیشتر وقتم رو روی فروشگاه و کانال‌های فروش آنلاین می‌ذارم. وقتی می‌خوام چیزی رو بهتر کنم، اول می‌پرسم الان خریدار چه کاری انجام می‌ده و از کجا می‌فهمیم تغییر کمکش کرده. برای تحقیق، اجرا و بررسی کار هم از AI کمک می‌گیرم و نتیجه رو خودم چک می‌کنم.",education:'تحصیلات',degrees:[['کارشناسی ارشد مهندسی نرم‌افزار','دانشگاه غیرانتفاعی کاشان','۱۳۹۷–۱۴۰۰'],['کارشناسی مهندسی نرم‌افزار','دانشگاه آزاد کاشان','۱۳۸۷–۱۳۹۲']],capabilities:'تخصص‌ها و ابزارها',capabilityItems:[["بازاریابی و فروش دیجیتال",'استراتژی دیجیتال، SEO، CRO و بهینه‌سازی تجربهٔ کاربر'],['تحلیل و اندازه‌گیری','Google Analytics، Search Console و Looker Studio'],["فناوری و ابزارهای فروش",'WordPress، WooCommerce، HTML، CSS و JavaScript'],['ابزارهای کار','Codex، GitHub، Figma، Canva و ابزارهای هوش مصنوعی']],interests:'علایق',interestsText:'تکنولوژی و پیشرفت‌های علمی، هوش مصنوعی، مارکتینگ، ارتباطات و رفتارشناسی.',results:'نتایج در مسیر حرفه‌ای',resultsText:"در نقش‌های مختلف، روی راه‌اندازی فروش آنلاین، رشد فروش تا ۲۰ برابر، رشد ورودی سایت تا ۱۰۰ برابر، نرخ تبدیل تا ۲٪، مدیریت بودجهٔ چندمیلیاردی سالانه و فروش در مارکت‌پلیس‌های داخلی کار کرده‌ام.",resultsNote:"",contactHeading:'یک گفت‌وگوی تازه',contactSub:'برای صحبت دربارهٔ همکاری و پروژه‌ها',contactText:'برای صحبت دربارهٔ بازاریابی، کار با هوش‌مصنوعی یا یک پروژهٔ دیجیتال، در ارتباط باشیم.',contactEmail:'ایمیل کاری',github:'پروژه‌ها و کدها',footer:'محمدرضا دلیلی',footerNote:'ساخته‌شده با اشتیاق و خلاقیت',tabLabel:'بخش‌های پروفایل',careerLabel:'انتخاب تجربهٔ کاری',title:'محمدرضا دلیلی — مارکتر و اپراتور هوش‌مصنوعی'},
  en:{name:'Mohamad Reza Dalili',brand:'Mohamad Reza',portfolio:'Personal portfolio',role:'Marketer & AI Operator',location:'Tehran, Iran',bio:"How does someone find a product? What do they need to know to choose it, and where do they get stuck at checkout? Those questions bring marketing, sales and technology together in my work.",aboutMe:'A LITTLE ABOUT ME',focus:'AREAS OF FOCUS',skills:['E-commerce','Digital strategy','SEO / CRO','Data analytics','Web development'],connect:'Let’s connect',email:'Email',eyebrow:'MY PROFESSIONAL JOURNEY',headline:'Experience, data & technology.<br><em>Better online business.</em>',intro:"I’ve worked for more than 18 years, starting in internet installation and support, then moving into market research, marketing planning and online sales.",stats:[["18+",'years of professional experience'],['20×','online sales growth, up to'],['100×','website traffic growth, up to']],tabs:['Experience','Projects','About','Contact'],experience:'Work experience',experienceSub:'Choose a company to see what I worked on there.',scope:'Responsibilities & activities',projectHeading:'Selected work',projectSub:'From online shops to an industrial catalogue, here’s what I worked on in each project.',repo:'View on GitHub ↗',aboutHeading:'A little more about me',aboutSub:'Marketing, technology and continuous learning',longBio:"At Asiatech I installed internet connections and helped customers when something went wrong. At Safir I moved into field marketing. These days much of my work is about online shops and sales channels. Before changing something I ask what the buyer does today and how we’ll know whether the change helped. I use AI for research, production and review, and I check the results myself.",education:'Education',degrees:[['MSc in Software Engineering','Kashan Non-Profit University','1397–1400 SH'],['BSc in Software Engineering','Islamic Azad University, Kashan','1387–1392 SH']],capabilities:'Skills & tools',capabilityItems:[["Marketing & digital sales",'Digital strategy, SEO, CRO and UX optimisation'],['Analytics & measurement','Google Analytics, Search Console and Looker Studio'],["Technology & sales tools",'WordPress, WooCommerce, HTML, CSS and JavaScript'],['Everyday tools','Codex, GitHub, Figma, Canva and AI tools']],interests:'Outside the job title',interestsText:'Technology and scientific progress, artificial intelligence, marketing, communication and human behaviour.',results:'Results across my career',resultsText:"Across different roles, my work has included launching online sales, growth of up to 20× in sales and 100× in website traffic, conversion rates reaching 2%, managing annual multibillion budgets and selling through domestic marketplaces.",resultsNote:"",contactHeading:'Start a conversation',contactSub:'Let’s talk about work and projects',contactText:'Let’s talk about marketing, AI workflows and digital projects.',contactEmail:'WORK EMAIL',github:'PROJECTS & CODE',footer:'Mohamad Reza Dalili',footerNote:'Crafted with passion and creativity.',tabLabel:'Portfolio sections',careerLabel:'Choose a work experience',title:'Mohamad Reza Dalili — Marketer & AI Operator'}
};
const tabIds=['experience','projects','about','contact'];
const params=new URLSearchParams(location.search);
const pageFiles={home:'index.html',solutions:'strategy.html',blog:'blog.html',cv:'profile.html',contact:'contact.html'};
const extraPageFiles={skills:'profile.html',strategy:'strategy.html',execution:'execution.html',technology:'technology.html','ai-tools':'ai-tools.html',article:'article.html','work-stories':'work-stories.html'};
const requestedPage=document.body.dataset.page||'cv';
// Keep previously shared profile links working after introducing the homepage.
const page=requestedPage==='home'&&(params.has('tab')||params.has('role'))?'cv':requestedPage;
const navPage=page==='article'?'blog':page==='skills'?'solutions':page==='work-stories'?'cv':page;
let blogMountVersion=0;
let solutionsMountVersion=0;
let workStoriesMountVersion=0;
let careerStoriesMountVersion=0;
let disposeWorkStories=()=>{};
const siteCopy={
 fa:{nav:['خانه','راهکارها','بلاگ','CV','تماس'],navLabel:'منوی اصلی',homeLabel:'',homeTitle:'نقطه تلاقی<br><em>بازاریابی و فناوری</em>',homeIntro:'من محمدرضا دلیلی {role} در این {home} تقابل بازاریابی و فناوری بررسی می‌کنیم.',cvLabel:'پروفایل کاری',cvTitle:'مسیر کاری، پروژه‌ها و تجربه‌ها.',cvBody:'ببین در هر شرکت چه کاری به عهده داشتم و در ساخت کدوم پروژه‌ها نقش داشتم.',cvAction:'دیدن پروفایل کاری',blogLabel:'بلاگ',blogTitle:'ایده‌ها را بخوانید؛ تجربه‌شان کنید.',blogBody:"یادداشت‌های تعاملی و تجربه‌های بازاریابی، تجارت الکترونیک و فناوری.",blogAction:'رفتن به بلاگ',contactLabel:'تماس',contactTitle:'یک گفت‌وگوی تازه شروع کنیم.',contactBody:"دربارهٔ یک پروژه، فروش آنلاین یا کار با AI سؤالی داری؟ می‌تونی مستقیم بهم پیام بدی.",contactAction:'راه‌های ارتباط',blogEyebrow:'یادداشت‌های من',blogHeading:'ایده‌ها، تجربه‌ها<br>و <em>چیزهایی که یاد می‌گیرم.</em>',blogIntro:'جایی برای نوشتن دربارهٔ بازاریابی، رشد کسب‌وکار آنلاین و فناوری.',emptyTitle:'هنوز نوشته‌ای منتشر نشده.',emptyBody:'وقتی اولین یادداشت منتشر شود، همین‌جا می‌توانید آن را بخوانید.',backHome:'بازگشت به خانه',contactIntro:'برای صحبت دربارهٔ بازاریابی، کار با هوش‌مصنوعی و پروژه‌های دیجیتال، در ارتباط باشیم.',cvLink:'آشنایی با مسیر کاری من',copyright:'محمدرضا دلیلی'},
 en:{nav:['Home','Solutions','Blog','CV','Contact'],navLabel:'Main navigation',homeLabel:'',homeTitle:'Where marketing<br><em>and technology meet</em>',homeIntro:'I’m Mohamad Reza Dalili, a {role}. In this {home}, we explore the interplay between marketing and technology.',cvLabel:'Professional profile',cvTitle:'My work, projects & experience.',cvBody:'See what I was responsible for at each company and which projects I helped build.',cvAction:'Explore my CV',blogLabel:'Blog',blogTitle:'Ideas to read. Experiences to explore.',blogBody:"Interactive notes and experiences in marketing, e-commerce and technology.",blogAction:'Visit the blog',contactLabel:'Contact',contactTitle:'Start a new conversation.',contactBody:"Have a question about a project, selling online or working with AI? You can reach me directly.",contactAction:'Get in touch',blogEyebrow:'MY NOTES',blogHeading:'Ideas, experiences &<br><em>things I’m learning.</em>',blogIntro:'A space to write about marketing, online business growth and technology.',emptyTitle:'No posts published yet.',emptyBody:'When the first note is published, you’ll find it here.',backHome:'Back to home',contactIntro:'Let’s talk about marketing, AI workflows and digital projects.',cvLink:'Explore my professional journey',copyright:'Mohamad Reza Dalili'}
};
const skillsCopy={
 fa:{label:'مهارت‌ها',heroLabel:'راهکارها',eyebrow:"بازاریابی، فروش و فناوری در یک مسیر",headline:'استراتژی، اجرا و تحلیل؛<br>برای <em>حضور مؤثر در بازار دیجیتال.</em>',intro:"شناخت مخاطب، انتخاب کانال، اجرای پیام و پیگیری نتیجه را در یک مسیر می‌بینم. فناوری و ابزارهای AI را هم جایی وارد می‌کنم که به اجرای بهتر و سنجش روشن‌تر کمک کنند.",cardTitle:'از استراتژی تا اجرا و رشد.',cardBody:"شاید مشتری محصولت رو ببینه ولی برای خرید هنوز یک سؤال بی‌جواب داشته باشه. از همون سؤال شروع می‌کنم تا بفهمیم کجای کار به پیام بهتر، تغییر در فروشگاه یا کمک AI احتیاج داره.",cardAction:'دیدن راهکارها',pillars:[{icon:'market',page:'strategy',title:"استراتژی",text:"شناخت بازار و جایگاه برند؛ سپس ترسیم مسیر رشد از وضعیت امروز تا هدف کسب‌وکار."},{icon:'sales',page:'execution',title:"از اجرای بازاریابی تا موتور فروش",text:"هماهنگی منابع، پیام، کمپین و مسیر فروش؛ تا اجرا به روالی قابل پیگیری تبدیل شود."},{icon:'web',page:'technology',title:"فناوری",text:"انتخاب و ساخت ابزار مناسب برای کانال‌های فروش، داده و فرآیندهای دیجیتال."},{icon:'ai',page:'ai-tools',title:'ابزارهای AI و جریان کار',text:"هماهنگ‌کردن کارهای باز و جاری در محتوا، طراحی، کد و تحلیل با کمک AI؛ با هدف و مسئولیت روشن."}],focus:'حوزه‌های تمرکز من',focusNote:"این حوزه‌ها در پروژه‌های واقعی جدا از هم کار نمی‌کنند.",related:'تجربهٔ مرتبط',areas:[
  {icon:'sales',title:'فروش آنلاین و تجارت الکترونیک',text:'راه‌اندازی و توسعهٔ کانال‌های فروش آنلاین؛ با نگاه به تمام مسیر مشتری، از پیدا کردن محصول تا تصمیم و تکمیل خرید.',points:['توسعهٔ فروشگاه اینترنتی و هماهنگی محتوا، محصول و عملیات فروش','انتخاب و مدیریت کانال‌های فروش متناسب با بازار و مخاطب','توسعهٔ حضور آنلاین برای بازار داخلی و فروش بین‌المللی'],role:'boomerang',company:'بومرنگ'},
  {icon:'market',title:'حضور در بازار دیجیتال',text:'حضور دیجیتال از شناخت بازار و مخاطب شروع می‌شود؛ سپس به انتخاب جایگاه، پیام و کانال‌هایی می‌رسد که برای کسب‌وکار معنا دارند.',points:['تحقیقات بازار و بررسی نیاز و رفتار مخاطبان','تعریف مسیر ورود به بازار و اولویت‌بندی فرصت‌ها','هماهنگ‌کردن وب‌سایت، جست‌وجو و کانال‌های ارتباط با مشتری'],role:'datis',company:'پویش رایان داتیس'},
  {icon:'marketing',title:'استراتژی بازاریابی و محتوا',text:'تبدیل هدف کسب‌وکار به برنامه‌ای روشن برای ارتباط با مخاطب؛ با پیامی منسجم در نقاط تماس آنلاین و آفلاین.',points:['برنامه‌ریزی بازاریابی بر اساس هدف، مخاطب و مرحلهٔ تصمیم‌گیری','هماهنگی تولید محتوا با نیاز فروش و تجربهٔ مشتری','هدایت و هماهنگی تیم‌های دیجیتال، محتوا و پشتیبانی فروش'],role:'turbin',company:'آنلاین تحریر'},
  {icon:'ads',title:'تبلیغات و اجرای کمپین',text:'طراحی و پیگیری فعالیت‌های تبلیغاتی با هدف مشخص، بودجهٔ روشن و شاخصی که بتوان نتیجه را با آن سنجید.',points:['برنامه‌ریزی تبلیغات آنلاین و آفلاین در کنار هم','بودجه‌بندی و هماهنگی پیام، کانال و زمان‌بندی کمپین','بررسی عملکرد فعالیت‌ها و استفاده از بازخورد برای اصلاح مسیر'],role:'can',company:'لوازم خانگی کن'},
  {icon:'analytics',title:'تحلیل داده و بهینه‌سازی تبدیل',text:'استفاده از داده برای فهمیدن آنچه در مسیر فروش رخ می‌دهد؛ پیدا کردن فرصت‌های بهبود به‌جای اتکا به حدس.',points:['تعریف و پیگیری شاخص‌های بازاریابی و فروش','تحلیل ورودی و رفتار کاربران با ابزارهای اندازه‌گیری و داشبوردها','بررسی سئو، تجربهٔ کاربر و نقاط اصطکاک در مسیر خرید'],role:'binici',company:'بازرگانی بی‌نی‌سی'},
  {icon:'web',title:'محصول و اجرای فول‌استک',text:'تبدیل ایدهٔ کسب‌وکار به تجربهٔ دیجیتال قابل استفاده؛ با پیوند طراحی مسیر کاربر، توسعهٔ وب و عملیات فروش.',points:['طراحی و توسعهٔ وب‌سایت، فروشگاه و ابزار متناسب با نیاز کسب‌وکار','کار با WordPress، WooCommerce و HTML، CSS و JavaScript در اجرا','هماهنگ‌کردن تجربهٔ کاربر، داده و ملاحظات فنی و عملیاتی'],role:'boomerang',company:'بومرنگ'},
  {icon:'ai',title:'تیم اجرا با ابزارهای هوش مصنوعی',text:'به‌کارگیری ابزارهای AI در پژوهش، محتوا، طراحی، توسعه و تحلیل؛ با هدایت انسانی، کنترل کیفیت و اتصال خروجی‌ها به یک مسیر اجرایی مشترک.',points:['تعریف مسئله، انتخاب ابزار مناسب و مشخص‌کردن خروجی مورد انتظار','هماهنگی پژوهش، تولید محتوا، طراحی و کدنویسی با ابزارهای AI','بازبینی خروجی‌ها از نظر دقت، کیفیت و قابلیت استفاده در اجرا'],tab:'about',linkLabel:'ابزارها و رویکرد کاری من'}
 ]},
 en:{label:'Skills',heroLabel:'Solutions',eyebrow:"MARKETING, SALES AND TECHNOLOGY IN ONE PATH",headline:'Strategy, execution & insight.<br><em>A connected digital presence.</em>',intro:"I treat audience research, channel choice, communication and measurement as one connected job. I bring in technology and AI tools where they help the team deliver better work and measure it clearly.",cardTitle:'From strategy to execution and growth.',cardBody:"A buyer may have found your product and still have a question that holds up the order. I start there to work out whether the message, the shop or a task AI can help with needs attention.",cardAction:'Explore the solutions',pillars:[{icon:'market',page:'strategy',title:"Strategy",text:"Understand the market and brand position, then map a path from today’s position to the business goal."},{icon:'sales',page:'execution',title:"From marketing delivery to a sales engine",text:"Coordinate resources, messaging, campaigns and the sales journey so delivery becomes a process the team can follow."},{icon:'web',page:'technology',title:"Technology",text:"Choose and build suitable tools for sales channels, data and digital processes."},{icon:'ai',page:'ai-tools',title:'AI tools & workflows',text:"Bring active and ongoing work in content, design, code and analysis together with AI, clear goals and clear ownership."}],focus:'Areas of focus',focusNote:"These areas do not operate separately in real projects.",related:'Related experience',areas:[
  {icon:'sales',title:'Online sales & e-commerce',text:'Launching and developing online sales channels with attention to the whole customer journey, from discovering a product to making a decision and completing a purchase.',points:['Developing online stores and coordinating content, products and sales operations','Choosing and managing sales channels suited to a market and its audience','Building an online presence for domestic and international sales'],role:'boomerang',company:'Boomerang'},
  {icon:'market',title:'Digital market presence',text:'A digital presence starts with understanding the market and its audience, then choosing a position, message and channels that make sense for the business.',points:['Researching markets and audience needs and behaviour','Planning market entry and prioritising opportunities','Connecting websites, search and customer communication channels'],role:'datis',company:'Pouyesh Rayan Datis'},
  {icon:'marketing',title:'Marketing strategy & content',text:'Turning business goals into a clear communication plan, with a consistent message across online and offline customer touchpoints.',points:['Planning marketing around goals, audiences and decision stages','Aligning content with sales needs and the customer experience','Leading and coordinating digital, content and sales support teams'],role:'turbin',company:'Online Tahrir'},
  {icon:'ads',title:'Advertising & campaigns',text:'Planning and following through on advertising activities with a clear objective, an explicit budget and meaningful measures of performance.',points:['Planning online and offline advertising together','Coordinating budgets, messages, channels and campaign schedules','Reviewing performance and using feedback to improve the approach'],role:'can',company:'CAN'},
  {icon:'analytics',title:'Analytics & conversion optimisation',text:'Using data to understand what happens along the sales journey and identify opportunities for improvement.',points:['Defining and tracking marketing and sales indicators','Analysing traffic and user behaviour with measurement tools and dashboards','Reviewing SEO, user experience and friction in the buying journey'],role:'binici',company:'BiNiCi Trading'},
  {icon:'web',title:'Product & full-stack execution',text:'Turning a business idea into a usable digital experience by connecting the user journey, web development and sales operations.',points:['Building websites, stores and tools around actual business needs','Working with WordPress, WooCommerce, HTML, CSS and JavaScript','Aligning user experience, data, technical constraints and operations'],role:'boomerang',company:'Boomerang'},
  {icon:'ai',title:'AI-enabled delivery',text:'Using AI tools across research, content, design, development and analysis, with human direction, quality checks and connected outputs.',points:['Defining the problem, selecting suitable tools and setting clear deliverables','Coordinating research, content, design and code with AI tools','Reviewing outputs for accuracy, quality and usefulness in delivery'],tab:'about',linkLabel:'My tools and working approach'}
 ]}
};
const skillIconPaths={ai:'<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 3v3m6-3v3m-6 12v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3M9 10h6m-6 4h4"/>',sales:'<path d="M3 4h2l2 12h11l3-8H6M9 20h.01M17 20h.01"/>',market:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18"/>',marketing:'<path d="m3 11 18-7v16L3 14Zm5 5 1 5h4l-2-4M3 11v3"/>',ads:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',analytics:'<path d="M4 3v17h17M8 15l4-5 4 3 5-7"/>',web:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18m-10 4-3 2 3 2m4-4 3 2-3 2"/>'};
const skillIcon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${skillIconPaths[name]}</svg>`;
const iconPaths={solutions:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',blog:'<path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4Zm0 11h12a4 4 0 0 1 4 4M8 8h8M8 11h5"/>',cv:'<rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="10" cy="9" r="2"/><path d="M7 15c0-3 6-3 6 0m3-7h1m-1 4h1M7 18h10"/>',contact:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>'};
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
const contactChannels=[
 {id:'phone',icon:'phone',href:'tel:+989363146928',value:'+98 936 314 6928',fa:'تماس',en:'Call'},
 {id:'whatsapp',icon:'whatsapp',href:'https://wa.me/989363146928',value:'+98 936 314 6928',fa:'واتس‌اپ',en:'WhatsApp'},
 {id:'telegram',icon:'telegram',href:'https://t.me/+989363146928',value:'+98 936 314 6928',fa:'تلگرام',en:'Telegram'},
 {id:'email',icon:'contact',href:'mailto:Mohammadreza.dalili@live.com',value:'Mohammadreza.dalili@live.com',fa:'ایمیل',en:'Email'},
 {id:'github',icon:'github',href:'https://github.com/mamadalili',value:'github.com/mamadalili',fa:'گیت‌هاب',en:'GitHub'}
];
Object.assign(iconPaths,{
 phone:'<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/>',
 whatsapp:'<path d="m4 20 1-4a9 9 0 1 1 3 3l-4 1Z"/><path d="M9 7.5 8 9c.6 3 3 5.4 6 6l1.5-1-2-2-1 1c-1.3-.5-2.2-1.4-2.7-2.7l1-1-1.8-1.8Z"/>',
 telegram:'<path d="m3 10 18-7-4 18-6-6-4 3 1-6 9-6-6 9M3 10l5 2"/>',
 github:'<path d="M9 21v-4c-3 .7-3-1.5-4-2m10 6v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 5-1.6 5-5a4 4 0 0 0-1-2.8 4 4 0 0 0 0-3.5s-1.2-.4-4 1a13 13 0 0 0-6 0C5.2 2.6 4 3 4 3a4 4 0 0 0 0 3.5 4 4 0 0 0-1 2.8c0 3.4 1.7 4.6 5 5A3.5 3.5 0 0 0 7 17v4"/>'
});
function brandMark(animated=false){return `<span class="brand-logo${animated?' brand-logo--motion':''}" aria-hidden="true"><img src="assets/brand/monogram.svg" width="64" height="64" alt=""></span>`;}
function titleMarkup(label=copy[lang].role){const text=escapeHTML(label);return `<span>${text}</span><span class="title-shine" aria-hidden="true">${text}</span>`;}
function professionalTitle(extra='',label=copy[lang].role){return `<span class="professional-title ${extra}">${titleMarkup(label)}</span>`;}
function languageButtonMarkup(){return `<svg class="language-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 6 6m-7 0 6-6 2-3H2m5-3h1m5 18 4-10 4 10m-6.5-3h5"/></svg><span class="language-label">${lang==='fa'?'English':'فارسی'}</span>`;}
function loadingMarkup(text,extra=''){return `<div class="site-loader ${extra}" role="status">${brandMark(true)}<span class="visually-hidden">${text}</span></div>`;}
let savedLanguage;try{savedLanguage=localStorage.getItem('portfolio-language');}catch{}
function rememberServerLanguage(value){
 try{
  if(!document.cookie.split(';').some(part=>part.trim()==='portfolio_language='+value)){
   document.cookie='portfolio_language='+value+'; Path=/; Max-Age=31536000; SameSite=Lax';
  }
 }catch{}
}
if(['fa','en'].includes(savedLanguage)) rememberServerLanguage(savedLanguage);
const fileLanguage=location.pathname.match(/\.(fa|en)\.html$/)?.[1];
let lang=['fa','en'].includes(params.get('lang'))?params.get('lang'):fileLanguage||(['fa','en'].includes(savedLanguage)?savedLanguage:document.documentElement.lang==='en'?'en':'fa');
let activeTab=tabIds.includes(params.get('tab'))?params.get('tab'):location.pathname.endsWith('/contact.html')?'contact':'experience';
let activeCareer=career.some(x=>x.id===params.get('role'))?params.get('role'):'boomerang';
const $=id=>document.getElementById(id);
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chips=items=>`<div class="chips">${items.map(s=>`<span class="chip">${escapeHTML(s)}</span>`).join('')}</div>`;
const years=value=>lang==='fa'?value.replace(/\d/g,n=>'۰۱۲۳۴۵۶۷۸۹'[n]):`${value} SH`;
function pageURL(id){const file=pageFiles[id]||extraPageFiles[id];return file?`${file}?lang=${lang}`:null;}
function updateURL(){const url=new URL(location.href);url.searchParams.set('lang',lang);if(page==='cv'){url.searchParams.set('tab',activeTab);url.searchParams.set('role',activeCareer);}else{url.searchParams.delete('tab');if(page!=='work-stories')url.searchParams.delete('role');}history.replaceState(null,'',url);}
function heading(title,sub,extra=''){return `<div class="section-heading"><div><h3>${title}</h3><p>${sub}</p></div>${extra?`<span>${extra}</span>`:''}</div>`;}
function render(){
  ensureAmbient();
  const hasEntry=$('main').dataset.entryLang===lang;
  const hasStaticSolution=hasEntry && page==='solutions';
  const t=copy[lang],s=siteCopy[lang],pageLabel=page==='work-stories'?(lang==='fa'?'روایت‌های کاری':'Work stories'):page==='skills'?skillsCopy[lang].label:s.nav[Object.keys(pageFiles).indexOf(navPage)];document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';if (!hasStaticSolution && !($('main').dataset.readingLang===lang && page==='article')) document.title=`${pageLabel} — ${t.name}`;
  if (!hasStaticSolution && !($('main').dataset.readingLang===lang && page==='article')) document.querySelector('meta[name="description"]').content=page==='work-stories'?(lang==='fa'?'روایت‌های کاری محمدرضا دلیلی؛ از کامپیوتر تا بازاریابی و فروش آنلاین.':'Work stories by Mohamad Reza Dalili, from computers to marketing and online sales.'):page==='skills'?skillsCopy[lang].intro:page==='home'?homeDescription():page==='blog'?s.blogIntro:page==='contact'?s.contactIntro:t.intro;
  document.body.dataset.currentPage=page;
  $('brand-name').textContent=t.name;$('brand-role').innerHTML=titleMarkup();$('header-label').textContent=page==='home'?'':pageLabel;$('header-label').hidden=page==='home';
  const brand=document.querySelector('.brand');brand.href=pageURL('home');brand.setAttribute('aria-label',`${s.nav[0]} — ${t.name}`);
  const mark=document.querySelector('.brand-mark');mark.innerHTML=page==='home'?`<img class="header-portrait" src="images/myphoto-avatar-v1.webp" width="59" height="59" alt="" fetchpriority="high">`:brandMark();
  $('language').innerHTML=languageButtonMarkup();$('language').dir=lang==='fa'?'ltr':'rtl';
  $('language').lang=lang==='fa'?'en':'fa';$('language').setAttribute('aria-label',lang==='fa'?'Switch to English':'تغییر زبان به فارسی');
  $('footer').innerHTML=`<nav aria-label="${s.navLabel}">${Object.keys(pageFiles).map((id,i)=>`<a href="${pageURL(id)}" ${navPage===id?'aria-current="page"':''}>${icon(id)}<span>${s.nav[i]}</span></a>`).join('')}</nav>`;
  if (!hasStaticSolution && !$('main').dataset.readingLang) $('main').className=page==='cv'?'layout':'page-layout';
  if(page==='cv'){
    $('main').innerHTML='<aside id="profile" class="profile-card"></aside><section class="workspace"><div id="intro" class="intro"></div><div class="work-card"><div id="main-tabs" class="main-tabs" role="tablist"></div><div id="content"></div></div></section>';
    renderCV();
  }else if(page==='home')renderHome();
  else if(page==='solutions'){if(!hasStaticSolution)renderSolutions();}
  else if(page==='skills')renderSkills();
  else if(page==='blog')renderBlog();
  else if(page==='article')renderBlog('article');
  else if(page==='work-stories')renderWorkStories();
  else if(!hasEntry)renderContactPage();
  updateURL();
}
function cvProfileMarkup(){
  const t=copy[lang];
  return `<div class="profile-top"></div><img class="portrait" src="images/myphoto-profile-v1.webp" width="130" height="130" alt="${t.name}" fetchpriority="high"><div class="identity"><h1>${t.name}</h1>${professionalTitle('role')}<span class="location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>${t.location}</span><a class="cv-download" href="assets/cv/mohammadreza-dalili-fa.pdf" download="Mohammadreza-Dalili-CV-FA.pdf"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/></svg><span>${lang==='fa'?'دانلود رزومه (PDF)':'Download CV (Persian PDF)'}</span></a></div><div class="profile-section"><h2 class="small-label">${t.aboutMe}</h2><p class="bio">${t.bio}</p></div><div class="profile-section"><h2 class="small-label">${t.focus}</h2>${chips(t.skills)}</div><div class="profile-contact"><a class="primary-link" href="mailto:Mohammadreza.dalili@live.com">${t.connect}<span aria-hidden="true">↗</span></a><div class="profile-links"><a href="https://github.com/mamadalili" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="mailto:Mohammadreza.dalili@live.com">${t.email} ↗</a></div></div>`;
}
function cvIntroMarkup(){
  const t=copy[lang];
  return `<div class="eyebrow">${t.eyebrow}</div><h2>${t.headline}</h2><p>${t.intro}</p><div class="stats">${t.stats.map(([n,label])=>`<div class="stat"><strong>${n}</strong><span>${label}</span></div>`).join('')}</div>`;
}
function renderCV(){
  const t=copy[lang];
  $('profile').setAttribute('aria-label',t.name);
  $('profile').innerHTML=cvProfileMarkup();
  $('intro').innerHTML=cvIntroMarkup();
  $('main-tabs').setAttribute('aria-label',t.tabLabel);
  $('main-tabs').innerHTML=tabIds.map((id,i)=>`<button type="button" role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="${id===activeTab}" tabindex="${id===activeTab?0:-1}" data-tab="${id}">${t.tabs[i]}${i<2?`<span class="tab-count" aria-hidden="true">${new Intl.NumberFormat(lang).format(i===0?8:projects.length)}</span>`:''}</button>`).join('');
  $('content').innerHTML=tabIds.map(id=>`<section role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" tabindex="0" ${id===activeTab?'':'hidden'}></section>`).join('');
  renderContent();
}
let motionSceneSerial=0;
function renderMotionScene(placement='home',active=''){
 const id=`motion-scene-${++motionSceneSerial}`;
 const nodes=[
  {id:'strategy',x:20,y:24,fa:'استراتژی',en:'Strategy',path:'<path d="M3 18h18M5 14l5-5 4 3 6-8M16 4h4v4"/>'},
  {id:'execution',x:236,y:24,fa:'اجرا',en:'Execution',path:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>'},
  {id:'technology',x:20,y:166,fa:'فناوری',en:'Technology',path:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m9 10-3 2 3 2m6-4 3 2-3 2"/>'},
  {id:'ai-tools',x:236,y:166,fa:'ابزارهای AI',en:'AI tools',path:'<circle cx="5" cy="12" r="3"/><circle cx="18" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8 10 7-4M8 14l7 4"/>'}
 ];
 const routes=['M144 57C180 57 160 98 180 108','M236 57C200 57 220 98 200 108','M144 199C180 199 160 164 180 152','M236 199C200 199 220 164 200 152'];
 return `<div class="motion-scene motion-scene--${placement}" aria-hidden="true"><svg viewBox="0 0 380 260" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}-glass" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".98"/><stop offset="1" stop-color="#eef0ff" stop-opacity=".88"/></linearGradient><radialGradient id="${id}-halo"><stop stop-color="#ccff00" stop-opacity=".32"/><stop offset="1" stop-color="#ccff00" stop-opacity="0"/></radialGradient></defs><ellipse class="scene-halo" cx="190" cy="130" rx="145" ry="112" fill="url(#${id}-halo)"/><g class="scene-orbit"><ellipse cx="190" cy="130" rx="100" ry="76" fill="none" stroke="#1c09981c" stroke-width="1"/><circle cx="90" cy="130" r="4" fill="#ccff00"/><circle cx="290" cy="130" r="2.5" fill="#1c0998"/></g>${routes.map((d,index)=>`<path d="${d}" fill="none" stroke="#d5d9eb" stroke-width="2"/><path class="scene-flow" style="--flow-delay:-${index*1.7}s" d="${d}" fill="none" stroke="#ccff00" stroke-width="2.5" stroke-dasharray="7 15"/>`).join('')}<g class="scene-core"><rect x="151" y="91" width="78" height="78" rx="25" fill="#fff" stroke="#dce3c4"/><image href="assets/brand/monogram.svg" x="159" y="99" width="62" height="62"/></g>${nodes.map((node,index)=>`<g transform="translate(${node.x} ${node.y})"><g class="scene-node${active===node.id?' is-selected':''}" style="--float-delay:-${index*1.4}s"><rect class="scene-node-surface" width="124" height="66" rx="18" fill="url(#${id}-glass)" stroke="${active===node.id?'#ccff00':'#d9dfec'}" stroke-width="${active===node.id?2:1}"/><svg x="51" y="10" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c0998" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${node.path}</svg><text x="62" y="50" text-anchor="middle" fill="#172144" font-size="13" font-weight="750">${escapeHTML(node[lang])}</text><path class="scene-node-glint" d="M16 1h30" stroke="#ccff00" stroke-width="2.5" stroke-linecap="round"/></g></g>`).join('')}<g class="scene-sparkles" fill="none" stroke="#ccff00" stroke-width="1.5" stroke-linecap="round"><path d="M187 15v10m-5-5h10M187 235v10m-5-5h10M7 125v10m-5-5h10M373 125v10m-5-5h10"/></g></svg></div>`;
}
function ensureAmbient(){
 import('./home-atmosphere.mjs?v=20261109-studio-coast').then(({ensureSiteAtmosphere})=>ensureSiteAtmosphere()).catch(()=>{});
}
function homeCardCTA(target,label){return `<a class="card-cta" href="${pageURL(target)}"><span>${label}</span><span class="card-arrow">${icon('arrow')}</span></a>`;}
let disposeHomeBlog=()=>{};
const homePortalCopy={
 fa:{strategy:{title:'استراتژی',text:'اول برای کدوم مشتری و کدوم بازار وقت بذاریم؟'},execution:{title:'اجرا و فروش',text:'از دیدن تبلیغ تا ثبت سفارش چه کارهایی مونده؟'},technology:{title:'فناوری',text:'فروشگاه یا ابزار تیم کجا کار رو سخت کرده؟'},'ai-tools':{title:'ابزارهای AI',text:'کدوم کار رو به AI بسپاریم و کجا خودمون بررسی کنیم؟'}},
 en:{strategy:{title:'Strategy',text:'Which customers and markets deserve our time first?'},execution:{title:'Execution & sales',text:'What needs to happen between seeing an ad and placing an order?'},technology:{title:'Technology',text:'Where is the shop or a team tool making work harder?'},'ai-tools':{title:'AI workflows',text:'What can AI take on, and where should we check its work?'}}
};
function homeDescription(){
 return siteCopy[lang].homeIntro.replace('{role}',lang==='fa'?'مارکتر و اپراتور هوش مصنوعی،':copy[lang].role).replace('{home}',lang==='fa'?'خانه دیجیتال':'digital home');
}
function homeIntroMarkup(){
 const t=copy[lang],s=siteCopy[lang];
 return escapeHTML(s.homeIntro).replace('{role}',`<a class="home-intro-role" href="${pageURL('home')}">${professionalTitle('',lang==='fa'?'مارکتر و اپراتور هوش مصنوعی،':t.role)}</a>`).replace('{home}',`<strong>${lang==='fa'?'خانه دیجیتال':'digital home'}</strong>`);
}
function homeOpeningMarkup(folders){
 const s=siteCopy[lang],k=skillsCopy[lang];
 return `<section class="home-first-view home-art-hero" aria-labelledby="home-title"><div class="page-hero home-hero"><div class="home-welcome"><h1 id="home-title">${s.homeTitle}</h1><p>${homeIntroMarkup()}</p></div><div class="site-atmosphere is-paused" aria-hidden="true"></div></div>
 <article class="home-card skills-home-card skills-hero-card" aria-labelledby="skills-hero-title"><div class="skills-card-copy"><h2 id="skills-hero-title">${k.cardTitle}</h2><p>${k.cardBody}</p><div class="home-hero-actions">${homeCardCTA('solutions',k.cardAction)}${homeCardCTA('contact',s.contactAction)}</div></div><div class="skills-card-side"><nav class="skills-capability-grid home-folder-grid" aria-label="${lang==='fa'?'راهکارها':'Solutions'}" data-capability-cards>${folders}</nav></div></article>
 </section>`;
}
function renderHome(){
 disposeHomeBlog();disposeHomeBlog=()=>{};
 const s=siteCopy[lang];
 const initial=$('main').dataset.entryLang===lang ? $('main').querySelector('[data-capability-cards]') : null;
 const folders=initial?.innerHTML || loadingMarkup(lang==='fa'?'در حال آماده‌سازی راهکارها…':'Preparing the solutions…');
 delete $('main').dataset.entryLang;
 const homeLanguage=lang;
 const moreLabel=lang==='fa'?'بلاگ، پروفایل کاری و تماس':'Blog, professional profile and contact';
 $('main').innerHTML=`<div class="home-scroll-story">${homeOpeningMarkup(folders)}<section class="home-card-deck" aria-label="${moreLabel}"><div class="home-grid">
 <article id="home-blog" class="home-card blog-card home-blog-section" aria-labelledby="home-blog-title"><header class="home-blog-header"><h2 id="home-blog-title" class="visually-hidden">${s.blogLabel}</h2><p>${s.blogBody}</p><a class="home-blog-all" href="${pageURL('blog')}">${lang==='fa'?'همهٔ نوشته‌ها':'All posts'}${icon('arrow')}</a></header><div data-home-blog>${loadingMarkup(lang==='fa'?'در حال آماده‌سازی نوشته‌ها…':'Loading the latest posts…','home-blog-loading')}</div></article>
 <section class="home-quick-links" aria-label="${lang==='fa'?'مسیر کاری و ارتباط':'Work & conversation'}"><article class="home-card cv-card"><div class="card-top"><span class="card-icon">${icon('cv')}</span><span class="card-label">CV / ${s.cvLabel}</span></div><h2>${s.cvTitle}</h2><p>${s.cvBody} <a class="home-story-link" href="${pageURL('work-stories')}">${lang==='fa'?'روایت‌های کاری من':'Stories from my work'}</a></p>${homeCardCTA('cv',s.cvAction)}</article>
 <article class="home-card contact-home-card"><div class="card-top"><span class="card-icon">${icon('contact')}</span><span class="card-label">${s.contactLabel}</span></div><h2>${s.contactTitle}</h2><p>${s.contactBody}</p>${homeCardCTA('contact',s.contactAction)}</article></section>
 </div></section></div><div class="page-signoff">${brandMark()}<p>© ${new Date().getFullYear()} ${s.copyright}</p></div>`;
 const cardsRoot=$('main').querySelector('[data-capability-cards]');
 import('./solutions.mjs?v=20261109-studio-coast').then(({renderHomeFolderCards})=>{
  if(!cardsRoot.isConnected||lang!==homeLanguage)return;
  cardsRoot.innerHTML=renderHomeFolderCards({language:homeLanguage,url:pageURL,icon:skillIcon,portals:homePortalCopy[homeLanguage]});
 }).catch(()=>{if(cardsRoot.isConnected&&lang===homeLanguage)cardsRoot.innerHTML=`<a class="solution-cards-fallback" href="${pageURL('solutions')}">${lang==='fa'?'دیدن راهکارها':'View solutions'}</a>`;});
 const blogRoot=$('main').querySelector('[data-home-blog]');
 import('./home-blog.mjs?v=20261102-light-lists').then(({mountHomeBlog})=>{if(blogRoot.isConnected&&lang===homeLanguage)disposeHomeBlog=mountHomeBlog(blogRoot,{language:homeLanguage});}).catch(()=>{if(blogRoot.isConnected&&lang===homeLanguage)blogRoot.innerHTML=`<p class="home-blog-empty">${lang==='fa'?'نوشته‌ها را در برگهٔ بلاگ ببینید.':'Explore the articles on the Blog page.'}</p>`;});
 // Restore visibility when keyboard navigation returns to the pinned skills link.
 const revealSkills=()=>{
  const stage=$('main').querySelector('.home-first-view'),hero=$('main').querySelector('.skills-hero-card'),tiles=$('main').querySelector('.skills-capability-grid'),deck=$('main').querySelector('.home-card-deck');
  if(matchMedia('(min-width:1000px)').matches&&deck.getBoundingClientRect().top<Math.max(hero.getBoundingClientRect().bottom,tiles.getBoundingClientRect().bottom)){window.scrollTo(0,Math.max(0,stage.parentElement.getBoundingClientRect().top+scrollY-112));}
 };
 $('main').querySelector('.skills-hero-card').addEventListener('focusin',revealSkills);
}
const collaborationCopy={
 fa:{eyebrow:'شروع همکاری',title:"کجای کار گیر کرده؟",accent:"از همون‌جا شروع کنیم.",body:"مثلاً تبلیغ مشتری رو به فروشگاه می‌رسونه، اما سفارش ثبت نمی‌شه. یک نمونه از اتفاقی که می‌افته برام بگو. با هم می‌بینیم چه چیزی رو می‌شه تغییر داد و از کجا بفهمیم کمک کرده.",prepare:"برای شروع، همین سه چیز کافی است:",prompts:["نتیجه‌ای که می‌خواهید","کار امروز چطور پیش می‌رود","جایی که کار گیر می‌کند"],actionLabel:"گفت‌وگو را شروع کنیم",action:"دربارهٔ مسئله‌تان بگویید",note:"چند خط کافیه. جزئیات رو بعداً با هم مرور می‌کنیم.",experience:'دیدن مسیر کاری من',background:'پشتوانهٔ این مسیر:',backgroundLink:'سوابق و تجربه‌های کاری من'},
 en:{eyebrow:'LET’S WORK TOGETHER',title:"Where is the work getting stuck?",accent:"Let’s start there.",body:"Maybe an ad brings people to your shop, but the orders don’t follow. Tell me about one time it happened. We can look at what to change and how to tell whether it helped.",prepare:"To begin, these three things are enough:",prompts:["The result you want","How the work runs today","Where the work gets stuck"],actionLabel:"Start the conversation",action:"Tell me about your challenge",note:"A few lines are enough. We can work through the details together.",experience:'Explore my work experience',background:'Behind this approach:',backgroundLink:'My work experience'}
};
function renderCollaborationCTA({showExperience=false}={}){
 const c=collaborationCopy[lang];
 return `<section class="collaboration-cta" aria-labelledby="collaboration-title"><div class="collaboration-copy"><div class="collaboration-eyebrow">${escapeHTML(c.eyebrow)}</div><h2 id="collaboration-title"><span>${escapeHTML(c.title)}</span> <em>${escapeHTML(c.accent)}</em></h2><p>${escapeHTML(c.body)}</p><div class="collaboration-prepare"><span>${escapeHTML(c.prepare)}</span><ul>${c.prompts.map(prompt=>`<li>${escapeHTML(prompt)}</li>`).join('')}</ul></div>${showExperience?`<p class="collaboration-background">${escapeHTML(c.background)} <a href="${pageURL('cv')}&tab=experience">${escapeHTML(c.backgroundLink)}</a></p>`:''}</div><div class="collaboration-actions"><p class="collaboration-action-label">${escapeHTML(c.actionLabel)}</p><a class="collaboration-primary" href="${pageURL('contact')}"><span>${escapeHTML(c.action)}</span><span class="collaboration-arrow">${icon('arrow')}</span></a><p class="collaboration-action-note">${escapeHTML(c.note)}</p><a class="collaboration-secondary" href="${pageURL('cv')}&tab=experience"><span>${escapeHTML(c.experience)}</span>${icon('arrow')}</a></div></section>`;
}
function renderSkills(){location.replace(pageURL('cv')+'&tab=experience');}
let disposeBlog=()=>{};
const pageModuleBase=document.currentScript?.src||document.baseURI;
async function loadPageModule(file, retry=false) {
 const url = new URL('runtime-'+file, pageModuleBase);
 if (retry) url.searchParams.set('retry',String(Date.now()));
 try { return await import(url.href); }
 catch {
  await new Promise(resolve => setTimeout(resolve,500));
  url.searchParams.set('retry',String(Date.now()));
  return import(url.href);
 }
}
function renderBlog(mode='index',retry=false){
 disposeBlog();disposeBlog=()=>{};
 const root=$('main'), version=++blogMountVersion, language=lang;
 const slug=mode==='article'?new URLSearchParams(location.search).get('post'):null;
 const template=document.body.dataset.template==='true';
 const current=()=>version===blogMountVersion && language===lang;
 const ready=()=>root.dataset.readingLang===language && (root.dataset.readingPost||null)===slug;
 const staticURL=mode==='index'?(language==='fa'?'blog.html':'reading/en/archive.html')
   : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug||'')?`reading/${language}/${slug}.html`:null;
 const entry=mode==='index'?'blog-list.mjs':'blog.mjs';
 root.querySelector('[data-reading-retry]')?.remove();
 if(!ready()) root.innerHTML=loadingMarkup(language==='fa'?'در حال آماده‌سازی نوشته‌ها…':'Preparing the posts…','blog-loading');
 let interactive=false;
 async function getReadingCopy(){
  if(ready()||template||!staticURL)return;
  try {
   const response=await fetch(staticURL);
   if(!response.ok)return;
   const html=new DOMParser().parseFromString(await response.text(),'text/html');
   const copy=html.querySelector('#main');
   if(!current()||interactive||copy?.dataset.readingLang!==language||(copy.dataset.readingPost||null)!==slug)return;
   root.className=copy.className;
   root.dataset.readingLang=language;root.dataset.readingPost=slug||'';
   if(copy.dataset.readingSrc)root.dataset.readingSrc=copy.dataset.readingSrc;
   root.replaceChildren(...copy.childNodes);
   document.title=html.title;
  } catch { /* The interactive reader can still load independently. */ }
 }
 const reading=getReadingCopy();
 loadPageModule(entry,retry).then(async({mountBlog,unmountBlog})=>{
  if(!current())return;
  disposeBlog=unmountBlog||(()=>{});
  await mountBlog(root,{language,mode,template});
  if(current()){interactive=true;root.dataset.readingLang=language;root.dataset.readingPost=slug||'';}
 }).catch(async error=>{
  await reading;
  if(!current())return;
  if(!ready())root.replaceChildren();
  const note=document.createElement('p');
  note.dataset.readingRetry='';note.className='reading-recovery';note.setAttribute('role','status');
  note.textContent=language==='fa'?'بارگیری بخش تعاملی کامل نشد. ':'The interactive features could not load. ';
  const button=document.createElement('button');button.type='button';
  button.textContent=language==='fa'?'تلاش دوباره':'Try again';
  button.addEventListener('click',()=>renderBlog(mode,true),{once:true});note.append(button);
  (root.querySelector(mode==='index'?'.library-tools':'.article-header')||root).append(note);
  console.warn('Blog enhancement unavailable',error);
 });
}
function renderSolutions(){
 if(!document.body.dataset.solution){location.replace(pageURL('strategy')+location.hash);return;}
 const version=++solutionsMountVersion,language=lang;
 $('main').innerHTML=loadingMarkup(lang==='fa'?'در حال آماده‌سازی راهکارها…':'Preparing the solutions…','solutions-loading');
 import('./solutions.mjs?v=20261112-entry-solutions').then(({mountSolutions})=>{
  if(version!==solutionsMountVersion||language!==lang)return;
  mountSolutions($('main'),{language,solution:document.body.dataset.solution||'',url:pageURL,icon:skillIcon,portals:homePortalCopy[language],motion:active=>renderMotionScene('solution',active),collaboration:()=>renderCollaborationCTA({showExperience:true})});
  ensureAmbient();
  if(location.hash==='#collaboration-title')$('collaboration-title')?.scrollIntoView({block:'start'});
 }).catch(error=>{
  if(version!==solutionsMountVersion)return;
  $('main').innerHTML=`<p class="solutions-loading">${lang==='fa'?'نمایش راهکارها با مشکل روبه‌رو شد. صفحه را دوباره بارگذاری کنید.':'The solutions could not be loaded. Please reload the page.'}</p>`;
  console.error('Solutions could not be loaded',error);
 });
}
const workStoryCopy=document.getElementById('work-story-copy')?.cloneNode(true);
function renderWorkStories(retry=false){
 disposeWorkStories();disposeWorkStories=()=>{};
 const version=++workStoriesMountVersion,language=lang;
 const root=$('main');
 if(!root.querySelector('#work-story-copy') && workStoryCopy)root.replaceChildren(workStoryCopy.cloneNode(true));
 root.querySelector('[data-story-status]')?.remove();
 const requested=new URLSearchParams(location.search).get('role');
 if(requested)for(const details of root.querySelectorAll('[data-role-copy]'))details.open=details.dataset.roleCopy===requested;
 loadPageModule('work-stories.mjs',retry).then(({mountWorkStories})=>{
  if(version!==workStoriesMountVersion||language!==lang)return;
  disposeWorkStories=mountWorkStories($('main'),{language,roles:career,formatYears:years,renderWebsite:companyWebsite,activateStory:document.activeElement?.id!=='language'});
 }).catch(()=>{
  if(version!==workStoriesMountVersion||language!==lang)return;
  root.insertAdjacentHTML('afterbegin',`<p role="status" class="reading-recovery" data-story-status>${lang==='fa'?'برای دیدن نمای تعاملی روایت‌ها دوباره تلاش کن.':'Try again to open the interactive stories.'} <button type="button" data-story-retry>${lang==='fa'?'تلاش دوباره':'Try again'}</button></p>`);
  root.querySelector('[data-story-retry]').addEventListener('click',()=>renderWorkStories(true),{once:true});
 });
}
function contactLinks(){
 return `<div class="contact-methods">${contactChannels.map(channel=>`<a class="contact-card contact-method" data-contact="${channel.id}" href="${channel.href}" ${channel.href.startsWith('https:')?'target="_blank" rel="noopener noreferrer"':''}><span class="contact-method-icon">${icon(channel.icon)}</span><span class="contact-method-copy"><strong>${channel[lang]}</strong><span dir="ltr">${channel.value}</span></span><span class="contact-method-arrow">${icon('arrow')}</span></a>`).join('')}</div>`;
}
function companyLogo(role){return role.logo?`<img class="company-logo" src="${escapeHTML(role.logo.src)}" width="${role.logo.width}" height="${role.logo.height}" alt="" loading="lazy" decoding="async">`:escapeHTML(role.mark);}
function companyWebsite(role){
 if(!role.website)return '';
 const label=lang==='fa'?'وب‌سایت سازمان':'Organisation website',name=role[lang].company;
 const sites=Array.isArray(role.website)?role.website:[role.website];
 const links=sites.map(site=>{
  let url;try{url=new URL(site);}catch{return '';}
  if(url.protocol!=='https:'||url.username||url.password)return '';
  return `<a class="employer-website" href="${escapeHTML(url.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(`${label}: ${name} — ${url.hostname} (${lang==='fa'?'تب تازه':'new tab'})`)}"><span>${label}</span><bdi>${escapeHTML(url.hostname)}</bdi></a>`;
 }).join('');
 return links?`<div class="employer-websites">${links}</div>`:'';
}
function renderEmployerRail(){
 const seen=new Set(),employers=career.filter(role=>role.logo&&!seen.has(role.logo.src)&&seen.add(role.logo.src));
 return `<section class="employer-rail" aria-labelledby="employer-rail-title"><header><h2 id="employer-rail-title">${lang==='fa'?'بخشی از مسیر کاری من':'Places I have worked'}</h2><a href="${pageURL('cv')}&tab=experience">${lang==='fa'?'دیدن سوابق کاری':'Explore my work experience'}${icon('arrow')}</a></header><div class="employer-logo-grid">${employers.map(role=>`<a class="employer-logo-card" href="${pageURL('cv')}&tab=experience&role=${role.id}"><span>${companyLogo(role)}</span><strong>${escapeHTML(role[lang].company)}</strong></a>`).join('')}</div></section>`;
}
function contactPageMarkup(){
 const t=copy[lang],s=siteCopy[lang];
 const c=lang==='fa'?{email:'برایم بنویسید',label:'شروع یک گفت‌وگو',title:'دربارهٔ چی می‌خوای حرف بزنیم؟',note:'اگر مشکل توی سایت یا فروشگاهه، لینک همون صفحه رو بفرست و بگو کجا گیر کردی.',channels:'از چه راهی راحت‌تری؟'}:{email:'Write to me',label:'START A CONVERSATION',title:'What would you like to talk about?',note:'If it’s about a site or a shop, send the page link and tell me where you got stuck.',channels:'How would you like to get in touch?'};
 return `<section class="contact-editorial" aria-labelledby="contact-title"><div class="contact-light-trace" aria-hidden="true"></div><div class="contact-editorial-copy"><h1 id="contact-title">${escapeHTML(s.contactIntro)}</h1><div class="contact-editorial-actions"><a href="${contactChannels.find(channel=>channel.id==='email').href}"><span>${c.email}</span>${icon('arrow')}</a><a href="${pageURL('cv')}"><span>${s.cvLink}</span>${icon('arrow')}</a></div><div class="contact-signature"><strong>${escapeHTML(t.name)}</strong>${professionalTitle()}</div></div><figure class="contact-portrait-stage"><div class="contact-monogram" aria-hidden="true"><img src="assets/brand/monogram.svg" alt="" width="210" height="210"></div><img class="contact-author-photo" src="images/contact-portrait.webp" width="1142" height="1377" alt="${escapeHTML(t.name)}" fetchpriority="high"></figure><a class="contact-glass" href="#contact-channels"><span class="contact-glass-copy"><small>${c.label}</small><strong>${c.title}</strong><p>${c.note}</p></span><span class="contact-glass-arrow" aria-hidden="true">${icon('arrow')}</span></a></section><section class="contact-channels-section" id="contact-channels" aria-labelledby="contact-channels-title"><div class="contact-channels-header"><h2 id="contact-channels-title">${c.channels}</h2>${brandMark(true)}</div>${contactLinks()}</section>${renderEmployerRail()}`;
}
function renderContactPage(){
 $('main').innerHTML=contactPageMarkup();
}
function renderContent(){
 const t=copy[lang];
 const root=$('panel-experience'),version=++careerStoriesMountVersion,language=lang;
 import('./work-story-cards.mjs?v=20261111-work-journals').then(({renderCareerStoryCards})=>{
  if(version!==careerStoriesMountVersion||language!==lang||!root.isConnected)return;
  root.querySelectorAll('.career-story-link').forEach(link=>{
   const role=new URL(link.href).searchParams.get('role');
   const markup=renderCareerStoryCards(role,language,location.href);
   if(markup)link.outerHTML=markup;
  });
 }).catch(()=>{});
 $('panel-experience').innerHTML=heading(t.experience,t.experienceSub)+`<div class="experience-grid"><div class="companies" role="tablist" aria-orientation="vertical" aria-label="${t.careerLabel}">${career.map(c=>`<button type="button" class="company" id="role-${c.id}" role="tab" aria-controls="detail-${c.id}" aria-selected="${activeCareer===c.id}" tabindex="${activeCareer===c.id?0:-1}" data-career="${c.id}"><span class="company-mark${c.logo?' has-company-logo':''}" aria-hidden="true">${companyLogo(c)}</span><span class="company-copy"><strong>${c[lang].company}</strong><small dir="${lang==='fa'?'rtl':'ltr'}">${years(c.years)}</small></span></button>`).join('')}</div><div>${career.map(c=>`<article class="experience-detail" id="detail-${c.id}" role="tabpanel" aria-labelledby="role-${c.id}" tabindex="0" ${activeCareer===c.id?'':'hidden'}><div class="detail-kicker employer-detail-brand">${c.logo?`<span class="employer-detail-logo">${companyLogo(c)}</span>`:''}<span>${c[lang].company}</span></div><h3>${c[lang].role}</h3><div class="meta"><span>${years(c.years)}</span><span>${c[lang].sector}</span></div>${companyWebsite(c)}<a class="career-story-link" href="${pageURL('work-stories')}&role=${c.id}"><span class="career-story-mark" aria-hidden="true">${icon('blog')}</span><span class="career-story-copy"><strong>${lang==='fa'?'روایت‌های این تجربه':'Stories from this role'}</strong><span>${lang==='fa'?`کارها و چیزهایی که در ${c[lang].company} یاد گرفتم`:`Work and lessons from ${c[lang].company}`}</span></span><span class="career-story-arrow" aria-hidden="true">${icon('arrow')}</span></a><div class="detail-rule"></div><h4>${t.scope}</h4><ul class="responsibilities">${c[lang].points.map(p=>`<li>${p}</li>`).join('')}</ul><div class="detail-tags">${chips(c[lang].tags)}</div></article>`).join('')}</div></div>`;
 $('panel-projects').innerHTML=heading(t.projectHeading,t.projectSub)+`<div class="project-list">${projects.map((p,i)=>`<details class="project" ${i===0?'open':''}><summary><span class="project-icon" aria-hidden="true">${p.icon}</span><span><span class="project-title">${p[lang].title}</span><span class="project-subtitle" style="display:block">${p[lang].sub}</span></span></summary><div class="project-body"><p>${p[lang].body}</p>${chips(p[lang].tags)}${p.url?`<a class="text-link" href="${p.url}" target="_blank" rel="noopener noreferrer">${t.repo}</a>`:''}</div></details>`).join('')}</div>`;
 $('panel-about').innerHTML=heading(t.aboutHeading,t.aboutSub)+`<div class="about"><p>${t.longBio}</p><h4>${t.capabilities}</h4><div class="capability-grid">${t.capabilityItems.map(([a,b])=>`<div><strong>${a}</strong><p>${b}</p></div>`).join('')}</div><h4>${t.education}</h4>${t.degrees.map(([a,b,c])=>`<div class="education"><div><strong>${a}</strong><p>${b}</p></div><time>${c}</time></div>`).join('')}<h4>${t.results}</h4><p>${t.resultsText}</p><h4>${t.interests}</h4><p>${t.interestsText}</p></div>`;
 $('panel-contact').innerHTML=heading(t.contactHeading,t.contactSub)+`<div class="contact"><p>${t.contactText}</p>${contactLinks()}</div>`;
}
function selectTab(id){activeTab=id;for(const item of document.querySelectorAll('[data-tab]')){const active=item.dataset.tab===id;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;$(`panel-${item.dataset.tab}`).hidden=!active;}updateURL();}
function selectCareer(id){activeCareer=id;for(const item of document.querySelectorAll('[data-career]')){const active=item.dataset.career===id;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;$(`detail-${item.dataset.career}`).hidden=!active;}updateURL();}
document.addEventListener('click',event=>{const tab=event.target.closest('[data-tab]');const company=event.target.closest('[data-career]');if(tab)selectTab(tab.dataset.tab);if(company)selectCareer(company.dataset.career);});
document.addEventListener('keydown',event=>{
 const el=event.target.closest('[data-tab],[data-career]');if(!el)return;
 const items=[...el.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];let index=items.indexOf(el);const vertical=el.hasAttribute('data-career');
 if(event.key==='Home')index=0;else if(event.key==='End')index=items.length-1;
 else if(vertical&&['ArrowDown','ArrowUp'].includes(event.key))index+=(event.key==='ArrowDown'?1:-1);
 else if(['ArrowRight','ArrowLeft'].includes(event.key))index+=(event.key==='ArrowRight'?1:-1)*(lang==='fa'?-1:1);
 else return;
 event.preventDefault();const next=items[(index+items.length)%items.length];if(vertical)selectCareer(next.dataset.career);else selectTab(next.dataset.tab);next.focus();
});
$('language').addEventListener('click',()=>{
 lang=lang==='fa'?'en':'fa';try{localStorage.setItem('portfolio-language',lang);}catch{}
 rememberServerLanguage(lang);
 if((page==='blog'||page==='article'||page==='home'||page==='cv'||page==='solutions'||page==='contact') && document.body.dataset.template!=='true'){
  const url=new URL(location.href);url.searchParams.set('lang',lang);
  if(page==='contact'||(page==='solutions'&&document.body.dataset.solution)){
   url.pathname=url.pathname.replace(/(?:\.(?:en|fa))?\.html$/,'.'+lang+'.html');
  }
  location.assign(url);return;
 }
 render();$('language').focus();
});
render();
