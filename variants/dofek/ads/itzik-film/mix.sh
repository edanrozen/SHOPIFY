#!/bin/bash
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
ffmpeg -y -loglevel error -i capped.mp4 -i vo/v1.mp3 -i vo/v6.mp3 -i vo/v7.mp3 -i vo/music.mp3 \
 -filter_complex "\
[0:a]volume=1.0[dlg];\
[1:a]adelay=150|150,volume=1.15[a1];\
[2:a]adelay=29850|29850,volume=1.15[a2];\
[3:a]adelay=33250|33250,volume=1.15[a3];\
[dlg][a1][a2][a3]amix=inputs=4:duration=longest:normalize=0,apad,atrim=0:35.666,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[4:a]volume=0.34,apad,atrim=0:35.666,asetpts=N/SR/TB[mus];\
[mus][vb1]sidechaincompress=threshold=0.035:ratio=10:attack=10:release=400[musduck];\
[vb2][musduck]amix=inputs=2:duration=first:normalize=0,\
alimiter=limit=0.95,loudnorm=I=-15:TP=-1.5:LRA=9,\
apad,atrim=0:35.666,asetpts=N/SR/TB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t 35.666 \
 dofek-itzik-FINAL.mp4
