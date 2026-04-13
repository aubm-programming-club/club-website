import type { Route } from "./+types/members";
import { Navbar } from "../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Members — UniCode Club" },
    { name: "description", content: "Meet the team behind UniCode Club." },
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
    <div className="min-h-screen flex flex-col bg-[#000000]">
      <Navbar />

      {/* Title card — Absolute Black */}
      <section className="bg-[#000000] text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#969696] text-[12px] uppercase mb-4 tracking-[1px]">
            UniCode Club Members
          </p>
          <h1 className="text-[26px] font-medium leading-[1.2] text-white mb-4">
            The Team
          </h1>
          <p className="text-[#8F8F8F] text-base leading-relaxed">
            A UniCode Club Documentary · Filmed on location at AUBM · Season 1
          </p>
        </div>
      </section>

      {/* Members grid — Pure White */}
      <section className="py-16 px-4 flex-1 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Footer — Dark Surface */}
      <footer className="bg-[#303030] text-[#8F8F8F] text-center text-sm py-6">
        © {new Date().getFullYear()} UniCode Club · All footage used with permission
      </footer>
    </div>
  );
}

type Member = (typeof members)[number];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col bg-white rounded-[2px] overflow-hidden">
      {/* Avatar area */}
      <div className="flex items-center justify-center py-10 px-6 bg-[#FFFFFF]">
        <div className="w-20 h-20 rounded-full bg-[#F5F5F5] border border-[#CCCCCC] flex items-center justify-center text-[#181818] text-xl font-semibold select-none">
          {getInitials(member.name)}
        </div>
      </div>

      {/* Name & role */}
      <div className="px-5 pb-2">
        <p className="text-[#181818] font-bold text-base leading-tight tracking-tight">
          {member.name}
        </p>
        <p className="text-[#666666] text-[12px] uppercase mt-0.5 tracking-[1px] font-semibold">
          {member.role}
        </p>
        <p className="text-[#8F8F8F] text-[11px] uppercase mt-1 tracking-[0.5px]">
          {member.officeCharacter}
        </p>
      </div>

      {/* Quote */}
      <div className="px-5 py-3 flex-1 flex flex-col gap-3">
        <blockquote className="border-l-2 border-[#CCCCCC] pl-3">
          <p className="text-[#666666] text-sm italic leading-relaxed">
            {member.quote}
          </p>
        </blockquote>

        {/* Description */}
        <p className="text-[#8F8F8F] text-[13px] leading-relaxed">
          {member.description}
        </p>
      </div>
    </div>
  );
}
