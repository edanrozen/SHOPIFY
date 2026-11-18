import sys, subprocess, array
f=sys.argv[1]; W,H=48,85
raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-vf',
   'fps=6,scale=%d:%d,format=gray'%(W,H),'-f','rawvideo','-'],capture_output=True).stdout
n=W*H; frames=[raw[i*n:(i+1)*n] for i in range(len(raw)//n)]
d=[]
for i in range(1,len(frames)):
    a,b=frames[i-1],frames[i]
    d.append(sum(abs(a[k]-b[k]) for k in range(n))/n)
mx=max(d) or 1
print("t      motion")
# 0.5s buckets (3 frames at 6fps)
for i in range(0,len(d),3):
    ch=d[i:i+3]; v=sum(ch)/len(ch)
    t=(i+1)/6.0
    bar="#"*int(v/mx*46)
    print("%5.1f %5.1f %s" % (t, v, bar))
