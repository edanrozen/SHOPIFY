#!/bin/bash
# DOFEK · "זה לא הגיל, זה הברך" — act assembly.
# Trim windows are derived from measured speech boundaries (../gap.py), never guessed.
set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim
C=clips; S=clips/seg; T=titles
rm -rf $S; mkdir -p $S
V="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=24,setsar=1"

# shot with dialogue: keep its baked-in lip-synced audio
mka () { ffmpeg -y -loglevel error -ss $2 -t $3 -i $C/$1.mp4 -vf "$V" \
  -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 $S/$4.mp4; }
# silent shot: attach a silent track so concat stays stream-compatible
mks () { ffmpeg -y -loglevel error -ss $2 -t $3 -i $C/$1.mp4 \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "$V" -shortest -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k $S/$4.mp4; }

# ---- ACT 1 · the site -----------------------------------------------
mka T00  0.30 5.00  s1   # walking, limping     groan + "זה הגיל, אני אומר לך"
mka G02  0.55 3.95  s2   # ladder, cannot climb "אוף... לא מצליח"
mka K03n 0.40 4.25  s3   # colleague            "די להיות עקשן איציק / תקנה..."
mka G04  0.25 3.90  s4   # refusal              "לא מגן ולא נעליים. זה הגיל"
# ---- ACT 2 · home ---------------------------------------------------
mka G05n 0.60 2.70  s5   # chair, reaching up   "אני לא מגיע לזה"
mka L06n 0.70 2.65  s6   # wife in the doorway  "חלאס לסבול כבר"
mks c07  0.80 2.60  s7   # she orders on the phone
mka G08n 0.80 2.45  s8   # courier at the door  "תודה רבה לך"
mka L09n 0.75 2.30  s9   # box on the table     "נו תמדוד אותו"
# ---- ACT 3 · the product --------------------------------------------
mks c11  0.30 2.60  s10  # hands fitting the brace
mks c12  0.40 2.50  s11  # macro on the dial
# ---- ACT 4 · the payoff ---------------------------------------------
mka G12  0.50 2.95  s12  # the same ladder, climbed  "וואלה... זה עובד"
ffmpeg -y -loglevel error -loop 1 -t 3.6 -i $T/endcard.png \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 \
  -vf "fps=24,setsar=1" -shortest -c:v libx264 -crf 18 -preset veryfast \
  -pix_fmt yuv420p -c:a aac -b:a 192k $S/s13.mp4

# hard cuts inside an act, cross-dissolve between acts
cd $S
for A in "1 s1 s2 s3 s4" "2 s5 s6 s7 s8 s9" "3 s10 s11" "4 s12 s13"; do
  set -- $A; N=$1; shift
  : > act$N.txt; for f in "$@"; do echo "file '$f.mp4'" >> act$N.txt; done
  ffmpeg -y -loglevel error -f concat -safe 0 -i act$N.txt \
    -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 192k -ar 48000 -ac 2 \
    -pix_fmt yuv420p act$N.mp4
done
for N in 1 2 3 4; do printf "act%s " $N; ffprobe -v error -show_entries format=duration -of csv=p=0 act$N.mp4; done
