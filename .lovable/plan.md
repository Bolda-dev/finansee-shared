## הבעיה

עמוד `/design-system` הנוכחי נכתב מהזיכרון — הוא משערך ערכים (Ink, Muted, Hairline וכו׳) שלא תמיד תואמים את מה שבאמת רץ באפליקציה. לדוגמה: `PensionProductPage` משתמש בפלטה משלו (`hsl(178, 80%, 14%)` deep, `hsl(200, 30%, 10%)` ink, `hsl(180, 18%, 90%)` hairline) שלא קיימת כלל בעמוד ה־DS. כך גם ה־hero gradients, ה־section card עם פס עליון בצבע ה־accent, kpi tiles עם רקע mint, ו־CTA pill לבן עם דנה שיושב על ה־hero.

## גישה

לפני שנכתוב מחדש את עמוד ה־DS, נעשה **אודיט מדויק** של כל עמוד באפליקציה ונרשום אילו ערכים בפועל בשימוש. רק אז נבנה את העמוד כך שכל דוגמה היא העתקת markup מילולית מהמקור — בלי לעגל ובלי להמציא טוקנים.

## שלב 1 — אודיט (קריאה בלבד, ללא שינויים)

מעבר על העמודים הבאים והפקת מיפוי:

- `IndexC` (בית)
- `AssetsPageC`, `LiabilitiesPageC`, `InsurancePageC` (wrappers של CategoryPageC)
- `CategoryPageC` (הקומפוננטה המשותפת)
- `PensionCategoryPage`, `PensionProductPage`
- `HealthInsurancePage`, `MortgageInvestmentPage`
- `StickyHeader`, `ChatBot`, `DanaPensionChat`, `DanaTeaserBubbles`, `InsightsSheetC`, `MenuDrawer`

לכל עמוד נרשום:
1. ערכי gradient של ה־hero
2. צבעי accent / accentBg / accentText (לפי קטגוריה)
3. ערכי hairline / surface / ink / muted בשימוש
4. ערכי shadow מדויקים (card / floating summary / chat bar / sticky)
5. כל pill / chip / badge ייחודי
6. radii בשימוש (xl / 2xl / 3xl / full)
7. גדלי טקסט מדויקים, כולל ה־`.5` (`10.5`, `11.5`, `12.5`)
8. וריאציות של Dana row / Dana FAB / Insights card

## שלב 2 — בניית עמוד DS מדויק

מבנה (RTL, מובייל 390px):

1. **Header פנימי** — חזרה הביתה, כותרת "Design System".
2. **Palettes per category** — לא פלטה אחת כללית. ארבע פלטות נפרדות זו לצד זו: Insurance (Purple), Assets (Blue/Teal לפי המקור), Liabilities, Pension (Teal של `PensionProductPage`). כל פלטה מציגה את הערכים האמיתיים שמופיעים בקוד עם תווית של היכן הם בשימוש.
3. **Neutrals** — הצגה של כל הניטרליים שמופיעים בפועל (`hsl(250, 50%, 12%)`, `hsl(230, 15%, 55%)`, `hsl(230, 20%, 92%)`, `hsl(230, 20%, 94%)`, `hsl(235, 30%, 97%)`, `hsl(180, 18%, 90%)`, `hsl(200, 30%, 10%)`, `hsl(200, 12%, 48%)`) עם תווית "איפה".
4. **Typography** — סקאלה מלאה כולל ה־`.5`: `36 / 20 / 15 / 14 / 13 / 12.5 / 12 / 11.5 / 11 / 10.5 / 10 / 9`, כל אחד מציין את ה־weight וה־use-case האמיתי (Hero KPI, Floating summary KPI, Header title, Card title, Detail amount, Subtitle, Microlabel וכו׳).
5. **Radii & Shadows** — רק הערכים שבאמת רצים: `rounded-xl / 2xl / 3xl / full`; shadows: card (`0 3px 14px hsla(250, 30%, 25%, 0.05)`), pension card (`0 1px 2px hsla(178, 70%, 14%, 0.04)`), floating summary purple (`0 14px 36px hsla(262, 70%, 12%, 0.20)`), floating summary teal (`0 14px 36px hsla(178, 70%, 12%, 0.18)`), chat bar (`0 8px 32px ... + 0 2px 8px ...`), sticky (`0 -8px 28px sheetShadow`).
6. **Hero blocks** — שתי וריאציות אמיתיות:
   - Main category hero (gradient + KPI + secondary pills + Dana pill CTA לבן)
   - PensionProduct floating summary card (יושב חצי על ה־hero, פס עליון teal)
7. **Sticky header** — דוגמה מ־`StickyHeader.tsx` בדיוק.
8. **Cards**:
   - Category list card (מ־`CategoryPageC`) כולל badge אדום, status missing, trailing amount
   - Expanded list card (עם details rows)
   - Pension product card (`PensionProductPage` — recommendation row, KPI tiles עם רקע mint, performance bar, fee row)
   - Section card עם פס עליון solid (3px) בצבע ה־accent
   - Empty state card
9. **Filter chips** — Active שחור/לבן, Inactive לבן עם border אפור — מ־`CategoryPageC`.
10. **Pills & Badges**:
    - Amount pill teal (`+₪/ח`)
    - Counter pill teal (`Layers + X מוצרים`)
    - Status "חסר" אדום
    - Secondary KPI pill על gradient (שקוף לבן)
    - Status dot ירוק (פעיל) עם halo
    - Red `!` badge על אייקון
    - Red badge עם מספר על אווטאר דנה
11. **Buttons & Actions**:
    - Back circle על hero (שקוף לבן עם blur)
    - Back circle על רקע לבן (אפור)
    - Action grid 4 (`PensionProductPage`)
    - Dana pill CTA לבן עם tri-ring
    - CTA `.cta-tri-c` עגול עם Send icon
12. **Chat elements**:
    - Bottom chat bar FAB (markup מדויק מ־`PensionProductPage` / `CategoryPageC`)
    - Dana insights row in-page (`PensionProductPage`)
    - Dana proactive bubble (מ־`DanaTeaserBubbles`)
    - Insights sheet card (מ־`InsightsSheetC`)
    - ChatBot row (מ־`ChatBot`)
13. **Drag handle** של ה־white sheet.

לכל פריט: תווית קצרה של איפה הוא בשימוש (`CategoryPageC · trailing pill`, `PensionProductPage · KPI tile` וכד׳).

## עקרונות

- כל snippet מועתק 1:1 מהקובץ המקורי, כולל ערכי `.5` בגדלי טקסט.
- אין יצירת טוקנים חדשים, אין `<Pill>` או `<Hero>` חדשים.
- אם אותו אלמנט מופיע בשתי וריאציות בקוד (למשל card shadow purple מול teal) — מציגים את שתי הוריאציות בנפרד, לא ממוצע ביניהן.
- צבעי הקטגוריות נשארים נפרדים (purple לביטוח, teal לפנסיה וכו׳).

## מה לא נעשה

- לא נוגעים בקבצי העמודים עצמם — רק קוראים.
- לא מוסיפים semantic tokens ל־`index.css`.
- לא מקשרים את `/design-system` מהמשתמש (נשאר פנימי).
