# MEDICA Design System

> Clean, clinical, patient-centric design language for enterprise healthcare interfaces.

## Table of Contents

- [Design Principles](#design-principles)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing](#spacing)
- [Component Architecture](#component-architecture)
- [Iconography](#iconography)
- [Motion & Animation](#motion--animation)
- [Accessibility](#accessibility)
- [Dark Mode](#dark-mode)

---

## Design Principles

### 1. Calm and Clinical
Healthcare is inherently stressful. Every visual decision should reduce cognitive load, not add to it. Generous whitespace, muted color accents, and clear visual hierarchy create a sense of calm competence.

### 2. Patient at the Center
Every screen answers the question: *"What does the provider need to know about this patient right now?"* The most critical information is always most accessible.

### 3. Data Density with Clarity
Clinical workflows require dense information. We embrace this density but organize it with clear visual hierarchy, progressive disclosure, and consistent patterns.

### 4. Accessibility is Clinical Necessity
In healthcare, accessibility isn't optional. A clinician under stress must be able to quickly parse information. WCAG 2.1 AA is our minimum; AAA is our target where practical.

### 5. Consistency Builds Trust
Patients and providers should feel immediately at home in every part of the platform. Consistent patterns, terminology, and interactions build muscle memory and trust.

---

## Color Palette

### Primary — Medical Blue

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-50` | `#eff6ff` | Backgrounds, containers |
| `--color-primary-100` | `#dbeafe` | Hover backgrounds, badges |
| `--color-primary-200` | `#bfdbfe` | Selection highlights |
| `--color-primary-300` | `#93c5fd` | Borders, decorative elements |
| `--color-primary-400` | `#60a5fa` | Active states, links |
| `--color-primary-500` | `#2563eb` | **Primary actions, CTA, key accents** |
| `--color-primary-600` | `#1d4ed8` | Hover states, active buttons |
| `--color-primary-700` | `#1e40af` | Pressed states, dark mode accent |
| `--color-primary-800` | `#1e3a8a` | Deep backgrounds |
| `--color-primary-900` | `#172554` | Dark mode headings |

### Neutral — Clean Clinical Gray

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-neutral-0` | `#ffffff` | Page backgrounds, cards |
| `--color-neutral-50` | `#f8fafc` | Subtle backgrounds |
| `--color-neutral-100` | `#f1f5f9` | Card backgrounds, hover |
| `--color-neutral-200` | `#e2e8f0` | Borders, dividers |
| `--color-neutral-300` | `#cbd5e1` | Disabled states |
| `--color-neutral-400` | `#94a3b8` | Placeholder text |
| `--color-neutral-500` | `#64748b` | Secondary text |
| `--color-neutral-600` | `#475569` | Body text |
| `--color-neutral-700` | `#334155` | Headings |
| `--color-neutral-800` | `#1e293b` | Strong emphasis |
| `--color-neutral-900` | `#0f172a` | High contrast text |

### Semantic — Clinical States

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#22c55e` | Confirmed, active, complete |
| `--color-warning` | `#f59e0b` | Pending, requires attention |
| `--color-danger` | `#ef4444` | Critical, cancelled, error |
| `--color-info` | `#3b82f6` | Informational, new |
| `--color-critical` | `#dc2626` | Urgent clinical alerts |
| `--color-stable` | `#16a34a` | Normal vitals, resolved |

### Clinical Status Colors

| Status | Color | Context |
|--------|-------|---------|
| Scheduled | `#3b82f6` | Appointment booked |
| Confirmed | `#22c55e` | Appointment confirmed |
| In Progress | `#f59e0b` | Patient being seen |
| Completed | `#64748b` | Visit finished |
| Cancelled | `#ef4444` | Appointment cancelled |
| Critical | `#dc2626` | Urgent clinical finding |
| Stable | `#16a34a` | Normal/healthy status |

---

## Typography

### Font Family

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 3rem (48px) | 700 | 1.1 | Page hero titles |
| `h1` | 2rem (32px) | 700 | 1.2 | Page titles |
| `h2` | 1.5rem (24px) | 600 | 1.3 | Section headers |
| `h3` | 1.25rem (20px) | 600 | 1.4 | Card titles |
| `h4` | 1.125rem (18px) | 600 | 1.4 | Subsection headers |
| `body-lg` | 1rem (16px) | 400 | 1.5 | Body text |
| `body` | 0.938rem (15px) | 400 | 1.5 | Default body |
| `body-sm` | 0.875rem (14px) | 400 | 1.5 | Secondary text |
| `caption` | 0.813rem (13px) | 400 | 1.4 | Labels, metadata |
| `small` | 0.75rem (12px) | 400 | 1.4 | Footnotes, timestamps |
| `tiny` | 0.688rem (11px) | 500 | 1.3 | Badges, status |

### Clinical Data Typography

Clinical data (vitals, lab values, dosages) uses the monospace font for precise readability:

```css
--font-clinical: 'JetBrains Mono', monospace;
/* Weight: 500 for values, 400 for units */
```

---

## Spacing

### Base Unit: 4px

```
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-5:  1.25rem  (20px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-10: 2.5rem   (40px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-20: 5rem     (80px)
--space-24: 6rem     (96px)
```

### Layout Spacing Guidelines

- **Page padding:** `--space-8` (2rem) desktop, `--space-4` (1rem) mobile
- **Card padding:** `--space-6` (1.5rem)
- **Section spacing:** `--space-12` (3rem) vertical
- **Form element spacing:** `--space-5` (1.25rem) vertical
- **List item spacing:** `--space-3` (0.75rem) vertical

### Clinical Spacing

Medical UI requires more generous spacing than typical web apps. We use a "medical spacing" scale that adds `--space-2` to standard spacing for any container displaying clinical data.

---

## Component Architecture

### Component Hierarchy

```
shadcn/ui Primitives
  └── MEDICA Base Components (themed variants)
       └── Clinical Components (domain-specific)
            └── Page Components (composed)
```

### Component Standards

Every component follows:

1. **TypeScript with strict types** — No implicit `any`
2. **Zod validation** for all data props
3. **Forwarded refs** via `forwardRef`
4. **Polymorphic `asChild`** via Radix Slot
5. **Controlled + uncontrolled** API parity
6. **`className` merging** via `cn()` utility
7. **Loading, empty, error states**
8. **Keyboard accessible**
9. **`data-testid` attributes** for testing

### State Patterns

```typescript
// Every data component handles four states:
interface ComponentState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
}
```

---

## Iconography

### Lucide React

All icons use the **Lucide React** library for consistency.

- **Size:** 16px (sm), 20px (default), 24px (lg)
- **Stroke width:** 1.5px (default), 2px (active)
- **Color:** `currentColor` (inherits from text color)

### Clinical Icon Guidelines

| Icon Category | Recommended Icons |
|--------------|------------------|
| Patient | `User`, `UserCircle`, `Heart`, `Activity` |
| Appointment | `Calendar`, `Clock`, `CalendarCheck` |
| Telemedicine | `Video`, `Camera`, `Monitor` |
| Records | `FileText`, `Folder`, `ClipboardList` |
| Prescriptions | `Pill`, `Flask`, `Syringe` |
| Messages | `MessageSquare`, `Mail`, `Send` |
| Vitals | `HeartPulse`, `Thermometer`, `Weight` |
| Labs | `TestTube`, `Microscope`, `Dna` |
| Alerts | `AlertCircle`, `AlertTriangle`, `Bell` |

---

## Motion & Animation

### Principles

1. **Subtle and purposeful** — Motion serves clinical clarity, not decoration
2. **Fast** — All animations complete within 200-300ms
3. **Reduced motion** — Respect `prefers-reduced-motion` media query
4. **Performance** — Use `transform` and `opacity` only; never `height`, `width`, or `top`

### Duration Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| `--duration-instant` | 0ms | No animation |
| `--duration-fast` | 150ms | Micro-interactions (hover, focus) |
| `--duration-normal` | 200ms | Standard transitions |
| `--duration-slow` | 300ms | Page transitions, modals |
| `--duration-slide` | 250ms | Slide-in panels |

### Easing Tokens

| Token | Curve | Usage |
|-------|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering |
| `--ease-in` | `cubic-bezier(0.4, 0, 0.68, 0.06)` | Elements exiting |
| `--ease-spring` | Spring(0.3, 0.8, 8, 1) | Celebratory/confirmation |

### Common Animations

- **Page transitions:** Fade + slight vertical slide (200ms)
- **Modals:** Scale up from center + backdrop fade (250ms)
- **Dropdowns:** Fade + slight vertical slide (150ms)
- **Notifications:** Slide in from top-right (300ms)
- **Loading skeletons:** Pulse opacity (1.5s loop)
- **Vitals gauge:** Animated arc (800ms spring)
- **Status changes:** Background color transition (200ms)

---

## Accessibility

### Standards

- **WCAG 2.1 Level AA** minimum (AAA targeted)
- **Section 508** compliant
- **ARIA Authoring Practices Guide** adherence

### Color Contrast

| Element | Required Ratio | Our Minimum |
|---------|---------------|-------------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18px+ bold / 24px+ regular) | 3:1 | 4.5:1 |
| UI components (borders, icons) | 3:1 | 4.5:1 |
| Clinical alerts/critical values | 3:1 | 4.5:1 |

### Focus Management

- Visible focus ring (2px blue with 2px offset)
- Focus order follows logical reading order
- Skip-to-content link for keyboard users
- Modals trap focus; return focus on close

### Screen Reader Support

- All icons have `aria-hidden` or `aria-label`
- Live regions for dynamic content updates
- Descriptive `aria-labels` on interactive controls
- Status announcements for clinical alerts

---

## Dark Mode

Dark mode uses the same color palette with adjusted luminosities:

- **Background:** `--color-neutral-900` (`#0f172a`)
- **Surface:** `--color-neutral-800` (`#1e293b`)
- **Text:** `--color-neutral-100` (`#f1f5f9`)
- **Primary accent:** `--color-primary-400` (`#60a5fa`) on dark backgrounds

Dark mode respects `prefers-color-scheme` and provides a manual toggle.
