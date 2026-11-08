# The returns claim, and what is left contradicting it

## What was decided

The site carried "30 יום ניסיון" on the homepage, on every product page, in the
buy box note and on the about page, while `shipping-returns` said a product may
be returned within 14 days **and only if unopened**. A trial you may not open is
not a trial, and 14 is not 30. The merchant chose to drop the claim rather than
extend the policy to match it, so every page now states the statutory position
and nothing more.

Replaced everywhere:

    was   30 יום ניסיון / מנסים בבית, ואם לא התאים מחזירים
    now   14 יום לביטול עסקה / לפי חוק הגנת הצרכן, מיום קבלת המוצר

    was   משלוח חינם מעל 199 ₪ · 30 יום ניסיון
    now   משלוח חינם מעל 199 ₪ · 14 יום לביטול עסקה

Thirteen theme files (ten product templates, index, collection, and the
wf-product schema default) plus the live `about` page. The about page's
"ההבטחה" section, which promised the trial, now lists the four things the
policy actually commits to: cancel before dispatch, damaged on arrival, a
package delayed past 21 business days, and the statutory 14 days. All four are
quoted from `shipping-returns`, so the page can be checked against the policy.

## What is still contradicting itself

Found while sweeping for the trial claim. None of it was touched, because
rewriting statutory policy text is the merchant's call and takes effect on the
live store immediately.

**Delivery time is stated two different ways.** The shipping *policy* says
14 to 56 business days. The shipping *page*, the FAQ page, the contact page and
Bloom's FAQ metafield all say 10 to 14 business days. Fifty six business days
is eleven weeks. Whichever is true, the other is telling customers something
false, and this is the same shape of problem as the trial claim was.

**The refund policy sets a 90 business day refund window.** That is about four
and a half months, and the shipping-returns page says the refund returns to the
original payment method within 14 days of the cancellation notice. The two
cannot both hold.

**The refund policy says a package not collected from a pickup point forfeits
the right to cancel and to a refund**, and requires the product be returned
"לא בשימוש כלל". Both narrow the statutory cancellation right rather than
restate it. Worth a lawyer's eye before the first order, not a copywriter's.

**The contact-information policy still contains an unfilled template
placeholder**: "(להכניס כאן את שם המותג שלך)". That one is live and visible.

## The claims that were removed from product data

`custom.badge` renders nowhere in the current theme, so neither of these was
ever shown to a customer, but both were wrong as data:

    bloom-grooming-station      "מוצר הדגל"  →  "עמדת טיפוח"
    hair-remover-wood-handle    "רב מכר"     →  "ידית עץ אשור"

"רב מכר" is a factual claim about sales on a shop with zero orders. Bloom's
`מוצר הדגל` product tag was removed as well; `עמדת טיפוח` already covered it.

## Free shipping on everything

The merchant's own shipping cost is close to zero, so the 199 ₪ threshold was
recovering a cost that did not exist. It charged 29.90 ₪ at the single most
sensitive moment in the order, and only one of the nine products could clear it
alone, so the incentive it was meant to create was unreachable for most carts.

Changed at the source first, then in the copy, in that order. Copy that promises
free shipping over a checkout that still charges is worse than the threshold it
replaced.

    Shopify delivery profile "פרופיל כללי", zone ישראל
      משלוח חינם, 10 עד 14 ימי עסקים    condition ≥ 199 ₪  →  ≥ 0 ₪
      משלוח עד הבית, 10 עד 14 ימי עסקים  29.90 ₪            →  deactivated

Deactivated rather than deleted, so it can be switched back without rebuilding
the rate.

Then the copy, in order of how visible it is:

    announcement bar   משלוח חינם לכל הארץ, בכל הזמנה     every page, always in view
    trust row          משלוח חינם לכל הארץ / בכל הזמנה, בלי סכום מינימום
    buy box            משלוח חינם, בכל הזמנה              beside the price
    note under button  משלוח חינם · 14 יום לביטול עסקה

The product card lost its shipping line. It was conditional on clearing the
threshold; with the threshold gone it was true on all nine cards at once, and a
line that repeats identically under every product in a grid stops being read.
Removing it also made every card the same height, which the conditional version
had prevented.

Two things deliberately not done. Prices were not raised to absorb the 29.90 ₪,
because that is a separate decision about nine live prices and it interacts with
the compare_at values the launch band computes from. And the North America zone
still charges $10 under $50; the store is Hebrew and sells to Israel, but the
site now says free shipping without qualification, so that zone should either be
switched off or the claim qualified.

## A deployment trap worth remembering

`themeDuplicate` returns as soon as the theme record exists and copies its files
in the background. A `themeFilesUpsert` sent immediately after can succeed and
then be silently overwritten by that copy. It happened here to the first file
written after the duplicate, `snippets/wf-card.liquid`: the mutation reported
success, and the theme still held the old version. Only the md5 check caught it.
Verify every file after a duplicate, or leave a gap before the first write.
