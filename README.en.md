# Mohamad Reza Dalili’s personal website

[Visit the site](https://mrdalili.ir/?lang=en) · [Work stories](https://mrdalili.ir/work-stories.html?lang=en) · [CV](https://mrdalili.ir/profile.html?lang=en) · [فارسی](README.md)

<p>
<a href="https://mrdalili.ir/?lang=en"><picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/cover-en-dark.webp">
  <img src="docs/readme/cover-en-light.webp" width="1320" alt="Where marketing meets technology: the site’s blue and red ink print with a slip from a repair shop’s order book">
</picture></a>
</p>

I work in marketing and use AI in my day-to-day work. I write about decisions I’ve had to make while building online sales channels. In the blog, you can work through the numbers and see whether you reach the same conclusion.

<p dir="ltr" align="center">
<a href="https://mrdalili.ir/strategy.html?lang=en"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-strategy-en-still.webp"><img src="docs/readme/folder-strategy-en.gif" width="116" height="100" alt="Open Strategy"></picture></a>
<a href="https://mrdalili.ir/execution.html?lang=en"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-execution-en-still.webp"><img src="docs/readme/folder-execution-en.gif" width="116" height="100" alt="Open Execution and sales"></picture></a>
<a href="https://mrdalili.ir/technology.html?lang=en"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-technology-en-still.webp"><img src="docs/readme/folder-technology-en.gif" width="116" height="100" alt="Open Technology"></picture></a>
<a href="https://mrdalili.ir/ai-tools.html?lang=en"><picture><source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/folder-ai-tools-en-still.webp"><img src="docs/readme/folder-ai-tools-en.gif" width="116" height="100" alt="Open AI workflows"></picture></a>
</p>

## More visits. More sales?

In this exercise, an espresso machine repair shop got **200 visits** from search in its first week and **250** in its second. Would you tell the owner that business had picked up?

<p>
<a href="https://mrdalili.ir/article.html?post=search-to-sale&amp;lang=en#orders"><picture>
  <source media="(prefers-reduced-motion: reduce) and (max-width: 620px)" srcset="docs/readme/repair-trends-en-mobile-still.webp">
  <source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/repair-trends-en-still.webp">
  <source media="(max-width: 620px)" srcset="docs/readme/repair-trends-en-mobile.gif">
  <img src="docs/readme/repair-trends-en.gif" width="856" alt="The repair shop exercise, weeks one to four. Search visits 200, 250, 300, 300. Paid jobs 10, 10, 9, 15.">
</picture></a>
</p>

<details>
<summary><strong>See how the first two weeks compare</strong></summary>

The shop booked **10 paid jobs in each week**. Five out of every 100 visits became paid jobs in week one; four did in week two.

</details>

[Try all four weeks in the live chart](https://mrdalili.ir/article.html?post=search-to-sale&lang=en#orders) · [Find its data in the source](public/posts/search-to-sale.mjs)

## Why doesn’t Boomerang’s four-language catalogue have a buy button?

In Boomerang’s online store, a customer picks a model and pays. An overseas buyer has a different question: “What would you quote for this many units, shipped here?” We put a **quote form** beside the product. I wrote about why we kept the catalogue separate from the shop, and why I kept its Persian pages out of search results.

[Read the Boomerang story](https://mrdalili.ir/reading/en/boomerang-four-languages.html) · [Browse the blog](https://mrdalili.ir/blog.html?lang=en)

<p>
<a href="https://mrdalili.ir/work-stories.html?lang=en"><picture>
  <source media="(max-width: 620px)" srcset="docs/readme/work-stories-en-mobile.webp">
  <img src="docs/readme/work-stories-en.webp" width="856" alt="19 published work stories, each represented by its cover. Boomerang 6, Online Tahrir 5, CAN 3, Datis 3 and BiNiCi 2.">
</picture></a>
</p>

## Run the site locally

From the root of this repository, with Python 3:

~~~sh
python -m http.server 8080 --bind 127.0.0.1 --directory public
~~~

[English preview](http://127.0.0.1:8080/index.en.html) · [Persian preview](http://127.0.0.1:8080/) · [Repository guide](docs/repository-layout.md) · [Writing an interactive article](docs/interactive-blog.md)
