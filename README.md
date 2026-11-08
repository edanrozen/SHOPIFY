# DOFEK, Hebrew physio and comfort shop (Shopify)

    store      rgu1ui-ta.myshopify.com
    domain     dofek.shop          (tiny-bloom.com 301s to it)
    currency   ILS
    content    Hebrew, right to left, every page
    status     pre-launch, storefront password on

The shop used to be a pet grooming store called TinyBloom. It is not that any
more: the catalogue, the brand, the copy, the policies and the design were all
replaced. What is left of the old shop is listed under *Leftovers* at the
bottom, because knowing where it still is matters more than pretending it is
gone.

The old documentation is kept verbatim at `docs/archive/tinybloom-2026.md`.
Nothing in it describes the shop as it is today.

## The catalogue

Five products, all suffixed `dofek-` so the theme can recognise its own
product pages from the template name alone.

| product | template suffix | collection |
|---|---|---|
| מגן ברך DOFEK – תמיכה ויציבות בכל צעד | `dofek-knee` | `knee` |
| מדרסי DOFEK לעיסוי כף הרגל – נוחות ותמיכה בכל צעד | `dofek-insoles` | `foot` |
| גרבי במבוק לעבודה – נוחות ורכות לאורך כל היום | `dofek-socks` | `foot` |
| נעלי יחפנות DOFEK – חופש בכל צעד | `dofek-barefoot` | `shoes` |
| נעלי יחפנות לקרקוע של DOFEK | `dofek-grounding` | `shoes` |

`all-products` carries all five. The header menu is `pluma-main`, which links
the three category collections; the footer menu is `footer`.

## Layout of this repository

    theme/              the base theme: Horizon, plus the shared layer
                        (pluma.css, pluma-2.css, pluma.js) every variant
                        inherits
    variants/showcase/  the wf-* section library the product pages are built
                        from
    variants/dofek/     the DOFEK overlay: palette, home page, the five
                        product templates, the group files, theme settings
    variants/nuve/      an earlier variant, kept for reference
    tools/pdp-preview/  the test harness
    docs/archive/       the previous shop's documentation

A variant directory holds only what differs from the base. Everything it does
not name, the cart, the search, the account pages, is inherited unchanged.

## The theme

    DOFEK · שחור ולבן (לא לפרסום)    187986182196, unpublished
    preview https://dofek.shop/?preview_theme_id=187986182196

**It is not published.** The live theme is still `TinyBloom · טסט תכלת ולבן`,
187628781620. Publishing is the merchant's call and is done from the admin;
nothing in this repository does it.

Two colours, `#0A0A0A` and `#FFFFFF`, with five greys that are each black at a
stated opacity over the page. `variants/dofek/wf-tokens.css` lists every one
with the contrast ratio it carries, all of them computed rather than guessed.
Rerun them against any change before shipping it.

Direction is written server side, in `theme/layout/theme.liquid`, onto `<html>`
before a byte of `<body>` parses. It does not read the locale on its own: the
shop's only published locale is still `en`, which is a setting nobody changed
rather than a statement about the content, and trusting it sent every Hebrew
page out left to right. The layout states `rtl` and `he` and lets the locale
confirm it. `tools/pdp-preview/dir-test.js` asserts that.

Stylesheets are split by transport, not by design: a single document cannot
cross the Admin API past about 16KB. `pluma.css` and `pluma-2.css` are one
sheet in two files and must load in that order. The same is true of
`wf-tokens.css`, `wf.css` and `wf-shop.css`. `snippets/stylesheets.liquid`
decides which template pays for what.

## Testing

    node tools/pdp-preview/render.js   variants/dofek/product.dofek-knee.json
    node tools/pdp-preview/pdp-test.js <rendered.html> variants/dofek/df-pdp.js
    node tools/pdp-preview/dir-test.js

`pdp-test.js` drives the rendered page in Chromium: the option pickers, the
gallery, the lightbox, the quantity floor, the sticky buy bar, overflow at six
widths, a 14px type floor, a 44px tap target floor, a readable measure at
1280, and a scan that fails on any Latin word in the copy that is not a name.
`dir-test.js` runs the layout's liquid header against four locales and asserts
what lands on `<html>`.

Chromium lives at `/opt/pw-browsers/chromium` in the dev container and
`playwright install` is not available there, so the harness uses that binary
when it exists and the bundled one anywhere else.

## House rules

* Never invent product data, reviews, ratings, figures or claims. If it is not
  in the merchant's own material or in the photographs, it does not go on the
  page.
* Never create, replace, edit or delete an image. Existing media may be placed
  and may be detached from a product; it is never generated.
* Never publish a theme. The merchant publishes.
* Never change a price, a shipping charge, a discount or a payment setting.
* Sizes are named at the size picker and nowhere else.
* No dashes or separator lines inside Hebrew copy.

## Leftovers

Everything below is from the pet shop and still exists. None of it is reachable
from the storefront, and none of it can be removed through the Admin API, which
blocks `themeFilesDelete` and `themePublish`. Each line is a manual job in the
admin.

* **The published theme is a TinyBloom one.** Until the merchant publishes
  187986182196, every page a customer sees is the old shop.
* Nine dead product templates on the DOFEK theme: `product.bloom.json`,
  `product.clipper.json`, `product.comb-daily.json`, `product.comb-pro.json`,
  `product.glove.json`, `product.roller-wood.json`, `product.roller-xl.json`,
  `product.scratcher.json`, `product.toy.json`. No product points at any of
  them; all five carry a `dofek-` suffix.
* Twenty-four `sections/pl-*.liquid` from the previous design, unused by any
  template on this theme.
* Three unused stylesheets, `pdp.css`, `pl-story.css` and `tb-fit.css`. No
  template requests them.
* Fifteen of the eighteen themes in the admin are still named `TinyBloom · …`.
* `variants/nuve/` and `variants/showcase/` documentation, and the archive
  under `docs/archive/`, describe the old shop on purpose.
