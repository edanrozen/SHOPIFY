set -e
cd /tmp/claude-0/-home-user-SHOPIFY/06af39bb-792a-5cc6-a4be-ecbf44972499/scratchpad/rant
T=t4; D=36.375
ffmpeg -y -loglevel error -i base4.mp4 \
 -loop 1 -i $T/c1.png  -loop 1 -i $T/c2.png  -loop 1 -i $T/c3.png  -loop 1 -i $T/c4.png \
 -loop 1 -i $T/c5.png  -loop 1 -i $T/c6.png  -loop 1 -i $T/c7.png  -loop 1 -i $T/c8.png \
 -loop 1 -i $T/c9.png  -loop 1 -i $T/c10.png -loop 1 -i $T/c11.png -loop 1 -i $T/c12.png \
 -loop 1 -i $T/c13.png -loop 1 -i $T/c14.png -loop 1 -i $T/c15.png -loop 1 -i $T/c16.png \
 -filter_complex "\
[0:v][1:v]overlay=0:0:enable='between(t,0.18,1.00)'[a1];\
[a1][2:v]overlay=0:0:enable='between(t,1.24,2.10)'[a2];\
[a2][3:v]overlay=0:0:enable='between(t,2.36,4.50)'[a3];\
[a3][4:v]overlay=0:0:enable='between(t,4.60,6.90)'[a4];\
[a4][5:v]overlay=0:0:enable='between(t,7.20,9.60)'[a5];\
[a5][6:v]overlay=0:0:enable='between(t,9.70,12.34)'[a6];\
[a6][7:v]overlay=0:0:enable='between(t,12.58,14.68)'[a7];\
[a7][8:v]overlay=0:0:enable='between(t,14.78,16.20)'[a8];\
[a8][9:v]overlay=0:0:enable='between(t,16.48,19.20)'[a9];\
[a9][10:v]overlay=0:0:enable='between(t,19.44,21.75)'[a10];\
[a10][11:v]overlay=0:0:enable='between(t,21.85,24.12)'[a11];\
[a11][12:v]overlay=0:0:enable='between(t,24.50,26.00)'[a12];\
[a12][13:v]overlay=0:0:enable='between(t,26.10,27.80)'[a13];\
[a13][14:v]overlay=0:0:enable='between(t,28.08,29.40)'[a14];\
[a14][15:v]overlay=0:0:enable='between(t,29.50,30.84)'[a15];\
[a15][16:v]overlay=0:0:enable='between(t,31.08,33.80)'[vout]" \
 -map "[vout]" -frames:v 873 -an -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p capped4.mp4
# voice: lift the hook so "סתום ת'פה" lands; music ducked under the voice
ffmpeg -y -loglevel error -i capped4.mp4 -i vo/take4.wav -i vo/mzr2.mp3 -filter_complex "\
[1:a]volume=enable='lt(t,1.10)':volume=2.0,apad,atrim=0:$D,asetpts=N/SR/TB,asplit=2[vb1][vb2];\
[2:a]aloop=loop=2:size=44100*40,atrim=0:$D,asetpts=N/SR/TB,volume=0.17,afade=t=out:st=35.0:d=0.80[mus];\
[mus][vb1]sidechaincompress=threshold=0.03:ratio=12:attack=8:release=350[md];\
[vb2][md]amix=inputs=2:duration=first:normalize=0,volume=7dB,alimiter=limit=0.75,volume=-2.8dB[aout]" \
 -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t $D dofek-rant-v4.mp4
ffmpeg -hide_banner -nostats -i dofek-rant-v4.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
ffprobe -v error -show_entries format=duration -of csv=p=0 dofek-rant-v4.mp4
