import React, { useEffect, useRef } from 'react';

interface EyeSpec {
  irisCx: number;
  irisCy: number;
  irisRadius: number;
  leftCorner: [number, number];
  rightCorner: [number, number];
  topPeak: [number, number];
  bottomPeak: [number, number];
  tearDuct: [number, number];
}

// Calibrated to exact pixel coordinates of public/ouz-portrait.png (1266 x 1243)
const LEFT_EYE: EyeSpec = {
  irisCx: 474.5,
  irisCy: 603,
  irisRadius: 38.5,
  leftCorner: [408, 610],
  rightCorner: [540, 613],
  topPeak: [474.5, 575],
  bottomPeak: [474.5, 632],
  tearDuct: [534, 613],
};

const RIGHT_EYE: EyeSpec = {
  irisCx: 796.5,
  irisCy: 599,
  irisRadius: 38.5,
  leftCorner: [732, 609],
  rightCorner: [863, 601],
  topPeak: [796.5, 571],
  bottomPeak: [796.5, 628],
  tearDuct: [738, 609],
};

/**
 * Trace the almond-shaped inner aperture between upper and lower eyelids.
 */
function traceEyeAperture(ctx: CanvasRenderingContext2D, eye: EyeSpec) {
  const [lx, ly] = eye.leftCorner;
  const [rx, ry] = eye.rightCorner;
  const [tx, ty] = eye.topPeak;
  const [bx, by] = eye.bottomPeak;

  ctx.beginPath();
  ctx.moveTo(lx, ly);
  // Upper eyelid arch
  ctx.quadraticCurveTo(tx, ty - (ly + ry) * 0.5 + ty, rx, ry);
  // Lower eyelid arch
  ctx.quadraticCurveTo(bx, by + (by - (ly + ry) * 0.5), lx, ly);
  ctx.closePath();
}

/**
 * Extracts the original high-res photorealistic iris + pupil + catchlights
 * from the source portrait and completes the top/bottom circular limbal ring
 * so the iris remains a complete sphere when looking up or down.
 */
function extractIrisSprite(sourceCanvas: HTMLCanvasElement, eye: EyeSpec): HTMLCanvasElement {
  const r = Math.ceil(eye.irisRadius);
  const diam = r * 2;
  const sprite = document.createElement('canvas');
  sprite.width = diam;
  sprite.height = diam;
  const sCtx = sprite.getContext('2d')!;

  sCtx.save();
  sCtx.beginPath();
  sCtx.arc(r, r, r - 0.5, 0, Math.PI * 2);
  sCtx.clip();

  // Base dark limbal ring + warm brown iris fallback for edges tucked under eyelids
  const baseGrad = sCtx.createRadialGradient(r, r, r * 0.25, r, r, r);
  baseGrad.addColorStop(0, '#050505');
  baseGrad.addColorStop(0.45, '#3E1A08');
  baseGrad.addColorStop(0.78, '#55240A');
  baseGrad.addColorStop(0.92, '#1E0B03');
  baseGrad.addColorStop(1, '#090402');
  sCtx.fillStyle = baseGrad;
  sCtx.fillRect(0, 0, diam, diam);

  // Copy the exact photorealistic iris region from the portrait
  sCtx.drawImage(
    sourceCanvas,
    eye.irisCx - r,
    eye.irisCy - r,
    diam,
    diam,
    0,
    0,
    diam,
    diam
  );

  // Re-reinforce clean circular limbal ring border so no sclera pixels bleed onto the iris edge
  const rimGrad = sCtx.createRadialGradient(r, r, r * 0.78, r, r, r);
  rimGrad.addColorStop(0, 'rgba(12, 5, 2, 0)');
  rimGrad.addColorStop(0.75, 'rgba(12, 5, 2, 0.35)');
  rimGrad.addColorStop(1, 'rgba(10, 4, 2, 0.95)');
  sCtx.fillStyle = rimGrad;
  sCtx.fillRect(0, 0, diam, diam);

  sCtx.restore();
  return sprite;
}

/**
 * Prepares the base portrait canvas with outer white background removed.
 */
function createCleanPortraitCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(img, 0, 0, w, h);
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  const cx = w * 0.5;
  const cy = h * 0.5;
  const protectRx = w * 0.29;
  const protectRy = h * 0.26;

  for (let y = 0; y < h; y++) {
    const dy = (y - cy) / protectRy;
    for (let x = 0; x < w; x++) {
      const dx = (x - cx) / protectRx;
      if (dx * dx + dy * dy < 1.0) continue;

      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;
      const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

      if (lum > 0.91 && sat < 0.11) {
        const alphaFactor = Math.max(0, Math.min(1, (0.975 - lum) / 0.065));
        data[idx + 3] = Math.round(data[idx + 3] * alphaFactor);
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

export const OuzPortrait: React.FC = () => {
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId = 0;
    let isMounted = true;

    // Target and smoothed eye offset in source-image pixels
    const targetOffset = { x: 0, y: 0 };
    const currentOffset = { x: 0, y: 0 };

    let baseCanvas: HTMLCanvasElement | null = null;
    let leftIrisSprite: HTMLCanvasElement | null = null;
    let rightIrisSprite: HTMLCanvasElement | null = null;

    const renderEye = (
      ctx: CanvasRenderingContext2D,
      eye: EyeSpec,
      irisSprite: HTMLCanvasElement,
      ox: number,
      oy: number
    ) => {
      ctx.save();
      traceEyeAperture(ctx, eye);
      ctx.clip();

      // 1. Shaded 3D Eyeball Sclera fill matching original portrait sclera tones
      const scleraGrad = ctx.createRadialGradient(
        eye.irisCx + ox * 0.25,
        eye.irisCy + 4,
        8,
        eye.irisCx,
        eye.irisCy,
        74
      );
      scleraGrad.addColorStop(0, '#FAF0F1');
      scleraGrad.addColorStop(0.62, '#E5D5D6');
      scleraGrad.addColorStop(0.88, '#BCA09D');
      scleraGrad.addColorStop(1, '#8A5E56');
      ctx.fillStyle = scleraGrad;
      ctx.fillRect(
        eye.leftCorner[0] - 10,
        eye.topPeak[1] - 25,
        eye.rightCorner[0] - eye.leftCorner[0] + 20,
        eye.bottomPeak[1] - eye.topPeak[1] + 50
      );

      // Subtle pink inner tear duct caruncle
      const [tdx, tdy] = eye.tearDuct;
      const ductGrad = ctx.createRadialGradient(tdx, tdy, 2, tdx, tdy, 16);
      ductGrad.addColorStop(0, 'rgba(185, 95, 82, 0.85)');
      ductGrad.addColorStop(1, 'rgba(185, 95, 82, 0)');
      ctx.fillStyle = ductGrad;
      ctx.beginPath();
      ctx.arc(tdx, tdy, 16, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw the photorealistic moving Iris + Pupil + Catchlight
      const r = Math.ceil(eye.irisRadius);
      ctx.drawImage(
        irisSprite,
        eye.irisCx - r + ox,
        eye.irisCy - r + oy
      );

      // 3. Upper eyelid cast shadow over top of sclera & moving iris
      const topShadow = ctx.createLinearGradient(
        eye.irisCx,
        eye.topPeak[1] - 6,
        eye.irisCx,
        eye.topPeak[1] + 22
      );
      topShadow.addColorStop(0, 'rgba(12, 4, 2, 0.82)');
      topShadow.addColorStop(0.45, 'rgba(28, 11, 7, 0.35)');
      topShadow.addColorStop(1, 'rgba(28, 11, 7, 0)');
      ctx.fillStyle = topShadow;
      ctx.fillRect(
        eye.leftCorner[0] - 10,
        eye.topPeak[1] - 15,
        eye.rightCorner[0] - eye.leftCorner[0] + 20,
        42
      );

      // 4. Re-stroke crisp upper eyelash line along top aperture boundary
      ctx.beginPath();
      ctx.moveTo(eye.leftCorner[0], eye.leftCorner[1]);
      ctx.quadraticCurveTo(
        eye.topPeak[0],
        eye.topPeak[1] - ((eye.leftCorner[1] + eye.rightCorner[1]) * 0.5 - eye.topPeak[1]),
        eye.rightCorner[0],
        eye.rightCorner[1]
      );
      ctx.lineWidth = 5.5;
      ctx.strokeStyle = '#090302';
      ctx.stroke();

      ctx.restore();
    };

    const renderFrame = () => {
      if (!isMounted) return;

      // Smooth spring-like interpolation toward target cursor gaze
      currentOffset.x += (targetOffset.x - currentOffset.x) * 0.14;
      currentOffset.y += (targetOffset.y - currentOffset.y) * 0.14;

      const canvas = displayCanvasRef.current;
      if (canvas && baseCanvas && leftIrisSprite && rightIrisSprite) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(baseCanvas, 0, 0);

          renderEye(ctx, LEFT_EYE, leftIrisSprite, currentOffset.x, currentOffset.y);
          renderEye(ctx, RIGHT_EYE, rightIrisSprite, currentOffset.x, currentOffset.y);
        }
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = displayCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Eye bridge center in viewport coordinates
      const eyeCenterX = rect.left + rect.width * 0.5;
      const eyeCenterY = rect.top + rect.height * 0.483;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;

      // Normalize by viewport distance with smooth tanh-like clamping
      const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.42;
      const nx = Math.max(-1, Math.min(1, dx / maxDist));
      const ny = Math.max(-1, Math.min(1, dy / maxDist));

      // Maximum natural gaze excursion in 1266x1243 image pixels
      targetOffset.x = nx * 16.5;
      targetOffset.y = ny * 9.5;
    };

    const handleMouseLeave = () => {
      targetOffset.x = 0;
      targetOffset.y = 0;
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!isMounted) return;
      baseCanvas = createCleanPortraitCanvas(img);
      leftIrisSprite = extractIrisSprite(baseCanvas, LEFT_EYE);
      rightIrisSprite = extractIrisSprite(baseCanvas, RIGHT_EYE);

      if (displayCanvasRef.current) {
        displayCanvasRef.current.width = baseCanvas.width;
        displayCanvasRef.current.height = baseCanvas.height;
      }

      rafId = requestAnimationFrame(renderFrame);
    };
    img.src = '/ouz-portrait.png';

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center">
      <canvas
        ref={displayCanvasRef}
        aria-label="OUZ.T - 3D Creator interactive portrait"
        className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
      />
    </div>
  );
};

export default OuzPortrait;
