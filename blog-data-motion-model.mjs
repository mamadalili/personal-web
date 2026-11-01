const text = value => typeof value === 'string' && value.trim().length > 0;
const labels = (fa, en, detailFa, detailEn) => ({ fa: { label: fa, detail: detailFa }, en: { label: en, detail: detailEn } });

export function valuePosition(value, { scale = 'linear', min = 0, max }) {
  if (![value, min, max].every(Number.isFinite) || max <= min || value < min) return null;
  if (scale === 'log' && (value <= 0 || min <= 0)) return null;
  const position = scale === 'log' ? Math.log(value / min) / Math.log(max / min) : (value - min) / (max - min);
  return Math.max(0, Math.min(1, position));
}

export function comparisonChange(model) {
  if (model.kind !== 'comparison' || model.rows.length !== 2 || model.rows[0].value <= 0) return null;
  return Math.round((model.rows[1].value / model.rows[0].value - 1) * 10000) / 100;
}

export function validateMotion(model, sources = []) {
  if (!model || !['comparison', 'magnitude', 'handoff'].includes(model.kind)) return false;
  if (!text(model.after) || !Array.isArray(model.rows) || model.rows.length < 2 || model.rows.length > 8) return false;
  if (model.kind === 'comparison' && model.rows.length !== 2) return false;
  for (const lang of ['fa', 'en']) {
    if (!['title', 'intro', 'unit', 'note', 'evidence'].every(key => text(model[lang]?.[key]))) return false;
  }
  const sourceIds = new Set(sources.filter(s => /^https?:\/\//.test(s.url)).map(s => s.id));
  const ids = new Set();
  for (const row of model.rows) {
    if (!/^[a-z0-9-]+$/.test(row.id) || ids.has(row.id)) return false;
    ids.add(row.id);
    if (!Array.isArray(row.sourceIds) || !row.sourceIds.length || row.sourceIds.some(id => !sourceIds.has(id))) return false;
    if (['fa', 'en'].some(lang => !text(row[lang]?.label) || !text(row[lang]?.detail))) return false;
    if (model.kind === 'handoff') {
      if (row.value !== undefined || ['fa', 'en'].some(lang => !['input', 'output', 'check'].every(key => text(row[lang]?.[key])))) return false;
    } else if (!Number.isFinite(row.value) || row.value < 0 || row.value > model.max || valuePosition(row.value, model) === null) return false;
  }
  return true;
}

function chartRows(article, sectionId, key, sourceId) {
  const chart = article.sections.find(s => s.id === sectionId)?.blocks.find(b => b.type === 'chart');
  const values = chart?.series?.[0]?.values?.[key];
  if (!Array.isArray(values) || values.length !== 2) return [];
  return values.map((value, index) => ({
    id: index ? 'after' : 'before', value, sourceIds: [sourceId],
    ...labels(chart.labels.fa[index], chart.labels.en[index], chart.observations?.[index]?.fa || chart.fa.method, chart.observations?.[index]?.en || chart.en.method)
  }));
}

export function dataMotionFor(article) {
  if (!article || article.status !== 'published' || article.template) return null;
  let model;
  if (article.slug === 'ai-payoff-workload') {
    model = {
      kind: 'comparison', after: 'historical-test', scale: 'linear', min: 0, max: 125,
      rows: chartRows(article, 'historical-test', 'time', 'metr-2025'),
      fa: { title: 'زمان بیشتر را با خروجی بیشتر اشتباه نگیر', intro: 'در این آزمایش، میلهٔ بلندتر یعنی انجام کار بیشتر طول کشیده؛ نه اینکه خروجی بهتر شده باشد.', unit: 'شاخص زمان · بدون AI = ۱۰۰', evidence: 'آزمایش METR، ابتدای ۲۰۲۵', note: '۱۰۰ و ۱۱۹ شاخص‌اند، نه دقیقه. ۱۶ توسعه‌دهنده و ۲۴۶ کار؛ نتیجهٔ همان آزمایش. پیگیری فوریهٔ ۲۰۲۶ محدودیتِ انتخاب نمونه را توضیح می‌دهد. این حرکت، دادهٔ تازه یا حکم دربارهٔ ابزارهای امروز نیست.' },
      en: { title: 'More time is not more output', intro: 'In this experiment, a longer bar means the task took longer. It does not mean a better result.', unit: 'Time index · no AI = 100', evidence: 'METR experiment, early 2025', note: '100 and 119 are indices, not minutes: 16 developers and 246 tasks in this setting. The February 2026 follow-up explains selection limitations. The animation adds no observations and does not assess today’s tools.' }
    };
  } else if (article.slug === 'normalized-friction') {
    model = {
      kind: 'comparison', after: 'reported-case', scale: 'linear', min: 0, max: 80,
      rows: chartRows(article, 'reported-case', 'hours', 'retail-sponsored'),
      fa: { title: 'همان کار، دو مقدارِ گزارش‌شده', intro: 'زمان برنامه‌ریزی راننده‌ها را کنار هم ببین. کوتاه‌شدن این میله، به‌تنهایی چیزی دربارهٔ سود یا هزینهٔ ابزار نمی‌گوید.', unit: 'نفرساعت در هفته', evidence: 'روایت فروشنده · مطلب حمایت‌شده', note: 'D-Wave در Retail Dive از تغییر ۸۰ به ۱۵ نفرساعت در Pattison می‌گوید. اختلاف از همین دو عدد محاسبه می‌شود؛ پژوهش مستقل و پیش‌بینی نتیجهٔ فروشگاه دیگر نیست. حفظ آستانهٔ ۹۵٪ تقاضا، رشد از صفر تا ۹۵٪ نیست.' },
      en: { title: 'One task, two reported figures', intro: 'Compare the time spent scheduling drivers. The shorter bar alone tells us nothing about profit or the tool’s cost.', unit: 'Person-hours per week', evidence: 'Vendor account · sponsored article', note: 'D-Wave’s Retail Dive account reports a change from 80 to 15 person-hours at Pattison. The difference is calculated from those two figures, not an independent evaluation or a forecast for another retailer. The 95% demand threshold was maintained, not raised from zero.' }
    };
  } else if (article.slug === 'capital-one-ai') {
    model = {
      kind: 'comparison', after: 'read-the-numbers', scale: 'linear', min: 0, max: 300,
      rows: [
        { id: 'before', value: 300, sourceIds: ['mitsmr-capital-one'], ...labels('پیش از تغییر', 'Before the change', 'پنج ساعت برای یک وظیفهٔ مشخص در روایت مدیر شرکت؛ ۵ × ۶۰ = ۳۰۰ دقیقه.', 'Five hours for one specific task in the executive’s account: 5 × 60 = 300 minutes.') },
        { id: 'after', value: 3, sourceIds: ['mitsmr-capital-one'], ...labels('پس از تغییر', 'After the change', 'سه دقیقه برای همان وظیفه، طبق مصاحبه؛ روش مستقل و خط مبنای کامل منتشر نشده است.', 'Three minutes for that task according to the interview; no independent method or complete baseline is published.') }
      ],
      fa: { title: 'پنج ساعت تا سه دقیقه؛ فقط برای همان کار', intro: 'واحد را یکی کن تا مقایسه روشن شود. این‌جا فقط زمانِ یک وظیفه را می‌بینیم؛ عددهای خطا و ساعتِ صرفه‌جویی را به آن اضافه نمی‌کنیم.', unit: 'دقیقه برای یک وظیفهٔ مشخص', evidence: 'گزارش مدیر Capital One در مصاحبه', note: 'تبدیل واحد: ۵ ساعت × ۶۰ = ۳۰۰ دقیقه. دو عدد، گزارش شرکت‌اند. اختلافِ محاسبه‌شده شامل هزینهٔ ساخت، نظارت یا بازده مالی نیست و به تمام کارهای بانک تعمیم ندارد.' },
      en: { title: 'Five hours to three minutes, for that task only', intro: 'Use one unit before comparing. This scene isolates the time for one task; it does not combine error rates and total hours saved.', unit: 'Minutes for one specific task', evidence: 'Capital One executive’s interview account', note: 'Unit conversion: 5 hours × 60 = 300 minutes. Both figures are company-reported. The calculated difference excludes build cost, oversight and financial return, and does not extend to all bank work.' }
    };
  } else if (article.slug === 'ai-model-market') {
    model = {
      kind: 'magnitude', after: 'training', scale: 'log', min: 1e3, max: 1e9, format: 'usd',
      rows: (article.atlas?.training || []).map(row => ({ id: row.id, value: row.cost, year: row.year, sourceIds: row.sources,
        ...labels(row.name, row.name, `برآورد اجرای آموزش ${row.name}؛ سال معرفی ${row.year} میلادی. این رقم، کل بودجهٔ ساخت محصول نیست.`, `Estimated ${row.name} training run; release year ${row.year}. This is not the full product-development budget.`) })),
      fa: { title: 'چند هزار دلار و نیم میلیارد، روی یک مقیاس', intro: 'هر خط عمودی یک جهش ده‌برابری است. مدل را انتخاب کن تا رقمش را ببینی؛ نقاط بین مدل‌ها، اندازه‌گیری نشده‌اند.', unit: 'دلار آمریکا · مقیاس لگاریتمی', evidence: 'برآوردهای منتخب Epoch AI', note: 'شش نمونه از دادهٔ همین مقاله، از ۲۰۱۹ تا ۲۰۲۵ میلادی؛ نه کل بازار. رقم‌ها برای خواندن به دلار گرد شده‌اند. هزینهٔ اجرای آموزش با حقوق، تحقیق، تلاش‌های ناموفق و پاسخ‌گویی به کاربران فرق دارد. حرکت، روند پیوسته یا دادهٔ بین سال‌ها نمی‌سازد.' },
      en: { title: 'Thousands and half a billion, on one scale', intro: 'Each vertical mark is a tenfold step. Select a model for its estimate; the gaps between models contain no measured observations.', unit: 'US dollars · logarithmic scale', evidence: 'Selected Epoch AI estimates', note: 'Six observations from this article, spanning release years 2019–2025, not the whole market. Values are rounded to dollars for display. Training-run cost excludes staffing, research, failed attempts and inference. Motion creates no continuous trend or observations between years.' }
    };
  } else if (article.slug === 'ai-marketing-workflow') {
    const workflow = article.sections.flatMap(s => s.blocks).find(b => b.type === 'workflow');
    const ids = ['customer', 'research', 'plan', 'content'];
    const jobs = ids.map(id => workflow?.jobs.find(j => j.id === id));
    model = {
      kind: 'handoff', after: 'map',
      rows: jobs.filter(Boolean).map(job => ({ id: job.id, sourceIds: ['chris-guide'],
        fa: { label: job.fa.title, detail: `${job.fa.input} ← ${job.fa.output}`, input: job.fa.input, output: job.fa.output, check: job.fa.check },
        en: { label: job.en.title, detail: `${job.en.input} → ${job.en.output}`, input: job.en.input, output: job.en.output, check: job.en.check }
      })),
      fa: { title: 'چیزی که بین نقش‌ها جابه‌جا می‌شود', intro: 'از پرسش مشتری تا پیش‌نویس، هر نقش چیزی می‌گیرد و چیزی تحویل می‌دهد. مرحله را عوض کن و ببین چه چیزی باید همراه خروجی بماند.', unit: 'مسیر نمونهٔ تحویل کار', evidence: 'مدل تحریریه بر پایهٔ راهنمای Chris', note: 'این چهار مرحله، یک مسیر از نقشهٔ بالاست؛ همهٔ شاخه‌ها را نشان نمی‌دهد. انتخاب مرحله به معنی اجرای کار یا تأیید واقعی نیست. حرکت زمانِ انجام، میزان خودکاربودن یا بازده را اندازه نمی‌گیرد؛ بازبینی انسانی در هر تحویل باقی می‌ماند.' },
      en: { title: 'What moves between the roles', intro: 'From a customer question to a draft, every role receives something and hands something over. Select a stage to inspect what needs to travel with the output.', unit: 'An illustrative handoff path', evidence: 'Editorial model based on Chris’s guide', note: 'These four stages trace one path through the map above, not every branch. Selecting a stage neither executes work nor grants real approval. Motion does not measure duration, automation or return; human review remains at each handoff.' }
    };
    if (jobs.some(job => !job)) return null;
  } else if (article.slug === 'store-beyond-storefront') {
    model = {
      kind: 'handoff', after: 'handover',
      rows: [
        { id: 'stock', sourceIds: ['red-store'], fa: { label: 'موجودی', detail: 'وعدهٔ صفحه باید با انبار بخواند.', input: 'وضعیتِ قابل اتکای انبار', output: 'وعدهٔ روشن در صفحهٔ محصول', check: 'کدام ثبت، ملاک است و اختلاف را چه کسی حل می‌کند؟' }, en: { label: 'Stock', detail: 'The page’s promise must match the warehouse.', input: 'A reliable inventory record', output: 'A clear product-page promise', check: 'Which record governs the promise, and who resolves a mismatch?' } },
        { id: 'order', sourceIds: ['red-store'], fa: { label: 'سفارش', detail: 'پرداخت، پایانِ کار نیست.', input: 'سفارش و وضعیت پرداخت', output: 'سفارشِ مشخص برای آماده‌سازی', check: 'پرداخت تأیید شده؛ آیا موجودی هم تأیید شده است؟' }, en: { label: 'Order', detail: 'Payment is not the end of the job.', input: 'An order and payment status', output: 'An identified order for fulfillment', check: 'Payment is confirmed. Has stock been confirmed too?' } },
        { id: 'delivery', sourceIds: ['red-store'], fa: { label: 'تحویل', detail: 'وضعیتِ واقعی باید به مشتری برسد.', input: 'ثبتِ خروج سفارش از انبار', output: 'اطلاع‌رسانی و راه پیگیری', check: 'پیام از وضعیت معتبر می‌آید یا از یک زمان‌بندیِ بی‌خبر؟' }, en: { label: 'Delivery', detail: 'The buyer needs the actual status.', input: 'A recorded dispatch', output: 'A status message and tracking route', check: 'Does the message use verified status, or just a blind schedule?' } },
        { id: 'remedy', sourceIds: ['red-store'], fa: { label: 'پاسخ‌گویی', detail: 'اگر وعده انجام نشد، مسئول لازم است.', input: 'پرسش یا مشکل مشتری', output: 'پاسخ و مسیر اصلاحِ مشخص', check: 'چه کسی اختیار اصلاح دارد و مشتری او را چطور پیدا می‌کند؟' }, en: { label: 'Support', detail: 'A missed promise needs an owner.', input: 'A buyer’s question or problem', output: 'An answer and a clear remedy route', check: 'Who has authority to act, and how does the buyer reach them?' } }
      ],
      fa: { title: 'سفارش از دکمهٔ خرید جلوتر می‌رود', intro: 'یک سفارش آزمایشی را از وعدهٔ موجودی تا پاسخ‌گویی دنبال کن. هر توقف، یک تحویل میان آدم‌ها و سیستم‌هاست.', unit: 'مسیر پیشنهادیِ یک سفارش آزمایشی', evidence: 'تمرین تحریریه با تکیه بر بحث مقاله', note: 'این یک مدل آموزشی است؛ سفارش واقعی، پرداخت یا پیام ارسال نمی‌شود. عدد فروش، زمان تحویل و نرخ تبدیل برای آن نساخته‌ایم. سه موقعیت بالاتر، دلیل بررسی این تحویل‌ها را توضیح می‌دهند.' },
      en: { title: 'An order travels beyond the buy button', intro: 'Follow a test order from the stock promise to support. Each stop is a handoff between people and systems.', unit: 'A proposed test-order path', evidence: 'Editorial exercise based on the article', note: 'This is a learning model: it places no order, takes no payment and sends no message. It invents no sales, delivery times or conversion rates. The three situations above explain why these handoffs matter.' }
    };
  }
  return validateMotion(model, article.sources) && article.sections.some(s => s.id === model.after) ? model : null;
}

export function withDataMotion(article) {
  if (article.sections?.some(s => s.id === 'data-motion')) return article;
  const model = dataMotionFor(article);
  if (!model) return article;
  const section = { id: 'data-motion', fa: { title: model.fa.title }, en: { title: model.en.title }, blocks: [{ type: 'data-motion', model }] };
  return { ...article, sections: article.sections.flatMap(s => s.id === model.after ? [s, section] : [s]) };
}

export function createMotionClock({ duration, onFrame, onState = () => {}, requestFrame = requestAnimationFrame, cancelFrame = cancelAnimationFrame }) {
  let progress = 1, frame = null, last = null, wanted = false, disposed = false;
  let environment = { visible: true, hidden: false, reduced: false };
  const running = () => wanted && environment.visible && !environment.hidden && !environment.reduced && !disposed;
  const state = () => ({ progress, wanted, running: running(), reduced: environment.reduced });
  const stop = () => { if (frame !== null) cancelFrame(frame); frame = null; last = null; };
  const tick = time => {
    frame = null;
    if (!running()) return;
    if (last !== null) progress = Math.min(1, progress + Math.max(0, time - last) / duration);
    last = time;
    onFrame(progress);
    if (progress >= 1) { wanted = false; last = null; onState(state()); }
    else frame = requestFrame(tick);
  };
  const sync = () => { stop(); if (running()) frame = requestFrame(tick); onState(state()); };
  return {
    play() { if (disposed || environment.reduced) return; if (progress >= 1) progress = 0; wanted = true; onFrame(progress); sync(); },
    pause() { wanted = false; sync(); },
    seek(value) { if (disposed || !Number.isFinite(value)) return; wanted = false; progress = Math.max(0, Math.min(1, value)); onFrame(progress); sync(); },
    setEnvironment(next) { if (disposed) return; environment = { ...environment, ...next }; if (environment.reduced) { wanted = false; progress = 1; onFrame(1); } sync(); },
    dispose() { disposed = true; wanted = false; stop(); },
    state
  };
}

export function createReplayTimer({ onReplay, setTimer = setTimeout, clearTimer = clearTimeout }) {
  let timer = null, disposed = false, enabled = true;
  let environment = { visible: false, hidden: false, reduced: false };
  const eligible = () => !disposed && enabled && environment.visible && !environment.hidden && !environment.reduced;
  const stop = () => { if (timer !== null) clearTimer(timer); timer = null; };
  const arm = () => {
    stop();
    if (eligible()) timer = setTimer(() => {
      timer = null;
      if (!eligible()) return;
      onReplay();
      arm();
    }, 60000);
  };
  return {
    restart: arm,
    setEnabled(value) { enabled = Boolean(value); arm(); },
    setEnvironment(next) {
      const changed = Object.keys(next).some(key => environment[key] !== next[key]);
      environment = { ...environment, ...next };
      if (changed) arm();
    },
    dispose() { disposed = true; stop(); }
  };
}
