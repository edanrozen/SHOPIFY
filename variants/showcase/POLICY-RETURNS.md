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
