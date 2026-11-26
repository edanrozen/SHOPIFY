const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});const p=await c.newPage();
const posts=[]; const r404=[];
p.on('request',rq=>{ if(/\/cart\/(add|change|update)/.test(rq.url())) posts.push({url:rq.url(),post:rq.postData()}); });
p.on('response',rs=>{ if(rs.status()>=400) r404.push({status:rs.status(),url:rs.url().slice(0,180),type:rs.request().resourceType()}); });
await p.goto(PDP,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(7000);
const out={};
// map all variant pickers
out.pickers = await p.evaluate(()=>{
  const groups=[];
  document.querySelectorAll('input[type=radio], select').forEach(e=>{
    const r=e.getBoundingClientRect(); const lab=(e.closest('label')?.innerText||e.labels?.[0]?.innerText||e.getAttribute('value')||'').trim();
    groups.push({name:e.name, tag:e.tagName, value:e.value, label:lab.slice(0,20), checked:e.checked, docY:Math.round(r.top+scrollY),
      inKaching: !!e.closest('[class*=kaching]'), vis:r.width>0&&r.height>0});
  });
  return groups.filter(g=>g.vis||g.tag==='SELECT');
});
const sizeIn = n => out.pickers.filter(g=>g.inKaching===n && /M|L|XL|XLL/.test(g.label||g.value||''));
out.themeSizeOptions = sizeIn(false).map(g=>({label:g.label,value:g.value,checked:g.checked,docY:g.docY}));
out.kachingSizeOptions = sizeIn(true).map(g=>({label:g.label,value:g.value,checked:g.checked,docY:g.docY}));

// select XL in the THEME picker (the lower one, next to ATC)
const themeXL = p.locator('label:below(:text("מידה"))').filter({hasText:/^XL$/});
out.themeXLcount = await themeXL.count();
// fallback: click by text within the non-kaching option list
const clicked = await p.evaluate(()=>{
  const cands=Array.from(document.querySelectorAll('label,button,[role=radio]')).filter(e=>!e.closest('[class*=kaching]') && (e.innerText||'').trim()==='XL');
  if(!cands.length) return null;
  const el=cands[cands.length-1]; const r=el.getBoundingClientRect();
  el.click(); return {docY:Math.round(r.top+scrollY), cls:(el.className||'').toString().slice(0,60)};
});
out.clickedThemeXL=clicked;
await p.waitForTimeout(3500);
out.afterSelect = await p.evaluate(()=>({
  url: location.href,
  themeChecked: Array.from(document.querySelectorAll('input[type=radio]')).filter(e=>e.checked && !e.closest('[class*=kaching]')).map(e=>e.value),
  kachingChecked: Array.from(document.querySelectorAll('input[type=radio]')).filter(e=>e.checked && e.closest('[class*=kaching]')).map(e=>e.value),
  kachingSelectedText: Array.from(document.querySelectorAll('[class*=kaching] [class*=selected],[class*=kaching] [aria-checked=true],[class*=kaching] .is-selected')).map(e=>(e.innerText||'').replace(/\s+/g,' ').trim().slice(0,80)),
  priceShown: Array.from(document.querySelectorAll('.dp__price,.kaching-bundles__bar-price')).map(e=>(e.innerText||'').trim())
}));
await p.locator('.dp__atc').first().click();
await p.waitForTimeout(5000);
out.cartAfter = await p.evaluate(()=>fetch('/cart.js',{headers:{Accept:'application/json'}}).then(r=>r.json()).catch(e=>({err:String(e)})));
out.cartAddPosts = posts;
out.errorResponses = r404;
fs.writeFileSync(OUT+'/data/10-variant-sync.json',JSON.stringify(out,null,2));
console.log(JSON.stringify({clicked:out.clickedThemeXL, afterSelect:out.afterSelect,
  cartItems:(out.cartAfter.items||[]).map(i=>({t:i.title,v:i.variant_id,p:i.final_line_price})),
  posts:out.cartAddPosts, errors:out.errorResponses},null,2).slice(0,4000));
await b.close();})();
