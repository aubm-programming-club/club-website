# AUBM Programming Club Website Redesign
**Date:** 2026-04-24
**Project:** `/home/alwaleed/projects/AUBM/club-website`

---

## Overview

Full redesign of the AUBM Programming Club website for the open day. The goal is a site that looks professional enough to represent the university club to outside visitors, but intimate enough to feel like it belongs to a group of real students. Inspired by Ferrari's editorial design language (from `DESIGN.md`) adapted to a black/red palette. The existing Office-themed members page personality is preserved.

---

## Design Direction

**Ferrari Structure + Club Soul** — borrows Ferrari's editorial precision but keeps the club's warmth.

Key principles from `DESIGN.md` applied here:
- **Chiaroscuro rhythm** — alternating pure black (`#000`) and near-black (`#070707`) sections, creating a page-turn editorial cadence
- **Red (`#DA291C`) with maximum restraint** — one red element per section (eyebrow label, divider line, button, or icon accent). Never used as a fill or theme wash
- **Near-zero border radius** — `2px` on all interactive elements (buttons, pills), `50%` only for avatar circles
- **Typographic hierarchy** — Inter as FerrariSans substitute: `font-weight: 500` for headings, uppercase + `letter-spacing: 3px` for section eyebrows (Body-Font equivalent), tight line-heights on display text
- **No box-shadows on content** — depth comes from surface color contrast between sections

---

## Pages & Routes

| Route | File | Changes |
|-------|------|---------|
| `/` | `routes/home.tsx` | Full redesign — new hero, about, games, features, members teaser |
| `/members` | `routes/members.tsx` | Updated roles, Dr. Raphael title, Office cards preserved |
| `/projects` | `routes/projects.tsx` | Add booth games as real projects, keep existing projects |
| — | `components/Navbar.tsx` | New logo mark (`</>` red square), updated link styles |
| — | `components/LoadingScreen.tsx` | **Placeholder** — swap when member's repo is shared (see below) |
| — | `app/app.css` | Add scroll animation keyframes and utility classes |

---

## Scroll Animation System

Implemented via `IntersectionObserver` + CSS transitions. No library dependency.

**Bidirectional behavior:**
- Scroll **down** into a section → elements rise up from `translateY(70px)` to `0`, `opacity: 0 → 1`
- Scroll **back up** past a section → elements sink back to `translateY(70px)`, `opacity: 1 → 0`
- Scroll **up** past the top of a section → elements drop from `translateY(-40px)` (they came from above)

**Implementation:**
```tsx
// useScrollReveal hook — attach to any element
// Adds/removes .motion-in / .motion-out-down / .motion-out-up classes
// driven by IntersectionObserver + scroll direction tracking
```

**Stagger delays for grid children:**
- Child 1: `0.06s` delay
- Child 2: `0.14s` delay
- Child 3: `0.22s` delay
- Child 4: `0.30s` delay
- Child 5: `0.38s` delay

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo feel — snappy entry, no bounce)
**Duration:** `0.75s` per element

**Hero red divider line:** animates `width: 0 → 40px` on load with `transition-delay: 0.35s`.

---

## Homepage Sections (in order)

### 1. Navbar
- Left: `</>` red square mark (28×28px, `border-radius: 2px`) + "AUBM Programming Club" in white
- Right: nav links — uppercase, `letter-spacing: 1.2px`, `font-size: 11px`, `color: #444`, active = white + red bottom border
- `position: sticky`, `backdrop-filter: blur(12px)`

### 2. Hero
- Background: `#000`
- Red eyebrow: `"AUBM · Open Day 2026"` — `font-size: 10px`, `letter-spacing: 3.5px`, uppercase
- Title: `"Where students build real software."` — `font-size: 68px`, `font-weight: 500`, `letter-spacing: -2.5px`
- Red divider line: animates from 0 to 40px on load
- Subtitle: `color: #3d3d3d`
- CTAs: red primary button ("Meet the Team") + text link with arrow ("View Projects →")
- Full viewport height (`min-height: 94vh`)

### 3. About
- Background: `#070707`
- Two-column grid: left = heading + body text, right = three bullet points separated by `#0d0d0d` borders
- Red 4px dot per bullet point

### 4. Booth Games *(new section)*
- Background: `#000`
- Two editorial cards side-by-side, separated by 1px `#111` gap
- **Junior Edition** (ages 8–12): `kid_game` — fill in `hole_positions` list
- **Senior Edition** (ages 13–17): `teen_game` — complete `for x in range(...)` loop
- Each card: red tag line with preceding `—` rule, title, description, tech pills
- Pills: `background: #0a0a0a`, `border: 1px solid #161616`, `color: #333`, `border-radius: 2px`

### 5. Features
- Background: `#070707`
- 3-column grid, separated by 1px `#0d0d0d` gaps
- Icons: emoji (⚡ 🏆 🤝) in `font-size: 20px`
- Title: `color: #aaa`, body: `color: #252525`

### 6. Members Teaser
- Background: `#000`
- Show first 4 members in a 4-column grid (President, VP, Secretary, Treasurer)
- Office camera cards preserved exactly (REC dot, viewfinder corners, lower-third name bar, tape counter)
- "View All Members →" text link below

### 7. Footer
- `border-top: 1px solid #0d0d0d`
- Left: red brand name, right: copyright in `color: #181818`

---

## Member Roles (all 10)

| Name | Role | Office Character |
|------|------|-----------------|
| Zeina Obeid | President | The Michael Scott |
| Alwalid Hemaid | Vice President | The Dwight Schrute |
| Emmanuel Abo Samra | Secretary | The Jim Halpert |
| Kai Doddy | Treasurer | The Kevin Malone |
| Stephanos | Technical Lead | The Stanley Hudson |
| Lea | Head of Design | The Pam Beesly |
| Lucas | Web Developer | The Ryan Howard |
| Mariam | Quality Lead | The Angela Martin |
| Jad | Events Coordinator | The Andy Bernard |
| Dr. Raphael | Technical Advisor | The Oscar Martinez |

All quotes and descriptions are preserved from the existing `members.tsx`. Only roles and Dr. Raphael's title are changed.

---

## Projects Page

Add two new project cards for the booth games alongside the existing projects:

**Booth Game — Junior Edition**
- Description: Interactive pygame coding game for ages 8–12. Players fill a Python list to make a character jump over holes.
- Tech: `["Python", "Pygame"]`
- No GitHub link (local project)

**Booth Game — Senior Edition**
- Description: Interactive pygame coding game for ages 13–17. Players complete a `for` loop using `range()` to schedule all three jumps.
- Tech: `["Python", "Pygame"]`
- No GitHub link (local project)

Existing `CampusConnect` and `AlgoViz` cards are kept as-is.

---

## Loading Screen

**Current state:** `components/LoadingScreen.tsx` has a pulsing `</>` with red loading bar — functional, session-gated.

**Planned swap:** Replace with custom loading screen built by a club member (hosted at `aub-med-loading.vercel.app`). Awaiting source repo.

**Interface contract (must not change):**
```tsx
// The new component must accept this exact prop and call it when animation ends
interface LoadingScreenProps {
  onDone: () => void;
}
```

The session-storage guard in `home.tsx` (`sessionStorage.getItem("visited")`) stays unchanged. No other files need to change for the swap.

**TODO:** When repo is received — extract component, match `onDone` interface, replace `LoadingScreen.tsx`.

---

## Stats Bar

Removed from the design for now. No real numbers to display yet.

**TODO (future):** Add a stats bar between Hero and About sections when the club has meaningful numbers to show (e.g. members count, projects shipped, hackathons entered, semesters active). Implementation: a `<StatsBar>` component with a `stats: { value: string; label: string }[]` prop, rendered as a flex row with `border-right: 1px solid #111` separators and red number values.

---

## Color Reference

| Role | Value |
|------|-------|
| Primary red (CTA, accents) | `#DA291C` |
| Background dark | `#000000` |
| Background near-dark | `#070707` |
| Section dividers | `#0d0d0d` or `#111` |
| Body text (visible) | `#3a3a3a` – `#aaa` |
| Body text (ghost) | `#252525` – `#1c1c1c` |
| Red hover | `#b8221a` |

---

## Files to Create / Modify

| Action | File | Notes |
|--------|------|-------|
| Modify | `app/routes/home.tsx` | Full rewrite of all sections |
| Modify | `app/routes/members.tsx` | Role updates + Dr. title |
| Modify | `app/routes/projects.tsx` | Add booth game cards |
| Modify | `app/components/Navbar.tsx` | New logo mark + link styles |
| Modify | `app/components/LoadingScreen.tsx` | Keep as-is; mark with TODO comment |
| Modify | `app/app.css` | Scroll animation classes |
| Create | `app/hooks/useScrollReveal.ts` | IntersectionObserver hook |
