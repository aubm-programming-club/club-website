import { useEffect, useState } from "react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    // Start fade-out after 2 s
    const fadeTimer = setTimeout(() => setPhase("fading"), 2000);
    // Notify parent once CSS transition ends (0.8 s fade)
    const doneTimer = setTimeout(onDone, 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo mark */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="text-white text-7xl font-light select-none leading-none">
          {"</>"}
        </span>
      </div>

      {/* Club name */}
      <h1 className="text-white text-3xl font-medium tracking-tight mb-2">
        UniCode Club
      </h1>

      {/* Subtitle — uppercase label style */}
      <p className="text-[#8F8F8F] text-[12px] tracking-[1px] uppercase">
        University Programming Club
      </p>

      {/* Loading bar — Ferrari Red on dark track */}
      <div className="mt-10 w-48 h-[2px] bg-[#303030] overflow-hidden">
        <div className="h-full bg-[#DA291C] loading-bar" />
      </div>
    </div>
  );
}
