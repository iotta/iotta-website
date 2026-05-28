# iotta Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 6-page static HTML/CSS/JS website in Dutch for iotta, a Dutch IoT company, based on the design spec at `docs/superpowers/specs/2026-05-28-iotta-website-design.md`.

**Architecture:** Six standalone HTML pages share a single `styles.css` and two JS files. Header and footer are loaded from shared `components/` fragments via `fetch()` in `components.js`. No build step; hostable on any static host (Netlify recommended).

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JS (ES2020). Google Fonts: Inter + Syne. Formspree for contact form. No frameworks, no bundler.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Homepage |
| `sensing-as-a-service.html` | Sensing as a Service page |
| `partnering.html` | Partnering page |
| `ai-en-analyse.html` | AI & Analyse page |
| `over-iotta.html` | Over iotta page |
| `contact.html` | Contact page |
| `css/styles.css` | All styles — design tokens, reset, typography, layout, components |
| `js/main.js` | Interactivity: scroll header, hamburger nav, contact form submission |
| `js/components.js` | Fetch and inject header/footer into every page |
| `components/header.html` | Sticky navigation markup |
| `components/footer.html` | Footer markup |
| `assets/logo.svg` | iotta wordmark |
| `assets/hero-illustration.svg` | Homepage hero SVG (building + sensors + cloud) |

---

## Task 1: Project scaffold

**Files:**
- Create: all directories and a base HTML template

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p css js components assets/placeholders docs/superpowers/plans
```

- [ ] **Step 2: Create `assets/logo.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" fill="none">
  <text x="0" y="26" font-family="'Syne', sans-serif" font-weight="800"
        font-size="28" fill="#111827">iotta<tspan fill="#8DC63F">.</tspan></text>
</svg>
```

- [ ] **Step 3: Verify structure**

```
my-website/
├── css/
├── js/
├── components/
└── assets/
    └── placeholders/
```

- [ ] **Step 4: Commit**

```bash
git init
git add .gitignore  # add: .superpowers/, node_modules/
git commit -m "chore: project scaffold for iotta website"
```

---

## Task 2: CSS design system (`css/styles.css`)

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Write `css/styles.css` in full**

```css
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
:root {
  --green:       #8DC63F;
  --green-dark:  #6fa832;
  --black:       #0d0d0d;
  --gray-900:    #111827;
  --gray-600:    #4b5563;
  --gray-400:    #9ca3af;
  --gray-200:    #e5e7eb;
  --gray-100:    #f3f4f6;
  --white:       #ffffff;

  --font-display: 'Syne', sans-serif;
  --font-body:    'Inter', sans-serif;

  --max-width:       1200px;
  --section-v:       80px;
  --section-v-sm:    48px;
  --section-h:       24px;
}

/* ============================================================
   RESET & BASE
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  color: var(--gray-900);
  background: var(--white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img, svg { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* ============================================================
   LAYOUT UTILITIES
   ============================================================ */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--section-h);
}

.section {
  padding: var(--section-v) var(--section-h);
}
.section--dark  { background: var(--black);    color: var(--white); }
.section--gray  { background: var(--gray-100); }
.section--green { background: var(--green);    color: var(--white); }
.section--white { background: var(--white); }

.section-inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-header { text-align: center; margin-bottom: 48px; }
.section-header h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 12px;
}
.section-header p {
  font-size: 1.05rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
}
.section--dark .section-header p { color: var(--gray-400); }

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1, h2, h3, h4 { font-family: var(--font-display); line-height: 1.15; }

.display {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
}
.text-green  { color: var(--green); }
.text-center { text-align: center; }
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  border: 2px solid transparent;
  line-height: 1;
}
.btn-primary {
  background: var(--green);
  color: var(--white);
  border-color: var(--green);
}
.btn-primary:hover, .btn-primary:focus-visible {
  background: var(--green-dark);
  border-color: var(--green-dark);
}
.btn-outline-white {
  background: transparent;
  color: var(--white);
  border-color: var(--white);
}
.btn-outline-white:hover, .btn-outline-white:focus-visible {
  background: var(--white);
  color: var(--black);
}
.btn-outline-dark {
  background: transparent;
  color: var(--gray-900);
  border-color: var(--gray-900);
}
.btn-outline-dark:hover, .btn-outline-dark:focus-visible {
  background: var(--gray-900);
  color: var(--white);
}
.btn:focus-visible { outline: 3px solid var(--green); outline-offset: 3px; }

/* ============================================================
   BADGE
   ============================================================ */
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.badge--green         { background: var(--green); color: var(--white); }
.badge--green-outline { border: 1.5px solid var(--green); color: var(--green); }

/* ============================================================
   HEADER
   ============================================================ */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--white);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.site-header.scrolled {
  border-color: var(--gray-200);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--section-h);
}
.site-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--gray-900);
}
.site-logo .dot { color: var(--green); }

.nav-links {
  display: flex;
  gap: 28px;
}
.nav-links a {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-900);
  transition: color 0.2s;
}
.nav-links a:hover,
.nav-links a.active { color: var(--green); }
.nav-links a:focus-visible { outline: 2px solid var(--green); border-radius: 2px; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--gray-900);
  transition: transform 0.2s, opacity 0.2s;
  border-radius: 2px;
}
.hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.mobile-nav {
  display: none;
  flex-direction: column;
  padding: 8px var(--section-h) 20px;
  border-top: 1px solid var(--gray-200);
  background: var(--white);
}
.mobile-nav.open { display: flex; }
.mobile-nav a {
  padding: 13px 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--gray-900);
  border-bottom: 1px solid var(--gray-100);
}
.mobile-nav a:last-child { border-bottom: none; }
.mobile-nav a:hover { color: var(--green); }

@media (max-width: 768px) {
  .nav-links, .header-cta { display: none; }
  .hamburger { display: flex; }
}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer {
  background: var(--black);
  color: var(--white);
  padding: 56px var(--section-h) 24px;
}
.footer-grid {
  max-width: var(--max-width);
  margin: 0 auto 40px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 48px;
}
.footer-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 6px;
}
.footer-logo .dot { color: var(--green); }
.footer-tagline { font-size: 0.875rem; color: var(--gray-400); }

.footer-nav h4 {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray-400);
  margin-bottom: 16px;
}
.footer-nav li { margin-bottom: 10px; }
.footer-nav a { font-size: 0.875rem; color: #d1d5db; transition: color 0.2s; }
.footer-nav a:hover { color: var(--green); }

.footer-contact p {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 0.875rem;
  color: #d1d5db;
}
.footer-contact svg { flex-shrink: 0; color: var(--green); margin-top: 2px; }
.footer-contact a:hover { color: var(--green); }

.footer-bottom {
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 24px;
  border-top: 1px solid #1f2937;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
}

/* ============================================================
   HERO
   ============================================================ */
.hero {
  background: var(--black);
  color: var(--white);
  min-height: 85vh;
  display: flex;
  align-items: center;
  padding: 80px var(--section-h);
}
.hero-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  width: 100%;
}
.hero-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 16px;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.08;
  margin-bottom: 20px;
  color: var(--white);
}
.hero-subtitle {
  font-size: 1.1rem;
  color: #9ca3af;
  margin-bottom: 32px;
  line-height: 1.7;
  max-width: 480px;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.hero-visual { display: flex; justify-content: center; align-items: center; }
.hero-visual svg { width: 100%; max-width: 480px; }

/* Inner page hero (no illustration) */
.hero--page { min-height: 42vh; }
.hero--page .hero-inner {
  grid-template-columns: 1fr;
  max-width: 800px;
}
.hero--page .hero-title { font-size: clamp(2rem, 4vw, 3.5rem); }

@media (max-width: 768px) {
  .hero { min-height: 70vh; padding: 60px var(--section-h); }
  .hero-inner { grid-template-columns: 1fr; gap: 32px; }
  .hero-visual { display: none; }
}

/* ============================================================
   CARDS GRID
   ============================================================ */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 28px;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
}
.card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.card-icon { margin-bottom: 16px; color: var(--green); }
.card-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 10px;
}
.card-text {
  font-size: 0.875rem;
  color: var(--gray-600);
  line-height: 1.65;
  margin-bottom: 16px;
}
.card-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--green);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.card-link:hover { text-decoration: underline; }
.card-badge { position: absolute; top: 16px; right: 16px; }

@media (max-width: 1024px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .cards-grid { grid-template-columns: 1fr; } }

/* ============================================================
   STEPS ROW (Sensing: "Wat is inbegrepen")
   ============================================================ */
.steps-row {
  display: flex;
  align-items: flex-start;
  gap: 0;
}
.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 12px;
}
.step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: -10px;
  top: 22px;
  color: var(--gray-200);
  font-size: 1.2rem;
}
.step-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #f0f7e8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  margin-bottom: 12px;
}
.step-label { font-size: 0.8rem; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
.step-desc  { font-size: 0.75rem; color: var(--gray-600); line-height: 1.4; }

@media (max-width: 768px) {
  .steps-row { flex-direction: column; gap: 24px; }
  .step { flex-direction: row; text-align: left; gap: 16px; padding: 0; }
  .step:not(:last-child)::after { display: none; }
  .step-icon { flex-shrink: 0; }
}

/* ============================================================
   ZIG-ZAG BLOCKS (Partnering)
   ============================================================ */
.zigzag { display: flex; flex-direction: column; gap: 0; }
.zigzag-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 72px 0;
  border-bottom: 1px solid var(--gray-200);
}
.zigzag-block:last-child { border-bottom: none; }
.zigzag-block.reverse .zigzag-text { order: 2; }
.zigzag-block.reverse .zigzag-visual { order: 1; }

.zigzag-text h3 {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  margin-bottom: 16px;
}
.zigzag-text p { font-size: 1rem; color: var(--gray-600); line-height: 1.75; }

.zigzag-visual {
  background: var(--gray-100);
  border-radius: 10px;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  font-size: 0.8rem;
  /* vervang door: <img src="assets/..." alt="..."> */
}

@media (max-width: 768px) {
  .zigzag-block { grid-template-columns: 1fr; gap: 32px; padding: 48px 0; }
  .zigzag-block.reverse .zigzag-text,
  .zigzag-block.reverse .zigzag-visual { order: unset; }
}

/* ============================================================
   SOCIAL PROOF / LOGO ROW
   ============================================================ */
.logo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 32px;
  justify-content: center;
  align-items: center;
}
.logo-placeholder {
  width: 130px;
  height: 52px;
  background: var(--gray-200);
  border-radius: 4px;
  /* vervang door: <img src="assets/logos/[klant].svg" alt="[Klantnaam]" width="130" height="52"> */
}

/* ============================================================
   TESTIMONIAL
   ============================================================ */
.testimonial { text-align: center; max-width: 760px; margin: 0 auto; }
.testimonial-quote {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.65rem);
  font-weight: 700;
  line-height: 1.5;
  color: var(--white);
  margin-bottom: 24px;
}
.testimonial-quote::before {
  content: '\201C';
  color: var(--green);
  font-size: 3rem;
  line-height: 0;
  vertical-align: -0.4em;
  margin-right: 6px;
}
.testimonial-attrib { font-size: 0.9rem; color: var(--green); font-weight: 600; }

/* ============================================================
   CTA BANNER
   ============================================================ */
.cta-banner { text-align: center; }
.cta-banner h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--white);
}

/* ============================================================
   TEAM CARDS
   ============================================================ */
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 280px);
  gap: 40px;
  justify-content: center;
}
.team-card { text-align: center; }
.team-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--gray-200);
  margin: 0 auto 16px;
  overflow: hidden;
  /* vervang door: <img src="assets/team/[naam].jpg" alt="[Naam]" width="120" height="120"> */
}
.team-name { font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; margin-bottom: 4px; }
.team-role { font-size: 0.875rem; color: var(--gray-600); }

@media (max-width: 640px) { .team-grid { grid-template-columns: 1fr; } }

/* ============================================================
   TIJDLIJN
   ============================================================ */
.timeline { display: flex; position: relative; padding-top: 32px; }
.timeline::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0; right: 0;
  height: 2px;
  background: var(--gray-200);
}
.timeline-item {
  flex: 1;
  text-align: center;
  position: relative;
  padding-top: 16px;
}
.timeline-dot {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--green);
  border: 3px solid var(--white);
  box-shadow: 0 0 0 2px var(--green);
}
.timeline-year  { font-size: 0.8rem; font-weight: 700; color: var(--green); }
.timeline-label { font-size: 0.75rem; color: var(--gray-600); margin-top: 4px; line-height: 1.4; }

@media (max-width: 640px) {
  .timeline { flex-direction: column; gap: 0; padding: 0 0 0 40px; }
  .timeline::before { top: 0; bottom: 0; left: 16px; right: auto; width: 2px; height: auto; }
  .timeline-item { padding: 0 0 28px 20px; text-align: left; }
  .timeline-dot { top: 4px; left: -24px; transform: none; }
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
}
.form-group { margin-bottom: 20px; }
.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--gray-900);
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--gray-200);
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--gray-900);
  transition: border-color 0.2s;
  background: var(--white);
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--green);
}
.form-group textarea { min-height: 140px; resize: vertical; }

.form-success {
  display: none;
  background: #f0f7e8;
  border: 1.5px solid var(--green);
  border-radius: 4px;
  padding: 16px 20px;
  color: #3d6b1a;
  font-weight: 600;
  font-size: 0.95rem;
}

.contact-info h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  margin-bottom: 20px;
}
.contact-detail {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: var(--gray-600);
}
.contact-detail svg { flex-shrink: 0; color: var(--green); margin-top: 1px; }
.contact-detail a { color: var(--green); }
.contact-detail a:hover { text-decoration: underline; }
.map-embed { border-radius: 8px; overflow: hidden; margin-top: 24px; }
.map-embed iframe { width: 100%; height: 240px; border: 0; display: block; }

@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 40px; } }

/* ============================================================
   KLANTCASES
   ============================================================ */
.cases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.case-card { background: var(--white); border-radius: 8px; overflow: hidden; border: 1px solid var(--gray-200); }
.case-photo {
  height: 160px;
  background: var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  font-size: 0.75rem;
  /* vervang door: <img src="assets/cases/[case].jpg" alt="..." style="width:100%;height:160px;object-fit:cover"> */
}
.case-body { padding: 20px; }
.case-sector { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); margin-bottom: 8px; }
.case-quote { font-size: 0.875rem; color: var(--gray-600); line-height: 1.65; font-style: italic; }

@media (max-width: 1024px) { .cases-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .cases-grid { grid-template-columns: 1fr; } }

/* ============================================================
   KERNWAARDEN GRID (AI pagina)
   ============================================================ */
.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.value-card {
  padding: 28px;
  border-radius: 8px;
  background: var(--white);
  border: 1px solid var(--gray-200);
  text-align: center;
}
.value-card .value-icon { color: var(--green); margin-bottom: 12px; }
.value-card h3 { font-family: var(--font-display); font-size: 1.05rem; margin-bottom: 8px; }
.value-card p { font-size: 0.875rem; color: var(--gray-600); }

@media (max-width: 768px) { .values-grid { grid-template-columns: 1fr; } }

/* ============================================================
   SENSOR PULSE ANIMATION
   ============================================================ */
@keyframes sensor-pulse {
  0%   { opacity: 0.8; r: 8; }
  100% { opacity: 0;   r: 20; }
}
.pulse-ring {
  animation: sensor-pulse 2s ease-out infinite;
  transform-origin: center;
}
.pulse-ring.d1 { animation-delay: 0s; }
.pulse-ring.d2 { animation-delay: 0.5s; }
.pulse-ring.d3 { animation-delay: 1s; }
.pulse-ring.d4 { animation-delay: 1.5s; }
.pulse-ring.d5 { animation-delay: 0.25s; }
.pulse-ring.d6 { animation-delay: 0.75s; }

/* ============================================================
   SPACING UTILITIES
   ============================================================ */
.mt-8  { margin-top: 8px;  } .mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; } .mt-32 { margin-top: 32px; }
.mb-8  { margin-bottom: 8px;  } .mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; } .mb-32 { margin-bottom: 32px; }
```

- [ ] **Step 2: Verify file exists**

```bash
ls -lh css/styles.css
```
Expected: file present, ~8–12 KB.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add complete CSS design system"
```

---

## Task 3: Shared components — header, footer, components.js

**Files:**
- Create: `components/header.html`
- Create: `components/footer.html`
- Create: `js/components.js`

- [ ] **Step 1: Write `components/header.html`**

```html
<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="site-logo" aria-label="iotta homepage">
      iotta<span class="dot">.</span>
    </a>
    <nav aria-label="Hoofdnavigatie">
      <ul class="nav-links">
        <li><a href="sensing-as-a-service.html">Sensing as a Service</a></li>
        <li><a href="partnering.html">Partnering</a></li>
        <li><a href="ai-en-analyse.html">AI &amp; Analyse</a></li>
        <li><a href="over-iotta.html">Over iotta</a></li>
      </ul>
    </nav>
    <a href="contact.html" class="btn btn-primary header-cta">Contact</a>
    <button class="hamburger" aria-label="Menu openen" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Mobiele navigatie">
    <a href="sensing-as-a-service.html">Sensing as a Service</a>
    <a href="partnering.html">Partnering</a>
    <a href="ai-en-analyse.html">AI &amp; Analyse</a>
    <a href="over-iotta.html">Over iotta</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>
```

- [ ] **Step 2: Write `components/footer.html`**

```html
<footer class="site-footer" role="contentinfo">
  <div class="footer-grid">
    <div>
      <div class="footer-logo">iotta<span class="dot">.</span></div>
      <p class="footer-tagline">Meten zonder zorgen.</p>
    </div>
    <nav class="footer-nav" aria-label="Footer navigatie">
      <h4>Diensten</h4>
      <ul>
        <li><a href="sensing-as-a-service.html">Sensing as a Service</a></li>
        <li><a href="partnering.html">Partnering</a></li>
        <li><a href="ai-en-analyse.html">AI &amp; Analyse</a></li>
        <li><a href="over-iotta.html">Over iotta</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <address class="footer-contact" style="font-style:normal;">
      <p>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        Cor Ruytstraat 2, 2288 EK Rijswijk
      </p>
      <p>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.03 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
        <a href="tel:0102232281">010 223 2281</a>
      </p>
      <p>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <a href="mailto:info@iotta.nl">info@iotta.nl</a>
      </p>
    </address>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 iotta. Alle rechten voorbehouden.</span>
    <a href="https://www.linkedin.com/company/iotta" target="_blank" rel="noopener noreferrer" aria-label="iotta op LinkedIn">
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
    </a>
  </div>
</footer>
```

- [ ] **Step 3: Write `js/components.js`**

```javascript
// Resolve the base URL from this script's own src so relative paths work
// regardless of the HTML file's location.
const BASE_URL = (() => {
  const s = document.querySelector('script[src*="components.js"]');
  if (s) return s.src.replace(/js\/components\.js.*$/, '');
  return './';
})();

async function loadComponent(placeholderId, filePath) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  try {
    const res = await fetch(BASE_URL + filePath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.outerHTML = await res.text();
    if (placeholderId === 'header-placeholder') {
      highlightActiveNav();
      if (typeof initHamburger === 'function') initHamburger();
      if (typeof initScrollHeader === 'function') initScrollHeader();
    }
  } catch (err) {
    console.warn(`Could not load component "${filePath}":`, err.message);
  }
}

function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

loadComponent('header-placeholder', 'components/header.html');
loadComponent('footer-placeholder', 'components/footer.html');
```

- [ ] **Step 4: Commit**

```bash
git add components/header.html components/footer.html js/components.js
git commit -m "feat: add shared header, footer and component loader"
```

---

## Task 4: Interactivity (`js/main.js`)

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Write `js/main.js`**

```javascript
// Called by components.js after the header fragment is injected
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    })
  );
}

// Called by components.js after the header fragment is injected
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// Contact form — Formspree async submission
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');

    btn.disabled = true;
    btn.textContent = 'Verzenden…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data?.errors?.map(e => e.message).join(', ')
          || 'Er is iets misgegaan. Probeer het opnieuw.';
        alert(msg);
        btn.disabled = false;
        btn.textContent = 'Verzenden';
      }
    } catch {
      alert('Geen verbinding. Controleer uw internet of stuur een e-mail naar info@iotta.nl.');
      btn.disabled = false;
      btn.textContent = 'Verzenden';
    }
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add hamburger nav, scroll header, and contact form JS"
```

---

## Task 5: Hero SVG illustration (`assets/hero-illustration.svg`)

**Files:**
- Create: `assets/hero-illustration.svg`

- [ ] **Step 1: Write `assets/hero-illustration.svg`**

```svg
<svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg"
     aria-hidden="true" role="img">

  <!-- Building body -->
  <rect x="140" y="80" width="200" height="260" rx="3" fill="#161616" stroke="#272727" stroke-width="1.5"/>

  <!-- Floor dividers -->
  <line x1="140" y1="130" x2="340" y2="130" stroke="#1f1f1f" stroke-width="1"/>
  <line x1="140" y1="180" x2="340" y2="180" stroke="#1f1f1f" stroke-width="1"/>
  <line x1="140" y1="230" x2="340" y2="230" stroke="#1f1f1f" stroke-width="1"/>
  <line x1="140" y1="280" x2="340" y2="280" stroke="#1f1f1f" stroke-width="1"/>

  <!-- Windows floor 1 (y=92) -->
  <rect x="160" y="92"  width="30" height="22" rx="2" fill="#8DC63F" opacity="0.75"/>
  <rect x="205" y="92"  width="30" height="22" rx="2" fill="#202020"/>
  <rect x="250" y="92"  width="30" height="22" rx="2" fill="#8DC63F" opacity="0.4"/>
  <rect x="295" y="92"  width="30" height="22" rx="2" fill="#8DC63F" opacity="0.2"/>

  <!-- Windows floor 2 -->
  <rect x="160" y="140" width="30" height="22" rx="2" fill="#202020"/>
  <rect x="205" y="140" width="30" height="22" rx="2" fill="#8DC63F" opacity="0.9"/>
  <rect x="250" y="140" width="30" height="22" rx="2" fill="#202020"/>
  <rect x="295" y="140" width="30" height="22" rx="2" fill="#8DC63F" opacity="0.55"/>

  <!-- Windows floor 3 -->
  <rect x="160" y="190" width="30" height="22" rx="2" fill="#8DC63F" opacity="0.35"/>
  <rect x="205" y="190" width="30" height="22" rx="2" fill="#202020"/>
  <rect x="250" y="190" width="30" height="22" rx="2" fill="#8DC63F" opacity="0.85"/>
  <rect x="295" y="190" width="30" height="22" rx="2" fill="#202020"/>

  <!-- Windows floor 4 -->
  <rect x="160" y="240" width="30" height="22" rx="2" fill="#202020"/>
  <rect x="205" y="240" width="30" height="22" rx="2" fill="#8DC63F" opacity="0.6"/>
  <rect x="250" y="240" width="30" height="22" rx="2" fill="#202020"/>
  <rect x="295" y="240" width="30" height="22" rx="2" fill="#8DC63F" opacity="0.45"/>

  <!-- Ground floor -->
  <rect x="210" y="295" width="60" height="45" rx="2" fill="#1a1a1a"/>
  <line x1="240" y1="295" x2="240" y2="340" stroke="#222" stroke-width="1"/>

  <!-- Data lines: sensors → gateway (dashed, subtle) -->
  <line x1="96"  y1="118" x2="185" y2="352" stroke="#8DC63F" stroke-width="0.7" stroke-dasharray="4,4" opacity="0.3"/>
  <line x1="240" y1="52"  x2="240" y2="352" stroke="#8DC63F" stroke-width="0.7" stroke-dasharray="4,4" opacity="0.3"/>
  <line x1="384" y1="155" x2="295" y2="352" stroke="#8DC63F" stroke-width="0.7" stroke-dasharray="4,4" opacity="0.3"/>

  <!-- Sensor 1: left wall -->
  <circle cx="96" cy="118" r="5" fill="#8DC63F"/>
  <circle cx="96" cy="118" r="10" stroke="#8DC63F" stroke-width="1.2" fill="none" opacity="0.6" class="pulse-ring d1"/>
  <circle cx="96" cy="118" r="16" stroke="#8DC63F" stroke-width="0.8" fill="none" opacity="0.3" class="pulse-ring d2"/>
  <line x1="101" y1="118" x2="140" y2="118" stroke="#8DC63F" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/>

  <!-- Sensor 2: roof -->
  <circle cx="240" cy="52" r="5" fill="#8DC63F"/>
  <circle cx="240" cy="52" r="10" stroke="#8DC63F" stroke-width="1.2" fill="none" opacity="0.6" class="pulse-ring d3"/>
  <circle cx="240" cy="52" r="16" stroke="#8DC63F" stroke-width="0.8" fill="none" opacity="0.3" class="pulse-ring d4"/>
  <line x1="240" y1="57" x2="240" y2="80" stroke="#8DC63F" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/>

  <!-- Sensor 3: right wall -->
  <circle cx="384" cy="155" r="5" fill="#8DC63F"/>
  <circle cx="384" cy="155" r="10" stroke="#8DC63F" stroke-width="1.2" fill="none" opacity="0.6" class="pulse-ring d5"/>
  <circle cx="384" cy="155" r="16" stroke="#8DC63F" stroke-width="0.8" fill="none" opacity="0.3" class="pulse-ring d6"/>
  <line x1="379" y1="155" x2="340" y2="155" stroke="#8DC63F" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/>

  <!-- Gateway box -->
  <rect x="186" y="352" width="108" height="28" rx="4" fill="#0d0d0d" stroke="#8DC63F" stroke-width="1"/>
  <text x="240" y="370" text-anchor="middle" fill="#8DC63F"
        font-size="8" font-weight="700" font-family="Inter, sans-serif" letter-spacing="2">GATEWAY</text>

  <!-- Cloud -->
  <path d="M430 72 Q424 61 413 65 Q410 51 397 54 Q394 43 383 50
           Q377 43 374 50 Q364 46 364 58 Q361 67 370 70 L430 70
           Q437 70 437 63 Q437 56 430 72Z"
        fill="#161616" stroke="#8DC63F" stroke-width="1" opacity="0.85"/>
  <!-- Gateway → Cloud line -->
  <line x1="294" y1="356" x2="398" y2="70" stroke="#8DC63F" stroke-width="0.7" stroke-dasharray="5,4" opacity="0.3"/>

  <!-- Small data label -->
  <text x="240" y="390" text-anchor="middle" fill="#8DC63F"
        font-size="7" font-weight="600" font-family="Inter, sans-serif"
        letter-spacing="2" opacity="0.6">REALTIME DATA</text>
</svg>
```

- [ ] **Step 2: Open SVG in browser to verify rendering**

Open `assets/hero-illustration.svg` directly in a browser. You should see a dark building with green-lit windows, three sensor dots with pulse rings, and a cloud connected by dashed lines. If `pulse-ring` animation doesn't play standalone, that's expected — it activates when loaded via the page.

- [ ] **Step 3: Commit**

```bash
git add assets/hero-illustration.svg
git commit -m "feat: add hero SVG building illustration"
```

---

## Task 6: Homepage (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iotta — Meten zonder zorgen</title>
  <meta name="description" content="iotta levert betrouwbare, draadloze meetdiensten als abonnement en fungeert als technologiepartner voor bedrijven die IoT-data nodig hebben.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <div id="header-placeholder"></div>

  <main>

    <!-- HERO -->
    <section class="hero" aria-label="Hero">
      <div class="hero-inner">
        <div class="hero-content">
          <p class="hero-eyebrow">IoT · Data · AI</p>
          <h1 class="hero-title">Meten<br>zonder<br>zorgen<span class="text-green">.</span></h1>
          <p class="hero-subtitle">
            Wij leveren end-to-end IoT-oplossingen — van hardware tot dashboard
            en AI-gestuurde analyses voor jouw vastgoed.
          </p>
          <div class="hero-actions">
            <a href="sensing-as-a-service.html" class="btn btn-primary">Bekijk onze diensten</a>
            <a href="contact.html" class="btn btn-outline-white">Neem contact op</a>
          </div>
        </div>
        <div class="hero-visual">
          <img src="assets/hero-illustration.svg" alt="Illustratie van een gebouw met draadloze IoT-sensoren verbonden aan een cloudplatform" width="480" height="400">
        </div>
      </div>
    </section>

    <!-- DRIE PIJLERS -->
    <section class="section section--white">
      <div class="section-inner">
        <div class="section-header">
          <h2>Van meten naar inzicht naar actie</h2>
          <p>Drie samenhangende diensten die samen één coherent aanbod vormen.</p>
        </div>
        <div class="cards-grid">

          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>
            </div>
            <h3 class="card-title">Sensing as a Service</h3>
            <p class="card-text">
              Van hardware tot dashboard. U zegt wat u wilt meten,
              wij regelen de rest — volledig draadloos, vaste prijs per sensor per jaar.
            </p>
            <a href="sensing-as-a-service.html" class="card-link">Lees meer →</a>
          </article>

          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <h3 class="card-title">Partnering</h3>
            <p class="card-text">
              Integreer betrouwbare sensordata naadloos in uw eigen product of dienst.
              Wij bouwen, leveren en beheren het sensornetwerk — u focust op uw klant.
            </p>
            <a href="partnering.html" class="card-link">Lees meer →</a>
          </article>

          <article class="card">
            <div class="card-badge">
              <span class="badge badge--green-outline">In ontwikkeling</span>
            </div>
            <div class="card-icon" aria-hidden="true">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h3 class="card-title">AI &amp; Analyse</h3>
            <p class="card-text">
              Haal meer uit uw data. Wij ondersteunen het opstellen van onderbouwde
              adviesrapporten — met AI als betrouwbare assistent.
            </p>
            <a href="ai-en-analyse.html" class="card-link">Lees meer →</a>
          </article>

        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <section class="section section--gray">
      <div class="section-inner">
        <div class="section-header">
          <h2>Vertrouwd door organisaties in zorg, onderwijs en vastgoed</h2>
        </div>
        <div class="logo-row">
          <!-- vervang door: <img src="assets/logos/[klant].svg" alt="[Klantnaam]" width="130" height="52"> -->
          <div class="logo-placeholder" role="img" aria-label="Klantlogo placeholder"></div>
          <div class="logo-placeholder" role="img" aria-label="Klantlogo placeholder"></div>
          <div class="logo-placeholder" role="img" aria-label="Klantlogo placeholder"></div>
          <div class="logo-placeholder" role="img" aria-label="Klantlogo placeholder"></div>
          <div class="logo-placeholder" role="img" aria-label="Klantlogo placeholder"></div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIAL -->
    <section class="section section--dark">
      <div class="section-inner">
        <div class="testimonial">
          <!-- vervang door: echte klantquote -->
          <blockquote class="testimonial-quote">
            Sinds we met iotta werken, hebben we 100% inzicht in ons binnenklimaat
            zonder dat onze IT-afdeling er omkijken naar heeft. Het werkt simpelweg altijd.
          </blockquote>
          <p class="testimonial-attrib">— Naam Achternaam, Functie · Organisatie</p>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="section section--green">
      <div class="section-inner cta-banner">
        <h2>Klaar om te meten zonder zorgen?</h2>
        <a href="contact.html" class="btn btn-outline-white">Neem contact op</a>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>

  <script src="js/main.js"></script>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Start local dev server and open homepage**

```bash
npx serve . -p 3000
# Open: http://localhost:3000
```

Verify:
- Header loads with nav links and Contact button
- Hero shows dark background, headline, two buttons, illustration on right
- Drie pijlers section shows 3 cards; AI-card has green badge
- Logo row shows 5 gray placeholder blocks
- Testimonial on dark background
- Green CTA banner
- Footer loads with links and contact info
- On mobile (< 768px): hamburger appears, illustration hides

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add homepage"
```

---

## Task 7: Sensing as a Service (`sensing-as-a-service.html`)

**Files:**
- Create: `sensing-as-a-service.html`

- [ ] **Step 1: Write `sensing-as-a-service.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sensing as a Service — iotta</title>
  <meta name="description" content="iotta levert draadloze meetdiensten als abonnement. U zegt wat u wilt meten, wij regelen de rest.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <div id="header-placeholder"></div>

  <main>

    <!-- HERO -->
    <section class="hero hero--page" aria-label="Hero">
      <div class="hero-inner">
        <div>
          <h1 class="hero-title">Sensing as a Service</h1>
          <p class="hero-subtitle">
            U zegt wat u wilt meten, wij regelen de rest.<br>
            Volledig draadloos, vaste prijs per sensor per jaar, 24/7 bewaakt.
          </p>
        </div>
      </div>
    </section>

    <!-- WAT IS INBEGREPEN -->
    <section class="section section--white">
      <div class="section-inner">
        <div class="section-header">
          <h2>Alles inbegrepen, niets te regelen</h2>
          <p>Van sensor tot data — wij verzorgen de volledige keten als abonnementsdienst.</p>
        </div>
        <div class="steps-row">
          <div class="step">
            <div class="step-icon" aria-hidden="true">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>
            </div>
            <div>
              <div class="step-label">Sensoren</div>
              <div class="step-desc">Hardware inclusief batterijen en behuizing</div>
            </div>
          </div>
          <div class="step">
            <div class="step-icon" aria-hidden="true">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <div>
              <div class="step-label">Infrastructuur</div>
              <div class="step-desc">Gateways en cloudplatform</div>
            </div>
          </div>
          <div class="step">
            <div class="step-icon" aria-hidden="true">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div class="step-label">Plaatsing</div>
              <div class="step-desc">Wij plaatsen alle sensoren</div>
            </div>
          </div>
          <div class="step">
            <div class="step-icon" aria-hidden="true">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div>
              <div class="step-label">Dashboard</div>
              <div class="step-desc">24/7 inzicht in uw data</div>
            </div>
          </div>
          <div class="step">
            <div class="step-icon" aria-hidden="true">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <div>
              <div class="step-label">Onderhoud</div>
              <div class="step-desc">Monitoring en vervanging</div>
            </div>
          </div>
          <div class="step">
            <div class="step-icon" aria-hidden="true">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <div>
              <div class="step-label">Integratie</div>
              <div class="step-desc">Data in uw eigen systemen</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BESCHIKBARE METINGEN -->
    <section class="section section--gray">
      <div class="section-inner">
        <div class="section-header">
          <h2>Beschikbare metingen</h2>
          <p>Kies wat u wilt meten. Wij regelen de rest.</p>
        </div>
        <div class="cards-grid">
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>
            </div>
            <h3 class="card-title">Binnenklimaat</h3>
            <p class="card-text">CO₂, temperatuur, relatieve vochtigheid, licht, fijnstof en VOC. Continu inzicht in de luchtkwaliteit van iedere ruimte.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <h3 class="card-title">Bezetting &amp; aanwezigheid</h3>
            <p class="card-text">Ruimtebezetting en werkplekbezetting in realtime. Essentieel voor hybride werken, ruimteplanning en energiebesparing.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3"/></svg>
            </div>
            <h3 class="card-title">Temperatuurbewaking</h3>
            <p class="card-text">Continue bewaking van koelingen en vriezers conform HACCP-richtlijnen. Direct alarm bij temperatuurafwijkingen.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
            </div>
            <h3 class="card-title">Parkeerplaatsbezetting</h3>
            <p class="card-text">Realtime inzicht in bezette en vrije parkeerplaatsen. Stuur bezoekers slim, verminder zoekverkeer.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
            </div>
            <h3 class="card-title">Tank- &amp; afvalbak-niveau</h3>
            <p class="card-text">Niveaumeting van tanks en containers op afstand. Planmatig legen op basis van werkelijke vulgraad.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3 class="card-title">GPS-tracking</h3>
            <p class="card-text">Realtime locatiebepaling van mobiele assets en voertuigen. Altijd weten waar uw materieel zich bevindt.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 class="card-title">Maatwerk</h3>
            <p class="card-text">Specifieke meetwens die u hier niet ziet? Wij ontwikkelen snel nieuwe sensortypen. Neem contact op en we kijken wat mogelijk is.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- TARIEFMODEL -->
    <section class="section section--white">
      <div class="section-inner" style="max-width:720px; text-align:center;">
        <h2 style="font-family:var(--font-display);font-size:clamp(1.75rem,3vw,2.25rem);margin-bottom:16px;">Vaste prijs per sensor per jaar</h2>
        <p style="font-size:1.05rem;color:var(--gray-600);margin-bottom:12px;line-height:1.75;">
          Eén abonnementsprijs. Geen verborgen kosten voor hardware, installatie, onderhoud of het cloudplatform.
          Alles is inbegrepen — inclusief vervanging bij storing.
        </p>
        <p style="font-size:1.05rem;color:var(--gray-600);margin-bottom:32px;line-height:1.75;">
          De data blijft te allen tijde eigendom van u als klant.
        </p>
        <a href="contact.html" class="btn btn-primary">Vraag een offerte aan</a>
      </div>
    </section>

    <!-- KLANTCASES -->
    <section class="section section--gray">
      <div class="section-inner">
        <div class="section-header">
          <h2>Klanten aan het woord</h2>
        </div>
        <div class="cases-grid">
          <!-- vervang door: echte klantcases -->
          <article class="case-card">
            <div class="case-photo">Foto placeholder</div>
            <div class="case-body">
              <p class="case-sector">Onderwijs</p>
              <p class="case-quote">"Placeholder quote — vervang door echte klanttekst."</p>
            </div>
          </article>
          <article class="case-card">
            <div class="case-photo">Foto placeholder</div>
            <div class="case-body">
              <p class="case-sector">Zorg</p>
              <p class="case-quote">"Placeholder quote — vervang door echte klanttekst."</p>
            </div>
          </article>
          <article class="case-card">
            <div class="case-photo">Foto placeholder</div>
            <div class="case-body">
              <p class="case-sector">Maatschappelijk vastgoed</p>
              <p class="case-quote">"Placeholder quote — vervang door echte klanttekst."</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--green">
      <div class="section-inner cta-banner">
        <h2>Klaar om te meten zonder zorgen?</h2>
        <a href="contact.html" class="btn btn-outline-white">Neem contact op</a>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>
  <script src="js/main.js"></script>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser at http://localhost:3000/sensing-as-a-service.html**

Verify: dark hero, 6-step row, 7 measurement cards, pricing section, 3 case-card placeholders.

- [ ] **Step 3: Commit**

```bash
git add sensing-as-a-service.html
git commit -m "feat: add Sensing as a Service page"
```

---

## Task 8: Partnering (`partnering.html`)

**Files:**
- Create: `partnering.html`

- [ ] **Step 1: Write `partnering.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Partnering — iotta</title>
  <meta name="description" content="iotta als technologiepartner: wij leveren de IoT-data, u focust op uw product of dienst.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <div id="header-placeholder"></div>

  <main>

    <!-- HERO -->
    <section class="hero hero--page" aria-label="Hero">
      <div class="hero-inner">
        <div>
          <h1 class="hero-title">Partnering</h1>
          <p class="hero-subtitle">Samenwerken voor de beste klantoplossing. Wij leveren de sensordata, u bouwt het product.</p>
        </div>
      </div>
    </section>

    <!-- ZIG-ZAG BLOKKEN -->
    <section class="section section--white">
      <div class="section-inner">
        <div class="zigzag">

          <div class="zigzag-block">
            <div class="zigzag-text">
              <h3>Voor software-ontwikkelaars</h3>
              <p>
                U bouwt fantastische dashboards, rapportagetools of gebouwbeheersystemen — zoals Planon of HACCP Live.
                Wij leveren de betrouwbare, realtime sensordata via veilige API's in het formaat naar keuze.
                Geen hardware-kopzorgen meer voor uw team: u integreert de data, wij beheren de infrastructuur.
              </p>
            </div>
            <div class="zigzag-visual" role="img" aria-label="Diagram van API-datastroming">
              <!-- vervang door: illustratie of diagram -->
              API &amp; datastroom diagram
            </div>
          </div>

          <div class="zigzag-block reverse">
            <div class="zigzag-text">
              <h3>Voor installateurs</h3>
              <p>
                Wij leveren de sensoren en de draadloze connectiviteit — u verzorgt de fysieke installatie
                bij uw klanten. Een sterke combinatie: uw vakkennis in het veld gecombineerd met onze
                bewezen IoT-infrastructuur en het beheer daarna.
              </p>
            </div>
            <div class="zigzag-visual" role="img" aria-label="Foto van monteur of hardware">
              <!-- vervang door: <img src="assets/partners/installateur.jpg" alt="Monteur installeert sensor"> -->
              Foto placeholder
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- WAT LEVERT IOTTA -->
    <section class="section section--dark">
      <div class="section-inner">
        <div class="section-header">
          <h2>Wat wij leveren</h2>
        </div>
        <div class="cards-grid">
          <article class="card" style="background:#1a1a1a;border-color:#272727;color:#fff;">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="#8DC63F" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </div>
            <h3 class="card-title">Hardware-ontwikkeling</h3>
            <p class="card-text" style="color:#9ca3af;">Snel nieuwe sensortypen bouwen op basis van uw specificaties, daarna schaal produceren. Van prototype naar productie.</p>
          </article>
          <article class="card" style="background:#1a1a1a;border-color:#272727;color:#fff;">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="#8DC63F" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3 class="card-title">Software-integratie</h3>
            <p class="card-text" style="color:#9ca3af;">Realtime data-levering via REST API, MQTT of webhooks — in het formaat en de frequentie die uw systeem nodig heeft.</p>
          </article>
          <article class="card" style="background:#1a1a1a;border-color:#272727;color:#fff;">
            <div class="card-icon" aria-hidden="true">
              <svg width="28" height="28" fill="none" stroke="#8DC63F" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h3 class="card-title">Beheer &amp; onderhoud</h3>
            <p class="card-text" style="color:#9ca3af;">Proactief beheer van sensornetwerken op grote schaal. Batterijvervanging, firmware-updates, 24/7 monitoring — alles geregeld.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--green">
      <div class="section-inner cta-banner">
        <h2>Klaar om samen te werken?</h2>
        <a href="contact.html" class="btn btn-outline-white">Word Partner</a>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>
  <script src="js/main.js"></script>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify all sections render correctly**

- [ ] **Step 3: Commit**

```bash
git add partnering.html
git commit -m "feat: add Partnering page"
```

---

## Task 9: AI & Analyse (`ai-en-analyse.html`)

**Files:**
- Create: `ai-en-analyse.html`

- [ ] **Step 1: Write `ai-en-analyse.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI &amp; Analyse — iotta</title>
  <meta name="description" content="iotta ondersteunt het opstellen van onderbouwde adviesrapporten voor verduurzaming van maatschappelijk vastgoed — met AI als betrouwbare assistent.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <div id="header-placeholder"></div>

  <main>

    <!-- HERO -->
    <section class="hero hero--page" aria-label="Hero">
      <div class="hero-inner">
        <div>
          <span class="badge badge--green" style="margin-bottom:16px;display:inline-block;">In actieve ontwikkeling</span>
          <h1 class="hero-title">AI &amp; Analyse</h1>
          <p class="hero-subtitle">Van data naar onderbouwde besluiten — met AI als betrouwbare assistent, niet als vervanger van de expert.</p>
        </div>
      </div>
    </section>

    <!-- WAT WIJ NU AL DOEN -->
    <section class="section section--white">
      <div class="section-inner" style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;">
        <div>
          <h2 style="font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2rem);margin-bottom:16px;">Wat wij nu al doen</h2>
          <p style="font-size:1rem;color:var(--gray-600);line-height:1.75;margin-bottom:16px;">
            iotta ondersteunt al actief het opstellen van adviesrapporten voor de verduurzaming van maatschappelijk vastgoed — scholen, zorginstellingen en gemeentelijk vastgoed.
          </p>
          <p style="font-size:1rem;color:var(--gray-600);line-height:1.75;margin-bottom:16px;">
            Wij combineren realtime gebouwdata van sensoren met regelgeving, scenarioanalyse en professionele besluitvorming. Het resultaat: reproduceerbare, auditeerbare rapportages die u kunt verantwoorden naar uw opdrachtgever.
          </p>
          <p style="font-size:1rem;color:var(--gray-600);line-height:1.75;">
            <strong>AI als assistent, niet als orakel.</strong> Onze aanpak is transparant: elke conclusie is herleidbaar naar de onderliggende data en rekenregels. Geen zwarte doos.
          </p>
        </div>
        <div style="background:var(--gray-100);border-radius:10px;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;color:var(--gray-400);font-size:0.8rem;">
          <!-- vervang door: dashboard screenshot of illustratie -->
          Dashboard illustratie placeholder
        </div>
      </div>
    </section>

    <!-- KERNWAARDEN -->
    <section class="section section--gray">
      <div class="section-inner">
        <div class="section-header">
          <h2>Onze uitgangspunten</h2>
          <p>Geen black box — resultaten die u kunt begrijpen, controleren en verdedigen.</p>
        </div>
        <div class="values-grid">
          <article class="value-card">
            <div class="value-icon" aria-hidden="true">
              <svg width="32" height="32" fill="none" stroke="#8DC63F" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3>Controleerbaar</h3>
            <p>Elk rapport is opgesteld met een expliciete redenering die u stap voor stap kunt doorlopen.</p>
          </article>
          <article class="value-card">
            <div class="value-icon" aria-hidden="true">
              <svg width="32" height="32" fill="none" stroke="#8DC63F" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </div>
            <h3>Herleidbaar</h3>
            <p>Elke conclusie is terug te voeren op de onderliggende sensordata en gehanteerde regelgeving.</p>
          </article>
          <article class="value-card">
            <div class="value-icon" aria-hidden="true">
              <svg width="32" height="32" fill="none" stroke="#8DC63F" stroke-width="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
            </div>
            <h3>Reproduceerbaar</h3>
            <p>Dezelfde invoer geeft dezelfde uitvoer. Analyses zijn auditeerbaar en te herhalen.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ANTAIRA R&D -->
    <section class="section section--dark">
      <div class="section-inner" style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;">
        <div>
          <span class="badge badge--green-outline" style="margin-bottom:16px;display:inline-block;">R&amp;D · MIT-subsidieproject</span>
          <h2 style="font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2rem);margin-bottom:16px;color:var(--white);">ANTAIRA — de doorontwikkeling</h2>
          <p style="font-size:1rem;color:#9ca3af;line-height:1.75;margin-bottom:16px;">
            Op basis van onze praktijkervaring met adviesrapporten ontwikkelen wij ANTAIRA: een gestructureerde AI-runtimearchitectuur voor reproduceerbare, schaalbare analyses op basis van realtime sensordata.
          </p>
          <p style="font-size:1rem;color:#9ca3af;line-height:1.75;margin-bottom:16px;">
            ANTAIRA is bedoeld voor adviesbureaus en beheerders van maatschappelijk vastgoed die op grotere schaal onderbouwde adviezen willen genereren.
          </p>
          <p style="font-size:0.875rem;color:#6b7280;line-height:1.6;">
            Dit systeem is in R&amp;D-fase. Wij communiceren open over de status en verwachten geen hype te creëren die we niet kunnen waarmaken.
          </p>
        </div>
        <div style="background:#161616;border:1px solid #272727;border-radius:10px;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;color:#374151;font-size:0.8rem;">
          <!-- vervang door: ANTAIRA architectuur illustratie -->
          Architectuur illustratie placeholder
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--green">
      <div class="section-inner cta-banner">
        <h2>Wil je meer weten over hoe wij dit toepassen?</h2>
        <a href="contact.html" class="btn btn-outline-white">Neem contact op</a>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>
  <script src="js/main.js"></script>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify: badge in hero, two-column "wat wij nu al doen", three value cards, dark ANTAIRA section**

Also verify the two-column sections collapse to single column on mobile (resize window to < 768px). Add responsive rule to styles.css if needed:

```css
/* Add to styles.css under the AI page section if missing */
@media (max-width: 768px) {
  .section-inner[style*="grid-template-columns:1fr 1fr"] {
    display: block;
  }
}
```

> **Note:** The inline `display:grid` on these sections bypasses the class-based responsive rules. Prefer adding dedicated classes (`ai-two-col`) to styles.css so the media query can target them cleanly, instead of relying on the inline style override above.

- [ ] **Step 3: Refactor inline grid styles on AI page to use CSS classes**

In `css/styles.css`, add:
```css
.two-col-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
@media (max-width: 768px) {
  .two-col-section { display: block; }
  .two-col-section > * + * { margin-top: 32px; }
}
```

Replace `style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;"` with `class="two-col-section"` on both sections in `ai-en-analyse.html`. Also apply `two-col-section` to the partnering page's `Over iotta` section (Task 10 will use this class too).

- [ ] **Step 4: Commit**

```bash
git add ai-en-analyse.html css/styles.css
git commit -m "feat: add AI & Analyse page"
```

---

## Task 10: Over iotta (`over-iotta.html`)

**Files:**
- Create: `over-iotta.html`

- [ ] **Step 1: Write `over-iotta.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Over iotta</title>
  <meta name="description" content="iotta is opgericht vanuit YES!Delft / TU Delft met één missie: het vangen van fysieke data extreem makkelijk maken voor elke organisatie.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <div id="header-placeholder"></div>

  <main>

    <!-- HERO -->
    <section class="hero hero--page" aria-label="Hero">
      <div class="hero-inner">
        <div>
          <h1 class="hero-title">Over iotta</h1>
          <p class="hero-subtitle">Fysieke data vangen — extreem makkelijk maken voor elke organisatie. Dat is onze missie, elke dag.</p>
        </div>
      </div>
    </section>

    <!-- ONS VERHAAL -->
    <section class="section section--gray">
      <div class="section-inner">
        <div class="two-col-section">
          <div>
            <h2 style="font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2rem);margin-bottom:16px;">De complexiteit uit IoT halen</h2>
            <p style="font-size:1rem;color:var(--gray-600);line-height:1.75;margin-bottom:16px;">
              IoT-projecten stranden te vaak op verbindingsproblemen, lege batterijen of IT-integraties die nooit soepel lopen. Dat frustreert — want de meetdata zelf is onmisbaar voor beter gebouwbeheer, duurzaamheid en werkcomfort.
            </p>
            <p style="font-size:1rem;color:var(--gray-600);line-height:1.75;margin-bottom:16px;">
              Wij besloten dat dit anders moest. Vanuit YES!Delft en de TU Delft bouwden Erik Steenbergen en Rogier Lodewijks iotta op: een bedrijf dat de volledige IoT-keten uit handen neemt, zodat organisaties kunnen focussen op wat ze met de data doen.
            </p>
            <p style="font-size:1rem;color:var(--gray-600);line-height:1.75;">
              Gevestigd in Rijswijk, werken wij voor kantoren, scholen, zorginstellingen, supermarkten en vastgoedbeheerders door heel Nederland.
            </p>
          </div>
          <div>
            <div style="background:var(--gray-200);border-radius:10px;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;color:var(--gray-400);font-size:0.8rem;">
              <!-- vervang door: <img src="assets/team/team-foto.jpg" alt="Het team van iotta" style="width:100%;height:100%;object-fit:cover;border-radius:10px;"> -->
              Teamfoto of kantoor Rijswijk placeholder
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section class="section section--white">
      <div class="section-inner">
        <div class="section-header">
          <h2>Het team</h2>
        </div>
        <div class="team-grid">
          <div class="team-card">
            <div class="team-photo" role="img" aria-label="Foto van Erik Steenbergen">
              <!-- vervang door: <img src="assets/team/erik-steenbergen.jpg" alt="Erik Steenbergen" width="120" height="120"> -->
            </div>
            <p class="team-name">Erik Steenbergen</p>
            <p class="team-role">Medeoprichter</p>
          </div>
          <div class="team-card">
            <div class="team-photo" role="img" aria-label="Foto van Rogier Lodewijks">
              <!-- vervang door: <img src="assets/team/rogier-lodewijks.jpg" alt="Rogier Lodewijks" width="120" height="120"> -->
            </div>
            <p class="team-name">Rogier Lodewijks</p>
            <p class="team-role">Medeoprichter</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TIJDLIJN -->
    <section class="section section--gray">
      <div class="section-inner">
        <div class="section-header">
          <h2>Onze weg</h2>
        </div>
        <div class="timeline" role="list">
          <!-- vervang placeholder-jaren en labels door echte mijlpalen -->
          <div class="timeline-item" role="listitem">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2018</div>
            <div class="timeline-label">Oprichting vanuit YES!Delft / TU Delft</div>
          </div>
          <div class="timeline-item" role="listitem">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2019</div>
            <div class="timeline-label">Eerste klanten in onderwijs en zorg</div>
          </div>
          <div class="timeline-item" role="listitem">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2021</div>
            <div class="timeline-label">Uitbreiding naar maatschappelijk vastgoed</div>
          </div>
          <div class="timeline-item" role="listitem">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2024</div>
            <div class="timeline-label">Start ANTAIRA R&amp;D met MIT-subsidie</div>
          </div>
          <div class="timeline-item" role="listitem">
            <div class="timeline-dot"></div>
            <div class="timeline-year">Nu</div>
            <div class="timeline-label">Actief in heel Nederland</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--green">
      <div class="section-inner cta-banner">
        <h2>Nieuwsgierig naar wat iotta voor u kan doen?</h2>
        <a href="contact.html" class="btn btn-outline-white">Neem contact op</a>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>
  <script src="js/main.js"></script>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify: hero, 2-col story section, 2 team cards with circular placeholders, horizontal timeline, green CTA**

- [ ] **Step 3: Commit**

```bash
git add over-iotta.html
git commit -m "feat: add Over iotta page"
```

---

## Task 11: Contact (`contact.html`)

**Files:**
- Create: `contact.html`

**Note:** Before deploying, create a free Formspree account at formspree.io and replace `YOUR_FORM_ID` with the actual form ID. Until then the form renders correctly but submission will fail.

- [ ] **Step 1: Write `contact.html`**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — iotta</title>
  <meta name="description" content="Neem contact op met iotta — Cor Ruytstraat 2, Rijswijk. Tel: 010 223 2281. E-mail: info@iotta.nl.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <div id="header-placeholder"></div>

  <main>

    <!-- HERO -->
    <section class="hero hero--page" aria-label="Hero">
      <div class="hero-inner">
        <div>
          <h1 class="hero-title">Neem contact op</h1>
          <p class="hero-subtitle">Klaar om te meten zonder zorgen? Laat een bericht achter of bel ons direct.</p>
        </div>
      </div>
    </section>

    <!-- FORMULIER & GEGEVENS -->
    <section class="section section--white">
      <div class="section-inner">
        <div class="contact-grid">

          <!-- Formulier -->
          <div>
            <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:24px;">Stuur ons een bericht</h2>

            <!-- Succesmelding (verborgen tot na verzending) -->
            <div id="form-success" class="form-success" role="alert">
              Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.
            </div>

            <form id="contact-form"
                  action="https://formspree.io/f/YOUR_FORM_ID"
                  method="POST"
                  novalidate>

              <div class="form-group">
                <label for="naam">Naam <span aria-hidden="true">*</span></label>
                <input type="text" id="naam" name="naam" required autocomplete="name" placeholder="Uw volledige naam">
              </div>

              <div class="form-group">
                <label for="email">E-mailadres <span aria-hidden="true">*</span></label>
                <input type="email" id="email" name="email" required autocomplete="email" placeholder="uw@emailadres.nl">
              </div>

              <div class="form-group">
                <label for="organisatie">Organisatie</label>
                <input type="text" id="organisatie" name="organisatie" autocomplete="organization" placeholder="Naam van uw organisatie">
              </div>

              <div class="form-group">
                <label for="bericht">Bericht <span aria-hidden="true">*</span></label>
                <textarea id="bericht" name="bericht" required placeholder="Waar kunnen wij u mee helpen?"></textarea>
              </div>

              <button type="submit" class="btn btn-primary">Verzenden</button>
            </form>
          </div>

          <!-- Contactgegevens -->
          <div class="contact-info">
            <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:24px;">Onze gegevens</h2>

            <div class="contact-detail">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Cor Ruytstraat 2<br>2288 EK Rijswijk</span>
            </div>

            <div class="contact-detail">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.03 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              <a href="tel:0102232281">010 223 2281</a>
            </div>

            <div class="contact-detail">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:info@iotta.nl">info@iotta.nl</a>
            </div>

            <!-- Google Maps embed — geen API-key vereist -->
            <div class="map-embed">
              <iframe
                title="Locatie iotta — Cor Ruytstraat 2, Rijswijk"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2455.5!2d4.3352!3d52.0272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5a0e0000001%3A0x1!2sCor%20Ruytstraat%202%2C%202288%20EK%20Rijswijk!5e0!3m2!1snl!2snl!4v1"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>
  <script src="js/main.js"></script>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify layout, form fields, and contact details**

- [ ] **Step 3: Test Formspree submission (only after replacing YOUR_FORM_ID)**

After creating a Formspree account and replacing the form ID:
1. Fill in the form with real values
2. Submit
3. Expected: form disappears, green success message appears: "Bedankt voor uw bericht!"
4. Verify email arrives at info@iotta.nl via Formspree dashboard

- [ ] **Step 4: Commit**

```bash
git add contact.html
git commit -m "feat: add Contact page with Formspree form"
```

---

## Task 12: Responsive & accessibility final pass

**Files:**
- Modify: `css/styles.css` (fixes only)

- [ ] **Step 1: Test all pages at 375px width (iPhone SE)**

Open each page in browser DevTools with width set to 375px. Check:
- [ ] Header shows hamburger, nav links hidden
- [ ] Hamburger opens/closes dropdown correctly
- [ ] Hero text is readable (no overflow)
- [ ] Cards stack to 1 column
- [ ] Steps row stacks vertically
- [ ] Zigzag blocks stack to 1 column
- [ ] Contact grid stacks to 1 column
- [ ] Footer stacks to 1 column
- [ ] Hero illustration hidden on mobile (by design)

- [ ] **Step 2: Test keyboard navigation**

Tab through each page without touching the mouse:
- [ ] Focus ring is visible on all interactive elements (links, buttons, inputs)
- [ ] Hamburger opens with Enter/Space
- [ ] Form fields are reachable and labels are connected via `for`/`id`

- [ ] **Step 3: Test color contrast**

Use browser DevTools (Chrome: Inspect → Accessibility) or https://webaim.org/resources/contrastchecker to verify:
- Green `#8DC63F` on white `#ffffff`: ratio must be ≥ 4.5:1 for normal text
  - If failing (it's borderline), change button text to `--gray-900` on green background, or darken green to `#7ab435` for text use only
- White text on `#0d0d0d`: passes easily (ratio > 15:1)
- `#6b7280` on white: ratio ≈ 4.6:1, passes AA for normal text (verify)

- [ ] **Step 4: Verify all images have alt text**

```bash
grep -n '<img' *.html | grep -v 'alt='
```
Expected: no output (every img has alt).

- [ ] **Step 5: Validate HTML**

```bash
npx html-validate index.html sensing-as-a-service.html partnering.html ai-en-analyse.html over-iotta.html contact.html
```
If `html-validate` is not installed:
```bash
npx html-validate --install
```
Fix any reported errors.

- [ ] **Step 6: Commit**

```bash
git add css/styles.css *.html
git commit -m "fix: responsive and accessibility pass"
```

---

## Deployment note

To deploy to Netlify:
1. Push repo to GitHub
2. Connect repo in Netlify dashboard
3. Build command: *(none — static site)*
4. Publish directory: `.` (root)
5. Replace `YOUR_FORM_ID` in `contact.html` with the Formspree form ID before deploying

Add `.superpowers/` to `.gitignore` so brainstorm files are not pushed.
