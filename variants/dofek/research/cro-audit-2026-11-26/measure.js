const { chromium } = require('/home/user/SHOPIFY/node_modules/playwright');
const OUT = '/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/cro';

(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
  const ctx = await b.newContext({
    viewport:{width:393,height:852}, deviceScaleFactor:2, isMobile:true, hasTouch:true,
    userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    locale:'he-IL', timezoneId:'Asia/Jerusalem'
  });
  const p = await ctx.newPage();
  const url = process.argv[2] || 'https://dofek.shop/products/%D7%9E%D7%92%D7%9F-%D7%91%D7%A8%D7%9A-dofek';
  let resp;
  try { resp = await p.goto(url, {waitUntil:'domcontentloaded', timeout:90000}); } catch(e){ console.log('GOTO ERR', e.message); }
  console.log('URL:', p.url(), 'STATUS:', resp && resp.status());
  await p.waitForTimeout(8000);

  const r = await p.evaluate(() => {
    const vh = window.innerHeight;
    const doc = document.documentElement;
    const out = {vh, pageHeight: doc.scrollHeight, title: document.title, lang: doc.lang, dir: doc.dir};
    // above fold text
    const inFold = [];
    document.querySelectorAll('h1,h2,h3,p,li,span,button,a,label,legend,img').forEach(el=>{
      const rc = el.getBoundingClientRect();
      if (rc.top < vh && rc.bottom > 0 && rc.width>0 && rc.height>0) {
        const t = (el.innerText||el.getAttribute('alt')||'').trim().replace(/\s+/g,' ');
        if (t && t.length<140 && el.children.length===0) inFold.push(Math.round(rc.top)+'px ['+el.tagName+'] '+t);
        if (el.tagName==='IMG') inFold.push(Math.round(rc.top)+'px [IMG] '+(el.getAttribute('alt')||'(no alt)')+' | '+(el.currentSrc||'').slice(0,80));
      }
    });
    out.fold = [...new Set(inFold)];
    const pos = (sel)=>{const e=document.querySelector(sel); if(!e) return null; const rc=e.getBoundingClientRect(); return {y: Math.round(rc.top + window.scrollY), h: Math.round(rc.height), text:(e.innerText||'').trim().replace(/\s+/g,' ').slice(0,200)};};
    out.atc = pos('[data-dp-atc]') || pos('button[name=add]') || pos('form[action*="/cart/add"] button[type=submit]');
    out.price = pos('.dp__price') || pos('[data-dp-price]');
    out.h1 = pos('h1');
    out.kicker = pos('.dp__kicker');
    out.pickers = pos('[data-dp-pickers]');
    out.done = pos('[data-dp-done]');
    out.gallery = document.querySelectorAll('.dp__frame img').length;
    out.thumbs = document.querySelectorAll('.dp__thumb').length;
    // sticky / fixed elements
    out.sticky = [...document.querySelectorAll('*')].filter(e=>{
      const s = getComputedStyle(e); return (s.position==='fixed'||s.position==='sticky') && e.getBoundingClientRect().height>10;
    }).map(e=>e.tagName+'.'+(e.className&&e.className.toString().slice(0,60))+' pos='+getComputedStyle(e).position+' h='+Math.round(e.getBoundingClientRect().height));
    // size chart search
    const body = document.body.innerText;
    out.sizeWords = ['טבלת מידות','ס"מ','סמ','היקף','איך למדוד','מידות','size'].map(w=>w+'='+ (body.includes(w)?'YES':'no'));
    out.sizeHelpLink = !!document.querySelector('.dp__legend a');
    // price strings anywhere
    out.priceStrings = [...new Set((body.match(/[\d.,]+\s*₪|₪\s*[\d.,]+/g)||[]))].slice(0,30);
    // kaching widget
    out.kaching = [...document.querySelectorAll('[class*=kaching],[id*=kaching],[class*=Kaching]')].map(e=>e.tagName+'#'+e.id+'.'+String(e.className).slice(0,50)+' :: '+(e.innerText||'').trim().replace(/\s+/g,' ').slice(0,300)).slice(0,6);
    // loox
    out.looxExists = !!document.querySelector('#looxReviews,[class*=loox],.loox-rating');
    const lx = document.querySelector('#looxReviews');
    out.looxText = lx ? lx.innerText.trim().replace(/\s+/g,' ').slice(0,1200) : null;
    out.looxRating = (()=>{const e=document.querySelector('[class*=loox-rating],.loox-rating'); return e? e.innerText.trim().replace(/\s+/g,' ').slice(0,200):null;})();
    // headings order with y
    out.headings = [...document.querySelectorAll('h1,h2,h3')].map(e=>Math.round(e.getBoundingClientRect().top+window.scrollY)+'px '+e.tagName+': '+(e.innerText||'').trim().replace(/\s+/g,' ').slice(0,90));
    // trust signals
    out.trust = ['החזר','30 יום','משלוח חינם','מעקב','טלפון','וואטסאפ','WhatsApp','@gmail','צור קשר','מאובטח','SSL','ח.פ','עוסק'].map(w=>w+'='+(body.includes(w)?'YES':'no'));
    out.footerText = (document.querySelector('footer')||{innerText:''}).innerText.trim().replace(/\s+/g,' ').slice(0,800);
    out.bodyLen = body.length;
    return out;
  });
  console.log(JSON.stringify(r, null, 1));

  // screenshots: fold, and the buy area
  await p.screenshot({path: OUT+'/fold.png'});
  await p.evaluate(()=>window.scrollTo(0, 800)); await p.waitForTimeout(600);
  await p.screenshot({path: OUT+'/s800.png'});
  await p.evaluate(()=>window.scrollTo(0, 1600)); await p.waitForTimeout(600);
  await p.screenshot({path: OUT+'/s1600.png'});
  await p.evaluate(()=>window.scrollTo(0, 2400)); await p.waitForTimeout(600);
  await p.screenshot({path: OUT+'/s2400.png'});
  await b.close();
})();
