// Lucas / DOFEK QA 2026-11-26 — נתיב הרכישה, אמולציית אייפון
const { chromium, devices } = require('playwright');
const fs = require('fs');
const OUT = '/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP = 'https://dofek.shop/products/' + encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--hide-scrollbars','--force-device-scale-factor=1'] });
  const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'he-IL', timezoneId: 'Asia/Jerusalem' });
  const page = await ctx.newPage();
  const log = [];
  const console_msgs = [], netfail = [], http4xx = [], requests = [];
  page.on('console', m => console_msgs.push({ t: Date.now(), type: m.type(), text: m.text(), loc: m.location() }));
  page.on('pageerror', e => console_msgs.push({ t: Date.now(), type: 'pageerror', text: String(e && e.message), stack: String(e && e.stack).slice(0,600) }));
  page.on('requestfailed', r => netfail.push({ t: Date.now(), url: r.url(), method: r.method(), err: r.failure() && r.failure().errorText, type: r.resourceType() }));
  page.on('request', r => requests.push({ t: Date.now(), url: r.url(), method: r.method(), type: r.resourceType(), post: (r.postData()||'').slice(0,400) }));
  page.on('response', async r => { if (r.status() >= 400) http4xx.push({ t: Date.now(), url: r.url(), status: r.status(), type: r.request().resourceType() }); });
  page.on('framenavigated', f => { if (f === page.mainFrame()) log.push({ t: Date.now(), ev: 'navigated', url: f.url() }); });


  const shot = async (name, full) => {
    for (let i=0;i<3;i++){
      try { await page.screenshot({ path: OUT + '/shots/' + name, fullPage: !!full, timeout: 30000, animations: 'disabled', caret: 'initial' }); return true; }
      catch(e){ log.push({t:Date.now(), ev:'screenshot failed', name, try:i, err:String(e.message).split('\n')[0]}); await page.waitForTimeout(1500); }
    }
    return false;
  };

  const shotScroll = async (prefix) => {
    const h = await page.evaluate(() => document.body.scrollHeight);
    const vh = page.viewportSize().height;
    log.push({t:Date.now(), ev:'page height', prefix, scrollHeight: h, viewport: vh, screens: +(h/vh).toFixed(1)});
    for (let i=0, y=0; y < h && i < 16; i++, y += vh) {
      await page.evaluate(yy => window.scrollTo(0, yy), y);
      await page.waitForTimeout(700);
      await shot(`${prefix}-scroll-${String(i).padStart(2,'0')}.png`);
    }
    await page.evaluate(() => window.scrollTo(0,0));
    await page.waitForTimeout(400);
  };
  const t0 = Date.now();
  const resp = await page.goto(PDP, { waitUntil: 'load', timeout: 60000 });
  log.push({ t: Date.now(), ev: 'pdp loaded', ms: Date.now()-t0, status: resp.status(), url: page.url() });
  await page.waitForTimeout(6000);
  await shot('01-pdp-mobile-top.png');
  await shotScroll('02-pdp-mobile');

  // cart before
  const cartBefore = await page.evaluate(() => fetch('/cart.js', {headers:{'Accept':'application/json'}}).then(r=>r.json()).catch(e=>({err:String(e)})));
  log.push({ t: Date.now(), ev: 'cart.js BEFORE', item_count: cartBefore.item_count, total: cartBefore.total_price, items: (cartBefore.items||[]).map(i=>i.title) });

  // inventory of candidate ATC buttons
  const btns = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('button, input[type=submit], a[href*="cart"], [role=button]').forEach(el => {
      const r = el.getBoundingClientRect();
      const txt = (el.innerText||el.value||'').trim().slice(0,80);
      out.push({ tag: el.tagName, name: el.getAttribute('name'), type: el.getAttribute('type'), cls:(el.className||'').toString().slice(0,120), id: el.id, txt,
        visible: !!(r.width && r.height), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
        disabled: el.disabled===true, aria: el.getAttribute('aria-label'), formAction: el.form ? el.form.getAttribute('action') : null });
    });
    return out;
  });
  fs.writeFileSync(OUT + '/data/pdp-mobile-buttons.json', JSON.stringify(btns, null, 2));
  log.push({ t: Date.now(), ev: 'button inventory', count: btns.length, atc_like: btns.filter(b=>/סל|עגל|קנ|הוסף|cart|checkout|רכיש|תשלום/i.test(b.txt+' '+b.cls+' '+(b.name||''))).length });

  // app embeds / third party scripts
  const scripts = await page.evaluate(() => Array.from(document.scripts).map(s=>s.src).filter(Boolean));
  fs.writeFileSync(OUT + '/data/pdp-mobile-scripts.json', JSON.stringify(scripts, null, 2));

  // find the real ATC
  let atc = page.locator('form[action*="/cart/add"] button[type=submit], form[action*="/cart/add"] [name=add]').first();
  let n = await atc.count();
  if (!n) { atc = page.getByRole('button', { name: /סל|עגלה|הוספה/ }).first(); n = await atc.count(); }
  log.push({ t: Date.now(), ev: 'atc locator count', n });
  if (!n) { log.push({t:Date.now(), ev:'FATAL no ATC found'}); }
  else {
    const info = await atc.evaluate(el => { const r=el.getBoundingClientRect(); return { txt:(el.innerText||'').trim(), cls:(el.className||'').toString(), id:el.id, name:el.getAttribute('name'), disabled:el.disabled, w:Math.round(r.width), h:Math.round(r.height), y:Math.round(r.y), form: el.form?el.form.getAttribute('action'):null, listeners:'n/a' }; });
    log.push({ t: Date.now(), ev: 'ATC element', info });
    const htmlBefore = await page.evaluate(() => document.body.innerHTML.length);
    await atc.scrollIntoViewIfNeeded();
    await shot('03-before-click-atc.png');
    const clickT = Date.now();
    log.push({ t: clickT, ev: '>>> CLICK ATC' });
    try { await atc.click({ timeout: 15000 }); } catch(e) { log.push({t:Date.now(), ev:'click error', err:String(e.message).slice(0,300)}); }
    // watch what happens for 12s
    for (const ms of [500, 1000, 2000, 4000, 8000, 12000]) {
      await page.waitForTimeout(ms === 500 ? 500 : 0);
      if (ms > 500) await page.waitForTimeout(0);
    }
    const marks = [500,1500,3000,6000,12000];
    let prev = 0;
    for (const m of marks) {
      await page.waitForTimeout(m - prev); prev = m;
      const snap = await page.evaluate(() => {
        const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width>1 && r.height>1 && s.visibility!=='hidden' && s.display!=='none' && parseFloat(s.opacity)>0.05; };
        const drawers = Array.from(document.querySelectorAll('[class*=drawer],[class*=modal],[id*=drawer],[class*=cart-popup],[class*=popup],dialog,[role=dialog],[class*=mini-cart],[class*=minicart],[class*=kaching],[class*=Kaching]'))
          .filter(vis).map(el=>({tag:el.tagName, id:el.id, cls:(el.className||'').toString().slice(0,140), txt:(el.innerText||'').trim().slice(0,200)}));
        return { url: location.href, bodyLen: document.body.innerHTML.length, scrollY: window.scrollY, drawers,
          cartCountEls: Array.from(document.querySelectorAll('[class*=cart-count],[class*=cart_count],[id*=cart-count],[class*=bubble]')).map(e=>(e.innerText||'').trim()).filter(Boolean) };
      });
      const cj = await page.evaluate(() => fetch('/cart.js',{headers:{'Accept':'application/json'}}).then(r=>r.json()).catch(e=>({err:String(e)})));
      log.push({ t: Date.now(), ev: 'POST-CLICK +' + m + 'ms', since_click: Date.now()-clickT, url: snap.url, bodyLen: snap.bodyLen, bodyDelta: snap.bodyLen - htmlBefore, drawers: snap.drawers, cartCountEls: snap.cartCountEls, cart_item_count: cj.item_count, cart_total: cj.total_price, cart_items: (cj.items||[]).map(i=>({t:i.title, q:i.quantity, p:i.final_line_price})) });
      await shot(`04-after-click-+${m}ms.png`);
    }
    await shotScroll('05-after-click');
    // network around the click
    const near = requests.filter(r => r.t >= clickT - 500 && r.t <= clickT + 13000);
    fs.writeFileSync(OUT + '/data/requests-around-click.json', JSON.stringify(near, null, 2));
    log.push({ t: Date.now(), ev: 'requests in click window', count: near.length,
      cart_add: near.filter(r=>/\/cart\/add/.test(r.url)).map(r=>({url:r.url, m:r.method, post:r.post})),
      checkout: near.filter(r=>/checkout/.test(r.url)).map(r=>r.url) });
  }

  fs.writeFileSync(OUT + '/data/01-mobile-log.json', JSON.stringify({ log, console: console_msgs, netfail, http4xx }, null, 2));
  console.log(JSON.stringify({ log, console_count: console_msgs.length, netfail_count: netfail.length, http4xx_count: http4xx.length }, null, 2));
  await browser.close();
})();
