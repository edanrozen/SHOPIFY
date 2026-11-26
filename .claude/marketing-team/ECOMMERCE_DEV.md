# מחלקת פיתוח האיקומרס — דוח הקמה

**הוקמה 26.11.2026 · תחת נדב, סמנכ״ל המסחר · שלושה מושבים**

---

## 1. הסוכנים והתפקידים

| | תפקיד | מזהה | תחום |
|---|---|---|---|
| **אלכס** | Shopify Development Lead | `alex-shopify-dev` | תבנית, Liquid, סקשנים ובלוקים, דף מוצר, Online Store 2.0, מטא-פילדס, מובייל, RTL |
| **סופי** | CRO & Conversion Specialist | `sophie-cro` | אבחון חסמי רכישה, הצעת ערך, אמון, התנגדויות, מסע לקוח, עגלה וצ׳קאאוט |
| **לוקאס** | E-commerce QA & Performance | `lucas-ecom-qa` | תקינות, ביצועים, Core Web Vitals, נגישות WCAG 2.1 AA, SEO טכני, רגרסיות של אפליקציות |

## 2. היררכיה

שלושתם כפופים **ישירות לנדב בלבד**. נדב מאחד ומדווח לאיתן.
**לא נוצר אף סוכן מחוץ להיררכיה של נדב.**
סדר עבודה: **סופי מאבחנת → אלכס בונה → לוקאס בודק → נדב מאשר.**
**אין לדלג על לוקאס.** אין פרסום לחנות חיה בלי אישור מפורש של עידן.

## 3. מניעת כפילות — שלושה גבולות שנדב אוכף

- **סופי ↔ שירה** · שירה מצלמת את הפאנל; סופי קוראת וממשיכה באבחון. סופי לא מריצה צילומי פאנל מחדש.
- **לוקאס ↔ גיא** · גיא מחזיק SEO טכני ברמת האתר; לוקאס בודק רגרסיות משינוי בחנות.
- **אלכס ↔ ליאור** · ליאור הוא מה שקורה אחרי "קנה"; אלכס הוא איך החנות בנויה לפני "קנה".

## 4. Skills — מה נבדק בפועל

### 🔴 מה שהבריף הגדיר כ"Skill קיים" ואינו קיים

| נתיב בבריף | מצב בפועל |
|---|---|
| `plugins/shopify-app-builder/liquid-themes` | **לא קיים.** אין תוסף בשם `shopify-app-builder` בשום מקום במערכת |
| `plugins/shopify-app-builder/app-performance` | **לא קיים** |
| `plugins/shopify-app-builder/app-accessibility` | **לא קיים** |
| `plugins/shopify-app-builder/merchant-pain-prevention` | **לא קיים** |

`find` על כל מערכת הקבצים, ובדיקת `/root/.claude/plugins/`. אין התאמה.

### 🔴 מקורות מועמדים שנבדקו ונדחו

`nexscope-ai/eCommerce-Skills` (MIT, 150 סקילים, משוכפל ל-scratchpad מסשן
קודם של נדב) — מכיל שמות מתאימים מאוד: `shopify-theme-optimization`,
`shopify-page-speed`, `shopify-conversion-optimization`,
`ecommerce-checkout-optimization`, `shopify-cart-abandonment` ועוד.

**נקראו ונדחו.** כל קובץ הוא ~1.9KB של תבנית שיווקית: כותרת, רשימת
"Capabilities", פקודת התקנה, שלושה פרומפטים לדוגמה וקישור למוצר
SaaS של המפרסם. **אפס מתודה, אפס ספים, אפס צ׳קליסט.** להשוואה: הסקיל
המקומי `cro` הוא 6.8KB של שיטה ממשית.

התקנתם הייתה מציגה מצג שווא של יכולת. **לא הותקן אף אחד מהם.**

### ✅ מה שקיים באמת והוצמד

**רשמי של Shopify, דרך `mcp__Shopify__use_skill`:**
- **`editing-themes`** — 33,872 בייט, עם `references/accessibility.md` (7,145, WCAG), `references/design-task.md` (14,535), `typography.md`, `motion.md`. **זה מחליף את שלושת הסקילים שאלכס היה אמור לקבל, ועדיף עליהם** — מקור רשמי ומתוחזק, בדיוק מה שהבריף ביקש להעדיף.
- **`admin-graphql`** — 9,784 בייט.

**מקומיים, 53 סקילים, נבדקו ומכילים שיטה:**
- סופי: `cro`, `ab-testing`, `signup`, `popups`, `customer-research`, `offers`, `pricing`, `copywriting`, `product-marketing`, `marketing-psychology`, `conversion-tracking`, `analytics`
- לוקאס: `seo-audit`, `schema`, `site-architecture`, `analytics`
- `marketing-agent-kit:funnel-screenshots` — הליכה בפאנל

**לא הותקן דבר חדש.** כל מה שהוצמד היה קיים ונקרא.

## 5. שני חסמים שמגבילים את המחלקה ביום הקמתה

🔴 **אלכס חסום.** לקונקטור אין הרשאת `read_themes`; `theme_bash` מחזיר
*"This connector requires additional permissions"*. **אי אפשר לקרוא ולא
לכתוב לתבנית החיה.** משחרר: עידן מחבר מחדש את Shopify עם הרשאת תבנית
ופותח סשן חדש. **בחינם.**

⚠️ **סוכן-משנה אינו מקבל כלי MCP** (מאומת 25.11). אלכס ולוקאס אינם
יכולים לקרוא ל-Shopify MCP בעצמם; הם מנסחים את הקריאה וקלודי מריצה.
ההיררכיה היא מודל אחריות, לא מסלול האצלה טכני.

⚠️ **רשימת הסוכנים נטענת בתחילת סשן.** שלושת הקבצים נכתבו לדיסק
ב-26.11, אך השמות `alex-shopify-dev`, `sophie-cro`, `lucas-ecom-qa`
ייקלטו ככלי רק בסשן הבא. הביקורת הראשונה הורצה עם אותם בריפים.
