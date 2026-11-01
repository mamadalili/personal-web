import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const skills = join(root, '.agents', 'skills');
const manifest = JSON.parse(readFileSync(join(root, 'docs', 'anatomy-source.json'), 'utf8'));
const args = process.argv.slice(2);
if (args.some(arg => arg !== '--global')) throw new Error('Usage: node scripts/check-blog-skills.mjs [--global]');

function inventory(directory, prefix = '') {
  if (!lstatSync(directory).isDirectory()) throw new Error('Expected a skill directory.');
  return readdirSync(directory).sort().flatMap(name => {
    const path = join(directory, name);
    const relative = prefix + name;
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) throw new Error(`Unexpected symbolic link: ${relative}`);
    if (stat.isDirectory()) return inventory(path, relative + '/');
    if (!stat.isFile()) throw new Error(`Unexpected filesystem entry: ${relative}`);
    return [relative];
  });
}

function verifyAnatomy(directory, label) {
  const expected = manifest.files.map(file => file.path).sort();
  const actual = inventory(directory).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`${label}: file inventory differs from the pinned source.`);
  for (const file of manifest.files) {
    const data = readFileSync(join(directory, ...file.path.split('/')));
    const sha256 = createHash('sha256').update(data).digest('hex');
    const gitBlob = createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
    if (data.length !== file.bytes || sha256 !== file.sha256 || gitBlob !== file.gitBlob) {
      throw new Error(`${label}: source mismatch in ${file.path}`);
    }
  }
  console.log(`${label}: ${actual.length} files match Anatomy ${manifest.source.revision}.`);
}

function verifyBridge(directory, reference) {
  const files = inventory(directory).sort();
  const expected = ['SKILL.md', 'agents/openai.yaml'];
  if (JSON.stringify(files) !== JSON.stringify(expected)) throw new Error('Interactive-blog workflow files are missing or unexpected.');
  if (reference) {
    for (const file of files) {
      if (!readFileSync(join(directory, file)).equals(readFileSync(join(reference, file)))) {
        throw new Error(`Installed interactive-blog workflow differs from the project: ${file}`);
      }
    }
  }
}

function verifyContentProduction(directory, reference) {
  const files = inventory(directory).sort();
  const expected = ['SKILL.md', 'agents/openai.yaml', 'references/personal-web.md', 'references/worked-example.md'];
  if (JSON.stringify(files) !== JSON.stringify(expected)) throw new Error('Content-production skill files are missing or unexpected.');
  if (reference) {
    for (const file of files) {
      if (!readFileSync(join(directory, file)).equals(readFileSync(join(reference, file)))) {
        throw new Error(`Installed content-production skill differs from the project: ${file}`);
      }
    }
  }
}

if (manifest.schemaVersion !== 1 || !/^[a-f0-9]{40}$/.test(manifest.source.revision)) throw new Error('Invalid source manifest.');
const paths = new Set();
for (const file of manifest.files) {
  if (typeof file.path !== 'string' || !file.path || file.path.includes('\\') || file.path.includes(':') || file.path.split('/').some(part => !part || part === '.' || part === '..')) {
    throw new Error('Unsafe source manifest path.');
  }
  if (paths.has(file.path)) throw new Error('Duplicate source manifest path.');
  paths.add(file.path);
}
for (const required of ['SKILL.md', 'LICENSE', 'agents/openai.yaml', 'references/craft.md', 'kit/iso-kit.mjs', 'examples/dial-indicator/build.mjs']) {
  if (!paths.has(required)) throw new Error(`Required Anatomy resource is missing: ${required}`);
}

verifyAnatomy(join(skills, 'anatomy'), 'Project skill');
verifyBridge(join(skills, 'interactive-blog-anatomy'));
console.log('Project interactive-blog workflow is present.');
verifyContentProduction(join(skills, 'content-production'));
console.log('Project content-production skill and references are present.');

for (const [asset, source] of [['iso-kit.mjs', 'kit/iso-kit.mjs'], ['iso.css', 'kit/iso.css'], ['LICENSE', 'LICENSE']]) {
  const expected = manifest.files.find(file => file.path === source);
  const actual = readFileSync(join(root, 'assets', 'anatomy', asset));
  if (createHash('sha256').update(actual).digest('hex') !== expected.sha256) throw new Error(`Public Anatomy runtime differs from the pinned source: ${asset}`);
}
console.log('Selected public runtime assets and MIT license match the pinned source.');

if (args.includes('--global')) {
  const installed = resolve(process.env.CODEX_HOME || join(homedir(), '.codex'), 'skills');
  verifyAnatomy(join(installed, 'anatomy'), 'Installed Codex skill');
  verifyBridge(join(installed, 'interactive-blog-anatomy'), join(skills, 'interactive-blog-anatomy'));
  console.log('Installed Codex interactive-blog workflow matches the project.');
  verifyContentProduction(join(installed, 'content-production'), join(skills, 'content-production'));
  console.log('Installed Codex content-production skill matches the project.');
}
