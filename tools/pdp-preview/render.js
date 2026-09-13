/**
 * Renders a product template for real, so the page can be looked at rather
 * than reasoned about.
 *
 * The storefront cannot be reached from this sandbox and neither can the image
 * CDN, so the Liquid is run locally against a stub `product` drop built from
 * the real product's shape: the same number of images, at the same aspect
 * ratios, and the same metafields. The layout that comes out is therefore the
 * real layout even though the photographs are stand-ins.
 *
 * Usage: node tools/pdp-preview/render.js <template-suffix> > out.html
 */
const fs = require('fs');
const path = require('path');
const { Liquid } = require('liquidjs');

const ROOT = path.resolve(__dirname, '../..');
const THEME = path.join(ROOT, 'theme');
const read = (p) => fs.readFileSync(path.join(THEME, p), 'utf8');

// The eight real photographs of בלום, by their true pixel dimensions, so every
// aspect-ratio-driven rule in the stylesheet behaves as it will in production.
const DIMS = [
  [1206, 1806], [1177, 1754], [1206, 1759], [1206, 1763],
  [1206, 1688], [1206, 1740], [1145, 1374], [1254, 1254],
];

const swatch = (w, h, i) => {
  const tones = ['#DDD3C4', '#CFC4B2', '#E3DACB', '#C8BCA8', '#D6CBB8', '#BFB3A0', '#E8E0D3', '#CDC2AF'];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="${tones[i % tones.length]}"/>` +
    `<text x="50%" y="50%" font-family="sans-serif" font-size="${Math.round(w / 9)}"` +
    ` fill="#8C8175" text-anchor="middle" dominant-baseline="middle">${i + 1}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + svg.replace(/#/g, '%23').replace(/"/g, "'");
};

const images = DIMS.map(([w, h], i) => ({
  width: w, height: h, aspect_ratio: +(w / h).toFixed(4),
  alt: 'בלום, עמדת טיפוח ביתית לכלבים ולחתולים',
  src: swatch(w, h, i),
  preview_image: { width: w, height: h },
}));

const mf = JSON.parse(fs.readFileSync(path.join(__dirname, 'metafields.json'), 'utf8'));

const product = {
  title: 'בלום™ תחנת הטיפוח הביתית לכלבים וחתולים',
  handle: 'bloom-grooming-station',
  type: 'עמדת טיפוח',
  url: '/products/bloom-grooming-station',
  price: 13999,
  compare_at_price: null,
  available: true,
  description: '<p>בלום היא עמדת הטיפוח הביתית של TinyBloom.</p>',
  images,
  media: images,
  featured_media: images[0],
  featured_image: images[0],
  selected_or_first_available_variant: { id: 48333197017140 },
  metafields: { custom: mf },
};

const engine = new Liquid({ strictFilters: false, strictVariables: false });

// Shopify filters the sections actually use.
engine.registerFilter('image_url', (v) => (v && v.src) || '');
engine.registerFilter('money', (cents) => '₪' + (Number(cents) / 100).toFixed(2));
engine.registerFilter('asset_url', (v) => '/assets/' + v);
engine.registerFilter('stylesheet_tag', (v) => `<link rel="stylesheet" href="${v}">`);
engine.registerFilter('placeholder_svg_tag', () => '<svg viewBox="0 0 100 100"></svg>');
engine.registerFilter('img_url', (v) => (v && v.src) || '');

// Shopify tags. `form` becomes a real form so the submit button is measured at
// its true size; the rest carry no markup into the page.
const swallow = (name) => ({
  parse(token, remain) {
    const end = 'end' + name;
    while (remain.length) { const t = remain.shift(); if (t.name === end) return; }
  },
  render() { return ''; },
});
engine.registerTag('doc', swallow('doc'));
engine.registerTag('schema', swallow('schema'));
engine.registerTag('stylesheet', swallow('stylesheet'));
engine.registerTag('javascript', swallow('javascript'));
engine.registerTag('form', {
  parse(token, remain) {
    this.tpls = [];
    const stream = this.liquid.parser.parseStream(remain)
      .on('tag:endform', function () { this.stop(); })
      .on('template', (tpl) => this.tpls.push(tpl))
      .on('end', () => { throw new Error('endform missing'); });
    stream.start();
    this.args = token.args;
  },
  *render(ctx, emitter) {
    const cls = (/class:\s*'([^']*)'/.exec(this.args) || [, ''])[1];
    const id = (/id:\s*'?([^',]*)'?/.exec(this.args) || [, ''])[1];
    emitter.write(`<form method="post" action="/cart/add" class="${cls}"${id ? ` id="${id.trim()}"` : ''}>`);
    yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
    emitter.write('</form>');
  },
});

const suffix = process.argv[2] || 'bloom';
const tpl = JSON.parse(read(`templates/product.${suffix}.json`));

const body = tpl.order.map((key) => {
  const sec = tpl.sections[key];
  const src = read(`sections/${sec.type}.liquid`);
  const blocks = (sec.block_order || []).map((bid) => ({
    id: bid,
    type: sec.blocks[bid].type,
    settings: sec.blocks[bid].settings,
    shopify_attributes: '',
  }));
  blocks.size = blocks.length;
  return engine.parseAndRenderSync(src, {
    product,
    section: { id: key, settings: sec.settings || {}, blocks },
    template: { name: 'product', suffix },
    all_products: {},
  });
}).join('\n');

const reset = fs.readFileSync(path.join(ROOT, 'tools/responsive-check/reset.css'), 'utf8');
const css = [reset, read('assets/pluma.css'), read('assets/pdp.css')].join('\n');

process.stdout.write(
  `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width,initial-scale=1">` +
  `<style>${css}</style></head><body>${body}</body></html>`
);
