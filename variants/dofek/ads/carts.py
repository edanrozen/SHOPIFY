import json, urllib.request, urllib.parse
B="https://graph.facebook.com/v21.0/"
def g(path, params):
    u=B+path+"?"+urllib.parse.urlencode(params)
    try: return json.load(urllib.request.urlopen(urllib.request.Request(u)))
    except Exception as e:
        try: return {"err": json.loads(e.read().decode()).get("error",{}).get("message","?")}
        except Exception: return {"err": str(e)}
d=(g("120255262154620523/insights", {"fields":"spend,actions","date_preset":"maximum"}).get("data") or [{}])[0]
print("every cart-ish action on the OLD campaign:")
for a in (d.get("actions") or []):
    if "cart" in a["action_type"] or "checkout" in a["action_type"] or "purchase" in a["action_type"]:
        print("   %-34s %s" % (a["action_type"], a["value"]))
print()
print("per ad:")
for r in (g("120255262154620523/ads", {"fields":"name","limit":"20"}).get("data") or []):
    x=(g(r["id"]+"/insights", {"fields":"actions","date_preset":"maximum"}).get("data") or [{}])[0]
    hits=[(a["action_type"],a["value"]) for a in (x.get("actions") or []) if "cart" in a["action_type"]]
    if hits: print("   %-18s %s" % (r["name"], hits))
