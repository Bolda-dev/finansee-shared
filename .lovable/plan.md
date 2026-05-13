## AhaDashboard updates

### 1. Per-color "חיבור לנתונים" button in top 3 cards
Each of the 3 locked cards (נכסים / התחייבויות / ביטוח) gets a colored connect button matching its IndexC gradient family:
- נכסים → teal `linear-gradient(135deg, hsl(178, 70%, 32%), hsl(174, 65%, 42%), hsl(170, 70%, 56%))`
- התחייבויות → blue `linear-gradient(135deg, hsl(220, 85%, 48%), hsl(225, 90%, 60%), hsl(215, 95%, 75%))`
- ביטוח → purple `linear-gradient(135deg, hsl(258, 72%, 55%), hsl(265, 78%, 65%), hsl(275, 85%, 78%))`

Card itself stays dashed/empty look; only the button gets the brand gradient + white text. Add subtle colored shadow per card.

### 2. New "מרכז פיננסי" section
Below the 3 hero cards, add a section titled `מרכז פיננסי` with 4 locked sub-cards in a 2-col grid (mirroring IndexC's financial center style but empty):
1. פנסיה (PiggyBank, assets/teal)
2. השקעות (LineChart, assets/teal)
3. הלוואות (Briefcase, liabilities/blue)
4. משכנתא (Building2, liabilities/blue)

Each card:
- White bg, soft border, dashed value placeholder `—`
- Small label + sub-label ("ללא נתונים")
- **Secondary** connect button: outline / ghost style with category-color text + thin colored border (so they don't compete visually with the top 3 primary buttons). Text: `+ חיבור לנתונים`

### 3. Replace bottom CTA with Dana floating chatbot
Remove the sticky bottom "גלה את השווי האמיתי שלי" CTA. Add `<ChatBot>` component (centered variant — same as IndexC) with state `chatOpen`. Avatar FAB floats at bottom center, opens the existing chat sheet.

The hero range + Dana callout card at top remain unchanged. The "discover real value" goal is now served by the connect buttons on each card (which navigate to `/c` or stay in place — confirm below).

### Technical notes
- File: `src/pages/AhaDashboard.tsx` only
- Reuse `ChatBot` from `@/components/ChatBot` with `variant="centered"`
- Add `pb-28` instead of `pb-32` since CTA is gone but FAB still needs clearance
- Remove `ctaRef` / `scrollToCta`; primary card buttons navigate to `/c` (the empty dashboard) so user starts connecting data there

### Open question
The card "חיבור לנתונים" buttons — should they navigate to `/c` (empty dashboard, where user keeps adding data), or to the specific category page (`/c/assets`, `/c/liabilities`, `/c/insurance`)? Default to category-specific routes for primary cards, and `/c` for the secondary financial-center cards.