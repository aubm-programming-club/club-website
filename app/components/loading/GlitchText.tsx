import { useState, useEffect, useRef } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:<>?/~`░▒▓█▀▄";

export default function GlitchText({
  text,
  isGlitching = false,
  className = "",
}: {
  text: string;
  isGlitching?: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isGlitching) {
      setDisplay(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      const chars = text.split("");
      const numGlitch = Math.floor(Math.random() * Math.min(6, chars.length));
      for (let i = 0; i < numGlitch; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] =
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      setDisplay(chars.join(""));
    }, 38);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, isGlitching]);

  return <span className={className}>{display}</span>;
}
