const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,f)).toString('base64');
const NAVY='#0B1725', OR='#FB911B', CREAM='#F8F1E7';
const W=1080,H=1350;

const make=(a)=>`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Secular+One&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px}
body{font-family:Rubik,'Liberation Sans',sans-serif;background:${CREAM};overflow:hidden;position:relative}

/* PHOTO — nothing is ever drawn on top of it */
.ph{position:absolute;top:0;left:0;right:0;height:${a.phH}px;overflow:hidden;background:#000}
.ph i{position:absolute;inset:0;background-image:url('${b64(a.img)}');background-size:cover;
  background-position:${a.pos};transform:scale(${a.zoom})}

/* TEXT — its own panel, below the photo */
.tx{position:absolute;top:${a.phH}px;left:0;right:0;bottom:${Math.round(H*0.082)}px;background:${CREAM};
  padding:${Math.round(H*0.030)}px ${Math.round(W*0.075)}px 0;text-align:right}
.st{color:${OR};font-size:${Math.round(W*0.036)}px;letter-spacing:5px;margin-bottom:${Math.round(H*0.015)}px}
h1{font-family:'Secular One';font-size:${Math.round(W*0.060)}px;line-height:1.14;color:${NAVY};letter-spacing:-.022em}
h1 em{font-style:normal;color:${OR}}
.q{margin-top:${Math.round(H*0.019)}px;font-size:${Math.round(W*0.0300)}px;font-weight:500;line-height:1.46;color:#39434F}
.who{margin-top:${Math.round(H*0.018)}px;padding-top:${Math.round(H*0.014)}px;border-top:2px solid rgba(11,23,37,.13);
  font-size:${Math.round(W*0.0245)}px;font-weight:700;color:#67717F}

.bar{position:absolute;bottom:0;left:0;right:0;height:${Math.round(H*0.082)}px;background:${NAVY};
  display:flex;align-items:center;justify-content:space-between;padding:0 ${Math.round(W*0.075)}px}
.pr{color:#fff;font-weight:900;font-size:${Math.round(W*0.0315)}px}.pr b{color:${OR}}
.lg{color:#fff;font-weight:900;font-size:${Math.round(W*0.033)}px;letter-spacing:.15em}
</style></head><body>
<div class="ph"><i></i></div>
<div class="tx"><div class="st">★★★★★</div>
<h1>${a.head}</h1>
<div class="q">${a.q}</div>
<div class="who">${a.who}</div></div>
<div class="bar"><div class="lg">DOFEK</div><div class="pr"><b>משלוח חינם</b> · 30 יום להחזר כספי</div></div>
</body></html>`;

const ADS=[
 { id:'DOFEK-story-A', img:'w1.png', phH:Math.round(H*0.545), pos:'center 50%', zoom:1.0,
   head:'לפני חודשיים הוא לא<br>הצליח ללכת <em>מאה מטר</em>',
   q:'בשבת האחרונה עשינו מסלול שלם. הוא אמר שלא הרגיש אפילו מעט כאב.',
   who:'לימור ל. · חוות דעת באתר' },
 { id:'DOFEK-story-B', img:'w1.png', phH:Math.round(H*0.545), pos:'center 50%', zoom:1.0,
   head:'ניסינו הכל.<br>ואז <em>הוא חזר לחיות</em>',
   q:'אבא שלי סובל מכאבי ברכיים כבר עשור. שבוע אחרי שהתחיל עם המגן עשינו מסלול שלם בהרים.',
   who:'לימור ל. · חוות דעת באתר' },
 { id:'DOFEK-story-C', img:'w2.png', phH:Math.round(H*0.545), pos:'center 50%', zoom:1.0,
   head:'שבועיים ברצף אני לוקחת<br>את הנכדים <em>מהגן</em>',
   q:'ונעלמו הכאבים.',
   who:'רינה מ. · חוות דעת באתר' },
 { id:'DOFEK-story-D', img:'w3.png', phH:Math.round(H*0.545), pos:'center 50%', zoom:1.0,
   head:'סוף סוף אני לא צריך<br>להמר שיהיה <em>בול עליי</em>',
   q:'השימוש בו קל מאוד, והגלגלת מאוד עוזרת לי. אני פשוט מכוון אותו.',
   who:'משה פ. · חוות דעת באתר' },
];
(async()=>{const br=await chromium.launch();
for(const a of ADS){const p=await br.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
await p.setContent(make(a),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:`${a.id}.png`});await p.close();console.log('rendered',a.id);}
await br.close();})();
