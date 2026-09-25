/**
 * Measures every style variant of pl-product-story at phone widths.
 *
 * The generic harness strips Liquid, so the `{% case %}` branches lose their
 * style classes and the variants never render. This page carries each variant
 * class explicitly instead, under both section tones, so a new treatment cannot
 * ship without being measured.
 *
 * Usage: node tools/responsive-check/build.js && node tools/responsive-check/measure-variants.js
 */
const { chromium } = require('playwright');
const fs = require('fs');
const DIR = __dirname;
const CSS = fs.readFileSync(DIR + '/theme.css', 'utf8');
const RESET = fs.readFileSync(DIR + '/reset.css', 'utf8');
const FRAG = fs.readFileSync(DIR + '/variants.frag.html', 'utf8');

const FIND = () => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  const inScroller = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const ox = getComputedStyle(n).overflowX;
      if (ox === 'auto' || ox === 'scroll') return true;
    }
    return false;
  };
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return;
    const over = Math.max(Math.round(r.right - vw), Math.round(-r.left));
    if (over > 1 && !inScroller(el)) {
      out.push(`+${over}px ${el.tagName.toLowerCase()}.${(el.className || '').toString().trim().split(/\s+/).join('.')}`);
    }
  });
  return { doc: document.documentElement.scrollWidth, vw, offenders: out.slice(0, 8) };
};

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  let bad = 0;
  for (const w of [320, 375, 390, 430]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.setContent(
      `<!doctype html><html dir="rtl" lang="he"><head><meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<style>${RESET}</style><style>${CSS}</style></head><body>${FRAG}</body></html>`, { waitUntil: 'load' });
    await p.waitForTimeout(120);
    const r = await p.evaluate(FIND);
    const over = r.doc - r.vw;
    console.log(`variants @ ${w}px  doc.scrollWidth=${r.doc} viewport=${r.vw} -> ${over > 0 ? 'OVERFLOW +' + over : 'ok'}`);
    if (over > 0) bad++;
    r.offenders.forEach((o) => console.log('   ', o));
    await p.close();
  }
  await b.close();
  console.log('\n=== ' + (bad ? bad + ' viewport(s) overflow' : 'every story variant fits at 320, 375, 390 and 430') + ' ===');
})();
