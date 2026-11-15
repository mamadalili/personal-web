import {useLocation} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';
import {languageFromPath} from '../../lib/routing';
import {ContactPage} from './ContactPage';

export function loader({params}:LoaderFunctionArgs) {
  if(params.lang!==undefined&&!['fa','en'].includes(params.lang))throw new Response('Not found',{status:404});
  return null;
}
export default function ContactRoute() {
  const {pathname}=useLocation();
  return <ContactPage lang={languageFromPath(pathname)}/>;
}
