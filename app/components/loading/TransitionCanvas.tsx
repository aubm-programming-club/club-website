import { useRef, useEffect } from "react";

export default function TransitionCanvas({
  active,
  onComplete,
  colors,
}: {
  active: boolean;
  onComplete?: () => void;
  colors: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const ctx = canvas.getContext("2d")!;
    const cols = 18;
    const rows = 10;
    const bw = Math.ceil(w / cols);
    const bh = Math.ceil(h / rows);

    type Block = { x: number; y: number; delay: number; phase: number; opacity: number; colorIdx: number; };
    const blocks: Block[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        blocks.push({
          x: c * bw, y: r * bh,
          delay: Math.floor(Math.random() * 7),
          phase: 0, opacity: 0,
          colorIdx: Math.floor(Math.random() * colors.length),
        });
      }
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const b of blocks) {
        if (b.phase === 3) continue;
        if (b.phase === 0) {
          if (b.delay-- <= 0) { b.phase = 1; b.opacity = 0; }
          alive++;
          continue;
        }
        if (b.phase === 1) {
          b.opacity += 0.333;
          if (b.opacity >= 1) { b.opacity = 1; b.phase = 2; }
        } else if (b.phase === 2) {
          b.opacity -= 0.106;
          if (b.opacity <= 0) { b.opacity = 0; b.phase = 3; continue; }
        }
        ctx.globalAlpha = b.opacity;
        ctx.fillStyle = colors[b.colorIdx];
        ctx.fillRect(b.x, b.y, bw, bh);
        alive++;
      }
      ctx.globalAlpha = 1;
      if (alive > 0 && frame < 30) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, w, h);
        onComplete?.();
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [active, colors, onComplete]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", width: "100%", height: "100%" }}
    />
  );
}
