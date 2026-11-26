#!/bin/bash
# 20-second cut. Own trim values, not the full film's segments.
# Kept: hook / the colleague's challenge / the wife / the dial / the payoff / end card.
# Dropped: ladder, refusal, phone, courier, box, hands-fitting — no room, and the
# dial macro alone carries the product.
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
C=clips; S=clips/seg20; T=titles
rm -rf $S; mkdir -p $S
V="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=24,setsar=1"
mkaz () { ffmpeg -y -loglevel error -ss $2 -t $3 -i $C/$1.mp4 \
  -vf "crop=iw/1.28:ih/1.28:(iw-iw/1.28)/2:(ih-ih/1.28)/2,$V" \
  -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 $S/$4.mp4; }
mka () { ffmpeg -y -loglevel error -ss $2 -t $3 -i $C/$1.mp4 -vf "$V" \
  -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 $S/$4.mp4; }
mks () { ffmpeg -y -loglevel error -ss $2 -t $3 -i $C/$1.mp4 \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "$V" -shortest -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k $S/$4.mp4; }

mka G02  0.30 3.70 k1   # HOOK: the ladder, the knee gives  "אוף... לא מצליח"
mka  K03n 0.40 1.65 k2   # colleague, wide       "די להיות עקשן איציק"
mkaz K03n 2.05 2.60 k2b  # punch-in              "תקנה את מגן הברך של DOFEK"
mka L06n 0.70 2.65 k3   # wife                  "כמה אפשר לסבול"
mks c12  0.40 2.30 k4   # macro on the dial
mka G12  0.50 2.95 k5   # the ladder, climbed   "וואלה... זה עובד"
ffmpeg -y -loglevel error -framerate 24 -i $T/endseq/f%04d.png \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "fps=24,setsar=1,tpad=stop_mode=clone:stop_duration=0.32" -shortest \
  -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 192k $S/k6.mp4
cd $S
: > list.txt; for f in k1 k2 k2b k3 k4 k5 k6; do echo "file '$f.mp4'" >> list.txt; done
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt \
 -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 \
 -pix_fmt yuv420p ../../base20.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 ../../base20.mp4
