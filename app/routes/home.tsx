import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { LoadingScreen } from "../components/LoadingScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "UniCode Club — University Programming Club" },
    {
      name: "description",
      content:
        "The official programming club of the university. Code, build, and grow together.",
    },
  ];
}

export default function Home() {
  const [shouldShowLoadingScreen, setShouldShowLoadingScreen] = useState(false);

  useEffect(() => {
    // Only show the loading screen on the first visit of the session
    if (typeof sessionStorage !== "undefined") {
      if (!sessionStorage.getItem("visited")) {
        sessionStorage.setItem("visited", "1");
        setShouldShowLoadingScreen(true);
      }
    }
  }, []);

  const handleLoadDone = useCallback(() => setShouldShowLoadingScreen(false), []);

  return (
    <>
      {shouldShowLoadingScreen && <LoadingScreen onDone={handleLoadDone} />}

      <div className="min-h-screen flex flex-col bg-[#000000]">
        <Navbar />

        {/* Hero — Absolute Black */}
        <section className="bg-[#000000] text-white py-32 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Uppercase label */}
            <p className="text-[#969696] text-[12px] uppercase mb-6 tracking-[1px]">
              University Programming Club
            </p>

            <h1
              className="text-[40px] leading-[1.2] font-medium mb-6"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
            >
              Welcome to{" "}
              <span className="font-semibold">UniCode Club</span>
            </h1>

            <p className="text-[#8F8F8F] text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Where curious minds build, learn, and collaborate on real-world
              projects.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              {/* Primary CTA — Ferrari Red */}
              <Link
                to="/members"
                className="bg-[#DA291C] text-white text-base px-[10px] py-[12px] rounded-[2px] hover:bg-[#B01E0A] transition-colors"
                style={{ letterSpacing: "1.28px", minWidth: "140px" }}
              >
                Meet the Team
              </Link>
              {/* Ghost button */}
              <Link
                to="/projects"
                className="bg-transparent text-white border border-white text-base px-[10px] py-[12px] rounded-[2px] hover:bg-[#1EAEDB] hover:border-[#1EAEDB] transition-colors"
                style={{ letterSpacing: "1.28px", minWidth: "140px" }}
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>

        {/* About — Pure White */}
        <section className="py-20 px-4 bg-[#FFFFFF]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[26px] font-medium leading-[1.2] text-[#181818] mb-6">
              About the Club
            </h2>
            <p className="text-[#666666] text-base leading-relaxed">
              UniCode Club is a student-run organization dedicated to fostering
              a passion for programming and software development. We host weekly
              coding sessions, hackathons, workshops, and collaborative projects
              open to students of all experience levels.
            </p>
          </div>
        </section>

        {/* Features — Absolute Black */}
        <section className="bg-[#000000] py-20 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-[2px] p-8 text-center"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-[24px] font-normal text-white mb-3 leading-[1.2]">
                  {title}
                </h3>
                <p className="text-[#8F8F8F] text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore / Quick links — Pure White */}
        <section className="py-20 px-4 bg-[#FFFFFF]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[26px] font-medium leading-[1.2] text-[#181818] mb-10">
              Explore
            </h2>
            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                to="/members"
                className="bg-white text-[#181818] border border-[#181818] text-base px-[10px] py-[12px] rounded-[2px] hover:bg-[#1EAEDB] hover:text-white hover:border-[#1EAEDB] transition-colors"
                style={{ letterSpacing: "1.28px", minWidth: "120px" }}
              >
                Members
              </Link>
              <Link
                to="/projects"
                className="bg-white text-[#181818] border border-[#181818] text-base px-[10px] py-[12px] rounded-[2px] hover:bg-[#1EAEDB] hover:text-white hover:border-[#1EAEDB] transition-colors"
                style={{ letterSpacing: "1.28px", minWidth: "120px" }}
              >
                Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Footer — Dark Surface */}
        <footer className="mt-auto bg-[#303030] text-[#8F8F8F] text-center text-sm py-6">
          © {new Date().getFullYear()} UniCode Club · All rights reserved
        </footer>
      </div>
    </>
  );
}

const features = [
  {
    icon: "💻",
    title: "Weekly Coding Sessions",
    description:
      "Practice algorithms, tackle competitive programming problems, and sharpen your skills every week.",
  },
  {
    icon: "🚀",
    title: "Hackathons & Competitions",
    description:
      "Participate in university-wide and national hackathons and put your creativity to the test.",
  },
  {
    icon: "🤝",
    title: "Open Collaboration",
    description:
      "Work on real projects with fellow students and build a portfolio that stands out.",
  },
];
