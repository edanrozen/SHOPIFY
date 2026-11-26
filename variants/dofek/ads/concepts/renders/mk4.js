const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, f)).toString('base64');

const ADS = [
  { id:'real-A1-stairs', img:'r4.png', pos:'center 38%', zoom:1.02,
    kicker:'מגן ברך DOFEK',
    head:'אתה כבר לא<br>עולה מדרגות<br>בלי לחשוב על זה',
    sub:'לחץ אחיד סביב המפרק, שני מייצבי צד לאורכו,<br>וגלגלת שמכוונת את ההידוק ביד אחת.',
    foot:'199.99 ₪ · משלוח חינם · 30 יום להחזר' },

  { id:'real-B1-walk', img:'r1.png', pos:'center 40%', zoom:1.02,
    kicker:'הנמכר ביותר · 4.5 מתוך 5',
    head:'ההליכה של הבוקר<br>התחילה להיות<br>משהו שאת שוקלת',
    sub:'לא ויתרת עליה. אבל את כבר יודעת<br>איך תרגישי אחר כך.',
    foot:'199.99 ₪ · משלוח חינם לכל הארץ' },

  { id:'real-C1-trail', img:'r3.png', pos:'center 42%', zoom:1.02,
    kicker:'מגן ברך DOFEK',
    head:'אבא שלי עצר<br>אחרי מאה מטר',
    sub:'שבוע אחר כך הוא לבש את זה כל יום,<br>ואז עשינו מסלול שלם.',
    foot:'199.99 ₪ · 30 יום להחזר כספי' },
];

const W = 1080, H = 1350;
const html = a => `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{font-family:Heebo,'Liberation Sans',sans-serif;background:#000;position:relative;overflow:hidden}
.ph{position:absolute;inset:0;overflow:hidden}
.ph i{position:absolute;inset:0;background-image:url('${b64(a.img)}');background-size:cover;
  background-position:${a.pos};transform:scale(${a.zoom});transform-origin:center}
.top{position:absolute;top:0;left:0;right:0;height:${Math.round(H*0.50)}px;
  background:linear-gradient(180deg, rgba(246,246,244,.975) 0%, rgba(246,246,244,.94) 46%, rgba(246,246,244,.62) 76%, rgba(246,246,244,0) 100%)}
.bot{position:absolute;bottom:0;left:0;right:0;height:${Math.round(H*0.30)}px;
  background:linear-gradient(0deg, rgba(14,16,19,.94) 0%, rgba(14,16,19,.70) 38%, rgba(14,16,19,0) 100%)}
.tx{position:absolute;top:${Math.round(H*0.055)}px;right:${Math.round(W*0.072)}px;left:${Math.round(W*0.072)}px;text-align:right}
.kicker{font-size:${Math.round(W*0.0275)}px;font-weight:700;letter-spacing:.09em;color:#73777E;margin-bottom:${Math.round(H*0.015)}px}
h1{font-size:${Math.round(W*0.088)}px;font-weight:900;line-height:1.05;letter-spacing:-.025em;color:#101216}
.rule{width:${Math.round(W*0.09)}px;height:5px;background:#101216;border-radius:3px;margin:${Math.round(H*0.021)}px 0 ${Math.round(H*0.017)}px auto}
.sub{font-size:${Math.round(W*0.0305)}px;font-weight:500;line-height:1.5;color:#43474E}
.bar{position:absolute;bottom:${Math.round(H*0.042)}px;right:${Math.round(W*0.072)}px;left:${Math.round(W*0.072)}px;
  display:flex;align-items:center;gap:${Math.round(W*0.028)}px}
.chip{width:${Math.round(W*0.135)}px;height:${Math.round(W*0.135)}px;border-radius:14px;overflow:hidden;flex:0 0 auto;
  background:#fff url('${b64('p2.png')}') center 46%/185% no-repeat;box-shadow:0 6px 26px rgba(0,0,0,.4)}
.meta{flex:1 1 auto;text-align:right}
.foot{font-size:${Math.round(W*0.0305)}px;font-weight:700;color:#fff;line-height:1.35}
.note{font-size:${Math.round(W*0.0225)}px;font-weight:500;color:#C6C9CE;margin-top:4px}
.logo{font-size:${Math.round(W*0.034)}px;font-weight:900;color:#fff;letter-spacing:.14em;flex:0 0 auto}
</style></head><body>
<div class="ph"><i></i></div><div class="top"></div><div class="bot"></div>
<div class="tx"><div class="kicker">${a.kicker}</div><h1>${a.head}</h1><div class="rule"></div><div class="sub">${a.sub}</div></div>
<div class="bar"><div class="logo">DOFEK</div><div class="meta"><div class="foot">${a.foot}</div><div class="note">גלגלת להידוק ביד אחת · שני מייצבי צד</div></div><div class="chip"></div></div>
</body></html>`;

(async () => {
  const br = await chromium.launch();
  for (const a of ADS) {
    const p = await br.newPage({ viewport:{width:W,height:H}, deviceScaleFactor:1 });
    await p.setContent(html(a), { waitUntil:'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path:`${a.id}.png` });
    await p.close();
    console.log('rendered', a.id);
  }
  await br.close();
})();
