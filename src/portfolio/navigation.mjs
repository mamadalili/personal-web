import {pageFiles, siteCopy} from '../content/index.mjs';

const pages = /** @type {Array<keyof typeof pageFiles>} */ (Object.keys(pageFiles));

export function navigationItems(lang, active, hrefFor) {
  return pages.map((id, index) => ({id, href: hrefFor(id), label: siteCopy[lang].nav[index], current: id === active}));
}
