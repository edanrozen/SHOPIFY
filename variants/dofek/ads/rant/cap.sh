#!/bin/bash
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
T=t; D=36.84
ffmpeg -y -loglevel error -i base.mp4 \
 -loop 1 -i $T/c1.png  -loop 1 -i $T/c2.png  -loop 1 -i $T/c3.png  -loop 1 -i $T/c4.png \
 -loop 1 -i $T/c5.png  -loop 1 -i $T/c6.png  -loop 1 -i $T/c7.png  -loop 1 -i $T/c8.png \
 -loop 1 -i $T/c9.png  -loop 1 -i $T/c11.png -loop 1 -i $T/c12.png -loop 1 -i $T/c13.png \
 -loop 1 -i $T/c14.png -loop 1 -i $T/c15.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,0.15,1.05)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,1.60,3.10)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,3.35,6.45)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,6.65,8.05)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,8.25,9.55)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,9.75,12.65)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,12.85,15.40)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,15.55,17.55)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,17.70,20.50)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,20.75,22.15)'[a10];\
[a10][11:v]overlay=0:0:enable='between(t,22.35,25.50)'[a11];\
[a11][12:v]overlay=0:0:enable='between(t,25.75,27.55)'[a12];\
[a12][13:v]overlay=0:0:enable='between(t,27.75,30.10)'[a13];\
[a13][14:v]overlay=0:0:enable='between(t,30.35,33.55)'[vout]" \
 -map "[vout]" -map 0:a -t $D \
 -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a copy capped.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 capped.mp4
