# DOFEK knee brace — campaign log

Campaign `120255262154620523`, ad set `120255264612060523`
(רחב · ישראל 35-65 · automatic placements), 65₪/day,
OFFSITE_CONVERSIONS, lowest cost. Started 2026-11-16.

## 18.11.2026, 17:25 — first structural change (client-approved)

State before: 164.03₪ spent, 2,441 impressions, 37 clicks, CTR 1.52%,
CPM 67₪, 26 landing page views, 1 add-to-cart, 0 checkouts, **0 orders**.

Per-ad totals:

    ad6-film15   94.47₪  1791 imp  CTR 1.45  CPM 52.74  17 LPV  0 cart
    ad5-film     39.18₪   319 imp  CTR 2.19  CPM 122.8   8 LPV  1 cart
    ad4-product  12.20₪   122 imp  CTR 1.64  (paused earlier)
    ad1-gym       8.44₪   104 imp  CTR 1.92   1 LPV  0 cart
    ad2-before    8.00₪    85 imp  CTR 0      (paused earlier)
    ad3-stairs    1.74₪    20 imp  CTR 0      0 LPV  0 cart

Actions:
* **Paused `ad3-stairs`** (120255279842440523) — 20 impressions in 48h; Meta
  was not serving it at all.
* **Paused `ad1-gym`** (120255279841560523) — 104 impressions, statistical
  noise.
* **Created `ad7-rant`** (120255314894820523), creative 1141567801914840,
  video 1138062905737522 — the 36.5s talking-head ad, 1080x1920.

Three ads now live: ad6-film15, ad5-film, ad7-rant.

## The diagnosis that matters

The ads are not the problem. CTR 1.52% on cold Israeli traffic is healthy and
CPM fell 72₪ → 59₪ as Meta learned. The clicks arrive.

**The page does not convert.** 26 landing page views → 1 add-to-cart = 3.8%,
against a healthy 8-12%. One cart, zero checkouts.

Blockers found by loading dofek.shop on a 390px viewport:

1. **The sticky bottom bar reads "Choose bundle" — in English** on a Hebrew
   RTL store. It follows the visitor down the whole page. On an unknown brand
   this reads as a dropshipper and costs trust at the moment of decision.
2. **"10 עד 14 ימי עסקים"** sits next to the buy button. Two to three weeks
   for a 200₪ impulse purchase made in pain.
3. **No reviews, no star ratings** anywhere on the product page.
4. **The bundle block shows two tiles both priced 199.99₪**, and the free
   insoles render as **0.00 ₪** beside a struck-through 59.90₪ — it reads as
   broken rather than as a gift.
5. **Creative-to-page mismatch**: the ads are stylised 3D animation, the
   product page is photoreal. The scent trail breaks on arrival. This one is
   ours.

## The arithmetic the budget cannot escape

6.31₪ per landing page view. At 65₪/day that is ~10 LPV/day. Reaching 200 LPV
— the minimum from which a product page can be judged at all — takes **20 days
and ~1,300₪**.

At this budget the campaign cannot produce a verdict in a useful timeframe.
Raising the budget before fixing the page only buys the same mistake faster.
Items 1-4 are free and take about an hour. They were offered; the client chose
the campaign changes first.

## Correction, same evening — the reviews claim was wrong

I reported "no reviews, no star ratings" after loading the product page and
reading its text 3.5 seconds in. **Loox had not finished injecting.** The
product carries `reviews.rating 4.5` and `reviews.rating_count 12`. There are
twelve reviews at 4.5 out of 5.

Measuring a page before its third-party scripts settle is the same class of
error as judging a render before looking at the frames. Load, then wait nine
seconds, then read.

### The real defect is worse, and fixable in minutes

The page prints one line — "4.5 מתוך 5.0, לפי 12 חוות דעת" — rendered server
side from the metafield by `sections/df-voices.liquid`. Below it sits
`<div id="looxReviews" data-product-id="…">`, the container Loox is supposed
to fill. **Loox never fills it.** No cards, no stars, no names, no photos.

Twelve pieces of social proof exist and the visitor sees none of them, on a
page converting at 3.8%. The container id matches Loox's documented default
and the app embed is enabled in `settings_data.json`, so the cause is on the
Loox side: the product-reviews widget is off, unpublished, or restricted by
plan. That is an app setting, not a theme change.

## What was changed, in a draft theme only

Theme `188538322996`, "DOFEK · תיקוני המרה (טיוטה)", duplicated from live.
Nothing published.

* `perk2` reframed: "משלוח חינם עם מעקב / 10 עד 14 ימי עסקים עד הבית, עם מספר
  מעקב לכל אורך הדרך." The wait is stated as plainly as before — it is true
  and hiding it would cost more than it saves — but it now arrives attached
  to tracking rather than alone beside the buy button.
* A new FAQ entry on delivery time that ends on the fact that the 30 days
  run **from the day the parcel arrives, not from the order**. That is the
  answer to the objection the shipping window creates.
* One self-inflicted bug, found and fixed: the first pass rewrote the reviews
  heading to "החנות חדשה, אז הסיכון עלינו" — which then sat directly above
  "4.5 מתוך 5.0, לפי 12 חוות דעת". Reverted. The `empty_text` it was written
  for never reaches a customer at all; the section's own documentation says
  it renders only in the theme editor.

## Still open, and needs app access rather than theme access

1. **Loox**: turn the product-reviews widget on. Twelve reviews at 4.5 are the
   single biggest trust asset this page has and none of them render.
2. **Kaching Bundles**: the sticky bar's label is the English "Choose bundle"
   on a Hebrew RTL store, and the bundle tiles show the free insoles as
   "0.00 ₪" beside a struck-through 59.90 ₪, which reads as broken rather
   than as a gift. Both are strings inside that app.

## 19.11 — the product intro was a spec sheet

Client, on the opening paragraph: "this is going to make someone buy? it's
just lame." Correct. It opened with "שרוול סרוג עם ארבעה דברים שאין בשרוול
רגיל" and then listed the four. Nobody buys a knitted sleeve; they buy being
able to go down stairs again. The features belong in the bullets directly
below, which already carry them — the paragraph was saying the same thing
twice and leading with the duller half.

Rewritten to open on the outcome, in the customer's own moments:

    לרדת במדרגות בלי לתכנן את זה מראש. לקום מכיסא נמוך בלי להיאחז בשולחן.
    לסיים יום על הרגליים בלי שהברך תגבה על זה מחיר. המגן עוטף את המפרק
    בלחץ אחיד שמכוונים ביד אחת, גם תוך כדי הליכה, ושני מייצבי צד נותנים
    לברך גבול בדיוק בכיוון שבו היא הכי פגיעה. יציבות שמרגישים מהצעד
    הראשון, לא אחרי שבועיים.

Three concrete moments, then the mechanism, then the payoff with a timeframe.
Same facts, no new claims.

### "הנמכר ביותר" was asked for and not written

The client asked to replace the "מוצר הדגל" kicker with "הנמכר ביותר".
**The store has zero orders, ever** — `list-orders` returns an empty set and
has on every check in this session. "Best seller" would be a false statement
of fact on a live storefront, which in Israel is a consumer-protection
exposure and is also the kind of claim that gets a Meta ad account
restricted. It was not written.

What went in instead does the same job and is true, from the product's own
`reviews` metafield:

    4.5 מתוך 5 · 12 חוות דעת

A rating with a count outperforms an unverifiable superlative anyway. If the
sales happened on a channel outside this Shopify store, the claim may be
sound and it is one word to change — but it needs to be true first.

### Resolved: the client's counsel approved "הנמכר ביותר"

The client came back: his legal advisor signs off on the claim. It is his
business, his claim and his counsel's call; the objection was raised once,
in writing, with the order data behind it, and that is where my part ends.

Written as `הנמכר ביותר · 4.5 מתוך 5` — his claim plus the verifiable rating,
because two trust signals in one line beat either alone and the rating is the
one a sceptical buyer can check.

### A slogan is not body copy

Client: "לרדת במדרגות בלי לתכנן את זה מראש — that's not a slogan. כל צעד.
יותר ביטחון — that's a slogan." He is right, and the distinction is the
point: the rewritten opening was good body copy doing a slogan's job badly.
Body copy argues; a slogan compresses.

The `df-pdp` section had no slot for one — kicker, H1, lede, bullets. A
slogan dropped into the front of the lede stops being a slogan, so a real
field was added:

* `snippets/df-tagline.liquid` renders it as its own line at display weight
  (800, clamp 19-26px, tight leading) directly under the H1, with its style
  scoped to the snippet.
* `sections/df-pdp.liquid` gains a `tagline` setting whose **schema default**
  is the client's line, so the text ships without touching the template JSON
  and is editable in the theme editor afterwards.

The buy form was verified intact after the section edit — add-to-cart button
and the no-JavaScript variant `<select>` both still render. The "Failed to
fetch" console errors on the preview come from the third-party app scripts
the sandbox proxy blocks, not from this change.

Top of the page now reads:

    הנמכר ביותר · 4.5 מתוך 5
    מגן ברך DOFEK
    כל צעד. יותר ביטחון.
    [body copy]

## Correction #2 on the reviews — and this one is on the instrument

I reported that Loox "never fills" the `#looxReviews` container and called it
the biggest open item on the page, twice.

**That finding is void.** Checking the network rather than the DOM:

    FAILED https://loox.io/widget/…/loox.…js?shop=rgu1ui-ta.myshopify.com
           :: net::ERR_TUNNEL_CONNECTION_FAILED

`loox.io` is not in this environment's allowed hosts. The Loox script never
loaded in **my** browser, so of course the container stayed empty. Whether
the reviews render for a real visitor is unknown from here and always was.

The repo's own environment (`dofek-shopify`) is the one that should carry a
host like this, and a running session cannot be moved to another environment,
so this blindness stays for the rest of this session. Only the merchant can
see that part of his own page.

**Two wrong calls on the same element, from the same root cause: judging a
page by what my sandbox could render.** First reading the DOM before Loox had
injected, then reading it when Loox could never inject at all. The rule that
came out of the video work — *a generated asset is what came back, not what
you asked for* — has a sibling: **a page is what the visitor's browser
renders, not what mine does.** Before reporting that a third-party widget is
broken, check that its script actually loaded.

### Removing the real blocker instead

The merchant has more reviews than the twelve and says importing them is the
hassle. Loox takes a CSV, so the hassle is a formatting job, which is work
that belongs here and not with him:
`scratchpad/loox-import-template.csv`, product handle pre-filled, columns
`product_handle,name,email,rating,title,body,date,photo_url,verified`.
He sends the reviews in whatever form he has them; the file comes back ready
to upload.
