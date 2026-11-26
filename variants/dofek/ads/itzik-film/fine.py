import sys, subprocess, array, math
for f in sys.argv[1:]:
    raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],
                       capture_output=True).stdout
    a=array.array('h'); a.frombytes(raw[:len(raw)//2*2])
    w=160  # 10ms
    n=len(a)//w; r=[]
    for i in range(n):
        s=0
        for v in a[i*w:(i+1)*w]: s+=v*v
        r.append(math.sqrt(s/w))
    mx=max(r) or 1
    on=[i for i,v in enumerate(r) if v>mx*0.04]
    s0,s1=on[0],on[-1]
    # dips: local minima below 12% of max inside speech
    dips=[]; i=s0
    while i<=s1:
        if r[i]<mx*0.12:
            j=i
            while j<=s1 and r[j]<mx*0.12: j+=1
            if (j-i)>=3: dips.append((i*0.01,(j-i)*0.01))
            i=j
        else: i+=1
    print("%-14s %.2f-%.2f  dips: %s" % (f, s0*0.01,(s1+1)*0.01,
          ", ".join("%.2fs/%.0fms"%(d[0],d[1]*1000) for d in dips) or "none"))
    lv="".join(" .:-=+*#@"[min(8,int(v/mx*8.99))] for v in r[s0:s1+1])
    print("   ",lv)
