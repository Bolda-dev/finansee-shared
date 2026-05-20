## תיקון Dana ב־PensionProductPage

### 1. `DanaTeaserBubbles` → tooltip קומפקטי במקום overlay מלא
היום הקומפוננטה מציגה אווטאר + 2 בועיות + כפתור CTA שחור full-width מחוץ לצ׳אט. נחליף ב־tooltip קטן וצמוד (לא overlay), שכל מטרתו: hint + כפתור פתיחה. כל שאר השיחה תקרה בתוך הצ׳אט עצמו.

מבנה חדש:
- `fixed bottom-4 left-4` (RTL: יושב בפינה השמאלית התחתונה), `max-w-[260px]`, `z-40`.
- כניסה: `danaBubbleIn` (כבר קיים) + עוקץ (tail) קטן בפינה התחתונה.
- תוכן יחיד:
  - אווטאר דנה 28px עם נקודה ירוקה.
  - שורה אחת קצרה: `מצאתי לך חיסכון של {formatNIS(savings)} ✨`
  - כפתור קטן `ספרי לי איך →` (לא full-width), `bg: hsl(250, 30%, 8%)`, טקסט לבן, `rounded-full px-3 py-1.5 text-[12px]`.
  - X זעיר בפינה לסגירה (שומר sessionStorage כמו היום).
- רקע: לבן, `border: 1px solid hsl(230, 20%, 92%)`, `boxShadow: 0 8px 24px hsla(250,30%,15%,0.18)`, `rounded-2xl`.
- בלי 2 בועיות נפרדות ובלי slide-up של כפתור CTA נפרד — הכל בתוך bubble אחד מצומצם.
- לחיצה על הכפתור / על הבועייה → `onOpen()` → פותח את ה־`DanaPensionChat`.

### 2. `DanaPensionChat` — להתאים לסגנון של `InsightsSheetC` (דף הבית)
הצ׳אט כיום בעל header עם גרדיאנט טורקיז כהה (`C.deep → C.core`). דף הבית משתמש ב־sheet לבן עם אווטאר מרחף וטבעת מסתובבת. נצמד לאותו visual language:

ב־`src/components/DanaPensionChat.tsx`:
- **רקע ה־SheetContent**: `background: white` (במקום `hsl(180, 25%, 98%)`).
- **Header חדש** (מחליף את הגרדיאנט הטורקיז):
  - אווטאר מרחף במרכז־למעלה עם `tri-ring-c` (אותו class של InsightsSheetC), `top: -32px`, 64px.
  - drag handle (`w-10 h-1.5`, `hsl(230, 15%, 88%)`).
  - שורת כותרת ממורכזת: `דנה — Finansee AI` (`text-sm font-bold`, `color: hsl(250, 45%, 15%)`).
  - כפתור X בפינה השמאלית־עליונה: עיגול ללא רקע, `hover:bg-black/5`, אייקון `hsl(230, 15%, 45%)`.
- **בועיות**: כבר שחור/לבן — להשאיר. רק לוודא שהטיפוגרפיה (`text-[13px]`) ועוקץ הבועייה תואמים בדיוק (כן — תואם).
- **typing dots**: כבר תואם (לבן + dots `hsl(230,15%,65%)`).
- **Quick replies**:
  - "כן, ספרי לי ✨" — נשאר שחור (תואם).
  - הסרגל התחתון: `border-top: 1px solid hsl(230, 20%, 92%)`, `background: white` (כבר ככה — אישור).
- **CtaBlock** — כפתור ראשי "עברו לקרן המומלצת" כבר שחור. לוודא ש"דברו עם דנה" ו"השוואה מפורטת" משתמשים בצבעי נטרליים אפורים/לבנים במקום accent טורקיז, כדי להתאים לפלטה השחור־לבן של הבית.

### 3. `PensionProductPage` — שינוי mount של ה־teaser
- ה־props של `DanaTeaserBubbles` נשארים זהים (`productId`, `savings`, `onOpen`, `onClose`).
- בלי שינויים נוספים בעמוד.

### קבצים שישתנו
- `src/components/DanaTeaserBubbles.tsx` — rewrite ל־tooltip קומפקטי.
- `src/components/DanaPensionChat.tsx` — header חדש בסגנון InsightsSheetC, רקע לבן, ניקוי הצבעים הטורקיזים בכפתורי המשנה ב־CtaBlock.

### לא נוגעים
- `CompareCard` — נשאר כפי שאושר (העיצוב הטורקיז העשיר).
- `InsightsSheetC` — מקור ההשראה, לא משתנה.
