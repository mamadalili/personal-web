import {existsSync,readFileSync,realpathSync,statSync} from 'node:fs';
import {join,relative,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
import sirv from 'sirv';

export const publicRoot=fileURLToPath(new URL('../public/',import.meta.url));
const root=realpathSync(publicRoot);
const localized=/^\/(profile|blog|contact|strategy|execution|technology|ai-tools|work-stories)(?:\.(fa|en))?\.html$/;
const asset=/^\/(?:[a-z0-9][\w.-]*\.(?:html|ico|js|mjs|css|txt|xml)|(?:assets|reading|posts|fonts|images|figures)\/[\w./-]+)$/i;

// Mirror the public language/bookmark rules without requiring Apache locally.
export function publicFile(path,query,cookie=''){
  const explicit=query.get('lang');
  const lang=explicit==='fa'||explicit==='en'?explicit:/(?:^|;\s*)portfolio_language=en(?:;|$)/.test(cookie)?'en':'fa';
  if(path==='/'||path==='/index.html'){
    if(query.has('tab')||query.has('role'))return '/profile.'+lang+'.html';
    return lang==='en'?'/index.en.html':'/index.html';
  }
  if(path==='/solutions.html')path='/strategy.html';
  const entry=localized.exec(path);
  if(entry)return '/'+entry[1]+'.'+(explicit==='en'||explicit==='fa'?explicit:entry[2]||lang)+'.html';
  if(path==='/article.html'){
    const slug=query.get('post')||'';
    if(query.getAll('post').length===1 && slug!=='archive' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){
      const reading='/reading/'+(explicit==='en'?'en':'fa')+'/'+slug+'.html';
      if(existsSync(join(root,reading)))return reading;
    }
    return null;
  }
  return path;
}

export function publicMiddleware({react=false}={}){
  const files=sirv(root,{dev:true,extensions:[]});
  return (req,res,next)=>{
    if(req.method!=='GET'&&req.method!=='HEAD')return next();
    const original=req.url||'/',[encoded,search='']=original.split(/\?(.*)/s);
    let path;
    try{path=decodeURIComponent(encoded);}catch{res.writeHead(400).end();return;}
    if(/[\\:\0%]/.test(path)||path.split('/').some(p=>p.startsWith('.'))){res.writeHead(404).end();return;}
    const query=new URLSearchParams(search);
    if(react&&((path==='/'&&!['lang','role','tab'].some(key=>query.has(key)))||path==='/robots.txt'))return next();
    if(path!=='/'&&!asset.test(path))return next();
    const name=publicFile(path,query,req.headers.cookie);
    if(name===null){
      res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
      res.end(req.method==='HEAD'?undefined:readFileSync(join(root,'article-not-found.html')));
      return;
    }
    if(path==='/solutions.html'||(localized.test(path)&&name!==path)||((path==='/'||path==='/index.html')&&name.startsWith('/profile.'))){
      const location=path==='/solutions.html'?'/strategy.html':name;
      res.writeHead(302,{Location:location+(search?'?'+search:''),Vary:'Cookie','Cache-Control':'private, no-store'}).end();
      return;
    }
    const full=join(root,name);
    if(!existsSync(full)||!statSync(full).isFile())return next();
    const sub=relative(root,realpathSync(full));
    if(!sub||sub.startsWith('..')||isAbsolute(sub)){res.writeHead(404).end();return;}
    req.url=name;
    files(req,res,()=>{req.url=original;next();});
  };
}
