import { outTime } from "@/scripts";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import TimeInput from "../TimeInput";

const inputDistances = [
  { name: "2 Mile", value: 3218.69 },
  { name: "5k", value: 5000 },
  { name: "10k", value: 10000 },
  { name: "Half Marathon", value: 21097 },
  { name: "Marathon", value: 42195 },
];

export default function PacingCard() {
  const [time, setTime] = useState(0);
  const [dis, setDis] = useState(0);
  const [pace, setPace] = useState(0);

  useEffect(() => {
    if (dis > 0 && time > 0) {
      setPace((time / dis) * 1609.34);
    }
  }, [dis, time]);

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-8 px-12 py-4 bg-wisteria-600 card-slant">
      <h3 className="text-2xl font-bold">Calculate Mile Pace</h3>
      <Dropdown
        items={inputDistances}
        placeholder="Distance"
        value={dis}
        setValue={(val) => setDis(parseFloat(val.toString()))}
      />
      <TimeInput time={time} setTime={setTime} />
      <p className="text-5xl font-bold">{outTime(pace)}</p>
      <Link
        href="/tools/pacing"
        className="w-2/3 px-8 py-4 text-2xl transition-all-300 bg-faded-purple-600 hover:bg-faded-purple-700 rounded-3xl"
      >
        See More
      </Link>
    </div>
  );
}
