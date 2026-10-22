# חמש עשרה התמונות · פרומפטים

## לפני הכל: מה מותר לייצר ומה לא

תמונה היא טענה בדיוק כמו משפט. ההבדל בין השלוש קבוצות כאן הוא לא סגנוני,
הוא משפטי.

**תמונה שלא מציגה את המוצר** לא טוענת עליו כלום. כלב על רקע לבן בסקשן
הגדלים הוא איור, לא הבטחה.

**תמונה שמציגה את המוצר** אומרת ללקוח "ככה זה ייראה כשתפתח את הקופסה".
אם AI יצייר פתחים מרופדים והם לא מרופדים, או לבנדר בהיר והוא יוצא סגול
כהה, זאת הטעיה. והיא גרועה פי כמה מהטעיה בטקסט, כי אי אפשר להתווכח עם
תמונה והלקוח כבר שילם.

לכן:

| קבוצה | ייצור AI | למה |
|---|---|---|
| ארבע תמונות הגדלים | **כן, חופשי** | חיות בלבד, בלי מוצר |
| שלוש "איך זה עובד" + הירו | **רק image to image** | מצרפים את התמונה האמיתית כרפרנס |
| ארבעה תקריבים + ארבעה צבעים | **לא. לבקש מוורנה** | אלה טענות על המוצר עצמו |

לוורנה יש את שמונה האלה. לכל ספק יש תיקיית מדיה.

---

## קבוצה א: ארבע תמונות הגדלים

ייצור חופשי. הן לא מציגות את המוצר בכלל.

**חשוב שארבעתן ייראו כמו סדרה אחת.** אותו רקע, אותה תאורה, אותו גובה
מצלמה, אותה פוזה. תייצר את כולן באותו צ'אט ברצף, ואם אפשר תבקש להשתמש
באותו seed.

**כל ארבעת הכלבים מתחת ל־25 קילו.** זה לא קוסמטי: המוצר נושא 25 קילו,
והתמונות האלה הן מה שהלקוח מסתכל עליו כשהוא שואל "הכלב שלי נכנס לזה".

### 1. קטנים
```
A Pomeranian dog sitting facing the camera, full body visible, alert and
calm expression, fluffy cream and orange coat, on a pure white seamless
studio background, soft even diffused lighting from the front, no shadows
on the background, slight natural shadow directly under the paws, shot at
the dog's eye level with a 85mm lens, sharp focus, photorealistic, square
1:1 composition with the dog centred and generous white space around it.
```

### 2. בינוניים
```
A French Bulldog sitting facing the camera, full body visible, alert and
calm expression, fawn coat with dark mask, on a pure white seamless studio
background, soft even diffused lighting from the front, no shadows on the
background, slight natural shadow directly under the paws, shot at the
dog's eye level with a 85mm lens, sharp focus, photorealistic, square 1:1
composition with the dog centred and generous white space around it.
```

### 3. גדולים
```
A Border Collie sitting facing the camera, full body visible, alert and
calm expression, black and white coat, on a pure white seamless studio
background, soft even diffused lighting from the front, no shadows on the
background, slight natural shadow directly under the paws, shot at the
dog's eye level with a 85mm lens, sharp focus, photorealistic, square 1:1
composition with the dog centred and generous white space around it.
```

**למה בורדר קולי ולא גולדן.** גולדן בוגר שוקל 25 עד 34 קילו ולברדור 25 עד
36. שניהם מעל הגבול או עליו. בורדר קולי שוקל 14 עד 20, נראה ככלב גדול,
ונמצא בבטחה בתוך מה שהמוצר נושא. **אל תחליף אותו בגולדן כי הוא יותר יפה.**

### 4. חתולים
```
A British Shorthair cat sitting facing the camera, full body visible, calm
expression, blue grey and white coat, on a pure white seamless studio
background, soft even diffused lighting from the front, no shadows on the
background, slight natural shadow directly under the paws, shot at the
cat's eye level with a 85mm lens, sharp focus, photorealistic, square 1:1
composition with the cat centred and generous white space around it.
```

**הכיתובים שיופיעו מתחת:** כלבים קטנים · כלבים בינוניים · כלבים גדולים עד
25 קילו · חתולים.

השורה השלישית חייבת לכלול את המספר. בלעדיו הסקשן אומר למישהו עם גולדן של
30 קילו שהמוצר בשבילו.

---

## קבוצה ב: שלוש "איך זה עובד" והירו

**לכל אחת מארבע אלה תצרף את תמונת המוצר האמיתית שלך לצ'אט ותבקש
image to image, לא טקסט לתמונה.** אחרת המודל ימציא מוצר אחר: רגליים
בצורה אחרת, מספר פתחים אחר, בד אחר.

תיאור המוצר שצריך להופיע בכל פרומפט, כדי שהמודל לא יסטה:

> a folding pet grooming hammock: a stainless steel X shaped folding frame
> with white rubber feet, a taut purple mesh fabric panel stretched between
> two horizontal bars, four oval openings in the mesh with black reinforced
> rims, two black fastening straps across the panel

### שלב 1: פותחים
```
Use the attached product photo as the exact reference for the product.
Show the same folding pet grooming hammock standing fully opened and empty
on a light oak wood floor in a bright minimal Scandinavian room, soft
natural daylight from a window on the left, pale neutral wall behind,
nothing else in frame, no animal, no hands. Photorealistic, shot slightly
above the product at a three quarter angle, 50mm lens, shallow depth of
field with the background softly blurred, square 1:1 composition with the
product centred.
```

### שלב 2: מכניסים את החיה
```
Use the attached product photo as the exact reference for the product.
Show a calm adult Cocker Spaniel resting on the same grooming hammock,
with its four legs passing down THROUGH the four oval openings in the mesh
so the paws hang below the fabric and the dog's body is supported by the
wide mesh panel. The dog is relaxed, not distressed. Same light oak floor
and bright minimal room, soft natural daylight from the left.
Photorealistic, side three quarter view at the dog's chest height, 50mm
lens, square 1:1 composition.
```

**זה השלב הכי חשוב בסדרה ואת זה הכי קשה למודלים לצייר.** הם ממשיכים לצייר
כלב שעומד *על* המשטח. אם התוצאה מראה כלב עומד למעלה, תכתוב בתיקון:
"the legs go down through the holes, the paws are below the fabric and in
the air, the dog's belly rests on the mesh, like a sling".

### שלב 3: מטפחים בשתי ידיים
```
Use the attached product photo as the exact reference for the product.
Close framing on the same Cocker Spaniel resting on the grooming hammock
with its legs through the openings, while two human hands groom it: one
hand parting the fur, the other drawing a slicker brush along the back.
Only the hands and forearms are visible, no face. Same light oak floor and
bright minimal room, soft natural daylight from the left. Photorealistic,
50mm lens, square 1:1 composition.
```

### הירו החדש
```
Use the attached product photo as the exact reference for the product.
A calm adult Cocker Spaniel resting on the same grooming hammock with its
four legs through the openings and paws hanging below the mesh, while two
human hands brush its back. Bright minimal Scandinavian living room, light
oak floor, a few green plants softly blurred behind, warm natural daylight.
Only hands and forearms visible, no face. Photorealistic, eye level, 35mm
lens, horizontal 4:3 composition with space around the product.
```

**למה ההירו חייב להתחלף.** הכלב בתמונה הראשית שלך היום הוא גולדן רטריבר,
25 עד 34 קילו. התמונה הראשונה שכל מבקר רואה מבטיחה לו בדיוק את מה שהמוצר
לא יכול לעשות.

---

## קבוצה ג: שמונה שלא לייצר

**ארבעה תקריבים ל"פרטים שעושים את ההבדל":** הפתחים מקרוב, מרקם הרשת
מקרוב, חיבור הרגל המתכתי מקרוב, המתקן מקופל.

**ארבע תמונות צבע:** שחור, תכלת, לבנדר, בז' חול. אותה זווית בדיוק, אותו
רקע בדיוק, רק הצבע משתנה.

אלה שמונה טענות על המוצר: שהפתחים מרופדים, שהרשת כזאת, שהחיבור ממתכת
מסוימת, ושהלבנדר נראה ככה. **את שמונה אלה תבקש מוורנה בהודעה אחת.**

> Hi Verna, could you send me your full media folder for this product?
> Specifically: close ups of the leg openings, the mesh fabric texture, the
> metal frame joints, and the product folded for storage. Plus one photo of
> each colour you supply, all shot from the same angle on the same
> background. And the video, if you have one.

---

## כשהתמונות מוכנות

מעלים ל־Shopify תחת המוצר, **ולכל תמונה כותבים משפט אחד בעברית בשדה
ה־alt.** המשפט הזה הופך אוטומטית לכיתוב מתחת לתמונה בסקשן "פרטים שעושים
את ההבדל", והוא גם מה שקורא מסך מקריא ומה שגוגל קורא.

סדר ההעלאה קובע מה נכנס לאן, אז תשלח לי את הרשימה בסדר שהעלית ואני
מכוון את הסקשנים.
