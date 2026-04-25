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
    title: "SeismAlert",
    description:
      "A real-time earthquake detection and public alerting system inspired by the tremors felt across Paphos. Monitors live seismic data feeds, classifies events by magnitude and depth, and pushes geo-targeted alerts to nearby users within seconds of detection.",
    tech: ["Python", "FastAPI", "WebSockets", "PostgreSQL"],
    link: null,
    linkLabel: null,
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
