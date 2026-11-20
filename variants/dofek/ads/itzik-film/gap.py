import sys, subprocess, array, math
for f in sys.argv[1:]:
    raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-f','s16le','-ac','1','-ar','8000','-'],
                       capture_output=True).stdout
    a=array.array('h'); a.frombytes(raw[:len(raw)//2*2])
    w=400  # 50ms resolution
    n=len(a)//w; r=[]
    for i in range(n):
        s=0
        for v in a[i*w:(i+1)*w]: s+=v*v
        r.append(math.sqrt(s/w))
    if not r: print(f,"NO-AUDIO"); continue
    mx=max(r) or 1; th=mx*0.05
    on=[i for i,v in enumerate(r) if v>th]
    if not on: print(f,"SILENT"); continue
    s0,s1=on[0],on[-1]
    # internal gaps
    gaps=[]; i=s0; 
    while i<=s1:
        if r[i]<=th:
            j=i
            while j<=s1 and r[j]<=th: j+=1
            if (j-i)*0.05>=0.10: gaps.append((i*0.05,(j-i)*0.05))
            i=j
        else: i+=1
    bar="".join("#" if v>th else "." for v in r)
    print("%-28s len=%.2f speech=%.2f-%.2f gaps=%s" % (
        f, n*0.05, s0*0.05, (s1+1)*0.05,
        ", ".join("%.2fs/%.2f" % g for g in gaps) or "none"))
    print("   ",bar)
