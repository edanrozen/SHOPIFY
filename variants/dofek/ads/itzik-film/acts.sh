#!/bin/bash
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim/clips/seg
X=0.4   # cross-dissolve between acts
A1=$(ffprobe -v error -show_entries format=duration -of csv=p=0 act1.mp4)
A2=$(ffprobe -v error -show_entries format=duration -of csv=p=0 act2.mp4)
A3=$(ffprobe -v error -show_entries format=duration -of csv=p=0 act3.mp4)
O1=$(python3 -c "print(round($A1-$X,3))")
O2=$(python3 -c "print(round($A1+$A2-2*$X,3))")
O3=$(python3 -c "print(round($A1+$A2+$A3-3*$X,3))")
ffmpeg -y -loglevel error -i act1.mp4 -i act2.mp4 -i act3.mp4 -i act4.mp4 -filter_complex "\
[0:v][1:v]xfade=transition=fade:duration=$X:offset=$O1[v1];\
[v1][2:v]xfade=transition=fade:duration=$X:offset=$O2[v2];\
[v2][3:v]xfade=transition=fade:duration=$X:offset=$O3[vout];\
[0:a][1:a]acrossfade=d=$X:c1=tri:c2=tri[a1];\
[a1][2:a]acrossfade=d=$X:c1=tri:c2=tri[a2];\
[a2][3:a]acrossfade=d=$X:c1=tri:c2=tri[aout]" \
-map "[vout]" -map "[aout]" -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p \
-c:a aac -b:a 192k -ar 48000 -ac 2 ../../base.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 ../../base.mp4
