const { chromium, devices } = require('playwright');
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});const p=await c.newPage();
await p.goto(PDP,{waitUntil:'load',timeout:60000});await p.waitForTimeout(9000);
console.log(await p.evaluate(()=>Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s=>({id:s.id,cls:s.className,parent:s.parentElement.tagName+'.'+(s.parentElement.className||''),body:s.textContent.slice(0,600)}))));
// sticky appearance threshold
const vh=p.viewportSize().height;
for (const frac of [0,0.03,0.06,0.1,0.15,0.25,0.5]) {
  await p.evaluate(f=>scrollTo(0,document.body.scrollHeight*f),frac);
  await p.waitForTimeout(1200);
  const r=await p.evaluate(()=>{const e=Array.from(document.querySelectorAll('button')).find(x=>(x.innerText||'').trim()==='הוספה לסל'&&x.getBoundingClientRect().width<160);
    if(!e)return null;const rr=e.getBoundingClientRect();return {top:Math.round(rr.top),inView:rr.top>=0&&rr.bottom<=innerHeight, opacity:getComputedStyle(e.closest('[class],*')).opacity};});
  console.log('scroll',frac,'scrollY',await p.evaluate(()=>Math.round(scrollY)),'sticky',JSON.stringify(r));
}
await p.evaluate(()=>scrollTo(0,document.body.scrollHeight*0.5));await p.waitForTimeout(1500);
try{await p.screenshot({path:'/home/user/SHOPIFY/variants/dofek/qa/2026-11-26/shots/18-sticky-bar.png',timeout:25000});}catch(e){}
// click the sticky one
const st=p.locator('button:has-text("הוספה לסל")').nth(1);
await st.click().catch(e=>console.log('sticky click err',String(e.message).split('\n')[0]));
await p.waitForTimeout(4000);
console.log('cart after sticky click', JSON.stringify(await p.evaluate(()=>fetch('/cart.js',{headers:{Accept:'application/json'}}).then(r=>r.json()).then(j=>({n:j.item_count,total:j.total_price})))));
try{await p.screenshot({path:'/home/user/SHOPIFY/variants/dofek/qa/2026-11-26/shots/19-after-sticky-click.png',timeout:25000});}catch(e){}
await b.close();})();
