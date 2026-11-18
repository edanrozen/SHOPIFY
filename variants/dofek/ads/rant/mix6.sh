set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
T=t6; D=36.47
ffmpeg -y -loglevel error -i base6.mp4 \
 -loop 1 -i $T/c1.png -loop 1 -i $T/c2.png -loop 1 -i $T/c3.png -loop 1 -i $T/c4.png \
 -loop 1 -i $T/c5.png -loop 1 -i $T/c6.png -loop 1 -i $T/c7.png -loop 1 -i $T/c8.png \
 -loop 1 -i $T/c9.png -loop 1 -i $T/c10.png -loop 1 -i $T/c11.png -loop 1 -i $T/c12.png \
 -loop 1 -i $T/c13.png -loop 1 -i $T/c14.png -loop 1 -i $T/c15.png -loop 1 -i $T/c16.png \
 -filter_complex "[0:v][1:v]overlay=0:0:enable='between(t,0.04,0.92)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,1.15,1.91)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,2.27,4.19)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,4.42,6.64)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,6.87,9.09)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,9.19,11.73)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,11.96,14.08)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,14.31,15.75)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,15.98,18.76)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,18.99,21.69)'[a10];\
[a10][11:v]overlay=0:0:enable='between(t,21.92,23.64)'[a11];\
[a11][12:v]overlay=0:0:enable='between(t,23.87,24.37)'[a12];\
[a12][13:v]overlay=0:0:enable='between(t,24.60,27.56)'[a13];\
[a13][14:v]overlay=0:0:enable='between(t,27.88,28.76)'[a14];\
[a14][15:v]overlay=0:0:enable='between(t,28.99,30.95)'[a15];\
[a15][16:v]overlay=0:0:enable='between(t,31.18,34.03)'[vout]" \
 -map "[vout]" -frames:v 875 -an -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p capped6.mp4
ffmpeg -y -loglevel error -i capped6.mp4 -i vo/take6.wav -i vo/mzr2.mp3 -filter_complex "\
[1:a]volume=enable='lt(t,1.05)':volume=2.0,apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[2:a]aloop=loop=2:size=44100*40,atrim=0:$D,asetpts=N/SR/TB,volume=0.17,afade=t=out:st=35.5:d=0.80[mus];\
[mus][vb1]sidechaincompress=threshold=0.03:ratio=12:attack=8:release=350[md];\
[vb2][md]amix=inputs=2:duration=first:normalize=0,volume=7dB,alimiter=limit=0.75,volume=-4.4dB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-rant-v6.mp4
ffmpeg -hide_banner -nostats -i dofek-rant-v6.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
ffprobe -v error -show_entries format=duration -of csv=p=0 dofek-rant-v6.mp4
