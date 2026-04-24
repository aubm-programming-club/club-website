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
