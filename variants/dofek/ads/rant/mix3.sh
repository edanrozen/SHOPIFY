set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
T=t3; D=35.875
ffmpeg -y -loglevel error -i base3.mp4 \
 -loop 1 -i $T/c1.png  -loop 1 -i $T/c2.png  -loop 1 -i $T/c3.png  -loop 1 -i $T/c4.png \
 -loop 1 -i $T/c5.png  -loop 1 -i $T/c6.png  -loop 1 -i $T/c7.png  -loop 1 -i $T/c8.png \
 -loop 1 -i $T/c9.png  -loop 1 -i $T/c10.png -loop 1 -i $T/c11.png -loop 1 -i $T/c12.png \
 -loop 1 -i $T/c13.png -loop 1 -i $T/c14.png -loop 1 -i $T/c15.png -loop 1 -i $T/c16.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,0.18,1.00)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,1.40,2.18)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,2.70,4.60)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,4.70,6.72)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,7.35,9.35)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,9.45,12.00)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,12.50,14.35)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,14.62,15.85)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,16.30,18.62)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,18.95,21.05)'[a10];\
[a10][11:v]overlay=0:0:enable='between(t,21.15,23.12)'[a11];\
[a11][12:v]overlay=0:0:enable='between(t,23.75,24.85)'[a12];\
[a12][13:v]overlay=0:0:enable='between(t,24.95,26.74)'[a13];\
[a13][14:v]overlay=0:0:enable='between(t,27.20,28.60)'[a14];\
[a14][15:v]overlay=0:0:enable='between(t,28.70,30.36)'[a15];\
[a15][16:v]overlay=0:0:enable='between(t,30.94,33.10)'[vout]" \
 -map "[vout]" -frames:v 861 -an -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p capped3.mp4
# voice: lift the hook so "סתום ת'פה" lands; music ducked under the voice
ffmpeg -y -loglevel error -i capped3.mp4 -i vo/take3.wav -i vo/mzr2.mp3 -filter_complex "\
[1:a]volume=enable='lt(t,1.10)':volume=2.0,apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[2:a]aloop=loop=2:size=44100*40,atrim=0:$D,asetpts=N/SR/TB,volume=0.17,afade=t=out:st=35.0:d=0.80[mus];\
[mus][vb1]sidechaincompress=threshold=0.03:ratio=12:attack=8:release=350[md];\
[vb2][md]amix=inputs=2:duration=first:normalize=0,volume=7dB,alimiter=limit=0.75,volume=-2.8dB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-rant-v3.mp4
ffmpeg -hide_banner -nostats -i dofek-rant-v3.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
ffprobe -v error -show_entries format=duration -of csv=p=0 dofek-rant-v3.mp4
