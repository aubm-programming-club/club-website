import { useEffect, useState } from "react";

const DISPLAY_DURATION_MS = 2000;

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), DISPLAY_DURATION_MS);
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      onTransitionEnd={onDone}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated code-bracket logo */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="text-red-600 text-8xl font-black select-none leading-none animate-pulse">
          {"</>"}
        </span>
      </div>

      {/* Club name */}
      <h1 className="text-white text-4xl font-extrabold tracking-widest uppercase mb-2">
        UniCode Club
      </h1>
      <p className="text-red-500 text-sm tracking-widest uppercase">
        University Programming Club
      </p>

      {/* Loading bar */}
      <div className="mt-10 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-red-600 rounded-full loading-bar" />
      </div>
    </div>
  );
}
