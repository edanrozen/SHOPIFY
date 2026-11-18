#!/bin/bash
# DOFEK · direct-address rant. Itzik talks straight at the viewer.
# Six lip-synced shots carry the argument; three silent cutaways from the
# earlier film carry the lines that are better shown than said.
set -e
R=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
A=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim/clips
cd $R; S=seg; rm -rf $S; mkdir -p $S
V="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=24,setsar=1"
# talking shot: keep its baked-in lip-synced audio
tk () { ffmpeg -y -loglevel error -ss $2 -t $3 -i cl/$1.mp4 -vf "$V" \
  -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 $S/$4.mp4; }
# silent cutaway from the earlier film; voice is laid over it in the mix
cut () { ffmpeg -y -loglevel error -ss $2 -t $3 -i $A/$1.mp4 \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "$V" -shortest -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k $S/$4.mp4; }

tk  L1 0.35 3.30 p01   # "סתום ת'פה"  ·  "כן כן, אתה"
tk  L2 0.05 5.00 p02   # "אם הברך כואבת לך כל יום ובכל זאת לא עושה כלום"
tk  L3 0.15 4.90 p03   # "אז תמשיך. תמשיך לסבול במקום לקנות..."
# Two cutaways, not three. The three VO lines ran 9.9s against 7.0s of picture;
# "כל פעילות כמו אירוע שלם" is the abstract one and "לא נמאס לך ללכת לעבודה
# ולסבול" already makes the point concretely, so it goes.
cut c02 0.30 4.70 p04  # bent under a plaster sack — "כמו בן אדם, לא כמו חיה פצועה"
cut c01 0.45 2.95 p05  # slumped at the ladder     — "לא נמאס לך ללכת לעבודה ולסבול"
tk  L4 0.05 5.00 p07   # "די. די כבר. להתלונן או למצוא פתרון?"
tk  L5 0.10 4.95 p08   # "רוצה פתרון? תלחץ פה... באחריות"
tk  L6 0.30 2.80 p09   # "יאללה, תזמין ותספר לי איך היה"
ffmpeg -y -loglevel error -framerate 24 -i t/endseq/f%04d.png \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "fps=24,setsar=1" -shortest -c:v libx264 -crf 18 -preset veryfast \
  -pix_fmt yuv420p -c:a aac -b:a 192k $S/p10.mp4

cd $S
: > list.txt; for f in p01 p02 p03 p04 p05 p07 p08 p09 p10; do echo "file '$f.mp4'" >> list.txt; done
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt \
  -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -pix_fmt yuv420p ../base.mp4
acc=0
for f in p01 p02 p03 p04 p05 p07 p08 p09 p10; do
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f.mp4)
  printf "%s start=%6.2f dur=%5.2f\n" $f $acc $d
  acc=$(python3 -c "print(round($acc+$d,2))")
done
echo "TOTAL $acc"
