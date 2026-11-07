/**
 * Drives the rendered DOFEK product page in a real browser.
 *
 * The preview renders Liquid but does not serve assets, so `df-pdp.js` is
 * injected by hand here. Everything else is the page as the shop will serve
 * it: the same markup, the same stylesheets, the same script.
 *
 * Usage: node tools/pdp-preview/pdp-test.js <rendered.html> <df-pdp.js>
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [htmlPath, jsPath] = process.argv.slice(2);
if (!htmlPath || !jsPath) {
  console.error('usage: pdp-test.js <rendered.html> <df-pdp.js>');
  process.exit(2);
}

const fails = [];
const ok = [];
const check = (name, pass, detail) => {
  (pass ? ok : fails).push(detail ? `${name} — ${detail}` : name);
};

(async () => {
  // This sandbox ships one Chromium at a fixed path rather than the build
  // Playwright bundles, and `playwright install` is not available here. Use
  // the one that exists when it is there, and the bundled one anywhere else.
  const shipped = '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(
    fs.existsSync(shipped) ? { executablePath: shipped, args: ['--no-sandbox'] } : {},
  );
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.setContent(fs.readFileSync(htmlPath, 'utf8'), { waitUntil: 'load' });
  await page.addScriptTag({ content: fs.readFileSync(jsPath, 'utf8') });
  await page.waitForTimeout(150);

  check('no page errors', errors.length === 0, errors.join(' | '));

  /* ---- the pickers replace the select ---- */
  const sel = page.locator('[data-dp-select]');
  const fallbackShown = await page.locator('[data-dp-fallback]').isVisible();
  check('select fallback hidden once the script runs', !fallbackShown);
  check('swatch pickers shown', await page.locator('[data-dp-pickers]').isVisible());

  /* The counts are read off the page rather than hard-coded, because this
     runs against more than one product: four sizes on the brace, twelve on
     the insoles. What is asserted is that every option value got a control
     and that the product of the groups is the variant count. */
  const groups = await page.locator('[data-dp-opt]').count();
  check('every option got a group', groups >= 1, `found ${groups}`);
  const shape = await page.evaluate(() => {
    const out = [];
    for (const fs of document.querySelectorAll('[data-dp-opt]')) {
      out.push({
        radios: fs.querySelectorAll('input[type=radio]').length,
        faces: fs.querySelectorAll('.dp__dot, .dp__size').length,
      });
    }
    return out;
  });
  check(
    'every option value got a visible control',
    shape.every((g) => g.radios > 0 && g.radios === g.faces),
    JSON.stringify(shape),
  );
  const variants = await page.locator('[data-dp-select] option').count();
  const cartesian = shape.reduce((n, g) => n * g.radios, 1);
  check(
    'the variant count fits inside the grid of options',
    variants > 0 && variants <= cartesian,
    `${shape.map((g) => g.radios).join(' x ')} = ${cartesian}, ${variants} variants`,
  );
  // A size that exists in one colour and not in another is not a variant that
  // is out of stock, it is a variant that was never created. The page has to
  // strike that pill through rather than drop it, so a shopper sees that the
  // size exists and that this colour does not come in it.
  if (variants < cartesian) {
    const struck = await page.evaluate(() => {
      const bad = [];
      for (const r of document.querySelectorAll('[data-dp-pickers] input[type=radio]')) {
        const face = r.nextElementSibling;
        if (!face || !face.classList.contains('dp__size')) continue;
        if (r.disabled !== face.classList.contains('dp__size--out')) bad.push(face.textContent.trim());
      }
      return bad;
    });
    check('a combination that does not exist is struck through, not hidden', struck.length === 0, struck.join(', '));
  }

  /* ---- picking an option moves the hidden select ---- */
  const before = await sel.inputValue();
  const lastGroup = `[data-dp-opt="${groups}"]`;
  await page.locator(`${lastGroup} label`).last().click();
  await page.waitForTimeout(60);
  const afterSize = await sel.inputValue();
  check('picking a value changes the posted variant', afterSize !== before, `${before} -> ${afterSize}`);

  // Then pick in the first group. On a two-group product that is the colour
  // after the size, which is the order that used to dead-end: the grounding
  // shoe comes in 47 in one colour only, and the other swatch was disabled
  // with no way back. The first group must always stay clickable.
  const firstGroup = page.locator('[data-dp-opt="1"] label');
  const target = groups > 1 ? firstGroup.nth(1) : firstGroup.first();
  const enabled = await target.locator('input').isEnabled();
  check('the first option group never locks', enabled);
  if (enabled) {
    await target.click();
    await page.waitForTimeout(60);
    const afterColour = await sel.inputValue();
    check('picking in the first group changes it again', afterColour !== afterSize, `${afterSize} -> ${afterColour}`);
  }
  check(
    'the standing bar names the chosen variant',
    (await page.locator('[data-dp-barvariant]').textContent()).trim().length > 0,
  );

  /* ---- quantity floor ---- */
  const qty = page.locator('[data-dp-qtyin]');
  await page.locator('[data-dp-qty="-1"]').click();
  await page.locator('[data-dp-qty="-1"]').click();
  check('quantity never drops below one', (await qty.inputValue()) === '1');
  await page.locator('[data-dp-qty="1"]').click();
  check('quantity goes up', (await qty.inputValue()) === '2');

  /* ---- the gallery ---- */
  const thumbs = await page.locator('[data-dp-thumb]').count();
  const frames = await page.locator('.dp__frame').count();
  check('a frame per photograph', thumbs === frames, `${thumbs} thumbs, ${frames} frames`);
  await page.locator('[data-dp-thumb="2"]').click();
  await page.waitForTimeout(250);
  const onIndex = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.dp__frame')).findIndex((f) => f.hasAttribute('data-on')));
  check('the third thumbnail shows the third frame', onIndex === 2, `showing ${onIndex}`);
  const painted = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.dp__frame'))
      .filter((f) => getComputedStyle(f).visibility === 'visible').length);
  check('exactly one frame is painted', painted === 1, `${painted} visible`);

  /* ---- the lightbox opens the frame that is showing ---- */
  await page.locator('.dp__frame[data-on] img').click();
  await page.waitForTimeout(150);
  check('the lightbox opens', await page.locator('.dp-lb[open]').isVisible());
  const lbSrc = await page.locator('.dp-lb img').getAttribute('src');
  const frameFull = await page.locator('.dp__frame[data-on] img').getAttribute('data-full');
  check('it opens the photograph that was showing', lbSrc === frameFull);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  check('Escape closes it', !(await page.locator('.dp-lb[open]').isVisible()));

  /* ---- the questions ---- */
  const faq = await page.locator('#dp-faq details').count();
  check('the questions are on the page', faq >= 5, `${faq} questions`);
  check('the first one is open', await page.locator('#dp-faq details').first().evaluate((d) => d.open));

  /* ---- the standing bar appears on a scroll jump ---- */
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(400);
  check('the buy bar appears after a scroll jump', await page.locator('.dp-bar.is-on').count() === 1);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  check('and hides again at the top', await page.locator('.dp-bar.is-on').count() === 0);

  /* ---- no English left in the copy ---- */
  const strays = await page.evaluate(() => {
    // DOFEK, Shopify and the size codes are names. "earthing" is the word
    // the grounding page defines in the same sentence it uses it in, because
    // it is what people search for; everything else in Latin letters on a
    // Hebrew page is a translation that did not happen.
    const allowed = /^(DOFEK|Shopify|M|L|R|XL|XLL|earthing|\d+%?|₪[\d.,]+)$/;
    const out = [];
    // Script and style bodies are code, not copy. Without this the scan
    // reports the variant JSON the buy box emits and every identifier in
    // the review section's inline script as untranslated Hebrew copy.
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(node.parentElement ? node.parentElement.tagName : '')
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    let n;
    while ((n = walk.nextNode())) {
      const t = n.textContent.trim();
      if (!t || !/[A-Za-z]/.test(t)) continue;
      for (const word of t.split(/\s+/)) {
        if (/[A-Za-z]/.test(word) && !allowed.test(word.replace(/[.,:()]/g, ''))) out.push(word);
      }
    }
    return Array.from(new Set(out));
  });
  check('no stray English in the copy', strays.length === 0, strays.join(', '));

  /* ---- widths: overflow, type floor, tap targets ---- */
  for (const w of [360, 390, 430, 768, 1280, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(120);
    const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    check(`no horizontal overflow at ${w}`, !over);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  const small = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('.dp *, .dl *')) {
      if (!el.textContent.trim() || el.children.length) continue;
      const px = parseFloat(getComputedStyle(el).fontSize);
      if (px && px < 14) out.push(el.className + ' @ ' + px.toFixed(1) + 'px');
    }
    return Array.from(new Set(out));
  });
  check('nothing under 14px on the phone', small.length === 0, small.join(' | '));

  /* The measure. This is here because the test suite missed a whole section
     shipping with no rules at all: the split band lived in the home page's
     sheet, which the product templates do not request, so it rendered
     full-bleed with a hundred and fifty characters to a line. Overflow was
     clean, the type was large enough, every tap target was fine, and the
     section was broken. A line that long is a typographic fault in its own
     right and it is also what an unstyled text band looks like. */
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.waitForTimeout(150);
  const long = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('p, li, h1, h2, h3')) {
      const t = el.textContent.trim();
      if (t.length < 60 || el.children.length) continue;
      const cs = getComputedStyle(el);
      const w = el.getBoundingClientRect().width;
      // 0.5em is a fair average advance for this type at this size; the
      // threshold is deliberately loose, it is looking for 150, not 80.
      const ch = w / (parseFloat(cs.fontSize) * 0.5);
      if (ch > 95) out.push(`${el.className || el.tagName} ~${Math.round(ch)}ch`);
    }
    return Array.from(new Set(out));
  });
  check('no line runs past a readable measure at 1280', long.length === 0, long.join(' | '));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  const tiny = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('.dp a, .dp button, .dp input, .dp label, .dl a, .dl summary')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (getComputedStyle(el).visibility === 'hidden') continue;
      if (r.height < 44 || r.width < 44) {
        out.push((el.className || el.tagName) + ' @ ' + Math.round(r.width) + 'x' + Math.round(r.height));
      }
    }
    return Array.from(new Set(out));
  });
  check('every tap target is at least 44px', tiny.length === 0, tiny.join(' | '));

  await browser.close();

  console.log(`passed ${ok.length}`);
  for (const f of fails) console.log('FAIL  ' + f);
  process.exit(fails.length ? 1 : 0);
})();
