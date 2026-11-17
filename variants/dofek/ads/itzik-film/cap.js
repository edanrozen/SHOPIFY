const { chromium } = require('playwright');
const fs = require('fs');

// каждая: [id, text]
const caps = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2],'utf8')) : [];
const out = process.argv[3] || '.';

const html = (text) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;800&display=swap" rel="stylesheet">
<style>
 html,body{margin:0;padding:0;width:1080px;height:1920px;background:transparent;}
 .wrap{position:absolute;left:0;right:0;bottom:300px;display:flex;justify-content:center;padding:0 70px;}
 .t{font-family:'Rubik',sans-serif;font-weight:800;font-size:76px;line-height:1.22;color:#fff;
    text-align:center;direction:rtl;
    text-shadow:0 4px 18px rgba(0,0,0,.75), 0 2px 5px rgba(0,0,0,.9);
    -webkit-text-stroke:3px rgba(0,0,0,.45);
    paint-order:stroke fill;}
</style></head><body>
<div class="wrap"><div class="t">${text}</div></div></body></html>`;

(async () => {
  const b = await chromium.launch({ args:['--no-sandbox'] });
  const p = await b.newPage({ viewport:{width:1080,height:1920}, deviceScaleFactor:1 });
  for (const [id, text] of caps) {
    await p.setContent(html(text), { waitUntil:'networkidle' });
    await p.waitForTimeout(350);
    await p.screenshot({ path: `${out}/${id}.png`, omitBackground: true });
    console.log('ok', id);
  }
  await b.close();
})();
