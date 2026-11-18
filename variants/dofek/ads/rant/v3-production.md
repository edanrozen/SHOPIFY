# DOFEK rant ad — v3

Client-approved voice (take "D_b"), restored script line, reframed and recut.

## What changed from v2

1. **A line of the client's script was missing from the take.**
   `לחשוב על כל פעילות כאירוע שלם גם אם זה הליכה של דקה` never made it into the
   continuous recording. Found by comparing the phrase count of the approved
   take (10) against the earlier one (15) and reading back the text that was
   actually submitted to TTS. Restored as a pick-up (see below).

2. **Reframed.** Only three shots stay close on the face: the 2.3s hook, the
   product shot and the warm close. The rest are wide or medium.

3. **Recut on the pauses.** Every face shot longer than ~3.5s is cut away from
   on an internal pause.

## Why reframing and recutting, and not a better lip-sync tool

`autosil.py` finds the highest-motion patch in a locked-off shot (that is the
mouth) and compares how much it moves during silence against during speech.

    properly synced head   ratio 5-10
    wan2_7 on this face    ratio 1.1 - 3.3
    sync_so on this face   reduced mouth motion by 22% (worse, 18 cr/shot)

The mouth never fully stops between words. That is the model's ceiling on this
stylised character, not a frame offset — container A/V alignment is clean and
cross-correlation lag is within one frame of zero. A viewer reads a mouth that
flaps through a pause as "delay", so the only levers left are:

* make the mouth small on screen (framing), and
* never hold a face shot across a pause (cutting).

Both are free. More generation is not.

## The pick-up

A separately generated line cannot be dropped in blind. Checks run:

    main take, per phrase   102.6 - 166.7 Hz   -19.1 to -21.6 dB
    pick-up (x_a)           135.6 Hz            -23.3 dB

Pitch sat inside the take's own range, so no pitch processing (which would
also shift formants and change the apparent size of the speaker). Level was
corrected +3.8 dB, the internal pause trimmed 0.18s and `atempo=1.08` applied
to match the take's pace. Result: 4.28s, -19.7 dB, 131 Hz — indistinguishable
in context.

It is spliced at 18.80s, which is a **slice boundary**: the shots before it and
after it keep their sync, because each wan2_7 shot speaks its own slice and
everything after simply shifts by a constant 4.58s. Nothing already rendered
was wasted.

## Build method

`vo/take3.wav` is the master clock. Cut points are **absolute frame numbers**
computed from the audio, never per-segment lengths, so rounding cannot
accumulate into drift.

    p01 X1   55 fr  0.00- 2.29  hook, tight
    p02 X2  113 fr  2.29- 7.00  wide, pointing, slow push
    p03 X3   96 fr  7.00-11.00  brace, foot on block
    p04 c11  29 fr 11.00-12.21  brace on the knee, lands on "מגן הברך של דופק"
    p05 c10  53 fr 12.21-14.42
    p06 c02  37 fr 14.42-15.96
    p07 c01  68 fr 15.96-18.79
    p08 c03  55 fr 18.79-21.08  restored line
    p09 c05  55 fr 21.08-23.38  restored line
    p10 X4   84 fr 23.38-26.88  slow push
    p11 X5   29 fr 26.88-28.09
    p12 c07  27 fr 28.09-29.21  the button, on "תלחץ פה"
    p13 X5   32 fr 29.21-30.54  resumed at its own timecode
    p14 X6   63 fr 30.54-33.17
    p15 end  65 fr 33.17-35.87

861 frames @ 24fps = 35.875s.

## Rules carried forward

* A generated asset is what came back, not what you asked for. Measure it.
* A direction prompt does not change pitch. Process deterministically or pick
  a different voice.
* `zoompan` with an accumulating `z=min(k*zoom,max)` silently does nothing.
  Use `z='1+k*on'`.
* Mastering gain must be re-measured per cut: the same chain gave -15.0 LUFS on
  v2 and -18.5 on v3 because the dialogue density differs.

## Review pass on the finished cut

Two faults found by looking at a frame strip of the master, not by looking at
the plan:

* the dial macro (`c12`) is so tight it reads as abstract texture — nobody
  seeing it for 1.2s knows it is a knee brace. Replaced with `c11`, the brace
  worn on the knee.
* `c10` at in-point 0.35 has already tilted past his head, so the line
  "ולחזור ללכת כמו בן אדם" played over a headless torso. In-point moved to
  0.00, where his face is in frame and smiling.

Both are the same mistake: a clip was chosen from a contact sheet taken at one
timecode and then used at another. Pick the in-point from the frame you will
actually show.

## The accent: root cause

The client's verdict on the approved take was "he sounds like a tourist
speaking Hebrew". Checking the voice ids showed the choice was never the
problem — `6705e465-7b52-5915-a1d8-b1222885e01d` is Fraser, the voice he
picked for pronunciation, and it is also the voice of the take he rejected.

Every voice tried so far (Fraser, Archie, Reid, Grady, Holden, Cillian,
Dylan, Emmett) comes from the ElevenLabs **English** preset library. They are
English speakers reading pointed Hebrew. No amount of re-rolling inside that
library fixes the accent, and no direction prompt does either.

`models_explore(action:"search", type:"audio")` turned up what the preset list
does not show:

* **`inworld_text_to_speech`** carries native-language voices, including
  `Oren (he)` and `Yael (he)` — Hebrew, not English reading Hebrew.
* **`seed_audio`** (ByteDance) is multilingual and takes `audio_references`
  for cloning, plus `pitch_rate` / `speech_rate` controls.
* **`text2speech_v2`** exposes other engines (`minimax`, `seed_speech`,
  `vibe_voice`, `cozy_voice`) behind a `variant` param.

Measured on the same line:

    Oren (inworld)      13.92s   150.9 Hz
    Oren, shifted 0.85  13.92s   131.1 Hz
    seed_audio          12.18s   114.3 Hz
    minimax             14.90s    92.0 Hz

**Rule: check `models_explore` for the capability before re-rolling inside the
default model's options.** Four rounds of voice selection were spent inside a
library that could not produce the required result.

## v4 — the voice the client chose

Screened 12 untested male preset voices on one Hebrew test line, then ranked
them by measured median pitch and sent the client only the five deepest, so
every option already met "older man" before he listened:

    Gideon    93.0 Hz      <- chosen
    Vlad     103.9 Hz      (Slavic; a Russian-Israeli accent is native to this
    Sterling 109.6 Hz       market, unlike an English one)
    Alden    127.0 Hz
    Desmond  127.0 Hz

Measuring first turned an open-ended listening task into a five-way choice.

Also dropped at the client's request: the word "באחריות", everywhere — script,
voice take and captions.

Take selection among three recordings of the full script went by measurement
too: G3 had the tightest level spread (1.9 dB against 2.4 and 2.0) and its
phrase boundaries mapped one-to-one onto the script lines.

### Mastering gain is per-cut, again

The chain that gave -15.0 LUFS on v3 gave **-13.4** on v4 with the same
settings, because this voice is denser. Corrected -2.8 dB -> -4.4 dB.
Never carry a mastering trim between cuts; measure after every encode.

## v5 — undoing the fix that caused the next problem

Client on v4: "it sounds like bad narration; it has to look like the man is
actually speaking — but the sound is good." The voice was finally accepted;
the structure was the fault, and the fault was mine.

Back at the lip-sync complaint I measured that the model keeps the mouth
moving through silences and concluded the levers were framing and cut rate.
So I made him small in frame and cut away constantly. Counted on the v4
master: **461 of 873 frames had a speaking face. 47% of the ad was stock
footage with a voice over it.** That is the definition of narration. I
optimised away the symptom the client named first and manufactured the one he
named next.

v5 reverses it:

* **Three continuous wan2_7 takes** (12s / 12s / 9s) carry the entire script
  instead of six short ones. Fewer cuts read as a person talking; many cuts
  read as an edit. `wan2_7` holds identity and motion across 12s — measured,
  no freeze (frame-difference stays 2.0-8.0 through to 11.7s).
* **Cutaways dropped from 47% to 10%** of screen time: the brace, the
  colleague, the button. Each is placed *inside* a take and returned to at
  that take's own timecode, so sync survives the cut.
* **Pauses tightened** from 0.28-0.58s to a flat 0.17s (0.26-0.30s at the hook
  and before the CTA). Less silence means less time for a mouth to move
  without sound — the same defect, attacked through the audio instead of by
  hiding the face. It also cuts 1.74s and a rant should be breathless.

Silence/speech mouth ratios are unchanged (1.30 / 1.56 / 1.64) because the
model's ceiling has not moved. What changed is that the viewer is now watching
a man deliver a monologue, which is what was asked for.

**Rule: when a fix for one complaint is a workaround rather than a repair,
write down what it costs. The cost arrives as the next complaint.**
