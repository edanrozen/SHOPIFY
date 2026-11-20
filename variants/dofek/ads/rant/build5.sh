#!/bin/bash
# DOFEK rant v5. Rebuilt as a talking-head ad, not a voiceover.
# Three CONTINUOUS wan2_7 takes (12s / 12s / 9s) carry the whole script; the
# only cutaways are three brief inserts placed INSIDE a take and returned to
# at the take's own timecode, so sync survives the cut.
# Talking face: 90% of screen time (was 53% in v4).
set -e
R=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
A=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim/clips
cd $R; S=seg5; rm -rf $S; mkdir -p $S
V="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=24,setsar=1"
sg () { ffmpeg -y -loglevel error -ss $2 -i $1 -vf "$V" -frames:v $3 -an \
  -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p $S/$4.mp4; }
sgz () { ffmpeg -y -loglevel error -ss $2 -i $1 \
  -vf "$V,zoompan=z='1+0.00060*on':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=24,setsar=1" \
  -frames:v $3 -an -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p $S/$4.mp4; }
#   source      in       frames out    film in-out     what
sgz cl/Z1.mp4   0        262    r01  #  0.00-10.92  take A, continuous, slow push
sg  $A/c11.mp4  0.4       23    r02  # 10.92-11.88  brace on the knee, on "מגן הברך של דופק"
sgz cl/Z2.mp4   0        181    r03  # 11.88-19.42  take B, continuous
sg  $A/c03.mp4  0.30      28    r04  # 19.42-20.58  sidelined while the young one works
sg  cl/Z2.mp4   8.7083    62    r05  # 20.58-23.17  take B resumed at its own timecode
sgz cl/Z3.mp4   0        114    r06  # 23.17-27.92  take C, continuous
sg  $A/c07.mp4  0.40      24    r07  # 27.92-28.92  the button, on "תלחץ פה"
sg  cl/Z3.mp4   5.7500    77    r08  # 28.92-32.13  take C resumed at its own timecode
ffmpeg -y -loglevel error -framerate 24 -i t/endseq/f%04d.png -vf "fps=24,setsar=1" -frames:v 55 -an \
  -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p $S/r09.mp4
cd $S; : > list.txt
for f in r01 r02 r03 r04 r05 r06 r07 r08 r09; do echo "file '$f.mp4'" >> list.txt; done
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy ../base5.mp4
cd ..; echo -n "base frames: "; ffprobe -v error -count_frames -show_entries stream=nb_read_frames -of csv=p=0 base5.mp4
