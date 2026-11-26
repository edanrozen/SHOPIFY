const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});
 const p=await c.newPage();
 const out={};
 const nav=async(u)=>{ let why=''; for(let i=0;i<12;i++){ try{ const r=await p.goto(u,{waitUntil:'load',timeout:60000});
     const st=r?r.status():null;
     const ok=await p.evaluate(()=>({cls:String(document.body.className||''), a:document.querySelectorAll('a[href]').length}));
     why='status='+st+' cls='+ok.cls+' anchors='+ok.a;
     if(st===200 && !ok.cls.includes('neterror') && ok.a>3) return true; }catch(e){ why='exc:'+String(e.message).split('\n')[0]; }
     console.log('  nav attempt',i,why); await p.waitForTimeout(8000); } throw new Error('nav failed '+u+' :: '+why); };

 try{ await p.goto('https://dofek.shop/',{waitUntil:'domcontentloaded',timeout:45000}); }catch(e){ console.log('warmup',String(e.message).split('\n')[0]); }
 await p.waitForTimeout(2000);
 await nav(PDP); await p.waitForTimeout(6000);
 const seq=[]; let reached=false;
 for(let i=0;i<120;i++){
   await p.keyboard.press('Tab');
   const f=await p.evaluate(()=>{const a=document.activeElement; if(!a||a===document.body) return {tag:'BODY'};
     const cs=getComputedStyle(a); const r=a.getBoundingClientRect();
     return {tag:a.tagName, cls:(a.className||'').toString().slice(0,45), txt:(a.innerText||a.getAttribute('aria-label')||a.getAttribute('title')||'').trim().replace(/\s+/g,' ').slice(0,38),
       outline:cs.outlineWidth+'/'+cs.outlineStyle, ring:(cs.boxShadow||'none').slice(0,30), w:Math.round(r.width),h:Math.round(r.height), inView:r.top>=-5&&r.bottom<=innerHeight+5};});
   seq.push(f);
   if(/dp__atc/.test(f.cls||'')){ reached=true; break; }
 }
 out.tabToATC={steps:seq.length, reached, seq};
 out.noFocusIndicator = seq.filter(f=>f.tag!=='BODY' && f.outline.startsWith('0px') && f.ring==='none').map(f=>f.txt||f.cls);

 out.links={};
 for (const [name,url] of Object.entries({pdp:PDP, home:'https://dofek.shop/'})) {
   await nav(url); await p.waitForTimeout(6000);
   await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=900){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);});
   await p.waitForTimeout(2000);
   const anchors = await p.evaluate(()=>{ const m=new Map();
     document.querySelectorAll('a').forEach(a=>{ const h=a.getAttribute('href'); const r=a.getBoundingClientRect();
       const key=h===null?'__NOHREF__'+((a.innerText||'').trim().slice(0,30)):a.href;
       if(!m.has(key)) m.set(key,{href:h, abs:h===null?null:a.href, txt:(a.innerText||a.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,50), w:Math.round(r.width),h:Math.round(r.height)}); });
     return Array.from(m.values()); });
   const results=[];
   for (const a of anchors) {
     if (!a.abs || !/^https?:/.test(a.abs)) { results.push({...a, status:'NO-HREF-OR-NON-HTTP'}); continue; }
     let st=null,err=null;
     for(let i=0;i<3&&st===null;i++){ try{ const r=await p.request.get(a.abs,{maxRedirects:5,timeout:25000}); st=r.status(); }catch(e){ err=String(e.message).split('\n')[0].slice(0,80); await new Promise(s=>setTimeout(s,1200)); } }
     results.push({...a, status:st, err:st===null?err:null});
   }
   out.links[name]=results;
   out.links[name+'_buttons']=await p.evaluate(()=>Array.from(document.querySelectorAll('button')).map(e=>{const r=e.getBoundingClientRect();
     return {txt:(e.innerText||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40), type:e.type, inForm:!!e.form, cls:(e.className||'').toString().slice(0,45), w:Math.round(r.width),h:Math.round(r.height), disabled:e.disabled};}).filter(x=>x.w>0));
 }
 fs.writeFileSync(OUT+'/data/08-keyboard-links.json',JSON.stringify(out,null,2));
 console.log('tabToATC steps',out.tabToATC.steps,'reached',out.tabToATC.reached);
 console.log('no focus indicator:',out.noFocusIndicator.length, out.noFocusIndicator.slice(0,10));
 for(const k of ['pdp','home']){ const L=out.links[k]; console.log(k,'anchors',L.length,'| bad:'); L.filter(x=>x.status===null||x.status==='NO-HREF-OR-NON-HTTP'||(typeof x.status==='number'&&x.status>=400)).forEach(x=>console.log('   ',x.status,x.href,'|',x.txt, x.err||'')); }
 await b.close();
})();
