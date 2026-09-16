# The showcase theme

TinyBloom wearing chewy.com's design language over the shape the pet themes in
the Shopify theme store use: a photograph with a sentence on top, a band of
facts, a row of circles asking what you came for, the flagship on its own, then
a grid of bordered product cards.

chewy.com is blocked from this sandbox, so the Chewy side of this is their
design language as known rather than as measured. The blue is a best reading,
not a sampled value.

    theme   TinyBloom · בסגנון חנות התמות (טיוטה)   155253014580, unpublished

## What was taken and what was not

Taken: the photographic opening, the trust row under it, the "who are you
shopping for today" cards, loud headings, round frames, pill buttons.

## What came from Chewy

  * The blue. `--wf-accent` is #1C49C2 and it carries every action: buttons,
    the open thumbnail, the flagship tag, the one shipping line on a card.
    Setting that variable to #000000 restores the black and white version
    exactly.
  * The "Shop by pet" circles, here as three jobs rather than eight animals.
  * Bordered product cards with the name clamped at two lines, the price in
    bold ink rather than in the accent, and a shipping line only where it is
    true.
  * The buy box: one bordered panel holding price, button and shipping, so
    "what this is" and "buy it" are separate blocks.
  * A compact benefit band with the icon beside the words.
  * Less rounding. Cards take 10px; only the buttons stay full pills.

## What did not come from Chewy

  * Star ratings and review counts on every card. There are no reviews.
  * Horizontally scrolling carousels. Chewy scrolls because they have
    thousands of products; nine fit in a grid, and a carousel would hide
    them.
  * Autoship. There is no subscription to sell yet.

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

## The hero rotates

`wf-hero` takes one block per slide, each with its own desktop and phone image,
and cross fades between them every five seconds. The copy on top does not move:
only the picture behind it changes. A slider that also swaps the headline asks
the visitor to re-read the page every five seconds, and the headline is the one
thing on a homepage that should stay still.

Only the first slide carries a real `src`. The rest hold their urls in data
attributes and are promoted one ahead of where the visitor is, so a phone
downloads one hero image on load instead of three. Verified: on load two slides
are fetched and the third is not; it appears only once the second is showing.

Autoplay stops for `prefers-reduced-motion` and while the tab is in the
background. With JavaScript off the first slide is simply the hero, and the dots
are not rendered at all when there is one slide.

## A divergence worth knowing about

`assets/wf.css` and `sections/wf-hero.liquid` in this repo are the versions on
the showcase theme (155253014580). The landing page theme (155266482228) is one
revision behind on both, because neither difference renders there: it has no
`wf-hero` on any template, and the rest of the change is the slide and dot rules
plus one font size on a flagship eyebrow it does not use. Sync them before
editing either file for that theme, or the next md5 check will look like a
mistake when it is only this.

## The weak spot

Two of the three hero slides have no portrait image, so on a phone they are a
landscape photograph centre cropped into a 4:5 frame. Each slide block has a
second image picker; a portrait upload fixes it in one step.

Only `grooming` has a collection cover. `clean-home` and `cats` fall back to
their first product's photograph, so two of the three cards are a product on a
plain ground where the third is a real scene. Two lifestyle photographs would
do more for this page than any further code.

## Rendering it locally

    PREVIEW_THEME=<staged dir> PREVIEW_SHEETS=assets/pluma.css,assets/wf.css \
      node tools/pdp-preview/render.js index > home.html
