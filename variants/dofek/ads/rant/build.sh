#!/bin/bash
# DOFEK · direct-address rant. Itzik talks straight at the viewer.
# Six lip-synced shots carry the argument; three silent cutaways from the
# earlier film carry the lines that are better shown than said.
set -e
R=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
A=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim/clips
cd $R; S=seg; rm -rf $S; mkdir -p $S
V="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=24,setsar=1"
# Talking shots are silent now. sync_so was measured to CUT mouth motion by
# 22% (15.36 -> 11.96 mean in the mouth crop) and added nothing visible, so it
# was dropped; these are raw kling with an explicit articulation prompt and the
# voice is laid over them in the mix, same as the cutaways.
tk () { ffmpeg -y -loglevel error -ss $2 -t $3 -i cl/$1.mp4 \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "$V" -shortest -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k $S/$4.mp4; }
# silent cutaway from the earlier film; voice is laid over it in the mix
cut () { ffmpeg -y -loglevel error -ss $2 -t $3 -i $A/$1.mp4 \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "$V" -shortest -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k $S/$4.mp4; }

# Each talking segment now starts 0.18s before the mouth actually begins to
# move (measured with onset.py), and its voice line is placed at that same
# point, so speech and lips start together.
tk  T1 0.82 3.18 p01   # "סתום ת'פה"  ·  "כן כן, אתה"        mouth from 1.00
tk  T2 0.15 4.89 p02   # "אם הברך כואבת לך כל יום..."         mouth from 0.33
tk  T3 0.40 4.64 p03   # "אז תמשיך. תמשיך לסבול במקום לקנות"  mouth from 0.58
# Two cutaways, not three. The three VO lines ran 9.9s against 7.0s of picture;
# "כל פעילות כמו אירוע שלם" is the abstract one and "לא נמאס לך ללכת לעבודה
# ולסבול" already makes the point concretely, so it goes.
# "ולחזור ללכת כמו בן אדם, לא כמו חיה פצועה" is one sentence describing two
# opposite states. Both halves used to sit on the suffering shot, so the line
# about walking like a human played over a man bent double. Split it.
cut c10 0.35 2.70 p03b # braced leg climbing the ladder — "ולחזור ללכת כמו בן אדם"
cut c02 0.60 2.10 p04  # bent under a plaster sack     — "לא כמו חיה פצועה"
cut c01 0.45 2.95 p05  # slumped at the ladder         — "לא נמאס לך ללכת לעבודה ולסבול"
tk  T4 0.03 5.01 p07   # "די. די כבר. להתלונן או למצוא פתרון?"  mouth from 0.21
tk  T5 0.44 4.60 p08   # "רוצה פתרון? תלחץ פה... באחריות מלאה"   mouth from 0.62
tk  T6 0.40 3.43 p09   # "יאללה, תזמין ותספר לי איך היה"         mouth from 0.58
ffmpeg -y -loglevel error -framerate 24 -i t/endseq/f%04d.png \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "fps=24,setsar=1" -shortest -c:v libx264 -crf 18 -preset veryfast \
  -pix_fmt yuv420p -c:a aac -b:a 192k $S/p10.mp4

cd $S
: > list.txt; for f in p01 p02 p03 p03b p04 p05 p07 p08 p09 p10; do echo "file '$f.mp4'" >> list.txt; done
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt \
  -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -pix_fmt yuv420p ../base.mp4
acc=0
for f in p01 p02 p03 p03b p04 p05 p07 p08 p09 p10; do
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $f.mp4)
  printf "%s start=%6.2f dur=%5.2f\n" $f $acc $d
  acc=$(python3 -c "print(round($acc+$d,2))")
done
echo "TOTAL $acc"
