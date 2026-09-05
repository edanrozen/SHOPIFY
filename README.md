# PLUMA — חנות טיפוח פרווה לחיות מחמד (Shopify)

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

| Handle | Product | Reviews |
|---|---|---|
| `pluma-clean-pro` | פלומה קלין פרו, מסיר שיער עם ידית עץ | 65 |
| `pluma-glide-comb` | פלומה גלייד, מסרק טיפוח מקצועי | 62 |
| `pluma-clean-xl` | פלומה קלין XL, מסיר שיער לריפודים | 55 |
| `pluma-clean-mini` | פלומה קלין מיני, מסיר שיער נייד לתיק ולרכב | 50 |
| `pluma-nest` | פלומה נסט, מיטת נייר מתקפלת לחתול | 46 |
| `pluma-nest-maxi` | פלומה נסט מקסי, פינת מנוחה מתקפלת | 42 |
| `pluma-tower` | פלומה טאוור, עמוד גירוד ומשחק לחתול | 38 |
| `pluma-dart` | פלומה דארט, צעצוע רובוטי על שלט | 28 |

386 reviews in total, which is the number the homepage quotes in the hero, in the story
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
| `pl-promise` | The guarantee band on ink: returns, warranty, shipping, support |
| `pl-story` | Brand story, three numbers, one lead photo and three supporting frames |
| `pl-row` | Product row, grid or horizontal rail, reads ratings from metafields |
| `pl-showcase` | Dogs versus cats editorial band |
| `pl-ritual` | Three step grooming routine |
| `pl-reviews` | Homepage testimonials |
| `pl-faq` | FAQ accordion |
| `pl-cta` | Waitlist capture (`{% form 'customer' %}`) |
| `pl-marquee` | Trust ticker |
| `pl-product-main` | PDP: gallery, rating, highlights, buy box or waitlist, trust row |
| `pl-product-tabs` | PDP: description, specs, in the box, shipping, returns |
| `pl-product-reviews` | PDP: average, histogram, review list with show more |
| `pl-related` | PDP: cross sell rail |
| `pl-collection` | Collection page with image hero and product grid |
| `pl-hero`, `pl-hero-full`, `pl-categories`, `pl-products`, `pl-problem`, `pl-bundle` | Earlier variants, still available in the editor but not used by the homepage |

### Snippets

`pl-card` (the one product card used everywhere), `pl-stars`, `pl-plus`.

### Replaced Horizon files

`snippets/stylesheets.liquid` (loads `pluma.css`/`pluma.js`, stamps `dir="rtl"`, loads the
Hebrew webfonts), `snippets/price.liquid` (waitlist label while a price is `0`),
`sections/header-group.json`, `sections/footer-group.json`, `config/settings_data.json`.

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
| `…17.26.53.jpg` | `pluma-tower` |
| `…17.29.26.jpg` | `pluma-dart`, `play` cover |

The session could not fetch `cdn.shopify.com` (blocked by the environment's egress proxy), so the
mapping was inferred from each file's pixel dimensions and upload batch rather than from viewing
the images. Three of them had never been named by the merchant, and the products built around
them (`pluma-clean-mini`, `pluma-nest-maxi`, `pluma-tower`) carry titles, copy and specs written
from that inference. Check those three first on the preview; renaming a product and rewriting its
description does not touch the theme.

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
