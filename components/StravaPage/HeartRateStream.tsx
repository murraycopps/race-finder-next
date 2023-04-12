

import { Stream } from "@/scripts/singleRunTypes";
import { useRef, useEffect } from "react";
type Names = {
    [key: string]: string;
  };
  
  const names: Names = {
    heartrate: "Heart Rate",
    altitude: "Altitude",
    velocity_smooth: "Velocity",
    cadence: "Cadence",
    temp: "Temperature",
    moving: "Moving",
    grade_smooth: "Grade",
  };
  

export default function HeartRateStream({ stream }: { stream: Stream }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get the maximum heart rate value
    const max = Math.max(...stream.data);

    // Calculate the width and height of each bar
    const barWidth = canvas.width / stream.data.length;
    const barHeightUnit = canvas.height / max;

    // Draw the bars on the canvas
    stream.data.forEach((hr, i) => {
      const height = hr * barHeightUnit;
      const x = i * barWidth;
      const y = canvas.height - height;
      const barColor = "hsl(" + Math.round((hr / max) * 360) + ", 100%, 50%)";

      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, barWidth, height);
    });
  }, [stream]);

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-center">
        {names[stream.type] || stream.type}
      </h2>
      <div className="w-full aspect-video">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
}
