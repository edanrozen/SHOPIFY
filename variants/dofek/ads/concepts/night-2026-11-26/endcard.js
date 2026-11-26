const { chromium } = require('playwright');
const NAVY='#0B1725', OR='#FB911B', CREAM='#F8F1E7';
const W=1080,H=1920;
const html=`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Secular+One&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px}
body{font-family:Rubik,sans-serif;background:${NAVY};overflow:hidden;
 display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(H*0.042)}px}
.lg{color:#fff;font-weight:900;font-size:${Math.round(W*0.092)}px;letter-spacing:.36em;
 text-indent:.36em;opacity:.97}
.rule{width:${Math.round(W*0.17)}px;height:5px;background:${OR};border-radius:9px}
.ask{font-family:'Secular One';color:${CREAM};font-size:${Math.round(W*0.086)}px;
 line-height:1.22;text-align:center;letter-spacing:-.02em;padding:0 ${Math.round(W*0.09)}px}
.ask em{font-style:normal;color:#FFFFFF}
.cta{margin-top:${Math.round(H*0.012)}px;background:${OR};color:${NAVY};font-weight:900;
 font-size:${Math.round(W*0.062)}px;padding:${Math.round(H*0.027)}px ${Math.round(W*0.105)}px;
 border-radius:999px;display:flex;align-items:center;gap:${Math.round(W*0.03)}px;
 box-shadow:0 18px 50px rgba(251,145,27,.28)}
.cta span{font-size:${Math.round(W*0.078)}px;line-height:1}
.sub{color:#8A94A3;font-size:${Math.round(W*0.034)}px;font-weight:500;letter-spacing:.01em;
 text-align:center;padding:0 ${Math.round(W*0.1)}px;line-height:1.5}
</style></head><body>
<div class="lg">DOFEK</div>
<div class="rule"></div>
<div class="ask">רוצה <em>לחזור לשם</em>?</div>
<div class="cta">לאתר — לחץ כאן <span>&#8592;</span></div>
<div class="sub">המגן מיועד לתמיכה חיצונית ואינו תחליף לאבחון או לטיפול רפואי</div>
</body></html>`;
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
const p=await br.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'endcard.png'});await br.close();console.log('endcard rendered');})();
