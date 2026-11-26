const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,f)).toString('base64');
const NAVY='#0B1725', OR='#FB911B', LIGHT='#F4F4F4';
const W=1080,H=1350, BAR=Math.round(H*0.135);
const html=`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;700;900&family=Secular+One&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px}
body{font-family:Rubik;background:${LIGHT};overflow:hidden;position:relative}
.lg{position:absolute;top:${Math.round(H*0.062)}px;left:0;right:0;text-align:center;
  color:${NAVY};font-weight:900;font-size:${Math.round(W*0.052)}px;letter-spacing:.36em}
.ph{position:absolute;top:${Math.round(H*0.125)}px;left:0;right:0;bottom:${BAR}px;
  background-image:url('${b64('pr4.png')}');background-size:contain;background-repeat:no-repeat;
  background-position:center center}
.bar{position:absolute;bottom:0;left:0;right:0;height:${BAR}px;background:${NAVY};
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(H*0.009)}px}
.bar .k{color:#8D97A4;font-weight:700;font-size:${Math.round(W*0.026)}px;letter-spacing:.30em}
.bar h2{font-family:'Secular One';color:#fff;font-size:${Math.round(W*0.058)}px;line-height:1.1;letter-spacing:-.015em}
.bar h2 em{font-style:normal;color:${OR}}
</style></head><body>
<div class="lg">DOFEK</div>
<div class="ph"></div>
<div class="bar"><div class="k">מגן ברך DOFEK</div>
<h2>עכשיו ב<em>מבצעי הבלאק פריידי</em></h2></div>
</body></html>`;
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await br.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'bf-card.png'});await br.close();console.log('end card rendered');})();
