interface CanvasPainting {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  prefersReducedMotion: boolean;
  fill: (width: number, height: number) => void;
  draw: (now: number) => void;
}

export const paintWhileOnScreen = ({
  canvas,
  context,
  prefersReducedMotion,
  fill,
  draw,
}: CanvasPainting) => {
  const loop = { frame: 0, isOnScreen: false };

  const animate = (now: number) => {
    draw(now);
    loop.frame = requestAnimationFrame(animate);
  };

  const startDrawing = () => {
    cancelAnimationFrame(loop.frame);
    if (prefersReducedMotion) {
      loop.frame = requestAnimationFrame(draw);
      return;
    }
    loop.frame = requestAnimationFrame(animate);
  };

  const resize = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    fill(width, height);
    if (loop.isOnScreen) startDrawing();
  };

  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      loop.isOnScreen = entry.isIntersecting;
      if (loop.isOnScreen) startDrawing();
      if (!loop.isOnScreen) cancelAnimationFrame(loop.frame);
    }),
  );

  resize();
  observer.observe(canvas);
  window.addEventListener('resize', resize);

  return () => {
    observer.disconnect();
    cancelAnimationFrame(loop.frame);
    window.removeEventListener('resize', resize);
  };
};
