import {readFileSync,readdirSync,mkdirSync,writeFileSync,cpSync,rmSync,lstatSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {parse} from 'acorn';

const appRoot=fileURLToPath(new URL('../',import.meta.url));
const sourceRoot=resolve(appRoot,'..');
const publicRoot=join(appRoot,'public');
const target=resolve(publicRoot,'legacy');
if(!target.startsWith(resolve(publicRoot)+sep)||target!==join(publicRoot,'legacy'))throw new Error('Unsafe generated asset destination');
mkdirSync(publicRoot,{recursive:true});
if(lstatSync(publicRoot).isSymbolicLink())throw new Error('Public destination cannot be a symbolic link');
rmSync(target,{recursive:true,force:true});
mkdirSync(target,{recursive:true});
for(const entry of readdirSync(sourceRoot,{withFileTypes:true})){
 if(entry.isFile()&&/\.(html|css|js|mjs)$/.test(entry.name))cpSync(join(sourceRoot,entry.name),join(target,entry.name));
}
for(const directory of ['assets','images','fonts','posts'])cpSync(join(sourceRoot,directory),join(target,directory),{recursive:true});
mkdirSync(join(target,'figures'),{recursive:true});
cpSync(join(sourceRoot,'figures/solo-model.mjs'),join(target,'figures/solo-model.mjs'));
writeFileSync(join(publicRoot,'robots.txt'),'User-agent: *\nDisallow: /\n');

// Read only selected declarations; never start the legacy browser application.
const source=readFileSync(join(sourceRoot,'portfolio.js'),'utf8');
const tree=parse(source,{ecmaVersion:'latest',sourceType:'script'});
const text=node=>source.slice(node.start,node.end);
const names=new Set(['employerWebsites','career','copy','siteCopy','contactChannels','iconPaths']);
const declarations=[];
let contactExpression;
for(const statement of tree.body){
 if(statement.type==='VariableDeclaration'){
  for(const declaration of statement.declarations){
   if(declaration.id.type==='Identifier'&&names.has(declaration.id.name))declarations.push(`const ${text(declaration)};`);
  }
 }
 if(statement.type==='ExpressionStatement'&&statement.expression.type==='CallExpression'){
  const call=statement.expression;
  if(text(call.callee)==='Object.assign'&&call.arguments[0]&&text(call.arguments[0])==='iconPaths')declarations.push(text(statement));
 }
 if(statement.type==='FunctionDeclaration'&&statement.id?.name==='renderContactPage'){
  for(const inner of statement.body.body){
   if(inner.type==='VariableDeclaration')for(const declaration of inner.declarations){
    if(declaration.id.name==='c')contactExpression=text(declaration.init);
   }
  }
 }
}
if(declarations.length!==7||!contactExpression)throw new Error('Legacy Contact declaration contract changed; review the adapter');
const context=vm.createContext({});
vm.runInContext(declarations.join('\n'),context,{timeout:1000});
const serialized=vm.runInContext(`JSON.stringify({
 identity:Object.fromEntries(['fa','en'].map(lang=>[lang,{name:copy[lang].name,role:copy[lang].role}])),
 contact:Object.fromEntries(['fa','en'].map(lang=>[lang,{intro:siteCopy[lang].contactIntro,cvLink:siteCopy[lang].cvLink,...(${contactExpression})}])),
 navigation:Object.fromEntries(['fa','en'].map(lang=>[lang,{labels:siteCopy[lang].nav,label:siteCopy[lang].navLabel}])),
 channels:contactChannels,
 employers:career.filter((role,index,all)=>role.logo&&all.findIndex(item=>item.logo?.src===role.logo.src)===index).map(role=>({id:role.id,logo:role.logo,fa:role.fa.company,en:role.en.company})),
 icons:iconPaths
})`,context,{timeout:1000});
const data=JSON.parse(serialized);
if(data.channels.length!==5||data.employers.length!==6)throw new Error('Review the supplied channel/employer inventory');
for(const markup of Object.values(data.icons))if(/<script|<foreignObject|\bon\w+=|href=/i.test(markup))throw new Error('Unexpected SVG markup');
const contentDirectory=join(appRoot,'src/content/generated');
mkdirSync(contentDirectory,{recursive:true});
writeFileSync(join(contentDirectory,'legacy.json'),JSON.stringify(data,null,2)+'\n');
console.log('Prepared approved Contact data and public compatibility assets');
