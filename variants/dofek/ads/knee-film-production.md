# DOFEK knee brace · animated film

Hebrew vertical commercial for the knee brace. 55 s, 1080x1920, H.264 + AAC,
narrated in first person, 18 burned-in Hebrew subtitles, original score.

## The brief it was built to

The viewer must recognise themselves in the man's pain first, and only then
understand that the product is the way out. Every decision below serves that.

## Structure

| | scene | audio |
|---|---|---|
| 1 | morning, hand on the knee | "כל בוקר התחיל אותו דבר" · "קום. פשוט תקום." |
| 2 | supermarket, he stops | "עוד קצת. רק עד הקופה. תחזיק מעמד." |
| 3 | park, the family walks on | "כולם המשיכו ללכת, ואני שוב מצאתי את עצמי מחפש ספסל" |
| 4 | the granddaughter pulls his hand, he cannot rise | "הם קראו לי. אמרתי תכף. אמרתי את זה כל שבוע." |
| 5 | alone on the bench, slow motion | "והיא רצה חזרה בלעדי" · "תחייך. שלא יראו." |
| 6 | the real store page on his phone | "לא חיפשתי נס. רק שאוכל ללכת איתם." · "ואז ראיתי את מגן הברך של דופק" |
| 7 | courier, fitting | "חיכיתי לחבילה כמו ילד" |
| 8 | the dial | "מסובב פעם אחת, וזה מחזיק" |
| 9 | morning again | "הבוקר קמתי בלי לחשוב על זה" |
| 10 | the same aisle, same angle | "סוף סוף אפשר לעשות קניות בלי לעצור כל רגע" |
| 11 | the same park path, he leads | "היום אני לא נשאר מאחור" |
| 12 | end card | "מגן הברך של דופק. תמיכה בכל צעד." |

Scenes 2 and 10, and 3 and 11, are the same location shot from the same angle
before and after. That repetition is what carries the argument without a claim.

## Rules that produced it

**Nobody speaks on camera.** Two earlier attempts at lip sync failed and read
as amateur; the engines available here animate mouths plausibly but do not sync
phonemes. The film is narrated in the man's own voice instead, and no shot shows
a mouth forming words. The granddaughter's moment was rewritten from a shout to
a wordless tug on his hand, which is both safer and stronger.

**No fabricated claims.** The payoff lines are about movement and company,
never about pain disappearing, which also keeps the ad inside Meta's rules.

**Hebrew text never comes from a model.** Subtitles and the end card are
rendered in Chromium at 1080x1920 with transparency in the store's own
typefaces (Rubik, Assistant) and composited with ffmpeg, in one pass over the
finished cut so a line can span a cut. This is why there are no spelling errors.

**The product page is real.** The phone screen is a captured mobile render of
the live product page on the store, composited into the keyframe before the
shot was animated, so it travels correctly with the phone.

**Cuts fall where motion settles.** Per-frame motion energy was measured for
every clip and each cut placed on a rest point rather than a round number.

**One grade for the whole film**, plus film grain: this is the single most
effective step against the sterile look of generated footage.
`eq=contrast=1.07:saturation=1.06:gamma=0.99, colorbalance=rs=.02:gm=-.01:bh=-.03:rh=.03, vignette=PI/4.6, noise=alls=7:allf=t+u`

**Everything is verified by measurement, not assertion.** Speech boundaries are
extracted from the voice bed at 0.1 s resolution and compared against every
subtitle window; loudness is checked against EBU R128. Defects found and fixed
this way included a caption 0.7 s late, two voice lines overlapping by 0.23 s,
a scene silently truncated by ffmpeg, and a mix 4 dB too quiet.

Delivery: -15.1 LUFS integrated, -1.5 dBTP, both streams starting at 0.000.

## Locked assets (Higgsfield job ids, reusable)

Product photos: side `9ee01c78-e5af-4fea-8cf4-a1e328c0fda9` ·
hands `491d5289-4911-4f1e-8bb3-574af2ca8724` ·
dial `e5de19cc-4af5-4bbc-9032-18847a586440` ·
front `ea7c714a-2821-4220-89dc-78c2ed7f6aa1`

Character: style `a72c0c86-bac6-4259-ae23-2ac95837c33c` ·
no brace `0c604399-4ec6-4d4c-afc2-c9269067e0f6` ·
wearing it `bc6744a1-a808-4469-9649-259d5b3795cc`

Keyframes: bedroom `0adf41fe` · aisle before `77701f44` · park before `b2bc6fe2` ·
the hand `e68d5bcf-9d0c-4e56-b92a-42d9f05eff7c` · phone with the real page
`d8f44178-a1ec-4a85-bb0e-8f487d824227` · courier `02bfacaa` · fitting `c06cdc2d` ·
dial macro `195d946f` · aisle after `2a3a24ea` · park after `6942ddb9` ·
bedroom after `61e7195b`

Narration voice: elevenlabs_v4 preset `563f728c-e249-5a85-97ab-8461e8c09da6`.
Score: elevenlabs_music_v2_5, instrumental, cleared for commercial use.

## Reuse for the other products

Keep the two character masters and the narration voice. Generate new keyframes
from them with the new product's own photographs as additional references, then
follow the same pipeline. A second product should cost roughly 200 credits and
one working session.

## Status

Delivered to the merchant. Not yet uploaded to Meta: ad account
act_1947808895332497 is still blocked on account verification
(code 31, subcode 3858385).
