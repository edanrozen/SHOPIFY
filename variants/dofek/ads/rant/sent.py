# List every pause >=0.22s in a take, and the loudness of each stretch between pauses.
import sys, subprocess, array, math
f=sys.argv[1]
raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-f','s16le','-ac','1','-ar','8000','-'],capture_output=True).stdout
a=array.array('h'); a.frombytes(raw[:len(raw)//2*2])
w=160; n=len(a)//w
r=[math.sqrt(sum(v*v for v in a[i*w:(i+1)*w])/w) for i in range(n)]
mx=max(r); th=mx*0.04
segs=[]; i=0
while i<n:
    if r[i]>th:
        j=i; last=i
        while j<n:
            if r[j]>th: last=j
            elif (j-last)*0.02>=0.22: break
            j+=1
        segs.append((i,last+1)); i=j
    else: i+=1
print(f, "total %.2fs, %d phrases"%(n*0.02,len(segs)))
for k,(s,e) in enumerate(segs,1):
    lv=math.sqrt(sum(x*x for x in r[s:e])/(e-s))
    db=20*math.log10(lv/32768.0)
    print("%2d  %6.2f - %6.2f  (%.2fs)  %6.1f dB"%(k,s*0.02,e*0.02,(e-s)*0.02,db))
