import Dropdown from "@/components/Dropdown";
import PageWrapper from "@/components/PageWrapper";
import Switch from "@/components/Switch";
import TimeInput from "@/components/TimeInput";
import { outTime } from "@/scripts";
import { DISTANCES, vdotTable } from "@/scripts/vdot-table";
import { useState, useEffect } from "react";

export default function VDOT() {
  const [value, setValue] = useState("");
  const [vdot, setVDOT] = useState({ vdot: "", precise: 0, percentOff: 0 });
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState([""]);
  const [isRace, setIsRace] = useState(true);
  const [isPace, setIsPace] = useState(false);
  const [outOfRange, setOutOfRange] = useState(false);

  useEffect(() => {
    if (value === "" || time === 0) {
      setOutput([""]);
      setVDOT({ vdot: "", precise: 0, percentOff: 0 });
      setOutOfRange(false);
      return;
    }
    const distance = DISTANCES.find((d) => d.value === value);
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
      setVDOT({
        vdot: closestVdot.toString(),
        precise: preciseVdot,
        percentOff: percentDiff,
      });
      if (
        (closestVdot === 85 && percentDiff > 1) ||
        (closestVdot === 30 && percentDiff < 1)
      ) {
        setOutOfRange(true);
      } else {
        setOutOfRange(false);
      }
    }
  }, [value, isRace, isPace, time]);

  useEffect(() => {
    if (
      vdot.precise === 0 ||
      vdot.vdot === "" ||
      vdot.precise < 10 ||
      vdot.precise > 100
    ) {
      setOutput([""]);
      return;
    }
    if (isRace) {
      const timesList = vdotTable.TIMES;
      const vdotArray = Object.entries(timesList);
      const outputs = vdotArray.map((d) => {
        const distance = DISTANCES.find((dist) => dist.value === d[0]);
        const distanceLabel = distance?.name || distance?.value;
        const currentDistance = distance?.distance || 1;
        const time =
          d[1][vdot.vdot as keyof typeof d[1]] /
          (isPace ? currentDistance / 1609.34 : 1);
        return `${distanceLabel}: ${outTime(time / vdot.percentOff)}`;
      });
      setOutput(outputs);
    } else {
      const vdotObject =
        vdotTable.PACES[vdot.vdot as keyof typeof vdotTable.PACES];
      const vdotArray = Object.entries(vdotObject);
      const labelList = [
        "Easy",
        "Marathon",
        "Threshold",
        "Interval",
        "Repitition",
      ];
      const outputs = vdotArray.map((d, i) => {
        const time = d[1][i < 3 ? "mile" : "400m"];
        if (i > 2)
          return `${labelList[i]}: ${outTime(
            time / vdot.percentOff
          )} (${outTime((time / vdot.percentOff) * 4.02335)})`;
        if (i != 0)
          return `${labelList[i]}: ${outTime(time / vdot.percentOff)}`;
        return `${labelList[i]}: ${outTime(
          time / vdot.percentOff - 13
        )} - ${outTime(time / vdot.percentOff + 27)}`;
      });
      setOutput(outputs);
    }
  }, [vdot, isRace, isPace]);

  return (
    <PageWrapper
      page="Vdot"
      className="flex flex-col min-h-screen gap-4 p-4 overflow-x-hidden text-center"
    >
      <h1 className="text-4xl">Calculate Equivalent Times</h1>
      <div className="grid sm:grid-cols-2 sm:gap-4 grow place-items-center">
        <div className="flex flex-col items-center h-full sm:h-3/4 justify-evenly">
          <Dropdown
            items={DISTANCES}
            placeholder="Distance"
            value={value}
            setValue={(value) => setValue(value.toString())}
          />
          <TimeInput time={time} setTime={setTime} />
          {outOfRange && (
            <div className="absolute z-50 p-2 text-lg text-white bg-red-500 rounded-lg error">Time is out of range</div>
          )}
          <Switch
            options={["Race Times", "Training Times"]}
            state={isRace}
            setState={setIsRace}
          />
          <Switch
            options={["Pace", "Time"]}
            state={isRace ? isPace : true}
            setState={(state) => {
              if (isRace) setIsPace(state);
            }}
          />
        </div>
        <div className="relative flex flex-wrap items-start justify-start w-full p-4 text-3xl text-left text-black whitespace-pre-wrap bg-white -row sm:flex-col sm:text-4xl min-h-96 sm:h-3/4 rounded-3xl">
          {vdot.precise !== 0 && vdot.precise < 100 && vdot.precise > 10 && (
            <p className="text-5xl">
              Vdot: {vdot.precise.toFixed(2)}
            </p>
          )}
          <p className="">{output.join("\n")}</p>

        </div>
      </div>
    </PageWrapper>
  );
}
