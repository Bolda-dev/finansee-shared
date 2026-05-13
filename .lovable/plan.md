## Replace floating chatbot in AhaDashboard with IndexC bottom chat bar

### Changes to `src/pages/AhaDashboard.tsx`

1. **Remove** `<ChatBot ... variant="centered" />` and its FAB.
2. **Add** the exact same bottom chat bar pattern used in `IndexC.tsx` (lines 525–570):
   - Fixed bottom, max-width 430px, white pill with shadow.
   - Right-side avatar (`advisorImg`) with rotating tri-color ring (`tri-ring-c` class — already global from IndexC styles).
   - Center placeholder text "שאל את Finansee AI".
   - Mic button + Send button (tri-ring CTA) on the left.
   - Click anywhere → opens chat.
3. **Tooltip from the avatar**: a small persistent speech-bubble above the avatar showing  
   "האם ברצונך לחבר כמה נתונים ונראה כמה אנחנו שווים?"  
   - Implemented as an absolutely-positioned bubble anchored to the avatar (not the radix Tooltip, since it should be visible by default to engage the user, like a coach-mark).
   - White bg, soft shadow, rounded-2xl, tail pointing down to avatar, dismissible (small × button) with local `useState` so it hides on tap.
4. **Imports**: add `Mic`, `Send` from lucide-react; replace `ChatBot` import with `InsightsSheet` from `@/components/InsightsSheet` (same as IndexC uses with `mode="context"`).
5. Bottom padding of the page already `pb-28` — keep it so the chat bar doesn't cover content.

No other sections (hero cards, financial center, Dana callout) change.

### Technical notes
- Reuse existing global CSS classes `tri-ring-c` and `cta-tri-c` (defined for IndexC, available globally via `index.css`).
- Tooltip bubble uses inline styles consistent with the rest of the page (`hsl(250, 40%, 15%)` text, white bg, `0 8px 24px hsla(250,30%,25%,0.15)` shadow).
