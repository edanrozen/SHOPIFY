const { chromium, devices } = require('playwright');
const fs=require('fs');
const OUT='/home/user/SHOPIFY/variants/dofek/qa/2026-11-26';
const PDP='https://dofek.shop/products/'+encodeURIComponent('מגן-ברך-dofek-תמיכה-ויציבות-בכל-צעד');
(async()=>{
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
const c=await b.newContext({...devices['iPhone 13'],locale:'he-IL'});const p=await c.newPage();
const out={};
await p.goto(PDP,{waitUntil:'load',timeout:60000}); await p.waitForTimeout(8000);
out.jsonld = await p.evaluate(()=>Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s=>{try{const d=JSON.parse(s.textContent);return {type:d['@type']||(Array.isArray(d)?d.map(x=>x['@type']):null), keys:Object.keys(d).slice(0,12)};}catch(e){return {parseError:String(e.message).slice(0,60), head:s.textContent.slice(0,80)};}}));
out.biggestImages = await p.evaluate(()=>Array.from(document.images).map(i=>({src:(i.currentSrc||i.src).slice(-110), natural:i.naturalWidth+'x'+i.naturalHeight, display:Math.round(i.getBoundingClientRect().width)+'x'+Math.round(i.getBoundingClientRect().height), loading:i.loading, fetchpriority:i.getAttribute('fetchpriority'), oversizeRatio: i.getBoundingClientRect().width? +(i.naturalWidth/(i.getBoundingClientRect().width*3)).toFixed(2):null})).sort((a,b)=>(b.natural.split('x')[0]*1)-(a.natural.split('x')[0]*1)).slice(0,12));
// sticky ATC
out.stickyATC = await p.evaluate(()=>{
  const all=Array.from(document.querySelectorAll('button')).filter(e=>(e.innerText||'').trim()==='הוספה לסל');
  return all.map(e=>{const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); let anc=e, pos='static';
    while(anc){ const s=getComputedStyle(anc); if(s.position==='fixed'||s.position==='sticky'){pos=s.position;break;} anc=anc.parentElement; }
    return {w:Math.round(r.width),h:Math.round(r.height),docY:Math.round(r.top+scrollY), position:pos, fontSize:cs.fontSize, visibleNow:r.top>=0&&r.bottom<=innerHeight};});
});
// scroll to bottom: does a sticky bar appear?
await p.evaluate(()=>scrollTo(0,document.body.scrollHeight*0.6)); await p.waitForTimeout(2500);
out.stickyAtMidScroll = await p.evaluate(()=>Array.from(document.querySelectorAll('button')).filter(e=>(e.innerText||'').trim()==='הוספה לסל').map(e=>{const r=e.getBoundingClientRect();return{inViewport:r.top>=0&&r.bottom<=innerHeight, top:Math.round(r.top), w:Math.round(r.width)};}));
try{ await p.screenshot({path:OUT+'/shots/17-midscroll-sticky.png',timeout:25000}); }catch(e){}
// ATC notice precise measurement
await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(1200);
const atc=p.locator('.dp__atc').first();
await atc.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
const before=await p.evaluate(()=>window.scrollY);
await atc.click(); await p.waitForTimeout(3500);
out.noticeMeasure = await p.evaluate(()=>{
  const lum=c=>{const s=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*s[0]+0.7152*s[1]+0.0722*s[2];};
  const parse=s=>{const m=s.match(/rgba?\(([^)]+)\)/);if(!m)return null;const a=m[1].split(',').map(parseFloat);return a.slice(0,3);};
  const bgOf=el=>{let e=el;while(e){const s=getComputedStyle(e).backgroundColor;const m=s.match(/rgba?\(([^)]+)\)/);if(m){const a=m[1].split(',').map(parseFloat);if(a.length<4||a[3]>0.1)return a.slice(0,3);}e=e.parentElement;}return[255,255,255];};
  const cands=Array.from(document.querySelectorAll('*')).filter(e=>{const t=Array.from(e.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join('');return /נוסף לסל/.test(t);});
  return cands.map(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);const f=parse(cs.color),bg=bgOf(e);
    const L1=lum(f),L2=lum(bg);
    return {text:(e.innerText||'').trim().slice(0,60), fontSize:cs.fontSize, color:cs.color, bg:'rgb('+bg.join(',')+')',
      contrast:+(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))).toFixed(2), inViewport:r.top>=0&&r.bottom<=innerHeight, top:Math.round(r.top), h:Math.round(r.height),
      cls:(e.className||'').toString().slice(0,70)};});
});
out.scrollChangedOnAdd = (await p.evaluate(()=>window.scrollY)) - before;
out.headerBadge = await p.evaluate(()=>{
  const h=document.querySelector('header')||document.body;
  const b=Array.from(h.querySelectorAll('*')).filter(e=>/^\d+$/.test((e.innerText||'').trim()) && (e.className||'').toString().match(/count|bubble|badge/i));
  return b.map(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);
    return {txt:(e.innerText||'').trim(), cls:(e.className||'').toString().slice(0,60), w:Math.round(r.width),h:Math.round(r.height), fontSize:cs.fontSize, visible:r.width>0&&r.height>0, inViewport:r.top>=0&&r.bottom<=innerHeight};});
});
fs.writeFileSync(OUT+'/data/11-details.json',JSON.stringify(out,null,2));
console.log(JSON.stringify(out,null,2).slice(0,6000));
await b.close();})();
