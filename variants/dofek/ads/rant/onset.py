# When does the mouth actually start moving in a clip, and where is the speech?
import sys, subprocess, array, math
f=sys.argv[1]; crop=sys.argv[2]
W,H=40,30
raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-vf',
   'crop=%s,fps=24,scale=%d:%d,format=gray'%(crop,W,H),'-f','rawvideo','-'],
   capture_output=True).stdout
n=W*H; fr=[raw[i*n:(i+1)*n] for i in range(len(raw)//n)]
d=[sum(abs(fr[i][k]-fr[i-1][k]) for k in range(n))/n for i in range(1,len(fr))]
if not d: print(f,"none"); sys.exit()
mx=max(d); th=mx*0.30
on=[i for i,v in enumerate(d) if v>th]
print("%-10s mouth first moves at %.2fs, last at %.2fs" % (
    f.split('/')[-1], (on[0]+1)/24.0 if on else -1, (on[-1]+1)/24.0 if on else -1))
