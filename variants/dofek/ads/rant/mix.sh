#!/bin/bash
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
D=37.04
M=${1:-vo/mzr2.mp3}
MV=${2:-0.17}
MT=${3:-1.0}
ffmpeg -y -loglevel error -i capped.mp4 \
 -i vo/x1.wav -i vo/x2.wav -i "$M" \
 -filter_complex "\
[0:a]volume=1.0[dlg];\
[1:a]volume=1.05[v1];[2:a]volume=1.05[v2];\
[dlg][v1][v2]amix=inputs=3:duration=longest:normalize=0,\
apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[3:a]atempo=$MT,atrim=0:$D,asetpts=N/SR/TB,volume=$MV,apad,atrim=0:$D,asetpts=N/SR/TB[mus];\
[mus][vb1]sidechaincompress=threshold=0.03:ratio=12:attack=8:release=350[musduck];\
[vb2][musduck]amix=inputs=2:duration=first:normalize=0,volume=6.8dB,alimiter=limit=0.75,volume=-3.5dB,\
apad,atrim=0:$D,asetpts=N/SR/TB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-rant.mp4
ffmpeg -hide_banner -nostats -i dofek-rant.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
