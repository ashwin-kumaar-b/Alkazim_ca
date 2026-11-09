# Endloops Website Build — Candidate Submission Note

**Role:** Full-Stack Engineering Intern (UI/UX and Product Design)  
**Project:** Endloops Marketing & Product Website  
**Stack:** React 18, Vite, Tailwind CSS, React Router v6, Framer Motion  

---

### Candidate Submission Note (280 words)

For this assignment, I designed and built a multi-page marketing and product site for Endloops. Coming from Alkazim's audit background in Dubai, Endloops addresses an audience that values audit rigor, regulatory compliance, and accuracy above flashy aesthetics. Rather than presenting abstract promises, I decided to build a concrete product experience centered on the core philosophy: *"the software prepares the work, and the professional reviews and decides."*

My most important design decision was structuring the information architecture around a clean mental model that distinguishes **End-to-End Solutions** (complete lifecycle software for audits, escrow, and budgeting) from **Standalone Tools** (plug-and-play precision tools like PO extraction, vouching, and reconciliation). In both the hero document-pipeline simulation and the interactive workbenches, I ensured the software's automated checks lead to a prominent, mandatory human sign-off step. This visually reinforces that liability and judgement remain with certified practitioners.

Visually, I anchored the palette to the supplied emerald and deep navy tones extracted directly from the logo, pairing *Plus Jakarta Sans* for editorial authority with tabular *JetBrains Mono* for financial schedules. Every component was developed mobile-first, ensuring complex multi-column audit tables stack gracefully at 360px and 768px with zero horizontal scrolling. Animations animate only `transform` and `opacity` and respect `prefers-reduced-motion`.

With more time, I would build an in-browser PDF upload simulator where visitors could drop their own scanned receipts or bank statements to see real-time OCR bounding boxes and export ready-made `.xlsx` lead schedules. I utilized Vite, React, Tailwind CSS, and Framer Motion, leveraging an AI agent in Antigravity for architectural scaffolding and data modeling. The total design, implementation, and refinement took approximately 4.5 hours.
