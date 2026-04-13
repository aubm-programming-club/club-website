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
    <div className="min-h-screen flex flex-col bg-[#000000]">
      <Navbar />

      {/* Title card — Absolute Black */}
      <section className="bg-[#000000] text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#969696] text-[12px] uppercase mb-4 tracking-[1px]">
            UniCode Club Projects
          </p>
          <h1 className="text-[26px] font-medium leading-[1.2] text-white mb-4">
            Our Projects
          </h1>
          <p className="text-[#8F8F8F] text-base leading-relaxed">
            Real-world software built by club members.
          </p>
        </div>
      </section>

      {/* Projects list — Pure White */}
      <section className="py-16 px-4 flex-1 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-[2px] overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image placeholder */}
              <div className="md:w-64 w-full h-48 md:h-auto bg-[#F5F5F5] flex items-center justify-center shrink-0">
                <div className="flex flex-col items-center gap-2 text-[#CCCCCC]">
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
                  <span className="text-[12px] text-[#8F8F8F] uppercase tracking-[1px]">
                    Project Screenshot
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="text-[24px] font-normal text-[#181818] mb-3 leading-[1.2]">
                    {project.title}
                  </h2>
                  <p className="text-[#666666] leading-relaxed text-sm mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[#8F8F8F] text-[11px] uppercase border border-[#CCCCCC] px-2 py-1 rounded-[2px] tracking-[1px]"
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
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#181818] hover:text-[#3860BE] transition-colors"
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

      {/* Footer — Dark Surface */}
      <footer className="bg-[#303030] text-[#8F8F8F] text-center text-sm py-6">
        © {new Date().getFullYear()} UniCode Club · All rights reserved
      </footer>
    </div>
  );
}
