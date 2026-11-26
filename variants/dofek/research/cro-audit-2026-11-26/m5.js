const { chromium } = require('/home/user/SHOPIFY/node_modules/playwright');
const URL='https://dofek.shop/products/%D7%9E%D7%92%D7%9F-%D7%91%D7%A8%D7%9A-dofek-%D7%AA%D7%9E%D7%99%D7%9B%D7%94-%D7%95%D7%99%D7%A6%D7%99%D7%91%D7%95%D7%AA-%D7%91%D7%9B%D7%9C-%D7%A6%D7%A2%D7%93';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',locale:'he-IL',timezoneId:'Asia/Jerusalem'});
 const p=await ctx.newPage(); await p.goto(URL,{waitUntil:'load',timeout:120000}); await p.waitForTimeout(5000);
 await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
 await p.waitForTimeout(1000);
 const d=await p.evaluate(()=>{
  const faq=[...document.querySelectorAll('details')].map(dt=>dt.innerText.replace(/\s+/g,' ').trim()).filter(t=>t);
  const body=document.body.innerText;
  const grab=(re)=>{const m=body.match(re); return m?m[0].replace(/\s+/g,' '):null;};
  return {faq, medical: grab(/.{0,160}תחליף לאבחון.{0,160}/), returnShip: grab(/.{0,200}משלוח ההחזרה.{0,200}/), replace: grab(/.{0,160}ונחליף.{0,160}/), docWord: body.includes('רופא')};
 });
 console.log(JSON.stringify(d,null,1));
 await b.close();
})();
