import sys, subprocess, array, math
f=sys.argv[1]
raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-f','s16le','-ac','1','-ar','8000','-'],
                   capture_output=True).stdout
a=array.array('h'); a.frombytes(raw[:len(raw)//2*2])
w=400; n=len(a)//w; r=[]
for i in range(n):
    s=0
    for v in a[i*w:(i+1)*w]: s+=v*v
    r.append(math.sqrt(s/w))
mx=max(r) or 1; th=mx*0.045
# group into utterances: runs of speech separated by >=0.70s of silence
runs=[]; i=0
while i<n:
    if r[i]>th:
        j=i
        last=i
        while j<n:
            if r[j]>th: last=j
            elif (j-last)*0.05>=0.70: break
            j+=1
        runs.append((i*0.05,(last+1)*0.05)); i=j
    else: i+=1
for k,(s,e) in enumerate(runs,1):
    print("%2d  %6.2f - %6.2f   (%.2fs)" % (k,s,e,e-s))
