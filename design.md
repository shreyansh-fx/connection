# Campus Collab — Design System & UI Specification

> **Target Tool:** Google Stitch / UI Generation  
> **Source Page:** Login / Campus Auth (`app/login/page.tsx`)  
> **Design Philosophy:** Modern Collegiate Collaboration Hub — Material 3 influenced, high-trust academic SaaS, clean elevation, structured contrast, and purposeful micro-details.

---

## 1. Visual Theme & Style Principles

1. **Academic & Collegiate Trust:** Clean, structured, verified atmosphere tailored for collegiate builders, researchers, and hackathon teams.
2. **Material 3 Token Architecture:** Color tokens adhere to surface, surface-container tiers (lowest to highest), primary, secondary, tertiary, and on-* foreground pairs.
3. **Elevated Glass & Atmosphere:** Soft atmospheric background glows (`blur-3xl`, 40-50% opacity), backdrop blurs (`backdrop-blur-md`), and subtle radial background dot matrices.
4. **High-Contrast Micro-Badging:** Rounded pills, status indicators with pulse animations, verified icons, and uppercase label tags.

---

## 2. Color Palette & Design Tokens

### Primary (Indigo / Violet)
- **Primary:** `#3525CD` — Core brand actions, key callouts, primary badges
- **Primary Container:** `#4F46E5` — Active highlights, hero accent text, focal icon backgrounds
- **Primary Fixed:** `#E2DFFF` — Soft tinted tag backgrounds, badge fills
- **Primary Fixed Dim:** `#C3C0FF`
- **On-Primary:** `#FFFFFF` — Text on primary surfaces
- **On-Primary Fixed:** `#0F0069`
- **On-Primary Fixed Variant:** `#3323CC`

### Secondary (Deep Periwinkle / Blue-Purple)
- **Secondary:** `#4648D4`
- **Secondary Container:** `#6063EE` — Secondary avatar backgrounds, interactive cards
- **Secondary Fixed:** `#E1E0FF` — Atmospheric glow blurs, tag fills
- **Secondary Fixed Dim:** `#C0C1FF`
- **On-Secondary:** `#FFFFFF`
- **On-Secondary Fixed:** `#07006C`

### Tertiary & Accents (Warm Terracotta / Coral)
- **Tertiary:** `#7E3000`
- **Tertiary Container:** `#A44100` — Attention badges, specialty track icons
- **Tertiary Fixed:** `#FFDBCC` — "NEED SOMEONE" badge background
- **On-Tertiary:** `#FFFFFF`
- **On-Tertiary Fixed:** `#351000`
- **Success / Live Green:** `#10B981` (Emerald 500) / `#059669` (Emerald 600) — Pulse dots, verification checks

### Surface Tiers & Backgrounds
- **Background / Surface:** `#FBF8FC` — Main page canvas (warm tinted white/off-white)
- **Surface Dim:** `#DCD9DD`
- **Surface Bright:** `#FBF8FC`
- **Surface Container Lowest:** `#FFFFFF` — Primary elevated cards, modal containers, Google login card
- **Surface Container Low:** `#F6F2F7` — Inner nested profile cards, pill container fills
- **Surface Container:** `#F0EDF1`
- **Surface Container High:** `#EAE7EB` — Tag pills, tertiary container pills
- **Surface Container Highest:** `#E4E1E6`

### Typography & Outline Colors
- **On-Surface (Headings & Dark Text):** `#1B1B1E` — High contrast body and titles
- **On-Surface Variant (Muted/Secondary Text):** `#464555` — Subtitles, helper descriptions, meta tags
- **Outline:** `#777587` — Dividers, active borders
- **Outline Variant:** `#C7C4D8` — Subtle card borders, header/footer separation lines

---

## 3. Typography Hierarchy

### Font Families
- **Primary Sans:** `Plus Jakarta Sans`, system sans-serif (`--font-plus-jakarta`)
- **Monospace / Code:** `JetBrains Mono`, monospace (`--font-jetbrains-mono`)
- **Icons:** `Material Symbols Outlined` (Google Fonts, filled or outlined)

### Type Scale
| Token / Utility | Font Size | Line Height | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `font-display-hero` | `48px` (3rem) | `56px` | 700 (Bold) | `-0.03em` | Hero main headline |
| `font-headline-lg` | `32px` (2rem) | `40px` | 600–700 | `-0.025em` | Modal / Card headings |
| `font-headline-md` | `22px` (1.375rem) | `28px` | 600 (Semi-bold)| `-0.015em` | Section headers |
| `font-headline-sm` | `18px` (1.125rem) | `24px` | 600 (Semi-bold)| `-0.01em` | Card titles, avatar initials, brand mark |
| `font-body-lg` | `16px` (1rem) | `26px` | 400 (Regular) | `-0.005em` | Hero subheadings, primary button text |
| `font-body-md` | `14px` (0.875rem) | `22px` | 400 (Regular) | `0em` | Standard body descriptions |
| `font-body-sm` | `13px` (0.8125rem)| `18px` | 400 (Regular) | `0em` | Card meta info, helper callouts |
| `font-label-md` | `14px` (0.875rem) | `20px` | 500 (Medium) | `0em` | Navigation items, form labels |
| `font-label-sm` | `12px` (0.75rem) | `16px` | 500–600 | `+0.01em` | Pill badges, uppercase labels, trust stats |
| `font-code-sm` | `12px` (0.75rem) | `16px` | 400–600 | `-0.01em` | JetBrains Mono code tags, version badges |

---

## 4. Spacing & Layout Tokens

```css
--spacing-space-xs: 0.25rem;  /* 4px */
--spacing-space-sm: 0.5rem;   /* 8px */
--spacing-space-md: 1rem;     /* 16px */
--spacing-space-lg: 1.5rem;   /* 24px */
--spacing-space-xl: 2.5rem;   /* 40px */

--spacing-gutter-mobile: 1rem;
--spacing-gutter: 1.5rem;
--spacing-margin-mobile: 1rem;
--spacing-margin: 2rem;
```

- **Border Radius:**
  - Small pills / Badges: `rounded-full` (`9999px`)
  - Sub-cards / Buttons / Inputs: `rounded-lg` (`8px` to `12px`)
  - Main Cards / Panels: `rounded-xl` (`16px` to `20px`)
- **Shadows:**
  - Standard cards: `shadow-sm` or `shadow-md`
  - Floating auth card: `shadow-xl`
  - Floating connectors / icons: `shadow-lg ring-4 ring-primary-fixed/50`

---

## 5. UI Layout & Architecture

```
+-------------------------------------------------------------------------------+
| Header: [Logo + Campus Collab]                  [Pulse Dot • Verified Network]|
+-------------------------------------------------------------------------------+
|                                                                               |
|  [LEFT: 7 Cols - Storytelling & Mechanics]     [RIGHT: 5 Cols - Sign In Card] |
|                                                                               |
|  * Verified .edu Pill                          * Gradient Top Accent Bar      |
|  * Hero: "Find the right people to build with" * Brand Logo Mark              |
|  * Subtitle                                    * "Sign in to Campus Collab"   |
|                                                * Google OAuth Button          |
|  +-- Matchmaking Visualization Box ---------+  * Lock helper text             |
|  | [Card A: I CAN DO] <-> [Match 98%] <->   |  * .edu Domain restriction box  |
|  |                        [Card B: NEED]    |  * Checklist (Sync / Passwords) |
|  | Verified Students Roster Pill            |  * Terms & Privacy links        |
|  +------------------------------------------+                                 |
|                                                                               |
|  * Trending Track Pills (Hackathons, AI...)                                   |
|  * Builder Avatar Stack + Version Code                                        |
+-------------------------------------------------------------------------------+
| Footer: Copyright & Academic Safety Protocol Active                           |
+-------------------------------------------------------------------------------+
```

---

## 6. Key Components Specification

### 1. Brand Logo Mark
- **Dimensions:** 32x32px (`w-8 h-8`), rounded-lg (`rounded-lg`)
- **Color:** `#3525CD` (`bg-primary`), white bold letter `C` centered
- **Auth Card Variant:** 56x56px (`w-14 h-14`) with embedded emblem in `bg-surface-container-low`

### 2. Google OAuth Button
- **Height:** 48px (`h-12`)
- **Background:** `#FFFFFF` (`bg-surface-container-lowest`), subtle border/shadow (`shadow-md`)
- **Hover State:** `hover:bg-surface-container-low`, `active:scale-[0.99]`, smooth transitions
- **Icon:** Standard 4-color Google 'G' SVG icon (20x20px), scale on hover (`group-hover:scale-105`)
- **Typography:** `font-headline-sm text-body-lg text-on-surface font-semibold` ("Continue with Google")
- **Loading State:** Spinning dual-color ring with "Redirecting to Google..."

### 3. Matchmaking Visualization Unit
- **Container:** `bg-surface-container-lowest`, `shadow-md`, `rounded-xl`, fine dot grid pattern (`radial-gradient(#1B1B1E 1px, transparent 1px)` at 16px grid, 3% opacity).
- **Profile Sub-Cards:** `w-full md:w-5/12`, `bg-surface-container-low`, `rounded-lg`, hover elevation (`hover:-translate-y-0.5`).
  - Initials circle avatar with distinctive colors (Primary `#3525CD` vs Secondary `#6063EE`).
  - Uppercase role status badge:
    - *Offer Badge:* `bg-primary-fixed text-on-primary-fixed-variant` ("I CAN DO")
    - *Seek Badge:* `bg-tertiary-fixed text-on-tertiary-fixed` ("NEED SOMEONE")
  - Project/Event association pill with live indicator dot.
- **Connector Hub:**
  - Circular badge: 48x48px (`w-12 h-12 rounded-full bg-primary-container text-white shadow-lg ring-4 ring-primary-fixed/50`).
  - Icon: `auto_awesome` (Material Symbols with `FILL 1`).
  - Score badge: `font-code-sm text-primary font-semibold tracking-wider` ("Match 98%").

### 4. Verified Policy Callout Box
- **Container:** `bg-surface-container-low rounded-lg p-4 shadow-sm`
- **Icon:** `verified` in `text-primary-container` (18px)
- **Title:** `font-label-sm font-semibold text-on-surface` ("University Restriction Active")
- **Body:** Description highlighting supported domains with code pills (`.edu`, `.ac.in`) in `font-code-sm text-primary bg-transparent`.

### 5. Pill Badges & Chips
- **Status Pills:** `rounded-full px-3 py-1 bg-surface-container-lowest shadow-sm flex items-center gap-1.5`
- **Pulse Indicators:** 8x8px (`w-2 h-2 rounded-full`) with `animate-pulse` (Emerald `#10B981` or Primary `#4F46E5`).

---

## 7. Stitch Generation Prompt (Ready to Copy)

When creating new pages or components in Stitch that match this exact design, use the following prompt:

```text
Design a responsive web interface for "Campus Collab", a verified collegiate collaboration and team-matching platform.

Design System Specifications:
- Style: Material 3 tokenized collegiate SaaS, clean, modern, high trust.
- Color Palette:
  * Primary: #3525CD (Indigo), Primary Container: #4F46E5, Primary Fixed Tint: #E2DFFF
  * Secondary: #4648D4, Secondary Container: #6063EE, Secondary Fixed: #E1E0FF
  * Tertiary Accent: #7E3000 / #A44100 (Terracotta), Tertiary Fixed: #FFDBCC
  * Surfaces: Main Canvas #FBF8FC, Elevated White #FFFFFF, Container Low #F6F2F7, Container High #EAE7EB
  * Text: On-Surface #1B1B1E, Muted Subtitles #464555, Outline #C7C4D8
  * Accent/Live: Emerald #10B981 pulse dots
- Typography: Plus Jakarta Sans for UI/headings, JetBrains Mono for tags/code metrics, and Google Material Symbols Outlined for iconography.
- Shapes: Pill tags (rounded-full), cards (rounded-xl with subtle shadow-md), buttons (rounded-lg h-12).
- Atmosphere: Soft ambient background blurs (primary-fixed/40 and secondary-fixed/50), subtle 16px dot matrix grids, top accent gradient bar (primary to secondary).
- Layout: Modern split or card-grid layout, verified campus badge header, high-contrast readable typography.
```
