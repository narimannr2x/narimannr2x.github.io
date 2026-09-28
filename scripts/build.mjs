// Readable sources stay local. Only generated CSS/JS and inline critical CSS ship.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import { transform } from 'esbuild';

const pages = ['index.html', 'blog.html', ...(await readdir('posts')).filter(f => f.endsWith('.html')).map(f => `posts/${f}`)];
const html = await Promise.all(pages.map(p => readFile(p, 'utf8')));
const cssSource = await readFile('.local-src/site.css', 'utf8');
const jsSource = await readFile('.local-src/main.js', 'utf8');
const classesIn = text => new Set([...text.matchAll(/class="([^"]*)"/g)].flatMap(m => m[1].split(/\s+/)));
const usedClasses = classesIn(html.join('\n'));
// Runtime classes are explicit so pruning cannot remove interaction states.
for (const name of ['js', 'is-open', 'is-active', 'is-past', 'is-pinned', 'is-visible', 'is-lit', 'styles-ready', 'is-offscreen', 'page-hidden']) usedClasses.add(name);
const firstScreen = classesIn(html[0].split('<section class="section about"')[0]);
for (const name of ['js', 'is-open', 'is-active', 'styles-ready', 'page-hidden']) firstScreen.add(name);

function selectorsFor(selector, classes) {
  const parsed = selectorParser().astSync(selector);
  return parsed.nodes.filter(branch => {
    let keep = true;
    branch.walkClasses(node => {
      // A missing class inside :not() does not make a selector impossible.
      for (let parent = node.parent; parent; parent = parent.parent) {
        if (parent.type === 'pseudo' && parent.value === ':not') return;
      }
      if (!classes.has(node.value)) keep = false;
    });
    return keep;
  }).map(branch => branch.toString()).join(',');
}

const hash = value => createHash('sha256').update(value).digest('hex').slice(0, 10);
let versionedCSS = cssSource.replace(/(\.\.\/fonts\/[^?\s)]+\.woff2)\?v=[a-f0-9]+/g, '$1');
const fontVersions = new Map();
for (const match of cssSource.matchAll(/\.\.\/fonts\/([^?\s)]+\.woff2)/g)) {
  const name = match[1];
  if (!fontVersions.has(name)) fontVersions.set(name, hash(await readFile(`assets/fonts/${name}`)));
}
for (const [name, version] of fontVersions) versionedCSS = versionedCSS.replaceAll(`../fonts/${name}`, `../fonts/${name}?v=${version}`);
const full = postcss.parse(versionedCSS);
full.walkRules(rule => {
  if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
  const kept = selectorsFor(rule.selector, usedClasses);
  if (kept) rule.selector = kept;
  else rule.remove();
});
full.walkAtRules(rule => { if (rule.nodes && !rule.nodes.length) rule.remove(); });

const critical = full.clone();
critical.walkRules(rule => {
  if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
  const kept = selectorsFor(rule.selector, firstScreen);
  if (kept) rule.selector = kept;
  else rule.remove();
});
critical.walkAtRules(rule => {
  if (/keyframes$/.test(rule.name) && rule.params !== 'pulse-dot') rule.remove();
  else if (rule.name === 'property' || rule.params === 'print') rule.remove();
  else if (rule.nodes && !rule.nodes.length) rule.remove();
});
// Inline CSS URLs resolve from index.html, rather than assets/css/site.css.
const criticalSource = critical.toString().replaceAll('../fonts/', 'assets/fonts/');
const options = { minify: true, legalComments: 'none', charset: 'utf8' };
const fullCSS = (await transform(full.toString(), { ...options, loader: 'css' })).code;
const criticalCSS = (await transform(criticalSource, { ...options, loader: 'css' })).code;
const js = (await transform(jsSource, { ...options, loader: 'js', target: 'es2020' })).code;
await writeFile('assets/css/site.css', fullCSS);
await writeFile('assets/js/main.js', js);
for (let i = 0; i < pages.length; i++) {
  let page = html[i];
  const prefix = pages[i].startsWith('posts/') ? '../' : '';
  page = page.replace(/<!-- critical:start -->[\s\S]*?<!-- critical:end -->\s*/g, '');
  page = page.replace(/href="(?:\.\.\/)?assets\/css\/site\.css(?:\?[^"]*)?"/g, `href="${prefix}assets/css/site.css?v=${hash(fullCSS)}"`);
  page = page.replace(/src="(?:\.\.\/)?assets\/js\/main\.js(?:\?[^"]*)?"/g, `src="${prefix}assets/js/main.js?v=${hash(js)}"`);
  for (const [name, version] of fontVersions) {
    page = page.replace(new RegExp(`href="assets/fonts/${name}(?:\\?[^\"]*)?"`, 'g'), `href="assets/fonts/${name}?v=${version}"`);
  }
  if (i === 0) {
    const sheet = `assets/css/site.css?v=${hash(fullCSS)}`;
    const block = `<!-- critical:start -->\n  <style data-critical>${criticalCSS.trim()}</style>\n  <!-- critical:end -->\n  `;
    if (!page.includes('data-full-styles')) {
      page = page.replace(/<link rel="stylesheet" href="assets\/css\/site\.css\?[^" ]+">/, `<link data-full-styles rel="preload" href="${sheet}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n  <noscript><link rel="stylesheet" href="${sheet}"></noscript>`);
    }
    // Fragment links need the full layout before the browser positions them.
    const fragmentGuard = '<script>if(location.hash)document.querySelector("[data-full-styles]").rel="stylesheet";</script>';
    if (!page.includes(fragmentGuard)) {
      page = page.replace(/(<noscript><link rel="stylesheet" href="assets\/css\/site\.css\?[^" ]+"><\/noscript>)/, '$1\n  ' + fragmentGuard);
    }
    page = page.replace('<link data-full-styles', block + '<link data-full-styles');
  }
  await writeFile(pages[i], page);
}
console.log(`CSS ${Buffer.byteLength(cssSource)} -> ${Buffer.byteLength(fullCSS)} bytes; JS ${Buffer.byteLength(jsSource)} -> ${Buffer.byteLength(js)} bytes; inline first-screen CSS ${Buffer.byteLength(criticalCSS)} bytes`);
