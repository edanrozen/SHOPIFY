# מחלקת השיווק של DOFEK

21 סוכנים. אחד מקבל ממך משימות — **איתן**. השאר מקבלים ממנו.

התוסף: `marketing-agent-kit@marketing-agent-kit` v2.1.0 (MIT),
מאת Dmytro Tymoshenko. 20 Skills + סוכן מקורי אחד (`copy-critic`).
**שמות ה-Skills וה-Agent המקורי לא שונו ולא הועתקו** — ההגדרות שלנו
ב-`.claude/agents/` מפעילות אותם בשמם המקורי, כך שהתאימות נשמרת ועדכון
של התוסף לא ישבור כלום.

---

## איך מפעילים

**ברירת המחדל — דרך איתן:**

> "איתן, תבדוק למה הפאנל לא ממיר ותחזור עם תוכנית"

הוא מפצל, מריץ מומחים במקביל, מבקר, ומחזיר מסמך אחד מתועדף.

**ישירות למומחה**, כשאתה יודע בדיוק מה אתה רוצה:

> "תן לאדם לכתוב 3 גרסאות טקסט למודעה C"
> "שירה, תצלמי את הפאנל של dofek.shop בנייד"

---

## ⚠️ "עומר" — השם התנגש, וזה מה שעשינו

הגדרת פעם את **עומר** כמוח השיווק של הפרויקט. המיפוי שהעברת עכשיו
מקצה את אותו שם ל-Sound Designer. שני עומרים בפרויקט אחד שוברים כל
הוראה עתידית שאומרת "תגיד לעומר".

**ההחלטה:** התפקיד של "מוח השיווק" עבר ל**איתן**, שהוא ממילא נקודת
הכניסה החדשה — וזה מה שעומר היה בפועל. השם **Omer** פנוי עכשיו
ל-Sound Designer, בדיוק לפי המיפוי שלך.

- **"תגיד לעומר"** בשיחה → מעתה **איתן**.
- ל-Sound Designer פונים רק כ**"Omer – Sound Designer"** או **"עומר סאונד"**.

רוצה הפוך — שעומר יישאר מוח השיווק ו-Sound Designer יקבל שם אחר? מילה אחת.

---

## מחקר

| שם | תפקיד | סוכן | Skill | מצב |
|---|---|---|---|---|
| **Noam** | Head of Market Intelligence | `noam-market-intel` | `competitor-research` | ⚠️ חלקי |
| **Maya** | Research Analyst | `maya-research` | `parallel-research` | ❌ חסום |
| **Ido** | Paid Media Analyst | `ido-paid-media` | `ads-parser` | ❌ חסום |

**Noam** — תיק מתחרה מלא לפי דומיין: מוצרים, מחירים, הבטחות, סנטימנט
בקהילות, המודעות שהוא מריץ, SEO, PR. מפריד עובדה שראה ממסקנה שהסיק.
בלי Parallel/SearchApi רץ על WebSearch — פחות עומק, עדיין עובד.
**Maya** — מחקר עומק עם ציטוט לכל טענה. צריכה `PARALLEL_API_KEY`.
**Ido** — שולף מודעות מספריות השקיפות עם הטקסט המדויק ותאריכי ריצה.
צריך `SEARCHAPI_KEY`. ריצה ארוכה של מודעה היא אות הרווחיות היחיד שרואים מבחוץ.

## SEO

| שם | תפקיד | סוכן | Skill | מצב |
|---|---|---|---|---|
| **Yael** | Head of SEO | `yael-seo-head` | `seo` | ⚠️ חלקי |
| **Tamar** | Search Analyst | `tamar-search-analyst` | `gsc-insights` | ❌ חסום |
| **Guy** | Technical SEO | `guy-tech-seo` | `seo-tech-audit` | ⚠️ חלקי |
| **Daniel** | SEO Researcher | `daniel-seo-research` | `ahrefs` | ❌ חסום (בתשלום) |

כל משימת SEO נכנסת דרך **Yael**, שמנתבת לשלושת האחרים. המשפחה הותקנה
בשלמותה כי הם קוראים זה לזה בשם התיקייה.
**Guy** היחיד שעובד כבר עכשיו בפועל — קריסה של dofek.shop אפשרית מהסשן הזה.
**Daniel** דורש מנוי Ahrefs ($129/חודש) — לא נרשמנו ולא נירשם בלי אישור שלך.

> **השיקול העסקי:** החנות חדשה, בלי הזמנות ובלי היסטוריית דומיין. SEO הוא
> ערוץ של 6–12 חודש. לא שם הכסף שלך עכשיו.

## אנליטיקה

| שם | תפקיד | סוכן | Skill | מצב |
|---|---|---|---|---|
| **Itay** | Growth Analyst | `itay-growth-analyst` | `ga4-reports` | ❌ חסום |
| **Shira** | UX Researcher | `shira-ux-research` | `funnel-screenshots` | ✅ **עובד** |

**Itay** צריך GA4 + gcloud. בינתיים נתוני הפאנל באים מ-ShopifyQL, שהוא
ממילא האמת היחידה כאן.
**Shira** עובדת כבר עכשיו — Chromium ו-Playwright מותקנים ו-dofek.shop
מותר ברשת. היא הולכת בפאנל מקצה לקצה באמולציית אייפון ומצלמת כל מסך
ב-1179×2556, בלי להקליד פרטי תשלום. **זו המשימה הדחופה ביותר בפרויקט.**

## קריאייטיב

| שם | תפקיד | סוכן | Skill | מצב |
|---|---|---|---|---|
| **Noa** | Designer | `noa-designer` | `image-gen` | 🔄 דרך Higgsfield |
| **Ron** | Video Producer | `ron-video-producer` | `video-studio` | ❌ HyperFrames |
| **Omer** | Sound Designer | `omer-sound` | `video-sound` | ❌ ElevenLabs |
| **Liam** | Motion Designer | `liam-motion` | `video-moves` | ❌ HyperFrames |
| **Alon** | Video Editor | `alon-video-editor` | `video-build` | ❌ HyperFrames |
| **Yonatan** | 3D Artist | `yonatan-3d` | `video-3d` | ❌ HyperFrames |
| **MayaVideo** | AI Video Artist | `mayavideo-ai-video` | `video-generated` | 🔄 דרך Higgsfield |
| **Dana** | Video QA | `dana-video-qa` | `video-check` | ⚠️ בלי whisper |
| **Ori** | Creative Ops | `ori-creative-ops` | `ads-video-library` | ✅ **עובד** |

כל סרט נכנס דרך **Ron**: הוא כותב בריף אחד, מסדר אודיו-קודם, ומזמין
עבודה מ-Liam, Alon, Omer, Yonatan ו-MayaVideo. **Dana** היא השער —
שום סרט לא מגיע אליך לפניה.

**Noa ו-MayaVideo לא עובדות ב-OpenAI/Atlas אלא ב-Higgsfield MCP**, שכבר
מחובר ומשולם אצלך. זה לא פשרה — זה הכלי שבו נבנו הקריאייטיבים הקיימים,
והוא זול יותר (0.75 קרדיט לתמונה).

Noa נושאת את כל מה שנשרף בפרויקט הזה: כיוון המוצר נבדק ולא רק הדמיון;
כותבים איך המגן *יושב* ולא איך הוא נראה; טקסט לא עולה על הצילום; פלטה
`#0B1725`/`#FB911B`/`#F8F1E7` ופונטים Secular One + Rubik; בלי מחיר
ובלי מספר ביקורות; וכל מודעה בקמפיין מקבלת צילום אחר.

**Ori** עובד כבר עכשיו. בלי מערכת שמות אין דרך לקשור ביצועים ב-Meta
לקריאייטיב שהריץ אותם — כלומר בלי Ori אין מסקנה תקפה על "מה עבד".

## קופירייטינג

| שם | תפקיד | סוכן | Skill | מצב |
|---|---|---|---|---|
| **Adam** | Senior Copywriter | `adam-copywriter` | `plain-copy` | ✅ **עובד** |
| **Yuval** | Copy Critic | `copy-critic` ← מקורי | `copy-critic` | ✅ **עובד** |

**Adam** כותב, **Yuval** פוסל. יובל עובר שורה-שורה ומחזיר פסק דין
**ואת השורה המחליפה** — לא עצה על השכתוב. שתי השאלות שלו: *האם זר
יבין בקריאה אחת?* ו*אז מה?*

**יובל הוא הסוכן המקורי של התוסף.** לא יצרנו כפילות ולא נגענו בקובץ שלו;
`.claude/agents/yuval-copy-critic.md` הוא רשומת רוסטר שמחזיקה את חוקי
DOFEK, ומפנה להפעלת `copy-critic` עצמו.

## ההנהלה

| שם | תפקיד | סוכן | מצב |
|---|---|---|---|
| **Eitan** | Chief Marketing Officer | `eitan-cmo` | ✅ **עובד** |

מקבל ממך, מפצל, מריץ במקביל, מבקר, מאחד לתוכנית אחת, מתעדף לפי הכנסה.
**הוא לא ממציא נתונים ולא נותן לסוכן להציג הערכה כעובדה** — דוח שמגיע
אליו בלי מקור לכל מספר מוחזר, לא מתוקן על ידו. והוא לא נוגע בכסף:
תקציב, הדלקה/כיבוי של מודעה, ועריכת קריאייטיב חי — רק באישור מפורש שלך,
לאותה פעולה, באותו יום.

---

## תשתית — לא מומחה

`marketing-agent-kit:connect` מחבר שירותים (מפתחות, gcloud, רישום MCP).
לא הוקצה לו סוכן בשם. מופעל רק כשחיבור חסר חוסם משימה, ורק באישור שלך.

---

## מה חסר, ומה זה שווה

| חיבור | למי | עלות להתחיל | שווה את זה ל-DOFEK? |
|---|---|---|---|
| **HyperFrames CLI** | Ron, Liam, Alon, Yonatan | חינם (`npx skills add heygen-com/hyperframes`) | **כן** — פותח 4 סוכנים בלי כסף |
| **whisper** | Dana | חינם (`uv tool install`) | **כן** — שער התמלול שלה |
| SearchApi | Ido | 100 בקשות חינם | כן, אחרי HyperFrames |
| Parallel.ai | Maya, Noam | קרדיטים חינם בהרשמה | אולי |
| GSC service account | Tamar | חינם | לא עכשיו |
| GA4 + gcloud | Itay | חינם | לא — ShopifyQL עדיף כאן |
| CrUX API | Guy | חינם | שולי |
| ElevenLabs | Omer | שכבה חינמית | רק כשיהיה סרט לדבב |
| OpenAI Images | Noa | לפי תמונה | **לא** — Higgsfield מחובר וזול יותר |
| Atlas Cloud | MayaVideo | לפי יצירה | **לא** — אותו נימוק |
| **Ahrefs** | Daniel | **$129/חודש** | **לא** — לא בחנות בלי הזמנה אחת |

**אף מפתח לא הוגדר, אף מנוי לא נפתח ואף רכישה לא בוצעה.**

---

## עובד כבר עכשיו, בלי אף חיבור נוסף

**Eitan · Adam · Yuval · Shira · Ori**, ובאופן חלקי **Noam** ו-**Guy**.

זה בדיוק הגרעין שאתה צריך החודש: אבחון הפאנל (Shira), טקסט ומודעות
(Adam + Yuval), מחקר מתחרים (Noam), וסדר בנכסים (Ori) — תחת ניהול אחד (Eitan).
