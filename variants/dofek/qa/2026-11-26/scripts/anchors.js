const { chromium, devices } = require('playwright');
const fs=require('fs');
const url=process.argv[2], outf=process.argv[3];
(async()=>{
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});const p=await c.newPage();
await p.goto(url,{waitUntil:'load',timeout:60000});
await p.waitForTimeout(7000);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=900){scrollTo(0,y);await new Promise(s=>setTimeout(s,90));}scrollTo(0,0);});
await p.waitForTimeout(2500);
const d=await p.evaluate(()=>{
 const m=new Map();
 document.querySelectorAll('a').forEach(a=>{const h=a.getAttribute('href');const r=a.getBoundingClientRect();
   const k=h===null?'__NOHREF__'+((a.innerText||'').trim().slice(0,25)):a.href;
   if(!m.has(k))m.set(k,{href:h,abs:h===null?null:a.href,txt:(a.innerText||a.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,45),w:Math.round(r.width),h:Math.round(r.height)});});
 const buttons=Array.from(document.querySelectorAll('button')).map(e=>{const r=e.getBoundingClientRect();
   return {txt:(e.innerText||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40),type:e.type,inForm:!!e.form,cls:(e.className||'').toString().slice(0,45),w:Math.round(r.width),h:Math.round(r.height),disabled:e.disabled};}).filter(x=>x.w>0);
 return {anchors:Array.from(m.values()), buttons};
});
fs.writeFileSync(outf,JSON.stringify(d,null,2));
console.log(url,'anchors',d.anchors.length,'buttons',d.buttons.length);
await b.close();})();
