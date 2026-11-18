#!/bin/bash
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
T=t; D=37.04
ffmpeg -y -loglevel error -i base.mp4 \
 -loop 1 -i $T/c1.png  -loop 1 -i $T/c2.png  -loop 1 -i $T/c3.png  -loop 1 -i $T/c4.png \
 -loop 1 -i $T/c5.png  -loop 1 -i $T/c6.png  -loop 1 -i $T/c7.png  -loop 1 -i $T/c8.png \
 -loop 1 -i $T/c9.png  -loop 1 -i $T/c11.png -loop 1 -i $T/c12.png -loop 1 -i $T/c13.png \
 -loop 1 -i $T/c14.png -loop 1 -i $T/c15.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,0.25,1.15)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,1.70,3.20)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,3.55,6.70)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,6.90,8.35)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,8.55,9.85)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,10.00,13.20)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,13.45,15.90)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,16.10,17.95)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,18.25,20.90)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,21.15,22.55)'[a10];\
[a10][11:v]overlay=0:0:enable='between(t,22.80,25.90)'[a11];\
[a11][12:v]overlay=0:0:enable='between(t,26.10,27.90)'[a12];\
[a12][13:v]overlay=0:0:enable='between(t,28.10,30.85)'[a13];\
[a13][14:v]overlay=0:0:enable='between(t,31.20,33.75)'[vout]" \
 -map "[vout]" -map 0:a -t $D \
 -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a copy capped.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 capped.mp4
