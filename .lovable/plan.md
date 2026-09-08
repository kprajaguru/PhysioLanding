## Redesign PhysioApp landing page — clipart / 2D illustration style

Inspired by the CoreShift Dribbble shot: sleek modern SaaS layout with bold display type, generous whitespace, soft pastel background blocks, floating 2D illustration/clipart hero (no photography), rounded cards, and playful geometric accents.

### Visual direction

- Replace all photographic imagery with flat 2D clipart illustrations (transparent PNGs). Style: modern flat vector, soft pastel palette, rounded shapes, subtle shadows, friendly clinical vibe (physiotherapist + patient + phone/WhatsApp bubbles).
- Layout inspired by CoreShift: large left-aligned display headline, illustration floating on the right against a tinted rounded panel, small pill-tag above headline, dual CTAs, floating stat card overlay.
- Soft off-white background with pastel accent blocks (mint/teal + warm peach accents), rounded-3xl surfaces, thin borders, subtle drop shadows.
- Keep Space Grotesk (display) + Inter (body). Slightly tighter hero, more generous section padding.

### Illustrations to generate (transparent PNGs, flat 2D clipart)

1. `hero-illustration.png` — Physiotherapist with tablet + patient doing stretch + floating WhatsApp chat bubble + calendar/exercise icons around them.
2. `feature-appointments.png` — Calendar with checkmarks clipart.
3. `feature-assessment.png` — Clipboard + progress chart clipart.
4. `feature-billing.png` — Invoice + card + coin clipart.
5. `feature-exercise.png` — Person stretching + play button clipart.
6. `feature-whatsapp.png` — Phone with WhatsApp chat bubbles clipart.
7. `feature-mobile.png` — Two phones (patient + therapist app) clipart.
8. `whatsapp-scene.png` — Phone mockup with WhatsApp reminder illustration for the USP section.

Old `hero-clinic.jpg` will be deleted.

### Sections (structure preserved, restyled)

1. **Nav** — same links, cleaner pill button.
2. **Hero** — pill tag, big headline, subcopy, dual CTAs, trust row. Right: pastel rounded panel with hero illustration + floating stat card ("94% WhatsApp open rate").
3. **Features grid** — 6 cards on light background (not dark slate anymore, to match sleek pastel aesthetic), each with its own clipart illustration on top, title, description.
4. **WhatsApp USP** — split section with clipart phone illustration on one side, benefits list on the other, soft mint background panel.
5. **Social proof strip** — clinic logos row.
6. **CTA** — centered soft-panel with headline + primary button.
7. **Footer** — unchanged structure.

### Files

- Edit `src/routes/index.tsx` — restructure layout, swap all `<img>` sources to new illustrations, adjust section backgrounds/spacing.
- Edit `src/styles.css` — add pastel accent tokens (soft peach, soft mint surface) if needed; keep existing brand tokens.
- Generate 8 new PNG illustrations under `src/assets/` via image gen (transparent, clipart style).
- Delete `src/assets/hero-clinic.jpg`.

### Verification

- `bun run build` passes.
- Playwright screenshot of `/` at desktop + mobile viewport to confirm illustrations render and layout matches direction.
