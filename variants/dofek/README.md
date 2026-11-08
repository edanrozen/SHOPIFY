# DOFEK

The physio shop, black and white. Built on top of `variants/showcase`, which is
itself Horizon plus the shop's own section library, so this directory holds
only what is different: the palette, the home page, the two group files and the
theme settings. Everything else, the catalogue page, the product page, the
cards, the buy box, is inherited unchanged and goes monochrome because the
palette file says so.

    theme   DOFEK · שחור ולבן (לא לפרסום)   187986182196, unpublished
    preview https://dofek.shop/?preview_theme_id=187986182196

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

All five products now have one, each its own template, set on the product as
`templateSuffix`:

  * `product.dofek-knee.json`, the knee brace. Ten sections.
  * `product.dofek-insoles.json`, the massage insoles. Ten.
  * `product.dofek-grounding.json`, the grounding shoes. Nine.
  * `product.dofek-barefoot.json`, the barefoot shoes. Nine.
  * `product.dofek-socks.json`, the bamboo socks. Eight.

The section count is not a ranking, it is the photography. The brace has ten
usable photographs and the socks have three, and a page padded past what its
pictures can carry reads as padding. Nothing on these pages is written from
the category: every claim is something visible in a photograph of that
product, which is why the barefoot page talks about the five toe lobes on the
outsole and the drainage holes, and does not quote a stack height or a heel
drop. Those numbers exist in the supplier's listing and nowhere we can verify,
so the page says that too.

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

The shoes found the next one. Both shoe products have combinations that were
never made: the grounding shoe comes in 47 in black only, the barefoot shoe has
no 35 in white. The buy box constrained every option group by every other one,
so a shopper who picked 47 and then wanted the white pair found the white
swatch disabled, with no way back except to guess that the size was what had
locked it. Each group is now constrained only by the groups before it, so the
first group never locks, and a `repair` pass moves the later picks when an
earlier one changes under them. The suite checks that the first group stays
clickable after a pick, and that a combination which does not exist is struck
through rather than hidden, so the size is still visibly a size.

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

## Two things found by finally looking at the photographs

`cdn.shopify.com` is not on the Default environment's allowlist, so for the
whole of the first build nobody on this side of the wire had seen a single
product photograph. The pages were written from filenames, pixel dimensions
and file sizes. Opening the host changed two things that no amount of care
would have caught otherwise.

The first: one of the four images on the bamboo socks is **TREDVIK's**
infographic, still carrying `TREDVIK R` on the toe of the sock, sitting on a
DOFEK product. The other three had been re-branded and that one had not. It is
detached from the product; the file is still in Files.

The second: three of the insoles' content slots were paired with the wrong
photograph, exactly as warned when the pairing was a guess. The row about the
shock-absorbing base pointed at a stock photograph of a woman in a lab coat,
and the row about massage nubs pointed at a six-up lifestyle collage. All of
them now point at the photograph that shows the thing the row is about.

The lab-coat image is still in the gallery and is no longer used in the page
body. A model dressed as a doctor, in a hospital corridor, holding a product
that makes no clinical claim, is an implied endorsement the shop cannot stand
behind, and it is the cheapest-looking element on an otherwise restrained
page. Removing it from the gallery is the merchant's call, and the
recommendation is to remove it.

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
    more is allowed and is a real differentiator. The store's refund policy
    now states the same 30 days, so the page and the binding document agree.

## Verifying a change

    sh tools/pdp-preview/stage-dofek.sh /tmp/dofek
    PREVIEW_THEME=/tmp/dofek PREVIEW_CATALOGUE=dofek \
    PREVIEW_SHEETS="assets/pluma.css,assets/pluma-2.css,assets/wf-tokens.css,assets/wf.css,assets/wf-shop.css,assets/wf-vow.css,assets/df-mobile.css,assets/df.css" \
      node tools/pdp-preview/render.js index > /tmp/home.html
    node tools/pdp-preview/shoot.js /tmp/home.html /tmp/shots 390

Drop `assets/df.css` from `PREVIEW_SHEETS` for any template other than the
home page, and add `PREVIEW_COLLECTION=all` for the collection one.

`shoot.js` reports horizontal overflow as well as taking the pictures. The
image CDN is unreachable from the sandbox, so the photographs render as
labelled swatches at their real dimensions; the layout is real, the pictures
are not.

## Still the previous brand's

The four content pages and all five store policies are DOFEK now. The policies
were rewritten by the merchant in the admin, which is the only place they can
be written: `write_legal_policies` is not granted to this session. They were
read back in full on 8 November 2026 and carry no TinyBloom text, the right
support address, and the 30 day return window the pages advertise.

What is left of the previous brand cannot be removed through the Admin API,
which blocks `themeFilesDelete` and `themePublish`. Each line below is a
manual job in the admin.

  * **The published theme is still a TinyBloom one**, `TinyBloom · טסט תכלת
    ולבן`, 187628781620. Until the merchant publishes 187986182196, every page
    a customer reaches is the old shop. This outranks everything else on this
    list by a wide margin.
  * Nine dead product templates (`product.bloom.json` and friends) sit in the
    theme. No product points at one; all five carry a `dofek-` suffix. They
    are removed from the admin's code editor in one click each.
  * Twenty-four `sections/pl-*.liquid` from the previous design, unused by any
    template on this theme.
  * Three stylesheets no template requests: `pdp.css`, `pl-story.css`,
    `tb-fit.css`.
  * Fifteen of the eighteen themes in the admin are named `TinyBloom · …`.
    Renaming them is cosmetic and admin side only.
  * The store has no meta description of its own, which lives in the online
    store Preferences page rather than in the API.
