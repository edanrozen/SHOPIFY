const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
const AXE_SRC=fs.readFileSync('/tmp/qa/node_modules/axe-core/axe.min.js','utf8');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const all={};
 for (const [prof,dev] of [['mobile',{...devices['iPhone 13']}],['desktop',{viewport:{width:1440,height:900},deviceScaleFactor:1}]]) {
  all[prof]={};
  for (const [name,url] of Object.entries({home:'https://dofek.shop/', pdp:PDP, cart:'https://dofek.shop/cart', collection:'https://dofek.shop/collections/knee'})) {
   const c=await b.newContext({...dev,locale:'he-IL'}); const p=await c.newPage();
   let ok=false; for(let i=0;i<3&&!ok;i++){ try{ await p.goto(url,{waitUntil:'load',timeout:60000}); ok=true; }catch(e){ await p.waitForTimeout(2000); } }
   if(!ok){ all[prof][name]={error:'nav failed'}; await c.close(); continue; }
   await p.waitForTimeout(7000);
   await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=900){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,100));} window.scrollTo(0,0);});
   await p.waitForTimeout(2500);
   await p.addScriptTag({content:AXE_SRC});
   const r = await p.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}}));
   all[prof][name]={ violations: r.violations.map(v=>({id:v.id, impact:v.impact, help:v.help, tags:v.tags.filter(t=>/wcag/.test(t)), n:v.nodes.length,
       nodes: v.nodes.slice(0,6).map(n=>({ target:n.target, summary:(n.failureSummary||'').replace(/\s+/g,' ').slice(0,260), html:(n.html||'').slice(0,200) })) })),
     passes: r.passes.length, incomplete: r.incomplete.map(v=>({id:v.id,n:v.nodes.length})) };
   // explicit text size census (presbyopia relevance)
   all[prof][name].textSizes = await p.evaluate(()=>{
     const m={};
     document.querySelectorAll('p,span,div,li,a,button,label,td').forEach(e=>{
       if(!e.childNodes.length) return;
       const hasText=Array.from(e.childNodes).some(n=>n.nodeType===3&&n.textContent.trim().length>3);
       if(!hasText) return;
       const r=e.getBoundingClientRect(); if(r.width<1||r.height<1) return;
       const fs=parseFloat(getComputedStyle(e).fontSize); const k=Math.round(fs);
       m[k]=(m[k]||0)+1;
     });
     return Object.fromEntries(Object.entries(m).sort((a,b)=>a[0]-b[0]));
   });
   console.log(prof,name,'violations',all[prof][name].violations.length);
   await c.close();
  }
 }
 fs.writeFileSync(OUT+'/data/06-axe.json',JSON.stringify(all,null,2));
 await b.close();
})();
