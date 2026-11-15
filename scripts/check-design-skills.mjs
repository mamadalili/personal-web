import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(readFileSync(join(root,'docs/anti-slop-source.json'),'utf8'));
if(process.argv.slice(2).some(arg=>arg!=='--global'))throw new Error('Usage: node scripts/check-design-skills.mjs [--global]');
if(!/^[a-f0-9]{40}$/.test(manifest.source.revision)||manifest.skills.length!==6)throw new Error('Invalid anti-slop source manifest.');
function inventory(dir,prefix=''){
 return readdirSync(dir).sort().flatMap(name=>{
  const path=join(dir,name),stat=lstatSync(path),relative=prefix+name;
  if(stat.isSymbolicLink())throw new Error(`Unexpected symlink: ${relative}`);
  if(stat.isDirectory())return inventory(path,relative+'/');
  if(!stat.isFile())throw new Error(`Unexpected entry: ${relative}`);
  return [relative];
 });
}
function verify(base,label){
 for(const skill of manifest.skills){
  if(!/^antislop(?:-(?:ui|copywriting|human|layoutmobile|code))?$/.test(skill.name))throw new Error('Invalid skill name.');
  const dir=join(base,skill.name),files=inventory(dir),expected=skill.files.map(file=>file.path).sort();
  if(JSON.stringify(files)!==JSON.stringify(expected))throw new Error(`File inventory mismatch: ${skill.name}`);
  for(const file of skill.files){
   if(!file.path||file.path.includes('\\')||file.path.includes(':')||file.path.split('/').some(part=>!part||part==='.'||part==='..'))throw new Error('Unsafe manifest path.');
   const data=readFileSync(join(dir,...file.path.split('/')));
   if(data.length!==file.bytes||createHash('sha256').update(data).digest('hex')!==file.sha256)throw new Error(`Source mismatch: ${skill.name}/${file.path}`);
  }
  const entry=readFileSync(join(dir,'SKILL.md'),'utf8');
  if(!entry.startsWith('---\n')||!entry.includes(`name: ${skill.name}\n`))throw new Error(`Invalid skill entry: ${skill.name}`);
 }
 console.log(`${label}: six anti-slop skills match ${manifest.version} at ${manifest.source.revision}.`);
}
verify(join(root,'.agents/skills'),'Project');
if(process.argv.includes('--global'))verify(join(process.env.CODEX_HOME||join(homedir(),'.codex'),'skills'),'Codex');
if(!readFileSync(join(root,'DESIGN.md'),'utf8').trim())throw new Error('Missing design direction.');
if(!readFileSync(join(root,'AGENTS.md'),'utf8').includes('<!-- antislop:start -->'))throw new Error('Missing anti-slop project routing.');
