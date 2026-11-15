# Mohamad Reza Dalili’s personal website

[Visit the site](https://mrdalili.ir/?lang=en) · [Work stories](https://mrdalili.ir/work-stories.html?lang=en) · [CV](https://mrdalili.ir/profile.html?lang=en) · [فارسی](README.md)

<p>
<a href="https://mrdalili.ir/?lang=en"><picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/cover-en-dark.webp">
  <img src="docs/readme/cover-en-light.webp" width="1320" alt="Where marketing meets technology: the site’s blue and red ink print with a slip from a repair shop’s order book">
</picture></a>
</p>

I work in marketing and use AI in my day-to-day work. I write about decisions I’ve had to make while building online sales channels. In the blog, you can work through the numbers and see whether you reach the same conclusion.

## More visits. More sales?

An espresso machine repair shop got **200 visits** from search in its first week and **250** in its second. Would you tell the owner that business had picked up?

<details>
<summary><strong>Open the repair shop’s order book</strong></summary>

The shop booked **10 paid jobs in each week**. Five out of every 100 visits became paid jobs in week one; four did in week two. The figures are made up for the exercise.

<p>
<a href="https://mrdalili.ir/article.html?post=search-to-sale&amp;lang=en#orders"><picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="docs/readme/repair-desk-en-still.webp">
  <img src="docs/readme/repair-desk-en.webp" width="560" alt="Two views of the article’s chart: 200, 250, 300 and 300 search visits over four weeks produced 10, 10, 9 and 15 paid jobs">
</picture></a>
</p>

</details>

[Try all four weeks in the live chart](https://mrdalili.ir/article.html?post=search-to-sale&lang=en#orders) · [Find its data in the source](public/posts/search-to-sale.mjs)

## Why doesn’t Boomerang’s four-language catalogue have a buy button?

In Boomerang’s online store, a customer picks a model and pays. An overseas buyer has a different question: “What would you quote for this many units, shipped here?” We put a **quote form** beside the product. I wrote about why we kept the catalogue separate from the shop, and why I kept its Persian pages out of search results.

[Read the Boomerang story](https://mrdalili.ir/reading/en/boomerang-four-languages.html) · [Browse the blog](https://mrdalili.ir/blog.html?lang=en)

## Run the site locally

From the root of this repository, with Python 3:

~~~sh
python -m http.server 8080 --bind 127.0.0.1 --directory public
~~~

[English preview](http://127.0.0.1:8080/index.en.html) · [Persian preview](http://127.0.0.1:8080/) · [Repository guide](docs/repository-layout.md) · [Writing an interactive article](docs/interactive-blog.md)
