const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});
 const p=await c.newPage();
 const out={};
 const nav=async(u)=>{for(let i=0;i<3;i++){try{return await p.goto(u,{waitUntil:'load',timeout:60000});}catch(e){await p.waitForTimeout(2500);} } return null;};
 await nav(PDP); await p.waitForTimeout(6000);
 await p.locator('.dp__atc').first().click().catch(()=>{}); await p.waitForTimeout(4000);

 out.contrast = await p.evaluate(()=>{
   const lum=c=>{const s=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*s[0]+0.7152*s[1]+0.0722*s[2];};
   const parse=s=>{const m=s.match(/rgba?\(([^)]+)\)/); if(!m) return null; const a=m[1].split(',').map(x=>parseFloat(x)); return {rgb:a.slice(0,3), a:a.length>3?a[3]:1};};
   const bgOf=el=>{ let e=el; while(e){ const b=parse(getComputedStyle(e).backgroundColor); if(b&&b.a>0.1) return b.rgb; e=e.parentElement;} return [255,255,255]; };
   const ratio=(f,b)=>{const L1=lum(f),L2=lum(b);return +(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))).toFixed(2);};
   const res=[];
   document.querySelectorAll('p,span,div,a,li,button,label,h1,h2,h3,h4,small,td').forEach(e=>{
     const direct=Array.from(e.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').trim();
     if(direct.length<3) return;
     const r=e.getBoundingClientRect(); if(r.width<2||r.height<2) return;
     const cs=getComputedStyle(e); const f=parse(cs.color); if(!f) return;
     const fs=parseFloat(cs.fontSize); const bold=parseInt(cs.fontWeight)>=700;
     const large = fs>=24 || (fs>=18.66 && bold);
     const cr=ratio(f.rgb,bgOf(e));
     const req = large?3:4.5;
     if(cr<req) res.push({text:direct.slice(0,70), fontSize:fs, bold, ratio:cr, required:req, color:cs.color, bg:'rgb('+bgOf(e).join(',')+')', docY:Math.round(r.top+scrollY), cls:(e.className||'').toString().slice(0,60)});
   });
   return res.sort((a,b)=>a.ratio-b.ratio);
 });

 // the add-to-cart confirmation notice
 out.atcNotice = await p.evaluate(()=>{
   const n=Array.from(document.querySelectorAll('*')).find(e=>/נוסף לסל/.test(e.innerText||'') && e.children.length<4);
   if(!n) return null; const r=n.getBoundingClientRect(); const cs=getComputedStyle(n);
   return {text:(n.innerText||'').trim(), fontSize:cs.fontSize, color:cs.color, bg:cs.backgroundColor, docY:Math.round(r.top+scrollY), h:Math.round(r.height), cls:(n.className||'').toString().slice(0,80)};
 });

 // keyboard: how many tabs to reach ATC
 await nav(PDP); await p.waitForTimeout(6000);
 await p.evaluate(()=>document.body.focus());
 const seq=[];
 for(let i=0;i<70;i++){
   await p.keyboard.press('Tab');
   const f=await p.evaluate(()=>{const a=document.activeElement; if(!a) return null; const cs=getComputedStyle(a); const r=a.getBoundingClientRect();
     return {tag:a.tagName, cls:(a.className||'').toString().slice(0,50), txt:(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,40), outline:cs.outlineWidth+' '+cs.outlineStyle, boxShadow:cs.boxShadow.slice(0,40), visible:r.width>0&&r.height>0};});
   seq.push(f);
   if(f && /dp__atc/.test(f.cls)) break;
 }
 out.tabToATC = {steps: seq.length, reached: !!(seq.length && seq[seq.length-1] && /dp__atc/.test(seq[seq.length-1].cls)), seq: seq};
 out.noFocusRing = seq.filter(f=>f && f.visible && f.outline.startsWith('0px') && (!f.boxShadow || f.boxShadow==='none')).length;

 // links on PDP + home
 out.links={};
 for (const [name,url] of Object.entries({pdp:PDP, home:'https://dofek.shop/'})) {
   await nav(url); await p.waitForTimeout(6000);
   await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=900){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);});
   const hrefs = await p.evaluate(()=>Array.from(new Set(Array.from(document.querySelectorAll('a[href]')).map(a=>a.href).filter(h=>/^https?:/.test(h)))));
   const results=[];
   for (const h of hrefs) {
     let st=null, err=null;
     try { const r=await p.request.get(h,{maxRedirects:5,timeout:25000}); st=r.status(); } catch(e){ err=String(e.message).split('\n')[0].slice(0,90); }
     results.push({href:h.slice(0,160), status:st, err});
   }
   out.links[name]=results;
   // dead buttons: no href, no onclick, no form
   out.links[name+'_buttons'] = await p.evaluate(()=>Array.from(document.querySelectorAll('button')).map(e=>{const r=e.getBoundingClientRect();
     return {txt:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,40), type:e.type, inForm:!!e.form, hasOnclick:!!e.onclick, cls:(e.className||'').toString().slice(0,50), vis:r.width>0&&r.height>0, disabled:e.disabled};}).filter(x=>x.vis));
 }
 fs.writeFileSync(OUT+'/data/07-contrast-keyboard-links.json',JSON.stringify(out,null,2));
 console.log('contrast fails:',out.contrast.length,'| tabToATC',out.tabToATC.steps, out.tabToATC.reached,'| noFocusRing',out.noFocusRing);
 console.log('atcNotice:',JSON.stringify(out.atcNotice,null,1));
 for(const k of Object.keys(out.links)) if(!/buttons/.test(k)) console.log(k,'links',out.links[k].length,'bad:',JSON.stringify(out.links[k].filter(x=>x.status===null||x.status>=400)));
 await b.close();
})();
