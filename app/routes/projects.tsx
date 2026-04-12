import type { Route } from "./+types/projects";
import { Navbar } from "../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects — UniCode Club" },
    { name: "description", content: "Explore projects built by UniCode Club." },
  ];
}

const projects = [
  {
    id: 1,
    title: "CampusConnect",
    description:
      "A full-stack web application that connects university students with clubs, events, and study groups on campus. Features include real-time notifications, an event calendar, and a chat system built with React and Node.js.",
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    link: "https://github.com/unicode-club/campus-connect",
    linkLabel: "View on GitHub",
  },
  {
    id: 2,
    title: "AlgoViz",
    description:
      "An interactive algorithm visualization tool that animates sorting, graph traversal, and pathfinding algorithms step by step. Designed to help students understand data structures and algorithms through visual learning.",
    tech: ["TypeScript", "React", "Tailwind CSS", "D3.js"],
    link: "https://github.com/unicode-club/algoviz",
    linkLabel: "View on GitHub",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <section className="bg-black border-b border-red-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Our Projects
        </h1>
        <p className="text-gray-400 text-lg">
          Real-world software built by club members.
        </p>
      </section>

      <section className="py-16 px-4 flex-1 bg-gray-950">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black rounded-2xl border border-red-900 shadow-sm overflow-hidden flex flex-col md:flex-row hover:border-red-600 transition-colors"
            >
              {/* Photo placeholder */}
              <div className="md:w-64 w-full h-48 md:h-auto bg-gray-900 flex items-center justify-center shrink-0">
                <div className="flex flex-col items-center gap-2 text-red-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-500">Project Screenshot</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-gray-900 text-red-400 text-xs font-medium px-3 py-1 rounded-full border border-red-900"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400 hover:underline"
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
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black border-t border-red-900 text-gray-500 text-center text-sm py-6">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        UniCode Club · All rights reserved
      </footer>
    </div>
  );
}
