import { aiPayoffWorkload } from './posts/ai-payoff-workload.mjs';
import { aiModelMarket } from './posts/ai-model-market.mjs';
import { soloBusiness } from './posts/solo-business.mjs';
import { soloGroups, soloOpportunities } from './posts/solo-opportunities.mjs';
import { seriesPosts } from './posts/series-2026.mjs';
import { post as smallBusinessWebsite } from './posts/small-business-website.mjs';
import { post as teamCapacity } from './posts/team-capacity.mjs';
import { post as capitalOneAI } from './posts/capital-one-ai.mjs';
import { post as oneDayRethink } from './posts/one-day-rethink.mjs';
import { post as buildingWealthBeyondLuck } from './posts/building-wealth-beyond-luck.mjs';
// Real bilingual articles. Template previews never appear as published posts.
export const posts = [buildingWealthBeyondLuck, oneDayRethink, smallBusinessWebsite, teamCapacity, capitalOneAI, ...seriesPosts, aiPayoffWorkload, soloBusiness, aiModelMarket];

export const articleTemplate = {
  slug:'interactive-article-template', template:true, status:'template',
  fa:{title:'از خواندن تا تجربه کردن',excerpt:'یک نمونهٔ تعاملی: مقایسه کنید، نمودار را تغییر دهید و اثر انتخاب‌ها را ببینید.',category:'نمونهٔ مقالهٔ تعاملی',readTime:'۵ دقیقه',takeaways:['روی اصطلاحات خط‌دار کلیک کنید تا توضیحشان باز شود.','شاخص و نوع نمودار را تغییر دهید و داده‌ها را مقایسه کنید.','با شبیه‌ساز، اثر ورودی‌های مختلف را ببینید.']},
  en:{title:'From reading to exploring',excerpt:'An interactive example: compare approaches, change the chart and see how your choices affect a result.',category:'Interactive article example',readTime:'5 min',takeaways:['Select underlined terms to open an explanation.','Change the chart metric and view to compare the data.','Try different inputs in the simulator.']},
  glossary:{
    'conversion-rate':{fa:{title:'نرخ تبدیل یعنی چه؟',text:'نرخ تبدیل، نسبت اقدام‌های هدف به تعداد فرصت‌های تبدیل است. در این مثال ساده، سفارش‌ها را بر بازدیدها تقسیم می‌کنیم و در ۱۰۰ ضرب می‌کنیم. تعریف دقیق صورت و مخرج باید در هر تحلیل روشن باشد.'},en:{title:'What is conversion rate?',text:'A conversion rate expresses target actions relative to opportunities to convert. In this simplified example, orders are divided by visits and multiplied by 100. Each analysis should define its numerator and denominator clearly.'}},
    'sample-data':{fa:{title:'این اعداد واقعی نیستند',text:'همهٔ اعداد این صفحه برای نمایش قابلیت قالب ساخته شده‌اند؛ گزارش عملکرد یک کسب‌وکار یا ادعایی دربارهٔ نتایج حرفه‌ای من نیستند.'},en:{title:'These are illustrative numbers',text:'All numbers on this page are made up to demonstrate the template. They are not business performance data or claims about my professional results.'}}
  },
  sections:[
    {id:'start',fa:{title:'مقاله‌ای که می‌شود با آن کار کرد'},en:{title:'An article you can explore'},blocks:[
      {type:'paragraph',fa:'این صفحه یک نمونهٔ قالب است، نه یک مقالهٔ منتشرشده. تعامل‌ها باید فهم موضوع را راحت‌تر کنند: یک مفهوم را توضیح دهند، دو انتخاب را مقایسه کنند یا اثر تغییر یک ورودی را نشان دهند.',en:'This page is a template preview, not a published article. Interactions should help explain a concept, compare choices or reveal what changes when an input changes.'},
      {type:'paragraph',fa:'برای مثال، روی [[conversion-rate|نرخ تبدیل]] کلیک کنید. بعد به [شبیه‌ساز همین مقاله](#simulator) بروید یا [پروژه‌های من](@cv:projects) را ببینید؛ این‌ها نمونهٔ لینک‌سازی درون مقاله و بین صفحه‌های سایت هستند.',en:'For example, select [[conversion-rate|conversion rate]]. Then jump to [this article’s simulator](#simulator) or explore [my projects](@cv:projects): examples of links within an article and across the site.'},
      {type:'callout',fa:'این یک محیط آزمایشی است. [[sample-data|داده‌های نمونه]] را با دادهٔ واقعی و منبع‌دار مقالهٔ خودتان جایگزین کنید.',en:'This is a demonstration. Replace the [[sample-data|sample data]] with sourced data from your own article.'}
    ]},
    {id:'opportunity-example',fa:{title:'از فهرست به جزئیات برسید'},en:{title:'Explore a list through focused details'},blocks:[
      {type:'opportunities',groups:soloGroups.slice(0,2),items:soloOpportunities.slice(0,4),fa:{eyebrow:'نمونهٔ الگوی مسیرها',title:'فیلتر، جست‌وجو و جزئیات',note:'این پیشنهادها نمونهٔ تدوین‌شده برای بررسی‌اند؛ دسته را عوض کنید و نقش AI، مسئولیت انسانی و اولین آزمایش را باز کنید.'},en:{eyebrow:'PATH-BROWSER EXAMPLE',title:'Filter, search and inspect',note:'These are editorial examples to investigate. Change the group and open the AI contribution, human responsibility and first experiment.'}}
    ]},
    {id:'compare',fa:{title:'دو مسیر را کنار هم ببینید'},en:{title:'Compare two approaches'},blocks:[
      {type:'paragraph',fa:'روی هر تب کلیک کنید تا تمرکز آن مسیر و یک پرسش راهنما را ببینید. در مقالهٔ واقعی، این تب‌ها می‌توانند دو راهکار، دو محصول یا دو سناریو را مقایسه کنند.',en:'Select a tab to explore its focus and a guiding question. In a real article, these tabs could compare two approaches, products or scenarios.'},
      {type:'tabs',id:'approaches',items:[
        {fa:{label:'افزایش ورودی',title:'افراد بیشتری به سایت برسند',text:'این مسیر روی رسیدن مخاطبان مرتبط به سایت تمرکز دارد. پرسش راهنما: آیا ورودی بیشتر به اقدام ارزشمند هم منجر می‌شود؟'},en:{label:'More traffic',title:'Reach more people',text:'This approach focuses on bringing relevant visitors to the site. Guiding question: does more traffic also lead to valuable actions?'}},
        {fa:{label:'بهبود تبدیل',title:'از ورودی موجود بهتر استفاده کنیم',text:'این مسیر روی تجربهٔ بازدیدکنندگان فعلی و تکمیل اقدام هدف تمرکز دارد. پرسش راهنما: کدام اصطکاک در مسیر کاربر قابل کاهش است؟'},en:{label:'Better conversion',title:'Make more of existing traffic',text:'This approach focuses on the current visitor experience and completion of a target action. Guiding question: which friction in the journey could be reduced?'}}
      ]},
      {type:'details',fa:{title:'چرا قالب همهٔ تعامل‌ها را به هر مقاله اضافه نمی‌کند؟',text:'هر تعامل باید به پرسش مشخصی از مقاله پاسخ بدهد. ابزارها بر اساس محتوا انتخاب می‌شوند: نمودار برای داده یا رابطهٔ مشخص، واژه‌نامه برای اصطلاح و مقایسه برای انتخاب‌های واقعی. تعداد ابزارها را هدف خواندن تعیین می‌کند.'},en:{title:'Why not add every interaction to every article?',text:'Each interaction should answer a specific question in the article. Choose tools for the content: a chart for specific data or a relationship, a glossary for terms, and comparisons for real choices. The reading goal determines which tools belong.'}}
    ]},
    {id:'chart',fa:{title:'یک داده، چند زاویهٔ دید'},en:{title:'One dataset, different views'},blocks:[
      {type:'paragraph',fa:'شاخص را عوض کنید، بین نمودار خطی و ستونی جابه‌جا شوید و روی مقدار هر هفته کلیک کنید. این [[sample-data|مثال ساختگی]] فقط رفتار نمودار را نشان می‌دهد.',en:'Change the metric, switch between bars and lines, and select a weekly value. This [[sample-data|illustrative example]] only demonstrates the chart interactions.'},
      {type:'chart',id:'weekly-chart',fa:{title:'مقایسهٔ دو سناریوی نمونه',source:'منبع: دادهٔ ساختگی برای نمایش قالب؛ نه آمار واقعی.',method:'نرخ تبدیل این مثال = سفارش ÷ بازدید × ۱۰۰. وقتی بازدید صفر باشد، نرخ تبدیل تعریف نشده و به‌صورت «—» نمایش داده می‌شود.'},en:{title:'Two illustrative scenarios',source:'Source: made-up demonstration data, not actual performance.',method:'For this example, conversion rate = orders ÷ visits × 100. With zero visits the rate is undefined and is shown as “—”.'},
        labels:{fa:['هفتهٔ ۱','هفتهٔ ۲','هفتهٔ ۳','هفتهٔ ۴'],en:['Week 1','Week 2','Week 3','Week 4']},
        metrics:[{id:'visits',key:'visits',format:'number',fa:'بازدید',en:'Visits'},{id:'orders',key:'orders',format:'number',fa:'سفارش',en:'Orders'},{id:'rate',numerator:'orders',denominator:'visits',multiplier:100,format:'percent',fa:'نرخ تبدیل (%)',en:'Conversion rate (%)'}],
        series:[{id:'base',fa:'سناریوی اول',en:'Scenario A',values:{visits:[1000,1200,1100,1300],orders:[16,20,18,21]}},{id:'change',fa:'سناریوی دوم',en:'Scenario B',values:{visits:[1000,1200,1100,1300],orders:[22,30,29,36]}}]
      }
    ]},
    {id:'simulator',fa:{title:'حالا خودتان امتحان کنید'},en:{title:'Now try it yourself'},blocks:[
      {type:'paragraph',fa:'بازدید و نرخ تبدیل را تغییر دهید. این ابزار فقط رابطهٔ ریاضی را نشان می‌دهد؛ پیش‌بینی عملکرد یک کسب‌وکار نیست.',en:'Change the visits and conversion rate. This tool illustrates a mathematical relationship; it does not forecast a business’s performance.'},
      {type:'simulator',id:'conversion-lab',visits:10000,rate:2,fa:{title:'آزمایشگاه کوچک تبدیل',note:'برآورد آموزشی: بازدید × نرخ تبدیل ÷ ۱۰۰، با گرد کردن به نزدیک‌ترین عدد صحیح.'},en:{title:'A small conversion lab',note:'Illustrative estimate: visits × conversion rate ÷ 100, rounded to the nearest whole number.'}}
    ]},
    {id:'next',fa:{title:'مسیر خواندن را ادامه بدهید'},en:{title:'Keep exploring'},blocks:[
      {type:'paragraph',fa:'لینک داخلی باید ادامهٔ طبیعی موضوع باشد. می‌توانید [مسیر کاری من](@cv) را ببینید یا برای صحبت دربارهٔ یک ایده از [صفحهٔ تماس](@contact) استفاده کنید.',en:'An internal link should be a natural next step. Explore [my professional journey](@cv) or visit the [contact page](@contact) to discuss an idea.'}
    ]}
  ],
  related:[{target:'cv:projects',fa:{title:'منتخبی از پروژه‌ها',description:'کارها و تجربه‌های مرتبط با مسیر حرفه‌ای من.'},en:{title:'Selected projects',description:'Work and experience from my professional journey.'}},{target:'contact',fa:{title:'از یک ایده تا یک گفت‌وگو',description:'راه‌های ارتباط برای همکاری و پروژه‌ها.'},en:{title:'From an idea to a conversation',description:'Ways to connect about work and projects.'}}]
};
