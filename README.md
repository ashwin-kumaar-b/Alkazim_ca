# Endloops — Financial Automation for GCC Accounting & Audit Practices

A marketing and product website for **Endloops**, engineered for accountants, auditors, finance teams, and property management companies across the GCC region.

Spun out of **Alkazim**, an accounting and audit practice in Dubai, Endloops embodies a foundational philosophy:
> *"The software prepares the work, and the professional reviews and decides. We take care of repetitive tasks, and the final sign-off always stays with people."*

---

## Architecture & Technology Stack

- **Framework:** React 18 + Vite 6
- **Routing:** React Router v6 (Multi-page routing with auto-scroll restoration)
- **Styling & Design Tokens:** Tailwind CSS v3 with customized design tokens (`src/tokens.js`) eyedropped from the supplied brand logo
- **Typography:** Plus Jakarta Sans (Headings), Inter (Body UI), JetBrains Mono (Tabular Financial Data)
- **Animation & Motion:** Framer Motion (strict `transform` and `opacity` only; respects `prefers-reduced-motion`)
- **Accessibility:** WCAG AA compliant contrast, universal visible focus rings, full keyboard navigability

---

## Key Features & Pages

1. **Home (`/`)**
   - **Hero Section:** Value proposition and live animated **Document Pipeline** demonstrating 3 incoming vouchers, OCR extraction, duplicate detection, and auditor sign-off.
   - **Solutions vs. Tools Switcher:** Dynamic mental model segmenting End-to-End Solutions from Standalone Tools.
   - **Scroll-Driven "How It Works":** 4-stage pipeline (Ingest → Match → Check Rules → Draft Schedules).
   - **Interactive PO & Invoice Extractor Testbench:** Live simulation evaluating UAE VAT arithmetic and flagging duplicate vouchers.

2. **End-to-End Solutions (`/solutions`)**
   - Detailed coverage of all 5 full-workflow systems: *Budget Review*, *Escrow Audit* (RERA compliant), *Financial Audit*, *Interim Audit*, and *Budget Preparation for Property Management*.

3. **Standalone Tools (`/tools`)**
   - Interactive workbench for single-purpose tools: *Purchase-Order Extraction*, *Vouching Automation*, *Expense Working*, *Financial Report Review*, *Tender Verification*, and *Reconciliation*.
   - Includes live interactive **Ledger & Bank MT940 Reconciliation** demo.

4. **About Endloops (`/about`)**
   - Explains the firm's origin inside Alkazim (Dubai), regional GCC focus, and commitment to human-in-the-loop audit verification.

5. **Contact & Practice Demo (`/contact`)**
   - Accessible inquiry form with client-side corporate email validation, volume selection, and confirmation screen.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# Server will open at http://localhost:3000

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Rules Adherence

- **Logo Integrity:** Exactly as supplied (`/endloops-logo.png`), un-recolored, un-stretched, on light backgrounds, with explicit dimensions.
- **Copy:** 100% realistic GCC financial and audit terminology. Zero lorem ipsum.
- **Component Modularity:** Every component file is strictly under 200 lines.
- **Motion Accessibility:** Only transform/opacity animations with static reduced-motion fallbacks.
- **Mobile-first:** Responsive at 360px, 768px, and 1280px with no horizontal overflow.
