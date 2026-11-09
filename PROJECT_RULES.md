# Endloops Project Guidelines & Rules

## Brand & Aesthetic
- Premium, calm, refined, trustworthy, never flashy or gimmick-driven.
- Color palette: White canvas (#FFFFFF, #F8FAFC), Green (#0AAE67), Teal (#118379), Dark Navy (#1D2731) for text, with Blue (#2563EB) and Purple (#7C3AED) accents.
- Logo rules:
  - Use the logo file exactly as supplied (`/endloops-logo.png`).
  - Never recolour, redraw, invert or stretch it.
  - Only place on pure white or very light neutral backgrounds.
  - Set explicit width and height (`width={140}` `height={40}` or similar proportional dimensions).
  - Explicit alt text: `alt="Endloops"`.

## Copy & Messaging
- Absolutely no lorem ipsum.
- Use only realistic, domain-specific financial copy for GCC accounting, auditing, and property finance teams.
- Core philosophy: "The software prepares the work, and the professional reviews and decides. We take care of the repetitive tasks, and the final sign-off always stays with people."
- Clear distinction between:
  1. End-to-end Solutions (Budget review, Escrow audit, Financial audit, Interim audit, Budget preparation for property management).
  2. Standalone Tools (Purchase-order extraction, Vouching automation, Expense working automation, Financial report review, Tender verification, Reconciliation).

## Motion & Animation
- Animate ONLY `transform` (scale, translate) and `opacity`. No layout-triggering properties (width, height, top, margin).
- Respect `prefers-reduced-motion` with static fallbacks.
- Motion must be purposeful and explain financial mechanics (e.g., invoices matching to ledgers, duplicate detection, variance flagging).

## Accessibility (A11y) & Usability
- Text contrast must meet WCAG AA (minimum 4.5:1 for body text, 3:1 for large headers).
- Every interactive element must be keyboard operable with visible focus ring (`focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none`).
- Semantic HTML (`<main>`, `<header>`, `<nav>`, `<footer>`, `<section>`, `<article>`).

## Responsive & Code Architecture
- Design for desktop (1280px) as primary experience.
- Mobile-first breakpoints (`base`, `md:`, `lg:`, `xl:`).
- Simplified, stacked layout at 360px and 768px with no horizontal scroll.
- Small, readable components: no file over ~200 lines.
- Do not add third-party libraries without asking.
