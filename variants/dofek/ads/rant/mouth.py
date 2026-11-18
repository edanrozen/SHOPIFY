# Frame-to-frame motion inside a crop, to see whether the mouth is actually moving.
import sys, subprocess, array
f=sys.argv[1]; crop=sys.argv[2]   # crop as w:h:x:y in source pixels
W,H=40,30
raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-vf',
   'crop=%s,fps=12,scale=%d:%d,format=gray'%(crop,W,H),'-f','rawvideo','-'],
   capture_output=True).stdout
n=W*H; fr=[raw[i*n:(i+1)*n] for i in range(len(raw)//n)]
d=[sum(abs(fr[i][k]-fr[i-1][k]) for k in range(n))/n for i in range(1,len(fr))]
if not d: print(f,"NO FRAMES"); sys.exit()
mx=max(d) or 1
print("%-26s mean=%5.2f max=%5.2f" % (f.split('/')[-1], sum(d)/len(d), mx))
print("   ", "".join(" .:-=+*#@"[min(8,int(v/6.0))] for v in d))
