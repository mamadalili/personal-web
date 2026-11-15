import {homePostPages} from '../../../public/home-blog-view.mjs';
import {postSummaries} from '../../../public/blog-summary-model.mjs';

export function homeSummaries(items) {
  return homePostPages(postSummaries(items)).flat().map(({status,...post})=>post);
}
