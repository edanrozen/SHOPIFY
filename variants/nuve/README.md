# The landing page theme

TinyBloom as a single product landing page, read off four phone screenshots of
nuvebrand.com. The site itself is blocked by this sandbox's egress proxy, so
every value here is a reading off a screenshot, not a measurement.

    theme   TinyBloom · בסגנון Nuve (טיוטה)   155266482228, unpublished

## What this actually changes

Not the colour. The argument.

The other themes lay out a shop: here is the catalogue, pick something. This
lays out a pitch: here is one problem, here is the one thing that solves it,
here is the button, and the button comes back three times on the way down.

That shape suits this store better than it looks. Bloom is ₪199.99 against a
catalogue whose next most expensive item is ₪139.90. A page that sells Bloom
and mentions the rest is worth more than a page that shows nine things and
argues for none of them.

## Files

    assets/nv.css                 the pitch layer, on top of wf.css
    snippets/stylesheets.liquid   pluma, then wf, then nv
    sections/nv-hero.liquid       photo, eyebrow, huge headline, pink pill
    sections/nv-pitch.liquid      problem, answer, pill again
    sections/nv-buy.liquid        the product again, with add to cart
    sections/nv-benefits.liquid   the emoji benefit list
    sections/header-group.json    pink bar, centred logo, no search
    config/settings_data.json     pink primary button and sale badge
    templates/index.json          the five sections in order

The product and collection pages are still `wf-product` and `wf-collection`
from the showcase theme. They inherit the pink and need no other change.

## What was taken from that page

  * The pink. `--nv-pink` is #E51E8C and every pill on the page is that pink,
    so a pill always means "this is the thing to press".
  * The hero shape: photograph at full width, then the eyebrow, then a headline
    in short sentences each ending in a full stop, then a grey line, then the
    button. Copy under the image rather than over it.
  * The reassurance line under every button, with a check mark beside it.
  * The same product offered a second time lower down, with a button that adds
    to the cart rather than one that scrolls.
  * Emoji benefit icons. It looks careless and it is not: an emoji renders
    everywhere, needs no file, and reads warmer than a line drawing.

## What could not be taken, and why

Almost every trust element on that page is a number this store does not have:

  * "250,000+ customers" and "4.9 stars" in the hero eyebrow. Zero orders.
  * The review carousel with before and after photographs and verified buyer
    badges. No reviews.
  * "24 Hour Sale · Save 50% Off Now" in the announcement bar. No sale is
    running, and a permanent 24 hour sale is a consumer protection problem in
    Israel, not a design choice.
  * The 100 day guarantee. The real offer is the statutory 14 days.
  * The press logos.

Every one of those slots exists in the sections as a setting, so each can be
filled the day it becomes true. Until then the eyebrow says what the product is
and the guarantee line says 14 days.

The reviews are the single biggest gap between this page and theirs. That page
is built on them.
