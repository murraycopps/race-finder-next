// create a component that has two inputs one is distance and the other is time

import { vdotTable } from "@/scripts/vdot-table";
import { useEffect, useState } from "react";
import TimeInput from "./TimeInput";

// and then it will calculate the vdot for that distance and time
export default function Intensity() {
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [vdot, setVDOT] = useState(0);
  const [useMeters, setUseMeters] = useState(false);

  useEffect(() => {
    if (distance > 0 && time > 0) {
    //   const milePace = (time * 1609) / distance; 
        const milePace = useMeters ? (time * 1609) / distance : time / distance;
      if (distance) {
        const distanceTable = vdotTable.TIMES["DISTANCE_MILE"];
        const distanceArray = Object.entries(distanceTable);
        const closestTime = distanceArray.reduce((prev, curr) => {
          return Math.abs(curr[1] - milePace) < Math.abs(prev[1] - milePace)
            ? curr
            : prev;
        });
        const closestVdot = parseInt(closestTime[0]);
        const percentDiff = closestTime[1] / milePace;
        const preciseVdot = closestVdot * percentDiff;
        setVDOT(useMeters ? (preciseVdot * distance) / 1609 : preciseVdot);
      }
    }
  }, [distance, time, useMeters]);

  return (
    <div className="flex flex-col w-full p-8 text-3xl gap-8 rounded-3xl bg-wisteria-600">
      <h3 className="text-3xl font-bold text-center">Estimate Vdot Score</h3>
      <div className="grid grid-cols-4">
        <input
          type="number"
          value={distance}
          className="w-full p-4 text-black rounded-full col-span-3"
          placeholder="Distance"
          onChange={(event) => setDistance(parseFloat(event.target.value))}
        />
        <button
          className="w-full p-4 text-white rounded-full col-span-1 bg-faded-base-600"
          onClick={() => setUseMeters(!useMeters)}
        >
          {useMeters ? "Meters" : "Miles"}
        </button>
      </div>
      <TimeInput time={time} setTime={setTime} />
        <div className="text-5xl font-bold text-center">{Math.round(vdot * 100) / 100}</div>
    </div>
  );
}
