# Lip-sync score: correlation between mouth-region motion and the audio envelope,
# scanned over lags. Good sync = high correlation, best lag near 0.
# usage: sync.py video crop audio [audio_offset_seconds]
import sys, subprocess, array, math
v,crop,au=sys.argv[1],sys.argv[2],sys.argv[3]
off=float(sys.argv[4]) if len(sys.argv)>4 else 0.0
FPS=24; W,H=40,30
raw=subprocess.run(['ffmpeg','-v','quiet','-i',v,'-vf','crop=%s,fps=%d,scale=%d:%d,format=gray'%(crop,FPS,W,H),'-f','rawvideo','-'],capture_output=True).stdout
n=W*H; fr=[raw[i*n:(i+1)*n] for i in range(len(raw)//n)]
m=[0.0]+[sum(abs(fr[i][k]-fr[i-1][k]) for k in range(n))/n for i in range(1,len(fr))]
# smooth mouth motion over 3 frames
m=[sum(m[max(0,i-1):i+2])/len(m[max(0,i-1):i+2]) for i in range(len(m))]
ra=subprocess.run(['ffmpeg','-v','quiet','-ss',str(off),'-i',au,'-f','s16le','-ac','1','-ar','8000','-'],capture_output=True).stdout
a=array.array('h'); a.frombytes(ra[:len(ra)//2*2])
w=8000//FPS
e=[math.sqrt(sum(x*x for x in a[i*w:(i+1)*w])/w) for i in range(len(a)//w)]
def corr(x,y):
    L=min(len(x),len(y))
    if L<12: return 0
    x,y=x[:L],y[:L]; mx=sum(x)/L; my=sum(y)/L
    sx=math.sqrt(sum((p-mx)**2 for p in x)); sy=math.sqrt(sum((q-my)**2 for q in y))
    return sum((p-mx)*(q-my) for p,q in zip(x,y))/(sx*sy) if sx and sy else 0
best=(-2,0)
for lag in range(-12,13):   # +lag = mouth moves AFTER the sound
    c=corr(m[lag:],e) if lag>=0 else corr(m,e[-lag:])
    if c>best[0]: best=(c,lag)
c0=corr(m,e)
print("%-10s corr@0=%+.2f   best=%+.2f at lag %+.2fs" % (v.split('/')[-1], c0, best[0], best[1]/FPS))
