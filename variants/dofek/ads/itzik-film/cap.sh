#!/bin/bash
# Caption windows come from ../seg.py run on base.mp4 — measured, not guessed.
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
T=titles; D=40.45
ffmpeg -y -loglevel error -i base.mp4 \
 -loop 1 -i $T/q1.png  -loop 1 -i $T/q2.png  -loop 1 -i $T/q3.png  -loop 1 -i $T/q4.png \
 -loop 1 -i $T/q5.png  -loop 1 -i $T/q6.png  -loop 1 -i $T/q7.png  -loop 1 -i $T/q8.png \
 -loop 1 -i $T/q9.png  -loop 1 -i $T/q10.png -loop 1 -i $T/q11.png -loop 1 -i $T/q12.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,1.30,4.70)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,5.15,7.40)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,9.15,10.50)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,10.60,12.50)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,13.35,16.45)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,16.90,18.85)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,19.65,21.50)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,24.95,26.55)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,27.40,28.95)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,34.00,36.75)'[a10];\

[a10]null[vout]" \
 -map "[vout]" -map 0:a -t $D \
 -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a copy capped.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 capped.mp4
