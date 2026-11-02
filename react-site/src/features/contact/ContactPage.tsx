import {legacy} from '../../content/legacy';
import {assetURL,pageURL} from '../../lib/routing';
import type {Language} from '../../lib/routing';
import {BrandMark,ProfessionalTitle} from '../../components/ui/BrandSignature';
import {Icon} from '../../components/ui/Icon';

export function ContactPage({lang}:{lang:Language}) {
  const content=legacy.contact[lang],identity=legacy.identity[lang];
  const email=legacy.channels.find(channel=>channel.id==='email')!;
  return <>
    <section className="contact-editorial" aria-labelledby="contact-title">
      <div className="contact-light-trace" aria-hidden="true"/>
      <div className="contact-editorial-copy"><h1 id="contact-title">{content.intro}</h1><div className="contact-editorial-actions"><a href={email.href}><span>{content.email}</span><Icon name="arrow"/></a><a href={pageURL('cv',lang)}><span>{content.cvLink}</span><Icon name="arrow"/></a></div><div className="contact-signature"><strong>{identity.name}</strong><ProfessionalTitle lang={lang}/></div></div>
      <figure className="contact-portrait-stage"><div className="contact-monogram" aria-hidden="true"><img src={assetURL('assets/brand/monogram.svg')} alt="" width="210" height="210"/></div><img className="contact-author-photo" src={assetURL('images/contact-portrait.webp')} width="1142" height="1377" alt={identity.name} fetchPriority="high"/></figure>
      <a className="contact-glass" href="#contact-channels"><span className="contact-glass-copy"><small>{content.label}</small><strong>{content.title}</strong><p>{content.note}</p></span><span className="contact-glass-arrow" aria-hidden="true"><Icon name="arrow"/></span></a>
    </section>
    <section className="contact-channels-section" id="contact-channels" aria-labelledby="contact-channels-title"><div className="contact-channels-header"><h2 id="contact-channels-title">{content.channels}</h2><BrandMark animated/></div><div className="contact-methods">{legacy.channels.map(channel=><a key={channel.id} className="contact-card contact-method" data-contact={channel.id} href={channel.href} target={channel.href.startsWith('https:')?'_blank':undefined} rel={channel.href.startsWith('https:')?'noopener noreferrer':undefined}><span className="contact-method-icon"><Icon name={channel.icon}/></span><span className="contact-method-copy"><strong>{channel[lang]}</strong><span dir="ltr">{channel.value}</span></span><span className="contact-method-arrow"><Icon name="arrow"/></span></a>)}</div></section>
    <section className="employer-rail" aria-labelledby="employer-rail-title"><header><h2 id="employer-rail-title">{lang==='fa'?'بخشی از مسیر کاری من':'Places I have worked'}</h2><a href={`${pageURL('cv',lang)}&tab=experience`}>{lang==='fa'?'دیدن سوابق کاری':'Explore my work experience'}<Icon name="arrow"/></a></header><div className="employer-logo-grid">{legacy.employers.map(employer=><a key={employer.id} className="employer-logo-card" href={`${pageURL('cv',lang)}&tab=experience&role=${employer.id}`}><span><img className="company-logo" src={assetURL(employer.logo.src)} width={employer.logo.width} height={employer.logo.height} alt="" loading="lazy" decoding="async"/></span><strong>{employer[lang]}</strong></a>)}</div></section>
  </>;
}
