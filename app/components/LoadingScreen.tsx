import { useEffect, useState } from "react";
import SystemInitScreen from "./loading/SystemInitScreen";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 6015);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#0a0408",
      }}
    >
      <SystemInitScreen isLoaded={isLoaded} onComplete={onDone} />
    </div>
  );
}
