

import { Stream } from "@/scripts/singleRunTypes";
import { useRef, useEffect } from "react";
import HRLineGraph from "./HRLineGraph";
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

  const maxLen = 500;
  const reduceData = (data: number[]): number[] => {
    if (data.length <= maxLen) return data;
    // average every other values
    const newData = [];
    for (let i = 0; i < data.length; i += 2) {
        newData.push((data[i] + data[i + 1]) / 2);
    }
    return reduceData(newData);
    };
  

export default function HeartRateStream({ stream }: { stream: Stream }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // const points = reduceData(stream.data);
    
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
    //   const barColor = "hsl(" + Math.round((hr / max) * 360) + ", 100%, 50%)";
    const barColor = "rgb(239 68 68)"

      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, barWidth, height);
    });
  }, [stream]);

  return (
    <div className="flex flex-col w-full gap-8 aspect-video">
      <h2 className="text-4xl font-bold text-center">
        {names[stream.type] || stream.type}
      </h2>
      <div className="w-full h-full">
        {/* <canvas ref={canvasRef} className="w-full h-full"></canvas> */}
        <HRLineGraph  labels={reduceData(stream.data).map(p => p.toString())} data={reduceData(stream.data)} />
      </div>
    </div>
  );
}
