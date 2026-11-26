const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL',timezoneId:'Asia/Jerusalem'});
 const p=await c.newPage();
 const out={};
 await p.goto(PDP,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(5000);
 await p.locator('.dp__atc').first().click(); await p.waitForTimeout(5000);
 // click the inline "לסל הקניות" link that appears
 const link = p.locator('a:has-text("לסל הקניות"), a[href="/cart"]').first();
 out.inlineLinkCount = await link.count();
 try { await link.click({timeout:10000}); } catch(e){ out.linkClickErr=String(e.message).split('\n')[0]; await p.goto('https://dofek.shop/cart',{waitUntil:'domcontentloaded'}).catch(()=>{}); }
 await p.waitForLoadState('domcontentloaded').catch(()=>{});
 await p.waitForTimeout(6000);
 out.url=p.url();
 out.cart = await p.evaluate(()=>{
   const vis=el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden';};
   return { h:document.body.scrollHeight, text:document.body.innerText.replace(/\n{2,}/g,'\n').slice(0,1200),
     ctas: Array.from(document.querySelectorAll('button,input[type=submit],a')).filter(vis).map(e=>{const r=e.getBoundingClientRect();return{t:(e.innerText||e.value||'').trim().slice(0,45),n:e.getAttribute('name'),href:e.getAttribute('href'),w:Math.round(r.width),h:Math.round(r.height),y:Math.round(r.top+scrollY)};}).filter(x=>x.t&&/המשך|תשלום|checkout|סיום|הזמנה|רכישה|סל/.test(x.t+' '+(x.n||''))),
     accel: Array.from(document.querySelectorAll('shopify-accelerated-checkout,[class*=dynamic-checkout],[class*=additional-checkout-button]')).map(e=>({cls:(e.className||'').toString().slice(0,70),vis:vis(e),txt:(e.innerText||'').trim().slice(0,100)})) };
 });
 try{ await p.screenshot({path:OUT+'/shots/15-cart-with-item.png',timeout:25000}); }catch(e){}
 // checkout button -> checkout
 const co = p.locator('[name=checkout], button:has-text("תשלום"), a[href*="/checkout"]').first();
 out.checkoutBtn = await co.count();
 if (out.checkoutBtn) { const t=Date.now(); try{ await co.click({timeout:15000}); await p.waitForURL(/checkout/,{timeout:45000}); }catch(e){ out.coErr=String(e.message).split('\n')[0]; } out.checkoutNavMs=Date.now()-t; }
 await p.waitForTimeout(8000);
 out.checkoutUrl=p.url();
 try{ await p.screenshot({path:OUT+'/shots/16-checkout-from-cart.png',timeout:25000}); }catch(e){}
 fs.writeFileSync(OUT+'/data/04-cart-leg.json',JSON.stringify(out,null,2));
 console.log(JSON.stringify(out,null,2).slice(0,5000));
 await b.close();
})();
