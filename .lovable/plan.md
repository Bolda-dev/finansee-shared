## הקשר

הפרוייקט עובד כיום עם ערכי HSL inline בכל קומפוננטה (אין semantic tokens משמעותיים ב־`index.css`). זה גרם לכך שאלמנטים שאמורים להיות זהים — pills, hero, sticky header, צ׳יפסים, כרטיסיות מידע, באבל Dana, יועצת FAB — מקבלים גרסאות מעט שונות בכל עמוד.

ה־deliverable מורכב משני שלבים: קודם יישור קו על מה שכבר קיים, ואז עמוד תיעוד שמראה כל אלמנט פעם אחת מהמקור האמיתי.

## שלב 1 — אודיט ויישור קו

מעבר על כל עמוד ועידכון רק במקומות שבהם אלמנט "כמעט זהה" סוטה. אין יצירת אלמנטים חדשים, רק התלכדות לערך אחד מובחר.

קבוצות שזוהו לטיפול:

1. **Pills סכומים** (כבר עשינו teal אחיד — לוודא שאין כיס שנשאר ירוק/כתום).
2. **Hero של עמודים ראשיים מול פנימיים** — `pt` כבר יושר ל־8. נוודא שגם `min-h` ו־`mb` של ה־top-bar זהים בין `CategoryPageC`, `HealthInsurancePage`, `MortgageInvestmentPage`, `PensionProductPage`, `PensionCategoryPage`.
3. **StickyHeader** — חלק מהעמודים השתמשו ב־`<StickyHeader>` המשותף, וחלק שכפלו את ה־markup ידנית בתוך `CategoryPageC`. נחליף את הגרסה המשוכפלת בקריאה ל־`<StickyHeader>` כדי שיהיה מקור אחד.
4. **כרטיסיות מידע (`SectionCard`)** — בעמודי המוצר/בריאות/משכנתא הוגדרו שלוש פעמים בנפרד עם פס עליון solid. נוודא שכולן זהות בעובי הפס (3px), ב־padding ובמרווח הכותרת.
5. **באבל Dana / Insights row** — קיימת היום ב־`PensionProductPage` וב־`HealthInsurancePage`. נוודא שאותו markup בדיוק (avatar, badge, headline, subtext, chevron) ולא וריאציות.
6. **Filter chips (קטגוריות)** — חוזרים ב־`CategoryPageC`, `PensionCategoryPage`, `PensionProductPage`. נוודא צבעי active/inactive זהים.
7. **Bottom Chat Bar** — מופיע בארבעה עמודים פנימיים. נוודא markup זהה (כבר העתקנו אותו block-by-block; נוודא שאין הבדלים בערכי shadow/border).
8. **כפתורי Back עגולים** ו־**Action buttons רביעייה** — צריכים להיות זהים בכל הופעה.
9. **Typography sizes** — קיים בלאגן בין `10px / 10.5px / 11px / 11.5px / 12px / 12.5px / 13px / 14px / 15px`. נצמצם לסקאלה ברורה: `10 / 11 / 12 / 13 / 14 / 20 / 36`. כל מופע של `.5` יעוגל לערך הקרוב באותו הקשר.

לכל פריט: ניגש לקובץ, נקבע ערך מאסטר, מעדכן את שאר המופעים. בלי refactor רחב — שינויים נקודתיים בלבד.

## שלב 2 — עמוד Design System

route חדש: `/design-system` (לא מקושר מהמשתמש, רק כתיעוד פנימי).

מבנה העמוד (מסך מובייל 390px, RTL, רקע אפור־לבן כמו השאר):

- **Header פשוט** עם כותרת "Design System" וקישור חזור.
- חלוקה לסקציות גלילה (כל סקציה = כותרת + הפריט עצמו כפי שמופיע באפליקציה, לצידו label של איפה הוא בשימוש):

  1. **Typography** — הצגה של כל גודל טקסט בסקאלה הסופית, עם המשקל והצבע שבו הוא רץ באפליקציה.
  2. **Colors** — swatches של גווני המותג (purple core/deep/fresh, teal mint, אדום alert, ירוק success, ניטרליים ink/muted/hairline).
  3. **Spacing / Radii / Shadows** — דוגמיות של ה־radii (`xl`, `2xl`, `full`) ושלושת ה־shadow elevations שבשימוש בפועל.
  4. **Buttons** — Back circle, FAB chat bar (compact), Action buttons grid, Filter chip active/inactive, CTA gradient.
  5. **Pills** — pill teal של סכומים, pill alert אדום ("חסר"), badge עגול אדום עם "!", "X מוצרים" pill.
  6. **Cards** — Category card (כמו ברשימת ההתחייבויות), Pension product card, Section card עם פס עליון solid, Recommendation card, Floating summary card (zaman עליון של עמוד פנימי).
  7. **Hero blocks** — Hero ראשי גרדיאנט עם KPI, Hero מצומצם של עמוד פנימי.
  8. **Chat elements** — Dana FAB row, Dana insights bubble (פתיחה), Dana teaser bubble, Insights sheet card (הכרטיסיה הצבעונית מהבית), ChatBot row.
  9. **Sticky header** — דמו של ההופעה בגלילה.

עקרון מפתח: **כל קומפוננטה מיובאת מהקובץ המקורי שלה**. אם אלמנט כתוב inline בעמוד (למשל ה־Action button grid) — מציגים אותו בעמוד עם ה־markup הקיים, אבל לא יוצרים primitive חדש.

## מה לא נעשה

- לא נחלץ קומפוננטות חדשות (`<Pill>`, `<Hero>` וכו׳) ולא נכניס semantic tokens חדשים ל־CSS. זה ייעשה בשלב נפרד אם תרצה.
- לא נגע ב־`AhaDashboard`, `Signup` ו־`IndexC` — הם לא בזרימה הראשית של עיצוב הכרטיסיות הפיננסיות.
- עמוד ה־DS לא ייחשף מתוך התפריט; הגישה רק דרך הכתובת.
