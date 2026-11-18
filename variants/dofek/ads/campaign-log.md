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
