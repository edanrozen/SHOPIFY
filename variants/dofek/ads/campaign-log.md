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

## 19.11, 08:48 Israel — campaign paused at the client's instruction

`POST /120255262154620523 status=PAUSED` → success. Verified: campaign
`status` and `effective_status` both PAUSED; every ad now reads
`CAMPAIGN_PAUSED` or `PAUSED`. **Paused, not deleted** — the campaign, ad set,
ads, creatives and the learning the pixel accumulated all survive. One switch
turns it back on.

The two self-scheduled monitoring check-ins were disabled; the merchant's own
daily 09:52 routine was left alone, since it is his and it reports "paused"
in one line when there is nothing running.

### Final numbers

    total      208.57₪   3,347 imp   60 clk   CTR 1.79%   CPM 62.31₪
               42 landing page views   1 add to cart   0 checkouts   0 orders

    16.11       24.12₪     290 imp    8 clk   CTR 2.76%   CPM 83.17   6 LPV  1 cart
    17.11       61.11₪     826 imp    9 clk   CTR 1.09%   CPM 73.98   5 LPV
    18.11      101.44₪   1,926 imp   35 clk   CTR 1.82%   CPM 52.66  27 LPV
    19.11       21.90₪     305 imp    8 clk   CTR 2.62%   CPM 71.80   4 LPV

    ad6-film15 108.49₪  2,225 imp  CTR 1.53%  CPM 48.75  25 LPV  0 cart
    ad5-film    40.80₪    377 imp  CTR 2.65%  CPM 108.2  10 LPV  1 cart
    ad7-rant    21.38₪    319 imp  CTR 2.19%  CPM 67.02   4 LPV  0 cart
    (ad1-gym 8.44₪, ad2 8.00₪, ad3 1.74₪, ad4 12.20₪ — all paused earlier)

### What the 208₪ bought

Not a sale. It bought a diagnosis, and the diagnosis is worth more than the
money at this budget.

**The media worked.** CPM fell 83 → 74 → 53 across three days as Meta learned,
and 18.11 delivered 27 landing page views against 6 and 5 on the days before,
at the lowest cost of the run. Clicks were never the problem.

**The funnel dies after the click.** 42 landing page views produced one
add-to-cart and zero checkouts. That is ~2.4% where a healthy store runs
8-12%. Three days of spend bought one cart.

**The sample was never going to settle.** At 5.0₪ per landing page view and
65₪/day, the campaign buys about 10 LPV a day. Judging a product page needs
roughly 200. That is 20 days and ~1,300₪ before the data means anything —
and `ad7-rant` was paused at 319 impressions, still inside the noise band
where its CTR had only just stopped falling (4.72 → 3.14 → 2.49 → 2.19%).

**Stopping here is the right call.** Spending into a page that converts at
2.4% only buys the same answer more expensively.

### What is ready for when it restarts

* `ad7-rant` — the 36.5s talking-head ad, approved voice, built and live-tested
* The draft theme `188538322996`, unpublished: slogan, "הנמכר ביותר · 4.5 מתוך 5",
  an outcome-led opening, reframed shipping, a shipping FAQ
* `scratchpad/loox-import-template.csv` for the review import
* Two paused ads, two more paused earlier, all recoverable

## 19.11 — resumed, unchanged, at the client's instruction

He said the campaign can keep running. Before touching anything I pulled the
pixel's own event history, and it changed the diagnosis.

### The ad set was optimizing for an event that has never once fired

    PageView          255
    ViewContent       155
    AddToCart           5
    Search              2
    InitiateCheckout    0
    Purchase            0      <- and the ad set optimizes for PURCHASE

`optimization_goal: OFFSITE_CONVERSIONS`, `custom_event_type: PURCHASE`, on a
pixel with zero purchases since the store opened. Meta needs ~50 conversions of
the optimized event per week to leave the learning phase. At 65₪/day against a
107₪ break-even CPA the ceiling is ~4/week. **This ad set could never exit
learning — not "did not", could not.** It spent 208₪ distributing on a guess,
which is also why ad6 collected half the budget at the worst CTR in the account:
there was no signal for the algorithm to prefer anything by.

**And it cannot be edited.** Checked against Meta with `execution_options:
["validate_only"]`, so nothing was applied:

> error_subcode 3260011 — לא ניתן לערוך את הפיקסל שלך, את אירוע ההמרה שלך או את
> המיטוב עבור סדרת מודעות לאחר שסדרת המודעות פורסמה. יש ליצור סדרת מודעות חדשה.

A new ad set is the only route to a different optimization event.

### Two more things the pixel corrected

* **AddToCart is 5, not 1.** Ad attribution credited one; the pixel logged five.
  The page is less broken than the ad report alone suggests.
* **InitiateCheckout has never fired.** Zero, against five carts. Either nobody
  reached checkout, or the event is not installed. Five carts cannot tell those
  apart — but if it is not installed, no future ad set can optimize on it either.

### The decision

I put four options to him, ranked, recommending a new AddToCart-optimized ad set
with ad5 + ad7 only plus publishing the page fixes. **He chose to resume what
exists, as it is.** His call; recorded, not re-argued.

`POST /120255262154620523 status=ACTIVE` → success. Verified live at every level:
campaign ACTIVE, ad set ACTIVE at 6500 (65₪/day), ad5-film / ad6-film15 /
ad7-rant ACTIVE, ad1-ad4 still PAUSED. Identical to the state before the stop.

Re-enabled the two monitoring check-ins that were disabled when it stopped.

### What to watch, given the structure

ad6 is the risk: last run it took 109₪ of 208₪ at 1.51% CTR and produced no
carts, and with no purchase signal nothing stops that happening again. ad5
(2.90% CTR, the one cart) and ad7 (2.81%, frequency 1.13) are the ads worth
the money. If ad6 repeats the pattern, moving the budget off it is the
cheapest single intervention available.

## 19.11, 18:50 — acted on open approval ("do what gets us a purchase")

### Done: ad7-rant paused, budget moved to ad5 + ad6

Ranked the ads on the metric that matters when the page is the bottleneck —
cost per landing page view, not CTR:

    ad6-film15   111.56₪ / 28 LPV = 3.99₪
    ad5-film      44.44₪ / 11 LPV = 4.04₪
    ad7-rant      50.77₪ /  5 LPV = 10.15₪   <- 2.5x worse

ad7 was taking 96% of new delivery while being the worst of the three, because
the ad set optimizes for PURCHASE and has no purchase signal to allocate on —
the allocation was noise, so overriding it by hand is justified.

Two independent negatives on ad7, which is why it and not ad6 was the one cut:
its CTR fell on every measurement as volume grew (2.81% @392 → 2.42% @538 →
2.09% @621), and only 5 of 13 clicks reached the page (38%, against ad5's 92%
and ad6's 76%). The click→LPV figure rests on 13 clicks and is weak on its own;
the declining CTR is what makes the pair decisive.

ad6 was NOT cut, and the earlier note calling it the one to kill was wrong on
this metric: its CTR is the worst in the account but its CPM is cheap enough
(48₪) that it buys page traffic as efficiently as ad5. Kept both — ad6 for
cheap reach, ad5 for intent (55s watch time, 92% click→LPV, the only cart).

`POST ad7 status=PAUSED` → success. ad5-film and ad6-film15 remain ACTIVE,
ad1-ad4 untouched. One toggle restores ad7.

### Blocked: publishing the page fixes

Theme `188538322996` was verified first — fetched the preview with a cookie jar
(a bare preview URL 302s), confirmed all five changes render, no Liquid errors,
`מוצר הדגל` gone, page weight 298,520 vs the live 298,076 so nothing structural
broke. MAIN (`187986182196`) has not changed since 08.11, so the draft has not
diverged from it.

**Both publish routes are refused in this session.** `theme_publish` →
"connector requires additional permissions"; `themePublish` via graphql_mutation
→ blocked by the server's safety policy as destructive. Theme file writes to the
live theme are blocked too, so there is no way to improve the live page from
here. This needs one click in his Shopify admin. It is the only lever that
touches the actual bottleneck and it is the one I cannot pull.

### Corrected: InitiateCheckout = 0 is real, not a tracking gap

I had flagged zero InitiateCheckout as possibly an uninstalled event. The page
loads the pixel through **`web-pixels-manager`** — Shopify's native integration,
not theme code — which does run on checkout pages. So checkout and purchase
events would fire. **Nobody has ever reached checkout.** Worse for the funnel,
better for measurement: a sale will be attributed when one happens.

`last_fired_time` read 00:52 today, which looked alarming; hourly stats show the
pixel firing through 15:00. That field is stale, the pixel is healthy.

### Found, not acted on: Advanced Matching is off

`enable_automatic_matching: false` on pixel 1063551259717066. Turning it on
improves match rate and attribution for free — but it sends hashed customer
email and phone to Meta, which is a privacy decision with legal exposure, not a
performance knob. Recommended to him rather than flipped silently.

## 19.11, 19:00 — Advanced Matching enabled (approved)

`POST /1063551259717066 enable_automatic_matching=true` with
`automatic_matching_fields=["em","ph","fn","ln","ct","st","zp","country","external_id"]`.
Dry-run first with `execution_options:["validate_only"]` to confirm the field
names were accepted before committing. Verified after:

    enable_automatic_matching: true
    automatic_matching_fields: em ph fn ln ct st zp country external_id
    first_party_cookie_status: first_party_cookie_enabled
    data_use_setting:          advertising_and_analytics

### The Shopify half was already in place

A pixel-side flag alone does nothing if the store is not sending the fields.
Pulled the Meta entry out of `webPixelsConfigList` on the live page:

    dataSharingState: "optimized"
    protectedCustomerApprovalScopes: read_customer_address, read_customer_email,
      read_customer_name, read_customer_personal_data, read_customer_phone
    dataSharingControls: ["share_all_events"]
    privacyPurposes: ANALYTICS, MARKETING, SALE_OF_DATA

Shopify has been sending email, phone, name and address all along. Meta simply
was not using them to match, because the pixel flag was off. **Both halves are
now on, so no second change is needed in the Shopify app.**

Nothing observable confirms this yet — match quality only shows up once
conversions exist. It cannot hurt: it adds identifiers to events that were
already being transmitted.

## 19.11, 19:11 — the page fixes are live

He published. Verified rather than taken on trust:

* `themes(roles:[MAIN])` now returns `188538322996`; the previous live theme
  `187986182196` dropped to UNPUBLISHED and is intact as a one-click rollback.
* Fetched the live product page as an iPhone UA: HTTP 200, no Liquid errors,
  TTFB 0.41s, 1.06s total. All five changes render — the slogan, «הנמכר ביותר ·
  4.5 מתוך 5», the outcome-led opening, «משלוח חינם עם מעקב», the returns FAQ —
  and `מוצר הדגל` is gone.

### The baseline, locked before the new page gets any traffic

Added `ab.py`, which splits pixel events at the publish hour and reports
**ViewContent → AddToCart**: of the people who looked at the product, how many
put it in the cart. Measured on the pixel, so ad attribution cannot flatter it.

    OLD page   PageView 268 | ViewContent 161 | AddToCart 5 -> 3.1% | Checkout 0 | Purchase 0
    NEW page   PageView   0 | ViewContent   0 | AddToCart 0 ->   -  | Checkout 0 | Purchase 0

**3.1% is the number to beat.** And it is the generous reading: all five of
those carts landed on 16.11, in one hour block, and some are plausibly his own
tests. The honest range for the old page is 0% to 3.1%.

`ab.py` refuses to call a winner under 30 product views on the new page — at
~26 views a day that is a verdict in roughly a day, not an hour. The campaign
state is unchanged: 239₪, ad5 + ad6 running, ad7 paused.
