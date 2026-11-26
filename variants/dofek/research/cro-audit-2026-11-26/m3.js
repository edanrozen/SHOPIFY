const { chromium } = require('/home/user/SHOPIFY/node_modules/playwright');
const URL='https://dofek.shop/products/%D7%9E%D7%92%D7%9F-%D7%91%D7%A8%D7%9A-dofek-%D7%AA%D7%9E%D7%99%D7%9B%D7%94-%D7%95%D7%99%D7%A6%D7%99%D7%91%D7%95%D7%AA-%D7%91%D7%9B%D7%9C-%D7%A6%D7%A2%D7%93';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2,isMobile:true,hasTouch:true,
  userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',locale:'he-IL',timezoneId:'Asia/Jerusalem'});
 const p=await ctx.newPage();
 const t0=Date.now();
 await p.goto(URL,{waitUntil:'load',timeout:120000});
 const loadMs=Date.now()-t0;
 await p.waitForTimeout(6000);
 const d=await p.evaluate(()=>{
  const body=document.body.innerText;
  const words=['מכבי','קופת','כאב','רופא','מרפאה','בול','מדויק','להמר','גלגלת','חוגה','וסת','מאובטח','אשראי','ביט','תשלומים','פייפאל','PayPal','טלפון','שיחה','ייצור','סין','תוצרת','אחריות','כמה זמן','עד הבית','שליח','דואר','מידה שלי','איזו מידה','ממדים','גובה','משקל','ק"ג','היקף ברך','מידת'];
  return {
   videos: document.querySelectorAll('video,iframe[src*=youtube],iframe[src*=vimeo]').length,
   objection: words.map(w=>w+'='+(body.includes(w)?'YES':'no')),
   bodyText: body.replace(/\s+/g,' ').slice(0,200),
   faq: [...document.querySelectorAll('summary, .dp-faq__q, details')].map(e=>(e.innerText||'').trim().replace(/\s+/g,' ').slice(0,120)).slice(0,20),
   compare: (()=>{const h=[...document.querySelectorAll('h2')].find(x=>x.innerText.includes('מול שרוול')); return h? h.closest('section').innerText.replace(/\s+/g,' ').slice(0,700):null;})(),
   imgCount: document.querySelectorAll('img').length,
   headerText: (document.querySelector('header')||{innerText:''}).innerText.replace(/\s+/g,' ').slice(0,300),
   announce: (()=>{const e=document.querySelector('[class*=announcement]'); return e?e.innerText.replace(/\s+/g,' ').slice(0,200):null;})(),
   atcDisabled: (()=>{const e=document.querySelector('[data-dp-atc]'); return e? {disabled:e.disabled, text:e.innerText.trim()}:null;})(),
   checkedSize: [...document.querySelectorAll('[data-dp-pickers] input:checked')].map(i=>i.value),
   footer:(document.querySelector('footer')||{innerText:''}).innerText.replace(/\s+/g,' ').slice(0,600)
  };
 });
 console.log('load ms:',loadMs);
 console.log(JSON.stringify(d,null,1));
 await b.close();
})();
