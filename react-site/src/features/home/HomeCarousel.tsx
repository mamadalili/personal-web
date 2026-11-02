import {useId} from 'react';
import {legacy} from '../../content/legacy';
import {assetURL, pageURL} from '../../lib/routing';
import type {Language} from '../../lib/routing';
import {useHomeCarousel} from './useHomeCarousel';

const copy = {
  fa: {region: 'آخرین نوشته‌های بلاگ', carousel: 'کاروسل', previous: 'نوشته‌های جدیدتر', next: 'نوشته‌های قدیمی‌تر',
    read: 'خواندن مقاله', hint: 'کشیدن، اسکرول افقی یا دکمه‌ها', latest: 'تازه‌ترین نوشته‌ها', empty: 'نوشته‌های منتشرشده از اینجا در دسترس خواهند بود.', swipeHint: 'برای دیدن نوشته‌های دیگر، به چپ یا راست بکشید. با کیبورد از کلیدهای چپ و راست استفاده کنید.'},
  en: {region: 'Latest blog posts', carousel: 'carousel', previous: 'Newer posts', next: 'Older posts',
    read: 'Read article', hint: 'Swipe, scroll sideways or use the arrows', latest: 'Latest posts', empty: 'Published articles will appear here.', swipeHint: 'Swipe left or right to browse posts. With a keyboard, use the left and right arrow keys.'},
};

function PagerArrow({previous = false}: {previous?: boolean}) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" focusable="false">
    <path d={previous ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}/>
  </svg>;
}

export function HomeCarousel({lang}: {lang: Language}) {
  const t = copy[lang], id = useId();
  const {root, track, pages, index, ready, announcement, groupLabel, step, swipeOnly} = useHomeCarousel(legacy.posts, lang);
  const date = (value: string) => new Intl.DateTimeFormat(lang, {dateStyle: 'medium', timeZone: 'UTC'}).format(new Date(`${value}T12:00:00Z`));
  if (!pages.length) return <p className="home-blog-empty">{t.empty}</p>;
  return <div ref={root} className="home-blog-mount" data-home-blog>
    <div ref={track} id={id} className="home-blog-track" tabIndex={0} role="region"
      aria-label={t.region} aria-roledescription={t.carousel} aria-describedby={swipeOnly ? `${id}-hint` : undefined}>
      {pages.map((page, position) => <div key={page[0].slug} className="home-blog-page" role="group"
        aria-label={groupLabel(position + 1, pages.length)} aria-hidden={ready ? position !== index : undefined}
        inert={ready && position !== index}>
        {page.map(post => {
          const a = post[lang], cover = post.cover[lang];
          return <a key={post.slug} data-slug={post.slug} className={`home-post-card${cover ? ' has-cover' : ''}`}
            href={pageURL('article', lang, {post: post.slug})}>
            {cover && <img className="home-post-cover" src={assetURL(cover.src.replace('assets/blog/','assets/blog/previews/'))} width={cover.width} height={cover.height} alt="" loading="lazy" decoding="async"/>}
            <div className="home-post-meta"><span>{a.category}</span><time dateTime={post.date}>{date(post.date)}</time></div>
            <h4>{a.title}</h4><p>{a.excerpt}</p>
            <span className="home-post-foot"><small>{a.readTime}</small><span className="home-post-read">{t.read}
              <span aria-hidden="true">{lang === 'fa' ? '←' : '→'}</span></span></span>
          </a>;
        })}
      </div>)}
    </div>
    {swipeOnly && <p id={`${id}-hint`} className="home-blog-status">{t.swipeHint}</p>}
    <div className="home-blog-controls">
      {ready && !swipeOnly && <>
      <span className="home-blog-hint">{pages.length > 1 ? t.hint : t.latest}</span>
      <span className="home-blog-position" aria-hidden="true">
        <i style={{inlineSize: `${100 / pages.length}%`, transform: `translateX(${index * 100 * (lang === 'fa' ? -1 : 1)}%)`}}/>
      </span>
      <div className="home-blog-buttons">
        <button type="button" data-home-step="-1" aria-controls={id} aria-label={t.previous} disabled={index === 0} onClick={() => step(-1)}><PagerArrow previous/></button>
        <button type="button" data-home-step="1" aria-controls={id} aria-label={t.next} disabled={index === pages.length - 1} onClick={() => step(1)}><PagerArrow/></button>
      </div>
      </>}
    </div>
    <p className="home-blog-status" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
  </div>;
}
