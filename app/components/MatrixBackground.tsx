import { type ReactNode, useEffect, useRef } from "react";

interface MatrixBackgroundProps {
  width: number;
  height: number;
}

export default function MatrixBackground({
  width,
  height
}: MatrixBackgroundProps): ReactNode {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const ctx = canvas.current.getContext("2d");
    if (ctx === null) return;

    let alphabet =
      "001010100001011110101000101000010000000100010110111111010100010100001101000110111101000";
    const letters = alphabet.split("");

    const fontSize = 20;
    const columns = width / fontSize;

    const drops: number[] = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const interval = setInterval(
      () => draw(ctx, width, height, drops, letters, fontSize),
      33
    );
    return () => clearInterval(interval);
  }, [canvas, height, width]);

  return <canvas ref={canvas} height={height} width={width}></canvas>;
}

function draw(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  drops: number[],
  letters: string[],
  fontSize: number
) {
  ctx.fillStyle = "rgba(0, 0, 0, .1)";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = "#0f0";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > height && Math.random() > 0.95) {
      drops[i] = 0;
    }
  }
}
