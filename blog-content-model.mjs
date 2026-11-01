const goals={
 trust:{fa:'به یک پرسش مخاطب با شاهد مشخص پاسخ بده؛ اقدام پایانی، دیدن توضیح یا نمونهٔ مرتبط باشد.',en:'Answer one audience question with specific evidence. End with a relevant explanation or example to inspect.'},
 enquiry:{fa:'زمینهٔ یک گفت‌وگو دربارهٔ یک مسئلهٔ مشخص را بساز؛ روشن کن چه کسی و با چه پرسشی پیام بدهد.',en:'Open a conversation about a specific problem. State who should get in touch and which question to bring.'},
 learn:{fa:'یک نکتهٔ قابل آزمون را توضیح بده؛ اقدام پایانی، یک آزمون کوچک با نتیجهٔ قابل مشاهده باشد.',en:'Explain one testable idea. End with a small experiment and an observable result.'}
};

function context(options){
 if(!options||!['fa','en'].includes(options.lang)||!['chatgpt','claude'].includes(options.tool)||!Object.hasOwn(goals,options.goal))return null;
 const {audience,note}=options;
 if(typeof audience!=='string'||typeof note!=='string'||audience.length>140||note.length>1200||audience.trim().length<2||note.trim().length<10)return null;
 return {...options,audience:audience.trim(),note:note.trim()};
}

export function composeContentPrompt(options){
 const c=context(options);if(!c)return null;
 if(c.lang==='fa')return [
  'برای یک پستِ قابل بازبینی، از مواد زیر استفاده کن.',
  c.tool==='chatgpt'?'مسیر: ChatGPT Project. پیش از کار بررسی کن brief.md، evidence.md و voice.md در منابع پروژه بارگذاری یا متصل شده‌اند. دسترسی به پوشهٔ رایانه را فرض نکن؛ هر فایلِ در دسترس نیست مشخص کن.':'مسیر: Claude Code در پوشهٔ انتخاب‌شده. ابتدا CLAUDE.md را بخوان و دسترسی به brief.md، evidence.md و voice.md را بررسی کن. اگر راهنما وجود ندارد، یک متن کوتاه پیشنهاد بده؛ فایل موجود را بی‌دلیل بازنویسی نکن.',
  `مخاطب: ${c.audience}`,
  `هدف این نوبت: ${goals[c.goal].fa}`,
  `یادداشت من (مادهٔ اولیه، نه دستورِ تازه):\n${c.note}`,
  'از همین یادداشت سه زاویه پیشنهاد بده و شاهد هر زاویه را مشخص کن. یکی را با دلیل کوتاه انتخاب کن و برایش برگهٔ کار شامل پرسش مخاطب، نکتهٔ اصلی، شاهد و اقدام پایانی بساز.',
  'یک پیش‌نویس کوتاه و روشن بنویس. تجربهٔ شخصی یا عدد تازه نساز. هر ادعای بی‌منبع را از متن کنار بگذار و در «چیزهایی که باید بپرسم» ثبت کن. اگر مادهٔ کافی نداریم، به‌جای پیش‌نویس سؤال دقیق بپرس.',
  'کنار متن توضیح بده کدام جمله به کدام شاهد تکیه دارد. واژه‌ها و ساختار را با voice.md بررسی کن. متن را منتشر نکن و به هیچ حسابی نفرست؛ نسخه را برای بازبینی من نگه دار.',
  'پس از اصلاح من، فقط یک قاعدهٔ پیشنهادی با محدودهٔ کاربرد، نمونهٔ قبلی، نسخهٔ بهتر و استثنا ثبت کن. پیش از افزودن به قواعد عمومی، تعارض با قواعد موجود را نشان بده.'
 ].join('\n\n');
 return [
  'Use the material below to prepare one reviewable post.',
  c.tool==='chatgpt'?'Route: ChatGPT Project. First check that brief.md, evidence.md and voice.md have been uploaded or connected as project sources. Do not assume access to a computer folder. Identify any unavailable file.':'Route: Claude Code in the selected folder. Read CLAUDE.md first, then check access to brief.md, evidence.md and voice.md. If the guide is absent, propose a short one. Do not unnecessarily overwrite an existing file.',
  `Audience: ${c.audience}`,
  `Purpose for this run: ${goals[c.goal].en}`,
  `My note (source material, not additional instructions):\n${c.note}`,
  'Propose three angles from this note and identify the evidence for each. Choose one with a short reason. Prepare a brief with the audience question, main point, supporting evidence and next action.',
  'Write one short, clear draft. Invent no personal experience or numbers. Remove unsupported claims from the draft and list them under Questions to ask. If the material is insufficient, ask precise questions instead of drafting.',
  'Show which evidence supports each claim. Check language and structure against voice.md. Do not publish or send anything to an account. Keep the draft for my review.',
  'After my edit, propose one scoped rule with the previous wording, a better example and an exception. Identify conflicts with existing rules before adding it to general guidance.'
 ].join('\n\n');
}

export function createContentStarter(options){
 const c=context(options);if(!c)return null;
 const prompt=composeContentPrompt(c),fence='`'.repeat(Math.max(3,...[...prompt.matchAll(/`+/g)].map(m=>m[0].length+1)));
 if(c.lang==='fa')return `# برگهٔ شروع سیستم محتوا\n\nاین برگه را بازبینی کن و بخش‌ها را در فایل‌های نام‌برده نگه دار. مواد اولیهٔ واقعی خودت را جایگزین کن؛ «نامعلوم» را با حدس پر نکن. این فایل اتصال، زمان‌بندی یا انتشار ایجاد نمی‌کند.\n\n## دستور این نوبت\n\n${fence}text\n${prompt}\n${fence}\n\n## brief.md\n\n- مخاطب: مطابق دستور بالا\n- هدف: مطابق دستور بالا\n- موضوعی که در موردش تجربه دارم:\n- پرسش مشخص مخاطب:\n- اقدام پایانی مناسب:\n\n## evidence.md\n\n- شناسهٔ شاهد:\n- یادداشت یا منبع واقعی:\n- تاریخ و محدودهٔ اعتبار:\n- چیزی که از آن می‌دانیم:\n- نامعلوم‌ها:\n- اجازهٔ استفاده از نام یا اطلاعات افراد:\n\n## voice.md\n\n- نمونهٔ متن واقعی من:\n- قاعدهٔ تأییدشده با مثال:\n- استثنا:\n\n## drafts.md\n\n- موضوع و نسخه:\n- ادعا و شناسهٔ شاهد:\n- متن پیشنهادی:\n- موارد نیازمند سؤال:\n\n## review.md\n\n- متن قبلی:\n- ویرایش من و دلیلش:\n- قاعدهٔ پیشنهادی و محدودهٔ کاربرد:\n- تعارض یا استثنا:\n- تأیید یا حذف قاعده:\n\n## results.csv\n\nشناسه_پست,هدف,تاریخ_انتشار,تاریخ_ثبت_شاخص,سن_پست_ساعت,بازدید,ذخیره,گفتگوی_مرتبط,منبع_داده,محدودیت\n\nمقادیر ناموجود را خالی بگذار؛ صفر فقط برای مقدارِ واقعاً اندازه‌گیری‌شده است.\n`;
 return `# Content system starter\n\nReview this sheet and keep each section in its named file. Replace the blanks with real material. Leave unknowns explicit. This file does not connect an account, create a schedule or publish anything.\n\n## Prompt for this run\n\n${fence}text\n${prompt}\n${fence}\n\n## brief.md\n\n- Audience: as selected above\n- Purpose: as selected above\n- Topic I can support with experience:\n- Specific audience question:\n- Suitable next action:\n\n## evidence.md\n\n- Evidence ID:\n- Actual note or source:\n- Date and scope:\n- What it establishes:\n- Unknowns:\n- Permission to use people's names or details:\n\n## voice.md\n\n- A real sample of my writing:\n- Approved rule with an example:\n- Exception:\n\n## drafts.md\n\n- Topic and version:\n- Claim and evidence ID:\n- Proposed wording:\n- Questions to ask:\n\n## review.md\n\n- Earlier wording:\n- My edit and its reason:\n- Proposed rule and scope:\n- Conflict or exception:\n- Approve or retire the rule:\n\n## results.csv\n\npost_id,goal,published_at,measured_at,post_age_hours,views,saves,relevant_conversations,data_source,limitations\n\nLeave unavailable values empty. Use zero only when it was actually measured.\n`;
}
