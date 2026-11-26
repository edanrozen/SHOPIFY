const { chromium, devices } = require('playwright');
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});const p=await c.newPage();
await p.goto(PDP,{waitUntil:'load',timeout:60000});await p.waitForTimeout(9000);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(s=>setTimeout(s,90));}scrollTo(0,0);});
await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{
  const out=[];
  const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let n; const seen=new Set();
  while(n=walk.nextNode()){
    const t=n.textContent.trim();
    const m=t.match(/^(\d+[\d.,]*)\s*₪$/);
    if(!m) continue;
    const e=n.parentElement; const rr=e.getBoundingClientRect(); if(rr.width<1) continue;
    const cs=getComputedStyle(e);
    out.push({price:m[1], docY:Math.round(rr.top+scrollY), fs:cs.fontSize, strike:cs.textDecorationLine.includes('line-through'), inKaching:!!e.closest('[class*=kaching]'), sticky:(()=>{let a=e;while(a){if(['fixed','sticky'].includes(getComputedStyle(a).position))return true;a=a.parentElement;}return false;})(), cls:(e.className||'').toString().slice(0,45)});
  }
  return out.sort((a,b)=>a.docY-b.docY);
});
r.forEach(x=>console.log(String(x.docY).padStart(6), x.price.padStart(8), 'fs='+x.fs, x.strike?'STRIKE':'      ', x.inKaching?'kaching':'theme  ', x.sticky?'STICKY':'      ', x.cls));
await b.close();})();
