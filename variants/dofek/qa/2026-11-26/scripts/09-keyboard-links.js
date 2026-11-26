const { chromium, devices } = require('playwright');
const fs = require('fs');
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
(async()=>{
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});const p=await c.newPage();
const out={};
const r=await p.goto(PDP,{waitUntil:'load',timeout:60000});
console.log('status',r.status(),'anchors',await p.evaluate(()=>document.querySelectorAll('a[href]').length));
await p.waitForTimeout(7000);
// ---- keyboard
const seq=[]; let reached=false;
for(let i=0;i<120;i++){
  await p.keyboard.press('Tab');
  const f=await p.evaluate(()=>{const a=document.activeElement; if(!a||a===document.body) return {tag:'BODY',cls:'',txt:'',outline:'',ring:''};
    const cs=getComputedStyle(a); const rr=a.getBoundingClientRect();
    return {tag:a.tagName, cls:(a.className||'').toString().slice(0,45), txt:(a.innerText||a.getAttribute('aria-label')||a.getAttribute('title')||'').trim().replace(/\s+/g,' ').slice(0,38),
      outline:cs.outlineWidth+'/'+cs.outlineStyle, ring:(cs.boxShadow||'none').slice(0,30), w:Math.round(rr.width),h:Math.round(rr.height)};});
  seq.push(f); if(/dp__atc/.test(f.cls)){reached=true;break;}
}
out.tabToATC={steps:seq.length,reached,seq};
out.noFocusIndicator=seq.filter(f=>f.tag!=='BODY'&&f.outline.startsWith('0px')&&f.ring==='none').map(f=>f.txt||f.cls);
console.log('tabToATC',seq.length,reached,'| noFocusIndicator',out.noFocusIndicator.length);
// ---- links on PDP
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=900){scrollTo(0,y);await new Promise(s=>setTimeout(s,80));}scrollTo(0,0);});
await p.waitForTimeout(2500);
const collect=async()=>p.evaluate(()=>{const m=new Map();
  document.querySelectorAll('a').forEach(a=>{const h=a.getAttribute('href');const rr=a.getBoundingClientRect();
    const k=h===null?'__NOHREF__'+((a.innerText||'').trim().slice(0,25)):a.href;
    if(!m.has(k))m.set(k,{href:h,abs:h===null?null:a.href,txt:(a.innerText||a.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,45),w:Math.round(rr.width),h:Math.round(rr.height)});});
  return Array.from(m.values());});
const btns=async()=>p.evaluate(()=>Array.from(document.querySelectorAll('button')).map(e=>{const rr=e.getBoundingClientRect();
  return {txt:(e.innerText||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40),type:e.type,inForm:!!e.form,cls:(e.className||'').toString().slice(0,45),w:Math.round(rr.width),h:Math.round(rr.height),disabled:e.disabled};}).filter(x=>x.w>0));
out.pdpAnchors=await collect(); out.pdpButtons=await btns();
await p.goto('https://dofek.shop/',{waitUntil:'load',timeout:60000});
await p.waitForTimeout(6000);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=900){scrollTo(0,y);await new Promise(s=>setTimeout(s,80));}scrollTo(0,0);});
await p.waitForTimeout(2000);
out.homeAnchors=await collect(); out.homeButtons=await btns();
// status check, serial with pacing
const seen=new Map();
const urls=[...new Set([...out.pdpAnchors,...out.homeAnchors].filter(a=>a.abs&&/^https?:/.test(a.abs)).map(a=>a.abs))];
console.log('unique http links:',urls.length);
for(const u of urls){ let st=null,err=null;
  for(let i=0;i<4&&st===null;i++){ try{const rr=await p.request.get(u,{maxRedirects:5,timeout:30000}); st=rr.status();}catch(e){err=String(e.message).split('\n')[0].slice(0,70); await new Promise(s=>setTimeout(s,2500));} }
  seen.set(u,{status:st,err}); if(st===null||st>=400) console.log('  BAD',st,err||'',u.slice(0,120));
  await new Promise(s=>setTimeout(s,250));
}
out.linkStatus=Object.fromEntries(seen);
out.noHref=[...out.pdpAnchors,...out.homeAnchors].filter(a=>a.href===null||a.href===''||a.href==='#');
fs.writeFileSync(OUT+'/data/09-keyboard-links.json',JSON.stringify(out,null,2));
console.log('anchors without usable href:',out.noHref.length, JSON.stringify(out.noHref.slice(0,10)));
await b.close();})();
