import { escapeHTML as esc } from './blog-core.mjs';

const copy = {
  fa: {
    title:'پنج درخواست روی میز فروش', sources:'منابعی که می‌خواهی وصل کنی', form:'شناسهٔ تبلیغ از فرم', sales:'نتیجهٔ تماس از فروش',
    formOff:'فرم وصل نیست', unknown:'منشأ نامعلوم', salesOff:'فروش وصل نیست', fit:'کافه تأیید شد', other:'سفارش شخصی', pending:'در انتظار تماس',
    row:'درخواست', labels:'پرونده‌های آموزشی', chart:'درخواست‌های تأییدشدهٔ کافه به تفکیک منشأ', needBoth:'برای تفکیک درخواست‌های مناسب بین تبلیغ‌ها، هر دو منبع رو وصل کن.',
    none:'پنج فرم ثبت شده. هنوز نمی‌دونیم درخواست‌ها از کجا اومدن یا برای کافه بودن.',
    formOnly:'منشأ چهار فرم معلومه. نتیجهٔ تماس‌ها رو وصل کن تا بفهمی کدوم درخواست به کارگاه مربوطه.',
    salesOnly:'سه درخواست از کافه‌هاست. برای نسبت‌دادن اون‌ها به تبلیغ، شناسهٔ فرم رو لازم داریم.',
    both:'از سه درخواست تأییدشده، دو تا از تبلیغ لعاب اومدن و منشأ یکی نامعلومه. برای درخواست E هنوز نتیجهٔ تماس نداریم.'
  },
  en: {
    title:'Five enquiries at the sales desk', sources:'Connect a source', form:'Ad ID from the form', sales:'Outcome from sales',
    formOff:'Form disconnected', unknown:'Unknown source', salesOff:'Sales disconnected', fit:'Café confirmed', other:'Personal order', pending:'Awaiting follow-up',
    row:'Enquiry', labels:'Illustrative enquiries', chart:'Confirmed café enquiries by source', needBoth:'Connect both sources to break qualified enquiries down by ad.',
    none:'Five forms arrived. Their sources and sales outcomes are still unknown.',
    formOnly:'Four forms have a recorded source. Connect sales to see which enquiries came from cafés.',
    salesOnly:'Three cafés were confirmed. Connect the form IDs to attribute them to ads.',
    both:'Two of the three confirmed cafés came from the glaze ad. One has no recorded source. E is still awaiting follow-up.'
  }
};

export function campaignTraceRows(block, showSource, showOutcome) {
  return block.enquiries.map(({id, campaign, outcome}) => ({
    id, source: showSource ? campaign ?? 'unknown' : 'formOff',
    outcome: showOutcome ? outcome ?? 'pending' : 'salesOff'
  }));
}

export function renderTrace(block, id, lang) {
  const t = copy[lang];
  return `<section class="trace-desk" data-trace-desk="${id}" aria-labelledby="${id}-title">
    <h3 id="${id}-title">${esc(t.title)}</h3>
    <fieldset><legend>${esc(t.sources)}</legend>
      <label><input type="checkbox" name="form"> ${esc(t.form)}</label>
      <label><input type="checkbox" name="sales"> ${esc(t.sales)}</label>
    </fieldset>
    <ol class="trace-ledger" aria-label="${esc(t.labels)}"></ol>
    <div class="trace-totals"></div><p class="trace-result" role="status"></p>
  </section>`;
}

export function mountTraces(root, blocks, lang, signal) {
  const t = copy[lang];
  const number = new Intl.NumberFormat(lang);
  for (const desk of root.querySelectorAll('[data-trace-desk]')) {
    const block = blocks.get(desk.dataset.traceDesk);
    const names = Object.fromEntries(block.campaigns.map(c => [c.id, c[lang]]));
    const keys = [...Object.keys(names), 'unknown'];
    const update = () => {
      const form = desk.querySelector('[name="form"]').checked;
      const sales = desk.querySelector('[name="sales"]').checked;
      const rows = campaignTraceRows(block, form, sales);
      desk.querySelector('ol').innerHTML = rows.map(row =>
        `<li><b><span class="trace-sr">${esc(t.row)} </span><bdi>${esc(row.id)}</bdi></b>
         <span>${esc(names[row.source] ?? t[row.source])}</span>
         <span data-outcome="${esc(row.outcome)}">${esc(t[row.outcome])}</span></li>`
      ).join('');
      const results = desk.querySelector('.trace-totals');
      if (form && sales) {
        const bars = keys.map(key => {
          const count = rows.filter(r => r.source === key && r.outcome === 'fit').length;
          return `<li><span>${esc(names[key] ?? t.unknown)}</span>
            <meter min="0" max="${rows.length}" value="${count}" aria-hidden="true"></meter>
            <strong>${number.format(count)}</strong></li>`;
        }).join('');
        results.innerHTML = `<h4>${esc(t.chart)}</h4><ul>${bars}</ul>`;
      } else {
        results.textContent = t.needBoth;
      }
      desk.querySelector('[role="status"]').textContent = form ? (sales ? t.both : t.formOnly) : (sales ? t.salesOnly : t.none);
    };
    desk.addEventListener('change', update, {signal});
    update();
  }
}
