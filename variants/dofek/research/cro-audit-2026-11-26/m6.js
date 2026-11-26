const { chromium } = require('/home/user/SHOPIFY/node_modules/playwright');
const OUT='/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/cro';
const URL='https://dofek.shop/products/%D7%9E%D7%92%D7%9F-%D7%91%D7%A8%D7%9A-dofek-%D7%AA%D7%9E%D7%99%D7%9B%D7%94-%D7%95%D7%99%D7%A6%D7%99%D7%91%D7%95%D7%AA-%D7%91%D7%9B%D7%9C-%D7%A6%D7%A2%D7%93';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',locale:'he-IL',timezoneId:'Asia/Jerusalem'});
 const p=await ctx.newPage(); await p.goto(URL,{waitUntil:'load',timeout:120000}); await p.waitForTimeout(6000);
 const before=await p.evaluate(()=>({header:(document.querySelector('header')||{innerText:''}).innerText.replace(/\s+/g,' '), url:location.href}));
 await p.evaluate(()=>scrollTo(0,9900)); await p.waitForTimeout(1200);
 const barBtn = await p.$('.dp-bar button, .dp-bar a');
 console.log('bar button found:', !!barBtn, barBtn? await barBtn.innerText():'');
 if(barBtn){ await barBtn.click(); }
 await p.waitForTimeout(3500);
 const after=await p.evaluate(()=>{
   const done=document.querySelector('[data-dp-done]');
   const r=done?done.getBoundingClientRect():null;
   return {url:location.href, scrollY:Math.round(scrollY),
     header:(document.querySelector('header')||{innerText:''}).innerText.replace(/\s+/g,' '),
     doneVisible: r? (r.top<innerHeight && r.bottom>0 && r.height>0):null,
     doneY: r? Math.round(r.top+scrollY):null,
     doneText: done? done.innerText.replace(/\s+/g,' '):null,
     drawerOpen: !!document.querySelector('cart-drawer[open], .drawer.is-open, [class*=cart-drawer].active'),
     barText: (document.querySelector('.dp-bar')||{innerText:''}).innerText.replace(/\s+/g,' '),
     anyToast: [...document.querySelectorAll('[class*=toast],[class*=notification],[role=status],[aria-live]')].map(e=>e.innerText.replace(/\s+/g,' ').trim()).filter(t=>t).slice(0,5)
   };});
 console.log(JSON.stringify({before,after},null,1));
 await p.screenshot({path:OUT+'/after-sticky-atc.png'});
 const cart=await p.evaluate(async()=>{const r=await fetch('/cart.js'); const j=await r.json(); return {count:j.item_count, total:j.total_price, items:j.items.map(i=>i.title+' x'+i.quantity+' @'+i.final_price)};});
 console.log('CART:',JSON.stringify(cart,null,1));
 await b.close();
})();
