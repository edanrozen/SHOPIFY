const { chromium } = require('/home/user/SHOPIFY/node_modules/playwright');
const OUT='/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/cro';
const URL='https://dofek.shop/products/%D7%9E%D7%92%D7%9F-%D7%91%D7%A8%D7%9A-dofek-%D7%AA%D7%9E%D7%99%D7%9B%D7%94-%D7%95%D7%99%D7%A6%D7%99%D7%91%D7%95%D7%AA-%D7%91%D7%9B%D7%9C-%D7%A6%D7%A2%D7%93';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2,isMobile:true,hasTouch:true,
  userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  locale:'he-IL',timezoneId:'Asia/Jerusalem'});
 const p=await ctx.newPage();
 const failed=[];
 p.on('requestfailed',r=>failed.push(r.url().slice(0,110)+' :: '+(r.failure()&&r.failure().errorText)));
 p.on('response',r=>{ if(r.status()>=400) failed.push('HTTP'+r.status()+' '+r.url().slice(0,110)); });
 await p.goto(URL,{waitUntil:'load',timeout:120000});
 await p.waitForTimeout(10000);
 const d=await p.evaluate(()=>{
  const o={};
  const abs=e=>{const r=e.getBoundingClientRect();return{y:Math.round(r.top+scrollY),h:Math.round(r.height)}};
  const txt=e=>(e.innerText||'').trim().replace(/\s+/g,' ');
  // ordered flow of the buy block
  const buy=document.querySelector('#dp-buy');
  o.buyBlock = buy? {...abs(buy), text: txt(buy).slice(0,1500)}:null;
  // kaching widget
  const k=document.querySelector('.kaching-bundles');
  o.kaching = k? {...abs(k), text: txt(k).slice(0,1200)}:null;
  // sticky dp-bar
  const bar=document.querySelector('[data-dp-bar], .dp-bar');
  o.bar = bar? {cls:bar.className, aria:bar.getAttribute('aria-hidden'), text:txt(bar), display:getComputedStyle(bar).display, transform:getComputedStyle(bar).transform, h:Math.round(bar.getBoundingClientRect().height), top:Math.round(bar.getBoundingClientRect().top)}:null;
  // perks, ship note
  ['.dp__perks','.dp__ship','.dp__lede','.dp__bullets','.dp__done','.dp__buyrow'].forEach(s=>{const e=document.querySelector(s); if(e) o[s]={...abs(e),text:txt(e).slice(0,400)};});
  // loox
  const lx=document.querySelector('#looxReviews');
  o.loox = lx? {...abs(lx), html:lx.innerHTML.slice(0,400), text:txt(lx).slice(0,500)}:null;
  o.looxSection = (()=>{const e=[...document.querySelectorAll('h2')].find(h=>txt(h).includes('מה אומרים')); if(!e)return null; const sec=e.closest('section'); return {...abs(sec), text:txt(sec).slice(0,800)};})();
  o.looxScripts=[...document.querySelectorAll('script[src*=loox]')].map(s=>s.src);
  // all variant availability / selected
  const sel=document.querySelector('[data-dp-select]');
  o.select = sel? {options:[...sel.options].map(x=>x.text.trim()+(x.disabled?' [DISABLED]':'')), value:sel.value}:null;
  o.scrollH=document.documentElement.scrollHeight;
  o.crossSell=(()=>{const e=[...document.querySelectorAll('h2')].find(h=>txt(h).includes('הולך טוב')); return e?{...abs(e.closest('section')||e), text:txt(e.closest('section')||e).slice(0,400)}:null;})();
  o.endBand=(()=>{const e=[...document.querySelectorAll('h2')].find(h=>txt(h).includes('זה הזמן')); return e?{...abs(e.closest('section')||e),text:txt(e.closest('section')||e).slice(0,400)}:null;})();
  return o;
 });
 console.log('=== FAILED/4xx ==='); console.log([...new Set(failed)].join('\n'));
 console.log('=== DATA ==='); console.log(JSON.stringify(d,null,1));
 // scroll to 2500 to trigger bar
 await p.evaluate(()=>scrollTo(0,3000)); await p.waitForTimeout(1200);
 const bar2=await p.evaluate(()=>{const b=document.querySelector('[data-dp-bar], .dp-bar'); if(!b)return null; const r=b.getBoundingClientRect(); return {cls:b.className,aria:b.getAttribute('aria-hidden'),text:(b.innerText||'').trim().replace(/\s+/g,' '),top:Math.round(r.top),h:Math.round(r.height),visible:r.top<852&&r.bottom>0};});
 console.log('=== BAR @3000 ==='); console.log(JSON.stringify(bar2,null,1));
 await p.screenshot({path:OUT+'/bar3000.png'});
 await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(800);
 await p.screenshot({path:OUT+'/fold2.png'});
 await p.evaluate(()=>scrollTo(0,950)); await p.waitForTimeout(800);
 await p.screenshot({path:OUT+'/price-area.png'});
 await p.evaluate(()=>scrollTo(0,1650)); await p.waitForTimeout(800);
 await p.screenshot({path:OUT+'/buy-area.png'});
 await p.evaluate(()=>scrollTo(0,9900)); await p.waitForTimeout(1500);
 await p.screenshot({path:OUT+'/reviews.png'});
 await b.close();
})();
