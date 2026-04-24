import { useRef, useEffect, useState } from "react";

export default function PixelDissolve({
  src,
  alt = "",
  width = 400,
  blockSize = 10,
  dissolve = false,
  onComplete,
  style = {},
  className = "",
}: {
  src: string;
  alt?: string;
  width?: number;
  blockSize?: number;
  dissolve?: boolean;
  onComplete?: () => void;
  style?: React.CSSProperties;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(new Image());

  useEffect(() => {
    const img = imgRef.current;
    img.onload = () => setImgLoaded(true);
    img.src = src;
  }, [src]);

  useEffect(() => {
    if (!imgLoaded || dissolve || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const aspect = img.naturalHeight / img.naturalWidth;
    canvas.width = width;
    canvas.height = Math.round(width * aspect);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [imgLoaded, dissolve, width]);

  useEffect(() => {
    if (!dissolve || !imgLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;
    const cols = Math.ceil(w / blockSize);
    const rows = Math.ceil(h / blockSize);

    type Particle = {
      tile: HTMLCanvasElement;
      x: number; y: number; bw: number; bh: number;
      vx: number; vy: number; gravity: number;
      opacity: number; fade: number; delay: number;
    };
    const particles: Particle[] = [];

    let canReadPixels = true;
    try { ctx.getImageData(0, 0, 1, 1); } catch { canReadPixels = false; }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * blockSize;
        const y = r * blockSize;
        const bw = Math.min(blockSize, w - x);
        const bh = Math.min(blockSize, h - y);
        if (canReadPixels) {
          try {
            const sample = ctx.getImageData(x + (bw >> 1), y + (bh >> 1), 1, 1).data;
            if (sample[3] < 15) continue;
          } catch { /* ignore */ }
        }
        const tile = document.createElement("canvas");
        tile.width = bw;
        tile.height = bh;
        tile.getContext("2d")!.drawImage(canvas, x, y, bw, bh, 0, 0, bw, bh);
        const angle = Math.random() * 6.28;
        const speed = 2.66 + Math.random() * 4.655;
        particles.push({
          tile, x, y, bw, bh,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3.325,
          gravity: 0.16,
          opacity: 1,
          fade: 0.033 + Math.random() * 0.027,
          delay: Math.floor(Math.random() * 5),
        });
      }
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const p of particles) {
        if (p.opacity <= 0) continue;
        if (p.delay > 0) {
          p.delay--;
          ctx.globalAlpha = 1;
          ctx.drawImage(p.tile, p.x, p.y);
          alive++;
          continue;
        }
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= p.fade;
        if (p.opacity <= 0) continue;
        alive++;
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(p.tile, p.x, p.y);
      }
      ctx.globalAlpha = 1;
      if (alive > 0 && frame < 41) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [dissolve, imgLoaded, blockSize, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: "80vw", height: "auto", ...style }}
    />
  );
}
