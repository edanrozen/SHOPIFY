#!/bin/bash
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
T=titles; D=20.00
# k1 0.00-5.00 | k2 5.00-9.25 | k3 9.25-11.90 | k4 11.90-14.20 | k5 14.20-17.15 | k6 17.15-20.00
ffmpeg -y -loglevel error -i base20.mp4 \
 -loop 1 -i $T/q1.png -loop 1 -i $T/q3.png -loop 1 -i $T/q4.png \
 -loop 1 -i $T/q7.png -loop 1 -i $T/q10.png \
 -loop 1 -i $T/q11.png -loop 1 -i $T/q12.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,1.30,4.70)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,5.25,6.55)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,6.65,8.55)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,9.45,11.30)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,14.30,17.05)'[a5];\

[a5]null[vout]" \
 -map "[vout]" -map 0:a -t $D \
 -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a copy capped20.mp4
ffmpeg -y -loglevel error -i capped20.mp4 -i vo/v6.mp3 -i vo/music40.mp3 \
 -filter_complex "\
[0:a]volume=1.0[dlg];[1:a]adelay=17500|17500,volume=1.18[nar];\
[dlg][nar]amix=inputs=2:duration=longest:normalize=0,apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[2:a]atrim=0:$D,asetpts=N/SR/TB,volume=0.34,apad,atrim=0:$D,asetpts=N/SR/TB[mus];\
[mus][vb1]sidechaincompress=threshold=0.035:ratio=10:attack=10:release=400[musduck];\
[vb2][musduck]amix=inputs=2:duration=first:normalize=0,volume=7.5dB,alimiter=limit=0.75,volume=-1.9dB,\
apad,atrim=0:$D,asetpts=N/SR/TB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-itzik-20s.mp4
ffmpeg -hide_banner -nostats -i dofek-itzik-20s.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
