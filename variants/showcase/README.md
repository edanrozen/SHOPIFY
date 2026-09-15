# The showcase theme

TinyBloom wearing the shape the pet themes in the Shopify theme store use
(Woofy, Tender and the rest of that shelf): a photograph with a sentence on
top, a row of facts, category cards that ask what you came for, the flagship on
its own, then the grid.

    theme   TinyBloom · בסגנון חנות התמות (טיוטה)   155253014580, unpublished

## What was taken and what was not

Taken: the photographic opening, the trust row under it, the "who are you
shopping for today" cards, loud headings, round frames, pill buttons.

Not taken: their colour. The theme is two colours, #FFFFFF and #000000, and
there is no third. `wf.css` redefines pluma's warm tokens at `:root`, and
`config/settings_data.json` carries the same two values for Horizon's own
header, footer, cart and drawers, which read the palette from there rather than
from CSS. To bring an accent back, `--pl-clay` and `--pl-clay-deep` in
`wf.css` are the only two lines to change.

Two colours cost two things, and both are paid for rather than dropped. A line
can no longer be made quieter by fading it, so the small print keeps its place
by size and weight instead. And the open thumbnail on a product page can no
longer be marked with a second border colour, so the closed ones are faded to
40% instead: less of the photograph, not another colour.

Not taken, deliberately:

  * Tender's countdown on a 30% sale. No sale is running.
  * Woofy's 94% and Tender's "5-star reviews, over 2,500 and counting". This
    store has zero orders, so there is nothing honest to count.

Both are the fastest way to lose a customer who checks, and in Israel an
invented was-price is also a consumer-protection problem rather than a design
choice.

## The one move worth stealing

The category cards. Nine products presented as nine products is a decision the
visitor has to make; the same nine presented as three jobs is a direction they
can follow. The split here is by job rather than by animal, because that is how
this catalogue actually divides: grooming the coat, getting fur out of the
house, and the two things made for cats alone.

## Files

    assets/wf.css                 the posture and the white palette
    config/settings_data.json     the same palette, for Horizon's own sections
    snippets/stylesheets.liquid   base, fonts, pluma, wf. No pdp.css or pl-story.css
    snippets/wf-card.liquid       one card, shared by the grid and the collection
    sections/wf-hero.liquid       photograph, scrim, headline, two pills
    sections/wf-trust.liquid      four facts, four symmetrical icons
    sections/wf-intents.liquid    the category cards
    sections/wf-flagship.liquid   Bloom, problem then answer, from its metafields
    sections/wf-grid.liquid       the catalogue
    sections/wf-product.liquid    gallery, problem, answer, price, one button
    sections/wf-collection.liquid title, count, the same grid, paginated at 24
    templates/                    index, collection, product and nine suffixes

`wf-flagship` and `wf-product` both read `custom.problem_line` and
`custom.solution_line` off the product, so neither can put a sentence on the
page that is not already on the product.

## The weak spot

Only `grooming` has a collection cover. `clean-home` and `cats` fall back to
their first product's photograph, so two of the three cards are a product on a
plain ground where the third is a real scene. Two lifestyle photographs would
do more for this page than any further code.

## Rendering it locally

    PREVIEW_THEME=<staged dir> PREVIEW_SHEETS=assets/pluma.css,assets/wf.css \
      node tools/pdp-preview/render.js index > home.html
