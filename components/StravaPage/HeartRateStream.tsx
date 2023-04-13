

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



  return (
    <div className="flex flex-col w-full gap-8 aspect-2-1">
      <h2 className="text-4xl font-bold text-center">
        {names[stream.type] || stream.type}
      </h2>
      <div className="grow">
        {/* <HRLineGraph  labels={reduceData(stream.data).map(p => p.toString())} data={reduceData(stream.data)} /> */}
        <HRLineGraph  labels={stream.data.map(p => p.toString())} data={stream.data} />

      </div>
    </div>
  );
}
