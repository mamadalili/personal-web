import {legacy} from '../../content/legacy';

export function Icon({name,className}:{name:string,className?:string}) {
  const markup=legacy.icons[name as keyof typeof legacy.icons];
  if(!markup)return null;
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{__html:markup}}/>;
}
