/**
 * Builds the CSS bundle and page fragments the checks run against.
 *
 * The storefront cannot be loaded from a sandbox, so the checks run the theme's
 * own CSS over markup derived from the section files: the template half of each
 * Liquid file with the tags stripped, which leaves the real element tree and the
 * real class names. Loops emit one child, so the checks clone them back up.
 *
 * Usage: node tools/responsive-check/build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const OUT = __dirname;

const HOME = ['pl-hero-photo','pl-marquee','pl-banner','pl-row','pl-promise','pl-story','pl-ritual','pl-faq'];
const PDP  = ['pl-product-main','pl-marquee','pl-product-story','pl-product-tabs','pl-related'];

const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

// pluma.css first, then every section {% stylesheet %}, which is the order
// Shopify serves them in: the section bundle loads after the asset.
// Mirrors the real load order: pluma.css, then the product story sheet that
// the product template links, then Shopify's bundle of section stylesheets.
let css = [read('theme/assets/pluma.css'), read('theme/assets/pl-story.css')];
for (const f of fs.readdirSync(path.join(ROOT, 'theme/sections')).sort()) {
  if (!f.endsWith('.liquid')) continue;
  const m = read('theme/sections/' + f).match(/\{%\s*stylesheet\s*%\}([\s\S]*?)\{%\s*endstylesheet\s*%\}/);
  if (m) css.push(`/* === ${f} === */\n` + m[1]);
}
fs.writeFileSync(path.join(OUT, 'theme.css'), css.join('\n'));

function markup(name) {
  let s = read('theme/sections/' + name + '.liquid').split('{% stylesheet %}')[0];
  s = s.replace(/\{%-?\s*schema[\s\S]*/, '')
       .replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, '')
       .replace(/\{%-?\s*doc\s*-?%\}[\s\S]*?\{%-?\s*enddoc\s*-?%\}/g, '')
       .replace(/<script>[\s\S]*?<\/script>/g, '')
       .replace(/\{\{[\s\S]*?\}\}/g, '')
       .replace(/\{%-?[\s\S]*?-?%\}/g, '');
  return `<!-- ${name} -->\n` + s;
}

const page = names =>
  `<div class="page-wrapper"><div id="header-group"></div><main id="MainContent" class="content-for-layout">${
    names.map(markup).join('\n')}</main></div>`
  // pl-row takes its list class from a Liquid variable the stripper removes
  .replace('<ul class="" role="list">', '<ul class="pl-grid pl-grid--4" role="list">');

fs.writeFileSync(path.join(OUT, 'home.frag.html'), page(HOME));
fs.writeFileSync(path.join(OUT, 'pdp.frag.html'), page(PDP));

// desktop-diff.js compares the committed sheet against the working copy, so it
// needs both bundled against the same section styles.
const sections = css.slice(1).join('\n');
const { execSync } = require('child_process');
let head;
try {
  head = execSync('git show HEAD:theme/assets/pluma.css', { cwd: ROOT, encoding: 'utf8' });
} catch (e) {
  head = read('theme/assets/pluma.css'); // no commit yet, or detached: diff against itself
}
fs.writeFileSync(path.join(OUT, 'theme.old.css'), head + '\n' + sections);
fs.writeFileSync(path.join(OUT, 'theme.new.css'), read('theme/assets/pluma.css') + '\n' + sections);

console.log('built theme.css, theme.old.css, theme.new.css, home.frag.html, pdp.frag.html');
