# בלום · המפרט שחסר

## מה המצב היום

שמונה מתוך תשעת המוצרים בחנות מחזיקים `custom.specs` מלא ו`custom.in_box` מלא.
המוצר התשיעי הוא בלום. אצלו שני השדות ריקים לגמרי.

זה המוצר היחיד שרץ עליו תקציב פרסום, זה המוצר הכי יקר בחנות, והוא היחיד
שבו הסקשן שכותרתו "המפרט" מציג שורה אחת בלבד, "מתאים ל: כלבים וחתולים",
שמגיעה מ`custom.for_pets` ולא מטבלת המפרט.

כלומר מי שהגיע מהמודעה, גלל למטה כדי לבדוק אם הכלב שלו בכלל נכנס לזה,
ומצא כותרת של מפרט בלי מפרט.

## שלוש טענות שכבר חיות בדף ואין להן מקור בקטלוג

אלה לא השערות, אלה משפטים שמופיעים עכשיו ב`custom.faq` של בלום ואי אפשר
לאמת אותם מול שום נתון שמור:

1. "יש חורים בכמה גדלים כדי להתאים לחיות שונות."
2. "המתקן מתקפל ונכנס לארון."
3. "אותה עמדה משמשת גם לטיפוח יבש וגם לרחצה."

אם היצרן יגיד שאחת מהן לא נכונה, היא יורדת מהדף באותו יום. שלוש השאלות
האלה נכנסות לרשימה למטה כסעיפים 3, 7 ו8.

## ההודעה ליצרן

באנגלית, להעתקה כמו שהיא. עשרה סעיפים, מסודרים לפי מה שחוסם קנייה.

> Hi, I sell your pet grooming hammock / grooming station on my store in
> Israel and I need the full product specification for the product page.
> Please answer every line, and send the spec sheet or the packaging photo
> if you have one.
>
> 1. Maximum animal weight the hammock supports, in kg.
> 2. Open dimensions: length x width x height, in cm.
> 3. The leg holes: how many, what diameter, and are they all the same size
>    or several different sizes?
> 4. Height from the floor to the mesh when it is set up, in cm.
> 5. Frame material and mesh material. Is the frame steel, aluminium or
>    plastic?
> 6. Net weight of the product itself, in kg.
> 7. Does it fold? If yes, folded dimensions in cm.
> 8. Can it be used for bathing with water, or is it dry grooming only?
>    Is the frame rust resistant?
> 9. Exactly what is inside the retail box.
> 10. Is there more than one size of this product? If yes, which size am I
>     receiving?

## איפה כל תשובה נוחתת

| סעיף | לאן זה הולך | מה זה פותר |
|---|---|---|
| 1 משקל מקסימלי | `custom.specs` שורה ראשונה | השאלה הראשונה של כל בעל כלב גדול |
| 2 מידות פתוח | `custom.specs` | "זה נכנס לי לשירותים" |
| 3 חורים | `custom.specs` ואימות ה`faq` | הטענה על כמה גדלים |
| 4 גובה מהרצפה | `custom.specs` | אם צריך להתכופף |
| 5 חומרים | `custom.specs` | תחושת איכות במחיר 199.99 |
| 6 משקל המוצר | `custom.specs` | נשיאה ואחסון |
| 7 מתקפל | `custom.specs` ואימות ה`faq` | הטענה על הארון |
| 8 רחצה | `custom.specs` ואימות ה`faq` | הטענה על המקלחת |
| 9 מה בקופסה | `custom.in_box` | הסקשן הזה ריק אצל בלום בלבד |
| 10 מידה | אם יש כמה, זו וריאציה ולא מפרט | מחיר ומלאי |

## הטבלה שתעלה לאוויר

מבנה `custom.specs` זהה לשמונת האחרים, סוג `json`, מערך של label ו value.
ברגע שיגיעו המספרים זו קריאת `productUpdate` אחת:

```json
[
  { "label": "משקל מקסימלי", "value": "__ קילוגרם" },
  { "label": "מידות פתוח",   "value": "__ על __ על __ סנטימטר" },
  { "label": "גובה מהרצפה",  "value": "__ סנטימטר" },
  { "label": "חורים לרגליים","value": "__" },
  { "label": "חומרים",       "value": "__" },
  { "label": "משקל המוצר",   "value": "__ קילוגרם" },
  { "label": "מתקפל",        "value": "__" },
  { "label": "ניקוי",        "value": "__" }
]
```

ו`custom.in_box`, סוג `list.single_line_text_field`, בדיוק כמו אצל האחרים:

```json
["עמדת בלום אחת", "__", "הוראות שימוש בעברית"]
```

## למה זה לא רק סעיף בדף

המשקל המקסימלי חוסם שלושה דברים במקביל:

1. **הסקשן "המפרט"** בדף המוצר, שמוצג היום ריק.
2. **בריף הפרסומת** ב`AD-STORY-BLOOM.md`. הבריף המקורי ביקש לברדור של
   ארבעים קילו. בלי מספר שמור כל עשרים ושניים הפרומפטים נכתבו על כלב
   בינוני של בערך עשרים קילו, והקריינות אומרת "כלב גדול" במקום לנקוב
   במשקל. ברגע שיש מספר אפשר להחזיר את המשפט המקורי.
3. **זווית שיווק שישית**, גזירת ציפורניים. התנוחה שבה הכפות באוויר היא
   התנוחה הכי נוחה בעולם לגזור בה ציפורניים, וזו אחת הפעולות שהכי קשה
   לעשות לבד. אין היום שום שדה בקטלוג שתומך בטענה הזאת, ולכן היא לא
   נכתבה. עם מפרט אפשר לבדוק אם היא עומדת.
