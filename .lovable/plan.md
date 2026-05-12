## סטייג' 4 — רגע ה-AHA

מסכים אחרי "סיום" של סטייג' 3: מסך טעינה קצר, ואז דשבורד-skeleton (קלון של IndexC) עם נתונים מוסתרים, טווח הערכה, וכפתור CTA לחשיפת השווי האמיתי.

## זרימה

`Signup.tsx` יוסיף שלב 9 (loading) אחרי שלב 8 (goals). לחיצה על "סיום" בשלב 8 מקדמת לשלב 9 ולא רושמת console.log. שלב 9 מציג את ה-Loading למשך 2.6 שניות ואז `navigate("/aha", { state: { firstName } })`.

**Steps עדכניים:** 0,1 welcome | 2 phone | 3 sms | 4 name | 5 age | 6 family | 7 employment | 8 goals | **9 loading**.
- בשלב 9 אין top bar, אין CTA, אין back, אין progress (מסך נקי בהיר).

## 4.1 — LoadingStep

קומפוננטה חדשה `src/components/signup/LoadingStep.tsx`:
- רקע בהיר זהה לסטייג' 2/3.
- במרכז: ספינר עגול עם גרדיינט סמנטי (SVG/CSS conic מסתובב).
- מתחת: טקסט מתחלף כל ~900ms לפי הסדר:
  1. "מחשבים את הפרופיל שלך…"
  2. "משווים לאנשים בגילך…"
  3. "מכינים את ההערכה הראשונית…"
- אנימציית fade קצרה בכל החלפה.
- `useEffect` עם `setTimeout(2600ms)` שמפעיל `onDone` שמועבר מ-`Signup.tsx`.

## 4.2 — דשבורד AHA (`/aha`)

עמוד חדש `src/pages/AhaDashboard.tsx` שמשכפל את המבנה הוויזואלי של IndexC עם השינויים הבאים בלבד:

**ברכה:** "בוקר טוב, {firstName}" — הולך אחר `location.state.firstName` עם fallback ל-userData.name.

**Hero (שווי נטו):** מחליף את המספר הגדול בטווח:
- כותרת: "הערכה ראשונית"
- ערך: "₪450K - ₪1.2M" בגרדיינט סמנטי
- תת-טקסט: "הערכה לפי הפרופיל שלך"
- מסיר את ה-pill +1.8% ואת חותמת הזמן.

**כרטיס Dana callout** (מתחת ל-hero, לפני 3 הכרטיסים הצבעוניים):
- אווטאר דנה (תמונה קיימת `advisor-avatar.jpg`) + בועה לבנה.
- טקסט: "היי {firstName} 👋 אנשים בפרופיל שלך בדרך כלל שווים בין ₪450K ל-₪1.2M. רוצה לראות את השווי האמיתי שלך?"
- עיצוב באותו סגנון של "התובנות של דנה" הקיים — רקע לבן, border עדין, צל רך.

**3 כרטיסים צבעוניים (סגול/כחול/טורקיז):**
- אותו עיצוב bold gradient כמו ב-IndexC, אך:
  - ערך מוחלף ב-`₪ ███` (שלושה blocks אטומים)
  - צלמית lock קטנה (`lucide-react` Lock) פינה עליונה.
  - לא ניווט בלחיצה — onClick יקפיץ ל-CTA למטה (scroll).
- התווית (נכסים/התחייבויות/ביטוח) נשארת.

**מרכז פיננסי (גריד 2 קולונות):**
- מוסתר לחלוטין בגרסה זו (לא רלוונטי לרגע ה-AHA). pb של הקונטיינר נשמר כדי שה-CTA הצף לא יחפה.

**Bottom CTA צף (sticky):**
- בתחתית, רוחב מלא עם padding, מעל ה-bottom-bar.
- כפתור שחור עמוק: "גלה את השווי האמיתי שלי ←"
- onClick: `navigate("/c")` (החזרת המשתמש לדשבורד הראשי כדי להמשיך להזין נתונים).

**Bottom bar / FAB / Menu / Chat:** מוסתרים בגרסה זו. רק header (תפריט + ברכה) + תוכן + CTA.

## Routing

הוספת `/aha` ל-`App.tsx`:
```
<Route path="/aha" element={<AhaDashboard />} />
```

## טכני

- `AhaDashboard.tsx` נכתב מאפס (לא משתף state עם IndexC) ומשתמש באותם tokens/gradients inline כדי לשמר את המראה.
- אין שינוי ב-`IndexC.tsx`, ב-`SignupShell.tsx`, או ב-`data.ts`.
- `firstName` מועבר דרך `useLocation().state` עם fallback בטוח.
- Lock icon מ-`lucide-react`.
- ספינר: SVG עם `circle` ו-`stroke-dasharray` + `animation: spin 1s linear infinite` (CSS inline ב-`style` או class קיימת).