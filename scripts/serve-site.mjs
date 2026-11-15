import {createServer} from 'node:http';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import sirv from 'sirv';
import {publicMiddleware} from './public-preview.mjs';

export function previewServer({react=false}={}){
  const build=fileURLToPath(new URL('../react-site/build/client/',import.meta.url));
  if(react&&!existsSync(resolve(build,'en/index.html')))throw new Error('Build the React preview first: npm run build:react');
  const ui=react?sirv(build,{dev:true}):null;
  const site=publicMiddleware({react});
  return createServer((req,res)=>{
    const missing=()=>res.writeHead(404).end();
    if(req.method!=='GET'&&req.method!=='HEAD')return res.writeHead(405,{Allow:'GET, HEAD'}).end();
    site(req,res,()=>ui?ui(req,res,missing):missing());
  });
}
if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url){
  const port=Number(process.env.PORT||8080);
  previewServer({react:process.argv.includes('--react')}).listen(port,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:'+port+'/'));
}
