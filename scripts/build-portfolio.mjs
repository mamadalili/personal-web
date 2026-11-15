import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {rolldown} from 'rolldown';

// Keep imports of separately deployed browser modules relative to portfolio.js.
async function bundle(source, name) {
  const input = fileURLToPath(new URL('../src/portfolio/'+source, import.meta.url));
  const build = await rolldown({input, platform:'browser', external:id=>/^\.\/[^/]+\.mjs\?v=/.test(id)});
  try {
    const {output} = await build.generate({format:'iife', codeSplitting:false, minify:true});
    if (output.length !== 1 || output[0].type !== 'chunk') throw new Error('Expected one classic browser entry for '+name);
    const file = new URL('../public/'+name, import.meta.url);
    const text = '// Generated from src/portfolio/'+source+'; run npm run build.\n'+output[0].code;
    if (process.argv.includes('--check')) {
      if ((await readFile(file,'utf8')).replaceAll('\r\n','\n') !== text) throw new Error('Stale public/'+name);
    } else await writeFile(file,text);
  } finally { await build.close(); }
}
await bundle('browser.mjs','portfolio.js');
await bundle('classic-art.mjs','home-hero-art.js');
