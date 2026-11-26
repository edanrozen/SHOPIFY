const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const c=await b.newContext({...devices['iPhone 13'], locale:'he-IL', timezoneId:'Asia/Jerusalem'});
 const p=await c.newPage();
 const log=[], cons=[], netfail=[], bad=[];
 p.on('console',m=>cons.push({type:m.type(),text:m.text().slice(0,300)}));
 p.on('pageerror',e=>cons.push({type:'pageerror',text:String(e.message).slice(0,300)}));
 p.on('requestfailed',r=>netfail.push({url:r.url().slice(0,200),err:r.failure()&&r.failure().errorText}));
 p.on('response',r=>{if(r.status()>=400) bad.push({url:r.url().slice(0,200),status:r.status()});});
 const nav=async(url,opts)=>{ let last; for(let i=0;i<4;i++){ try{ return await p.goto(url,opts); }catch(e){ last=e; log.push({ev:'nav retry',url,i,e:String(e.message).split('\n')[0]}); await p.waitForTimeout(3000);} } log.push({ev:'nav FAILED',url,e:String(last&&last.message).split('\n')[0]}); return null; };
 const shot=async(n,f)=>{try{await p.screenshot({path:OUT+'/shots/'+n,fullPage:!!f,timeout:30000,animations:'disabled'});}catch(e){log.push({ev:'shotfail',n,e:String(e.message).split('\n')[0]});}};

 await nav(PDP,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(5000);
 await p.locator('.dp__atc').first().click(); await p.waitForTimeout(4000);

 // --- /cart ---
 let t=Date.now();
 const r1=await nav('https://dofek.shop/cart',{waitUntil:'load',timeout:60000});
 log.push({ev:'/cart', status:r1&&r1.status(), ms:Date.now()-t, url:p.url()});
 await p.waitForTimeout(4000);
 await shot('10-cart.png');
 const cartPage=await p.evaluate(()=>{
   const vis=el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden';};
   return { h:document.body.scrollHeight, text:document.body.innerText.replace(/\n{2,}/g,'\n').slice(0,1500),
     buttons: Array.from(document.querySelectorAll('button,input[type=submit],a')).filter(vis).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,n:e.getAttribute('name'),t:(e.innerText||e.value||'').trim().slice(0,50),href:e.getAttribute('href'),w:Math.round(r.width),h:Math.round(r.height),y:Math.round(r.top+scrollY)};}).filter(x=>x.t||x.n),
     wallets: Array.from(document.querySelectorAll('[class*=dynamic-checkout],[class*=additional-checkout],shopify-accelerated-checkout,[class*=wallet]')).map(e=>({cls:e.className.toString().slice(0,80), txt:(e.innerText||'').trim().slice(0,120), vis:vis(e)})) };
 });
 log.push({ev:'cart page', h:cartPage.h, buttons:cartPage.buttons, wallets:cartPage.wallets});
 fs.writeFileSync(OUT+'/data/cart-text.txt', cartPage.text);

 // --- checkout (navigate only, NEVER type payment data) ---
 t=Date.now();
 let r2=null;
 r2=await nav('https://dofek.shop/checkout',{waitUntil:'domcontentloaded',timeout:90000});
 log.push({ev:'/checkout', status:r2?r2.status():null, ms:Date.now()-t, url:p.url()});
 await p.waitForTimeout(9000);
 await shot('11-checkout-top.png');
 const h=await p.evaluate(()=>document.body.scrollHeight);
 const vh=p.viewportSize().height;
 for(let i=0,y=0;y<h&&i<10;i++,y+=vh){ await p.evaluate(yy=>scrollTo(0,yy),y); await p.waitForTimeout(900); await shot(`12-checkout-scroll-${String(i).padStart(2,'0')}.png`); }
 const co=await p.evaluate(()=>{
   const vis=el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden';};
   return { url:location.href, h:document.body.scrollHeight, title:document.title,
     text:document.body.innerText.replace(/\n{2,}/g,'\n').slice(0,4000),
     fields: Array.from(document.querySelectorAll('input,select')).filter(vis).map(e=>({name:e.name,type:e.type,ph:e.placeholder,label:e.getAttribute('aria-label'),req:e.required,autoc:e.getAttribute('autocomplete')})),
     payRadios: Array.from(document.querySelectorAll('[class*=payment] label, [data-testid*=payment], [class*=Payment] label')).filter(vis).map(e=>(e.innerText||'').replace(/\s+/g,' ').trim().slice(0,100)).filter(Boolean),
     walletBtns: Array.from(document.querySelectorAll('[class*=wallet],[class*=accelerated],[id*=paypal],[class*=paypal],[class*=apple-pay],[class*=google-pay],iframe[title*=PayPal],iframe[name*=paypal]')).filter(vis).map(e=>({cls:(e.className||'').toString().slice(0,90), tag:e.tagName, txt:(e.innerText||'').trim().slice(0,80)})),
     iframes: Array.from(document.querySelectorAll('iframe')).map(f=>({src:(f.src||'').slice(0,160), title:f.title, vis:vis(f)})) };
 });
 log.push({ev:'checkout content', url:co.url, title:co.title, h:co.h, fields:co.fields, payRadios:co.payRadios, walletBtns:co.walletBtns, iframes:co.iframes});
 fs.writeFileSync(OUT+'/data/checkout-text.txt', co.text);
 fs.writeFileSync(OUT+'/data/03-cart-checkout.json', JSON.stringify({log,cons,netfail,bad},null,2));
 console.log(JSON.stringify({log, cons:cons.slice(0,25), netfail_n:netfail.length, bad},null,2).slice(0,9000));
 await b.close();
})();
