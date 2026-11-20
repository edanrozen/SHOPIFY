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

## 19.11, 21:09 — campaign paused again, at his instruction

He asked whether I had cancelled the campaign and told me to do it now if not.
To be exact: **I had not.** Earlier I paused only `ad7-rant`, the ad he said
looked bad, and left ad5-film and ad6-film15 running, which is what his message
at the time asked for. He has now asked for the campaign itself.

`POST /120255262154620523 status=PAUSED` → success. Verified: campaign
`status` and `effective_status` both PAUSED; ad5-film and ad6-film15 read
CAMPAIGN_PAUSED; ad7 and ad1-ad4 PAUSED. Nothing is delivering.

Disabled the 21:10 check-in rather than let it wake him with an A/B report on
a campaign that is no longer sending traffic.

### Closing figures

    total    240.02₪   3,727 imp   66 clk   CTR 1.77%   CPM 64.40₪
             45 landing page views   1 add to cart   0 checkouts   0 orders

    ad6-film15  112.36₪  2,342 imp  CTR 1.58%  CPM 47.97  28 LPV  0 cart
    ad7-rant     51.17₪    632 imp  CTR 2.06%  CPM 80.96   5 LPV  0 cart
    ad5-film     46.11₪    422 imp  CTR 2.84%  CPM 109.2  11 LPV  1 cart
    ad1-ad4      30.38₪    331 imp  (paused 17.11)

### What was fixed today, and what it means for the next run

Three things changed and none of them was tested, because the campaign stopped
roughly two hours after the page went live:

* **The product page is live and fixed** (theme `188538322996` is MAIN). The
  old theme is intact at `187986182196` for a one-click rollback.
* **Advanced Matching is on**, with the Shopify side already sharing email,
  phone, name and address.
* **ad7 is off**, the budget was aimed at the two ads that buy page views at
  ~4₪ instead of 10₪.

`ab.py` holds the baseline: the old page converted **5 of 161 product views
(3.1%)**, and that is the generous reading — all five carts fell in one hour
block on 16.11 and some are plausibly his own tests, so the honest range is
0% to 3.1%. **The new page has not been measured at all.** It got no
meaningful traffic before the stop. Whenever the campaign restarts, `ab.py`
picks the comparison up from the same split point and needs ~30 product views
on the new page to say anything.

Open, all waiting on him: the UGC video he is making himself (I upload it as
`ad8-ugc` when it arrives), the Loox review import, and the Kaching Bundles
strings — the English "Choose bundle" label and the "0.00 ₪" insole tiles.

## 19.11, 21:30 — new campaign built for 20.11 06:00

    campaign  120255333119900523  DOFEK · מגן ברך · 20.11   ACTIVE
    ad set    120255333119990523  ישראל · כל הגילים · עברית  ACTIVE  70₪/day
              start 2026-11-20T06:00:00+0200
              geo IL · age 18-65 · locales [29] עברית · advantage_audience off
    ad-film55 120255333121540523  the 55s video (ad5's winner)
    ad-gever  120255333122310523  the new "גבר, לא נמאס לך" image

Old campaign `120255262154620523` stays PAUSED. Nothing was reused from it
except the winning video and its proven creative spec.

**ad5-film was the right video to carry over.** CTR 2.84% (the best of seven),
92% of clicks reached the page (against 76% and 38%), and it is the only ad in
the account's history that ever produced an add to cart.

Both creatives were validated with `execution_options:["validate_only"]` before
anything was created; both came back `{"success": true}`. The campaign create
first failed on `is_adset_budget_sharing_enabled` being required when the budget
sits on the ad set — set to false, re-validated, then built live.

### The one deviation from a literal reading of his spec

He did not name an optimization event. **I set ADD_TO_CART, not PURCHASE.**

The old ad set optimized for PURCHASE on a pixel with zero purchases, so Meta
had no signal and distributed on noise — which is exactly how ad6 collected
109₪ of 208₪ at the worst CTR in the account. At 70₪/day against a 107₪
break-even CPA the ceiling is ~4 purchases a week against the ~50 needed to
leave the learning phase, so PURCHASE could not work here either. AddToCart is
reachable, it is down-funnel enough to find buyers rather than browsers, and it
feeds the pixel the signal a future PURCHASE campaign would need.

Meta refuses to change this field after an ad set publishes (error_subcode
3260011, verified earlier), so if he wants PURCHASE the ad set has to be rebuilt
— flagged to him tonight, with hours to spare before 06:00.

### Two risks on the image, flagged not fixed

* It draws a **fake UI button** ("לחץ כאן") with a cursor hand. Meta's policy on
  non-functional interface elements is enforced unevenly; it is a real rejection
  risk and `effective_status` reads IN_PROCESS until review clears.
* **1199x1312, ratio 0.914.** Between 1:1 and 4:5, so feed will crop or letterbox
  slightly, and Stories/Reels heavily. Offered to pad it to 1080x1350 without
  touching the artwork; not done unasked.

Copy: the video keeps ad5's proven body verbatim. The image got new copy in the
voice of the artwork — direct, male, blue-collar — with the same product facts,
the 199.99₪ shipping-included price and the 30-day return.

## 20.11, 08:21 — launch check. A 15.76% CTR that was not real.

Both ads cleared review and are ACTIVE; the fake-button image was not rejected.
The campaign started on time and spent 33.60₪ in the first two hours.

The headline numbers looked like a breakthrough: **CTR 15.76%, 26 landing page
views in two hours** against 42 in four days on the old campaign. A tenfold CTR
jump is not a win, it is a symptom, so I broke delivery down by placement before
reporting any of it.

    audience_network / rewarded_video  11.10₪   39 imp  CTR 30.8%  CPM 285₪  11 LPV
    audience_network / an_classic      15.93₪   58 imp  CTR 17.2%  CPM 275₪  10 LPV
    facebook / feed                     2.09₪   26 imp  CTR 15.4%  CPM  80₪   2 LPV
    facebook / facebook_reels           2.57₪   51 imp  CTR  7.8%  CPM  50₪   1 LPV
    instagram / all positions           1.34₪   19 imp                        1 LPV

**27.03₪ of 33.60₪ — 80% of the spend — went to Audience Network**, at a CPM of
275-285₪, five times what Facebook feed cost. `rewarded_video` is the worst
inventory on the platform: people watch an ad to unlock an in-game reward and
click to get through it. A 30.8% CTR there is not interest, it is the mechanic
of the placement. The 21 landing page views it bought are worthless.

**This was my defect, not his brief.** He specified geography, age, language and
budget. I never set `publisher_platforms`, so the ad set inherited automatic
placements, and a new ad set optimizing for a cheap event explored straight into
the cheapest-looking inventory. Left alone it would have burned about 56₪ of
today's 70₪ on nothing.

Fixed: `publisher_platforms` set to `["facebook","instagram"]`, validated first,
then applied — the first apply hit the 1-call-per-30-seconds limit and went
through on retry. Verified after: Audience Network gone, everything he actually
specified untouched (IL, 18-65, locale 29, Advantage Audience off, 70₪/day).
Unlike `optimization_goal`, placements are editable on a live ad set.

### The new page's first read is contaminated

    OLD page   ViewContent 161 | AddToCart 5 -> 3.1%
    NEW page   ViewContent  65 | AddToCart 0 -> 0.0%

65 product views is past `ab.py`'s 30-view gate, so the tool called it "not
better yet" — **and that verdict should not be trusted.** Most of those 65 views
came from the rewarded-video traffic, which would not convert on any page ever
built. The new page has still not had a fair test. The next ~30-50 views, now
that delivery is Facebook and Instagram only, are the first honest sample.

Still zero InitiateCheckout and zero Purchase in the store's history.

## 20.11, 12:37 — third ad added: "עד מתי הברך הזאת"

    ad-ad-matai  120255340936560523   creative 2464672364062538
    image hash   b0e9fb8d6b22f7af1733e1db554c3a9f   1254x1254

Source arrived as a 1.8MB WebP; PIL is broken in this container (`_imaging`
missing), so converted with ffmpeg to a 573KB JPEG at the same 1254x1254.
Creative validated with `validate_only` before anything was created.

The ad set now carries three ads on 70₪/day: the video, "גבר לא נמאס לך", and
this one. Placements still facebook + instagram, IL, 18-65, locale 29.

### Flagged before uploading, overruled, uploaded

The man in the artwork is raising his middle finger. I told him plainly that
this breaks Meta's policy on offensive content, and that the cost is not a
rejected ad but a **policy strike against the ad account the whole business
runs on** — and that this would be the second creative in a row carrying
policy risk, after the fake "לחץ כאן" button. He said upload it.

That is his call to make and he made it with the risk in front of him, so it
went up. Worth recording honestly: I raised it once, did not relitigate, and
the exposure is now a known accepted risk rather than an accident. The 13:10
check reads `issues_info` on all three ads first.

Copy is new, in the artwork's voice, opening on "עד מתי אתה מתכוון לתת לברך
הזאת לנהל לך את היום?" and closing on the image's own promise — "תלחץ, תזמין,
ותראה איך זה מרגיש לזוז בלי כאבים". Headline «תזוז בלי לחשוב על הברך».
Same product facts, same 199.99₪ shipping-included price, same 30-day return.

## 20.11, 14:15 — correction: the old campaign produced ONE cart, not two

He questioned the "2 carts" in my comparison table. He was right and I was wrong.

`cmp.py` summed `add_to_cart` and `omni_add_to_cart` as if they were separate
events. **Meta reports a single cart under six aliases at once:**

    add_to_cart                               1
    offsite_conversion.fb_pixel_add_to_cart   1
    onsite_web_add_to_cart                    1
    onsite_web_app_add_to_cart                1
    offsite_add_to_cart_add_20_s_calls        1
    omni_add_to_cart                          1

Adding any two of them doubles the count. The correct figure is **1**, which is
what `rep.py` reported correctly throughout the old campaign; the bug was in the
comparison script I wrote fifteen minutes earlier. Patched `cmp.py` to read the
single canonical `add_to_cart` field, with a comment saying why.

### What the correction changes

The old campaign converted **1 of 45 landing page views = 2.2%**, not 4.4%. That
lowers the old campaign, it does not raise the new one, and it strengthens the
earlier reading: at 2.2%, twelve clean landing page views would be expected to
produce 0.26 carts, so zero is exactly on expectation and is still no evidence
the new campaign converts worse.

It also sharpens the page's real number. `ab.py`'s 3.1% baseline comes from the
pixel (5 of 161 product views) and includes organic traffic and his own tests.
What the advertising actually bought was 1 cart from 45 visits. Both are far
from the 8-12% a healthy store runs.

Rule recorded: *a metric that appears under several names in one payload is one
metric — never sum the aliases.*

## 20.11, 15:40 — correction: one cart, not four. The pixel counts clicks.

He said his dashboard shows one cart where I had reported four. He was right.

The pixel logged 4 `AddToCart` events in the 14:00 hour. Those are four presses
of the button — one person, two sizes, a re-click — not four shoppers. Shopify
is the deduplicated truth and it says one.

Verified independently: `abandonedCheckouts` holds **no record for the knee
brace, ever**. The most recent abandoned checkout in the store is 11.11, for a
different product. That matches `InitiateCheckout = 0` — nobody has reached
checkout, so no record exists.

### The corrected comparison

    OLD page   ViewContent 161 | real carts 1 | checkout 0 | purchase 0
    NEW page   ViewContent 106 | real carts 1 | checkout 0 | purchase 0

No improvement and no regression. One cart against one cart.

### What I got wrong

I wrote, in the same message, that 4 carts from 13 product views "is the
signature of one person", and then kept presenting the figure as 4. I had the
right reading and did not apply it to my own numbers.

Worse, `ab.py` announced "3.8% — better" twenty minutes earlier, off two faults
at once: a 30-view gate low enough that four events in a single hour could flip
the verdict, and counting events as if they were carts. Both patched — the gate
is now 150 views, and the docstring carries the warning that AddToCart is an
event count and an upper bound, to be confirmed in Shopify before anything is
believed. The tool now correctly refuses to judge at 106 views.

This is the second counting bug today, after the cart-alias double count at
14:15, and both inflated the figures in the direction of good news. Rule:
*before reporting a conversion number, ask what the source counts — events,
sessions or orders — and say which.*

## 20.11, 17:41 — the English button is gone, by removal not translation

Verified on the live page rather than taken on trust. Two flags flipped in the
Kaching config:

    stickyAtcEnabled   true -> false
    badgesEnabled      true -> false

`buttonText` is still the string `Choose bundle`, but `stickyAtcEnabled:false`
means the bar never renders, so **no visitor sees English at the buy point any
more.** The page's own Hebrew `הוספה לסל` button is intact and the bundle app
still loads.

Worth naming once, not nagging: he removed the sticky bar rather than
translating it. A persistent buy button on mobile usually helps conversion, so
this trades one small negative (an English word) for the loss of one small
positive (an always-visible CTA). Translating `buttonText` to «בחרו חבילה» and
re-enabling would have kept both. His call; the setting is one toggle either way.

### Measurement marker

    at the moment of the change, 20.11 17:41
      pixel since 12.11   PageView 435 · ViewContent 276 · AddToCart 9
      new page since 19.11 19:11   ViewContent 115 · real carts 1   (~0.9%)
      campaign today      51.75₪ · 451 imp · 43 LPV · 1 cart · 0 checkout

Everything after this timestamp is the post-fix sample. The step being measured
is **product view → cart**, which is where the money actually dies; it is not
cart → checkout, and the earlier claim that the bundle widget explained zero
checkouts was retracted at 17:20. Zero checkouts off one cart is expected, not
a defect.

Needs ~150 clean product views before the comparison means anything.

## 20.11, 19:15 — he sent Shopify's own funnel. The pixel was inflating 6x.

    Shopify, today    sessions 61..70 | added to cart 2 | reached checkout 1 | completed 0
    pixel,    today    AddToCart 12 events | InitiateCheckout 2 events

**Twelve pixel AddToCart events are two sessions.** Everything I built on the
pixel's cart count was noise at a factor of six, and I had already been caught
by it twice today. Switching the measurement to ShopifyQL `sessions`, which is
deduplicated by session and is what the merchant's own dashboard shows.

    FROM sessions SHOW sessions, sessions_with_cart_additions,
         sessions_that_reached_checkout, sessions_that_completed_checkout
         TIMESERIES day SINCE -6d UNTIL today

    14.11   2 sessions   0 cart  0 checkout  0 order
    15.11   5            0       0           0
    16.11  19            1       0           0
    17.11  13            0       0           0
    18.11  30            0       0           0
    19.11  40            0       0           0
    20.11  70            2       1           0     <- biggest traffic day ever

### What is actually true now

* **70 sessions today**, 1.75x yesterday and 5x 17.11. The new campaign works.
* **The first checkout in the store's history.** Not a pixel artefact — Shopify
  counted one session that reached checkout. There had never been one.
* **The new page converts better, directionally:** old page 1 cart / 109
  sessions = 0.92%; new page 2 / 70 = 2.86%. Three times better, on two carts.
  Two. One empty day puts it back at 1.4%. Right direction, no weight yet.
* Cumulative: 179 sessions, 3 carts (1.7%), 1 checkout, 0 orders. Still about
  five times under the 8-12% a healthy store runs.

### The projection worth holding on to

At today's rate — 70 sessions, 2.9% to cart, about half of carts reaching
checkout — the store produces roughly one checkout a day. If checkout→payment
runs at a normal ~50%, that is **an order every two days on 140₪ of spend**
against a 107₪ break-even. Still a loss, but a closable one rather than a
chasm. That is the first time any projection in this account has landed in
closable range.

Rule recorded, third counting lesson of the day: *the pixel counts events, the
merchant's analytics counts sessions, and only the second answers "how many
people". Query Shopify before reporting any funnel number.*

## 20.11, 19:25 — reviews: closed, for the third and last time

He said the reviews are already in the store. Verified against the product
rather than asked again:

    product 15449665404980
      reviews.rating        4.5 / 5
      reviews.rating_count  13     (was 12 — he has been adding them)

They are live, they are in the metafields, and the PDP kicker already reads
«הנמכר ביותר · 4.5 מתוך 5».

**This is the third time I have raised reviews as an open item after being told
they were fine.** The first was a wrong report that the page had none (I read
the DOM 3.5s in). The second was reporting the Loox widget broken when
`loox.io` is simply blocked in this sandbox and never loaded in my browser.
Tonight I listed the import as pending work again, in a message to him, after
both retractions were already written down in this file.

Removed from the open-items list permanently. The underlying failure is not
about reviews: a retraction recorded in the log does not stop me repeating the
claim unless the open-items list itself is corrected. Rule: *when a claim is
retracted, delete it from the list that will be read back, not only from the
narrative.*

### Open items, rewritten

1. The UGC video he is making himself — upload as a new ad when it arrives.
2. The Kaching sticky bar, off since 17:41 — his call whether it comes back
   translated as «בחרו חבילה».
3. Nothing else. Reviews are done, the page is published, the pixel is on
   Advanced Matching, placements are clean.
