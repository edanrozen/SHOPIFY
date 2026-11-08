# The plain theme

An ordinary shop, end to end: a banner, a line, a button, a grid of everything,
a plain product page, a plain collection page. It exists to be judged against
the real design, not to be built on.

It lives here rather than in `theme/` because it replaces the whole design
layer instead of sitting on top of it. Keeping it out of `theme/` is what stops
it drifting into the real store by accident.

    theme   בייסיק · גרסה פשוטה לתצוגה   155250786356, unpublished

    assets/bs.css                 the entire style layer, 6.3 KB
    snippets/stylesheets.liquid   loads base.css and bs.css, and nothing else
    sections/bs-home.liquid       the whole homepage in one section
    sections/bs-product.liquid    picture, price, quantity, button, description
    sections/bs-collection.liquid title, count, the same grid, paginated at 24
    templates/index.json          plus product.json, the nine product.<suffix>
                                  files and collection.json

Everything else in that theme is Horizon's own: the header, the footer, the
cart, search, 404. `bs.css` redefines Horizon's four font variables so those
pages wear the same system face as the rest, instead of the theme ending up in
two typefaces.

What is deliberately absent: Rubik and Assistant, `pluma.css`, `pl-story.css`,
`pdp.css`, `pluma.js`, every animation, shadow, gradient and rounded panel. The
page makes three stylesheet requests where the real theme makes seven.

## Rendering it locally

The harness reads whichever theme directory `PREVIEW_THEME` names and loads
whichever stylesheets `PREVIEW_SHEETS` names:

    mkdir -p /tmp/basic/{sections,snippets,assets,templates}
    cp variants/basic/bs*.liquid        /tmp/basic/sections/
    cp variants/basic/stylesheets.liquid /tmp/basic/snippets/
    cp variants/basic/bs.css            /tmp/basic/assets/
    cp variants/basic/index.json variants/basic/collection.json /tmp/basic/templates/
    cp variants/basic/product.json      /tmp/basic/templates/product.bloom.json

    PREVIEW_THEME=/tmp/basic PREVIEW_SHEETS=assets/bs.css \
      node tools/pdp-preview/render.js product bloom > product.html
