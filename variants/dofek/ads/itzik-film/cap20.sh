#!/bin/bash
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
T=titles; D=20.00
ffmpeg -y -loglevel error -i base20.mp4 \
 -loop 1 -i $T/q2.png -loop 1 -i $T/q3.png -loop 1 -i $T/q4.png \
 -loop 1 -i $T/q7.png -loop 1 -i $T/q10.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,0.55,2.95)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,4.05,5.25)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,5.40,7.50)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,8.40,10.00)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,13.25,15.80)'[vout]" \
 -map "[vout]" -map 0:a -t $D \
 -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a copy capped20.mp4
ffmpeg -y -loglevel error -i capped20.mp4 -i vo/v6.mp3 -i vo/m1.mp3 \
 -filter_complex "\
[0:a]volume=1.0[dlg];[1:a]adelay=16250|16250,volume=1.18[nar];\
[dlg][nar]amix=inputs=2:duration=longest:normalize=0,apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[2:a]atrim=0:$D,asetpts=N/SR/TB,volume=0.19,apad,atrim=0:$D,asetpts=N/SR/TB[mus];\
[mus][vb1]sidechaincompress=threshold=0.035:ratio=10:attack=10:release=400[musduck];\
[vb2][musduck]amix=inputs=2:duration=first:normalize=0,volume=8.3dB,alimiter=limit=0.75,volume=-1.9dB,\
apad,atrim=0:$D,asetpts=N/SR/TB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-itzik-20s.mp4
ffmpeg -hide_banner -nostats -i dofek-itzik-20s.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
