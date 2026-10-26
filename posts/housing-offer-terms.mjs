export const post = {
  slug: 'housing-offer-terms', status: 'published', date: '2026-10-26', reviewed: '2026-10-26',
  fa: {
    title: 'وقتی شرایط پیشنهاد، معامله را جلو می‌برد',
    excerpt: 'در خرید خانه در آمریکا، قیمت فقط یکی از اجزای پیشنهاد است. کمک فروشنده، اعتبار وام‌دهنده و هزینهٔ کاهش نرخ را با هم اشتباه نگیر.',
    category: "استراتژی و تصمیم", readTime: '۴ دقیقه + بررسی مفهوم',
    credit: 'مقالهٔ مستقل با نقطهٔ شروع از Fast Company و اتکا به راهنماهای رسمی CFPB؛ دربارهٔ خرید خانه در آمریکا.',
    sourceNote: 'متن عمومی گزارش Associated Press در Fast Company خوانده شد. تعریف‌ها از CFPB و تمرین پرسش‌سازی مستقل است؛ نتیجه‌ای دربارهٔ مناسب‌بودن یک معامله از خبر گرفته نمی‌شود.',
    takeaways: ['پول لازم هنگام نهایی‌شدن و هزینهٔ بعدی وام را جدا بررسی کن.', 'کمک فروشنده و اعتبار وام‌دهنده یک چیز نیستند.', 'شرایط توافق را با سندهای وام تطبیق بده.']
  },
  en: {
    title: 'When Terms Move the Deal Forward',
    excerpt: 'In a US home purchase, price is one part of an offer. Distinguish seller contributions, lender credits and points before comparing the terms.',
    category: "STRATEGY & DECISIONS", readTime: '4 minutes + concept check',
    credit: 'Independent article prompted by Fast Company and grounded in official CFPB guides, specifically about US homebuying.',
    sourceNote: 'The public Associated Press report at Fast Company was read. Definitions come from CFPB; the question-building exercise is original. News does not establish whether an individual deal is suitable.',
    takeaways: ['Separate cash at closing from subsequent loan costs.', 'Seller contributions and lender credits are different.', 'Check agreed terms against the loan documents.']
  },
  sources: [
    { id: 'fc-housing', url: 'https://www.fastcompany.com/91629780/how-u-s-home-sellers-helping-buyers-make-deal-stagnant-housing-market', publisher: 'Fast Company / Associated Press', date: '2026-10-26', kind: 'inspiration', fa: { title: 'شرایط فروش خانه در آمریکا', note: 'گزارش Alex Veiga؛ متن عمومی خوانده شد، بدون بازنشر آمار یا مثال‌های شخصی.' }, en: { title: 'How US home sellers are helping buyers make a deal', note: 'Alex Veiga’s public report was read; statistics and individual cases are not reproduced.' } },
    { id: 'cfpb-closing', url: 'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/', publisher: 'Consumer Financial Protection Bureau', kind: 'guide', fa: { title: 'راهنمای سند نهایی وام', note: 'تعریف کمک فروشنده و مبلغ لازم هنگام نهایی‌شدن معامله؛ زمینهٔ آمریکا.' }, en: { title: 'Closing Disclosure explainer', note: 'Seller credits and cash to close in the US context.' } },
    { id: 'cfpb-points', url: 'https://www.consumerfinance.gov/ask-cfpb/how-should-i-use-lender-credits-and-points-also-called-discount-points-en-136/', publisher: 'Consumer Financial Protection Bureau', kind: 'guide', fa: { title: 'پوینت و اعتبار وام‌دهنده', note: 'تفاوت پرداخت اولیه و نرخ بهره؛ پیشنهادها باید با شرایط واقعی بررسی شوند.' }, en: { title: 'Lender credits and points', note: 'Upfront-cost and interest-rate tradeoffs; evaluate actual offers.' } },
    { id: 'cfpb-estimates', url: 'https://www.consumerfinance.gov/owning-a-home/compare/review-loan-estimates/', publisher: 'Consumer Financial Protection Bureau', kind: 'guide', fa: { title: 'بررسی برآورد وام', note: 'راهنمای مقایسهٔ سندهای Loan Estimate و پرسیدن دربارهٔ تفاوت‌ها.' }, en: { title: 'Review your Loan Estimates', note: 'Guidance for examining Loan Estimates and asking about differences.' } }
  ],
  sections: [
    { id: 'read-the-whole-offer', fa: { title: 'پیشنهاد را کامل بخوان' }, en: { title: 'Read the whole offer' }, blocks: [
      { type: 'callout', fa: 'گزارش Associated Press در Fast Company به کمک فروشندگان در هزینهٔ خریداران در بازار کم‌رونق آمریکا می‌پردازد. چنین کمکی لزوماً مسئلهٔ توان خرید را حل نمی‌کند.', en: 'The Associated Press report at Fast Company covers seller contributions toward buyer costs in a slow US market. Such contributions do not necessarily resolve affordability.' },
      { type: 'paragraph', fa: 'پیشنهاد خرید خانه را فراتر از قیمت بخوان: چه کسی کدام هزینه را می‌پردازد و در کدام سند؟ این تمرین برای زمینهٔ آمریکاست؛ توصیهٔ مالی یا قراردادی شخصی نیست. عنوان جذاب یک امتیاز کافی نیست.', en: 'Read a home offer beyond price: who pays which cost, and where is it documented? This US-context exercise is not an individual financial or contractual recommendation. An attractive incentive label is insufficient.' },
      { type: 'paragraph', fa: 'پیشنهاد عملی: برای هر امتیاز، پرداخت‌کننده، هزینهٔ مربوط و شرط آن را بنویس. اگر مبهم است، توضیح کتبی بخواه. «فروشنده کمک می‌کند» هنوز بخش تغییرکردهٔ توافق را مشخص نمی‌کند.', en: 'Practical proposal: describe each incentive’s payer, cost covered and conditions. Request a written explanation if unclear. “The seller helps” does not yet identify which part of the agreement changes.' }
    ] },
    { id: 'distinguish-the-terms', fa: { title: 'سه اصطلاح را از هم باز کن' }, en: { title: 'Separate three terms' }, blocks: [
      { type: 'tabs', items: [
        { fa: { label: 'کمک فروشنده', title: 'Seller credit', text: 'طبق راهنمای CFPB، کمک فروشنده سهم توافق‌شدهٔ او در هزینه‌های نهایی‌شدن است. هزینه‌های مشخص ممکن است جداگانه با عنوان پرداخت‌شده توسط فروشنده بیایند. پرسش پیشنهادی: توافق ما دقیقاً در کدام سطر سند منعکس شده است؟' }, en: { label: 'Seller credit', title: 'A seller contribution', text: 'CFPB describes seller credit as the seller’s agreed contribution to closing costs. Specific costs may instead appear as seller-paid items. Proposed question: which document line reflects our exact agreement?' } },
        { fa: { label: 'اعتبار وام‌دهنده', title: 'Lender credit', text: 'در مبادلهٔ مرتبط با نرخ که CFPB توضیح می‌دهد، اعتبار وام‌دهنده هزینهٔ اولیه را کم می‌کند و نرخ بالاتری دارد. پرسش پیشنهادی: در پیشنهاد واقعی من، دریافت اعتبار چه تغییری در نرخ و هزینهٔ وام ایجاد می‌کند؟' }, en: { label: 'Lender credit', title: 'A lender’s pricing tradeoff', text: 'In the rate-linked tradeoff CFPB describes, lender credits reduce upfront costs in exchange for a higher rate. Proposed question: how does this actual credit change the offered rate and loan costs?' } },
        { fa: { label: 'پوینت', title: 'Points', text: 'پوینتِ کاهش نرخ، پرداخت اولیهٔ بیشتر در برابر نرخ پایین‌تر است. میزان کاهش ثابت نیست. پرسش پیشنهادی: گزینه‌های با پوینت و بدون آن چه تفاوتی دارند؟' }, en: { label: 'Points', title: 'An upfront payment for a lower rate', text: 'Discount points increase upfront payment for a lower rate, with no fixed reduction. Proposed question: how do the actual offers with and without points differ?' } }
      ] }
    ] },
    { id: 'compare-documents', fa: { title: 'از نام امتیاز به سند برس' }, en: { title: 'Move from the label to the document' }, blocks: [
      { type: 'paragraph', fa: 'CFPB پیشنهاد می‌کند برآوردهای وام را دقیق بخوانید و دربارهٔ تفاوت با شرایط گفت‌وگوشده سؤال کنید. دریافت Loan Estimate به معنای تأیید نهایی وام نیست. [راهنمای رسمی بررسی](https://www.consumerfinance.gov/owning-a-home/compare/review-loan-estimates/). در سند نهایی نیز Cash to Close همان مبلغ لازم برای نهایی‌شدن است و با هزینه‌های نهایی‌شدن یکی نیست. [راهنمای سند نهایی](https://www.consumerfinance.gov/owning-a-home/closing-disclosure/).', en: 'CFPB advises reviewing Loan Estimates and questioning differences from the terms discussed. Receiving one does not mean the loan is approved. [Official review guide](https://www.consumerfinance.gov/owning-a-home/compare/review-loan-estimates/). On the final disclosure, cash to close is the amount needed at closing, distinct from closing costs. [Closing Disclosure guide](https://www.consumerfinance.gov/owning-a-home/closing-disclosure/).' },
      { type: 'paragraph', fa: 'تمرین پیشنهادی: کنار هر پرسش، سند مرجع و فرد پاسخ‌گو را بنویس. قیمت، پرداخت اولیه و تعهدهای بعدی را جدا ثبت کن. جای پاسخ را با حدس پر نکن. دربارهٔ قرارداد، برنامهٔ وام و اجرای توافق از متخصص مسئول همان معامله بپرس.', en: 'Suggested exercise: attach a reference document and responsible professional to each question. Separate price, upfront payment and later obligations. Leave unanswered items open rather than guessing. Ask the transaction professional about contract language, loan-program requirements and whether the arrangement can be implemented.' }
    ] },
    { id: 'check-the-inference', fa: { title: 'از یک امتیاز، نتیجهٔ کامل نگیر' }, en: { title: 'One concession does not settle the comparison' }, blocks: [
      { type: 'quiz', fa: { question: 'یک پیشنهاد پول کمتری هنگام نهایی‌شدن می‌خواهد. آیا حتماً هزینهٔ کل کمتری دارد؟' }, en: { question: 'An offer requires less cash at closing. Must its total cost be lower?' }, choices: [
        { correct: false, fa: 'بله؛ مبلغ اولیه همهٔ هزینه را نشان می‌دهد.', en: 'Yes; upfront cash captures the whole cost.' },
        { correct: true, fa: 'از این اطلاعات تنها نمی‌توان نتیجه گرفت؛ شرایط وام و هزینه‌های بعدی هم لازم است.', en: 'That information alone is insufficient; loan terms and later costs matter too.' },
        { correct: false, fa: 'نه؛ هر کمک اولیه حتماً معامله را بدتر می‌کند.', en: 'No; every upfront contribution necessarily makes a deal worse.' }
      ], faExplanation: 'این پرسش فقط محدودیت اطلاعات را نشان می‌دهد. پیشنهاد بهتر را با سندهای واقعی و شرایط همان معامله بررسی کنید.', enExplanation: 'The question identifies an information gap. Evaluate the actual documents and circumstances of the transaction.' },
      { type: 'details', fa: { title: 'پرسش پایانی برای گفت‌وگو', text: 'کدام بخش پیشنهاد هنوز تأیید نشده؟ خروجی تمرین، پرسش‌های دقیق است؛ قیمت مناسب یا تصمیم خرید را تعیین نمی‌کند.' }, en: { title: 'A final discussion question', text: 'Which terms are clear and which still need confirmation? This exercise produces precise questions; it does not determine a suitable price or a buying decision.' } }
    ] }
  ],
  related: [
    { target: 'post:product-page-decisions', fa: { title: 'صفحهٔ محصول؛ کمک به تصمیم خرید', description: 'اطلاعات لازم برای انتخاب را روشن ارائه کن.' }, en: { title: 'Product Pages That Help People Decide', description: 'Make the information needed for a choice clear.' } },
    { target: 'post:strategy-means-choices', fa: { title: 'استراتژی یعنی انتخاب‌های روشن', description: 'گزینه، محدودیت و انتخاب را جدا ببین.' }, en: { title: 'Strategy Means Clear Choices', description: 'Distinguish options, constraints and choices.' } }
  ]
};
