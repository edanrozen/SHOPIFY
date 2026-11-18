set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
T=t5; D=34.4167
ffmpeg -y -loglevel error -i base5.mp4 \
 -loop 1 -i $T/c1.png -loop 1 -i $T/c2.png -loop 1 -i $T/c3.png -loop 1 -i $T/c4.png \
 -loop 1 -i $T/c5.png -loop 1 -i $T/c6.png -loop 1 -i $T/c7.png -loop 1 -i $T/c8.png \
 -loop 1 -i $T/c9.png -loop 1 -i $T/c10.png -loop 1 -i $T/c11.png -loop 1 -i $T/c12.png \
 -loop 1 -i $T/c13.png -loop 1 -i $T/c14.png -loop 1 -i $T/c15.png -loop 1 -i $T/c16.png \
 -filter_complex "[0:v][1:v]overlay=0:0:enable='between(t,0.06,0.78)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,0.98,1.80)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,2.12,4.30)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,4.40,6.60)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,6.78,9.10)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,9.20,11.80)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,11.96,13.96)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,14.16,15.50)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,15.68,18.30)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,18.50,21.18)'[a10];\
[a10][11:v]overlay=0:0:enable='between(t,21.36,23.08)'[a11];\
[a11][12:v]overlay=0:0:enable='between(t,23.26,24.50)'[a12];\
[a12][13:v]overlay=0:0:enable='between(t,24.60,26.46)'[a13];\
[a13][14:v]overlay=0:0:enable='between(t,26.66,28.00)'[a14];\
[a14][15:v]overlay=0:0:enable='between(t,28.10,29.30)'[a15];\
[a15][16:v]overlay=0:0:enable='between(t,29.60,32.14)'[vout]" \
 -map "[vout]" -frames:v 826 -an -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p capped5.mp4
ffmpeg -y -loglevel error -i capped5.mp4 -i vo/take5.wav -i vo/mzr2.mp3 -filter_complex "\
[1:a]volume=enable='lt(t,1.00)':volume=2.0,apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[2:a]aloop=loop=2:size=44100*40,atrim=0:$D,asetpts=N/SR/TB,volume=0.17,afade=t=out:st=33.5:d=0.80[mus];\
[mus][vb1]sidechaincompress=threshold=0.03:ratio=12:attack=8:release=350[md];\
[vb2][md]amix=inputs=2:duration=first:normalize=0,volume=7dB,alimiter=limit=0.75,volume=-4.4dB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-rant-v5.mp4
ffmpeg -hide_banner -nostats -i dofek-rant-v5.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
ffprobe -v error -show_entries format=duration -of csv=p=0 dofek-rant-v5.mp4
