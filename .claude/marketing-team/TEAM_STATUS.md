# TEAM_STATUS — מחלקת השיווק של DOFEK

**עודכן:** 2026-11-24 · **מנהל:** EITAN (הסשן הראשי)

> איתן מעדכן את הקובץ הזה בסוף כל משימה משמעותית.
> הפרוטוקול שלו: `.claude/marketing-team/EITAN.md`. הרוסטר המלא: `TEAM.md`.

---

## 1. הסוכנים

20 סוכנים. איתן אינו ביניהם — הוא הסשן הראשי ואי אפשר להפעיל אותו כסוכן משנה.

| שם | Agent Type | תפקיד | Skill | חיבורים |
|---|---|---|---|---|
| Noam | `noam-market-intel` | Head of Market Intelligence | `competitor-research` | ⚠️ חלקי |
| Maya | `maya-research` | Research Analyst | `parallel-research` | ⚠️ בלי מפתח |
| Ido | `ido-paid-media` | Paid Media Analyst | `ads-parser` | ⚠️ בלי מפתח |
| Yael | `yael-seo-head` | Head of SEO | `seo` | ⚠️ חלקי |
| Tamar | `tamar-search-analyst` | Search Analyst | `gsc-insights` | ❌ GSC |
| Guy | `guy-tech-seo` | Technical SEO Specialist | `seo-tech-audit` | ⚠️ חלקי |
| Daniel | `daniel-seo-research` | SEO Researcher | `ahrefs` | ❌ בתשלום |
| Itay | `itay-growth-analyst` | Growth Analyst | `ga4-reports` | ❌ GA4 |
| Shira | `shira-ux-research` | UX Researcher | `funnel-screenshots` | ✅ |
| Noa | `noa-designer` | Designer | `image-gen` | 🔄 Higgsfield |
| Ron | `ron-video-producer` | Video Producer | `video-studio` | ❌ HyperFrames |
| Omer | `omer-sound` | Sound Designer | `video-sound` | ❌ ElevenLabs |
| Liam | `liam-motion` | Motion Designer | `video-moves` | ❌ HyperFrames |
| Alon | `alon-video-editor` | Video Editor | `video-build` | ❌ HyperFrames |
| Yonatan | `yonatan-3d` | 3D Artist | `video-3d` | ❌ HyperFrames |
| MayaVideo | `mayavideo-ai-video` | AI Video Artist | `video-generated` | 🔄 Higgsfield |
| Dana | `dana-video-qa` | Video QA Reviewer | `video-check` | ⚠️ בלי whisper |
| Ori | `ori-creative-ops` | Creative Ops Manager | `ads-video-library` | ✅ |
| Adam | `adam-copywriter` | Senior Copywriter | `plain-copy` | ✅ |
| Yuval | `copy-critic` ← מקורי | Copy Critic | `copy-critic` | ✅ |

---

## 2. משימות פעילות

| # | משימה | אחראי | סטטוס | חוסם |
|---|---|---|---|---|
| 1 | תיק תחרותי על שוק מגני הברך בישראל | Noam | 🟡 רץ | — |
| 2 | על מה קוני מגן עם גלגלת מתלוננים בפועל | Maya | 🟡 רץ | אין מפתח Parallel |
| 3 | אילו מודעות מגן ברך רצות הכי הרבה זמן | Ido | 🟡 רץ | אין SEARCHAPI_KEY |

---

## 3. תלויות וחסמים

**חוסם את כל משפחת הווידאו (Ron, Liam, Alon, Yonatan):** HyperFrames לא
מותקן. חינמי. פקודה אחת פותחת ארבעה סוכנים.

**חוסם את דנה חלקית:** `whisper` לא מותקן — שער התמלול שלה מושבת. חינמי,
אבל גורר ~GB מודלים.

**חוסם את Ido ו-Maya חלקית:** SearchApi (100 בקשות חינם) ו-Parallel
(קרדיטים חינם בהרשמה). **לא נרשמתי לאף אחד — דורש אישור שלך.**

**חוסם את Tamar, Itay, Daniel:** GSC, GA4, Ahrefs. Ahrefs בתשלום
($129/חודש) ולא שווה את זה בחנות בלי הזמנה אחת.

**החוסם העסקי האמיתי, שאינו טכני:** 362 סשנים, 8 הגיעו לתשלום, **אפס
שילמו.** כל קריאייטיב חדש רץ על פאנל שלא הוכח. Shira יכולה לצלם את זה היום.

---

## 4. תוצאות שהושלמו

| תאריך | מה | איפה |
|---|---|---|
| 24.11 | התקנת 20 הסוכנים + הרוסטר | `TEAM.md` |
| 24.11 | ממצא: מכבי נותנת מגן אחד לכל רגל בשנה — החלופה היא 0₪ | `product-marketing.md` v1.5 |
| 24.11 | ממצא: `ad-ad-matai` מפסידה פעמיים בגלל פתיח מאשים | `ads/campaign-log.md` |
| 24.11 | 4 מודעות על 4 זוויות, כולל זווית המסלול הרפואי | `ads/concepts/2026-11-24-new-angles.md` |
| 24.11 | התקנת Agent Orchestration + איתן כסשן ראשי | הקובץ הזה |

---

## 5. ממתין לאישור של עדן

| # | מה | למה זה מחכה |
|---|---|---|
| A | **להעלות את מודעות E ו-H** | אסור לגעת בקמפיין בלי אישור. והמלצתי: לא לפני שהפאנל נבדק |
| B | **להוריד את הפתיח המאשים מ-`ad-ad-matai`** | שינוי קריאייטיב חי |
| C | **להתקין HyperFrames** (חינם) | פותח 4 סוכני וידאו |
| D | **להתקין whisper** (חינם, ~GB) | פותח את שער ה-QA של דנה |
| E | **להירשם ל-SearchApi ול-Parallel** (שכבה חינמית) | "אל תפתח מנויים ללא אישורי" |
| F | **לתת לשירה לצלם את הפאנל** | ההמלצה בעלת התשואה הגבוהה ביותר כרגע |
