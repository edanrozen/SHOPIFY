/**
 * Measures a rendered page at phone width and reports what a thumb would hit.
 *
 * Screenshots show what a page looks like; they do not show that a button is
 * 36px tall or that the price is 900px down. This reports the things the eye
 * does not catch and the phone punishes.
 *
 * Usage: node tools/pdp-preview/mobile-audit.js <file.html> [width] [height]
 */
const { chromium } = require('playwright');
const path = require('path');

// 44px is the smallest target a thumb hits reliably; it is also the number
// Apple and the WCAG 2.5.8 minimum settle near. 16px is the smallest body text
// that does not make iOS zoom the page on focus.
const MIN_TAP = 44;
const MIN_TEXT = 13;

const AUDIT = ({ minTap, minText }) => {
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const name = (el) => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\s+/).slice(0, 2).join('.') : '');

  const inScroller = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const ox = getComputedStyle(n).overflowX;
      if (ox === 'auto' || ox === 'scroll') return true;
    }
    return false;
  };

  const overflow = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return;
    const over = Math.max(Math.round(r.right - vw), Math.round(-r.left));
    if (over > 1 && !inScroller(el)) overflow.push(`+${over}px ${name(el)}`);
  });

  const smallTaps = [];
  document.querySelectorAll('a, button, input, select, [role="button"]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    if (r.height < minTap || r.width < minTap) {
      smallTaps.push(`${Math.round(r.width)}x${Math.round(r.height)} ${name(el)}`);
    }
  });

  const smallText = new Map();
  document.querySelectorAll('body *').forEach((el) => {
    if (!el.childNodes.length) return;
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!hasText) return;
    const px = parseFloat(getComputedStyle(el).fontSize);
    if (px < minText) smallText.set(name(el), `${px.toFixed(1)}px`);
  });

  // How far down the first thing a buyer needs actually sits.
  const firstOf = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    return Math.round(el.getBoundingClientRect().top + window.scrollY);
  };

  return {
    viewport: `${vw}x${vh}`,
    pageHeight: document.documentElement.scrollHeight,
    screensToScroll: +(document.documentElement.scrollHeight / vh).toFixed(1),
    horizontalOverflow: document.documentElement.scrollWidth > vw
      ? `${document.documentElement.scrollWidth}px vs ${vw}px` : 'none',
    overflowOffenders: overflow.slice(0, 8),
    tapTargetsUnderMin: [...new Set(smallTaps)].slice(0, 12),
    textUnderMin: [...smallText].slice(0, 12).map(([k, v]) => `${v} ${k}`),
    firstPriceAt: firstOf('.wf-pdp__price, .nv-buy__price, .wf-card__price'),
    firstButtonAt: firstOf('.nv-cta, .wf-btn, button[type="submit"]'),
  };
};

(async () => {
  const file = path.resolve(process.argv[2]);
  const width = Number(process.argv[3] || 390);
  const height = Number(process.argv[4] || 844);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await p.goto('file://' + file, { waitUntil: 'load' });
  const out = await p.evaluate(AUDIT, { minTap: MIN_TAP, minText: MIN_TEXT });
  console.log(path.basename(file), JSON.stringify(out, null, 2));
  await b.close();
})();
