const fs = require('fs');

/* ---------- shared helpers ---------- */
const P = (n, f) => Array.from({length: n}, (_, i) => f(i, i / (n - 1))).join('');
const pt = (cx, cy, rx, ry, a) => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
const f2 = n => n.toFixed(2);

const shell = (id, svg) => `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1600px;height:1600px;overflow:hidden}
  body{display:flex;align-items:center;justify-content:center;
       background:radial-gradient(120% 100% at 50% 8%, #FCFAF6 0%, #F4EFE7 52%, #E9E2D6 100%);}
  .stage{width:1600px;height:1600px;position:relative}
  svg{position:absolute;inset:0;width:100%;height:100%}
  .grain{position:absolute;inset:0;opacity:.045;mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>")}
</style></head><body><div class="stage">${svg}<div class="grain"></div></div></body></html>`;

const defsCommon = `
<radialGradient id="floor" cx="50%" cy="50%" r="50%">
  <stop offset="0%" stop-color="#8a7c68" stop-opacity=".34"/>
  <stop offset="55%" stop-color="#8a7c68" stop-opacity=".14"/>
  <stop offset="100%" stop-color="#8a7c68" stop-opacity="0"/>
</radialGradient>
<filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
  <feGaussianBlur stdDeviation="26"/>
</filter>
<filter id="soft2" x="-30%" y="-30%" width="160%" height="160%">
  <feGaussianBlur stdDeviation="9"/>
</filter>`;

/* =====================================================================
   1. HONEYCOMB PAPER CAT NEST
   ===================================================================== */
function nest() {
  const CX = 800, CY = 830;
  // ring: pleats between an inner ellipse and an outer ellipse
  const ring = (rxIn, ryIn, rxOut, ryOut, n, base) => P(n, (i) => {
    const a = (i / n) * Math.PI * 2;
    const [x1, y1] = pt(CX, CY, rxIn, ryIn, a);
    const [x2, y2] = pt(CX, CY, rxOut, ryOut, a);
    const lit = 0.5 + 0.5 * Math.cos(a + 2.5);           // light from upper-left
    const o = (0.10 + 0.34 * (1 - lit)).toFixed(3);
    return `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="#5C4426" stroke-opacity="${o}" stroke-width="2.4"/>`;
  });

  return shell('nest', `<svg viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
  <defs>${defsCommon}
    <linearGradient id="kraftA" x1="12%" y1="0%" x2="88%" y2="100%">
      <stop offset="0%"  stop-color="#D8BC93"/>
      <stop offset="42%" stop-color="#C6A277"/>
      <stop offset="100%" stop-color="#9E7B51"/>
    </linearGradient>
    <linearGradient id="kraftB" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%"  stop-color="#CBAA80"/>
      <stop offset="100%" stop-color="#8F6F49"/>
    </linearGradient>
    <radialGradient id="bowl" cx="50%" cy="38%" r="62%">
      <stop offset="0%"  stop-color="#8A6A45"/>
      <stop offset="70%" stop-color="#B08E63"/>
      <stop offset="100%" stop-color="#C7A97F"/>
    </radialGradient>
    <linearGradient id="ballG" x1="20%" y1="10%" x2="80%" y2="95%">
      <stop offset="0%" stop-color="#FF8E7A"/>
      <stop offset="45%" stop-color="#EF4F3C"/>
      <stop offset="100%" stop-color="#F7F2EE"/>
    </linearGradient>
  </defs>

  <ellipse cx="800" cy="1258" rx="600" ry="104" fill="url(#floor)" filter="url(#soft)"/>

  <!-- outer torus body -->
  <ellipse cx="${CX}" cy="${CY}" rx="600" ry="392" fill="url(#kraftB)"/>
  <ellipse cx="${CX}" cy="${CY - 96}" rx="600" ry="392" fill="url(#kraftA)"/>
  <!-- bowl cavity -->
  <ellipse cx="${CX}" cy="${CY - 112}" rx="356" ry="222" fill="url(#bowl)"/>
  <!-- pleats: outer wall -->
  ${ring(356, 222, 600, 392, 176)}
  <!-- pleats: bowl wall -->
  ${ring(150, 86, 356, 222, 128)}
  <!-- cushion floor -->
  <ellipse cx="${CX}" cy="${CY - 112}" rx="150" ry="86" fill="#A9885D"/>
  <ellipse cx="${CX}" cy="${CY - 112}" rx="150" ry="86" fill="url(#kraftA)" opacity=".45"/>

  <!-- toy ball -->
  <ellipse cx="${CX + 8}" cy="${CY - 92}" rx="86" ry="27" fill="#4A3823" opacity=".3" filter="url(#soft2)"/>
  <circle cx="${CX}" cy="${CY - 146}" r="82" fill="url(#ballG)"/>
  ${P(7, (i) => {
    const a = (i / 7) * Math.PI * 2 + 0.4;
    const [x, y] = pt(CX, CY - 146, 47, 47, a);
    return `<ellipse cx="${f2(x)}" cy="${f2(y)}" rx="16" ry="12" fill="#B8322A" opacity=".5" transform="rotate(${(i * 37) % 60} ${f2(x)} ${f2(y)})"/>`;
  })}
  <ellipse cx="${CX - 28}" cy="${CY - 176}" rx="28" ry="17" fill="#FFFFFF" opacity=".5" transform="rotate(-25 ${CX - 28} ${CY - 176})"/>

</svg>`);
}

/* =====================================================================
   2. SMART ROBOT CAT TOY + REMOTE
   ===================================================================== */
function robot() {
  return shell('robot', `<svg viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
  <defs>${defsCommon}
    <linearGradient id="shell" x1="18%" y1="4%" x2="76%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="55%" stop-color="#F3F1ED"/>
      <stop offset="100%" stop-color="#D8D3CB"/>
    </linearGradient>
    <linearGradient id="dome" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#4A4E56"/>
      <stop offset="40%" stop-color="#20232A"/>
      <stop offset="100%" stop-color="#0C0E12"/>
    </linearGradient>
    <linearGradient id="wheel" x1="15%" y1="5%" x2="85%" y2="95%">
      <stop offset="0%" stop-color="#FFA45C"/>
      <stop offset="52%" stop-color="#F07A2A"/>
      <stop offset="100%" stop-color="#C25714"/>
    </linearGradient>
    <linearGradient id="grey" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B9BCC1"/>
      <stop offset="100%" stop-color="#8C9097"/>
    </linearGradient>
    <linearGradient id="feath" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BFE6FF"/>
      <stop offset="50%" stop-color="#FFE6F2"/>
      <stop offset="100%" stop-color="#E7F7FF"/>
    </linearGradient>
  </defs>

  <ellipse cx="700" cy="1170" rx="420" ry="86" fill="url(#floor)" filter="url(#soft)"/>
  <ellipse cx="1290" cy="1195" rx="230" ry="54" fill="url(#floor)" filter="url(#soft)"/>

  <!-- feather tuft -->
  <g transform="translate(430 372) rotate(-8)">
    ${P(16, (i) => {
      const a = -0.95 + (i / 15) * 1.5;
      const len = 250 + 60 * Math.sin(i * 1.1);
      return `<path d="M0 0 Q ${f2(len * 0.45 * Math.cos(a) - 40)} ${f2(len * 0.45 * Math.sin(a) - 30)} ${f2(-len * Math.cos(a))} ${f2(len * Math.sin(a))}" stroke="url(#feath)" stroke-width="${(9 + (i % 4) * 3)}" fill="none" stroke-linecap="round" opacity=".85"/>`;
    })}
  </g>
  <!-- clip ring -->
  <circle cx="500" cy="404" r="64" fill="none" stroke="url(#grey)" stroke-width="26"/>
  <path d="M500 468 L500 540 Q500 574 532 584 L590 606" stroke="url(#grey)" stroke-width="30" fill="none" stroke-linecap="round"/>

  <!-- body -->
  <path d="M560 890 Q548 690 700 640 Q900 574 1020 700 Q1096 782 1080 880 Q1074 936 1012 940 L640 940 Q566 938 560 890 Z" fill="url(#shell)"/>
  <path d="M812 654 Q968 620 1046 736 Q1088 800 1074 866 L836 872 Q800 760 812 654 Z" fill="url(#dome)"/>
  <path d="M868 676 Q960 664 1014 744" stroke="#FFFFFF" stroke-opacity=".22" stroke-width="16" fill="none" stroke-linecap="round"/>
  <!-- vents -->
  ${P(6, (i) => `<rect x="${640 + i * 30}" y="${744 + i * 5}" width="14" height="${120 - i * 6}" rx="7" fill="#9AA0A8" opacity=".8"/>`)}
  <!-- wheel -->
  <circle cx="600" cy="852" r="150" fill="url(#wheel)"/>
  <circle cx="600" cy="852" r="150" fill="none" stroke="#A64B10" stroke-opacity=".25" stroke-width="6"/>
  <circle cx="600" cy="852" r="52" fill="#FAF7F2"/>
  <circle cx="558" cy="806" r="34" fill="#FFFFFF" opacity=".28"/>
  <!-- small front wheels -->
  <circle cx="1010" cy="948" r="34" fill="#4A4E56"/>
  <circle cx="742" cy="952" r="26" fill="#E7E4DE"/>

  <!-- remote -->
  <g transform="translate(1090 806)">
    <rect x="0" y="0" width="440" height="300" rx="150" fill="url(#shell)"/>
    <rect x="14" y="12" width="412" height="120" rx="60" fill="#FFFFFF" opacity=".55"/>
    <rect x="62" y="96" width="86" height="66" rx="18" fill="url(#grey)"/>
    <rect x="62" y="170" width="86" height="66" rx="18" fill="url(#grey)"/>
    <circle cx="220" cy="168" r="40" fill="url(#grey)"/>
    <rect x="286" y="82" width="92" height="34" rx="17" fill="url(#grey)"/>
    <rect x="278" y="140" width="66" height="72" rx="18" fill="url(#grey)"/>
    <rect x="350" y="140" width="66" height="72" rx="18" fill="url(#grey)"/>
  </g>
</svg>`);
}

/* =====================================================================
   copper coil bar (shared by shavers)
   ===================================================================== */
const coil = (x, y, w, h, n) => `<g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#B9793C"/>
  ${P(n, (i) => `<rect x="${f2(x + 4 + (i * (w - 8)) / n)}" y="${y}" width="${f2((w - 8) / n * 0.5)}" height="${h}" fill="#7E4C1E" opacity=".55"/>`)}
  <rect x="${x}" y="${y + 2}" width="${w}" height="${h * 0.32}" rx="${h * 0.16}" fill="#F0B97A" opacity=".65"/>
</g>`;

/* 3. WOOD-HANDLE FABRIC / FUR SHAVER */
function shaverWood() {
  return shell('shaverWood', `<svg viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
  <defs>${defsCommon}
    <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="30%">
      <stop offset="0%" stop-color="#E3C79C"/>
      <stop offset="38%" stop-color="#D2AE7E"/>
      <stop offset="100%" stop-color="#A9855A"/>
    </linearGradient>
    <linearGradient id="steel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2F3F5"/>
      <stop offset="42%" stop-color="#C3C7CD"/>
      <stop offset="100%" stop-color="#8E949C"/>
    </linearGradient>
  </defs>

  <ellipse cx="800" cy="1230" rx="530" ry="92" fill="url(#floor)" filter="url(#soft)"/>

  <g transform="translate(800 800) rotate(-32) translate(-800 -800)">
    <!-- handle -->
    <rect x="700" y="330" width="196" height="470" rx="94" fill="url(#wood)"/>
    <ellipse cx="798" cy="352" rx="98" ry="30" fill="#EBD3AC"/>
    <rect x="700" y="470" width="196" height="9" fill="#8A6738" opacity=".55"/>
    <rect x="700" y="512" width="196" height="9" fill="#8A6738" opacity=".55"/>
    <rect x="722" y="352" width="34" height="430" rx="17" fill="#FFFFFF" opacity=".22"/>
    <!-- ferrule -->
    <rect x="690" y="778" width="216" height="86" rx="26" fill="url(#steel)"/>
    <!-- wire frame -->
    <path d="M796 856 L470 1120 M796 856 L1126 1120" stroke="url(#steel)" stroke-width="30" fill="none" stroke-linecap="round"/>
    <path d="M470 1120 L470 1186 M1126 1120 L1126 1186" stroke="url(#steel)" stroke-width="30" stroke-linecap="round"/>
    <!-- blade plate -->
    <rect x="452" y="1160" width="692" height="44" rx="20" fill="url(#steel)"/>
    ${coil(452, 1198, 692, 46, 96)}
  </g>
</svg>`);
}

/* 4. FINE-TOOTH GROOMING COMB */
function comb() {
  return shell('comb', `<svg viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
  <defs>${defsCommon}
    <linearGradient id="blk" x1="0%" y1="0%" x2="60%" y2="100%">
      <stop offset="0%" stop-color="#4B4E54"/>
      <stop offset="35%" stop-color="#191B1F"/>
      <stop offset="100%" stop-color="#08090B"/>
    </linearGradient>
    <linearGradient id="steel2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBFCFD"/>
      <stop offset="50%" stop-color="#C9CDD3"/>
      <stop offset="100%" stop-color="#93999F"/>
    </linearGradient>
  </defs>

  <ellipse cx="800" cy="1210" rx="540" ry="88" fill="url(#floor)" filter="url(#soft)"/>

  <g transform="translate(800 800) rotate(-30) translate(-800 -800)">
    <!-- handle -->
    <path d="M300 742 Q296 664 372 656 L720 646 Q760 646 762 690 L762 906 Q760 950 720 950 L372 940 Q296 932 300 854 Z" fill="url(#blk)"/>
    <ellipse cx="368" cy="798" rx="30" ry="52" fill="none" stroke="#5E636B" stroke-width="12"/>
    ${P(7, (i) => `<rect x="${452 + i * 40}" y="716" width="17" height="164" rx="8.5" fill="#585D65"/>`)}
    <path d="M330 700 Q360 672 420 670 L700 664" stroke="#FFFFFF" stroke-opacity=".18" stroke-width="16" fill="none" stroke-linecap="round"/>
    <!-- spine -->
    <path d="M744 646 L1236 646 Q1272 646 1272 684 L1272 912 Q1272 950 1236 950 L744 950 Z" fill="url(#blk)"/>
    <path d="M770 676 L1240 676" stroke="#FFFFFF" stroke-opacity=".16" stroke-width="14" stroke-linecap="round"/>
    <!-- teeth -->
    ${P(56, (i) => `<rect x="${f2(786 + i * 8.4)}" y="944" width="3.4" height="${230 + (i % 2) * 4}" rx="1.7" fill="url(#steel2)"/>`)}
    <rect x="780" y="930" width="486" height="26" rx="13" fill="url(#steel2)"/>
  </g>
</svg>`);
}

/* 5. XL PET-HAIR REMOVER, RED HANDLE */
function shaverRed() {
  return shell('shaverRed', `<svg viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
  <defs>${defsCommon}
    <linearGradient id="red" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FF8A5C"/>
      <stop offset="40%" stop-color="#EC5B2A"/>
      <stop offset="100%" stop-color="#B93A12"/>
    </linearGradient>
    <linearGradient id="plate" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#EDEAE4"/>
      <stop offset="100%" stop-color="#CFCBC3"/>
    </linearGradient>
  </defs>

  <ellipse cx="810" cy="1215" rx="560" ry="88" fill="url(#floor)" filter="url(#soft)"/>

  <g transform="translate(810 850) rotate(-14) translate(-810 -850)">
    <!-- handle, anchored to the blade head -->
    <g transform="rotate(-34 810 940)">
      <rect x="732" y="404" width="156" height="548" rx="78" fill="url(#red)"/>
      <rect x="758" y="440" width="38" height="470" rx="19" fill="#FFFFFF" opacity=".30"/>
      <ellipse cx="810" cy="420" rx="78" ry="24" fill="#FF9C72" opacity=".9"/>
      ${P(4, (i) => `<rect x="732" y="${556 + i * 76}" width="156" height="12" rx="6" fill="#A8340F" opacity=".26"/>`)}
    </g>
    <!-- neck -->
    <path d="M742 918 L878 918 L906 990 L714 990 Z" fill="#E8642F"/>
    <!-- blade plate -->
    <rect x="352" y="962" width="916" height="56" rx="26" fill="url(#plate)"/>
    <rect x="352" y="968" width="916" height="15" rx="8" fill="#FFFFFF" opacity=".85"/>
    ${coil(346, 1012, 928, 50, 132)}
  </g>
</svg>`);
}

const out = { 'nest': nest(), 'robot': robot(), 'shaver-wood': shaverWood(), 'comb': comb(), 'shaver-red': shaverRed() };
for (const [k, v] of Object.entries(out)) fs.writeFileSync(`${k}.html`, v);
console.log('wrote', Object.keys(out).join(', '));
