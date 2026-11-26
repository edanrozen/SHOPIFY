const { chromium, devices } = require('playwright');
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});
 const p=await c.newPage();
 const t0=Date.now();
 p.on('framenavigated',f=>{ if(f===p.mainFrame()) console.log(Date.now()-t0,'MAIN NAV ->',f.url().slice(0,120)); });
 p.on('response',async r=>{ if(r.request().resourceType()==='document'){ const h=r.headers(); console.log(Date.now()-t0, r.status(), (r.request().isNavigationRequest()?'NAV ':'sub '), r.url().slice(0,110), h.location?('-> '+h.location.slice(0,110)):''); } });
 await p.goto(PDP,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(5000);
 console.log('--- now click "לסל הקניות" style link / go to cart ---');
 try{ await p.goto('https://dofek.shop/cart',{waitUntil:'domcontentloaded',timeout:40000}); }catch(e){ console.log('nav err',String(e.message).split('\n')[0]); }
 await p.waitForTimeout(4000);
 console.log('FINAL', p.url().slice(0,150));
 // Now try with a clean context, direct to /cart, no PDP first
 const c2=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});
 const p2=await c2.newPage();
 p2.on('response',r=>{ if(r.request().resourceType()==='document') console.log('CLEAN', r.status(), r.url().slice(0,110), r.headers().location?('-> '+r.headers().location.slice(0,110)):''); });
 try{ await p2.goto('https://dofek.shop/cart',{waitUntil:'load',timeout:40000}); }catch(e){ console.log('clean nav err',String(e.message).split('\n')[0]); }
 await p2.waitForTimeout(6000);
 console.log('CLEAN FINAL', p2.url().slice(0,150));
 try{ console.log('CLEAN TEXT', (await p2.evaluate(()=>document.body.innerText.replace(/\s+/g,' ').slice(0,500)))); }catch(e){}
 try{ await p2.screenshot({path:'/home/user/SHOPIFY/variants/dofek/qa/2026-11-26/shots/14-cart-clean.png',timeout:25000}); }catch(e){}
 await b.close();
})();
