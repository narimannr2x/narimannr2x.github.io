// Recover formatted local sources on a fresh clone without overwriting edits.
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { transform } from 'esbuild';
await mkdir('.local-src', { recursive: true });
for (const [file, deployed, loader] of [['site.css', 'assets/css/site.css', 'css'], ['main.js', 'assets/js/main.js', 'js']]) {
  try { await access(`.local-src/${file}`); console.log(`Kept existing ${file}`); }
  catch {
    const source = await readFile(deployed, 'utf8');
    await writeFile(`.local-src/${file}`, (await transform(source, { loader, minify: false, charset: 'utf8' })).code);
    console.log(`Restored readable ${file}. Original comments are available only in the local originals or earlier Git history.`);
  }
}
