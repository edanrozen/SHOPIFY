const { chromium } = require('playwright');
const O='/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ccbf/out';
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  for (const [name,w,h] of [['home',390,1400],['pdp',390,1400]]){
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2,isMobile:true,hasTouch:true});
    await p.goto('file://'+O+'/'+name+'.html');
    await p.waitForTimeout(400);
    // report every button's computed colours and size
    const btns=await p.$$eval('.wf-btn, .wf-intent, button, a.button', els=>els.slice(0,14).map(e=>{
      const c=getComputedStyle(e), r=e.getBoundingClientRect();
      return {t:(e.textContent||'').trim().slice(0,22), bg:c.backgroundColor, fg:c.color, bd:c.borderColor, w:Math.round(r.width), h:Math.round(r.height)};
    }));
    console.log('--- '+name+' ---');
    btns.forEach(x=>console.log(JSON.stringify(x)));
    await p.screenshot({path:O+'/'+name+'-390.png', fullPage:false});
    await p.close();
  }
  await b.close();
})();
