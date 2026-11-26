const { chromium } = require('/home/user/SHOPIFY/node_modules/playwright');
const URL='https://dofek.shop/products/%D7%9E%D7%92%D7%9F-%D7%91%D7%A8%D7%9A-dofek-%D7%AA%D7%9E%D7%99%D7%9B%D7%94-%D7%95%D7%99%D7%A6%D7%99%D7%91%D7%95%D7%AA-%D7%91%D7%9B%D7%9C-%D7%A6%D7%A2%D7%93';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:393,height:852},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',locale:'he-IL',timezoneId:'Asia/Jerusalem'});
 const p=await ctx.newPage(); await p.goto(URL,{waitUntil:'load',timeout:120000}); await p.waitForTimeout(5000);
 await p.evaluate(()=>scrollTo(0,9900)); await p.waitForTimeout(800);
 await (await p.$('.dp-bar button')).click(); await p.waitForTimeout(3000);
 const r=await p.evaluate(()=>{
  const out=[];
  document.querySelectorAll('header *').forEach(e=>{
   if(e.children.length===0 && (e.innerText||'').trim()==='1'){
     const s=getComputedStyle(e); const rc=e.getBoundingClientRect();
     out.push({cls:String(e.className).slice(0,60), fs:s.fontSize, color:s.color, bg:s.backgroundColor, w:Math.round(rc.width),h:Math.round(rc.height), top:Math.round(rc.top), left:Math.round(rc.left), vis:s.visibility, op:s.opacity, clip:s.clipPath||s.clip, pos:s.position});
   }});
  return out;
 });
 console.log(JSON.stringify(r,null,1));
 await b.close();
})();
