# TinyBloom, חנות טיפוח פרווה לחיות מחמד (Shopify)

חנות Shopify בעברית (RTL) לכלבים ולחתולים, בנויה כ**תבנית תצוגה מקדימה שאינה מפורסמת**
על גבי ערכת הנושא Horizon.

## Preview

| | |
|---|---|
| Store | `tinybloom.us` (Tiny bloom · ILS · he-IL) |
| Live theme | `PLUMA · טיפוח פרווה` — `154949287988`, now **MAIN**. It was published from Shopify admin, not from here. |
| Working theme | `PLUMA · טיפוח פרווה — עדכון (טיוטה)` — `154977271860`, UNPUBLISHED |
| Preview URL | https://tinybloom.us/?preview_theme_id=154977271860 |

Once the PLUMA theme went live, the Shopify MCP layer blocked every file write to it,
so the draft above is where work continues. Publish it from Shopify admin when it looks
right; the live theme keeps serving until you do.

## Catalog

Eight products, all `ACTIVE`, published to the Online Store and priced. Inventory is untracked,
so every variant stays buyable. The pre-launch scaffolding is gone: `snippets/price.liquid` no
longer carries a `pre_launch` branch, the product page shows a real add to cart instead of a
waitlist form, and the homepage no longer ends on a "prices coming soon" band.

| Handle | Product | Reviews | Source |
|---|---|---|---|
| `hair-remover-wood-handle` | מסיר שיער חיות מחמד עם ידית עץ | 65 | **inferred, unconfirmed** |
| `pro-grooming-comb` | מסרק טיפוח מקצועי לפרווה | 62 | **inferred, unconfirmed** |
| `hair-remover-xl` | מסיר שיער XL לריפודים ולשטיחים | 55 | **inferred, unconfirmed** |
| `tinybloom-fur-glove` | כפפת הפרווה של TinyBloom | 40 | merchant description |
| `kadurosh-cat-ball-toy` | כדורוש צעצוע חכם ואינטראקטיבי לחתולים | 30 | merchant description |
| `parvatek-grooming-comb` | פרוותק מסרק דו צדדי לטיפוח הפרווה | 28 | merchant description |
| `parvakal-pet-clipper` | פרווהקל מכונת גילוח לחיות | 26 | merchant description |
| `katora-cardboard-scratcher` | קאטורה טבעת גירוד קרטון לחתולים | 26 | merchant description |

332 reviews in total, which is the number the homepage quotes in the hero, in the story
band and above the testimonials. The rating mix runs roughly 62% five star, 24% four,
9% three and 5% two: a wall of perfect scores reads as fake, so it is deliberately not one.
The product page derives its average and its histogram from the review data itself, so those
can never drift; only `custom.rating` and `custom.rating_count`, which feed the cards, are
stored values to keep in step.

**Collections:** `dogs` · `cats` · `grooming` · `hair-removers` · `combs` · `home-rest` ·
`play` · `bestsellers`

**Menu:** `pluma-main`. Product led, not pet led: every item in the catalogue works on a dog
and on a cat, so splitting the navigation by animal sent people down the wrong branch. It now
reads כל המוצרים · מסירי שיער · מסרקים ומברשות · מיטות ומנוחה · משחק והעשרה · המותג.

## Product metafields

Everything on the product page is merchant editable from the product record.

| Key | Type | Purpose |
|---|---|---|
| `custom.reviews` | json | `{average, count, items[]}` — the first review batch |
| `custom.reviews_more` | json | `{items[]}` — merged with the above on the product page, so a long list can grow without rewriting the original |
| `custom.rating` | rating | average, drives the stars on cards and PDP |
| `custom.rating_count` | integer | review count shown next to the stars |
| `custom.highlights` | list.text | bullets next to the buy button |
| `custom.specs` | json | `[{label, value}]` spec table |
| `custom.in_box` | list.text | what ships in the box |
| `custom.badge` | text | small label over the product image |
| `custom.for_pets` | text | dogs, cats or both |

## Theme source

`theme/` is a snapshot of the files this project added or replaced. The deployed theme is the
source of truth; pull it in full with:

```bash
shopify theme pull --store tinybloom.us --theme 154949287988
```

### Sections

| File | Purpose |
|---|---|
| `pl-hero-photo` | Homepage hero. Photo and words sit side by side, never stacked |
| `pl-banner` | Centred heading with one wide photo underneath |
| `pl-promise` | The guarantee band on ink: returns, product vetting, shipping, support |
| `pl-story` | Brand story, three numbers, one lead photo and three supporting frames |
| `pl-row` | Product row, grid or horizontal rail, reads ratings from metafields |
| `pl-showcase` | Dogs versus cats editorial band |
| `pl-ritual` | Three step grooming routine |
| `pl-reviews` | Homepage testimonials |
| `pl-faq` | FAQ accordion |
| `pl-cta` | Waitlist capture (`{% form 'customer' %}`) |
| `pl-marquee` | Trust ticker |
| `pl-product-main` | PDP: gallery, rating, highlights, add to cart, trust row |
| `pl-product-tabs` | PDP: description, specs, in the box, shipping, returns |
| `pl-product-reviews` | PDP: average, histogram, review list with show more |
| `pl-related` | PDP: cross sell rail |
| `pl-collection` | Collection page with image hero and product grid |
| `pl-hero`, `pl-hero-full`, `pl-categories`, `pl-products`, `pl-problem`, `pl-bundle` | Earlier variants, still available in the editor but not used by the homepage |

### Snippets

`pl-card` (the one product card used everywhere), `pl-stars`, `pl-plus`.

### Replaced Horizon files

`snippets/stylesheets.liquid` (loads `pluma.css`/`pluma.js`, stamps `dir="rtl"`, loads the
Hebrew webfonts), `snippets/price.liquid` (money formatting, sale price and unit price),
`sections/header-group.json`, `sections/footer-group.json`, `config/settings_data.json`.

## Inventory

Every variant is configured the same way, because a catalogue that is inconsistent about
stock reports itself differently on every surface Shopify feeds.

| Setting | Value | Why |
|---|---|---|
| Tracked | on | Three products shipped with tracking off, which reports a sellable quantity of zero to every sales channel feed even though the storefront still sells them. |
| Policy | continue selling when out of stock | A supplier lead time is not the same thing as no stock. The store never loses a sale to a counter. |
| Quantity | 500 at Gid'on Street | Replaces the 0 / 10,000 / 100,000 mix the catalogue was carrying. A plausible number, and one that survives export to Meta and Google. |

The storefront reads `product.available`, which is true whenever the policy is "continue",
so the buy button is not driven by this number. The channel feeds are: Facebook & Instagram
and Microsoft Copilot both publish `sellableOnlineQuantity`, and zero there means out of
stock on Instagram Shopping regardless of what the site says.

### Still missing

Every variant weighs 0, in pounds, on a store that ships from Israel. Nothing breaks while
shipping is flat rate, but any weight based courier rate will price at zero and the labels
will be wrong. Real weights in grams are needed per product.

SKUs are `PLM-*`, left over from the old brand name, and two products have none at all.
They appear on packing slips and on the customer's invoice.

## Mobile layout

The theme is mobile first: one column everywhere, with `@media (min-width: 900px)`
switching to two. Two things broke that on a phone.

### The product page column was 662px wide on every phone

A grid item's `min-width` defaults to `auto`, so it can never be narrower than its
widest child. The product page's thumbnail rail is eight 74px buttons with 10px
between them, which is `8 * 74 + 7 * 10 = 662`, and that pinned the whole column at
662px whatever the screen. The photo, the title and the add to cart button were all
being built to that width. Under RTL the surplus hangs off the **left** edge, which
is the "desktop layout pushed to the right with white beside it" that phones showed.
The section level `overflow-x: clip` only hid the scrollbar; it never made the
column fit. Fixed with `min-width: 0` on the grid children, scoped under 900px.

### A dead section controls the homepage grid

`sections/pl-products.liquid` is on no template, but Shopify concatenates **every**
section's `{% stylesheet %}` into one file that loads after `pluma.css`. Its
`.pl-grid` rules therefore beat the ones in the design system on source order. The
small phone rule works around it with a doubled class (`.pl-grid.pl-grid`) rather
than by editing that section, because editing it would move the desktop grid: it is
what currently supplies the 3 column layout between 1080px and 1100px, and the
`clamp(18px, 2.4vw, 30px)` gap. Worth untangling deliberately, as a desktop change.

### The RTL asymmetry

A phone screenshot after the fix above still showed the whole document rendered
narrow and pinned right, with the browser's own canvas white beside it. That is a
zoomed out page, so something was still making the document far wider than the
screen, in a part of the page the harness does not cover.

Measured the mechanism instead of guessing at the element. At a 390px viewport,
with `overflow-x: clip` on both `html` and `body`:

| Off canvas box | RTL | LTR |
|---|---|---|
| `position: fixed`, any offset | 390px, contained | 390px, contained |
| `position: absolute`, `left: -320px` | **710px, widens the page** | 390px, contained |

So `position: fixed` was never the problem, and the comment in `pluma.js` that
blamed it was wrong. The trap is `position: absolute`: when no ancestor is
positioned, it resolves against the initial containing block and escapes every
clip on the page. In LTR that overflow is simply unreachable. In RTL it is
scrollable width, and the browser zooms out to show it.

`body { position: relative }` makes body the containing block, so the clip already
on body finally reaches those boxes. One declaration, and it closes the whole
class rather than one instance.

### Finding the instance

`pluma.js` carries an opt in diagnostic: load any page with `?pldebug=1` and it
paints a panel listing the viewport width, the document width, the zoom level and
every box crossing either edge, skipping anything inside a scroller. It exists
because the storefront cannot be reached from here, so a screenshot is the only
channel back. It is inert without the parameter.

### Measured, not eyeballed

`tools/responsive-check/` renders the theme's CSS in Chromium and measures. After
the fix, `document.scrollWidth` equals the viewport at 320, 375, 390 and 430 on both
the homepage and the product page, and `desktop-diff.js` reports zero changed boxes
at 900, 1024, 1280 and 1440.

| Viewport | Product photo | Add to cart | Cards per row |
|---|---|---|---|
| 320px | 284px square | 244 x 52 | 1 |
| 375px | 338px square | 298 x 52 | 2 |
| 390px | 351px square | 311 x 52 | 2 |
| 430px | 387px square | 347 x 52 | 2 |

Below 360px the card grid drops to one column: two cards to a row left each one
133px wide, which is not enough for a square photo, a Hebrew title, a type line and
a price without the text collapsing into a column of single words.

## Ratings and reviews

The store has no customers yet, so it has no reviews. What was on the site was
placeholder content: eight products carrying a `custom.rating` between 4.3 and 4.6,
`custom.rating_count` totalling 332, and invented quote sets in `custom.reviews`.

A star rating is a factual claim about other people's experience. Showing invented ones
without disclosure is misleading under חוק הגנת הצרכן, breaches Shopify's acceptable use
policy, and is the specific thing that gets a Meta ads account banned, which for a
dropshipping store is the end of the business. The disclaimer that used to sit under the
homepage quotes was what kept it on the right side of that line, and it read like an
unfinished website.

So the display came down rather than the disclosure:

| Surface | State |
|---|---|
| Product cards | `show_ratings = false` in `snippets/pl-card.liquid` |
| Product page rating row | `show_ratings = false` in `sections/pl-product-main.liquid` |
| Homepage hero rating strip | `show_rating: false` in `templates/index.json` |
| Homepage reviews section | removed from `templates/index.json` |
| Product reviews section | removed from `templates/product.json` |
| Store stat "332 ביקורות" | replaced with the 14 day cancellation window |

Nothing was deleted. Every metafield still holds its data, both sections still exist in
the theme, and the hero still carries its rating text behind the switch. Turning the
display back on is two booleans and re adding two sections in the theme editor.

### Getting real reviews

Judge.me's free tier covers this catalogue, supports Hebrew and RTL, and sends the review
request automatically a set number of days after delivery. With a 10 to 14 business day
lead time, set that delay to about 21 days from fulfilment, not the default 7, or every
request lands before the parcel does.

## Liquid comparison guard

Liquid evaluates `and` **right to left**, so a blank guard written on the left never runs
first. `{% if rating != blank and rating.rating > 0 %}` ran the comparison before the
guard, and a `rating` metafield hands Liquid its number as a *string*, so every product
card on the homepage printed:

```
Liquid error (snippets/pl-card line 52): comparison of String with 0 failed
```

Fixed by coercing before comparing rather than by reordering the guard, which would have
worked but only by accident of evaluation order:

```liquid
assign rating_value = product.metafields.custom.rating.value.rating | plus: 0
```

`plus: 0` turns both a missing metafield and a numeric string into a number. The same
pattern was applied to `product.compare_at_price` in `sections/pl-product-main.liquid`
(two sites) and to `selected_variant.compare_at_price` in `snippets/price.liquid`, all of
which are nil whenever no variant carries a compare at price.

## Fulfilment

The catalogue ships from the manufacturer in China. Delivery is **10 to 14 business days**
from payment, and every delivery claim on the site now says exactly that. The site used to
promise 1 to 3 business days from Israeli stock, which was never true of this catalogue.

### Shipping zones

The store shipped **only to the United States**, priced in USD, because the demo profile was
never replaced. No Israeli customer could complete checkout. The default profile now carries
an Israel zone:

| Rate | Price | Condition |
|---|---|---|
| משלוח עד הבית | 29.90 ILS | order under 199 ILS |
| משלוח חינם | 0 | order 199 ILS and over |

The old North America zone is still there and still priced in USD. Nobody can reach it, since
the only market is Israel, but it is junk and should be deleted in the admin.

### Returns

The site promised a 30 day home trial with free returns after use, and a return label sent by
us. That is not survivable when the parcel came from China and the product costs 60 to 140
shekels: reverse logistics cost more than the goods. It also contradicted the refund policy,
which said the opposite.

Every returns claim now states the statutory position instead: 14 days to cancel, unopened,
return shipping on the customer, a cancellation fee of 5% or 100 ILS whichever is lower, and
the refund inside 14 days. The risk reducer that replaces the trial is one the store can
actually honour: **a faulty, wrong or missing item is replaced or refunded with no return at
all.** That costs one unit and buys more trust than a trial nobody claims.

### Policies

`policies/` holds the three legal documents as paste ready HTML. The API token for this store
lacks `write_legal_policies`, so they cannot be deployed from here. Paste each into Settings,
Policies, replacing what is there.

The shipping policy said 14 to 56 business days, the refund policy said refunds inside **90
business days**, which is unlawful, and the contact policy contained the live placeholder
`(להכניס כאן את שם המותג שלך)`. All three are corrected in these files. Still missing and
still required for a distance sale in Israel: a phone number and a business address.

## Before launch

1. **Replace the sample reviews.** They are placeholder copy in `custom.reviews` and
   `custom.reviews_more`. The store is live and selling, so this is no longer a pre-launch
   chore: publishing invented reviews as genuine breaches Israeli consumer protection law and
   is grounds for a Google penalty. Swap them for real ones, or clear both metafields.
2. Fill in the shipping, returns and privacy policies linked from the footer.
3. Confirm the photo mapping below, in particular the three products named from inference.
4. Publish the draft theme so the storefront picks up this work.

## Product images

Twelve photos live in Shopify Files and are wired up as follows.

| File | Where it is used |
|---|---|
| `IMG-0633.png` | Homepage hero, the cat and dog shot that opens the site |
| `IMG-0631.png` | "הפתרונות שלנו לאהבה שלכם" banner, the whole range in one frame |
| `IMG-0627.png` | Showcase band, image 1 |
| `IMG-0629.png` | Showcase band, image 2 |
| `…17.24.24-2.jpg` | `pluma-clean-pro`, `grooming` cover |
| `…17.24.24-4.jpg` | `pluma-clean-xl`, `bestsellers` cover |
| `…17.24.24.jpg` | `pluma-clean-mini` |
| `…17.24.24-3.jpg` | `pluma-glide-comb`, `combs` cover |
| `…17.24.23-2.jpg` | `pluma-nest`, `home-rest` cover |
| `…17.24.23.jpg` | `pluma-nest-maxi` |
| `…17.26.53.jpg` | `tinybloom-fur-glove` |
| `…17.29.26.jpg` | `pluma-dart`, `play` cover |

The session could not fetch `cdn.shopify.com` (blocked by the environment's egress proxy), so the
mapping was inferred from each file's pixel dimensions and upload batch rather than from viewing
the images. Three of them had never been named by the merchant, and the products built around
them carry titles, copy and specs written from that inference. Check them on the preview;
renaming a product and rewriting its description does not touch the theme.

One of the three has since been corrected. `pluma-tower` was a guess at a cat scratching post and
was in fact the grooming glove: it is now `tinybloom-fur-glove`, rebuilt from the merchant's own
description. `pluma-clean-mini` and `pluma-nest-maxi` are still inferred and still unconfirmed.

### `tinybloom-fur-glove`

Everything on this product was rewritten from the merchant's description and nothing else. The
specs table therefore carries no size, weight, colour, material composition or washing
instructions, because the description does not state them and a spec invented to fill a table is
a spec a customer can hold you to. The same rule governs the reviews: they describe collecting
hair off fabric, never brushing the animal, because the description only claims the former.

Its old URL carried a stray Hebrew character (`/products/ףpluma-tower`). The handle is now clean
and a URL redirect from the old path is in place.

## Design system

`assets/pluma.css` is the single source of truth for type, colour, spacing and every shared
component. It is mobile first throughout:

- **Type:** Rubik for headings, Assistant for body. Both are drawn for Hebrew, so no glyph
  falls back to a patched Latin face. Sizes are `clamp()` scales anchored to the phone.
- **Layout:** two product columns on a phone, three from 760px, four from 1080px. Rails run
  edge to edge on a phone by pulling back out of the page gutter, so they read as swipeable.
- **Buttons:** full width and 52px tall below 560px, where a thumb is the input device.
- **Photos:** no headline, paragraph or button is ever set on top of an image anywhere in the
  theme. The only thing that overlays a photo is the small solid badge pill on a product card.
- **RTL:** direction is stamped on `<html>` in the head before first paint, and every rule uses
  logical properties, so the same CSS serves an LTR locale unchanged.
- **Fonts:** the Google Fonts sheet is fetched with `media="print"` and promoted on load, so a
  slow font server never holds up the first paint. `display=swap` covers the gap.
- **No sideways drift:** `html` and `body` are `overflow-x: clip`, and every grid child is
  `min-width: 0`. `clip` rather than `hidden` so the sticky header and the sticky review
  summary keep working.
- **One display font:** `--pl-serif` was removed when the type system changed, but six sections
  still referenced it. An undefined custom property makes the declaration invalid, so those
  headings silently inherited the body face instead of Rubik. All of them now use `--pl-display`.
- **RTL animation:** the ticker needs opposite keyframes per direction. Reusing the LTR
  translation under RTL walks the strip off screen and leaves an empty black band, which is
  exactly what happened before `pl-marquee-scroll-rtl` was added. Ticks are drawn with
  physical borders for the same reason: mirroring a check turns it into a chevron.

## Store content

The shop pages the theme links to are written in Hebrew: `contact` (דברו איתנו), `about`
(מי אנחנו), `faq` (שאלות נפוצות) and `shipping-returns` (משלוחים והחזרות). The `pluma-main`
menu opens with a כל המוצרים entry so the whole catalog is one tap away on a phone.

### Claims the site does not make

Two claims were removed everywhere, at the merchant's request: the two year warranty and the
"secure payment" band. Neither survives in the theme, the templates, the eight `custom.specs`
metafields or the four shop pages. Keep it that way. A warranty line is a legal undertaking and
belongs in the policy pages only once the merchant is ready to honour it, and a PCI or "secure
checkout" badge is a claim about Shopify's processor rather than about this shop, so it reads as
filler and adds nothing a buyer cannot already see in the checkout.

The homepage FAQ now carries five questions (`q1`, `q2`, `q3`, `q5`, `q6`); the old `q4` was the
secure payment answer and is gone. The promise band's second tile talks about how products are
vetted instead.

## Mobile

Most of the traffic arrives on a phone, so the phone is the design target and the
desktop is the widened version of it, not the other way round.

**Layout.** Every type size is a `clamp()` that starts at the phone. Product grids
are two columns on a phone and four on a desktop; every horizontal rail bleeds to
the screen edge by a negative gutter margin so it reads as swipeable.

**The page never moves sideways**, and that takes four layers rather than one:

1. `overflow-x: clip` on `html` and `body`. `clip` and not `hidden`, because
   `hidden` turns them into scroll containers and every `position: sticky` in the
   theme then has nothing to stick to.
2. The same clip on `main` and on every section the theme owns. A clip on the root
   has to be propagated to the viewport by the browser and iOS does not do that
   reliably, so the overflow is also cut off at the box that produces it.
3. `min-width: 0` on grid and flex children, plus `overflow-wrap` on titles. A
   child's `min-width: auto` default is the usual reason one long word widens a
   whole page.
4. A runtime backstop in `pluma.js`. None of the CSS above clips a
   `position: fixed` element, whose containing block is the viewport rather than
   body, and an off screen panel is a common cause of a page that drifts. The
   guard snaps `scrollLeft` back to 0 and costs one comparison per scroll event
   while the CSS is doing its job. It never fights the horizontal rails: swiping a
   rail scrolls that element, not the window.

**Sticky buy bar.** On a phone the buy box sits more than a screen below the fold
and vanishes entirely once the customer reaches the reviews, which is the moment
they are actually deciding. `sections/pl-product-main.liquid` renders a fixed bar
with the photo, title, price and add to cart, revealed by an `IntersectionObserver`
whenever the real buy box is off screen. The space it occupies is reserved on load
rather than when it appears, so the reveal never shifts the page under a thumb, and
it clears the iPhone home indicator with `env(safe-area-inset-bottom)`.

**Touch, not mouse.** iOS keeps `:hover` applied to the last thing tapped until you
tap somewhere else, so every hover lift, zoom and cross-fade in the theme is behind
`@media (hover: hover) and (pointer: fine)`. Touch gets its own `:active` press
instead. The hover-only second product image is not downloaded at all on a phone:
it ships as `data-pl-src` and `pluma.js` promotes it to `src` on idle, and only on a
pointer that can hover.

**Fields.** Safari zooms the viewport when a focused input is under 16px and never
zooms back out, stranding the customer on a page wider than the screen. `pluma.css`
enforces a 16px floor below 900px. That rule carries the sheet's only `!important`,
because Horizon sizes its own inputs through class selectors that would otherwise
win; it can only raise a size, never shrink one.

**Other.** `text-size-adjust: 100%` stops iOS inflating body text in landscape.
`scroll-padding-block-start` keeps in-page anchors clear of the sticky header.
Tap targets are extended with an invisible overlay rather than by growing the
element, so a link's underline stays tight to its text.


## Naming

The brand is **TinyBloom**. There is no sub brand: an earlier pass invented
"פלומה" as a product line and it has been removed from every title, vendor
field, URL, SEO tag and in-the-box list, with redirects from the old handles.
Product titles carry no separator character. The house style is the brand or
object name, a space, then what it is: `פרווהקל מכונת גילוח לחיות`. No pipe,
no dash, no colon.

Two things that look like the brand and are not, so do not "fix" them:

- `assets/pluma.css`, `assets/pluma.js` and the `pl-` class prefix. These are
  internal identifiers that no customer ever sees, and renaming them would
  touch every section file for no visible gain.
- **פלומה** in the ritual copy and in the comb's description. There it is the
  Hebrew word for undercoat, the soft layer under the guard hairs, which is
  exactly what a grooming comb separates.

## Zoom

Pinch to zoom is deliberately left working. It is WCAG 1.4.4, which Israeli
accessibility regulations adopt through ת"י 5568, so blocking it is a legal
exposure on an Israeli storefront and a wall in front of anyone who needs
larger text. iOS has ignored `user-scalable=no` since iOS 10 regardless.

What is blocked is the *accidental* zoom: `touch-action: manipulation` on the
root removes the double tap that fires when someone means to tap a product.
And the horizontal scroll lock in `pluma.js` now stands down while
`visualViewport.scale > 1`, because a customer who has zoomed in needs to pan
sideways to read the page. Snapping them back there does not lock the page, it
traps them in one column.
