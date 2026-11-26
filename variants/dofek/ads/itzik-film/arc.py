# Does the track actually rise? Measures energy and brightness over time.
# Brightness = zero-crossing rate, a cheap proxy for "bright/major/busy" vs "dark/sparse".
import sys, subprocess, array, math
for f in sys.argv[1:]:
    raw=subprocess.run(['ffmpeg','-v','quiet','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],
                       capture_output=True).stdout
    a=array.array('h'); a.frombytes(raw[:len(raw)//2*2])
    SR=16000; W=SR*2                      # 2-second buckets
    n=len(a)//W
    rms=[]; zcr=[]
    for i in range(n):
        ch=a[i*W:(i+1)*W]
        s=0; z=0; prev=ch[0]
        for v in ch:
            s+=v*v
            if (v>=0) != (prev>=0): z+=1
            prev=v
        rms.append(math.sqrt(s/W)); zcr.append(z/W*SR)
    mr=max(rms) or 1; mz=max(zcr) or 1
    print("\n%s" % f)
    print("  t     energy                brightness")
    for i in range(n):
        print("%5d  %-20s %-20s" % (i*2,
              "#"*int(rms[i]/mr*20), "+"*int(zcr[i]/mz*20)))
    h=n//2
    print("  first half  energy %.0f  brightness %.0f" % (sum(rms[:h])/h, sum(zcr[:h])/h))
    print("  second half energy %.0f  brightness %.0f" % (sum(rms[h:])/(n-h), sum(zcr[h:])/(n-h)))
    print("  RISE: energy x%.2f  brightness x%.2f" % (
        (sum(rms[h:])/(n-h))/max(1,(sum(rms[:h])/h)),
        (sum(zcr[h:])/(n-h))/max(1,(sum(zcr[:h])/h))))
