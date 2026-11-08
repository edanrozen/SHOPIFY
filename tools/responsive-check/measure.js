const { chromium } = require('playwright');
const fs = require('fs');
const DIR = __dirname;

const CSS  = fs.readFileSync(DIR + '/theme.css', 'utf8');
const RESET = fs.readFileSync(DIR + '/reset.css', 'utf8');
const PAGES = { home: fs.readFileSync(DIR + '/home.frag.html','utf8'),
                pdp:  fs.readFileSync(DIR + '/pdp.frag.html','utf8') };

// Realistic Hebrew filler, including the longest strings the real site uses.
const WORDS = ['מסיר','שיער','לחיות','מחמד','עם','ידית','עץ','טיפוח','פרווה','אינטראקטיבי',
               'כדורוש','צעצוע','חכם','ואינטראקטיבי','לחתולים','משלוח','חינם','אספקה','ימי','עסקים'];
const LONG  = 'כדורוש צעצוע חכם ואינטראקטיבי לחתולים';

const HYDRATE = (long) => {
  // 1x1 transparent gif so images lay out without network
  const PX = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  document.querySelectorAll('img').forEach(img => {
    img.src = PX;
    if (!img.getAttribute('width'))  img.setAttribute('width', 800);
    if (!img.getAttribute('height')) img.setAttribute('height', 800);
  });
  document.querySelectorAll('svg').forEach(s => { if (!s.getAttribute('width')) s.setAttribute('width', 16); });

  const SKIP = new Set(['SCRIPT','STYLE','IMG','SVG','PATH','INPUT','BR']);
  document.querySelectorAll('*').forEach(el => {
    if (SKIP.has(el.tagName)) return;
    if (el.children.length) return;
    if (el.textContent.trim()) return;
    el.textContent = long;
  });

  // Loops emitted one child each; clone so grids and rails carry a real load.
  document.querySelectorAll('.pl-grid, .pl-rail, .pl-pdp__thumbs, .pl-promise__list, .pl-ritual__steps, .pl-faq__list, .pl-story__gallery, .pl-pdp__trust, .pl-pdp__highlights, ul, ol').forEach(list => {
    const first = list.firstElementChild;
    if (!first) return;
    const n = list.children.length;
    if (n >= 4) return;
    for (let i = n; i < 8; i++) list.appendChild(first.cloneNode(true));
  });
};

const FIND = () => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const over = Math.max(0, Math.round(r.right - vw), Math.round(-r.left));
    if (over > 1) {
      const cs = getComputedStyle(el);
      // A box that is itself clipped or scrollable is not a page overflow source.
      out.push({
        sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
        over, w: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right),
        ox: cs.overflowX, pos: cs.position
      });
    }
  });
  return {
    docScroll: document.documentElement.scrollWidth,
    bodyScroll: document.body.scrollWidth,
    vw,
    offenders: out.slice(0, 40)
  };
};

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const widths = [320, 375, 390, 430];
  let bad = 0;
  for (const [name, frag] of Object.entries(PAGES)) {
    for (const w of widths) {
      const page = await browser.newPage({ viewport: { width: w, height: 850 }, deviceScaleFactor: 2 });
      await page.setContent(
        `<!doctype html><html dir="rtl" lang="he"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${RESET}</style><style>${CSS}</style></head><body>${frag}</body></html>`,
        { waitUntil: 'load' });
      await page.evaluate(HYDRATE, LONG);
      await page.waitForTimeout(120);
      const res = await page.evaluate(FIND);
      const overflow = res.docScroll - res.vw;
      const flag = overflow > 0 ? 'OVERFLOW' : 'ok';
      console.log(`\n${name} @ ${w}px  doc.scrollWidth=${res.docScroll} viewport=${res.vw}  -> ${flag}${overflow > 0 ? ' by ' + overflow + 'px' : ''}`);
      if (overflow > 0) bad++;
      if (res.offenders.length) {
        console.log('  boxes past the edge:');
        for (const o of res.offenders.slice(0, 12)) {
          console.log(`   +${o.over}px  w=${o.w} [${o.left}..${o.right}] overflow-x:${o.ox} ${o.pos}  ${o.sel.slice(0,110)}`);
        }
      }
      await page.close();
    }
  }
  await browser.close();
  console.log('\n=== ' + (bad ? bad + ' viewport(s) overflow' : 'no horizontal overflow at any tested width') + ' ===');
})();
