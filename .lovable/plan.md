## תיקונים בצ׳אט של דנה בעמוד הפנסיה

### 1. בועיות הצ׳אט שחור־לבן (זהה לבית — `InsightsSheetC`)
ב־`src/components/DanaPensionChat.tsx`:
- **בועיית משתמש** — רקע כהה `hsl(250, 30%, 8%)`, טקסט לבן, `rounded-2xl rounded-bl-md`, shadow כהה עדין. (במקום לבן עם border היום.)
- **בועיית דנה** — רקע לבן, border `hsl(230, 20%, 92%)`, טקסט `hsl(250, 35%, 25%)`, `rounded-2xl rounded-br-md`, shadow `0 2px 10px hsla(230,30%,50%,0.06)`. אווטאר עגול (28px) מימין/שמאל לבועייה.
- **נקודות "מקליד"** — באותו עיצוב של בועיית דנה (רקע לבן + border), נקודות `hsl(230,15%,65%)` באנימציית `typing-dot`.
- **Quick reply ראשי "כן, ספרי לי"** — רקע שחור־עמוק `hsl(250, 30%, 8%)`, טקסט לבן, shadow כהה. (במקום הגרדיאנט הירוק־טורקיז היום.)
- **"לא תודה"** נשאר לבן עם border — בלי שינוי.
- **"סגור שיחה"** — בלי שינוי.

### 2. הסרת ה־chip "דנה רוצה לדבר איתך" → בועיות teaser מלמטה
ב־`src/pages/PensionProductPage.tsx`:
- להסיר את ה־`<button>` הצהוב־כתום של "דנה רוצה לדבר איתך" (שורות 214–228).
- להסיר את ה־auto-open של ה־Sheet (שורות 131–141) — ה־teaser מחליף אותו.
- להעלות קומפוננטה חדשה `<DanaTeaserBubbles>` בתחתית, שמופיעה רק אם `hasOpportunity === true`.

קובץ חדש `src/components/DanaTeaserBubbles.tsx`:
- `fixed bottom-4 inset-x-4`, `max-w-[430px]` ו־`mx-auto`, z-index גבוה (מעל ה־tabbar אם יש), `dir="rtl"`.
- **אווטאר** דנה עגול 36px עם נקודת online ירוקה.
- **2 בועיות צ׳אט לבנות** שנכנסות עם delay (slide-up + fade-in):
  - בועיה 1 (אחרי ~1.2s): `היי משה 👋`
  - בועיה 2 (אחרי ~2.2s): `מצאתי דרך להרוויח לך ₪487,000 עד הפרישה — רוצה לשמוע?` — סכום ה־savings מועבר ב־prop.
  - סגנון בועיה: רקע לבן, border `hsl(230,20%,92%)`, shadow `0 8px 24px hsla(250,30%,15%,0.12)`, `rounded-2xl rounded-br-md`, טקסט `hsl(250,35%,25%)`.
- **CTA שחור** (אחרי ~2.6s): `bg: hsl(250, 30%, 8%)`, טקסט לבן, full-width, `rounded-full`, py-3, טקסט `ספרי לי איך ✨` — לחיצה מפעילה `onOpen()` שפותחת את ה־`DanaPensionChat` המלא.
- **כפתור X** קטן מעל הבועיות — סוגר את ה־teaser ושומר `sessionStorage.setItem('dana-teaser-${productId}', '1')`.
- Trigger: `useEffect` שמציג את ה־teaser אחרי 1500ms אם אין flag ב־sessionStorage ו־`hasOpportunity`.

ב־`PensionProductPage.tsx`:
- להוסיף state `teaserVisible` ו־`<DanaTeaserBubbles productId={product.id} savings={alt.savings} onOpen={() => { setDanaOpen(true); setTeaserVisible(false); }} onClose={() => setTeaserVisible(false)} />` רק כאשר `hasOpportunity && teaserVisible && !danaOpen`.

### 3. ה־CTA הראשי בתוך הצ׳אט: שחור במקום ירוק
ב־`src/components/DanaPensionChat.tsx`, `CtaBlock`:
- כפתור "⚡ עברו לקרן המומלצת" — להחליף את הגרדיאנט הטורקיז (`C.deep → C.core`) ב־`background: hsl(250, 30%, 8%)`, טקסט לבן, `boxShadow: 0 6px 18px hsla(250, 30%, 15%, 0.35)`.
- "דברו עם דנה" ו־"השוואה מפורטת" — בלי שינוי.

### קבצים שישתנו / יתווספו
- ערוך: `src/components/DanaPensionChat.tsx` (בועיות, dots, quick reply ראשי, CtaBlock ראשי).
- ערוך: `src/pages/PensionProductPage.tsx` (הסרת chip + auto-open, mount של teaser).
- חדש: `src/components/DanaTeaserBubbles.tsx`.

### לא נוגעים
כרטיס ההשוואה (`CompareCard`) — כבר באישור קודם בעיצוב הטורקיז העשיר; לא משנים אותו עכשיו.
