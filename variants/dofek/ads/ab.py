#!/usr/bin/env python3
"""ab.py — the old product page against the new one, on the pixel.

The page was published 19.11 at 19:11 Israel time (17:11Z). Everything before
that hour is the old page, everything after is the new one. The number that
matters is ViewContent -> AddToCart: how many people who looked at the product
put it in the cart. It is measured on the pixel, so it does not depend on ad
attribution and cannot be flattered by it.
"""
import json, urllib.request, collections, sys

PX   = "1063551259717066"
CUT  = "2026-11-19T19:00:00+0200"   # the hour block the publish falls in
B    = "https://graph.facebook.com/v21.0/"

def blocks(start):
    u = B + "%s/stats?aggregation=event&start_time=%s&limit=200" % (PX, start)
    while u:
        r = json.load(urllib.request.urlopen(urllib.request.Request(u)))
        for blk in (r.get("data") or []):
            yield blk["start_time"], {e["value"]: int(e["count"]) for e in (blk.get("data") or [])}
        u = (r.get("paging") or {}).get("next")

before, after = collections.Counter(), collections.Counter()
last = None
for t, d in blocks("2026-11-12"):
    (after if t >= CUT else before).update(d)
    if sum(d.values()): last = t

def row(label, c):
    vc, atc = c.get("ViewContent", 0), c.get("AddToCart", 0)
    ic, pur  = c.get("InitiateCheckout", 0), c.get("Purchase", 0)
    rate = ("%.1f%%" % (100.0 * atc / vc)) if vc else "  -  "
    print("%-14s PageView %4d | ViewContent %4d | AddToCart %3d -> %6s | Checkout %2d | Purchase %2d"
          % (label, c.get("PageView", 0), vc, atc, rate, ic, pur))

print("cut: page published %s\n" % CUT)
row("OLD page", before)
row("NEW page", after)

vcb, vca = before.get("ViewContent", 0), after.get("ViewContent", 0)
atb, ata = before.get("AddToCart", 0),  after.get("AddToCart", 0)
rb = atb / vcb if vcb else 0.0
print("\nbaseline to beat: %.1f%% (%d of %d)" % (100 * rb, atb, vcb))
if vca < 30:
    need = max(0, 30 - vca)
    print("NEW page has %d product views. Too few to judge; %d more needed before"
          " the rate means anything. Expected at this rate: %.1f carts."
          % (vca, need, rb * vca))
else:
    ra = ata / vca if vca else 0.0
    print("NEW page: %.1f%% (%d of %d) — %s" % (100 * ra, ata, vca,
          "better" if ra > rb else "not better yet"))
print("\nlast pixel activity: %s (endpoint lags a few hours)" % last)
