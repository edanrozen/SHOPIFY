const { chromium } = require('playwright');
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Secular+One&family=Rubik:wght@400;500&display=swap" rel="stylesheet">
<style>
 html,body{margin:0;padding:0;width:1080px;height:1920px;background:#0B1725;}
 .c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;}
 .m{font-family:'Secular One',sans-serif;font-size:132px;letter-spacing:.06em;color:#F8F1E7;}
 .s{font-family:'Rubik',sans-serif;font-weight:400;font-size:50px;color:#F8F1E7;opacity:.82;direction:rtl;}
 .u{font-family:'Rubik',sans-serif;font-weight:500;font-size:56px;color:#FB911B;margin-top:16px;}
</style></head><body><div class="c">
 <div class="m">DOFEK</div>
 <div class="s">מגן ברך עם חוגה</div>
 <div class="u">dofek.shop</div>
</div></body></html>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.setContent(html,{waitUntil:'networkidle'});await p.waitForTimeout(500);
await p.screenshot({path:'endcard.png'});await b.close();console.log('ok');})();
