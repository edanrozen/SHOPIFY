# מובייל: מה נמדד, מה תוקן, מה לא ניתן למדוד

התיעוד הזה נכתב אחרי הבקשה "תדאג שכל האתר ממושק למובייל ולא למחשב".
הוא מפריד בין מה שנמדד בדפדפן אמיתי לבין מה שנבדק לפי הגדרות בלבד,
כי שתי הרמות האלה לא שוות אחת לשנייה וקל לבלבל ביניהן בדיווח.

## 1. מה נמדד בדפדפן

11 עמודים שאני בניתי: הבית, עמוד האוסף, ותשעה עמודי מוצר.
ארבעה רוחבי מסך: 320, 360, 390, 430. עם אמולציית מגע
(`isMobile: true, hasTouch: true`), כי בלי זה חלק מהתנהגות ה-CSS
לא נכנסת לתוקף בכלל.

הקריטריונים שנמדדו על כל עמוד ועל כל רוחב:

* גלילה אופקית של הדף
* אלמנט רחב מהחלון
* יעד נגיעה מתחת ל-44px
* טקסט מתחת ל-13px
* שדה קלט מתחת ל-16px, כלומר זום כפוי בפוקוס ב-iOS
* תמונה בלי width/height, כלומר קפיצת פריסה

התוצאה על כל 44 המדידות: אין ממצא.

הכלי: `tools/pdp-preview/mobile-audit.js`.

## 2. שתי הגדרות שחשדתי בהן ולא היו תקלה

חשוב לרשום גם את זה, כי דיווח על תקלה שלא קיימת הוא נזק בפני עצמו.

**שדה החיפוש ברוחב חצי מסך.** ב-`templates/search.json` ה-`_search-input`
מוגדר `width: custom, custom_width: 50`. זה נראה כמו שדה חיפוש בחצי
טלפון. הוא לא: `blocks/_search-input.liquid` כולל
`@media (max-width: 749px) { max-width: 100% }`. ההגדרה הזאת משפיעה
על מסך גדול בלבד. לא נגעתי בה.

**זום בפוקוס ב-iOS.** `assets/base.css` כבר כולל
`@media (max-width: 1200px) { input, textarea, select { font-size: max(1rem, 100%) } }`
עם עקיפה מפורשת לכל ה-type presets. הנושא מטופל בבסיס התֵמה.

## 3. מה כן היה שבור, ותוקן

התֵמה של Horizon בנויה מובייל-first. מה שהיה שבור בעמודים שלא נגעתי
בהם קודם הוא לא רוחב מסך, אלא שפה וכיווניות.

### אנגלית בעמודים שאף אחד לא בדק

| קובץ | היה | עכשיו |
| --- | --- | --- |
| `templates/404.json` | Page not found | הדף לא נמצא |
| `templates/404.json` | The link may be incorrect, or the page has been removed. | יכול להיות שהקישור שגוי, או שהדף הוסר. |
| `templates/404.json` | Continue shopping | חזרה לכל המוצרים |
| `templates/404.json` | Discover something new | אפשר להתחיל מכאן |
| `templates/cart.json` | Cart | הסל שלי |
| `templates/cart.json` | You may also like | משלימים את הערכה |
| `templates/cart.json` | View all | לכל המוצרים |
| `templates/list-collections.json` | Collections | האוספים שלנו |
| `templates/page.contact.json` | Submit | שליחה |
| `templates/password.json` | Opening soon | נפתחים בקרוב |
| `templates/password.json` | Sign up for our newsletter to be the first to know when we launch. | אפשר להשאיר כתובת מייל, ונעדכן ברגע שהחנות נפתחת. |
| `templates/password.json` | Sign up | עדכנו אותי |

### יישור לכיוון ההפוך

`snippets/text.liquid` כותב `--text-align: {{ block_settings.alignment }}`
כערך מילולי, ו-`layout/theme.liquid` מגדיר `dir="rtl"` עבור `he`.
כלומר `alignment: "left"` על בלוק עברי דוחף את הטקסט לקצה הלא נכון.
זה חל רק על בלוק שרוחבו 100%, ולכן לא על כל מופע.

תוקן ל-`right` בשם המוצר ובמחיר ב-404, בסל ובחיפוש, בכותרת הסל,
בכותרת עמוד החיפוש, ובכותרת עמוד האוספים ובשם האוסף.
בדף 404 הכותרת והפסקה נשארו `center`, כי מרכז הוא סימטרי.

### פריסה למובייל

* `templates/cart.json`, כותרת ההמלצות: `vertical_on_mobile` היה `false`
  על שורה עם כותרת וקישור ב-`space-between`. עכשיו `true`, כמו בדף 404.
* `templates/404.json`, הכפתור: `width_mobile` היה `fit-content`, עכשיו `fill`.
* `templates/page.contact.json`, כפתור השליחה: `width_mobile` היה
  `fit-content`, עכשיו `fill`.
* `templates/password.json`, טופס המייל: היה `custom 50` בלי הגדרת מובייל,
  כלומר שדה מייל ברוחב חצי טלפון. עכשיו `fill`.

## 4. מה לא ניתן למדוד מכאן

* **הכותרת והפוטר.** הסביבה המקומית לא מרנדרת section groups. נבדקו
  לפי הגדרות: `vertical_on_mobile: true`, רוחבי `fill`,
  `enable_sticky_header: always`, ו-`setHeaderMenuStyle()` ב-
  `layout/theme.liquid` מעביר את התפריט למגירה בכל מכשיר מגע.
* **עמודי 404, סל, חיפוש, אוספים, צור קשר.** ה-CSS של Horizon לא זמין
  לרינדור מקומי, ולכן הם נבדקו לפי הגדרות ולא לפי מדידה.
* **קופה.** לא בשליטת התֵמה.

## 5. מה נשאר פתוח

* `templates/article.json` ו-`templates/gift_card.liquid` לא נבדקו במדידה.
  ל-article אין תוכן בחנות. הוא נקי מאנגלית, הכל bindings של Liquid.
* אין favicon.
* אין הצהרת נגישות.
