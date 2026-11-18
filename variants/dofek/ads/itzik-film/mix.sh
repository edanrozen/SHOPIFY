#!/bin/bash
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
D=40.45
# dialogue (baked into the clips) + narrator over the end card + ducked music bed
ffmpeg -y -loglevel error -i capped.mp4 -i vo/v6.mp3 -i vo/music40.mp3 \
 -filter_complex "\
[0:a]volume=1.0[dlg];[1:a]adelay=37200|37200,volume=1.18[nar];\
[dlg][nar]amix=inputs=2:duration=longest:normalize=0,apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[2:a]atempo=0.990,volume=0.34,apad,atrim=0:$D,asetpts=N/SR/TB[mus];\
[mus][vb1]sidechaincompress=threshold=0.035:ratio=10:attack=10:release=400[musduck];\
[vb2][musduck]amix=inputs=2:duration=first:normalize=0,volume=6.8dB,alimiter=limit=0.75,volume=-1.9dB,\
apad,atrim=0:$D,asetpts=N/SR/TB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-itzik-FINAL.mp4
ffmpeg -hide_banner -nostats -i dofek-itzik-FINAL.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -6
