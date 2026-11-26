const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,f)).toString('base64');
const NAVY='#0B1725', OR='#FB911B';
const W=1080,H=1350;
const slide=(s)=>`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;700;900&family=Secular+One&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px}
body{font-family:Rubik;background:${s.solid?NAVY:'#F2F2F2'};overflow:hidden;position:relative}
.ph{position:absolute;inset:0;background-image:url('${s.img?b64(s.img):''}');
  background-size:${s.fit||'cover'};background-repeat:no-repeat;background-position:${s.pos||'center'};background-color:#F2F2F2}
.sh{position:absolute;left:0;right:0;bottom:0;height:42%;
  background:linear-gradient(to top, rgba(11,23,37,.94) 0%, rgba(11,23,37,.80) 40%, rgba(11,23,37,0) 100%)}
.cap{position:absolute;left:0;right:0;bottom:${Math.round(H*0.075)}px;padding:0 ${Math.round(W*0.075)}px;text-align:center}
.cap h1{font-family:'Secular One';font-size:${Math.round(W*(s.hs||0.082))}px;line-height:1.15;color:#fff;letter-spacing:-.02em;
  text-shadow:0 2px 18px rgba(0,0,0,.35)}
.cap h1 em{font-style:normal;color:${OR}}
.end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(H*0.026)}px}
.end .lg{color:#fff;font-weight:900;font-size:${Math.round(W*0.08)}px;letter-spacing:.34em}
.end h1{font-family:'Secular One';font-size:${Math.round(W*0.062)}px;color:#fff;text-align:center;line-height:1.2;padding:0 ${Math.round(W*0.09)}px}
.end h1 em{font-style:normal;color:${OR}}
.end .cta{margin-top:${Math.round(H*0.01)}px;background:${OR};color:${NAVY};font-weight:900;
  font-size:${Math.round(W*0.044)}px;padding:${Math.round(H*0.02)}px ${Math.round(W*0.09)}px;border-radius:999px}
.end .sub{color:#95A0AD;font-size:${Math.round(W*0.031)}px;font-weight:700}
</style></head><body>
${s.solid?`<div class="end"><div class="lg">DOFEK</div><h1>${s.head}</h1><div class="cta">${s.cta}</div><div class="sub">${s.sub}</div></div>`
 :`<div class="ph"></div><div class="sh"></div><div class="cap"><h1>${s.head}</h1></div>`}
</body></html>`;

const S=[
 // HOOK — real people, movement. brace deliberately out of frame (top crop).
 {img:'n3.png', fit:'210% auto', pos:'58% 4%', hs:0.070, head:'כולם המשיכו ללכת,<br><em>ואני חיפשתי ספסל</em>'},
 {img:'pr4.png', fit:'contain', pos:'center 36%', hs:0.080, head:'זה לא הגיל.<br>זו <em>ברך אחת</em>'},
 {img:'pr1.png', fit:'cover', pos:'58% 44%', hs:0.080, head:'סיבוב אחד,<br><em>ביד אחת</em>'},
 {img:'pr3.png', fit:'cover', pos:'center 48%', hs:0.074, head:'והברך<br><em>נשארת במקום</em>'},
 {solid:true, head:'תמיכה ויציבות<br><em>מהצעד הראשון</em>', cta:'רוצה גם ←', sub:'משלוח חינם · 30 יום להחזר כספי'},
];
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
for(let i=0;i<S.length;i++){const p=await br.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
await p.setContent(slide(S[i]),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:`t${i+1}.png`});await p.close();}
await br.close();console.log('slides done');})();
