const { chromium } = require('playwright');
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;900&display=swap" rel="stylesheet">
<style>
 html,body{margin:0;padding:0;width:1080px;height:1920px;background:#11100e;
   font-family:'Rubik',sans-serif;color:#fff;overflow:hidden;}
 .bg{position:absolute;inset:0;background:
   radial-gradient(120% 70% at 50% 38%, #2a2622 0%, #15130f 55%, #0c0b09 100%);}
 .c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;
   justify-content:center;text-align:center;direction:rtl;padding:0 90px;}
 .claim{font-weight:900;font-size:96px;line-height:1.18;letter-spacing:-1px;}
 .claim .dim{color:#9a9188;}
 .rule{width:170px;height:4px;background:#c9a227;border-radius:2px;margin:56px 0 52px;}
 .brand{font-weight:900;font-size:68px;letter-spacing:10px;direction:ltr;}
 .sub{font-weight:400;font-size:38px;color:#b8b0a6;margin-top:22px;direction:rtl;}
 .cta{margin-top:78px;font-weight:600;font-size:40px;color:#0c0b09;
   background:#e8dfd2;border-radius:999px;padding:26px 66px;direction:rtl;}
 .dom{margin-top:40px;font-weight:400;font-size:34px;color:#8d867d;direction:ltr;letter-spacing:1px;}
</style></head><body>
<div class="bg"></div>
<div class="c">
  <div class="claim"><span class="dim">זה לא הגיל.</span><br>זה הברך.</div>
  <div class="rule"></div>
  <div class="brand">DOFEK</div>
  <div class="sub">מגן ברך עם חוגת כיוון</div>
  <div class="cta">להזמנה באתר</div>
  <div class="dom">dofek.shop</div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch({ args:['--no-sandbox'] });
  const p = await b.newPage({ viewport:{width:1080,height:1920}, deviceScaleFactor:1 });
  await p.setContent(html, { waitUntil:'networkidle' });
  await p.waitForTimeout(500);
  await p.screenshot({ path: 'endcard.png' });
  await b.close();
})();
