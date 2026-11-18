// End card for the rant cut. Harder than the story film's: the line is a
// challenge, not a tagline, and the CTA is the point.
const { chromium } = require('playwright');
const fs = require('fs');
const FPS = 24, DUR = 3.2, N = Math.round(FPS * DUR);
const out = process.argv[2] || 'endseq';
fs.mkdirSync(out, { recursive: true });
const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const seg = (t, a, b) => ease((t - a) / (b - a));
const html = (t) => {
  const cl = seg(t, 0.00, 0.40);
  const br = seg(t, 0.32, 0.72);
  const ct = seg(t, 0.68, 1.10);
  const dm = seg(t, 1.05, 1.40);
  const push = 1 + 0.03 * (t / DUR);
  const pulse = t > 1.5 ? 1 + 0.018 * Math.sin((t - 1.5) * 3.4) : 1;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;900&display=swap" rel="stylesheet">
<style>
 html,body{margin:0;padding:0;width:1080px;height:1920px;background:#11100e;
   font-family:'Rubik',sans-serif;color:#fff;overflow:hidden;}
 .bg{position:absolute;inset:0;background:
   radial-gradient(120% 70% at 50% 42%, #2c2723 0%, #15130f 55%, #0b0a08 100%);
   transform:scale(${push.toFixed(4)});transform-origin:50% 45%;}
 .c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;
   justify-content:center;text-align:center;direction:rtl;padding:0 90px;
   transform:scale(${push.toFixed(4)});transform-origin:50% 45%;}
 .claim{font-weight:900;font-size:98px;line-height:1.14;letter-spacing:-1px;
   opacity:${cl.toFixed(3)};transform:translateY(${((1-cl)*24).toFixed(1)}px);}
 .claim .dim{color:#9a9188;}
 .rule{width:${(170*br).toFixed(1)}px;height:4px;background:#c9a227;border-radius:2px;
   margin:60px 0 56px;}
 .brand{font-weight:900;font-size:74px;direction:ltr;
   opacity:${br.toFixed(3)};letter-spacing:${(12+10*(1-br)).toFixed(1)}px;}
 .cta{margin-top:84px;font-weight:600;font-size:46px;color:#0c0b09;
   background:#e8dfd2;border-radius:999px;padding:30px 78px;direction:rtl;
   opacity:${ct.toFixed(3)};transform:scale(${((.94+.06*ct)*pulse).toFixed(4)});}
 .dom{margin-top:40px;font-weight:400;font-size:34px;color:#8d867d;direction:ltr;
   letter-spacing:1px;opacity:${dm.toFixed(3)};}
</style></head><body>
<div class="bg"></div>
<div class="c">
  <div class="claim"><span class="dim">מספיק להתלונן.</span><br>תפסיק לסבול.</div>
  <div class="rule"></div>
  <div class="brand">DOFEK</div>
  <div class="cta">להזמנה באתר</div>
  <div class="dom">dofek.shop</div>
</div></body></html>`;
};
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await p.setContent(html(0), { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  for (let i = 0; i < N; i++) {
    await p.setContent(html(i / FPS), { waitUntil: 'domcontentloaded' });
    await p.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.png` });
  }
  await b.close();
  console.log('frames', N);
})();
