#!/bin/bash
# DOFEK rant v6. Three CONTINUOUS wan2_7 takes at 1080p carry the whole script.
# Audio: take6.wav (hard-k words spelled with ק so the engine cannot read them
# as /x/, pauses tightened to 0.17s). Cut points are absolute frame numbers.
set -e
R=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
A=/tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/anim/clips
cd $R; S=seg6; rm -rf $S; mkdir -p $S
V="scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=24,setsar=1"
sg () { ffmpeg -y -loglevel error -ss $2 -i $1 -vf "$V" -frames:v $3 -an \
  -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p $S/$4.mp4; }
sgz () { ffmpeg -y -loglevel error -ss $2 -i $1 \
  -vf "$V,zoompan=z='1+0.00060*on':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=24,setsar=1" \
  -frames:v $3 -an -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p $S/$4.mp4; }
#   source      in       frames out    film in-out     what
sgz cl/W1.mp4   0        261    s01  #  0.00-10.88  take A, continuous
sg  $A/c11.mp4  0.4       23    s02  # 10.88-11.83  brace on the knee, on "מגן הברך של דופק"
sgz cl/W2.mp4   0        182    s03  # 11.83-19.42  take B, continuous
sg  $A/c03.mp4  0.30      28    s04  # 19.42-20.58  sidelined while the young one works
sg  cl/W2.mp4   8.7500    60    s05  # 20.58-23.08  take B resumed at its own timecode
sgz cl/W3.mp4   0        116    s06  # 23.08-27.91  take C, continuous
sg  $A/c07.mp4  0.40      24    s07  # 27.91-28.91  the button, on "תלחץ פה"
sg  cl/W3.mp4   5.8333   124    s08  # 28.91-34.08  take C resumed at its own timecode
ffmpeg -y -loglevel error -framerate 24 -i t/endseq/f%04d.png -vf "fps=24,setsar=1" -frames:v 57 -an \
  -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p $S/s09.mp4
cd $S; : > list.txt
for f in s01 s02 s03 s04 s05 s06 s07 s08 s09; do echo "file '$f.mp4'" >> list.txt; done
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -c copy ../base6.mp4
cd ..; echo -n "base frames: "; ffprobe -v error -count_frames -show_entries stream=nb_read_frames -of csv=p=0 base6.mp4
