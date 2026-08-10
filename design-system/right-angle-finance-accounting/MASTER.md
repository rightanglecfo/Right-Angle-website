# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Right Angle Finance Accounting
**Generated:** 2026-07-22 20:40:00
**Category:** B2B Service

---

## Global Rules

> **OVERRIDE NOTE:** The palette/type below were customized after design-system generation to match the client's actual logo (sampled via pixel extraction) and explicit brief ("take color from logo, shades of navy/grey; if you deviate, use black & white — no unrelated accent color"). These are the values actually implemented in `index.html` / `css/style.css`, not the generic defaults the search tool first proposed.

### Color Palette (sampled from logo files)

| Role | Hex | CSS Variable | Source |
|------|-----|--------------|--------|
| Ink (Primary) | `#0D1B3D` | `--color-ink` | Darkest logo bar / arrow |
| Slate (Secondary) | `#47536B` | `--color-slate` | Mid-dark logo bar (slightly darkened from #5A647B for AA text contrast) |
| Steel (Muted) | `#8890A0` | `--color-steel` | Light-mid logo bar |
| Mist (Border) | `#DCDFE5` | `--color-mist` | Lightest logo bar, lightened for hairline borders |
| Paper (Background) | `#FAFAF8` | `--color-paper` | Warm off-white, not pure white |
| Surface | `#FFFFFF` | `--color-surface` | Card backgrounds |
| Ink-Alt (deviation) | `#000000` / `#FFFFFF` | — | Used only for hover-invert states per brief |
| Destructive | `#B3261E` | `--color-destructive` | Form validation errors only |

**Color Notes:** No unrelated accent color (no blue/gold/green) — strictly the navy→grey ramp pulled directly from the logo's four bar-chart bars, plus black/white inversion for hover states, exactly as specified in the client's notes.

### Typography

- **Heading / Display Font:** Fraunces (variable serif — optical sizing, soft, editorial, sets the "sophisticated boutique" register apart from generic navy SaaS)
- **Body / UI Font:** Inter (clean, highly legible, portable, wide weight range)
- **Label / Eyebrow Font:** Inter, uppercase, letter-spacing 0.08–0.12em (echoes the tracked-out "FINANCE AND ACCOUNTING" subtitle treatment in the logo lockup)
- **Mood:** sophisticated, editorial, boutique advisory, trustworthy, warm-serious (not cold-corporate)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #0369A1;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #0F172A;
  border: 2px solid #0F172A;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #0F172A;
  outline: none;
  box-shadow: 0 0 0 3px #0F172A20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Trust & Authority

**Keywords:** Certificates/badges displayed, expert credentials, case studies with metrics, before/after comparisons, industry recognition, security badges

**Best For:** Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services

**Key Effects:** Badge hover effects, metric pulse animations, certificate carousel, smooth stat reveal

### Page Pattern

**Pattern Name:** Feature-Rich Showcase + Trust

- **CTA Placement:** Above fold
- **Section Order:** Hero > Features > CTA

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
