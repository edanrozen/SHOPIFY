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

    hero      df-hero      the couple on the trail, the brace on
    strip     df-strip     three facts, black band
    problem   df-split     the stairs, white
    science   df-split     the knee render, black, flipped
    grid      wf-grid      the five products, three across
    expert    df-split     the doctor, tinted. the disclaimer
    promise   df-promise   ask before you order the wrong size
    ctabar    df-cta-bar   the phone's standing button

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
bottom of the brace), which is 58%. A frame shows `frame_ratio x .5622` of the
picture's height, so the 9:10 in `df.css` was solved rather than chosen: it
shows 62.5%, it clears the 58% with 4.5 points to spare, and it is the
shortest frame that does. One ratio serves the phone and the desktop, and
`object-position: 50% 68%` sits in the middle of the window where the frame
clears the subject, p in [.627, .746].

A fixed pixel height would not have held: on a half-viewport column, a
`min-height: 600px` shows 63% of the picture at 1280px and 42% at 1920px, and
the second one crops the product out of the shop's opening image.

## The phone

The shop is read on a phone, so the phone is the design and the desktop is the
variation. Three things carry that:

`df-mobile.css` loads on every template and is the whole list of corrections
to the inherited components. Eleven of them set text between 12.8px and
13.8px, which was a caption on a 1280px column and a wall held eighteen inches
from the face of somebody shopping for a knee brace; all eleven come up to
14px or past it. The pill gets a 48px floor and the button under the product
grid goes full width.

`df-cta-bar` is the standing button. The home page is six screens tall and its
buttons leave with the first one, so a fixed bar carries the main action
through the middle of the page. It appears when the hero scrolls out, hides
again when the closing band arrives (that band is itself a button), and above
820px it does not exist. With JavaScript off it never shows, which is correct:
the page still has three buttons in its flow.

The fold. Measured on the three phones that matter, with 110px allowed for the
announcement bar and the sticky header, the photograph, the headline, the
sentence and both buttons are all above the fold:

| | viewport | fold | buttons end |
|---|---|---|---|
| iPhone SE, 13 mini | 360 x 780 | 670 | 665 |
| iPhone 14, 15 | 390 x 844 | 734 | 699 |
| iPhone 15 Pro Max | 430 x 932 | 822 | 709 |

That cost one clause of the hero sentence, which repeated the three facts
drawn directly under it.

Checked at 360, 390, 430, 768, 1280 and 1920: no horizontal overflow at any
width, no text under 14px and no tap target under 44px on either the home page
or the collection page.

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
    PREVIEW_SHEETS="assets/pluma.css,assets/wf-tokens.css,assets/wf.css,assets/wf-shop.css,assets/wf-vow.css,assets/df-mobile.css,assets/df.css" \
      node tools/pdp-preview/render.js index > /tmp/home.html
    node tools/pdp-preview/shoot.js /tmp/home.html /tmp/shots 390

Drop `assets/df.css` from `PREVIEW_SHEETS` for any template other than the
home page, and add `PREVIEW_COLLECTION=all` for the collection one.

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
