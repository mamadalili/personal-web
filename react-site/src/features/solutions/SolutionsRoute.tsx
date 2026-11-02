import {useLocation, useParams} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';
import {languageFromPath, solutionIds} from '../../lib/routing';
import type {SolutionId} from '../../lib/routing';
import {SolutionsPage} from './SolutionsPage';

export function loader({params}: LoaderFunctionArgs) {
  if (!['fa', 'en'].includes(params.lang ?? '') || !solutionIds.includes(params.solution as SolutionId)) {
    throw new Response('Not found', {status: 404});
  }
  return null;
}
export default function SolutionsRoute() {
  const {pathname} = useLocation(), {solution} = useParams();
  const lang = languageFromPath(pathname);
  return <SolutionsPage key={`${lang}:${solution}`} lang={lang} id={solution as SolutionId}/>;
}
