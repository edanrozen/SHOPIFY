# DOFEK

The physio shop, black and white. Built on top of `variants/showcase`, which is
itself Horizon plus the shop's own section library, so this directory holds
only what is different: the palette, the home page, the two group files and the
theme settings. Everything else, the catalogue page, the product page, the
cards, the buy box, is inherited unchanged and goes monochrome because the
palette file says so.

    theme   DOFEK · שחור ולבן (לא לפרסום)   187986182196, unpublished
    preview https://tiny-bloom.com/?preview_theme_id=187986182196

Not published. The live theme is still the previous brand's.

## The palette

Two colours, as asked: `#0A0A0A` and `#FFFFFF`. Five greys hold the structure
and none of them is a third colour: each is black at a stated percentage over
the page, listed in `wf-tokens.css` with the contrast it carries.

| token | value | carries | measured |
|---|---|---|---|
| `--wf-accent`, `--pl-brown`, `--pl-ink` | `#0A0A0A` | buttons, headings, dark bands | 19.80:1 on white |
| `--pl-ink-soft` | `#595959` | paragraphs | 7.00:1 |
| `--pl-taupe` | `#6E6E6E` | captions, kickers | 5.10:1 |
| `--pl-edge` | `#8A8A8A` | control boundaries, WCAG 1.4.11 | 3.45:1 |
| `--pl-line` | `#E0E0E0` | card edges, rules | 1.32 vs page |
| `--pl-cream-deep` | `#F5F5F5` | the one tinted band | 1.09 vs page |
| `--pl-on-dark-soft` | `#B8B8B8` | paragraphs on black | 9.98:1 |
| `--pl-on-dark-mute` | `#8F8F8F` | kickers on black | 6.12:1 |
| `--pl-on-dark-edge` | `#666666` | controls on black | 3.45:1 |

Every figure above was computed, not estimated. Rerun them against any change
before shipping it.

## The home page

    hero      df-hero     the couple on the trail, the brace on
    strip     df-strip    three facts, black band
    problem   df-split    the stairs, white
    science   df-split    the knee render, black, flipped
    grid      wf-grid     the five products, three across
    expert    df-split    the doctor, tinted. the disclaimer
    promise   df-promise  ask before you order the wrong size

Four photographs, all of them the merchant's own uploads, placed and never
altered:

| section | file | size |
|---|---|---|
| hero | `CAF342F0-6E13-481F-8D06-BAED8B6EE6C1.png` | 940 x 1672 |
| problem | `IMG_1718.jpg` | 1048 x 1101 |
| science | `IMG_1670.jpg` | 1206 x 1178 |
| expert | `F43E7CBB-F61D-4355-A20D-22EBF47FCF81.png` | 1427 x 1102 |

### The hero crop

The opening photograph is the one measurement in this build that is worth
keeping. It is 940 x 1672, a ratio of .5622, and the part that has to survive
every frame runs from 28% of its height (the top of his head) to 86% (the
bottom of the brace). A frame shows `frame_ratio x .5622` of the picture's
height, so the two ratios in `df.css` were solved rather than chosen: 5:6 on
the phone shows 67.5%, 9:10 on the desktop shows 62.5%, and both clear the 58%
that matters. One `object-position: 50% 68%` serves both, because the window
where both frames clear the subject is p in [.627, .746].

A fixed pixel height would not have held: on a half-viewport column, a
`min-height: 600px` shows 63% of the picture at 1280px and 42% at 1920px, and
the second one crops the product out of the shop's opening image.

## What is honest here and why it matters

The shop sells support braces to people whose knees hurt. Three rules were
held to throughout, and anyone editing the copy should hold to them:

  * No medical claim. `science` says what a brace does mechanically and then
    says, in the same paragraph, that it is not a medicine. `expert` says
    outright that these are not a diagnosis, not a treatment and not a
    substitute for a doctor, and that a persistent pain should be examined
    before it is wrapped.
  * No invented review, rating or count. There are none on this page, because
    the shop has no orders.
  * No commercial promise that is not already true. The three facts are
    nationwide delivery, the statutory 14 day cancellation right, and support
    in Hebrew. Free shipping is not claimed anywhere.

## Verifying a change

    sh tools/pdp-preview/stage-dofek.sh /tmp/dofek
    PREVIEW_THEME=/tmp/dofek PREVIEW_CATALOGUE=dofek \
    PREVIEW_SHEETS="assets/pluma.css,assets/wf-tokens.css,assets/wf.css,assets/wf-shop.css,assets/wf-vow.css,assets/df.css" \
      node tools/pdp-preview/render.js index > /tmp/home.html
    node tools/pdp-preview/shoot.js /tmp/home.html /tmp/shots 390

`shoot.js` reports horizontal overflow as well as taking the pictures. The
image CDN is unreachable from the sandbox, so the photographs render as
labelled swatches at their real dimensions; the layout is real, the pictures
are not.

## Still the previous brand's

Flagged rather than fixed, because each one is a commercial statement that is
the merchant's to make:

  * `/pages/about`, `/pages/faq` are written about dogs and cats.
  * `/pages/shipping-returns` promises free shipping and a 10 to 14 day
    delivery window that nobody has confirmed for this supplier.
  * `/pages/contact` gives `tinybloom917@gmail.com`.
  * The five store policies are the previous brand's text, and the API scope
    to rewrite them is not granted to this session.
