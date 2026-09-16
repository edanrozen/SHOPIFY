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

  * The layout habits, not the colours. The palette is now the shop's own,
    sampled straight out of the logo. See "The palette" below.
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

## The palette

Every colour in `wf.css` was sampled out of the logo artwork and then checked
for contrast. The shop and the mark are literally the same colours.

The logo writes "Tiny" in olive and "bloom" in dusty pink, and that split is
the whole system: olive carries every action, pink carries none.

That is a measurement, not a preference. White text on the olive is 6.64:1 and
clears WCAG AA comfortably. White text on the pink as drawn is 2.98:1, which
fails AA for body text and fails even the 3:1 floor for large text and UI
components. A pink button is therefore not available at any price, so pink is
a surface and a flourish and never carries words.

    --wf-accent      #586040   buttons, links, icons, the open thumbnail   6.64:1 on white
    --wf-accent-deep #4C5337   hover                                       8.08:1
    --wf-pink        #D08078   surfaces only, never text
    --wf-pink-ink    #C0554A   the one pink dark enough to set text in     4.53:1 on white
    --wf-pink-soft   #FBF2F0   the band behind Bloom
    --pl-cream       #F7F4EC   section bands, and the footer
    --pl-line        #E2DCCF   every hairline
    --pl-ink         #2A2722   headings and prices                        14.88:1
    --pl-ink-soft    #4A443C   body                                        9.62:1
    --pl-taupe       #6B6357   small print       5.92:1 on white, 5.39:1 on cream

Greys are gone on purpose. Cold grey under a warm cream logo is what made the
old footer look like it belonged to a different shop.

The same values are mirrored in two places Liquid cannot reach from CSS:

  * `config/settings_data.json` sets `color_palette.color2` to #E2DCCF. That
    one key draws the border of every input, the cart drawer, every popover
    and the secondary button. It was #000000, which is why the cart and the
    contact form had hard black outlines.
  * `sections/header-group.json` sets the announcement bar to #586040 and
    `sections/footer-group.json` sets the footer to #F7F4EC.

## The logo

`config/settings_data.json` points `logo` at
`shopify://shop_images/ChatGPT_Image_Aug_29_2026_03_54_54_PM.png`, at 64px on
desktop and 48px on a phone rather than Horizon's 34 and 26.

The larger size is forced by the artwork. The mark is a stacked emblem: the
illustration, then the wordmark, then a Hebrew tagline, then a rule. Its ink
measures 1342x980, a ratio of 1.369, so it is nearly square, and Shopify sets
a logo by height. At Horizon's 34px the whole mark is 47px wide and the tagline
renders about two pixels tall. At 64px the wordmark is readable and the tagline
is decorative rather than illegible.

The real fix is a horizontal lockup: the animals beside the name, no tagline,
roughly twice as wide as it is tall. That is an artwork change, not a theme
change.

There is still no favicon, and this file cannot become one. At 32px the whole
stacked mark is mush. The flower with the paw print inside it, cropped square
on its own, is already the right icon and only needs exporting.

## Buttons

Every button in the shop is white with a 1px black rule around it and a black
label. There is no primary and no secondary: the hero pair, the add to cart,
the sticky bar button and the "all products" link are one object. This is the
merchant's decision, taken after the trade-off below was put to him.

What it costs, recorded so nobody re-derives it:

  * A filled button repaints 100% of its own area in a colour the page does
    not have. An outlined one repaints the ring, which on a 190x50 button is
    5% of it. The olive fill stood 6.64:1 clear of the page; a white fill on a
    white page stands at 1.00:1 and the rule alone carries the shape.
  * Hierarchy is gone by construction. Two buttons beside each other are the
    same object, so reading order is the only emphasis left.
  * The sticky buy bar is the sharpest case: a white button on a white bar on
    a white page, and it is the one control that earns the money on a phone.

What was done about it:

  * Hover inverts to solid black rather than tinting, so intent is answered.
  * Padding went 17px to 16px, and the two overrides 19 to 18 and 15 to 14,
    because the rule now contributes to the height. Measured afterwards: the
    buttons are 50px, 55px and 46px, exactly what they were, so the sticky
    bar's 76px spacer is still correct.
  * Disabled is a drawn-back rule in --pl-line with taupe text rather than a
    faded black one, so it cannot be mistaken for a button that failed to load.
  * `--wf-rule` is a single token. Changing that one line changes every button
    in the shop, label included.

Contrast did not get worse. Black on white is 21:1 for the label against a 4.5
floor, and 21:1 for the rule against the 3:1 floor for a UI edge.

Horizon's own buttons, which CSS here cannot reach, were moved to match in
`config/settings_data.json`: primary and secondary both #FFFFFF with #000000
text and a 1px #000000 border, and quick add the same. Variant selectors were
deliberately left alone, since inverting the selected one is how a customer
sees which size they picked.

The accent survives everywhere that is not a button: the trust icons, the open
thumbnail, the free shipping line, the circle hover and the announcement bar
are all still the logo's olive.

## Hebrew copy rules

Two rules the copy has to keep, both found by proofreading the live theme.

**The shekel goes after the number.** The shop's own money format is
`{{amount}} ₪`, so every price Liquid renders reads `199.99 ₪`. Eight
hand-written strings had it the other way round (`₪199`), which put two
currency conventions in the same eyeful on the product page: the real price
above, and the free-shipping line below it, disagreeing. Any new copy follows
the shop setting, not the writer's habit.

**Hebrew does not pluralise from a bare counter.** `{{ count }} מוצרים`
prints "1 מוצרים", which is wrong, and "2 מוצרים", which is stilted. The
collection header now spells one and two out and switches to digits from three:

    0 → 0 מוצרים      1 → מוצר אחד      2 → שני מוצרים      3 → 3 מוצרים

Checked against every collection in the shop: all-products 9, grooming 4,
clean-home 3, cats 2. Only cats changes visibly today, from "2 מוצרים" to
"שני מוצרים", but the singular case was a bug waiting for a one-product
collection or a filtered view.

Everything else in the theme proofread clean. Worth noting one phrase that is
correct but does stumble a reader for a beat: "משלימים את הערכה" reads as
"complete the kit" in context, but עֲרָכָה and הַעֲרָכָה are spelled the same
without niqqud. It was left as the merchant approved it.
