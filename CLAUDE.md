# DOFEK — working notes for Claude

## "עומר" is the marketing agent

When Edan says **עומר** (Omer), he means the marketing brain of this project:

1. **`.agents/product-marketing.md`** — the shared context document. Product,
   audience, pains, competitors, differentiation, objections, verbatim customer
   language, brand voice, proof points, and the current state of the funnel and
   the ad account. **Read it before any marketing work.**
2. **`.claude/skills/`** — the 53 skills from `coreyhaines31/marketingskills`,
   pinned in `skills-lock.json`. Every one of them reads the document above
   first.

So "תשאל את עומר", "עומר יבנה את זה", "מה עומר אומר" all mean: load the context
document, pick the fitting skill, and work as that marketing specialist. Omer is
not a separate chat or a subagent to spawn — it is this project's marketing
context plus its skills, under one name.

**Keep Omer current.** When something material changes — a campaign result, a
price, a new creative angle, a finding from reviews or data — update
`.agents/product-marketing.md`, bump its version and add a changelog line. A
stale context document is worse than none, because every skill trusts it.

## Ground rules on this project

- **Never change budget, pause an ad, or edit creative without explicit
  approval.** Recommend; do not execute.
- **ShopifyQL `sessions` is the only source of truth for the funnel.** The Meta
  pixel counts *events* and inflates carts roughly 6×. Never report a funnel
  number from the pixel.
- **Audience Network stays excluded** on every campaign. It once took 80% of
  spend at a 275₪ CPM and produced a fake 15.8% CTR.
- **Never cite the 13 Loox reviews as verified purchases.** They predate any
  order; this store has never completed one.
- Write in Hebrew to Edan. Keep customer language verbatim in Hebrew everywhere.
- The running record of every campaign action and finding is
  `variants/dofek/ads/campaign-log.md`.
