import json, urllib.request, urllib.parse
AD="120255333121540523"; V="v21.0"
def get(path, params):
    url=f"https://graph.facebook.com/{V}/{path}?"+urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url, timeout=60) as r: return json.load(r)
    except urllib.error.HTTPError as e:
        return {"__err": e.code, "__body": e.read().decode()[:400]}

r = get(f"{AD}/insights", {
 "date_preset":"maximum",
 "fields":"ad_name,impressions,spend,video_play_actions,video_thruplay_watched_actions,"
          "video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,"
          "video_p95_watched_actions,video_p100_watched_actions,video_avg_time_watched_actions"})
print(json.dumps(r, ensure_ascii=False, indent=1)[:2500])
