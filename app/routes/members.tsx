import type { Route } from "./+types/members";
import { Navbar } from "../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Members — UniCode Club" },
    { name: "description", content: "Meet the team behind UniCode Club. A documentary." },
  ];
}

const members = [
  {
    name: "Zeina Obeid",
    role: "President",
    officeCharacter: "The Michael Scott",
    quote: "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love my code.",
    description:
      "The enthusiastic leader who somehow holds everything together through sheer charisma and questionable coding puns. Started the club because she wanted a family, got a dev team instead.",
  },
  {
    name: "Alwalid Hemaid",
    role: "Vice President",
    officeCharacter: "The Dwight Schrute",
    quote: "Identity theft is not a joke, Emmanuel! Millions of GitHub accounts suffer every year.",
    description:
      "Self-appointed assistant-to-the-president who takes every hackathon like it's a matter of life and death. Has a backup of every repo on three separate hard drives.",
  },
  {
    name: "Emmanuel Abo Samra",
    role: "Lead Developer",
    officeCharacter: "The Jim Halpert",
    quote: "I just changed all of Alwalid's VS Code shortcuts. He's been using Notepad for two hours and hasn't noticed.",
    description:
      "The laid-back talent who ships clean code between pranking Alwalid's dev environment. Somehow always meets deadlines despite looking like he's doing nothing.",
  },
  {
    name: "Kai Doddy",
    role: "Backend Developer",
    officeCharacter: "The Kevin Malone",
    quote: "Why waste time write lot code when few code do trick?",
    description:
      "Writes code that somehow works despite no one understanding how. Famous for one-liner solutions that replace entire modules. His debugging strategy is \"delete stuff until it works.\"",
  },
  {
    name: "Stephanos",
    role: "Senior Developer",
    officeCharacter: "The Stanley Hudson",
    quote: "Did I stutter? The function returns null. Read the docs.",
    description:
      "Does not want to be here on weekends, but his code reviews are brutally honest and always right. Lives for 5 PM and pretzel day. Will not attend standup if it goes past 15 minutes.",
  },
  {
    name: "Lea",
    role: "UI/UX Designer",
    officeCharacter: "The Pam Beesly",
    quote: "I suggested we use a better color palette once. Now I'm the entire design department.",
    description:
      "The creative heart of the club who turns everyone's terrible wireframes into actual art. Started as the one person who knew Figma — now runs the whole frontend aesthetic.",
  },
  {
    name: "Lucas",
    role: "Web Developer",
    officeCharacter: "The Ryan Howard",
    quote: "It's not just another CRUD app. It's a disruptive platform for synergizing digital ecosystems.",
    description:
      "Always pitching the next big startup idea at standup. Has 14 unfinished side projects and a pitch deck for each one. Learned React last week, already mass-refactoring the codebase.",
  },
  {
    name: "Mariam",
    role: "QA Lead",
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
    name: "Raphael",
    role: "Technical Advisor",
    officeCharacter: "The Oscar Martinez",
    quote: "Actually, that's an O(n²) solution. Let me show you the optimal approach.",
    description:
      "The smartest person in the room who will politely correct your Big-O analysis mid-presentation. Always has the right answer and the documentation to back it up.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Members() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Scanline overlay — covers the whole page as a fixed decorative layer */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
        }}
      />

      <Navbar />

      {/* Documentary title card */}
      <section className="bg-black border-b border-red-900 text-white py-16 px-4 text-center relative overflow-hidden">
        {/* Vignette corners */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.7)_100%)]" />

        <div className="relative max-w-2xl mx-auto">
          {/* Network bug / channel identifier */}
          <p className="text-red-500 text-xs font-mono tracking-[0.3em] uppercase mb-3 opacity-80">
            UniCode Original Documentary Series
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight mb-3">
            The Team
          </h1>

          {/* Dunder Mifflin-esque subtitle card */}
          <div className="inline-block border-l-4 border-red-500 pl-4 text-left mt-2">
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
      <section className="py-16 px-4 flex-1 bg-gray-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <footer className="bg-black border-t border-red-900 text-gray-500 text-center text-sm py-6 font-mono">
        © {new Date().getFullYear()} UniCode Club · All footage used with permission
      </footer>
    </div>
  );
}

type Member = (typeof members)[number];

function MemberCard({ member }: { member: Member }) {
  return (
    <div
      className="group relative flex flex-col bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(220,38,38,0.25)]"
    >
      {/* Camera bezel top bar */}
      <div className="flex items-center justify-between bg-black px-3 py-2 border-b border-gray-800">
        {/* Viewfinder corner brackets (decorative) */}
        <div className="flex items-center gap-2">
          <ViewfinderCorners />
        </div>

        {/* REC indicator */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
          </span>
          <span className="text-red-500 text-[10px] font-mono font-bold tracking-widest">
            REC
          </span>
        </div>

        {/* Timecode */}
        <span className="text-gray-600 text-[10px] font-mono tracking-wider">
          00:00:00:00
        </span>
      </div>

      {/* Camera frame / avatar area */}
      <div className="relative bg-black flex items-center justify-center py-8 px-6">
        {/* Viewfinder corner overlays */}
        <div className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-700 opacity-60" />
        <div className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-700 opacity-60" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-red-700 opacity-60" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-red-700 opacity-60" />

        {/* Avatar circle */}
        <div className="w-24 h-24 rounded-full bg-gray-900 border-2 border-red-800 flex items-center justify-center text-red-400 text-2xl font-bold select-none shadow-inner">
          {getInitials(member.name)}
        </div>

        {/* Office character label — top right corner */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <span className="text-[10px] font-mono text-gray-600 tracking-wide whitespace-nowrap">
            {member.officeCharacter}
          </span>
        </div>
      </div>

      {/* Lower third — name & role title bar (The Office style) */}
      <div className="bg-black px-4 py-2.5 border-t-2 border-red-600">
        <p className="text-white font-bold text-base leading-tight tracking-tight">
          {member.name}
        </p>
        <p className="text-red-400 text-xs font-semibold mt-0.5 uppercase tracking-widest">
          {member.role}
        </p>
      </div>

      {/* Interview content area */}
      <div className="flex flex-col gap-3 px-4 py-4 flex-1">
        {/* Quote in caption/subtitle style */}
        <blockquote className="relative border-l-2 border-red-700 pl-3">
          <span className="text-gray-600 text-lg leading-none select-none absolute -top-1 -left-1">"</span>
          <p className="text-gray-300 text-sm italic leading-relaxed pl-1">
            {member.quote}
          </p>
        </blockquote>

        {/* Talking-head description */}
        <p className="text-gray-500 text-xs leading-relaxed">
          {member.description}
        </p>
      </div>

      {/* Bottom bar — tape counter aesthetic */}
      <div className="bg-black px-4 py-2 border-t border-gray-800 flex items-center justify-between">
        <span className="text-gray-700 text-[10px] font-mono">UNICODE / S01</span>
        <div className="flex gap-1 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-900 group-hover:bg-red-600 transition-colors" />
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
