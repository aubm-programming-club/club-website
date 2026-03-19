import type { Route } from "./+types/members";
import { Navbar } from "../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Members — UniCode Club" },
    { name: "description", content: "Meet the members of UniCode Club." },
  ];
}

const members = [
  { id: 1, name: "Alex Johnson", position: "President" },
  { id: 2, name: "Samira Patel", position: "Vice President" },
  { id: 3, name: "Jordan Lee", position: "Secretary" },
  { id: 4, name: "Maya Chen", position: "Treasurer" },
  { id: 5, name: "Chris Rivera", position: "Lead Developer" },
  { id: 6, name: "Priya Sharma", position: "Web Developer" },
  { id: 7, name: "Omar Hassan", position: "AI/ML Engineer" },
  { id: 8, name: "Taylor Brooks", position: "Cybersecurity Lead" },
  { id: 9, name: "Nia Williams", position: "Events Coordinator" },
  { id: 10, name: "Liam O'Brien", position: "Community Manager" },
];

export default function Members() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="bg-indigo-800 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Our Members
        </h1>
        <p className="text-indigo-200 text-lg">
          The talented people who make UniCode Club great.
        </p>
      </section>

      <section className="py-16 px-4 flex-1">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center gap-3"
            >
              {/* Photo placeholder */}
              <div className="w-24 h-24 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-indigo-400 text-3xl font-bold select-none">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">
                  {member.name}
                </p>
                <p className="text-indigo-700 text-xs font-medium mt-0.5">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-indigo-900 text-indigo-300 text-center text-sm py-6">
        © {new Date().getFullYear()} UniCode Club · All rights reserved
      </footer>
    </div>
  );
}
