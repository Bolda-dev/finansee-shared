## סגנון חיים — גרסה חדשה

יצירת ורסיה חדשה /life שהיא קלון מלא של "סגנון סולידי" (גרסה C), עם פלטה חדשה בלבד. סגנון C נשאר ללא שינוי.

## פלטת הצבעים החדשה

מהתמונה שצורפה:
- **Lime** `#D4F95F` → נכסים + CTA ראשי
- **Black** `#0A0A0A` → התחייבויות
- **Royal Purple** `#5747E5` → ביטוח
- **Off-white** `#FAFAFA` → רקע

ייצוג HSL:
- Lime: `hsl(75, 93%, 67%)` (אקסנט) · darker `hsl(75, 80%, 50%)` · lighter `hsl(70, 95%, 80%)` — **טקסט שחור על רקע ליים תמיד**
- Black: `hsl(0, 0%, 4%)` · graphite `hsl(0, 0%, 18%)` · soft `hsl(0, 0%, 35%)` — טקסט לבן
- Purple: `hsl(245, 76%, 59%)` · darker `hsl(245, 70%, 45%)` · lighter `hsl(248, 90%, 78%)` — טקסט לבן

גרדיינטים יבנו על אותה תבנית של Version C (135deg/160deg, dark→base→light), כמו B/C כיום.

## מה ייווצר

### קבצים חדשים
1. `src/pages/IndexLife.tsx` — קלון של `IndexC.tsx`, רק עם החלפת הגרדיינטים והאקסנטים של 3 הקטגוריות + שינויי כפתור צ'אט (Send button) ל-CTA לימוני.
2. `src/pages/AssetsPageLife.tsx` — קלון של `AssetsPageC.tsx`, theme בליים + `accentText` שחור.
3. `src/pages/LiabilitiesPageLife.tsx` — קלון של `LiabilitiesPageC.tsx`, theme בשחור.
4. `src/pages/InsurancePageLife.tsx` — קלון של `InsurancePageC.tsx`, theme בסגול.
5. `src/components/InsightsSheetLife.tsx` — קלון של `InsightsSheetC.tsx` עם:
   - הצבעים של 3 הטאבים (assets/liabilities/insurance) → ליים/שחור/סגול
   - Send button + שליחה צ'יפסים → CTA לימוני עם טקסט שחור
   - כל מה ש"דנה" מציגה כצבע אקסנט יותאם

### עדכונים לקבצים קיימים
6. `src/index.css` — להוסיף `.cta-tri-life` ו-`.tri-ring-life`:
   - **CTA**: רקע מלא `hsl(75, 93%, 67%)` (Lime) + טקסט שחור (`hsl(0,0%,8%)`). הילה רכה בליים סביב.
   - **Tri-ring**: conic-gradient lime → black → purple → lime, מסתובב.
   - שונה במפורש מ-`cta-tri-c` כדי שהאייקון של ה-Send יהיה שחור על ליים, לא לבן.
7. `src/App.tsx` — רישום הראוטים: `/life`, `/life/assets`, `/life/liabilities`, `/life/insurance`, `/life/income`, `/life/expenses` (האחרונים יוכלו להשתמש בקומפוננטות הקיימות; אם רוצים CTA לימוני שם — נשתמש ב-`cta-tri-life` במקום הליבה הקיימת — אעשה את זה כקלון קצר).
8. `src/components/MenuDrawer.tsx`:
   - הוספת `isVersionLife` (`/life` prefix).
   - הוספת קישור "סגנון חיים" באזור "סגנונות" (מתחת ל"סגנון סולידי").
   - אותם 3 טוגלים שיש בסולידי (boldCards / centerBar / innerGrid) יוצגו גם כש-isVersionLife.
   - הסרת "גרסה C" מהכותרת כבר נעשתה — נמשיך באותו סגנון.

## פרטים טכניים — איך הצבעים מתחלפים

### Index (כרטיסי קטגוריה)
ב-`IndexLife.tsx`, הבלוק של 3 הכרטיסים יחליף:

```ts
// נכסים — Lime (טקסט שחור!)
gradient: "linear-gradient(135deg, hsl(75, 80%, 50%) 0%, hsl(75, 93%, 62%) 55%, hsl(70, 95%, 80%) 100%)"
iconColor: "hsl(0, 0%, 8%)"     // אייקון שחור על ליים
textColorBold: "hsl(0, 0%, 8%)"  // override של הטקסט הלבן הרגיל

// התחייבויות — Black
gradient: "linear-gradient(135deg, hsl(0, 0%, 4%) 0%, hsl(0, 0%, 18%) 55%, hsl(0, 0%, 35%) 100%)"
iconColor: "hsl(0, 0%, 8%)"     // עיגול לבן עם אייקון שחור
// טקסט לבן (default)

// ביטוח — Purple
gradient: "linear-gradient(135deg, hsl(245, 70%, 45%) 0%, hsl(245, 76%, 59%) 55%, hsl(248, 90%, 78%) 100%)"
iconColor: "hsl(245, 76%, 50%)"
```

הלוגיקה הנוכחית של `boldCards` נשענת על `color: white` קבוע — נוסיף `textOnBold` לכל card object ונשתמש בו.

### CategoryPage themes (עמודים פנימיים)
- **AssetsPageLife**: `accentText: "hsl(0, 0%, 8%)"` כדי שהטקסט בכותרות שחור על רקע ליים.
- **LiabilitiesPageLife**: `accentText: "hsl(0, 0%, 95%)"` (לבן).
- **InsurancePageLife**: `accentText: "hsl(0, 0%, 100%)"` (לבן).

נצטרך לוודא ש-`CategoryPageC` משתמש ב-`theme.accentText` בכל המקומות הקריטיים על הגרדיינט. אם יש מקומות עם `color: white` קשיח שיוצר בעיה על ליים — נחליף ל-`theme.accentText`. (אבדוק במהלך מימוש; אם נדרש אעדכן `CategoryPageC` להוסיף תמיכה — אך מבלי לשבור את C/Manual הקיימים, ע"י default = white.)

### CTA לימוני (כפתורי שליחה / צ'יפסים / כפתורי עם בדנה)
- כפתור Send בצ'אט הראשי: `cta-tri-life` עם אייקון `Send` בצבע `hsl(0, 0%, 8%)`.
- כפתור Plus (income/expenses/insurance): `cta-tri-life` + אייקון שחור.
- צ'יפסים מוצעים ב-`InsightsSheetLife`: רקע ליים + טקסט שחור (`hsl(75, 93%, 67%)` / `hsl(0,0%,8%)`).
- כפתורי "פעולה" שדנה מציגה (CTA buttons בכרטיסים): רקע ליים + טקסט שחור.

### Tri-ring סביב אווטאר דנה
`tri-ring-life` עם conic gradient: lime → black → purple → lime. מסתובב באותה אנימציית `cta-rotate` קיימת.

## דברים שלא משתנים
- כל הלוגיקה / state / data / routes הקיימים של C ו-Manual.
- Index, IndexB, IndexC, IndexD, IndexManual ללא שינוי.
- CategoryPageC נשאר משותף — רק נוודא שהוא מכבד `theme.accentText` במקומות הנכונים (תיקון תואם לאחור אם יידרש).

## תפריט
ב-`MenuDrawer`, באזור "סגנונות":
```
סגנון סולידי         → /c
סגנון חיים           → /life      (חדש)
─────────────────────
סגנונות בארכיון ▾
   גרסה B            → /b
   גרסה D            → /d
```

## QA אחרי המימוש
- לוודא קונטרסט שחור-על-ליים בכרטיס נכסים (גם בכותרת bold וגם ב-subLabel).
- לוודא שלכפתור Send לימוני יש אייקון Send שחור (לא לבן).
- לוודא שב-InsightsSheetLife הטאב "נכסים" כשפעיל מציג טקסט שחור על ליים, לא לבן.
