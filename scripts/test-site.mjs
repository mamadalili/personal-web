import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Restrict discovery to this site's tests; vendored skills have their own suites.
const root = fileURLToPath(new URL('../', import.meta.url));
const tests = readdirSync(join(root, 'tests'), { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.endsWith('.test.mjs'))
  .map(entry => join(root, 'tests', entry.name))
  .sort();
if (!tests.length) throw new Error('No site tests found.');
const result = spawnSync(process.execPath, ['--test', ...tests], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
