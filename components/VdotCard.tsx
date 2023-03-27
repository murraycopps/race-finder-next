import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import TimeInput from "./TimeInput";
import { vdotTable } from "@/scripts/vdot-table";

export const DISTANCES = [
    { name: 'Mile', 'value': "DISTANCE_MILE", distance: 1609 },
    { name: '3000m', 'value': "DISTANCE_3k", distance: 3000 },
    { name: '5000m', 'value': "DISTANCE_5k", distance: 5000 },
    { name: '10,000m', 'value': "DISTANCE_10k", distance: 10000 },
    { name: 'Half-Marathon', 'value': "DISTANCE_HALF", distance: 21097 },
    { name: 'Marathon', 'value': "DISTANCE_MARATHON", distance: 42195 }
  ];

export default function PacingCard() {
  const [time, setTime] = useState(0);
  const [dis, setDis] = useState("");
  const [vdot, setVdot] = useState(0);

  useEffect(() => {
    if (dis !== "" && time > 0) {
      const distance = DISTANCES.find((d) => d.value === dis);
      if (distance) {
        const distanceTable =
          vdotTable.TIMES[distance.value as keyof typeof vdotTable.TIMES];
        const distanceArray = Object.entries(distanceTable);
        const closestTime = distanceArray.reduce((prev, curr) => {
          return Math.abs(curr[1] - time) < Math.abs(prev[1] - time)
            ? curr
            : prev;
        });
        const closestVdot = parseInt(closestTime[0]);
        const percentDiff = closestTime[1] / time;
        const preciseVdot = closestVdot * percentDiff;
        console.log(closestVdot, percentDiff, preciseVdot);
        setVdot(preciseVdot);
      }
    }
  }, [dis, time]);

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8 p-4 rounded-3xl bg-slate-600">
      <h3 className="text-2xl font-bold">Calculate Vdot Pace</h3>
      <Dropdown
        items={DISTANCES}
        placeholder="Distance"
        value={dis}
        setValue={(val) => setDis(val.toString())}
      />
      <TimeInput time={time} setTime={setTime} />
      <p className="text-5xl font-bold">{Math.round(vdot * 100) / 100}</p>
      <Link
        href="/tools/pacing"
        className="w-2/3 px-8 py-4 text-2xl transition-all bg-blue-500 hover:bg-blue-600 rounded-3xl"
      >
        See More
      </Link>
    </div>
  );
}
