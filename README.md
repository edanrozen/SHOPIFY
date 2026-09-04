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

Five products, all `ACTIVE` and published to the Online Store. Prices are deliberately left at
`0.00`; every price slot renders a waitlist label instead.

| Handle | Product | Reviews |
|---|---|---|
| `pluma-clean-pro` | פלומה קלין פרו, מסיר שיער עם ידית עץ | 17 |
| `pluma-clean-xl` | פלומה קלין XL, מסיר שיער לריפודים | 15 |
| `pluma-glide-comb` | פלומה גלייד, מסרק טיפוח מקצועי | 18 |
| `pluma-nest` | פלומה נסט, מיטת נייר מתקפלת לחתול | 16 |
| `pluma-dart` | פלומה דארט, צעצוע רובוטי על שלט | 16 |

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
| `pl-hero-full` | Full bleed lifestyle hero with focal point and adjustable scrim |
| `pl-categories` | Category tiles, two large plus four small |
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
| `pl-hero`, `pl-products`, `pl-problem`, `pl-bundle` | Earlier variants, still available in the editor |

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

Ten photos live in Shopify Files and are wired up as follows.

| File | Where it is used |
|---|---|
| `IMG-0627.png` | Homepage hero (desktop), `dogs` collection cover |
| `IMG-0629.png` | Homepage hero (mobile), `cats` collection cover |
| `…17.24.23-2.jpg` | `pluma-nest`, `home-rest` cover |
| `…17.24.24-3.jpg` | `pluma-glide-comb`, `combs` cover |
| `…17.24.24-2.jpg` | `pluma-clean-pro`, `grooming` cover |
| `…17.24.24-4.jpg` | `pluma-clean-xl`, `bestsellers` cover |
| `…17.29.26.jpg` | `pluma-dart`, `play` cover |
| `…17.26.53.jpg` | Available in Files, not currently placed |
| `…17.24.23.jpg` | Showcase band, image 1 |
| `…17.24.24.jpg` | Showcase band, image 2 |

The session could not fetch `cdn.shopify.com` (blocked by the environment's egress proxy), so the
mapping was inferred from each file's pixel dimensions rather than from viewing the images.
Verify it on the preview; every slot is an image picker in the theme editor.
