import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: ['/', ...['fa', 'en'].flatMap(lang => [
    `/${lang}`, `/${lang}/contact`,
    ...['strategy', 'execution', 'technology', 'ai-tools'].map(id => `/${lang}/solutions/${id}`),
  ])],
} satisfies Config;
