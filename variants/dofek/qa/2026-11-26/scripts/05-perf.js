const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
const PAGES={ home:'https://dofek.shop/', collection:'https://dofek.shop/collections/knee', pdp:PDP };
const WEBVITALS='https://cdnjs.cloudflare.com/ajax/libs/web-vitals/4.2.4/web-vitals.iife.js';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const result={};
 for (const [profile, dev, net] of [
   ['mobile', {...devices['iPhone 13']}, {downloadThroughput: 1.6*1024*1024/8, uploadThroughput: 750*1024/8, latency: 150}],
   ['desktop', {viewport:{width:1440,height:900},deviceScaleFactor:1}, null]]) {
  result[profile]={};
  for (const [name,url] of Object.entries(PAGES)) {
   const c=await b.newContext({...dev, locale:'he-IL'});
   const p=await c.newPage();
   const cdp=await c.newCDPSession(p);
   await cdp.send('Network.enable');
   if (profile==='mobile') {
     await cdp.send('Network.emulateNetworkConditions',{offline:false, ...net});
     await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
   }
   const res=[], cons=[], fails=[];
   p.on('console',m=>{ if(m.type()==='error'||m.type()==='warning') cons.push({type:m.type(),text:m.text().slice(0,260)}); });
   p.on('pageerror',e=>cons.push({type:'pageerror',text:String(e.message).slice(0,260)}));
   p.on('requestfailed',r=>fails.push({url:r.url().slice(0,180),type:r.resourceType(),err:r.failure()&&r.failure().errorText}));
   p.on('response',async r=>{ const rq=r.request(); let sz=0; try{ sz=Number((await r.headerValue('content-length'))||0);}catch(e){}
     res.push({url:r.url(), host:(()=>{try{return new URL(r.url()).host}catch(e){return '?'}})(), type:rq.resourceType(), status:r.status(), size:sz, fromSW:false}); });
   const t0=Date.now();
   let nav=null;
   for(let i=0;i<3&&!nav;i++){ try{ nav=await p.goto(url,{waitUntil:'load',timeout:90000}); }catch(e){ await p.waitForTimeout(2500); } }
   const loadMs=Date.now()-t0;
   await p.waitForTimeout(10000);
   // interact a bit to generate INP
   try{ await p.mouse.click(10,10); await p.waitForTimeout(500);}catch(e){}
   // scroll to trigger lazy content, then settle
   await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=800){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120)); } window.scrollTo(0,0); });
   await p.waitForTimeout(4000);
   const metrics = await p.evaluate(()=>{
     const nt=performance.getEntriesByType('navigation')[0]||{};
     const lcpList=performance.getEntriesByType('largest-contentful-paint');
     const lcp=lcpList.length?lcpList[lcpList.length-1]:null;
     const paints=Object.fromEntries(performance.getEntriesByType('paint').map(e=>[e.name,Math.round(e.startTime)]));
     const lt=performance.getEntriesByType('longtask')||[];
     const res=performance.getEntriesByType('resource');
     const byType={}; const byHost={};
     res.forEach(r=>{ const sz=r.transferSize||r.encodedBodySize||0; const t=r.initiatorType;
       byType[t]=(byType[t]||0)+sz;
       let h='?'; try{h=new URL(r.name).host}catch(e){}
       byHost[h]=(byHost[h]||0)+sz; });
     const totalBytes=res.reduce((a,r)=>a+(r.transferSize||r.encodedBodySize||0),0)+(nt.transferSize||0);
     // render-blocking
     const blocking = res.filter(r=>r.renderBlockingStatus==='blocking').map(r=>({u:r.name.slice(0,140), dur:Math.round(r.duration), sz:r.transferSize||0}));
     return { ttfb: Math.round(nt.responseStart||0), domContentLoaded: Math.round(nt.domContentLoadedEventEnd||0), loadEvent: Math.round(nt.loadEventEnd||0),
       transferDoc: nt.transferSize||0, fcp: paints['first-contentful-paint']||null,
       lcp: lcp?Math.round(lcp.startTime):null, lcpEl: lcp?(lcp.element?(lcp.element.tagName+' '+(lcp.element.currentSrc||lcp.element.src||'').slice(-90)):(lcp.url||'').slice(-90)):null, lcpSize: lcp?lcp.size:null,
       longTasks: lt.length, longTaskTotal: Math.round(lt.reduce((a,t)=>a+t.duration,0)), longTaskMax: Math.round(Math.max(0,...lt.map(t=>t.duration))),
       totalBytes, byType, byHost: Object.fromEntries(Object.entries(byHost).sort((a,b)=>b[1]-a[1]).slice(0,18)),
       requests: res.length, blocking, docHeight: document.body.scrollHeight, imgs: document.images.length,
       scripts: Array.from(document.scripts).filter(s=>s.src).map(s=>({src:s.src.slice(0,150), async:s.async, defer:s.defer})) };
   });
   // CLS + INP via web-vitals (injected)
   let cls=null, inp=null;
   try {
     await p.addScriptTag({url:WEBVITALS});
     await p.evaluate(()=>{ window.__v={}; webVitals.onCLS(m=>window.__v.cls=m.value,{reportAllChanges:true}); webVitals.onINP(m=>window.__v.inp=m.value,{reportAllChanges:true}); });
     await p.evaluate(async()=>{ for(let y=0;y<Math.min(document.body.scrollHeight,8000);y+=600){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,160));} });
     for (const sel of ['button','a']) { try{ const el=await p.$(sel); if(el){ await el.click({timeout:2000,force:true}); await p.waitForTimeout(400);} }catch(e){} }
     await p.waitForTimeout(2500);
     const v=await p.evaluate(()=>window.__v||{}); cls=v.cls??null; inp=v.inp??null;
   } catch(e){ metrics.webvitalsErr=String(e.message).split('\n')[0]; }
   metrics.cls=cls; metrics.inp=inp; metrics.wallClockLoadMs=loadMs; metrics.navStatus=nav?nav.status():null;
   metrics.consoleIssues=cons; metrics.requestFailed=fails;
   result[profile][name]=metrics;
   console.log('done', profile, name);
   await c.close();
  }
 }
 fs.writeFileSync(OUT+'/data/05-perf.json',JSON.stringify(result,null,2));
 await b.close();
})();
