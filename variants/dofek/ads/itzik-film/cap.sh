#!/bin/bash
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
T=titles
ffmpeg -y -loglevel error -i base.mp4 \
 -loop 1 -i $T/q1.png -loop 1 -i $T/q2.png -loop 1 -i $T/q3.png -loop 1 -i $T/q4.png \
 -loop 1 -i $T/q5.png -loop 1 -i $T/q6.png -loop 1 -i $T/q7.png -loop 1 -i $T/q8.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,0.20,2.30)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,5.30,7.10)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,7.20,9.00)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,9.20,12.60)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,15.40,17.60)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,22.60,24.40)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,29.90,31.60)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,31.70,33.00)'[vout]" \
 -map "[vout]" -map 0:a -t 35.666 \
 -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a copy capped.mp4
