const { chromium } = require('playwright');
const fs = require('fs');
const DIR = __dirname;
const CSS = fs.readFileSync(DIR+'/theme.css','utf8'), RESET = fs.readFileSync(DIR+'/reset.css','utf8');
const PAGES = { home: fs.readFileSync(DIR+'/home.frag.html','utf8'), pdp: fs.readFileSync(DIR+'/pdp.frag.html','utf8') };
const LONG = 'כדורוש צעצוע חכם ואינטראקטיבי לחתולים';
const HYDRATE = (long) => {
  const PX='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  document.querySelectorAll('img').forEach(i=>{i.src=PX;if(!i.getAttribute('width'))i.setAttribute('width',800);if(!i.getAttribute('height'))i.setAttribute('height',800);});
  const SKIP=new Set(['SCRIPT','STYLE','IMG','SVG','PATH','INPUT','BR']);
  document.querySelectorAll('*').forEach(el=>{if(SKIP.has(el.tagName)||el.children.length||el.textContent.trim())return;el.textContent=long;});
  document.querySelectorAll('.pl-grid,.pl-rail,.pl-pdp__thumbs,ul,ol').forEach(l=>{const f=l.firstElementChild;if(!f)return;const n=l.children.length;if(n>=4)return;for(let i=n;i<8;i++)l.appendChild(f.cloneNode(true));});
};
const PROBE = () => {
  const pick = s => { const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect();
    return {w:Math.round(r.width),h:Math.round(r.height),left:Math.round(r.left),right:Math.round(r.right),fs:getComputedStyle(e).fontSize}; };
  return {
    vw: document.documentElement.clientWidth,
    card: pick('.pl-grid > *'), cardTitle: pick('.pl-card__title'),
    grid: pick('.pl-grid'), gridCols: (()=>{const g=document.querySelector('.pl-grid');return g?getComputedStyle(g).gridTemplateColumns:null;})(),
    pdpMedia: pick('.pl-pdp__media'), pdpStage: pick('.pl-pdp__stage'), pdpThumbs: pick('.pl-pdp__thumbs'),
    pdpTitle: pick('.pl-pdp__title'), pdpSubmit: pick('.pl-pdp__submit'),
    heroBtn: pick('.pl-btn--solid'), h1: pick('.pl-h1'),
    field: pick('.pl-field'), fieldBtn: pick('.pl-field__btn'),
  };
};
(async()=>{
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  for (const [name,frag] of Object.entries(PAGES)) {
    for (const w of [320,375,390,430]) {
      const p = await b.newPage({viewport:{width:w,height:850}});
      await p.setContent(`<!doctype html><html dir="rtl" lang="he"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${RESET}</style><style>${CSS}</style></head><body>${frag}</body></html>`,{waitUntil:'load'});
      await p.evaluate(HYDRATE, LONG); await p.waitForTimeout(80);
      const r = await p.evaluate(PROBE);
      console.log(`\n--- ${name} @ ${w} ---`);
      for (const [k,v] of Object.entries(r)) if (v && k!=='vw') console.log('  ', k.padEnd(11), JSON.stringify(v));
      await p.close();
    }
  }
  await b.close();
})();
