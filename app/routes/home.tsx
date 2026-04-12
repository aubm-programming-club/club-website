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

      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />

        {/* Hero */}
        <section className="bg-black border-b border-red-900 text-white py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
              University Programming Club
            </p>
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              Welcome to{" "}
              <span className="text-red-500">UniCode Club</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Where curious minds build, learn, and collaborate on real-world
              projects.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/members"
                className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-500 transition-colors"
              >
                Meet the Team
              </Link>
              <Link
                to="/projects"
                className="border border-red-600 text-red-400 font-semibold px-6 py-3 rounded-lg hover:bg-red-950 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 px-4 bg-gray-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              About the Club
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              UniCode Club is a student-run organization dedicated to fostering
              a passion for programming and software development. We host weekly
              coding sessions, hackathons, workshops, and collaborative projects
              open to students of all experience levels.
            </p>
          </div>
        </section>

        {/* Feature cards */}
        <section className="bg-black py-16 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-red-900 bg-gray-950 p-8 text-center shadow-sm hover:border-red-600 transition-colors"
              >
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <section className="py-16 px-4 bg-gray-950">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Explore</h2>
            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                to="/members"
                className="bg-red-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-red-500 transition-colors"
              >
                Members
              </Link>
              <Link
                to="/projects"
                className="bg-red-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-red-500 transition-colors"
              >
                Projects
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-auto bg-black border-t border-red-900 text-gray-500 text-center text-sm py-6">
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
