import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import {escapeHTML as esc} from '../blog-core.mjs';
import {visibleWorkStories} from '../work-stories-data.mjs';
import {workStoryHref} from '../work-stories-model.mjs';

const requireTool = createRequire(new URL('../react-site/package.json', import.meta.url));

function readRoles() {
  const source = readFileSync(new URL('../portfolio.js', import.meta.url), 'utf8');
  const {parse} = requireTool('acorn');
  const {body} = parse(source, {ecmaVersion:'latest', sourceType:'script'});
  const declarations = body.filter(node => node.type === 'VariableDeclaration' &&
    node.declarations.every(item => ['employerWebsites','career'].includes(item.id.name)));
  return runInNewContext(declarations.map(node => source.slice(node.start,node.end)).join('\n') + '\ncareer');
}

export function buildStoryPage(posts) {
  const shell = readFileSync(new URL('../work-stories.html', import.meta.url),'utf8').replace(/\r\n/g,'\n');
  const roles = readRoles();
  const groups = ['fa','en'].map(lang => {
    const title = lang === 'fa' ? 'روایت‌های کاری' : 'Work stories';
    const heading = lang === 'fa' ? 'موضوع روایت‌ها' : 'Story topics';
    const rows = roles.map(role => {
      const copy = role[lang];
      const stories = visibleWorkStories(role.id).map(story => {
        const link = workStoryHref(story,lang,posts);
        const text = esc(story[lang].title);
        return link ? '<li><a href="' + esc(new URL(link).pathname + new URL(link).search) + '">' + text + '</a></li>' : '<li>' + text + '</li>';
      }).join('');
      return '<details data-role-copy="' + esc(role.id) + '"' + (role === roles[0] ? ' open' : '') + '><summary>' +
        esc(copy.company) + ' — ' + esc(copy.role) + '</summary>' + copy.points.map(point => '<p>' + esc(point) + '</p>').join('') +
        '<h2>' + heading + '</h2><ul>' + stories + '</ul></details>';
    }).join('\n');
    return '<section lang="' + lang + '" dir="' + (lang === 'fa' ? 'rtl' : 'ltr') + '"><h1>' + title + '</h1>\n' + rows + '</section>';
  });
  const region = /<!-- story copy -->[\s\S]*?<!-- end story copy -->/;
  if (!region.test(shell)) throw new Error('Missing work stories HTML insertion point');
  return shell.replace(region, () => '<!-- story copy --><div id="work-story-copy">' + groups.join('\n') + '</div><!-- end story copy -->');
}
