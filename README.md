# PLUMA — חנות טיפוח פרווה לחיות מחמד (Shopify)

חנות Shopify בעברית (RTL) לכלבים ולחתולים, בנויה כ**תבנית תצוגה מקדימה שאינה מפורסמת**
על גבי ערכת הנושא Horizon.

## Preview

| | |
|---|---|
| Store | `tinybloom.us` (Tiny bloom · ILS · he-IL) |
| Theme | `PLUMA · טיפוח פרווה — תצוגה מקדימה (לא מפורסם)` |
| Theme ID | `154949287988` |
| Preview URL | https://tinybloom.us/?preview_theme_id=154949287988 |
| Status | **UNPUBLISHED** — the live theme is still `Refresh` |

## Catalog

Eight products, all `ACTIVE` and published to the Online Store. Prices are deliberately left at
`0.00`; every price slot renders a waitlist label instead.

| Handle | Product | Reviews |
|---|---|---|
| `pluma-clean-pro` | פלומה קלין פרו, מסיר שיער עם ידית עץ | 17 |
| `pluma-clean-xl` | פלומה קלין XL, מסיר שיער לריפודים | 15 |
| `pluma-clean-mini` | פלומה קלין מיני, מסיר שיער נייד לתיק ולרכב | 16 |
| `pluma-glide-comb` | פלומה גלייד, מסרק טיפוח מקצועי | 18 |
| `pluma-nest` | פלומה נסט, מיטת נייר מתקפלת לחתול | 16 |
| `pluma-nest-maxi` | פלומה נסט מקסי, פינת מנוחה מתקפלת | 15 |
| `pluma-tower` | פלומה טאוור, עמוד גירוד ומשחק לחתול | 14 |
| `pluma-dart` | פלומה דארט, צעצוע רובוטי על שלט | 16 |

127 reviews in total, which is the number the homepage quotes in the hero and above the
testimonials. Keep the two in sync if you add or remove reviews.

**Collections:** `dogs` · `cats` · `grooming` · `hair-removers` · `combs` · `home-rest` ·
`play` · `bestsellers`

**Menu:** `pluma-main` (two level, with a grooming and a home/play submenu)

## Product metafields

Everything on the product page is merchant editable from the product record.

| Key | Type | Purpose |
|---|---|---|
| `custom.reviews` | json | `{average, count, items[]}` — the full review list |
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

1. **Replace the sample reviews.** They are placeholder copy in `custom.reviews`. Publishing
   invented reviews as genuine is illegal under Israeli consumer protection law and will get the
   store penalised by Google. Swap them for real ones, or clear the metafield.
2. Set real prices, then delete the `pre_launch` branch in `snippets/price.liquid`.
3. Fill in the shipping, returns and privacy policies linked from the footer.
4. Confirm the photo mapping below.
5. Publish the theme.

## Product images

Eleven photos live in Shopify Files and are wired up as follows.

| File | Where it is used |
|---|---|
| `IMG-0629.png` | Homepage hero, the cat and dog shot that opens the site |
| `IMG-0631.png` | "הפתרונות שלנו לאהבה שלכם" banner, the whole range in one frame |
| `IMG-0627.png` | Showcase band, image 1 |
| `…17.24.24-2.jpg` | `pluma-clean-pro`, `grooming` cover |
| `…17.24.24-4.jpg` | `pluma-clean-xl`, `bestsellers` cover |
| `…17.24.24.jpg` | `pluma-clean-mini` |
| `…17.24.24-3.jpg` | `pluma-glide-comb`, `combs` cover |
| `…17.24.23-2.jpg` | `pluma-nest`, `home-rest` cover |
| `…17.24.23.jpg` | `pluma-nest-maxi` |
| `…17.26.53.jpg` | `pluma-tower`, and showcase band image 2 |
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
