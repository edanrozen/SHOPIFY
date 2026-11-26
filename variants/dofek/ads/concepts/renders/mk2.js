const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, f)).toString('base64');

const ADS = [
  { id: 'v3-A2-size', w:1080, h:1080, img:'p2.png', pos:'62% 42%', zoom:1.18,
    kicker:'מגן ברך DOFEK', head:'לא צריך<br>לנחש מידה',
    sub:'גלגלת אחת. מסובבים פנימה כדי להדק, החוצה כדי לשחרר. ביד אחת, גם אחרי שהמגן כבר על הרגל.',
    foot:'199.99 ₪ · משלוח חינם · 30 יום להחזר' },
  { id: 'v3-A2b-bet', w:1080, h:1350, img:'p3.png', pos:'52% 50%', zoom:1.05,
    kicker:'הנמכר ביותר · 4.5 מתוך 5', head:'רוב מי שמזמין<br>מגן ברך<br>מהמר על המידה',
    sub:'כאן מכוונים את ההידוק בעצמך, אחרי שהמגן כבר על הרגל. ארבע מידות, ובכל אחת אתה מדייק.',
    foot:'4 מידות · 30 יום להחזר כספי' },
  { id: 'v3-C2-gift', w:1080, h:1080, img:'p1.png', pos:'center 46%', zoom:1.22,
    kicker:'מגן ברך DOFEK', head:'מתנה<br>שהוא באמת ילבש',
    sub:'דק מספיק כדי להיכנס מתחת למכנסיים. מכוונים ביד אחת, בלי להוריד נעל ובלי לעצור.',
    foot:'199.99 ₪ · משלוח חינם לכל הארץ' },
  { id: 'v3-A1-stairs', w:1080, h:1350, img:'p1.png', pos:'center 48%', zoom:1.15,
    kicker:'מגן ברך DOFEK', head:'אתה כבר לא<br>עולה מדרגות<br>בלי לחשוב על זה',
    sub:'לחץ אחיד סביב המפרק, שני מייצבי צד לאורכו, וגלגלת שמכוונת את ההידוק ביד אחת.',
    foot:'יציבות בכל מדרגה · 30 יום להחזר' },
];

const html = a => {
  const topH = Math.round(a.h * (a.h > a.w ? 0.455 : 0.44));
  const barH = Math.round(a.h * 0.088);
  return `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${a.w}px;height:${a.h}px}
body{font-family:Heebo,'Liberation Sans',sans-serif;background:#fff;position:relative;overflow:hidden}
.photo{position:absolute;left:0;right:0;top:${topH}px;bottom:${barH}px;overflow:hidden;background:#fff}
.photo i{position:absolute;inset:0;display:block;background-image:url('${b64(a.img)}');
  background-size:cover;background-position:${a.pos};transform:scale(${a.zoom});transform-origin:center}
.panel{position:absolute;top:0;left:0;right:0;height:${topH}px;background:#F5F5F3;
  padding:${Math.round(a.h*0.058)}px ${Math.round(a.w*0.072)}px ${Math.round(a.h*0.03)}px;text-align:right;
  display:flex;flex-direction:column;justify-content:center}
.panel:after{content:'';position:absolute;left:0;right:0;bottom:-${Math.round(a.h*0.026)}px;height:${Math.round(a.h*0.027)}px;
  background:linear-gradient(180deg,#F5F5F3 0%,rgba(245,245,243,0) 100%);z-index:0}
.panel>*{position:relative;z-index:1}
.kicker{font-size:${Math.round(a.w*0.0275)}px;font-weight:700;letter-spacing:.09em;color:#7A7E86;margin-bottom:${Math.round(a.h*0.016)}px}
h1{font-size:${Math.round(a.w*0.094)}px;font-weight:900;line-height:1.04;letter-spacing:-.025em;color:#121418}
.rule{width:${Math.round(a.w*0.095)}px;height:5px;background:#121418;border-radius:3px;margin:${Math.round(a.h*0.024)}px 0 ${Math.round(a.h*0.019)}px auto}
.sub{font-size:${Math.round(a.w*0.0315)}px;font-weight:500;line-height:1.52;color:#4A4E56;max-width:${Math.round(a.w*0.84)}px;margin-right:0}
.bar{position:absolute;bottom:0;left:0;right:0;height:${barH}px;background:#121418;
  display:flex;align-items:center;justify-content:space-between;padding:0 ${Math.round(a.w*0.072)}px}
.foot{font-size:${Math.round(a.w*0.0305)}px;font-weight:700;color:#fff}
.logo{font-size:${Math.round(a.w*0.0345)}px;font-weight:900;color:#fff;letter-spacing:.14em}
</style></head><body>
<div class="photo"><i></i></div>
<div class="panel"><div class="kicker">${a.kicker}</div><h1>${a.head}</h1><div class="rule"></div><div class="sub">${a.sub}</div></div>
<div class="bar"><div class="foot">${a.foot}</div><div class="logo">DOFEK</div></div>
</body></html>`;
};

(async () => {
  const browser = await chromium.launch();
  for (const a of ADS) {
    const page = await browser.newPage({ viewport:{width:a.w,height:a.h}, deviceScaleFactor:1 });
    await page.setContent(html(a), { waitUntil:'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path:`${a.id}.png` });
    await page.close();
    console.log('rendered', a.id);
  }
  await browser.close();
})();
