<div dir="rtl" lang="fa">

# خانهٔ دیجیتال محمدرضا دلیلی

[دیدن سایت](https://mrdalili.ir/?lang=fa) · [روایت‌های کاری](https://mrdalili.ir/work-stories.html?lang=fa) · [رزومه](https://mrdalili.ir/profile.html?lang=fa) · [English](README.en.md)

<p>
<a href="https://mrdalili.ir/?lang=fa"><picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/cover-fa-dark.webp">
  <img src="docs/readme/cover-fa-light.webp" width="1320" alt="نقطهٔ تلاقی بازاریابی و فناوری؛ طرح مرکب آبی و قرمزِ سایت کنار برگی از دفتر یک تعمیرگاه">
</picture></a>
</p>

من مارکتر و اپراتور هوش مصنوعی‌ام. در این سایت از تصمیم‌هایی می‌نویسم که موقع راه‌اندازی فروش آنلاین گرفته‌ام. در بلاگ هم می‌توانی خودت با عددها کار کنی و ببینی به چه نتیجه‌ای می‌رسی.

<p dir="rtl" align="center">
<a href="https://mrdalili.ir/strategy.html?lang=fa"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-strategy-fa-still.webp"><img src="docs/readme/folder-strategy-fa.gif" width="116" height="100" alt="راهکار استراتژی"></picture></a>
<a href="https://mrdalili.ir/execution.html?lang=fa"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-execution-fa-still.webp"><img src="docs/readme/folder-execution-fa.gif" width="116" height="100" alt="راهکار اجرا و فروش"></picture></a>
<a href="https://mrdalili.ir/technology.html?lang=fa"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-technology-fa-still.webp"><img src="docs/readme/folder-technology-fa.gif" width="116" height="100" alt="راهکار فناوری"></picture></a>
<a href="https://mrdalili.ir/ai-tools.html?lang=fa"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-ai-tools-fa-still.webp"><img src="docs/readme/folder-ai-tools-fa.gif" width="116" height="100" alt="راهکار ابزارهای هوش مصنوعی"></picture></a>
</p>

## بازدید بیشتر شد. سفارش هم؟

در این تمرین، یک تعمیرگاه قهوه‌ساز هفتهٔ اول **۲۰۰ بازدید** از جست‌وجو داشت و هفتهٔ دوم **۲۵۰ بازدید**. اگر فقط همین را می‌دانستی، می‌گفتی فروش هم بهتر شده؟

<p>
<a href="https://mrdalili.ir/article.html?post=search-to-sale&amp;lang=fa#orders"><picture>
  <source media="(prefers-reduced-motion: reduce) and (max-width: 620px)" srcset="docs/readme/repair-trends-fa-mobile-still.webp">
  <source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/repair-trends-fa-still.webp">
  <source media="(max-width: 620px)" srcset="docs/readme/repair-trends-fa-mobile.gif">
  <img src="docs/readme/repair-trends-fa.gif" width="856" alt="آمار تمرینی تعمیرگاه از هفتهٔ اول تا چهارم. بازدید ۲۰۰، ۲۵۰، ۳۰۰، ۳۰۰. سفارش پرداخت‌شده ۱۰، ۱۰، ۹، ۱۵.">
</picture></a>
</p>

<details>
<summary><strong>حساب دو هفتهٔ اول را ببین</strong></summary>

هر هفته **۱۰ سفارش پرداخت‌شده** ثبت شد. یعنی از هر ۱۰۰ بازدید، هفتهٔ اول ۵ تا و هفتهٔ دوم ۴ تا به سفارش رسید.

</details>

[با نمودار چهار هفته کار کن](https://mrdalili.ir/article.html?post=search-to-sale&lang=fa#orders) · [داده‌های همین نمودار در مخزن](public/posts/search-to-sale.mjs)

## چرا سایت چهارزبانهٔ بومرنگ دکمهٔ خرید ندارد؟

در فروشگاه بومرنگ، مشتری مدلش را انتخاب می‌کند و پولش را می‌دهد. خریدار خارجی سؤال دیگری دارد: «از این مدل، با این تعداد و برای این مقصد، چه قیمتی می‌دهید؟» برای همین در سایت چهارزبانه کنار محصول **فرم استعلام** گذاشتیم. در روایت این پروژه نوشته‌ام چرا دو سایت را جدا کردیم و چرا نخواستم نسخهٔ فارسی کاتالوگ در گوگل با فروشگاه رقابت کند.

[خواندن روایت بومرنگ](https://mrdalili.ir/reading/fa/boomerang-four-languages.html) · [بقیهٔ نوشته‌ها](https://mrdalili.ir/blog.html?lang=fa)

<p>
<a href="https://mrdalili.ir/work-stories.html?lang=fa"><picture>
  <source media="(max-width: 620px)" srcset="docs/readme/work-stories-fa-mobile.webp">
  <img src="docs/readme/work-stories-fa.webp" width="856" alt="۱۹ روایت منتشرشده با جلد واقعی هر نوشته. بومرنگ ۶، آنلاین تحریر ۵، کن ۳، داتیس ۳ و بی‌نی‌سی ۲ روایت.">
</picture></a>
</p>

## اجرای سایت روی سیستم خودت

از ریشهٔ مخزن، با پایتون ۳:

</div>

~~~sh
python -m http.server 8080 --bind 127.0.0.1 --directory public
~~~

<div dir="rtl" lang="fa">

[پیش‌نمایش فارسی](http://127.0.0.1:8080/) · [پیش‌نمایش انگلیسی](http://127.0.0.1:8080/index.en.html) · [راهنمای فایل‌های پروژه](docs/repository-layout.md) · [ساخت مقالهٔ تعاملی](docs/interactive-blog.md)

</div>
