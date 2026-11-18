#!/bin/bash
# Caption windows read off ../seg.py on base.mp4 — measured, never chosen by hand.
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
T=titles; D=40.20
ffmpeg -y -loglevel error -i base.mp4 \
 -loop 1 -i $T/q2.png  -loop 1 -i $T/q1.png  -loop 1 -i $T/q3.png  -loop 1 -i $T/q4.png \
 -loop 1 -i $T/q5.png  -loop 1 -i $T/q6.png  -loop 1 -i $T/q7.png  -loop 1 -i $T/q8.png \
 -loop 1 -i $T/q9.png  -loop 1 -i $T/q10.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,0.60,2.95)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,4.90,8.35)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,9.05,10.25)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,10.35,12.45)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,13.30,16.30)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,16.70,18.60)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,19.35,20.95)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,24.70,25.75)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,27.10,28.65)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,33.80,36.65)'[vout]" \
 -map "[vout]" -map 0:a -t $D \
 -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a copy capped.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 capped.mp4
