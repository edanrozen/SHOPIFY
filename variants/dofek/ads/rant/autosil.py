#!/usr/bin/env python3
"""autosil.py <video> <audio>

Finds the highest-motion patch in a locked-off talking shot (that is the mouth)
without being told where to look, then reports how much that patch moves while
the voice is silent against how much it moves while the voice speaks.

A properly synced head holds still between words: ratio 5-10.
A head that flaps continuously scores 1-3, and reads as "delay" to a viewer
even when the cross-correlation lag is zero.
"""
import subprocess, sys, array, math

vid, aud = sys.argv[1], sys.argv[2]
FPS, W, H = 12, 64, 114          # analysis grid
GW, GH = 8, 8                    # patch grid over the frame

raw = subprocess.run(
    ["ffmpeg", "-v", "error", "-i", vid, "-vf",
     f"fps={FPS},scale={W}:{H},format=gray", "-f", "rawvideo", "-"],
    capture_output=True).stdout
n = len(raw) // (W * H)
frames = [raw[i * W * H:(i + 1) * W * H] for i in range(n)]

# per-patch mean absolute frame difference, per frame pair
pw, ph = W // GW, H // GH
patch = [[0.0] * (n - 1) for _ in range(GW * GH)]
for t in range(n - 1):
    a, b = frames[t], frames[t + 1]
    for gy in range(GH):
        for gx in range(GW):
            s = 0
            for y in range(gy * ph, (gy + 1) * ph):
                o = y * W + gx * pw
                for x in range(pw):
                    s += abs(a[o + x] - b[o + x])
            patch[gy * GW + gx][t] = s / (pw * ph)

tot = [sum(p) for p in patch]
best = max(range(len(tot)), key=lambda i: tot[i])
m = patch[best]

# audio envelope on the same grid
pcm = subprocess.run(
    ["ffmpeg", "-v", "error", "-i", aud, "-ac", "1", "-ar", "16000",
     "-f", "s16le", "-"], capture_output=True).stdout
s = array.array("h"); s.frombytes(pcm[:len(pcm) // 2 * 2])
win = 16000 // FPS
env = []
for i in range(0, len(s) - win, win):
    acc = 0
    for v in s[i:i + win]:
        acc += v * v
    env.append(math.sqrt(acc / win))

L = min(len(m), len(env))
pk = max(env[:L]) or 1.0
sil = [m[i] for i in range(L) if env[i] < pk * 0.06]
spk = [m[i] for i in range(L) if env[i] > pk * 0.35]
ms = sum(sil) / len(sil) if sil else 0.0
mk = sum(spk) / len(spk) if spk else 0.0
print("%-10s patch %d,%d  silence %3d fr %5.2f | speech %3d fr %5.2f | ratio %s"
      % (vid.split("/")[-1], best % GW, best // GW, len(sil), ms, len(spk), mk,
         ("%.2f" % (mk / ms)) if ms > 0.01 else "inf"))
