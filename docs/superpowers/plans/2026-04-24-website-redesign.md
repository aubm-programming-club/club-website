# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the AUBM Programming Club website with Ferrari-inspired editorial aesthetics, bidirectional scroll animations, booth games integration, and updated member roles.

**Architecture:** Each page is a standalone React Router v7 route. A shared `useScrollReveal` hook manages IntersectionObserver-based bidirectional scroll animations via CSS class toggling. All styling is Tailwind v4 utility classes with arbitrary values for custom hex colors.

**Tech Stack:** React Router v7 (framework mode), Tailwind CSS v4, TypeScript, `IntersectionObserver` API (no animation library)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `app/app.css` | Scroll animation CSS classes + hero line animation |
| Create | `app/hooks/useScrollReveal.ts` | IntersectionObserver hook — bidirectional scroll reveal |
| Modify | `app/components/Navbar.tsx` | Red `</>` mark logo + updated link styles |
| Modify | `app/components/LoadingScreen.tsx` | Add TODO comment for future swap |
| Modify | `app/routes/home.tsx` | Full rewrite — all 7 sections |
| Modify | `app/routes/members.tsx` | Updated roles + Dr. Raphael title + scroll hook |
| Modify | `app/routes/projects.tsx` | Add booth game project cards + scroll hook |

---

## Task 1: Scroll Animation CSS

**Files:**
- Modify: `app/app.css`

- [ ] **Add scroll animation classes to `app/app.css`**

Replace the entire file with:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

html,
body {
  @apply bg-black;
}

@keyframes loadbar {
  from { width: 0%; }
  to   { width: 100%; }
}

.loading-bar {
  animation: loadbar 2s ease-out forwards;
}

/* ── Scroll reveal system ── */
.motion {
  opacity: 0;
  transform: translateY(70px);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
.motion-in {
  opacity: 1;
  transform: translateY(0);
}
.motion-out-down {
  opacity: 0;
  transform: translateY(70px);
}
.motion-out-up {
  opacity: 0;
  transform: translateY(-40px);
}
.motion-d1 { transition-delay: 0.06s; }
.motion-d2 { transition-delay: 0.14s; }
.motion-d3 { transition-delay: 0.22s; }
.motion-d4 { transition-delay: 0.30s; }
.motion-d5 { transition-delay: 0.38s; }

/* ── Hero divider line ── */
.hero-line {
  height: 2px;
  background: #DA291C;
  width: 0;
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
}
.hero-line-in {
  width: 40px;
}
```

- [ ] **Commit**

```bash
git add app/app.css
git commit -m "style: add scroll reveal animation system and hero line CSS"
```

---

## Task 2: useScrollReveal Hook

**Files:**
- Create: `app/hooks/useScrollReveal.ts`

- [ ] **Create `app/hooks/useScrollReveal.ts`**

```ts
import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    let lastY = window.scrollY;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const goingDown = window.scrollY >= lastY;
          if (entry.isIntersecting) {
            entry.target.classList.remove("motion-out-down", "motion-out-up");
            entry.target.classList.add("motion-in");
          } else {
            entry.target.classList.remove("motion-in");
            if (goingDown) {
              entry.target.classList.add("motion-out-up");
              entry.target.classList.remove("motion-out-down");
            } else {
              entry.target.classList.add("motion-out-down");
              entry.target.classList.remove("motion-out-up");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const onScroll = () => {
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.querySelectorAll(".motion").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
```

- [ ] **Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Commit**

```bash
git add app/hooks/useScrollReveal.ts
git commit -m "feat: add bidirectional scroll reveal hook"
```

---

## Task 3: Navbar

**Files:**
- Modify: `app/components/Navbar.tsx`

- [ ] **Replace `app/components/Navbar.tsx`**

```tsx
import { Link, useLocation } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/members", label: "Members" },
  { to: "/projects", label: "Projects" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#111] flex items-center justify-between h-[58px] px-20">
      <Link to="/" className="flex items-center gap-2.5 no-underline group">
        <div className="w-7 h-7 bg-[#DA291C] rounded-[2px] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-black leading-none">&lt;/&gt;</span>
        </div>
        <span className="text-white text-[13px] font-semibold tracking-[0.4px]">
          AUBM Programming Club
        </span>
      </Link>
      <ul className="flex gap-7 list-none m-0 p-0">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`text-[11px] font-medium tracking-[1.2px] uppercase no-underline transition-colors duration-200 ${
                location.pathname === to
                  ? "text-white border-b border-[#DA291C] pb-0.5"
                  : "text-[#444] hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Start dev server and verify navbar visually**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify:
- Red `</>` square on left
- "AUBM Programming Club" in white next to it
- Three nav links in dark gray, uppercase, spaced
- Active page link shows white text with red bottom border
- Nav is sticky (stays at top on scroll)

- [ ] **Commit**

```bash
git add app/components/Navbar.tsx
git commit -m "feat: redesign navbar with red mark logo and Ferrari link styles"
```

---

## Task 4: LoadingScreen TODO Comment

**Files:**
- Modify: `app/components/LoadingScreen.tsx`

- [ ] **Add TODO comment to `app/components/LoadingScreen.tsx`**

Add the comment at the top of the file, after the import:

```tsx
import { useEffect, useState } from "react";

// TODO: Replace this component with the custom loading screen from the club member's repo
// (currently hosted at aub-med-loading.vercel.app — awaiting source repo).
// The new component must accept: { onDone: () => void }
// and call onDone() when its animation finishes. No other files need to change.
export function LoadingScreen({ onDone }: { onDone: () => void }) {
  // ... rest of file unchanged
```

- [ ] **Commit**

```bash
git add app/components/LoadingScreen.tsx
git commit -m "chore: mark LoadingScreen for future replacement with custom component"
```

---

## Task 5: Home Page

**Files:**
- Modify: `app/routes/home.tsx`

- [ ] **Replace `app/routes/home.tsx` with the full redesign**

```tsx
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { LoadingScreen } from "../components/LoadingScreen";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AUBM Programming Club" },
    {
      name: "description",
      content:
        "A student-run programming club at American University of Beirut Mediterranean.",
    },
  ];
}

export default function Home() {
  const [shouldShowLoadingScreen, setShouldShowLoadingScreen] = useState(false);
  const [heroLineIn, setHeroLineIn] = useState(false);
  useScrollReveal();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      if (!sessionStorage.getItem("visited")) {
        sessionStorage.setItem("visited", "1");
        setShouldShowLoadingScreen(true);
      }
    }
    const t = setTimeout(() => setHeroLineIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleLoadDone = useCallback(
    () => setShouldShowLoadingScreen(false),
    []
  );

  return (
    <>
      {shouldShowLoadingScreen && <LoadingScreen onDone={handleLoadDone} />}
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />

        {/* ── Hero ── */}
        <section className="bg-black border-b border-[#0d0d0d] px-20 min-h-[94vh] flex flex-col justify-center pt-24 pb-20">
          <p className="motion text-[#DA291C] text-[10px] tracking-[3.5px] uppercase font-semibold mb-1">
            AUBM · Open Day 2026
          </p>
          <h1 className="motion motion-d1 text-white font-medium leading-[1.04] tracking-[-2.5px] max-w-[620px] text-[68px] mt-4">
            Where students
            <br />
            build real software.
          </h1>
          <div className={`hero-line my-6${heroLineIn ? " hero-line-in" : ""}`} />
          <p className="motion motion-d2 text-[#3d3d3d] text-[15px] leading-[1.75] max-w-[420px] mb-9">
            A tight-knit programming club at American University of Beirut
            Mediterranean. We write code, ship projects, and invite you to try
            one right now.
          </p>
          <div className="motion motion-d3 flex gap-4 items-center">
            <Link
              to="/members"
              className="bg-[#DA291C] hover:bg-[#b8221a] text-white text-[11px] font-semibold tracking-[1.5px] uppercase px-7 py-3 rounded-[2px] transition-colors no-underline"
            >
              Meet the Team
            </Link>
            <Link
              to="/projects"
              className="text-[#333] hover:text-[#777] text-[11px] tracking-[1.2px] uppercase font-medium transition-colors no-underline flex items-center gap-2"
            >
              View Projects <span>→</span>
            </Link>
          </div>
        </section>

        {/* TODO: StatsBar — add between Hero and About when the club has real
            numbers to show (members count, projects shipped, hackathons entered,
            semesters active). See spec for implementation details. */}

        {/* ── About ── */}
        <section className="bg-[#070707] border-b border-[#0d0d0d] px-20 py-24 grid grid-cols-2 gap-20 items-start">
          <div>
            <p className="motion text-[#DA291C] text-[9px] tracking-[3px] uppercase font-semibold mb-4">
              About the Club
            </p>
            <h2 className="motion motion-d1 text-white text-[30px] font-medium leading-[1.2] tracking-[-0.6px] mb-5">
              A place for builders
              <br />
              at AUBM.
            </h2>
            <p className="motion motion-d2 text-[#3a3a3a] text-[14px] leading-[1.78]">
              UniCode Club is a student-run organisation dedicated to
              programming, collaboration, and real-world software. We welcome
              everyone — from first-year coders to seasoned builders.
            </p>
          </div>
          <div>
            {aboutPoints.map((point, i) => (
              <div
                key={point.title}
                className={`motion motion-d${i + 1} flex gap-4 items-start py-5 border-b border-[#0d0d0d] last:border-0 first:pt-1`}
              >
                <div className="w-1 h-1 rounded-full bg-[#DA291C] mt-[6px] shrink-0" />
                <div>
                  <p className="text-[#666] font-semibold text-[10px] tracking-[1px] uppercase mb-1">
                    {point.title}
                  </p>
                  <p className="text-[#2e2e2e] text-[13px] leading-[1.65]">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Booth Games ── */}
        <section className="bg-black border-b border-[#0d0d0d] px-20 py-24">
          <p className="motion text-[#DA291C] text-[9px] tracking-[3px] uppercase font-semibold mb-4">
            Open Day · Try It Now
          </p>
          <h2 className="motion motion-d1 text-white text-[30px] font-medium tracking-[-0.6px] mb-3">
            Our Booth Games
          </h2>
          <p className="motion motion-d2 text-[#2e2e2e] text-[13.5px] leading-[1.72] max-w-[500px] mb-10">
            We built two interactive coding games for today. Write a few lines
            of Python, press Enter, and watch your character jump across the
            screen. No experience needed.
          </p>
          <div className="grid grid-cols-2 gap-[1px] bg-[#111]">
            {boothGames.map((game, i) => (
              <div
                key={game.title}
                className={`motion motion-d${i + 1} bg-[#070707] p-10 hover:bg-[#0a0a0a] transition-colors`}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-4 h-px bg-[#DA291C] shrink-0" />
                  <span className="text-[#DA291C] text-[8px] tracking-[2.5px] uppercase font-semibold">
                    {game.tag}
                  </span>
                </div>
                <h3 className="text-white text-[22px] font-medium tracking-[-0.3px] mb-3">
                  {game.title}
                </h3>
                <p className="text-[#333] text-[13px] leading-[1.72] mb-6">
                  {game.description}
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {game.tech.map((t) => (
                    <span
                      key={t}
                      className="bg-[#0a0a0a] border border-[#161616] text-[#333] text-[9px] tracking-[1px] uppercase px-3 py-1 rounded-[2px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="bg-[#070707] border-b border-[#0d0d0d] px-20 py-24">
          <p className="motion text-[#DA291C] text-[9px] tracking-[3px] uppercase font-semibold mb-4">
            What We Do
          </p>
          <h2 className="motion motion-d1 text-white text-[30px] font-medium tracking-[-0.6px]">
            Club Activities
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-[1px] bg-[#0d0d0d]">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`motion motion-d${i + 1} bg-[#070707] p-10 hover:bg-[#0b0b0b] transition-colors`}
              >
                <div className="text-[20px] mb-4">{f.icon}</div>
                <h3 className="text-[#aaa] text-[13.5px] font-semibold mb-2">
                  {f.title}
                </h3>
                <p className="text-[#252525] text-[12px] leading-[1.68]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Members Teaser ── */}
        <section className="bg-black border-b border-[#0d0d0d] px-20 py-24">
          <p className="motion text-[#DA291C] text-[9px] tracking-[3px] uppercase font-semibold mb-4">
            The Team
          </p>
          <h2 className="motion motion-d1 text-white text-[30px] font-medium tracking-[-0.6px] mb-2">
            Meet the people behind the club.
          </h2>
          <p className="motion motion-d2 text-[#2e2e2e] text-[13px] leading-[1.7] mb-10">
            Ten members, one shared obsession.
          </p>
          <div className="grid grid-cols-4 gap-[1px] bg-[#111]">
            {teaserMembers.map((m, i) => (
              <MemberCard key={m.name} member={m} delay={i + 1} />
            ))}
          </div>
          <div className="motion motion-d5 text-center mt-9">
            <Link
              to="/members"
              className="text-[#252525] text-[10px] tracking-[2.5px] uppercase no-underline border-b border-[#1a1a1a] pb-0.5 hover:text-[#777] hover:border-[#555] transition-colors"
            >
              View All Members →
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-auto bg-black border-t border-[#0d0d0d] px-20 py-7 flex items-center justify-between">
          <span className="text-[#DA291C] text-[11px] font-bold tracking-[1px]">
            AUBM Programming Club
          </span>
          <span className="text-[#181818] text-[9px] tracking-[1.5px] uppercase">
            © {new Date().getFullYear()} · All rights reserved
          </span>
        </footer>
      </div>
    </>
  );
}

/* ── Sub-components ── */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function MemberCard({
  member,
  delay,
}: {
  member: (typeof teaserMembers)[number];
  delay: number;
}) {
  return (
    <div className={`motion motion-d${delay} bg-[#060606] overflow-hidden`}>
      {/* Camera top bar */}
      <div className="bg-black px-3 py-2 flex items-center justify-between border-b border-[#0a0a0a]">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DA291C] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#DA291C]" />
          </span>
          <span className="text-[#DA291C] text-[6.5px] tracking-[1.5px] font-bold">
            REC
          </span>
        </div>
        <span className="text-[#141414] text-[6.5px] font-mono">
          00:00:00:00
        </span>
      </div>
      {/* Avatar */}
      <div className="bg-black py-6 px-3 flex items-center justify-center border-b-2 border-[#DA291C]">
        <div className="w-[50px] h-[50px] rounded-full bg-[#0a0a0a] border border-[#151515] flex items-center justify-center text-[#DA291C] text-[13px] font-bold select-none">
          {getInitials(member.name)}
        </div>
      </div>
      {/* Name + role + quote */}
      <div className="px-3.5 pt-3 pb-4">
        <p className="text-white text-[12px] font-semibold">{member.name}</p>
        <p className="text-[#DA291C] text-[7px] tracking-[2px] uppercase mt-0.5">
          {member.role}
        </p>
        <blockquote className="text-[#1c1c1c] text-[9px] italic mt-2.5 leading-[1.5] border-l-2 border-[#111] pl-2">
          {member.quote}
        </blockquote>
      </div>
    </div>
  );
}

/* ── Data ── */

const aboutPoints = [
  {
    title: "Weekly Coding Sessions",
    body: "Practice algorithms, build projects, sharpen skills every week.",
  },
  {
    title: "Hackathons & Competitions",
    body: "University-wide and national events — compete, create, win.",
  },
  {
    title: "Open to All Levels",
    body: "Whether you've written one line or ten thousand, you belong here.",
  },
];

const boothGames = [
  {
    tag: "Ages 8–12",
    title: "Junior Edition",
    description:
      "Fill in a list of jump positions, press Enter, and watch the character leap over holes. One list, instant result. Pure beginner-friendly fun.",
    tech: ["Python", "Pygame", "Kid Game"],
  },
  {
    tag: "Ages 13–17",
    title: "Senior Edition",
    description:
      "Use a for loop with range() to schedule all three jumps. Two lines of code. The correct answer sends the character flying across the finish.",
    tech: ["Python", "Pygame", "Teen Game"],
  },
];

const features = [
  {
    icon: "⚡",
    title: "Weekly Coding Sessions",
    description:
      "Algorithms, competitive programming, and project sprints every week.",
  },
  {
    icon: "🏆",
    title: "Hackathons",
    description:
      "University-wide and national competitions — build fast, build well.",
  },
  {
    icon: "🤝",
    title: "Open Collaboration",
    description:
      "Real projects with real teammates. Build a portfolio that matters.",
  },
];

const teaserMembers = [
  {
    name: "Zeina Obeid",
    role: "President",
    quote:
      "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love my code.",
  },
  {
    name: "Alwalid Hemaid",
    role: "Vice President",
    quote:
      "Identity theft is not a joke, Emmanuel! Millions of GitHub accounts suffer every year.",
  },
  {
    name: "Emmanuel Abo Samra",
    role: "Secretary",
    quote:
      "I just changed all of Alwalid's VS Code shortcuts. He's been using Notepad for two hours and hasn't noticed.",
  },
  {
    name: "Kai Doddy",
    role: "Treasurer",
    quote: "Why waste time write lot code when few code do trick?",
  },
];
```

- [ ] **Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Verify home page visually (`npm run dev`)**

Open `http://localhost:5173`. Check:
- Hero text is large (68px), red divider line grows in on load
- Scrolling down: each section's elements float up into view
- Scrolling back up: elements sink back down as you pass them
- Booth Games section shows two cards side by side
- Members teaser shows 4 camera-style cards with pulsing REC dot
- Footer has red brand name on left, gray copyright on right

- [ ] **Commit**

```bash
git add app/routes/home.tsx
git commit -m "feat: redesign home page with Ferrari editorial layout and scroll animations"
```

---

## Task 6: Members Page

**Files:**
- Modify: `app/routes/members.tsx`

- [ ] **Update `app/routes/members.tsx`**: add `useScrollReveal` import + call, update the `members` array with new roles and Dr. Raphael title, add `motion` classes to the page header and member cards

Replace the file:

```tsx
import type { Route } from "./+types/members";
import { Navbar } from "../components/Navbar";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Members — AUBM Programming Club" },
    {
      name: "description",
      content: "Meet the team behind the AUBM Programming Club.",
    },
  ];
}

const members = [
  {
    name: "Zeina Obeid",
    role: "President",
    officeCharacter: "The Michael Scott",
    quote:
      "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love my code.",
    description:
      "The enthusiastic leader who somehow holds everything together through sheer charisma and questionable coding puns. Started the club because she wanted a family, got a dev team instead.",
  },
  {
    name: "Alwalid Hemaid",
    role: "Vice President",
    officeCharacter: "The Dwight Schrute",
    quote:
      "Identity theft is not a joke, Emmanuel! Millions of GitHub accounts suffer every year.",
    description:
      "Self-appointed assistant-to-the-president who takes every hackathon like it's a matter of life and death. Has a backup of every repo on three separate hard drives.",
  },
  {
    name: "Emmanuel Abo Samra",
    role: "Secretary",
    officeCharacter: "The Jim Halpert",
    quote:
      "I just changed all of Alwalid's VS Code shortcuts. He's been using Notepad for two hours and hasn't noticed.",
    description:
      "The laid-back talent who ships clean code between pranking Alwalid's dev environment. Somehow always meets deadlines despite looking like he's doing nothing.",
  },
  {
    name: "Kai Doddy",
    role: "Treasurer",
    officeCharacter: "The Kevin Malone",
    quote: "Why waste time write lot code when few code do trick?",
    description:
      'Writes code that somehow works despite no one understanding how. Famous for one-liner solutions that replace entire modules. His debugging strategy is "delete stuff until it works."',
  },
  {
    name: "Stephanos",
    role: "Technical Lead",
    officeCharacter: "The Stanley Hudson",
    quote: "Did I stutter? The function returns null. Read the docs.",
    description:
      "Does not want to be here on weekends, but his code reviews are brutally honest and always right. Lives for 5 PM and pretzel day. Will not attend standup if it goes past 15 minutes.",
  },
  {
    name: "Lea",
    role: "Head of Design",
    officeCharacter: "The Pam Beesly",
    quote:
      "I suggested we use a better color palette once. Now I'm the entire design department.",
    description:
      "The creative heart of the club who turns everyone's terrible wireframes into actual art. Started as the one person who knew Figma — now runs the whole frontend aesthetic.",
  },
  {
    name: "Lucas",
    role: "Web Developer",
    officeCharacter: "The Ryan Howard",
    quote:
      "It's not just another CRUD app. It's a disruptive platform for synergizing digital ecosystems.",
    description:
      "Always pitching the next big startup idea at standup. Has 14 unfinished side projects and a pitch deck for each one. Learned React last week, already mass-refactoring the codebase.",
  },
  {
    name: "Mariam",
    role: "Quality Lead",
    officeCharacter: "The Angela Martin",
    quote: "I don't care if it works on your machine. It doesn't pass MY tests.",
    description:
      "The strict code standards enforcer — your PR will NOT pass if there's a single lint warning. Maintains a spreadsheet ranking members by code quality. Nobody has ever scored above a 7.",
  },
  {
    name: "Jad",
    role: "Events Coordinator",
    officeCharacter: "The Andy Bernard",
    quote: "I went to hackathon. Just thought you should know.",
    description:
      "Brings the energy to every meetup and will not stop talking about that one hackathon he placed in. Organizes every club event with the intensity of someone planning a world tour.",
  },
  {
    name: "Dr. Raphael",
    role: "Technical Advisor",
    officeCharacter: "The Oscar Martinez",
    quote:
      "Actually, that's an O(n²) solution. Let me show you the optimal approach.",
    description:
      "The smartest person in the room who will politely correct your Big-O analysis mid-presentation. Always has the right answer and the documentation to back it up.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((n) => !n.startsWith("Dr"))
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Members() {
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
        }}
      />

      <Navbar />

      {/* Title card */}
      <section className="bg-black border-b border-[#0d0d0d] text-white py-20 px-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.7)_100%)]" />
        <div className="relative max-w-2xl">
          <p className="motion text-[#DA291C] text-[9px] font-mono tracking-[3px] uppercase mb-3 opacity-80">
            UniCode Original Documentary Series
          </p>
          <h1 className="motion motion-d1 text-5xl font-extrabold tracking-tight mb-4">
            The Team
          </h1>
          <div className="motion motion-d2 inline-block border-l-4 border-[#DA291C] pl-4 text-left">
            <p className="text-gray-300 text-base font-medium">
              A UniCode Club Documentary
            </p>
            <p className="text-gray-500 text-sm font-mono">
              Filmed on location at AUBM · Season 1
            </p>
          </div>
        </div>
      </section>

      {/* Members grid */}
      <section className="py-16 px-20 flex-1 bg-[#070707]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <MemberCard key={member.name} member={member} delay={((i % 3) + 1) as 1 | 2 | 3} />
          ))}
        </div>
      </section>

      <footer className="bg-black border-t border-[#0d0d0d] px-20 py-7 flex items-center justify-between">
        <span className="text-[#DA291C] text-[11px] font-bold tracking-[1px]">
          AUBM Programming Club
        </span>
        <span className="text-[#181818] text-[9px] tracking-[1.5px] uppercase font-mono">
          © {new Date().getFullYear()} UniCode Club · All footage used with
          permission
        </span>
      </footer>
    </div>
  );
}

type Member = (typeof members)[number];

function MemberCard({
  member,
  delay,
}: {
  member: Member;
  delay: 1 | 2 | 3;
}) {
  return (
    <div
      className={`motion motion-d${delay} group relative flex flex-col bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#DA291C]/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(218,41,28,0.2)]`}
    >
      {/* Camera bezel top bar */}
      <div className="flex items-center justify-between bg-black px-3 py-2 border-b border-gray-800">
        <ViewfinderCorners />
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DA291C] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DA291C]" />
          </span>
          <span className="text-[#DA291C] text-[10px] font-mono font-bold tracking-widest">
            REC
          </span>
        </div>
        <span className="text-gray-600 text-[10px] font-mono tracking-wider">
          00:00:00:00
        </span>
      </div>

      {/* Avatar */}
      <div className="relative bg-black flex items-center justify-center py-8 px-6">
        <div className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#DA291C]/60" />
        <div className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#DA291C]/60" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#DA291C]/60" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#DA291C]/60" />
        <div className="w-24 h-24 rounded-full bg-gray-900 border-2 border-[#DA291C]/80 flex items-center justify-center text-[#DA291C] text-2xl font-bold select-none shadow-inner">
          {getInitials(member.name)}
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <span className="text-[10px] font-mono text-gray-600 tracking-wide whitespace-nowrap">
            {member.officeCharacter}
          </span>
        </div>
      </div>

      {/* Lower third */}
      <div className="bg-black px-4 py-2.5 border-t-2 border-[#DA291C]">
        <p className="text-white font-bold text-base leading-tight tracking-tight">
          {member.name}
        </p>
        <p className="text-[#DA291C] text-xs font-semibold mt-0.5 uppercase tracking-widest">
          {member.role}
        </p>
      </div>

      {/* Interview content */}
      <div className="flex flex-col gap-3 px-4 py-4 flex-1">
        <blockquote className="relative border-l-2 border-[#DA291C]/70 pl-3">
          <p className="text-gray-300 text-sm italic leading-relaxed pl-1">
            {member.quote}
          </p>
        </blockquote>
        <p className="text-gray-500 text-xs leading-relaxed">
          {member.description}
        </p>
      </div>

      {/* Tape counter */}
      <div className="bg-black px-4 py-2 border-t border-gray-800 flex items-center justify-between">
        <span className="text-gray-700 text-[10px] font-mono">UNICODE / S01</span>
        <div className="flex gap-1 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#DA291C]/90 group-hover:bg-[#DA291C] transition-colors" />
        </div>
        <span className="text-gray-700 text-[10px] font-mono">AUBM</span>
      </div>
    </div>
  );
}

function ViewfinderCorners() {
  return (
    <div className="relative w-5 h-4">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-600" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-600" />
    </div>
  );
}
```

- [ ] **Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Verify members page visually**

Open `http://localhost:5173/members`. Check:
- Dr. Raphael appears with "Dr." prefix
- Emmanuel shows "Secretary", Kai shows "Treasurer"
- Stephanos shows "Technical Lead", Lea shows "Head of Design", Mariam shows "Quality Lead"
- Camera cards animate in as you scroll
- REC dot pulses on all cards
- Cards scale up slightly on hover with red glow

- [ ] **Commit**

```bash
git add app/routes/members.tsx
git commit -m "feat: update member roles and add scroll animations to members page"
```

---

## Task 7: Projects Page

**Files:**
- Modify: `app/routes/projects.tsx`

- [ ] **Replace `app/routes/projects.tsx`**

```tsx
import type { Route } from "./+types/projects";
import { Navbar } from "../components/Navbar";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects — AUBM Programming Club" },
    {
      name: "description",
      content: "Explore projects built by the AUBM Programming Club.",
    },
  ];
}

const projects = [
  {
    id: 1,
    title: "Booth Game — Junior Edition",
    description:
      "An interactive pygame coding game for ages 8–12. Players fill a Python list with hole positions to make a Mario-inspired character jump over all three gaps without falling. Built for the AUBM open day booth.",
    tech: ["Python", "Pygame"],
    link: null,
    linkLabel: null,
  },
  {
    id: 2,
    title: "Booth Game — Senior Edition",
    description:
      "An interactive pygame coding game for ages 13–17. Players complete a for loop using range() to schedule all three jumps — two lines of code, immediate visual feedback. Built for the AUBM open day booth.",
    tech: ["Python", "Pygame"],
    link: null,
    linkLabel: null,
  },
  {
    id: 3,
    title: "CampusConnect",
    description:
      "A full-stack web application that connects university students with clubs, events, and study groups on campus. Features include real-time notifications, an event calendar, and a chat system built with React and Node.js.",
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    link: "https://github.com/unicode-club/campus-connect",
    linkLabel: "View on GitHub",
  },
  {
    id: 4,
    title: "AlgoViz",
    description:
      "An interactive algorithm visualization tool that animates sorting, graph traversal, and pathfinding algorithms step by step. Designed to help students understand data structures and algorithms through visual learning.",
    tech: ["TypeScript", "React", "Tailwind CSS", "D3.js"],
    link: "https://github.com/unicode-club/algoviz",
    linkLabel: "View on GitHub",
  },
];

export default function Projects() {
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <section className="bg-black border-b border-[#0d0d0d] text-white py-20 px-20">
        <p className="motion text-[#DA291C] text-[9px] tracking-[3px] uppercase font-semibold mb-4">
          What We've Built
        </p>
        <h1 className="motion motion-d1 text-white text-[42px] font-medium tracking-[-1px] mb-3">
          Our Projects
        </h1>
        <p className="motion motion-d2 text-[#3a3a3a] text-[14px] leading-[1.75] max-w-[440px]">
          Real-world software built by club members — from open day booth games
          to full-stack web apps.
        </p>
      </section>

      <section className="py-20 px-20 flex-1 bg-[#070707]">
        <div className="max-w-4xl mx-auto flex flex-col gap-[1px] bg-[#111]">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={((i % 3) + 1) as 1 | 2 | 3} />
          ))}
        </div>
      </section>

      <footer className="bg-black border-t border-[#0d0d0d] px-20 py-7 flex items-center justify-between">
        <span className="text-[#DA291C] text-[11px] font-bold tracking-[1px]">
          AUBM Programming Club
        </span>
        <span className="text-[#181818] text-[9px] tracking-[1.5px] uppercase">
          © {new Date().getFullYear()} · All rights reserved
        </span>
      </footer>
    </div>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  delay,
}: {
  project: Project;
  delay: 1 | 2 | 3;
}) {
  return (
    <div
      className={`motion motion-d${delay} bg-black flex flex-col md:flex-row hover:bg-[#070707] transition-colors`}
    >
      {/* Visual placeholder */}
      <div className="md:w-56 w-full h-40 md:h-auto bg-[#070707] flex items-center justify-center shrink-0 border-r border-[#111]">
        <div className="flex flex-col items-center gap-2 text-[#DA291C]/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col justify-between gap-4 flex-1">
        <div>
          <h2 className="text-white text-[20px] font-medium tracking-[-0.3px] mb-2">
            {project.title}
          </h2>
          <p className="text-[#333] text-[13px] leading-[1.72] mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="bg-[#0a0a0a] border border-[#161616] text-[#333] text-[9px] tracking-[1px] uppercase px-3 py-1 rounded-[2px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#DA291C] hover:text-[#b8221a] no-underline transition-colors tracking-[0.5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            {project.linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Verify projects page visually**

Open `http://localhost:5173/projects`. Check:
- Two booth game cards appear first (no GitHub link)
- CampusConnect and AlgoViz follow with GitHub links in red
- All four cards animate in on scroll
- Tech pills use the new dark style

- [ ] **Commit**

```bash
git add app/routes/projects.tsx
git commit -m "feat: add booth games to projects page and apply new card design"
```

---

## Task 8: Final Typecheck + Build Verification

- [ ] **Run full typecheck**

```bash
npm run typecheck
```

Expected: no errors across all files.

- [ ] **Run production build**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Do a full visual walkthrough** with `npm run dev`

Navigate through all three pages, checking:
1. `/` — hero line animates, scroll down reveals each section, scroll back up collapses them
2. `/members` — 10 cards in 3-column grid, Dr. Raphael shown, updated roles visible
3. `/projects` — 4 cards, booth games at top, GitHub links only on CampusConnect and AlgoViz
4. Navbar sticky on all pages, active link highlighted
5. Clear sessionStorage in DevTools, reload `/` — loading screen appears for first visit only

- [ ] **Commit**

```bash
git add -A
git commit -m "chore: final build verification pass — website redesign complete"
```
