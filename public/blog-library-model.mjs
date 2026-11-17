import { publishedPosts } from './blog-core.mjs';
export const normalizeLibraryText=value=>String(value??'').normalize('NFKC').replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/\u200c/g,' ').replace(/\s+/g,' ').trim().toLocaleLowerCase();
export function blogLibrarySelection(posts,{lang='fa',query='',category=''}={}){
 const language=lang==='en'?'en':'fa',live=publishedPosts(posts).filter(post=>post.fa?.title&&post.en?.title);
 const categories=[...new Map(live.map(post=>post[language].category).filter(Boolean).map(name=>[normalizeLibraryText(name),name])).values()];
 const terms=normalizeLibraryText(query).split(' ').filter(Boolean),filtered=terms.length>0||!!category;
 const matches=live.filter(post=>{
  const text=normalizeLibraryText(['fa','en'].flatMap(key=>[post[key].title,post[key].subtitle,post[key].excerpt,post[key].category]).join(' '));
  return (!category||normalizeLibraryText(post[language].category)===normalizeLibraryText(category))&&terms.every(term=>text.includes(term));
 });
 return {featured:filtered?null:matches[0]||null,items:filtered?matches:matches.slice(1),categories,filtered};
}

const editorPicks = ['strategic-next-move', 'ai-video-production', 'company-brain'];
const readingCollections = [
  {
    id:'ai-content', guided:true,
    fa:{
      name:'پروندهٔ هوش مصنوعی و تولید محتوا', title:'از یک سؤال واقعی تا ویدیوی کوتاه',
      intro:'یک سؤال بردار که مشتری یا همکارت واقعاً از تو پرسیده. در این سه نوشته، همان سؤال را به سوژه، پیش‌نویس و چند نمای ویدیویی تبدیل می‌کنی.',
    },
    en:{
      name:'AI & content production', title:'From a real question to a short video',
      intro:'Start with a question a customer or colleague has actually asked you. These three articles help you find the story, draft an answer and decide what to show on screen.',
    },
    steps:[
      {slug:'make-expertise-understandable',
        fa:{label:'اول، سوژه را پیدا کن', note:'مشتری دنبال هزینهٔ ارسال می‌گشت. از مثال مقاله کمک بگیر و بنویس در کار خودت چه چیزی برای مخاطب مبهم بود.'},
        en:{label:'First, find the story', note:'A shopper couldn’t find the delivery charge. Use that example to recall a detail someone needed you to explain in your own work.'}},
      {slug:'ai-content-system',
        fa:{label:'بعد، جواب را بنویس', note:'سؤال و اطلاعاتی را که جوابش را روشن می‌کند به مدل بده. یک جملهٔ پیش‌نویس را اصلاح کن و دلیل تغییرش را نگه دار.'},
        en:{label:'Next, draft the answer', note:'Give the model your question and the facts that answer it. Revise a sentence in the draft and save the reason for your edit.'}},
      {slug:'ai-video-production',
        fa:{label:'حالا، یک صحنه بساز', note:'از متنت یک اتفاقِ دیدنی انتخاب کن. مثال جعبهٔ هدیه و روبان را دنبال کن تا ببینی بین دو نما چه چیزی باید ثابت بماند.'},
        en:{label:'Then, plan the shots', note:'Pick a moment in your draft you can show. Follow the gift box and its ribbon to see what needs to stay the same between shots.'}},
    ],
  },
  {
    id:'journal-collection',
    fa:{name:'پروندهٔ فروش آنلاین', title:'از جست‌وجو تا رسید خرید', intro:'خریدار چطور پیدایت می‌کند؟ چطور مدلش را انتخاب می‌کند؟ اگر پول از حسابش کم شد و رسید نگرفت، چه می‌شود؟'},
    en:{name:'Ecommerce collection', title:'From search to the order receipt', intro:'How does a buyer find you, choose a model and track down an order when the money has left their account?'},
    steps:[
      {slug:'search-to-sale', fa:{label:'پیدا کردن محصول'}, en:{label:'Discovery'}},
      {slug:'product-page-decisions', fa:{label:'انتخاب مدل'}, en:{label:'Choosing a model'}},
      {slug:'boomerang-channels', fa:{label:'پیگیری پرداخت'}, en:{label:'Tracing a payment'}},
    ],
  },
];

export function journalEdition(posts, lang) {
  const {featured, items, categories} = blogLibrarySelection(posts, {lang});
  const ordered = featured ? [featured, ...items] : [];
  const available = new Map(ordered.map(post => [post.slug, post]));
  const collections = [];
  const front = new Set();
  for (const group of readingCollections) {
    if (!group.steps.every(step => available.has(step.slug) && !front.has(step.slug))) continue;
    const steps = group.steps.map(step => ({post:available.get(step.slug), ...step[lang]}));
    collections.push({id:group.id, guided:group.guided, ...group[lang], steps});
    for (const {post} of steps) front.add(post.slug);
  }
  if (featured) front.add(featured.slug);
  const picks = editorPicks.filter(slug => available.has(slug) && !front.has(slug)).slice(0,2).map(slug => available.get(slug));
  for (const post of picks) front.add(post.slug);
  return {featured, picks, collections, ordered, front, categories};
}
