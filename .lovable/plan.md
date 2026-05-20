## Three issues to fix

### 1. Breadcrumb looks weak on both pension pages

Current state: a small white-translucent pill sits next to "חזרה". On the category page it competes with the title; on the product page it floats alone in a thin top strip. It reads as chrome noise rather than navigation.

**New approach — single inline breadcrumb, no pill chrome:**

Replace the pill with a clean text breadcrumb on the same line as back, using subtle weight hierarchy instead of a background chip:

```text
‹ נכסים  ›  פנסיה
```

- `‹` chevron + "נכסים" → muted white (opacity 0.65), clickable, navigates to parent
- `›` separator → opacity 0.40
- "פנסיה" / current page → solid white, bold, non-clickable
- No background, no border, no blur — just typography
- Sits on the right side of the top bar (RTL), exactly where back currently is
- The standalone back button is removed — the `‹ נכסים` portion IS the back affordance
- Tap target stays ≥40px tall via padding

This collapses two elements (back + breadcrumb) into one cohesive control and reads as a real breadcrumb instead of a decorative chip.

### 2. Header consistency — elements "jump" between levels

Root cause: `CategoryPageC` hero uses `px-5 pt-10 pb-12` with top bar inside `mb-5`. `PensionProductPage` hero uses `px-5 pt-5 pb-2` for the top bar, then `pt-6 pb-10` for content. So when you drill in, the back/breadcrumb sits ~20px higher and the title block sits at a different baseline — visual jump.

**Fix:** align the product page hero geometry to `CategoryPageC`:
- Top bar: `px-5 pt-10` (same as parent), bottom margin `mb-5`
- Content block: same horizontal padding `px-5`, same bottom padding `pb-12`
- Breadcrumb sits at identical Y coordinate across all three pages — no jump on navigation

### 3. Product hero is cluttered

Current order: type chip → icon → title → provider → status pill → "צבירה כוללת" label → balance → secondary pill. Seven stacked elements, all centered, all the same visual weight. Eye doesn't know where to land.

**New hierarchy — 3 clear zones:**

```text
┌──────────────────────────────────┐
│  ‹ נכסים › פנסיה                 │  ← top bar (same as parent)
│                                  │
│   [icon]  מנורה מקיפה            │  ← identity row: icon + name + provider
│          מנורה מבטחים · קרן פנסיה│     on ONE row, right-aligned RTL
│                                  │
│         צבירה כוללת              │  ← KPI block (the hero's job)
│         ₪1,247,500               │
│                                  │
│   [● פעיל]  [צפי קצבה ₪8,200/ח] │  ← meta pills row (status + secondary)
└──────────────────────────────────┘
```

Specifically:
- **Identity row**: icon (52×52 rounded tile) on the right, title (18px extrabold) + provider+type subline (12px, opacity 0.80) stacked to its left. Replaces the type chip + centered icon + centered title + centered provider stack. Saves ~80px vertical and creates a strong "this is the product" anchor.
- **KPI block**: stays centered, slightly smaller label, same 40px balance number. This is the single dominant element.
- **Meta pills row**: status pill and secondary KPI pill side-by-side, centered, both in the same translucent-white style. The status pill is no longer floating mid-hero — it's grouped with the other meta info where it belongs.
- Type chip is **removed** from hero (the type is already in the provider subline) — eliminates redundancy.

## Files touched

- `src/pages/CategoryPageC.tsx` — replace back+pill with single inline breadcrumb (when `parentLabel` set); also simplify the no-parent case so back+title alignment is consistent.
- `src/pages/PensionProductPage.tsx` — replace top nav with same breadcrumb component; restructure hero into identity row / KPI / meta pills; align paddings to `px-5 pt-10 pb-12` for cross-page continuity.
- `src/pages/PensionCategoryPage.tsx` — no changes needed (consumes `CategoryPageC`).

## Out of scope

Sheet content, tabs, action card, Dana card, chat bar — all unchanged.
