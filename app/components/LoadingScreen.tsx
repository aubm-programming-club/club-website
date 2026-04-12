import { useEffect, useRef, useState } from "react";

const DISPLAY_DURATION_MS = 2000;
const FADE_DURATION_MS = 700;

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), DISPLAY_DURATION_MS);
    return () => clearTimeout(fadeTimer);
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;

    const doneTimer = setTimeout(finish, FADE_DURATION_MS);
    return () => clearTimeout(doneTimer);
  }, [phase, onDone]);

  return (
    <div
      onTransitionEnd={(event) => {
        if (
          phase === "fading" &&
          event.target === event.currentTarget &&
          event.propertyName === "opacity"
        ) {
          finish();
        }
      }}
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
