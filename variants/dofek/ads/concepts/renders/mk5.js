const { chromium } = require('playwright');
const fs=require('fs'), path=require('path');
const b64 = f => 'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,f)).toString('base64');
const NAVY='#0B1725', OR='#FB911B', OR2='#C25D27', CREAM='#F7EADF', RED='#E0352B';
const FONTS=`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Secular+One&display=swap" rel="stylesheet">`;
const W=1080,H=1350;
const base=`*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px}
body{font-family:Rubik,'Liberation Sans',sans-serif;position:relative;overflow:hidden;background:${NAVY}}
.ph{position:absolute;overflow:hidden}.ph i{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat}`;

// ---------- 1. SIZE GAMBLE — orange sticker / diagonal band ----------
const d1=`<style>${base}
body{background:${CREAM}}
.ph{inset:auto 0 0 0;height:${Math.round(H*0.50)}px}
.ph i{background-image:url('${b64('p2.png')}');background-position:58% 44%;transform:scale(1.12)}
.band{position:absolute;top:${Math.round(H*0.445)}px;left:-6%;right:-6%;height:${Math.round(H*0.115)}px;
 background:${OR};transform:rotate(-3.2deg);display:flex;align-items:center;justify-content:center;
 box-shadow:0 14px 40px rgba(11,23,37,.30);z-index:3}
.band span{font-family:'Secular One';font-size:${Math.round(W*0.062)}px;color:${NAVY};letter-spacing:-.01em}
.hd{position:absolute;top:${Math.round(H*0.055)}px;right:${Math.round(W*0.07)}px;left:${Math.round(W*0.07)}px;text-align:right;z-index:4}
.kick{display:inline-block;background:${NAVY};color:${OR};font-weight:900;font-size:${Math.round(W*0.026)}px;
 letter-spacing:.12em;padding:10px 20px;border-radius:999px;margin-bottom:${Math.round(H*0.022)}px}
h1{font-family:'Secular One';font-size:${Math.round(W*0.108)}px;line-height:1.0;color:${NAVY};letter-spacing:-.03em}
h1 em{font-style:normal;color:${OR2};position:relative}
h1 em:after{content:'';position:absolute;right:0;left:0;bottom:-10px;height:9px;background:${RED};border-radius:5px}
.sub{margin-top:${Math.round(H*0.030)}px;font-size:${Math.round(W*0.0305)}px;font-weight:500;line-height:1.45;color:#2A3340}
.bar{position:absolute;bottom:0;left:0;right:0;height:${Math.round(H*0.088)}px;background:${NAVY};
 display:flex;align-items:center;justify-content:space-between;padding:0 ${Math.round(W*0.07)}px;z-index:5}
.pr{color:#fff;font-weight:900;font-size:${Math.round(W*0.034)}px}.pr b{color:${OR}}
.lg{color:#fff;font-weight:900;font-size:${Math.round(W*0.034)}px;letter-spacing:.15em}
</style><div class="ph"><i></i></div><div class="band"><span>הגלגלת עושה את ההתאמה בשבילך</span></div>
<div class="hd"><div class="kick">מגן ברך DOFEK</div>
<h1>רוב מי שקונה<br>מגן ברך<br><em>מהמר על המידה</em></h1>
<div class="sub">מגיע קטן מדי, או גדול ולא מחזיק.</div></div>
<div class="bar"><div class="lg">DOFEK</div><div class="pr"><b>199.99 ₪</b> · משלוח חינם · 30 יום להחזר</div></div>`;

// ---------- 2. STAIRS — dark editorial, full bleed ----------
const d2=`<style>${base}
.ph{inset:0}.ph i{background-image:url('${b64('r4.png')}');background-position:center 34%;transform:scale(1.06)}
.grad{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,23,37,.93) 0%,rgba(11,23,37,.78) 34%,rgba(11,23,37,.10) 58%,rgba(11,23,37,.55) 84%,rgba(11,23,37,.96) 100%)}
.hd{position:absolute;top:${Math.round(H*0.065)}px;right:${Math.round(W*0.075)}px;left:${Math.round(W*0.075)}px;text-align:right}
.kick{color:${OR};font-weight:900;font-size:${Math.round(W*0.0265)}px;letter-spacing:.16em;margin-bottom:${Math.round(H*0.02)}px}
h1{font-family:'Secular One';font-size:${Math.round(W*0.098)}px;line-height:1.08;color:#fff;letter-spacing:-.025em}
h1 em{font-style:normal;color:${OR}}
.ru{width:${Math.round(W*0.13)}px;height:7px;background:${OR};border-radius:4px;margin:${Math.round(H*0.028)}px 0 ${Math.round(H*0.022)}px auto}
.sub{font-size:${Math.round(W*0.031)}px;font-weight:500;line-height:1.52;color:#D7DCE3}
.bot{position:absolute;bottom:${Math.round(H*0.055)}px;right:${Math.round(W*0.075)}px;left:${Math.round(W*0.075)}px;
 display:flex;align-items:center;gap:${Math.round(W*0.03)}px}
.chip{width:${Math.round(W*0.14)}px;height:${Math.round(W*0.14)}px;border-radius:16px;flex:0 0 auto;border:3px solid ${OR};
 background:#fff url('${b64('p2.png')}') center 46%/185% no-repeat}
.m{flex:1;text-align:right}.m .a{color:#fff;font-weight:900;font-size:${Math.round(W*0.0325)}px}
.m .a b{color:${OR}}.m .b{color:#AEB7C2;font-weight:500;font-size:${Math.round(W*0.023)}px;margin-top:5px}
.lg{color:#fff;font-weight:900;font-size:${Math.round(W*0.033)}px;letter-spacing:.15em;flex:0 0 auto}
</style><div class="ph"><i></i></div><div class="grad"></div>
<div class="hd"><div class="kick">מגן ברך DOFEK</div>
<h1>אתה כבר לא עולה<br>מדרגות <em>בלי לחשוב</em><br>על זה</h1><div class="ru"></div>
<div class="sub">לחץ אחיד סביב המפרק, שני מייצבי צד לאורכו,<br>וגלגלת שמכוונת את ההידוק ביד אחת.</div></div>
<div class="bot"><div class="lg">DOFEK</div><div class="m"><div class="a"><b>199.99 ₪</b> · 30 יום להחזר</div>
<div class="b">גלגלת להידוק ביד אחת · שני מייצבי צד</div></div><div class="chip"></div></div>`;

// ---------- 3. REVIEW CARD — testimonial hero ----------
const d3=`<style>${base}
body{background:${NAVY}}
.ph{inset:auto 0 0 0;height:${Math.round(H*0.44)}px}
.ph i{background-image:url('${b64('r3.png')}');background-position:center 30%;transform:scale(1.04)}
.fade{position:absolute;left:0;right:0;bottom:${Math.round(H*0.44)}px;height:${Math.round(H*0.09)}px;
 background:linear-gradient(180deg,${NAVY} 0%,rgba(11,23,37,0) 100%);z-index:2}
.card{position:absolute;top:${Math.round(H*0.062)}px;right:${Math.round(W*0.065)}px;left:${Math.round(W*0.065)}px;
 background:${CREAM};border-radius:26px;padding:${Math.round(H*0.042)}px ${Math.round(W*0.062)}px;text-align:right;
 box-shadow:0 22px 60px rgba(0,0,0,.42);z-index:3}
.st{color:${OR};font-size:${Math.round(W*0.044)}px;letter-spacing:4px;margin-bottom:${Math.round(H*0.016)}px}
h1{font-family:'Secular One';font-size:${Math.round(W*0.082)}px;line-height:1.1;color:${NAVY};letter-spacing:-.025em}
.q{margin-top:${Math.round(H*0.026)}px;font-size:${Math.round(W*0.0305)}px;font-weight:500;line-height:1.55;color:#333C48}
.who{margin-top:${Math.round(H*0.024)}px;padding-top:${Math.round(H*0.02)}px;border-top:2px solid rgba(11,23,37,.14);
 font-size:${Math.round(W*0.0265)}px;font-weight:700;color:#5C6675}
.bar{position:absolute;bottom:0;left:0;right:0;height:${Math.round(H*0.085)}px;background:${OR};
 display:flex;align-items:center;justify-content:space-between;padding:0 ${Math.round(W*0.07)}px;z-index:4}
.pr{color:${NAVY};font-weight:900;font-size:${Math.round(W*0.0335)}px}
.lg{color:${NAVY};font-weight:900;font-size:${Math.round(W*0.034)}px;letter-spacing:.15em}
</style><div class="ph"><i></i></div><div class="fade"></div>
<div class="card"><div class="st">★★★★★</div>
<h1>«אבא שלי עצר<br>אחרי מאה מטר»</h1>
<div class="q">ניסיתי מלא דברים אבל לא הצלחנו כלום. שבוע אחרי שהוא התחיל להשתמש במגן עשינו מסלול לא קצר, והוא אמר שלא הרגיש אפילו מעט כאב.</div>
<div class="who">לימור ל. · חוות דעת באתר · 4.5 מתוך 5 ב-13 חוות דעת</div></div>
<div class="bar"><div class="lg">DOFEK</div><div class="pr">199.99 ₪ · משלוח חינם · 30 יום להחזר</div></div>`;

// ---------- 4. COMPARISON — us vs the 65₪ sleeve ----------
const d4=`<style>${base}
body{background:${CREAM}}
.hd{position:absolute;top:${Math.round(H*0.052)}px;right:${Math.round(W*0.07)}px;left:${Math.round(W*0.07)}px;text-align:right}
.kick{color:${OR2};font-weight:900;font-size:${Math.round(W*0.027)}px;letter-spacing:.13em;margin-bottom:${Math.round(H*0.016)}px}
h1{font-family:'Secular One';font-size:${Math.round(W*0.088)}px;line-height:1.08;color:${NAVY};letter-spacing:-.028em}
h1 em{font-style:normal;color:${OR2}}
.cols{position:absolute;top:${Math.round(H*0.245)}px;right:${Math.round(W*0.07)}px;left:${Math.round(W*0.07)}px;
 display:flex;gap:${Math.round(W*0.032)}px}
.col{flex:1;border-radius:22px;padding:${Math.round(H*0.028)}px ${Math.round(W*0.034)}px;text-align:right}
.c1{background:#E5E2DC;color:#6A7280}
.c2{background:${NAVY};color:#fff;box-shadow:0 18px 44px rgba(11,23,37,.32)}
.ct{font-weight:900;font-size:${Math.round(W*0.0335)}px;margin-bottom:${Math.round(H*0.018)}px}
.c2 .ct{color:${OR}}
.li{font-size:${Math.round(W*0.0265)}px;font-weight:500;line-height:1.75}
.pz{margin-top:${Math.round(H*0.022)}px;padding-top:${Math.round(H*0.016)}px;border-top:2px solid rgba(255,255,255,.18);
 font-weight:900;font-size:${Math.round(W*0.038)}px}
.c1 .pz{border-top-color:rgba(0,0,0,.12);color:#49525F}
.ph{bottom:${Math.round(H*0.095)}px;right:${Math.round(W*0.07)}px;left:${Math.round(W*0.07)}px;height:${Math.round(H*0.245)}px;border-radius:22px}
.ph i{background-image:url('${b64('p3.png')}');background-position:center 42%;transform:scale(1.25)}
.bar{position:absolute;bottom:0;left:0;right:0;height:${Math.round(H*0.082)}px;background:${NAVY};
 display:flex;align-items:center;justify-content:space-between;padding:0 ${Math.round(W*0.07)}px}
.pr{color:#fff;font-weight:900;font-size:${Math.round(W*0.032)}px}.pr b{color:${OR}}
.lg{color:#fff;font-weight:900;font-size:${Math.round(W*0.033)}px;letter-spacing:.15em}
</style>
<div class="hd"><div class="kick">למה 199.99 ולא 65.90</div>
<h1>שרוול זול מחזיק<br>את הברך <em>בלחץ אחד</em></h1></div>
<div class="cols">
 <div class="col c1"><div class="ct">שרוול רגיל</div>
 <div class="li">לחץ קבוע, בלי כוונון<br>בלי מייצבי צד<br>גולש בהליכה<br>מידה אחת, או מתאימה או לא</div>
 <div class="pz">מ-65.90 ₪</div></div>
 <div class="col c2"><div class="ct">DOFEK</div>
 <div class="li">גלגלת, מכוונים ביד אחת<br>שני מייצבי צד לאורך המפרק<br>אחיזה פנימית שלא גולשת<br>כרית ג׳ל סביב הפיקה</div>
 <div class="pz">199.99 ₪</div></div></div>
<div class="ph"><i></i></div>
<div class="bar"><div class="lg">DOFEK</div><div class="pr"><b>משלוח חינם</b> · 30 יום להחזר כספי</div></div>`;

const ADS=[['ang1-size',d1],['ang2-stairs',d2],['ang3-review',d3],['ang4-vs',d4]];
(async()=>{const br=await chromium.launch();
for(const [id,body] of ADS){
  const p=await br.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
  await p.setContent(`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">${FONTS}</head><body>${body}</body></html>`,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.screenshot({path:`${id}.png`}); await p.close(); console.log('rendered',id);
}
await br.close();})();
