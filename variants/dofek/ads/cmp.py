import json, urllib.request, urllib.parse, time
B="https://graph.facebook.com/v21.0/"
def g(path, params):
    u=B+path+"?"+urllib.parse.urlencode(params)
    for _ in range(4):
        try: return json.load(urllib.request.urlopen(urllib.request.Request(u)))
        except Exception as e:
            try:
                err=json.loads(e.read().decode()).get("error",{})
                if err.get("code")==613: time.sleep(32); continue
                return {"err": err.get("message","?")}
            except Exception: return {"err": str(e)}
    return {"err":"rate"}
def lpv(x): return sum(int(a["value"]) for a in (x.get("actions") or []) if a["action_type"]=="landing_page_view")
# Meta reports ONE cart under six aliases (add_to_cart, omni_add_to_cart,
# onsite_web_add_to_cart, offsite_conversion.fb_pixel_add_to_cart, ...).
# Summing more than one of them double-counts. Take the single canonical field.
def cart(x):
    for a in (x.get("actions") or []):
        if a["action_type"] == "add_to_cart": return int(a["value"])
    return 0
F="spend,impressions,clicks,actions"

old=(g("120255262154620523/insights", {"fields":F,"date_preset":"maximum"}).get("data") or [{}])[0]
new=g("120255333119900523/insights", {"fields":F,"date_preset":"today","breakdowns":"publisher_platform","limit":"20"}).get("data") or []

def show(lbl, sp, im, ck, lp, ct):
    print("%-22s spend %7.2f  imp %5d  clk %3d  CTR %5.2f%%  CPM %6.2f  LPV %3d  clk→LPV %4s  ₪/LPV %6s  cart %d" % (
        lbl, sp, im, ck, 100.0*ck/im if im else 0, 1000.0*sp/im if im else 0, lp,
        ("%.0f%%"%(100.0*lp/ck)) if ck else "-", ("%.2f"%(sp/lp)) if lp else "-", ct))

show("OLD campaign (4 days)", float(old.get("spend") or 0), int(old.get("impressions") or 0),
     int(old.get("clicks") or 0), lpv(old), cart(old))
tot=[0.0,0,0,0,0]; cl=[0.0,0,0,0,0]
for x in new:
    v=[float(x.get("spend") or 0), int(x.get("impressions") or 0), int(x.get("clicks") or 0), lpv(x), cart(x)]
    tot=[a+b for a,b in zip(tot,v)]
    if x.get("publisher_platform")!="audience_network": cl=[a+b for a,b in zip(cl,v)]
show("NEW all-in (7 hours)", *tot)
show("NEW clean fb+ig only", *cl)
