const { chromium } = require('playwright');
const O='/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ccbf/out';
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  for (const name of ['home','pdp']){
    const p=await b.newPage({viewport:{width:390,height:900}});
    await p.goto('file://'+O+'/'+name+'.html');
    const rows=await p.$$eval('body > section, body > div > section', els=>els.map(e=>({
      cls:e.className.split(' ').filter(c=>c.startsWith('wf-')).slice(0,2).join(' '),
      bg:getComputedStyle(e).backgroundColor
    })));
    console.log('=== '+name);
    rows.forEach((r,i)=>console.log(String(i+1).padStart(2),r.bg.padEnd(22),r.cls));
    await p.close();
  }
  await b.close();
})();
