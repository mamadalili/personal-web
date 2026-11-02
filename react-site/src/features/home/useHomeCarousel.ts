import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {createWheelPager, groupPosts, pageContaining, wheelPageVisible} from './carousel-model';
import type {Language} from '../../lib/routing';

type Restore = {slug: string; focus: 'card' | 'track' | '-1' | '1' | null};

export function useHomeCarousel<T extends {slug: string}>(items: T[], lang: Language) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const currentSize = useRef(6);
  const restore = useRef<Restore | null>(null);
  const pendingFocus = useRef<Restore | null>(null);
  const navigate = useRef<(page: number) => void>(() => {});
  const [size, setSize] = useState(6);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [focusVersion, setFocusVersion] = useState(0);
  const pages = useMemo(() => groupPosts(items, size), [items, size]);
  const number = (value: number) => new Intl.NumberFormat(lang).format(value);
  const groupLabel = (page: number, total: number) => lang === 'fa'
    ? `مجموعهٔ ${number(page)} از ${number(total)} نوشته‌ها`
    : `Post group ${number(page)} of ${number(total)}`;

  useLayoutEffect(() => {
    const saved = pendingFocus.current, rail = track.current, container = root.current;
    if (!saved?.focus || !rail || !container) return;
    pendingFocus.current = null;
    const card = [...rail.querySelectorAll<HTMLAnchorElement>('.home-post-card')].find(item => item.dataset.slug === saved.slug);
    const button = container.querySelector<HTMLButtonElement>(`[data-home-step="${saved.focus}"]`);
    if (saved.focus === 'card' && card && !card.closest('[inert]')) card.focus({preventScroll: true});
    else if (button && !button.disabled) button.focus({preventScroll: true});
    else rail.focus({preventScroll: true});
  }, [focusVersion, index, pages]);

  useEffect(() => {
    const wide = matchMedia('(min-width:1000px)'), medium = matchMedia('(min-width:761px)');
    const resize = () => {
      const nextSize = wide.matches ? 6 : medium.matches ? 4 : 2;
      if (nextSize === currentSize.current) return;
      const active = document.activeElement;
      const inside = !!active && !!root.current?.contains(active);
      const card = inside ? active.closest<HTMLElement>('.home-post-card') : null;
      const visible = root.current?.querySelector<HTMLElement>('.home-blog-page[aria-hidden="false"] .home-post-card');
      const slug = card?.dataset.slug ?? visible?.dataset.slug ?? items[current.current * currentSize.current]?.slug ?? '';
      const step = inside ? active.getAttribute('data-home-step') : null;
      restore.current = {slug, focus: !inside ? null : card ? 'card' : step === '-1' || step === '1' ? step : 'track'};
      currentSize.current = nextSize;
      setSize(nextSize);
    };
    wide.addEventListener('change', resize);
    medium.addEventListener('change', resize);
    resize();
    return () => {
      wide.removeEventListener('change', resize);
      medium.removeEventListener('change', resize);
    };
  }, [items]);

  useEffect(() => {
    const container = root.current, rail = track.current;
    if (!container || !rail || !pages.length) return;
    const panels = [...rail.querySelectorAll<HTMLElement>('.home-blog-page')];
    const controller = new AbortController(), {signal} = controller;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let wheel = createWheelPager(), timer: ReturnType<typeof setTimeout> | undefined;
    let width = rail.clientWidth;
    const sizeActive = () => {
      const height = panels[current.current]?.scrollHeight;
      if (height) container.style.setProperty('--home-track-height', `${height}px`);
    };
    const select = (page: number, announce = false) => {
      const next = Math.max(0, Math.min(pages.length - 1, page));
      if (panels.some((panel, i) => i !== next && panel.contains(document.activeElement))) rail.focus({preventScroll: true});
      const changed = next !== current.current;
      current.current = next;
      setIndex(next);
      sizeActive();
      if (changed && announce) setAnnouncement(groupLabel(next + 1, pages.length));
    };
    const goTo = (page: number, smooth = true) => {
      select(page, smooth);
      const outer = rail.getBoundingClientRect(), inner = panels[current.current].getBoundingClientRect();
      const left = lang === 'fa' ? inner.right - outer.right : inner.left - outer.left;
      rail.scrollTo({left: rail.scrollLeft + left, behavior: smooth && !motion.matches ? 'smooth' : 'instant'});
    };
    navigate.current = goTo;
    setReady(true);
    rail.addEventListener('keydown', event => {
      if (event.target !== rail || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const target = event.key === 'Home' ? 0 : event.key === 'End' ? pages.length - 1
        : event.key === 'ArrowRight' ? current.current + (lang === 'fa' ? -1 : 1)
        : event.key === 'ArrowLeft' ? current.current + (lang === 'fa' ? 1 : -1) : null;
      if (target === null) return;
      event.preventDefault();
      goTo(target);
    }, {signal});
    rail.addEventListener('wheel', event => {
      const bounds = rail.getBoundingClientRect(), nav = document.getElementById('footer')?.getBoundingClientRect();
      const phone = innerWidth <= 760;
      if (!wheelPageVisible({top: bounds.top, bottom: bounds.bottom, viewportHeight: innerHeight,
        topInset: phone ? 16 : Math.max(110, (nav?.bottom ?? 0) + 16),
        bottomInset: phone && nav ? Math.max(16, innerHeight - nav.top + 16) : 16})) {
        wheel = createWheelPager();
        return;
      }
      const result = wheel({page: current.current, pageCount: pages.length, deltaX: event.deltaX, deltaY: event.deltaY,
        deltaMode: event.deltaMode, viewportHeight: rail.clientHeight, time: performance.now(),
        ctrlKey: event.ctrlKey, metaKey: event.metaKey, shiftKey: event.shiftKey, altKey: event.altKey});
      if (result.consume) event.preventDefault();
      if (result.page !== null) goTo(result.page);
    }, {passive: false, signal});
    rail.addEventListener('scroll', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (signal.aborted) return;
        const outer = rail.getBoundingClientRect();
        const offsets = panels.map(panel => {
          const inner = panel.getBoundingClientRect();
          return Math.abs(lang === 'fa' ? inner.right - outer.right : inner.left - outer.left);
        });
        select(offsets.indexOf(Math.min(...offsets)), true);
      }, 160);
    }, {passive: true, signal});
    const observer = new ResizeObserver(() => {
      if (signal.aborted) return;
      if (width !== rail.clientWidth) { width = rail.clientWidth; goTo(current.current, false); }
      else sizeActive();
    });
    observer.observe(rail);
    panels.forEach(panel => observer.observe(panel));
    const saved = restore.current;
    restore.current = null;
    goTo(saved ? pageContaining(pages, saved.slug) : current.current, false);
    if (saved?.focus) {
      pendingFocus.current = saved;
      setFocusVersion(value => value + 1);
    }
    return () => {
      controller.abort();
      observer.disconnect();
      clearTimeout(timer);
      navigate.current = () => {};
    };
  }, [pages, lang]);

  return {root, track, pages, index, ready, announcement, groupLabel,
    step: (direction: number) => navigate.current(current.current + direction)};
}
