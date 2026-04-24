import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import GlitchText from "./GlitchText";
import PixelDissolve from "./PixelDissolve";
import TransitionCanvas from "./TransitionCanvas";

const BIOS_LINES = [
  { text: "AUB-MEDITERRANEO System Utility v3.7.12", delay: 0 },
  { text: "Copyright (C) AUB MEDITERRANEO", delay: 226 },
  { text: "", delay: 376 },
  { text: "Detecting hardware...", delay: 526 },
  { text: "CPU: Neural Processing Unit v4.2 .......... OK", delay: 902 },
  { text: "RAM CHECK ............. 16384 MB .......... OK", delay: 1353 },
  { text: "ROM CHECK ............. VERIFIED .......... OK", delay: 1729 },
  { text: "GPU: Render Pipeline v7.1 ................. OK", delay: 2030 },
  { text: "NETWORK INTERFACE ..... CONNECTED ......... OK", delay: 2331 },
  { text: "", delay: 2556 },
  { text: "KERNEL LOADED ........................ v3.7.12", delay: 2707 },
  { text: "Initializing university services...", delay: 3008 },
];

const SYSTEM_FILES = [
  { name: "aub_kernel.sys", size: "2.4 MB" },
  { name: "campus_drivers.pak", size: "18.7 MB" },
  { name: "portal_ui.exe", size: "4.1 MB" },
  { name: "renderer.dll", size: "12.3 MB" },
  { name: "academic_assets.pak", size: "156.8 MB" },
  { name: "med_database.sys", size: "8.9 MB" },
  { name: "network_auth.dll", size: "3.2 MB" },
  { name: "research_engine.pak", size: "24.5 MB" },
  { name: "student_module.exe", size: "41.2 MB" },
  { name: "faculty_cache.bin", size: "67.4 MB" },
  { name: "aub_config.dat", size: "0.3 MB" },
  { name: "user_profile.sys", size: "1.1 MB" },
];

const STAGE_LOGO_INTRO = 0;
const STAGE_BIOS = 1;
const STAGE_DISSOLVE = 2;
const STAGE_FILE_LOAD = 3;
const STAGE_COMPLETE = 4;

const C = {
  berytusRed: "#840132",
  redBright: "#cc2131",
  yellow: "#EB9F00",
  coral: "#C8666D",
  violet: "#4B1757",
  gray: "#808080",
  dimRed: "#5a2035",
  dimViolet: "#2a1030",
  bgBlack: "#0a0408",
};

const TRANSITION_COLORS = [C.redBright, C.yellow, C.violet, C.berytusRed];

export default function SystemInitScreen({
  isLoaded = false,
  onComplete,
}: {
  isLoaded?: boolean;
  onComplete?: () => void;
}) {
  const [stage, setStage] = useState(STAGE_LOGO_INTRO);
  const [visibleBiosLines, setVisibleBiosLines] = useState<string[]>([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(-1);
  const [fileProgress, setFileProgress] = useState<Record<string, number>>({});
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [done, setDone] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);
  const [dissolveStarted, setDissolveStarted] = useState(false);
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (done) return;
    const tick = () => {
      setGlobalGlitch(true);
      setTimeout(() => setGlobalGlitch(false), 75);
      glitchTimerRef.current = setTimeout(tick, 1880 + Math.random() * 1504);
    };
    glitchTimerRef.current = setTimeout(tick, 1504);
    return () => { if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current); };
  }, [done]);

  useEffect(() => {
    if (stage !== STAGE_LOGO_INTRO) return;
    const t = setTimeout(() => setDissolveStarted(true), 1203);
    return () => clearTimeout(t);
  }, [stage]);

  const handleLogoDissolve = useCallback(() => {
    setDissolveStarted(false);
    setStage(STAGE_BIOS);
  }, []);

  useEffect(() => {
    if (stage !== STAGE_BIOS) return;
    const timers = BIOS_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleBiosLines((prev) => [...prev, line.text]);
        setTotalProgress(Math.round(((i + 1) / BIOS_LINES.length) * 30));
      }, line.delay)
    );
    const t = setTimeout(
      () => setStage(STAGE_DISSOLVE),
      BIOS_LINES[BIOS_LINES.length - 1].delay + 602
    );
    return () => { timers.forEach(clearTimeout); clearTimeout(t); };
  }, [stage]);

  const handleTransitionDone = useCallback(() => {
    setStage(STAGE_FILE_LOAD);
  }, []);

  useEffect(() => {
    if (stage !== STAGE_FILE_LOAD) return;
    let idx = 0;
    let cancelled = false;
    const loadNext = () => {
      if (cancelled) return;
      if (idx >= SYSTEM_FILES.length) {
        setTotalProgress(95);
        setStage(STAGE_COMPLETE);
        return;
      }
      setCurrentFileIndex(idx);
      const file = SYSTEM_FILES[idx];
      let prog = 0;
      const step = () => {
        if (cancelled) return;
        prog += Math.random() * 30 + 10;
        if (prog >= 100) {
          prog = 100;
          setFileProgress((p) => ({ ...p, [file.name]: 100 }));
          setTotalProgress(30 + Math.round(((idx + 1) / SYSTEM_FILES.length) * 65));
          idx++;
          setTimeout(loadNext, 53 + Math.random() * 90);
        } else {
          setFileProgress((p) => ({ ...p, [file.name]: Math.round(prog) }));
          setTimeout(step, 26 + Math.random() * 38);
        }
      };
      setFileProgress((p) => ({ ...p, [file.name]: 0 }));
      setTimeout(step, 30);
    };
    loadNext();
    return () => { cancelled = true; };
  }, [stage]);

  useEffect(() => {
    if (stage !== STAGE_COMPLETE) return;
    const t = setTimeout(() => setTotalProgress(100), 301);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage === STAGE_COMPLETE && isLoaded && totalProgress === 100) {
      let t2: ReturnType<typeof setTimeout> | null = null;
      const t = setTimeout(() => {
        setShowFlash(true);
        t2 = setTimeout(() => { setDone(true); onComplete?.(); }, 376);
      }, 451);
      return () => {
        clearTimeout(t);
        if (t2) clearTimeout(t2);
      };
    }
  }, [stage, isLoaded, totalProgress, onComplete]);

  if (done) return null;

  const stageLabel = [
    "",
    "HARDWARE DIAGNOSTICS",
    "▓▓▓ TRANSITIONING ▓▓▓",
    "MOUNTING SYSTEM FILES",
    isLoaded ? ">>> LAUNCHING <<<" : "AWAITING SIGNAL...",
  ][stage];

  return (
    <>
      <div className="crt-overlay" />
      <div className="fisheye-overlay" />
      <div className="noise-overlay" />
      <div className="scan-bar" />
      {showFlash && <div className="white-flash" />}

      <motion.div
        style={{
          width: "100%", height: "100%", display: "flex",
          flexDirection: "column", position: "relative",
          overflow: "hidden", background: C.bgBlack,
        }}
        animate={globalGlitch ? { x: [0, -3, 4, -2, 0] } : { x: 0 }}
        transition={{ duration: 0.06, ease: "linear" }}
      >
        {globalGlitch && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(204,33,49,0.12) 33%, rgba(75,23,87,0.1) 66%, rgba(235,159,0,0.1))",
            mixBlendMode: "screen", zIndex: 10, pointerEvents: "none",
          }} />
        )}

        {stage > STAGE_LOGO_INTRO && (
          <div className="big-percent">{totalProgress}%</div>
        )}

        {stage === STAGE_LOGO_INTRO && (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 24, zIndex: 5,
          }}>
            <PixelDissolve
              src="/aub-med-logo.png"
              width={450}
              blockSize={12}
              dissolve={dissolveStarted}
              onComplete={handleLogoDissolve}
              className="logo-glow"
            />
            {!dissolveStarted && (
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: C.coral,
                letterSpacing: 5, textTransform: "uppercase", opacity: 0.5,
              }}>
                System Initialization
              </div>
            )}
          </div>
        )}

        {(stage === STAGE_BIOS || stage === STAGE_DISSOLVE) && (
          <div style={{
            flex: 1, padding: "30px 50px", display: "flex", flexDirection: "column",
            opacity: stage === STAGE_DISSOLVE ? 0 : 1, transition: "opacity 0.15s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <img src="/aub-med-logo.png" alt="" className="logo-glow" style={{ width: 140, height: "auto", opacity: 0.85 }} />
              <div style={{ fontFamily: "'VT323', monospace", fontSize: 16, color: C.yellow, letterSpacing: 2 }}>
                {visibleBiosLines.filter((l) => l.includes("OK")).length > 0 && (
                  <span className="chromatic">
                    {visibleBiosLines.filter((l) => l.includes("OK")).length}/5 PASSED
                  </span>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {visibleBiosLines.map((line, i) => (
                <div key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, lineHeight: "22px",
                  color: line.includes("OK") ? C.yellow
                    : line.includes("AUB") || line.includes("Copyright") ? C.redBright
                    : line.includes("KERNEL") ? C.coral : "#C8666Dbb",
                  whiteSpace: "pre",
                }}>
                  <GlitchText text={line || " "} isGlitching={globalGlitch} />
                </div>
              ))}
              {visibleBiosLines.length > 0 && visibleBiosLines.length < BIOS_LINES.length && (
                <span className="cursor-blink" style={{ fontSize: 14 }} />
              )}
            </div>
          </div>
        )}

        <TransitionCanvas active={stage === STAGE_DISSOLVE} onComplete={handleTransitionDone} colors={TRANSITION_COLORS} />

        {(stage === STAGE_FILE_LOAD || stage === STAGE_COMPLETE) && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "30px 50px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div className="chromatic" style={{ fontFamily: "'VT323', monospace", fontSize: 24, color: C.berytusRed, letterSpacing: 3 }}>
                ┌─ AUB SYSTEM FILE LOADER ─┐
              </div>
              <img src="/aub-med-logo.png" alt="" className="logo-glow" style={{ width: 100, height: "auto", opacity: 0.6 }} />
            </div>
            <div style={{ flex: 1, overflow: "hidden", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
              {SYSTEM_FILES.map((file, i) => {
                const progress = fileProgress[file.name] ?? -1;
                const isCurrent = i === currentFileIndex;
                const isComplete = progress === 100;
                if (i > currentFileIndex + 1) return null;
                return (
                  <div key={file.name} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "3px 0",
                    color: isComplete ? C.yellow : isCurrent ? C.redBright : C.dimRed,
                  }}>
                    <span style={{ width: 20, textAlign: "center", color: isComplete ? C.yellow : isCurrent ? C.redBright : C.dimViolet }}>
                      {isComplete ? "✓" : isCurrent ? "►" : "·"}
                    </span>
                    <span style={{ width: 200 }}>
                      <GlitchText text={file.name} isGlitching={isCurrent && globalGlitch} />
                    </span>
                    <span style={{ width: 80, textAlign: "right", fontSize: 11, opacity: 0.5, color: C.gray }}>{file.size}</span>
                    <div style={{ flex: 1, height: 4, background: C.dimViolet, overflow: "hidden" }}>
                      <div style={{
                        width: `${Math.max(0, progress)}%`, height: "100%",
                        background: isComplete ? `linear-gradient(90deg, ${C.berytusRed}, ${C.yellow})` : C.redBright,
                        boxShadow: isComplete ? `0 0 10px ${C.yellow}50` : `0 0 10px ${C.redBright}70`,
                        transition: "width 0.038s steps(6)",
                      }} />
                    </div>
                    <span style={{ width: 40, textAlign: "right", fontSize: 11, color: isComplete ? C.yellow : C.coral }}>
                      {progress >= 0 ? `${Math.min(progress, 100)}%` : ""}
                    </span>
                  </div>
                );
              })}
            </div>
            {stage === STAGE_COMPLETE && (
              <div className="chromatic" style={{ fontFamily: "'VT323', monospace", fontSize: 22, color: C.yellow, marginTop: 12, letterSpacing: 3 }}>
                <GlitchText text="▓▓ ALL SYSTEMS NOMINAL ▓▓" isGlitching={globalGlitch} />
              </div>
            )}
            <div style={{ fontFamily: "'VT323', monospace", fontSize: 16, color: C.berytusRed, marginTop: 6, letterSpacing: 3 }}>
              └──────────────────────────────────────┘
            </div>
          </div>
        )}

        {stage > STAGE_LOGO_INTRO && (
          <div style={{
            position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center",
            fontFamily: "'VT323', monospace", fontSize: 16, letterSpacing: 2,
            color: C.coral, opacity: 0.65, zIndex: 5,
          }}>
            Brought to you by{" "}
            <span style={{ color: C.yellow }}>AUB Mediterraneo Programming Club</span>
          </div>
        )}

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: C.dimViolet }}>
          <div className="progress-bar" style={{ width: `${totalProgress}%`, height: "100%" }} />
        </div>

        <div style={{
          position: "absolute", bottom: 8, left: 50, right: 50,
          display: "flex", justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.dimRed, letterSpacing: 1,
        }}>
          <span style={{ color: C.violet }}>AUB-MEDITERRANEO v3.7.12</span>
          <span>{stageLabel}</span>
          <span style={{ color: C.yellow }}>{totalProgress}%</span>
        </div>
      </motion.div>
    </>
  );
}
