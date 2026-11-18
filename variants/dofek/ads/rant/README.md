# DOFEK · «סתום ת'פה» — the direct-address cut

A second creative, written by the client, that does the opposite of the story
film: it does not ask the viewer to identify with a character, it accuses him.

```
סתום ת'פה. כן כן, אתה. אם הברך כואבת לך כל יום ובכל זאת אתה לא עושה עם זה
כלום — אז תמשיך. תמשיך לסבול, במקום לקנות כבר את מגן הברך של דופק ולחזור
ללכת כמו בן אדם, לא כמו חיה פצועה. לא נמאס לך ללכת לעבודה ולסבול? די. די
כבר. אתה רוצה להתלונן או למצוא פתרון? רוצה פתרון — תלחץ פה ובוא נגמור את
זה. באחריות. יאללה, תזמין ותספר לי איך היה.
```

## Why this format suits the tooling

The lip-sync finding from the story film was that it only registers on close,
stable faces — in wide or fast-moving shots the mouth is a few dozen blurred
pixels and the sync is invisible. **An ad that is nothing but a talking
close-up is the case the tool is best at**, so the format and the technology
agree for once.

## The one line that was changed, and why

The client's original was «כן כן אתה, שכל היום סובל מכאבים». That asserts
knowledge of the viewer's health, which is what Meta's **Personal Attributes**
policy prohibits and a common rejection reason in this category. A rejected ad
costs days, and repeated rejections put the account at risk.

Changed to a conditional, which keeps the whole accusation:

> «כן כן, אתה. **אם הברך כואבת לך כל יום** ובכל זאת אתה לא עושה עם זה כלום»

Everything else is verbatim.

## Structure — nine beats, six of them generated

| # | beat | shot |
|---|---|---|
| 1 | «סתום ת'פה» · «כן כן, אתה» | new — tight close, finger at the lens |
| 2 | «אם הברך כואבת לך כל יום…» | new — palms spread, disbelief |
| 3 | «אז תמשיך. תמשיך לסבול…» | new — foot up, braced knee in frame |
| 4 | «ולחזור ללכת כמו בן אדם, לא כמו חיה פצועה» | **reused** `c02`, bent under a sack |
| 5 | «לא נמאס לך ללכת לעבודה ולסבול?» | **reused** `c01`, slumped at the ladder |
| 6 | «די. די כבר…» | new — flat palm, stop |
| 7 | «רוצה פתרון? תלחץ פה…» | new — pointing straight at the viewer |
| 8 | «יאללה, תזמין ותספר לי איך היה» | new — the first warmth in the film |
| 9 | end card | 77-frame reveal, «מספיק להתלונן. תפסיק לסבול.» |

**Beats 4 and 5 are reused silent footage with voice laid over, and they are
better that way.** «לא כמו חיה פצועה» while you watch him bent double under a
plaster sack beats him saying it to camera: the words describe, the picture
proves. It also took the build from 242 credits to 172 and left a margin for
mistakes, which a full-generation cut would not have.

A third cutaway («לחשוב על כל פעילות כמו אירוע שלם») was cut: three VO lines
ran 9.9s against 7.0s of available picture, and that one is the abstract one
while «לא נמאס לך ללכת לעבודה ולסבול» already makes the point concretely.

**He wears the brace throughout.** He is not lecturing from outside the
problem, he is the man who already solved it — which is what earns him the
right to shout. It also keeps the product on screen without a single product
shot.

## Music

A rant bed must not swell; it must drive and stay out of the voice. Two
candidates, both steady-energy Mizrahi as intended, separated by brightness:

```
mzr1   energy flat 19   brightness 1219   dense exactly where the voice sits
mzr2   energy flat 19   brightness  480   leaves room for speech   ← chosen
```

In an ad whose product is the voice, a bright bed forces the music down until
it is not there. `mzr2` delivers the same drive without the collision and
lifts 44% in brightness at the CTA. Stretched to `atempo 0.94` so its tail
clears the 37.04s cut, and sidechained harder than the story film
(`threshold=0.03:ratio=12`) because speech is continuous here.

Master: **37.04s, −15.0 LUFS, −3.1 dBTP.**
