/**
 * Asserts the document direction the layout emits.
 *
 * This exists because the shop shipped every Hebrew page as `dir="ltr"` and
 * nothing caught it. The page renderer in render.js writes `dir="rtl"` into
 * its own wrapper, so every screenshot and every check in pdp-test.js was
 * taken on a document whose direction was correct by accident. The real
 * direction is decided in layout/theme.liquid, from the locale, and the
 * shop's only published locale is `en`.
 *
 * So this runs that header on its own, against the locales that matter, and
 * asserts what lands on <html>.
 *
 * Usage: node tools/pdp-preview/dir-test.js [layout/theme.liquid]
 */
const fs = require('fs');
const path = require('path');
const { Liquid } = require('liquidjs');

const file = process.argv[2] || path.resolve(__dirname, '../../theme/layout/theme.liquid');
const src = fs.readFileSync(file, 'utf8');

// Just the opening {%- liquid ... -%} header, which is where direction is set.
const header = src.match(/^\{%-?\s*liquid[\s\S]*?-?%\}/);
if (!header) {
  console.error('no leading liquid block in ' + file);
  process.exit(2);
}

// liquidjs trips over prose inside `comment ... endcomment` in a liquid tag.
const body = header[0]
  .replace(/^\{%-?\s*liquid\s*/, '')
  .replace(/-?%\}$/, '')
  .replace(/^[ \t]*comment\b[\s\S]*?^[ \t]*endcomment[ \t]*$/gm, '');

const engine = new Liquid();
const probe = `{% liquid\n${body}\n%}{{ page_dir }}|{{ page_lang }}`;

const cases = [
  // iso_code,  expected dir, expected lang, why
  ['en', 'rtl', 'he', 'the shop default nobody changed: Hebrew content must not go out LTR'],
  ['he', 'rtl', 'he', 'Hebrew properly configured'],
  ['he-IL', 'rtl', 'he-IL', 'Hebrew with a region'],
  ['ar', 'rtl', 'ar', 'another RTL script'],
];

let bad = 0;
for (const [iso, wantDir, wantLang, why] of cases) {
  const out = engine.parseAndRenderSync(probe, { request: { locale: { iso_code: iso } } }).trim();
  const [dir, lang] = out.split('|');
  const ok = dir === wantDir && lang === wantLang;
  if (!ok) bad++;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'}  locale=${iso.padEnd(6)} dir=${dir} lang=${lang}` +
      (ok ? '' : `  (wanted dir=${wantDir} lang=${wantLang}: ${why})`),
  );
}
console.log(bad ? `${bad} failing` : `passed ${cases.length}`);
process.exit(bad ? 1 : 0);
