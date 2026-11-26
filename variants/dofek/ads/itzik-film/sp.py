import sys, subprocess, array, math
f=sys.argv[1]
raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-f','s16le','-ac','1','-ar','8000','-'],capture_output=True).stdout
a=array.array('h'); a.frombytes(raw[:len(raw)//2*2])
if not a: print(f,"NO AUDIO"); sys.exit()
w=800; n=len(a)//w
r=[]
for i in range(n):
    s=0
    for v in a[i*w:(i+1)*w]: s+=v*v
    r.append(math.sqrt(s/w))
mx=max(r) or 1; th=mx*0.045
segs=[]; s=None
for i,v in enumerate(r):
    if v>th and s is None: s=i
    if v<=th and s is not None: segs.append((s*0.1,i*0.1)); s=None
if s is not None: segs.append((s*0.1,n*0.1))
m=[]
for a0,b0 in segs:
    if m and a0-m[-1][1]<0.3: m[-1]=(m[-1][0],b0)
    else: m.append((a0,b0))
print("%-10s total=%.2f  %s"%(f,n*0.1," ".join("%.2f-%.2f"%x for x in m)))
