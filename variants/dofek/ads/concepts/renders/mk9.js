const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,f)).toString('base64');
const NAVY='#0B1725', OR='#FB911B', CREAM='#F8F1E7';
const W=1080,H=1350, PH=Math.round(H*0.565), BAR=Math.round(H*0.078);

const make=(a)=>`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Secular+One&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px}
body{font-family:Rubik,'Liberation Sans',sans-serif;background:${CREAM};overflow:hidden;position:relative}
.ph{position:absolute;top:0;left:0;right:0;height:${PH}px;overflow:hidden;background:${a.bg||'#000'}}
.ph i{position:absolute;inset:0;background-image:url('${b64(a.img)}');
  background-size:${a.fit||'cover'};background-repeat:no-repeat;
  background-position:${a.pos};transform:scale(${a.zoom||1});transform-origin:${a.org||'center'}}
.tx{position:absolute;top:${PH}px;left:0;right:0;bottom:${BAR}px;background:${CREAM};
  padding:${Math.round(H*0.030)}px ${Math.round(W*0.075)}px 0;text-align:right}
.st{color:${OR};font-size:${Math.round(W*0.0285)}px;font-weight:700;letter-spacing:${a.sp||'4px'};margin-bottom:${Math.round(H*0.014)}px}
h1{font-family:'Secular One';font-size:${Math.round(W*(a.hs||0.060))}px;line-height:1.14;color:${NAVY};letter-spacing:-.022em}
h1 em{font-style:normal;color:${OR}}
.q{margin-top:${Math.round(H*0.019)}px;font-size:${Math.round(W*0.0300)}px;font-weight:500;line-height:1.46;color:#39434F}
.who{margin-top:${Math.round(H*0.018)}px;padding-top:${Math.round(H*0.014)}px;border-top:2px solid rgba(11,23,37,.13);
  font-size:${Math.round(W*0.0245)}px;font-weight:700;color:#67717F}
.bar{position:absolute;bottom:0;left:0;right:0;height:${BAR}px;background:${NAVY};
  display:flex;align-items:center;justify-content:space-between;padding:0 ${Math.round(W*0.062)}px}
.cta{background:${OR};color:${NAVY};font-weight:900;font-size:${Math.round(W*0.0335)}px;
  padding:${Math.round(H*0.0135)}px ${Math.round(W*0.052)}px;border-radius:999px;display:flex;align-items:center;gap:12px}
.cta span{font-size:${Math.round(W*0.036)}px;line-height:1}
.lg{color:#fff;font-weight:900;font-size:${Math.round(W*0.032)}px;letter-spacing:.34em}
</style></head><body>
<div class="ph"><i></i></div>
<div class="tx"><div class="st">${a.kick}</div>
<h1>${a.head}</h1><div class="q">${a.q}</div><div class="who">${a.who}</div></div>
<div class="bar"><div class="lg">DOFEK</div><div class="cta">${a.cta||'רוצה גם'} <span>&#8592;</span></div></div>
</body></html>`;

const ADS=[
 { id:'C1-galgelet', img:'pr1.png', fit:'cover', pos:'58% 46%', zoom:1.0, bg:'#F2F2F2',
   kick:'★★★★★', sp:'5px', hs:0.058,
   head:'״לא צריך להמר<br><em>שיהיה בול עליי</em>״',
   q:'סיבוב אחד של הגלגלת מהדק בדיוק כמה שצריך. ביד אחת, באמצע היום, בלי להוריד נעל.',
   who:'חוות דעת באתר' },

 { id:'C2-shtey-raglayim', img:'pr2.png', fit:'cover', pos:'center 40%', zoom:1.0, bg:'#F2F2F2',
   kick:'לפני שמזמינים', hs:0.058,
   head:'מתאים לימין<br><em>ולשמאל</em>',
   q:'אותו מגן לשתי הרגליים, וההידוק מתכוונן בגלגלת אחרי שהוא כבר עליך. אין צד לא נכון להזמין.',
   who:'DOFEK · שחור או לבן · M עד XLL' },

 { id:'C3-kariot', img:'pr3.png', fit:'cover', pos:'center 52%', zoom:1.0, bg:'#F2F2F2',
   kick:'איפה שזה תופס', hs:0.057,
   head:'הכרית יושבת<br><em>בדיוק על הפיקה</em>',
   q:'ומסביבה לחץ אחיד על כל המפרק. זה מה שמחזיק את הברך במקום כשאתה יורד במדרגות או קם מכיסא.',
   who:'DOFEK · תמיכה ויציבות מהצעד הראשון' },

 { id:'C4-tmicha', img:'pr4.png', fit:'contain', pos:'center 42%', zoom:1.14, bg:'#F4F4F4',
   kick:'מה שיש בפנים', hs:0.057,
   head:'לא עוד שרוול.<br>זה <em>מחזיק</em> את הברך',
   q:'לחץ אחיד על כל המפרק, כרית מחוררת על הפיקה, ושרוכים שנמתחים מהגלגלת לאורך הצד — כדי שהברך תישאר במקום שבו שמת אותה.',
   who:'DOFEK · משלוח חינם · 30 יום להחזר כספי' },

 { id:'C5-gil', img:'n3.png', fit:'cover', pos:'center 44%', zoom:1.02,
   kick:'בהליכה', hs:0.064,
   head:'זה לא הגיל.<br>זו <em>ברך אחת</em>',
   q:'אחת שהתחילה להחליט בשבילי לאן אני הולך ולאן לא. מגן עם גלגלת החזיר לי את ההחלטה.',
   who:'DOFEK · תמיכה ויציבות, בלי להרגיש מוגבל בתנועה' },
];
(async()=>{const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
for(const a of ADS){const p=await br.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
await p.setContent(make(a),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:`DOFEK-${a.id}.png`});await p.close();console.log('rendered',a.id);}
await br.close();})();
