#!/bin/bash
# Nine voice lines, each placed at the frame where its shot's mouth starts moving.
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
D=36.84
M=${1:-vo/mzr2.mp3}; MV=${2:-0.17}; MT=${3:-0.94}
ffmpeg -y -loglevel error -i capped.mp4 \
 -i vo/y1.wav -i vo/y2.wav -i vo/y3.wav -i vo/y4.wav -i vo/y5.wav \
 -i vo/y6.wav -i vo/y7.wav -i vo/y8.wav -i vo/y9.wav -i "$M" \
 -filter_complex "\
[1:a]volume=1.0[a1];[2:a]volume=1.0[a2];[3:a]volume=1.0[a3];[4:a]volume=1.05[a4];\
[5:a]volume=1.05[a5];[6:a]volume=1.05[a6];[7:a]volume=1.0[a7];[8:a]volume=1.0[a8];\
[9:a]volume=1.0[a9];\
[a1][a2][a3][a4][a5][a6][a7][a8][a9]amix=inputs=9:duration=longest:normalize=0,\
apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[10:a]atempo=$MT,atrim=0:$D,asetpts=N/SR/TB,volume=$MV,apad,atrim=0:$D,asetpts=N/SR/TB[mus];\
[mus][vb1]sidechaincompress=threshold=0.03:ratio=12:attack=8:release=350[musduck];\
[vb2][musduck]amix=inputs=2:duration=first:normalize=0,volume=9.5dB,alimiter=limit=0.75,volume=-5.5dB,\
apad,atrim=0:$D,asetpts=N/SR/TB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-rant.mp4
ffmpeg -hide_banner -nostats -i dofek-rant.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
