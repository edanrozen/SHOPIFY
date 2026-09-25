/**
 * Renders a storefront template for real, so a page can be looked at rather
 * than reasoned about.
 *
 * The storefront cannot be reached from this sandbox and neither can the image
 * CDN, so the Liquid is run locally against stub drops built from the store's
 * real shape: the same products, the same collections, the same image aspect
 * ratios, the same metafields. The layout that comes out is therefore the real
 * layout even though the photographs are stand-ins.
 *
 * Usage:
 *   node tools/pdp-preview/render.js index        > home.html
 *   node tools/pdp-preview/render.js product bloom > bloom.html
 */
const fs = require('fs');
const path = require('path');
const { Liquid } = require('liquidjs');

const ROOT = path.resolve(__dirname, '../..');
// The variant themes live outside `theme/` and are staged into a directory of
// their own before rendering, so PREVIEW_THEME points the harness at whichever
// theme is being looked at. Default is the real one.
const THEME = path.resolve(ROOT, process.env.PREVIEW_THEME || 'theme');
// Shopify accepts `comment ... endcomment` inside a {% liquid %} tag with any
// prose in between; liquidjs tokenises the prose and trips over quotes. The
// comments carry no output, so they are removed before parsing. This is a
// limitation of the preview engine, not of the theme.
const stripLiquidComments = (src) =>
  src.replace(/\{%-?\s*liquid\b[\s\S]*?-?%\}/g, (block) =>
    block.replace(/^[ \t]*comment\b[\s\S]*?^[ \t]*endcomment[ \t]*$/gm, ''));

const read = (p) => stripLiquidComments(fs.readFileSync(path.join(THEME, p), 'utf8'));

const TONES = ['#DDD3C4', '#CFC4B2', '#E3DACB', '#C8BCA8', '#D6CBB8', '#BFB3A0', '#E8E0D3', '#CDC2AF'];
let swatchSeed = 0;
const swatch = (w, h, label) => {
  const tone = TONES[swatchSeed++ % TONES.length];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="${tone}"/>` +
    `<text x="50%" y="50%" font-family="sans-serif" font-size="${Math.round(Math.min(w, h) / 8)}"` +
    ` fill="#8C8175" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  // A srcset splits on whitespace and on commas, so a data URI containing
  // either is silently dropped and the browser falls back to <img src>. That
  // hid every <picture> source in the preview, the mobile hero included.
  // Full percent-encoding is the only version srcset parses.
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

const img = (w, h, label, alt) => {
  const o = {
    width: w, height: h, aspect_ratio: +(w / h).toFixed(4),
    alt: alt || '', src: swatch(w, h, label),
  };
  // In Liquid a media drop's preview_image is a full image drop, so it has to
  // carry a src here too. Without it `media.preview_image | image_url` renders
  // an empty string and a gallery screenshots as blank frames.
  o.preview_image = o;
  return o;
};

// Which `custom` keys each product actually carries in the shop, read off the
// Admin API rather than assumed. The stub text in metafields.json stands in
// for all of them, but presence is real, because presence is what decides
// whether a band renders at all. Three products are missing something today
// and the preview has to show that rather than paper over it:
// hair-remover-xl and parvatek-grooming-comb have no `versus`, and
// kadurosh-cat-ball-toy has no `steps`.
const MF_PRESENT = {
  'bloom-grooming-station': ['problem', 'before', 'after', 'steps', 'why', 'versus', 'faq', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'pro-grooming-comb': ['problem', 'before', 'after', 'steps', 'why', 'versus', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'parvatek-grooming-comb': ['problem', 'before', 'after', 'steps', 'why', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'parvakal-pet-clipper': ['problem', 'before', 'after', 'steps', 'why', 'versus', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'hair-remover-xl': ['problem', 'before', 'after', 'steps', 'why', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'hair-remover-wood-handle': ['problem', 'before', 'after', 'steps', 'why', 'versus', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'tinybloom-fur-glove': ['problem', 'before', 'after', 'steps', 'why', 'versus', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'katora-cardboard-scratcher': ['problem', 'before', 'after', 'steps', 'why', 'versus', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
  'kadurosh-cat-ball-toy': ['problem', 'before', 'after', 'why', 'versus', 'faq', 'specs', 'highlights', 'for_pets', 'problem_line', 'solution_line'],
};

// ---------------------------------------------------------------- catalogue
// The nine real products, with the real image counts and the real handles, so
// every grid, card and collection on the page fills exactly as it will live.
// handle, title, price (agorot), image count, collections, dims
// The dimensions are the real ones from the Files API. They matter: a frame
// that crops a tall photograph looks perfect against a stub of the wrong
// shape, which is how cropping shipped unnoticed in the first place.
//
// dims is either one [w, h] for the whole set, or one [w, h] per image where
// the product's shoot is not uniform. Per image matters for the bands that put
// photographs into the page: a product whose hero is square and whose detail
// shots are 2:3 looks fine in a stub that pretends they are all square, and
// then letterboxes four pictures on the live store.
const CATALOGUE = [
  ['bloom-grooming-station', 'בלום™ תחנת הטיפוח הביתית לכלבים וחתולים', 24999, 8, ['grooming', 'all-products'],
    [[1206, 1806], [1177, 1754], [1206, 1759], [1206, 1763], [1206, 1688], [1206, 1740], [1145, 1374], [1254, 1254]]],
  ['pro-grooming-comb', 'פורה מסרק למניעת קשרים', 5999, 6, ['grooming', 'all-products'],
    [[1254, 1254], [1312, 1199], [1312, 1199], [1672, 941], [1145, 1374], [1312, 1199]]],
  ['parvatek-grooming-comb', 'פרוותק מסרק דו צדדי לטיפוח הפרווה', 6990, 7, ['grooming', 'all-products'],
    [[1055, 1024], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254]]],
  ['parvakal-pet-clipper', 'פרווהקל מכונת גילוח לחיות', 13990, 6, ['grooming', 'all-products'],
    [[1101, 960], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254]]],
  ['hair-remover-xl', 'מסירון הדרך הקלה לניקוי שיער ופרווה מכל בד', 8999, 9, ['clean-home', 'all-products'],
    [[1024, 1025], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254]]],
  ['hair-remover-wood-handle', 'מסיר שיער חיות מחמד עם ידית עץ', 6990, 8, ['clean-home', 'all-products'],
    [[974, 1104], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254]]],
  ['tinybloom-fur-glove', 'כפפת הפרווה של TinyBloom', 6999, 9, ['clean-home', 'all-products'],
    [[768, 1375], [938, 1677], [1145, 1374], [1145, 1374], [1145, 1374], [1145, 1374], [1145, 1374], [1145, 1374], [1145, 1374]]],
  ['katora-cardboard-scratcher', 'קאטורה טבעת גירוד קרטון לחתולים', 7990, 6, ['cats', 'all-products'],
    [[976, 1094], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254], [1254, 1254]]],
  ['kadurosh-cat-ball-toy', 'כדורוש צעצוע חכם ואינטראקטיבי לחתולים', 9990, 5, ['cats', 'all-products'],
    [[1102, 976], [1333, 1180], [1333, 1180], [1254, 1254], [1254, 1254]]],
];

// The problem and solution lines every product carries in the store, as
// custom.problem_line and custom.solution_line. They are on the stub too,
// because a section that features one product reads them from a product drop
// rather than from the page's `product`, and without them here the homepage
// renders a flagship band with its two best sentences missing.
const PS = {
  'bloom-grooming-station': ['יד אחת מחזיקה, השנייה מנסה לסרק, ואין יד שלישית.', 'מקום קבוע ויציב לעמוד בו, וכל כלי שכבר יש לכם עובד בשתי ידיים.'],
  'pro-grooming-comb': ['קשר קטן שלא מרגישים ביד הופך תוך שבוע למספריים או לתור אצל ספר חיות.', 'שיני נירוסטה בשני מרווחים מפרידות את הסבך בזמן שהוא עוד נפתח באצבעות.'],
  'parvatek-grooming-comb': ['הפרווה נראית בסדר מבחוץ, ומתחתיה מצטברים קשרים ושיער שנושר לספה.', 'צד אחד מתיר את הקשר, הצד השני מבריש ואוסף את מה שכבר נשר.'],
  'parvakal-pet-clipper': ['התור הבא אצל ספר החיות בעוד כמה שבועות, והפרווה לא מחכה.', 'מכונת קיצור ביתית שמסדרת אזור שהתארך, בלי לקבוע תור חדש.'],
  'hair-remover-xl': ['ספה, שטיח ומזרן הם הרבה מטרים של בד, וראש צר הופך את זה לערב שלם.', 'להב ברוחב 30 סנטימטר עובר את אותו שטח בפחות מעברים ובלי כאב ביד.'],
  'hair-remover-wood-handle': ['רולר דביק מחליק מעל השיער הקצר, ונגמר בדיוק באמצע הספה.', 'גליל נחושת מחורץ מושך את השיער מתוך סיבי הבד. בלי מילויים ובלי דבק.'],
  'tinybloom-fur-glove': ['השיער נדבק לבגדים, למצעים ולמושב הרכב, ורולר דביק נגמר בדיוק אז.', 'הבד המרושת אוסף את השיער אל כף היד ומרכז אותו במקום אחד. רב פעמית.'],
  'katora-cardboard-scratcher': ['חתול חייב לגרד. בלי מקום ייעודי, הוא יבחר את הספה.', 'טבעת קרטון גלי בשכבות שנותנת לו מרקם שהוא מעדיף, ומקום לנוח עליו אחרי.'],
  'kadurosh-cat-ball-toy': ['צעצוע שלא זז מעניין חתול חמש דקות, ואז הוא חוזר לווילון.', 'כדור שנע בצורה בלתי צפויה ומזמין מרדף גם כשאתם עסוקים.'],
};

// Real compare_at prices from the shop, in agorot. Without these the preview
// renders every product at full price and the sale markup never appears, which
// is how a sale badge ships untested.
const COMPARE = {
  'bloom-grooming-station': 29999,
  'parvakal-pet-clipper': 19999,
  'kadurosh-cat-ball-toy': 12999,
  'hair-remover-xl': 10999,
  'katora-cardboard-scratcher': 9999,
  'tinybloom-fur-glove': 8999,
  'hair-remover-wood-handle': 9999,
  'parvatek-grooming-comb': 8999,
  'pro-grooming-comb': 7999,
};

const makeProduct = ([handle, title, price, nImages, colls, dims]) => {
  const perImage = Array.isArray(dims && dims[0]);
  const sizeOf = (i) => (perImage ? dims[Math.min(i, dims.length - 1)] : dims) || [1206, 1760];
  const [w, h] = sizeOf(0);
  // Alt text on the first image only. That is the shape the real catalogue is
  // in for most of its products, and a stub that gave every photograph a
  // caption would hide the fact that the bands which caption from alt text
  // will render bare on the live store.
  const images = Array.from({ length: nImages }, (_, i) => {
    const [iw, ih] = sizeOf(i);
    return img(iw, ih, i + 1, i === 0 ? title : '');
  });
  // A media drop carries its media_type, and a template that filters on it
  // (`where: 'media_type', 'image'`) gets an empty list without it. All nine
  // products are single variant in the store, so the stub is too: a template
  // branching on has_only_default_variant must take the branch it will live on.
  for (const m of images) m.media_type = 'image';
  const variant = { id: 1000 + price, title: 'Default Title', price, available: true };
  return {
    handle, title, price, compare_at_price: COMPARE[handle] || null, available: true,
    url: '/products/' + handle,
    type: 'טיפוח',
    description: '<p>' + title + '</p>',
    images, media: images,
    featured_media: images[0], featured_image: images[0],
    has_only_default_variant: true,
    variants: [variant],
    selected_or_first_available_variant: variant,
    metafields: {
      custom: {
        problem_line: { value: (PS[handle] || [])[0] },
        solution_line: { value: (PS[handle] || [])[1] },
      },
    },
    _collections: colls,
  };
};

const products = CATALOGUE.map(makeProduct);
const all_products = Object.fromEntries(products.map((p) => [p.handle, p]));

const COLL_META = {
  grooming: 'טיפוח הפרווה',
  'clean-home': 'בית נקי מפרווה',
  cats: 'לחתולים',
  'all-products': 'כל המוצרים',
};
const collections = {};
for (const [handle, title] of Object.entries(COLL_META)) {
  const list = products.filter((p) => p._collections.includes(handle));
  list.first = list[0];
  collections[handle] = {
    handle, title, url: '/collections/' + handle,
    // Only the grooming collection carries an image of its own, exactly as in
    // the store; the rest exercise the first-product fallback.
    image: handle === 'grooming' ? img(1200, 900, 'C', title) : null,
    products: list,
    all_products_count: list.length,
    products_count: list.length,
  };
}

const engine = new Liquid({ strictFilters: false, strictVariables: false });

// Image settings arrive as "shopify://shop_images/NAME.png" strings. They are
// turned into image drops with plausible dimensions so aspect-ratio rules and
// srcset attributes behave as they will in production.
// Real dimensions, read from the Files API. They are recorded here rather than
// guessed because a transposed pair silently makes the preview lie: a frame
// that crops badly in production renders perfectly against a stub of the wrong
// shape, which is exactly how the hero shipped with a landscape photograph
// inside a portrait frame.
const PICKED = {
  '1CFBD4F3-2618-44A9-BD31-D101DB73E276.png': [1672, 941],
  'IMG-0633.png': [1536, 1024],
  '6EA1D042-50C7-443A-9E5A-6B0E60FEBF4F.png': [1145, 1374],
  'FFA8C7B2-763E-4709-A5AE-3D9B4D689B1A.png': [1254, 1254],
};
const resolvePicked = (v) => {
  if (!v || typeof v !== 'string' || !v.startsWith('shopify://')) return v;
  const name = v.split('/').pop();
  const [w, h] = PICKED[name] || [1400, 1000];
  return img(w, h, name.slice(0, 4), '');
};
const deepResolve = (o) => {
  if (Array.isArray(o)) return o.map(deepResolve);
  if (o && typeof o === 'object') {
    return Object.fromEntries(Object.entries(o).map(([k, v]) => {
      // A `product` setting is stored as a handle and served to Liquid as a
      // product drop, whatever the setting is called: a section that excludes
      // one product reads `settings.exclude.handle` and needs the drop just as
      // much as one that features it. Matching on the value being a real handle
      // rather than on the key being `product` is what Shopify itself does.
      if (typeof v === 'string' && all_products[v]) return [k, all_products[v]];
      return [k, deepResolve(v)];
    }));
  }
  return resolvePicked(o);
};

engine.registerFilter('image_url', (v) => (v && v.src) || '');
engine.registerFilter('img_url', (v) => (v && v.src) || '');
engine.registerFilter('money', (c) => '₪' + (Number(c) / 100).toFixed(2));
engine.registerFilter('money_without_trailing_zeros', (c) => '₪' + Math.round(Number(c) / 100));
engine.registerFilter('asset_url', (v) => '/assets/' + v);
engine.registerFilter('stylesheet_tag', (v) => `<link rel="stylesheet" href="${v}">`);
engine.registerFilter('placeholder_svg_tag', (v, cls) =>
  `<svg class="${cls || ''}" viewBox="0 0 100 100" style="width:100%;height:auto;background:#EFEBE4"></svg>`);

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

// Snippets are rendered for real, so the product card on the homepage is the
// same markup the storefront serves.
engine.registerTag('render', {
  parse(token) { this.args = token.args; },
  *render(ctx, emitter) {
    const name = (/^\s*'([^']+)'/.exec(this.args) || [, ''])[1];
    const scope = {};
    const re = /(\w+)\s*:\s*([^,]+)/g;
    let m;
    const rest = this.args.slice(this.args.indexOf("'", this.args.indexOf("'") + 1) + 1);
    while ((m = re.exec(rest))) {
      const raw = m[2].trim();
      scope[m[1]] = /^'.*'$/.test(raw) ? raw.slice(1, -1) : yield ctx.get(raw.split('.'));
    }
    let src;
    try { src = read('snippets/' + name + '.liquid'); } catch { return; }
    emitter.write(engine.parseAndRenderSync(src, { ...ctx.getAll(), ...scope }));
  },
});

// `paginate` has no liquidjs equivalent. Nine products never fill a page of 24,
// so the body is rendered once with an empty pager, which is what the
// storefront does too at this catalogue size.
engine.registerTag('paginate', {
  parse(token, remain) {
    this.tpls = [];
    const stream = this.liquid.parser.parseStream(remain)
      .on('template', (t) => this.tpls.push(t))
      .on('tag:endpaginate', function () { this.stop(); })
      .on('end', () => { throw new Error('endpaginate not closed'); });
    stream.start();
  },
  *render(ctx, emitter) {
    ctx.push({ paginate: { pages: 1, current_page: 1, parts: [] } });
    yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
    ctx.pop();
  },
});

// ------------------------------------------------------------------- render
const which = process.argv[2] || 'index';
const suffix = process.argv[3] || '';
// An empty suffix means the generic product template, not `product..json`.
const file = which === 'product'
  ? (suffix ? `templates/product.${suffix}.json` : 'templates/product.json')
  : `templates/${which}.json`;
const tpl = JSON.parse(read(file));

// Which product the page is about. Bloom is the default because it is the one
// with every metafield filled, but the generic product template has to be
// checked against a product that is not Bloom too: it is the template that
// nine of the ten pages use, and the only one where "goes well with" can
// recommend the page it is already on.
const product = which === 'product'
  ? all_products[process.env.PREVIEW_PRODUCT || 'bloom-grooming-station']
  : null;
if (product) {
  const body = JSON.parse(fs.readFileSync(path.join(__dirname, 'metafields.json'), 'utf8'));
  const present = MF_PRESENT[product.handle];
  if (present) {
    for (const key of Object.keys(body)) {
      if (!present.includes(key)) delete body[key];
    }
  }
  product.metafields.custom = Object.assign(body, product.metafields.custom);
}

// A collection template needs the drop the page is about, the same way a
// product template needs `product`.
const collection = which === 'collection'
  ? collections[process.env.PREVIEW_COLLECTION || 'all-products']
  : null;

const base = {
  collections, all_products, product, collection,
  routes: { root_url: '/', all_products_collection_url: '/collections/all', cart_url: '/cart' },
  settings: {},
  template: { name: which === 'product' ? 'product' : which, suffix },
};

const body = tpl.order.map((key) => {
  const sec = tpl.sections[key];
  const src = read(`sections/${sec.type}.liquid`);
  const blocks = (sec.block_order || []).map((bid) => ({
    id: bid, type: sec.blocks[bid].type,
    settings: deepResolve(sec.blocks[bid].settings), shopify_attributes: '',
  }));
  blocks.size = blocks.length;
  return engine.parseAndRenderSync(src, {
    ...base,
    section: { id: key, settings: deepResolve(sec.settings || {}), blocks },
  });
}).join('\n');

const reset = fs.readFileSync(path.join(ROOT, 'tools/responsive-check/reset.css'), 'utf8');
// tb.css is optional: an older checkout of the theme (used to render the
// previous design for comparison) does not have it.
const optional = (f) => { try { return read(f); } catch { return ''; } };
// PREVIEW_SHEETS names the stylesheets a variant theme loads, in order. The
// basic theme, for instance, loads one and none of the design system.
const sheets = process.env.PREVIEW_SHEETS
  ? [reset, ...process.env.PREVIEW_SHEETS.split(',').map((f) => read(f.trim()))]
  : [reset, read('assets/pluma.css'), optional('assets/tb.css'), optional('assets/tb-warm.css'), optional('assets/tb-fit.css')];
if (which === 'product' && !process.env.PREVIEW_SHEETS) sheets.push(read('assets/pdp.css'));

// Section stylesheets are concatenated by Shopify and served after the assets,
// which is the order they are applied in here too.
for (const f of fs.readdirSync(path.join(THEME, 'sections')).sort()) {
  if (!f.endsWith('.liquid')) continue;
  const m = read('sections/' + f).match(/\{%\s*stylesheet\s*%\}([\s\S]*?)\{%\s*endstylesheet\s*%\}/);
  if (m) sheets.push(`/* ${f} */\n` + m[1]);
}

// pluma.js reveals `.pl-reveal` elements with an IntersectionObserver. The
// preview does not run the theme's JavaScript, so without this every section
// below the hero would screenshot as blank. This is the revealed end state.
sheets.push('.pl-reveal{opacity:1 !important;transform:none !important}');

process.stdout.write(
  `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width,initial-scale=1">` +
  `<style>${sheets.join('\n')}</style></head><body>${body}</body></html>`
);
