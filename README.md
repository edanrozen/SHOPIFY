# PLUMA — חנות טיפוח פרווה לחיות מחמד (Shopify)

חנות Shopify בעברית (RTL) למוצרי טיפוח פרווה לכלבים ולחתולים, בנויה כ**תבנית תצוגה מקדימה שאינה מפורסמת**
על גבי ערכת הנושא Horizon.

## Preview

| | |
|---|---|
| Store | `tinybloom.us` (Tiny bloom · ILS · he-IL) |
| Theme | `PLUMA · טיפוח פרווה — תצוגה מקדימה (לא מפורסם)` |
| Theme ID | `154949287988` |
| Preview URL | https://tinybloom.us/?preview_theme_id=154949287988 |
| Status | **UNPUBLISHED** — the live theme is still `Refresh` |

## What's in the store

**Products** (all `ACTIVE`, published to Online Store, price `0.00` on purpose — prices not decided yet):

| Handle | Product |
|---|---|
| `pluma-clean-pro` | פלומה קלין פְּרוֹ — מסיר שיער חיות עם ידית עץ |
| `pluma-clean-xl` | פלומה קלין XL — מסיר שיער לריפודים ושטיחים |
| `pluma-glide-comb` | פלומה גלייד — מסרק טיפוח מקצועי לפרווה |
| `pluma-nest` | פלומה נסט — מיטת נייר מתקפלת לחתול |
| `pluma-dart` | פלומה דארט — צעצוע רובוטי על שלט לחתול |

**Collections:** `grooming` (טיפוח פרווה) · `home-rest` (בית ומנוחה) · `play` (משחק והעשרה)

**Navigation menu:** `pluma-main`

## Theme source

`theme/` is a snapshot of the files this project added or replaced in the preview theme.
The deployed theme is the source of truth; to pull it down in full:

```bash
shopify theme pull --store tinybloom.us --theme 154949287988
```

### Files added

| File | Purpose |
|---|---|
| `assets/pluma.css` | Design tokens, typography, buttons, reveal animation, RTL rules |
| `assets/pluma.js` | IntersectionObserver scroll reveal (progressive enhancement) |
| `sections/pl-hero-full.liquid` | Full-bleed lifestyle hero (used on the homepage) |
| `sections/pl-hero.liquid` | Split hero (alternative, kept available in the editor) |
| `sections/pl-showcase.liquid` | "Dogs and cats" editorial band, two lifestyle images |
| `sections/pl-marquee.liquid` | Trust ticker |
| `sections/pl-products.liquid` | Product grid (hides ₪0 prices behind a "coming soon" pill) |
| `sections/pl-problem.liquid` | Problem / stats |
| `sections/pl-ritual.liquid` | 3-step grooming routine |
| `sections/pl-bundle.liquid` | Bundle cross-sell panel |
| `sections/pl-reviews.liquid` | Testimonials |
| `sections/pl-faq.liquid` | FAQ accordion |
| `sections/pl-cta.liquid` | Waitlist email capture (`{% form 'customer' %}`) |

### Files replaced

| File | Change |
|---|---|
| `snippets/stylesheets.liquid` | Loads `pluma.css` / `pluma.js`, stamps `dir="rtl"`, loads Hebrew webfonts |
| `snippets/price.liquid` | Shows "המחיר יעודכן בקרוב" while a product's price is `0` |
| `sections/header-group.json` | Hebrew announcements, `pluma-main` menu, brand colors |
| `sections/footer-group.json` | Hebrew footer + waitlist signup |
| `templates/index.json` | Homepage composed from the `pl-*` sections |
| `config/settings_data.json` | Brand palette, radii, type scale |

## Before launch

1. Confirm the photo mapping (see `Product images` below).
2. Set real prices — then delete the `pre_launch` branch in `snippets/price.liquid`.
3. Replace the sample testimonials in `templates/index.json` with real reviews.
4. Fill in shipping, returns and privacy policies (linked from the footer).
5. Publish the theme.

## Product images

Eight photos were uploaded to Shopify Files and wired up as follows:

| File | Where it is used |
|---|---|
| `…17.24.23-2.jpg` | `pluma-nest` + `home-rest` collection |
| `…17.24.24-3.jpg` | `pluma-glide-comb` |
| `…17.24.24-2.jpg` | `pluma-clean-pro` + `grooming` collection |
| `…17.24.24-4.jpg` | `pluma-clean-xl` |
| `…17.29.26.jpg` | `pluma-dart` + `play` collection |
| `…17.26.53.jpg` | Homepage hero background |
| `…17.24.23.jpg` | Showcase band, image 1 |
| `…17.24.24.jpg` | Showcase band, image 2 |

The session could not fetch `cdn.shopify.com` (blocked by the environment's egress proxy), so
the mapping was inferred from each file's pixel dimensions rather than from viewing the images.
Verify it on the preview and swap in the theme editor / product media if anything is off.
