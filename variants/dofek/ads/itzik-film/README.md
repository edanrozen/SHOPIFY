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
