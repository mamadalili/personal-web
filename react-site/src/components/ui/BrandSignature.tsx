import {legacy} from '../../content/legacy';
import {assetURL} from '../../lib/routing';
import type {Language} from '../../lib/routing';

export function BrandMark({animated=false}:{animated?:boolean}) {
  return <span className={`brand-logo${animated?' brand-logo--motion':''}`} aria-hidden="true"><img src={assetURL('assets/brand/monogram.svg')} width="64" height="64" alt=""/></span>;
}
export function ProfessionalTitle({lang,header=false,label}:{lang:Language,header?:boolean,label?:string}) {
  const title=label??legacy.identity[lang].role;
  return <span className={`professional-title${header?' header-role':''}`} id={header?'brand-role':undefined}><span>{title}</span><span className="title-shine" aria-hidden="true">{title}</span></span>;
}
