const { chromium } = require('playwright');
const fs = require('fs'); const DIR = __dirname;
const RESET = fs.readFileSync(DIR+'/reset.css','utf8');
const PAGES = { home: fs.readFileSync(DIR+'/home.frag.html','utf8'), pdp: fs.readFileSync(DIR+'/pdp.frag.html','utf8') };
const LONG='כדורוש צעצוע חכם ואינטראקטיבי לחתולים';
const HYDRATE=(long)=>{const PX='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
 document.querySelectorAll('img').forEach(i=>{i.src=PX;if(!i.getAttribute('width'))i.setAttribute('width',800);if(!i.getAttribute('height'))i.setAttribute('height',800);});
 const S=new Set(['SCRIPT','STYLE','IMG','SVG','PATH','INPUT','BR']);
 document.querySelectorAll('*').forEach(e=>{if(S.has(e.tagName)||e.children.length||e.textContent.trim())return;e.textContent=long;});
 document.querySelectorAll('.pl-grid,.pl-rail,.pl-pdp__thumbs,ul,ol').forEach(l=>{const f=l.firstElementChild;if(!f)return;const n=l.children.length;if(n>=4)return;for(let i=n;i<8;i++)l.appendChild(f.cloneNode(true));});};
const SNAP=()=>{const o={};document.querySelectorAll('body *').forEach((el,i)=>{const r=el.getBoundingClientRect();
 const k=i+':'+el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\s+/).join('.'):'');
 o[k]=[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)];});return o;};
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
 let diffs=0;
 for (const [name,frag] of Object.entries(PAGES)) for (const w of [900,1024,1280,1440]) {
   const snaps={};
   for (const tag of ['old','new']) {
     const CSS=fs.readFileSync(DIR+`/theme.${tag}.css`,'utf8');
     const p=await b.newPage({viewport:{width:w,height:900}});
     await p.setContent(`<!doctype html><html dir="rtl" lang="he"><head><style>${RESET}</style><style>${CSS}</style></head><body>${frag}</body></html>`,{waitUntil:'load'});
     await p.evaluate(HYDRATE,LONG); await p.waitForTimeout(80);
     snaps[tag]=await p.evaluate(SNAP); await p.close();
   }
   const keys=new Set([...Object.keys(snaps.old),...Object.keys(snaps.new)]);
   const changed=[...keys].filter(k=>JSON.stringify(snaps.old[k])!==JSON.stringify(snaps.new[k]));
   console.log(`${name} @ ${w}px : ${changed.length===0?'IDENTICAL':changed.length+' boxes differ'}`);
   changed.slice(0,6).forEach(k=>console.log('   ',k.slice(0,90),'old',JSON.stringify(snaps.old[k]),'new',JSON.stringify(snaps.new[k])));
   diffs+=changed.length;
 }
 await b.close();
 console.log('\n=== desktop total differences: '+diffs+' ===');
})();
