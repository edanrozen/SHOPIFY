const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const res={};
 for (const [label, dev] of [['mobile', {...devices['iPhone 13']}], ['desktop', {viewport:{width:1440,height:900}, deviceScaleFactor:1}]]) {
  const c=await b.newContext({...dev, locale:'he-IL'});
  const p=await c.newPage();
  await p.goto(PDP,{waitUntil:'load',timeout:60000});
  await p.waitForTimeout(6000);
  res[label]=await p.evaluate(()=>{
    const vh=innerHeight, vw=innerWidth;
    const g=el=>{ if(!el) return null; const r=el.getBoundingClientRect(); const cs=getComputedStyle(el);
      return {docY:Math.round(r.top+scrollY), h:Math.round(r.height), w:Math.round(r.width), screensDown:+((r.top+scrollY)/vh).toFixed(2),
        fontSize:cs.fontSize, color:cs.color, bg:cs.backgroundColor, text:(el.innerText||'').trim().slice(0,120)}; };
    const q=s=>document.querySelector(s);
    const byText=(sel,re)=>Array.from(document.querySelectorAll(sel)).find(e=>re.test((e.innerText||'').trim()));
    const out={ viewport:{vw,vh}, docHeight:document.body.scrollHeight, screens:+(document.body.scrollHeight/vh).toFixed(1) };
    out.atc = g(q('.dp__atc') || q('form[action*="/cart/add"] button[type=submit]'));
    out.h1 = g(q('h1'));
    out.priceEls = Array.from(document.querySelectorAll('[class*=price]')).slice(0,12).map(e=>{const r=e.getBoundingClientRect();return {cls:(e.className||'').toString().slice(0,70), docY:Math.round(r.top+scrollY), txt:(e.innerText||'').trim().slice(0,60), fs:getComputedStyle(e).fontSize};}).filter(x=>x.txt);
    out.sizeSel = g(q('[class*=size], fieldset'));
    out.gallery = g(q('[class*=media], [class*=gallery], .product__media'));
    out.cartIcon = (()=>{ const el=q('a[href="/cart"], a[href*="/cart"]'); if(!el) return null; const r=el.getBoundingClientRect(); const bub=el.querySelector('[class*=bubble],[class*=count]');
      return {rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}, html:el.innerHTML.replace(/\s+/g,' ').slice(0,300), bubbleText: bub?(bub.innerText||'').trim():null, bubbleVisible: bub?(()=>{const rr=bub.getBoundingClientRect();const s=getComputedStyle(bub);return rr.width>0&&rr.height>0&&s.display!=='none'&&s.visibility!=='hidden';})():null}; })();
    out.kaching = Array.from(document.querySelectorAll('[class*=kaching]')).filter(e=>e.className.toString().match(/kaching-bundles__(block|bar)\b/)).map(e=>{const r=e.getBoundingClientRect();return {cls:e.className.toString().slice(0,80), docY:Math.round(r.top+scrollY), h:Math.round(r.height), txt:(e.innerText||'').replace(/\s+/g,' ').trim().slice(0,200)};});
    out.sizeChartPresent = /טבלת מידות|היקף|ס"מ|סנטימטר|מדידה|how to measure/i.test(document.body.innerText);
    out.images = document.images.length;
    out.iframes = Array.from(document.querySelectorAll('iframe')).map(f=>f.src).slice(0,10);
    // tap targets < 44px
    out.smallTaps = Array.from(document.querySelectorAll('a,button,input,select,[role=button]')).map(e=>{const r=e.getBoundingClientRect();return {t:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,40), w:Math.round(r.width), h:Math.round(r.height), vis:r.width>0&&r.height>0};}).filter(x=>x.vis && (x.w<44||x.h<44));
    return out;
  });
  await c.close();
 }
 fs.writeFileSync(OUT+'/data/02-geometry.json', JSON.stringify(res,null,2));
 console.log(JSON.stringify(res,null,2).slice(0,6000));
 await b.close();
})();
