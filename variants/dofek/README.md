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

    hero      df-hero       the couple on the trail, the brace on
    strip     df-strip      three facts, black band
    problem   df-split      the stairs, white
    flagship  wf-flagship   the knee brace, on its own
    science   df-split      the knee render, black, flipped
    grid      wf-grid       the other four, one row
    expert    df-split      the doctor, tinted. why the brace helps
    promise   df-promise    ask before you order the wrong size
    ctabar    df-cta-bar    the phone's standing button

The knee brace is the flagship, so it is not in the grid. It gets the band
above it, the second hero button, the standing bar on the phone, and the
`custom.badge` that puts "מוצר הדגל" on its card everywhere else. The grid
carries the other four, which is exactly one row of wf-shop.css's four.

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

## The DOFEK product pages

Two so far, each its own template: `product.dofek-knee.json` on the knee brace
and `product.dofek-insoles.json` on the massage insoles, set on the products as
`templateSuffix`. They are their own pages rather than variations of the
inherited `wf-product` one, because they are the products worth ten sections
and the ones whose photographs justify a gallery. The rest of the catalogue
still uses the inherited template and is untouched by any of it.

`snippets/stylesheets.liquid` matches the suffix on its `dofek-` prefix rather
than naming each page, so the third DOFEK product page is a template file and
nothing else. The cost is a naming rule: a suffix starting `dofek-` has to mean
a DOFEK product page.

One component crosses between the home page and these: the split band, which
both use for the section about the problem. It lived in `df.css`, which is
requested on the home page and nowhere else, so for two pages and several days
that section rendered with no rules at all: a full-bleed photograph, about a
hundred and fifty characters to a line, and the browser's own bullets. It now
lives in `df-band.css` with the type and the button it is built from, and both
templates ask for it.

Nothing in the test suite noticed, because the suite asked whether the page
overflowed, whether the type was large enough and whether the tap targets were
big enough, and an unstyled section passes all three. It now also measures the
line length at 1280 and fails anything past about 95 characters, which is a
typographic rule worth having on its own and is also what an unstyled text band
looks like. Removing `df-band.css` from the sheet list makes that check fail at
141 characters, which is how it was confirmed to work.

Ten sections, in the order a visitor meets them:

  * `df-pdp` — the buying block. Gallery, pickers, quantity, button.
  * `df-feature` — the four things in the product worth a photograph each.
  * `df-split` — when the problem is actually felt.
  * `df-feature`, on black — why that matters beyond the part it sits on.
  * `df-steps` — three pictures, under a minute.
  * `df-compare` — six rows against the ordinary version of the thing, all of
    them visible in the photographs.
  * `df-voices` — where the reviews will go, saying plainly that there are
    none yet.
  * `df-faq` — seven questions, native `<details>`.
  * `wf-trust` — thirty days, delivery window, Hebrew support, secure payment.
  * `df-end` — the last ask, with the price read off the product.

The insoles page differs from the brace's in two places worth knowing. Its
size row carries twelve pills rather than four, which wraps to three lines at
360px and is the case the preview stub exercises. And its colour option has a
value the monochrome palette cannot express: the swatch in `df-pdp.liquid` maps
`כתום` to a real orange, because a swatch that shows the wrong colour is worse
than no swatch, and a colour the product actually comes in is product data
rather than decoration.

Its gallery also had three byte-identical duplicates in it, the same three
photographs uploaded twice under `IMG-` and `IMG_` names. The later copies were
detached from the product with `fileUpdate(referencesToRemove:)`, which leaves
the files themselves in Files; six distinct photographs remain.

Two decisions in `df-pdp.liquid` are worth keeping.

The form posts a plain `<select name="id">` carrying every variant. That select
is the truth: it is what the browser submits, it works with JavaScript off, and
`df-pdp.js` hides it and drives it from the swatches rather than replacing it.
Nothing computes a variant id at submit time and no hidden field has to be kept
in step.

The gallery renders every frame into the page instead of swapping one `src`.
The browser has decoded the next photograph before the thumbnail is pressed,
and with no JavaScript the first frame is simply the picture. The cost is that
the inactive frames sit stacked over the active one, so they carry
`visibility: hidden; pointer-events: none` — without those the top of the stack
swallows the click and the zoom opens the last photograph in the gallery
whichever thumbnail was pressed. That was found by clicking it, not by reading
it.

A Playwright pass over the rendered page exercised the pickers, the select
sync, the quantity floor, the gallery, the lightbox, the questions and the
standing bar. It found three real faults, all fixed and all commented at the
line that fixes them: the click-swallowing frames above; `.dp__fallback`
staying painted because `display: grid` on a class beats the user agent's
`[hidden] { display: none }`; and the standing bar never appearing on a scroll
jump, because an IntersectionObserver never fires if the element goes from
below the viewport to above it in one scroll. The bar now reads a rect behind
`requestAnimationFrame`.

Checked at 360, 390, 430, 768, 1280 and 1920: no horizontal overflow, no text
under 14px, no tap target under 44px.

## What is honest here and why it matters

The shop sells support braces to people whose knees hurt. Three rules were
held to throughout, and anyone editing the copy should hold to them:

  * No medical claim. Both `science` and `expert` describe what the brace
    does mechanically and nothing beyond it: even pressure around the joint,
    fewer small lateral movements, heat retained in the area, confidence in
    the step on stairs and getting out of a low chair. No cure, no
    treatment, no diagnosis, no condition named. The merchant asked for the
    two hedging paragraphs to come off the home page, and they did; the
    sentences that matter ("we do not diagnose and we do not treat", "a
    persistent pain should be examined first") moved to the FAQ and the
    about page, where somebody looking for them will find them.
  * No invented review, rating or count. There are none on this page, because
    the shop has no orders.
  * No commercial promise that is not already true. The three facts are
    nationwide delivery, 30 days to a refund, and support in Hebrew. Free
    shipping is not claimed anywhere.

    The 30 days are the merchant's own decision and they are legal: Israeli
    consumer law sets 14 days as the floor, not the ceiling, so offering
    more is allowed and is a real differentiator. It does mean the shop now
    promises 30 where the store's refund policy still says 14, and that
    policy is the binding document.

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

The four content pages were rewritten for DOFEK. The five store policies were
not, because `write_legal_policies` is not granted to this session, and they
are the binding documents. Four of them still read:

  * **Contact information** gives `tinybloom917@gmail.com` and carries the
    literal placeholder "(להכניס כאן את שם המותג שלך)".
  * **Refund policy** names `tinybloom` twice, promises a refund within
    "90 ימי עסקים" where Israeli law gives 14 days from the cancellation
    notice, and still states a 14 day return window against the 30 the shop
    now advertises on every page. This one is the most exposed of the four
    and should be rewritten first.
  * **Shipping policy** is headed TINYBLOOM and states 14 to 56 business
    days, against the 10 to 14 the checkout's own shipping rate promises.
  * **Terms of service** name `tinybloom` and `tinybloom917@gmail.com`.

The pages were written around that rather than against it. Where a policy is
clear they transcribe it (the ₪30 return shipping floor, the 5% or ₪100
cancellation fee, trying on not counting as use, an uncollected parcel losing
the right to cancel). Where a policy is wrong they point at it instead of
repeating it: the refund timing line says "מועד ההחזר מופיע במדיניות
ההחזרים", so correcting the policy corrects the page.

Also outstanding:

  * Nine TinyBloom product templates (`product.bloom.json` and friends) are
    dead files in the theme. `themeFilesDelete` is blocked for this session;
    they are removed from the admin's code editor in one click each.
  * The store has no meta description of its own, which lives in the online
    store Preferences page rather than in the API.
  * Every product's description is still empty, the knee brace included.
    Its selling copy lives in the template rather than in the description
    field, which is right for the page and wrong for everywhere Shopify
    reuses that field: search results, the cart, Google Shopping, a
    marketplace export. One paragraph per product, five products.
