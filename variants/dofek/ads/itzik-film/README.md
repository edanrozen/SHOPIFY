# «זה לא הגיל, זה הברך» · הסרטון המונפש

35.67 שניות · 1080x1920 · 24fps · ‎-15.0 LUFS · ‎-1.4 dBTP

המאסטר נבנה בסקרצ'פד והוא **לא שורד סשן**. מה ששמור כאן הוא כל מה
שצריך כדי לבנות אותו שוב: הסטילים, הכתוביות, כרטיס הסיום וסקריפטי
ההרכבה. הקליפים עצמם הם ג'ובים של Higgsfield.

## הרצף הסופי

| # | קליפ | חלון | אורך | מה בפנים |
|---|---|---|---|---|
| 1 | c01 | 0.0 | 2.42 | ההוק. רגל על השלב, הגוף לא עולה |
| 2 | c02 | 0.6 | 2.63 | שק הטיח. נשאר כפוף |
| 3 | **L03** | 0.0 | 4.00 | הקולגה מדבר · **ליפ־סינק** |
| 4 | **L04** | 0.0 | 3.83 | איציק מנופף ועונה · **ליפ־סינק** |
| 5 | c05 | 0.2 | 2.33 | הכיסא במטבח |
| 6 | **L06** | 0.0 | 2.63 | האישה בפתח · **ליפ־סינק** |
| 7 | c07 | 0.8 | 2.21 | הטלפון. עמוד המוצר |
| 8 | c08 | 0.4 | 2.42 | השליח |
| 9 | **L09** | 0.0 | 2.13 | «נו? תמדוד» · **ליפ־סינק** |
| 10 | c11 | 0.3 | 2.42 | הידיים שלו מרכיבות את המגן |
| 11 | c12 | 0.4 | 2.42 | מאקרו על החוגה |
| 12 | c10 | 0.3 | 3.63 | הסולם. הפעם הוא עולה |
| 13 | endcard | — | 2.58 | כרטיס סיום |

## כתוביות · `cap.sh`

```
q1  0.20–2.30   זה הגיל, אני אומר לך
q2  5.30–7.10   דיי להיות אקשן, איציק
q3  7.20–9.00   תקנה את מגן הברך של DOFEK
q4  9.20–12.60  לא מגן ולא נעליים. זה הגיל
q5 15.40–17.60  חלאס לסבול כבר
q6 22.60–24.40  נו? תמדוד
q7 29.90–31.60  זה לא הגיל, גבר
q8 31.70–33.00  זה הברך
```

## קולות

| תפקיד | voice_id |
|---|---|
| איציק | `30fc8796-ceb6-4a66-b3a7-4a145ef7f346` (Arthur) |
| הקולגה | `e6f9b893-51b1-51d3-afe9-9e0482cb7ac1` (Benji) |
| האישה | `1550321e-7f5b-526e-b001-02328b03e9bc` (Delia) |
| קריין | `563f728c-e249-5a85-97ab-8461e8c09da6` (מהסרט הראשון) |

**ניקוד חלקי חובה על «מָגֵן».** בלעדיו המנוע קורא «מֻגָּן». זה אותו
לקח מהסרט הראשון וזה חוזר בכל פעם.

## ליפ־סינק

`sync_so` מקבל קליפ שקט + קובץ אודיו ומחזיר את אותו קליפ כשהשפתיים
מסונכרנות, **עם האודיו מוטמע בפנים**. ‎18.15 קרדיטים לשוט.
`sync_mode: silence` מרפד את האודיו הקצר יותר; `active_speaker_detection: true`
בוחר את הפנים הנכונות בשוט שתי־דמויות.

זה הפתרון הנכון ולא `intone`: אינטון מרכיב שוט משלו מתמונת דמות
ומאבד את הקאדר והלוקיישן שבנינו. סינק שומר את הפריים.

## למה אין קליפים מהסרט הראשון

הגרסה הראשונה הכניסה את `s08.mp4` ו-`s09.mp4` מסרט מגן הברך הקודם
בתור "שוטי מוצר פוטוריאליסטיים". **הם מציגים דמות אחרת** — הסבא עם
השיער הלבן. זה שובר את הרצף: שתי דמויות ראשיות באותה פרסומת.

הוחלפו ב-`c11` ו-`c12`: אותם שוטים בדיוק, עם איציק, במטבח שלו, עם
השעון והמכנסיים שלו. **אין לקחת קליפים מסרטים קודמים.**

## הרכבה

```
cap.sh   צריבת כתוביות על base.mp4  ->  capped.mp4
mix.sh   דיאלוג + קריינות + מוזיקה  ->  dofek-itzik-FINAL.mp4
```

`mix.sh` עושה `asplit` על מצע הקול לפני ה-sidechain. בלי זה ffmpeg
נופל — פלט של פילטר נצרך פעם אחת בלבד.

רמה: ‎`volume=2.4dB,alimiter=limit=0.84` ואז ‎`volume=-1.4dB`.
‎loudnorm בפאס אחד יצא ‎-17.5 LUFS, נמוך מדי; הדרך אל ‎-15.0 היא
תיקון ידני ומדידה חוזרת, לא פאס שני של loudnorm.

## עלות

```
סטילים       26 × 0.25  =   6.5
אנימציה      13 × 8.75  = 113.75
ליפ־סינק      4 × 18.15 =  72.6
קריינות + מוזיקה        ≈   8
                        ───────
                          ~201
```

## כרטיס הסיום · מה ירד ממנו

הגרסה הראשונה נשאה את השורה «מגן ברך עם חוגת כיוון» מתחת ללוגו.
**זו שורה ממפרט מוצר, לא מפרסומת.** היא מסבירה פיצ'ר שאף אחד לא
שאל עליו, בשנייה שבה הצופה כבר משוכנע או כבר איבדנו אותו. בסרטון
רגשי כרטיס הסיום סוגר את הטענה — הוא לא מתחיל לפרט.

הכרטיס עכשיו נושא ארבעה דברים בלבד:

```
זה לא הגיל. זה הברך.     הטענה
DOFEK                     השם
להזמנה באתר               הקריאה לפעולה
dofek.shop                איפה
```

**הכלל:** מפרט טכני שייך לעמוד המוצר, לא לקריאייטיב. אם אפשר
להוריד שורה מכרטיס סיום בלי לאבד כלום — היא לא הייתה צריכה להיות שם.

---

## Punctuation is a performance instruction, not decoration

The client's note, 18.11: *"אתה לפעמים שם סימני פיסוק איפה שלא צריך וזה תוקע את הדיבור... לא ולא זה צריך להיות זורם."*

He was right, and the defect was in five of sixteen lines — always the same
shape: **a stop immediately after the opening word.** ElevenLabs executes
Hebrew punctuation literally, and it also treats a standalone interjection
as its own utterance even with no punctuation at all.

| was sent | what came out | now |
|---|---|---|
| `דַּי! לִהְיות עַקְשָׁן, איציק.` | די · stop · להיות עקשן · stop · איציק | `דַּי לִהְיוֹת עַקְשָׁן איציק, תקנה...` |
| `חלאס לסבול כבר.` | חלאס · hesitation · לסבול | `חַלַאס לִסְבּוֹל כְּבָר.` |
| `אָה... לא, אני לא מגיע לזה.` | four fragments | `[wincing in pain] אני לא מגיע לזה.` |
| `אה, תודה רבה.` | אה · stop · תודה רבה | `תּוֹדָה רַבָּה לְךָ.` |
| `נו? תמדוד.` | נו · 0.45s stop · תמדוד | `נוּ תִּמְדוֹד אוֹתוֹ.` |

**Three rules that follow:**

1. **No punctuation inside a clause.** A comma before a vocative (`עקשן, איציק`)
   is a stop. Only a real sentence boundary earns one.
2. **`...` after an interjection is a hard stop**, not a trailing-off. It was the
   real cause of the chair line, not the comma next to it.
3. **A standalone interjection stops the line even with no punctuation.**
   `אָה`, `נו`, `אה` are each read as their own utterance. When the pause is
   not wanted, cut the interjection and put the emotion in a bracketed English
   direction tag instead — `[wincing in pain]`, `[sharp intake of breath]`.
   These do not generate a pause of their own.

Niqqud still matters for pronunciation (**מָגֵן**, **עַקְשָׁן**, **דַּי**), but it does
not prevent any of the above — placement does.

### Never ship a line you have not measured

`gap.py` prints every internal silence ≥0.10s with an ASCII envelope.
`seg.py` does the same at film level, grouping utterances separated by ≥0.70s —
**caption windows are read off its output, never chosen by hand.** Generate two
or three takes of any changed line (≈0.1 credits each), measure, then pick:

```
n31  ....####################.##.....####################....   1 gap, at the sentence boundary  ✓
n32  ....######################......#######..###########...    3 gaps, fragmented               ✗
```

A gap of ≤0.15s is a breath. 0.25s+ inside a clause is the defect.

### Deterministic lip-sync placement

Pad the audio to the clip's exact length **before** sending it to `sync_so`,
and pass `sync_mode: "cut_off"`. Verified on all five re-syncs this round: the
speech comes back at the same timestamps it was sent at, to the frame. Letting
`sync_so` pad for you makes placement non-reproducible, and that is what caused
the earlier "cut off mid-sentence" failures.

### Pipeline order

```
build.sh     trim each shot around its measured speech → four acts, hard cuts inside
acts.sh      0.4s cross-dissolve between acts → base.mp4
seg.py       measure the assembled cut → caption windows
cap.js       render RTL caption plates from caps.json
cap.sh       burn them in → capped.mp4
mix.sh       narrator + sidechain-ducked music, +6.8dB → limiter 0.75 → −1.9dB
build20.sh / cap20.sh   the 20s cut, with its own trims
```

Both masters land at **−15.0 LUFS / −1.8 dBTP**. Single-pass `loudnorm` lands
near −17.5 and is too quiet for Meta; gain → limiter → measured trim is the
chain that works. AAC encoding adds roughly 2.5dB of inter-sample overshoot
above the limiter ceiling, so the final trim is measured after encode, not
predicted.

### Do not caption what the end card already says

The card carries «זה לא הגיל. זה הברך» and the narrator says it. A burnt-in
caption of the same words is the third copy on one screen. Captions stop at
the last spoken shot.

### Shot list as shipped

| # | shot | line | source |
|---|---|---|---|
| 1 | walking the site, limping | `זה הגיל, אני אומר לך` | T00 |
| 2 | the ladder, cannot climb | `אוף... לא מצליח` | G02 |
| 3 | the colleague | `די להיות עקשן איציק / תקנה את מגן הברך של DOFEK` | c03 → K03n |
| 4 | the refusal | `לא מגן ולא נעליים. זה הגיל` | G04 |
| 5 | the chair | `אני לא מגיע לזה` | c05 → G05n |
| 6 | the wife in the doorway | `חלאס לסבול כבר` | c06 → L06n |
| 7 | she orders on the phone | — | c07 |
| 8 | the courier | `תודה רבה לך` | N08 → G08n |
| 9 | the box on the table | `נו תמדוד אותו` | c09 → L09n |
| 10 | hands fitting the brace | — | c11 |
| 11 | macro on the dial | — | c12 |
| 12 | the same ladder, climbed | `וואלה... זה עובד` | G12 |
| 13 | end card | narrator | endcard.png |

The 20s cut keeps 1, 3, 6, 11, 12, 13. The supply chain is the first thing to
go when there is no room — it is plot, not persuasion.

### Voices

| | id |
|---|---|
| Itzik — Grady | `e2a2d2e6-9ed2-59cd-82af-feaa27f8a678` |
| the colleague — Benji | `e6f9b893-51b1-51d3-afe9-9e0482cb7ac1` |
| the wife — Delia | `1550321e-7f5b-526e-b001-02328b03e9bc` |
| narrator | `563f728c-e249-5a85-97ab-8461e8c09da6` |

Arthur (`30fc8796-…`) was rejected: *"למה הקול של איציק נשמע כמו קריין."*

---

## The hook was the real defect

Client, 18.11: *"בכללי ההוק לא טוב בשני הסרטונים."*

The film opened on five seconds of Itzik walking across a dirt lot, limping,
saying «זה הגיל, אני אומר לך». Three things were wrong with it and only the
third is about craft:

1. **It gave away the thesis.** «זה הגיל» is the belief the film exists to
   destroy. Stating it at 0:02 spends the twist before the viewer has a reason
   to care.
2. **Walking is not an event.** Five seconds of locomotion in a feed where the
   whole attention budget is about two.
3. **The frame was empty and wide.** Nothing in shot but the man and dust. At
   thumbnail size he is a blob — no readable face, no object naming the problem.

Replaced with the **ladder failure**: he grips the rung, the knee gives, «אוף...
לא מצליח». The ladder is in frame stating the obstacle without a word, the crop
is tight enough that face and knee both read on a phone, and there is an action
in progress rather than a pose.

The argument underneath the composition: **a contractor who cannot climb a
ladder is failing at his trade, not merely in pain.** That is identity, and
identity is what stops a 55-year-old scrolling — not suffering.

New act-1 order: **fail → rationalise → be challenged → refuse.** The walking
shot was not cut; it moved to position 2, where it is now the consequence of the
failure instead of a preamble to it. The ladder now opens *and* closes the film —
the same ladder, failed at 0:01 and climbed at 0:34.

In the 20s cut the walk is gone entirely. There is no room, and the hook has to
be the hook.

## Two words the model will not keep together

«תודה רבה» came back with a **140ms drop between the two words** — not silence,
so the 50ms-window measurement in `gap.py` reported "no gaps" and the client
still heard a stutter. `fine.py` resolves to 10ms and shows the envelope, which
is how it was found:

```
תודה                רבה
*####*#*****++=--:::............::--==***#@@@@@#
                   └── 140ms ──┘
```

A maqaf (`תּוֹדָה־רַבָּה`) changed nothing — the envelope came back identical.
The fix is not punctuation but vocabulary: **«תודה אחי»**, 0.79s continuous,
and better Israeli register for a woman to a courier anyway.

**Rule: when a client reports a break that `gap.py` cannot see, re-measure with
`fine.py` before concluding the line is clean.** A sub-threshold dip inside a
1.4s phrase is audible even though it is not silence.

## The wife's line

Four phrasings were generated and offered; all four measured clean, so the
choice was dramatic rather than technical. Client chose **C · «כמה אפשר לסבול»**.
It is the only one of the four that is a question rather than an order, which is
what makes her going behind his back read as character instead of plot.

---

## Measure motion before deciding a shot is boring

`motion.py` samples at 6fps, downscales to 48x85 grey, and prints the mean
absolute frame difference in 0.5s buckets. Run it on the assembled cut before
calling any edit finished.

It corrected one wrong instinct and found a real defect the eye had skated over.

**Wrong instinct:** sampling frames every 2s made the opening three shots look
like the same frozen pose. Motion there measures 13–30 — he is moving the whole
time. A sparse contact sheet is not evidence about motion; the measurement is.

**Real defect:** ten of the forty seconds were visually frozen.

```
 8.7 – 12.2   3.5s   the colleague — over the film's only selling line
21.2 – 24.2   3.0s   the phone
36.6 – 40.2   3.6s   the end card, at exactly 0.0
```

### The fixes, none of which needed new footage

**Punch-in cut on the selling line.** The colleague shot is two men sitting
still for 4.25s carrying both «די להיות עקשן איציק» and «תקנה את מגן הברך של
DOFEK». Split the same clip in two and crop the second at 1.28x: a hard cut
appears where the footage has no motion of its own, and it lands exactly on the
line that sells. The 3.5s block became two blocks of ~1.5s.

**Slow push on shots that do not move.** `mksz` wraps `zoompan`. Note the form:
`z='1+0.0022*on'` driven by the output frame counter. The accumulating form
`z=min(1.0012*zoom,1.10)` silently did nothing here — the measurement is how
that was caught, not the eye.

**The end card is now a reveal, not a still.** `titles/endseq.js` renders 86
frames at 24fps: the claim rises and fades in, the rule draws, the brand letter-
spacing tightens, then the CTA scales up, then the domain — over a 3.5% push on
the whole card. The reveal order is also the reading order we want. A single PNG
measured 0.0 for its entire 3.6s, which is the worst possible place in a direct-
response ad to lose the eye.

Remaining sub-6 readings are all ≤1.5s and sit inside dialogue close-ups where
only the face moves. That is normal; the 3s+ blocks are gone.

---

## The music has to carry the same arc as the story

Client, 18.11: *"מה זה המוסיקה הזאת... מה אנחנו בהלוויה? תשים מוזיקה כזאת שלאט
לאט הופכת מעצב וקושי לשמח והצלחה."*

He was right twice. The bed was wrong **and** the brief was wrong: the film goes
from pain to resolution and the music was the same from the first second to the
last. A flat bed under an arc-shaped story fights the story.

The first attempt also exposed a process failure worth naming: the prompt said
"optimistic major key from the first bar" and the track came back mournful. It
was shipped on the strength of the prompt rather than the result. **A generated
asset is not what you asked for, it is what came back — measure it.**

`arc.py` prints per-2-second energy (RMS) and brightness (zero-crossing rate)
plus a first-half / second-half ratio. Three candidates:

```
arc1   energy x1.40   but collapses to zero at 36s, right as the end card lands
arc2   energy x0.98   no rise at all — the same failure as the first bed
arc3   energy x1.94   real ramp, and still loud at the finish        ← chosen
```

Short cut, same test: `arc20b` at x1.64 / brightness x2.27, against `arc20a`
at x1.01 which fell apart at the end.

### Measure the music bus, not the master

Running `arc.py` on the finished master reports energy **x0.71** — apparently
inverted. That number is meaningless here: the first half of the film is wall-
to-wall dialogue and the second half is largely silent product shots, so the
master's envelope measures speech density, not music.

Render the music bus alone — same gain, same sidechain, no dialogue — and
measure that:

```
music bus in the mix:  energy x2.26
```

Stronger than the raw track's x1.94, because the sidechain ducks hardest under
the dialogue-heavy opening and so deepens the arc for free. The peak lands on
the payoff shot; the narrator ducks it on the end card, which is correct.

`mix.sh` takes the bed and its gain as arguments (`./mix.sh vo/arc3.mp3 0.23`)
so swapping music is one command, not an edit.
