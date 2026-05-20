## כרטיס ההשוואה החדש בצ׳אט של דנה — "אנליטיקס פרימיום"

### קובץ יחיד שישתנה
`src/components/DanaPensionChat.tsx` — להחליף את הקומפוננטה `CompareCard` (ולמחוק את `MetricRow` שכבר לא בשימוש).

### מבנה הכרטיס החדש (full-width בתוך בועיית הצ׳אט)
1. **Header** — כותרת `השוואת קרנות מורחבת` (17px, extrabold, `C.deep`) + סאב־כותרת קטנה `מבוססת על נתוני שוק עדכניים` (10.5px, `C.muted`). מימין/שמאל אייקון עגול עם `ArrowLeftRight` ברקע `C.mint`.

2. **שני טורים עם עיגול VS באמצע**
   - עיגול קטן (36px) במרכז, רקע לבן + טבעת `hsl(180,25%,98%)`, טקסט `VS` באפור.
   - **טור שמאל — הנוכחית** (`bg hsl(180,12%,97%)`, border `C.hairline`, `rounded-2xl`):
     - לוגו ב־`ProviderLogo size={36}` בתוך עטיפה לבנה.
     - תגית `הנוכחית` באדום עדין + שם הספק.
     - שורה: דמי ניהול (18px extrabold) + bar אדום ברוחב יחסי.
     - שורה: תשואה 3ש׳ (18px extrabold) + bar אפור.
     - שורת `צבירה` עם `formatNIS(product.balance)` בעקבות מפריד.
   - **טור ימין — המומלצת** (`bg hsla(176,55%,91%,0.45)`, border `2px ${C.fresh}`, shadow ירקרק):
     - badge עליון `✨ המלצה חכמה` ברקע `C.fresh`.
     - לוגו של `alternative.provider` באותה עטיפה לבנה.
     - דמי ניהול (`C.fresh`) + תגית הפחתה `−{X}%` (מחושבת מ־`(curr-alt)/curr`).
     - תשואה (`C.deep`) + חץ `↑` ירוק + bar ב־`C.fresh`.
     - שורת `פוטנציאל` עם `formatNIS(savings)`.

3. **רצועת Market Benchmark** — כרטיסון אפור־בהיר עם נקודה כחולה + טקסט `ממוצע השוק` משמאל, ומימין `{marketAvgFromBalance}% דמי ניהול`.

4. **Bottom Power Banner** — רקע גרדיאנט `${C.deep} → ${C.core}`, `rounded-3xl`, עם רקע SVG דק (שני עקומות) בopacity 0.1:
   - מיקרו־כותרת `רווח מצטבר צפוי לפרישה` (uppercase, letter-spacing 0.18em, בהיר־מנטה).
   - מספר ענק `+{formatNIS(savings)}` (32px extrabold, לבן, tabular-nums).
   - chip תחתון `החיסכון המקסימלי האפשרי עבורך` ב־`C.fresh`.

### התאמות לעיצוב הקיים
- צבעים: רק מתוך אובייקט ה־`C` הקיים (`deep/core/fresh/mint/ink/muted/hairline`) — אותו עץ צבעי טורקיז של הצ׳אט.
- פונט/typography: ממשיכים עם פונט המערכת הקיים (Heebo) — לא מוסיפים import חדש.
- הסרת `max-w-[82%]` ו־`mr-9` כדי שהכרטיס יתפוס את כל רוחב אזור הצ׳אט (עדיין יש padding-x של ה־ScrollArea).
- אין button "בואי נתחיל" בתוך הכרטיס — ה־CTAs נשארים ב־`CtaBlock` הקיים מתחת.
- אין שורת זהות "דנה" מעל הכרטיס — היא כבר קיימת ב־header של ה־Sheet.

### חישובים פנימיים
- `currMgmtW = min(95, mgmt/1.5 * 100)`, אותו דבר ל־alt — bar רוחב יחסי על סקאלת 0-1.5%.
- `currRetW = return3y / max(curr,alt) * 100`, אותו דבר ל־alt.
- `mgmtDelta = round((curr − alt) / curr * 100)` ל־badge `−X%`.

### לא נוגעים
שאר הצ׳אט (header, bubbles, typing dots, quick replies, CtaBlock) — אותו דבר. השינוי ממוקד בכרטיס ההשוואה בלבד.
