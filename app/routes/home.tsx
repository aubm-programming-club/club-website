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
