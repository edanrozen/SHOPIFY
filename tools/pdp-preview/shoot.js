/**
 * Screenshots the rendered product page at phone width, in slices, and reports
 * anything that sticks out past the viewport.
 *
 * Usage: node tools/pdp-preview/shoot.js <file.html> <outdir> [width]
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

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
  return { doc: document.documentElement.scrollWidth, vw, offenders: out.slice(0, 10) };
};

(async () => {
  const file = path.resolve(process.argv[2]);
  const outdir = path.resolve(process.argv[3]);
  const width = Number(process.argv[4] || 390);
  fs.mkdirSync(outdir, { recursive: true });

  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width, height: 844 }, deviceScaleFactor: 2 });
  await p.goto('file://' + file, { waitUntil: 'load' });
  await p.waitForTimeout(250);

  const r = await p.evaluate(FIND);
  console.log(`${width}px  doc.scrollWidth=${r.doc} viewport=${r.vw} -> ${r.doc - r.vw > 0 ? 'OVERFLOW' : 'ok'}`);
  r.offenders.forEach((o) => console.log('   ' + o));

  const height = await p.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
  console.log(`page height ${height}px  (${(height / 844).toFixed(1)} phone screens)`);

  // Slices rather than one tall strip: a 9000px image is unreadable.
  const slice = 800;
  const n = Math.min(Math.ceil(height / slice), 20);
  // `body { overflow-x: clip }` makes the body a scroll container, and a single
  // scrollTo against the window lands short. Setting scrollTop on the real
  // scrolling element and confirming the result is the only reliable way.
  for (let i = 0; i < n; i++) {
    const want = i * slice;
    for (let t = 0; t < 6; t++) {
      const at = await p.evaluate((y) => {
        document.scrollingElement.scrollTop = y;
        window.scrollTo(0, y);
        return Math.round(document.scrollingElement.scrollTop || window.scrollY);
      }, want);
      if (Math.abs(at - want) < 4 || at >= height - 900) break;
      await p.waitForTimeout(80);
    }
    await p.waitForTimeout(140);
    await p.screenshot({ path: path.join(outdir, `s${i + 1}.png`) });
  }
  console.log(`wrote ${n} slices to ${outdir}`);
  await b.close();
})();
