import Dropdown from "@/components/Dropdown";
import TimeInput from "@/components/TimeInput";
import { outTime } from "@/scripts";
import { useEffect, useState } from "react";

export default function Home() {
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState([""]);
  const [secondOutput, setSecondOutput] = useState([""]);
  const [isLong, setIsLong] = useState(false);
  const [custom, setCustom] = useState(0);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const inputDistances = [
    { value: 200 },
    { value: 400 },
    { value: 800 },
    { value: 1500 },
    { name: "Mile", value: 1609.34 },
    { name: "3k", value: 3000 },
    { name: "2 Mile", value: 3218.69 },
    { name: "5k", value: 5000 },
    { name: "10k", value: 10000 },
    { name: "Half Marathon", value: 21097 },
    { name: "Marathon", value: 42195 },
    { name: "Custom", value: -1 },
  ];

  useEffect(() => {
    const outputDistances = [
      { value: 100, max: 3218.69, min: 0 },
      { value: 200, max: 5000, min: 0 },
      { value: 400, max: 10000, min: 0 },
      { value: 600, max: 4000, min: 0 },
      { value: 800, max: 20000, min: 0 },
      { value: 1000, max: 10000, min: 0 },
      { value: 1200, max: 3218.69, min: 1200 },
      { value: 1500, max: 40000, min: 0 },
      { value: 1600, max: 1609.34, min: 1600 },
      { value: 1609.34, max: 50000, min: 0 },
      { value: 2000, max: 3218.69, min: 2000 },
      { value: 2400, max: 3218.69, min: 2400 },
      { value: 2800, max: 3218.69, min: 2800 },
      { value: 3000, max: 50000, min: 200 },
      { value: 3218.69, max: 50000, min: 200 },
      { value: 5000, max: 50000, min: 400 },
      { value: 10000, max: 50000, min: 1500 },
      { value: 21097.5, max: 50000, min: 5000 },
      { value: 42195, max: 50000, min: 5000 },
    ];

    if (distance === -1) {
      setIsCustomOpen(true);
    }
    if (distance <= 0 || time <= 0) {
      setOutput([""]);
      setSecondOutput([""]);
    } else if (isLong) {
      const filteredList = outputDistances.filter((item) => {
        const isSplitOption =
          item.value === 1200 ||
          item.value === 2000 ||
          item.value === 2400 ||
          item.value === 2800;
        const isInRange = item.min <= distance && item.max >= distance;
        return item.value != distance && (!isSplitOption || isInRange);
      });
      const secondList = filteredList.filter((item, index) => {
        return index >= 11;
      });

      setOutput(
        filteredList
          .filter((item, index) => index < 11)
          .map((dist, index) => {
            return `${Math.floor(dist.value)}: ${outTime(
              (time / distance) * dist.value
            )}`;
          })
      );
      setSecondOutput(
        secondList.map((dist, index) => {
          return `${Math.floor(dist.value)}: ${outTime(
            (time / distance) * dist.value
          )}`;
        })
      );
    } else {
      let counter = 0;
      const filteredList = outputDistances.filter((item, index) => {
        const add =
          item.min <= distance &&
          item.max >= distance &&
          item.value != distance;
        if (add) counter++;
        return add && counter <= 11;
      });
      counter = 0;
      const secondList = outputDistances.filter((item, index) => {
        const add =
          item.min <= distance &&
          item.max >= distance &&
          item.value != distance;
        if (add) counter++;
        return add && counter > 11;
      });
      setOutput(
        filteredList.map((dist) => {
          return `${Math.floor(dist.value)}: ${outTime(
            (time / distance) * dist.value
          )}`;
        })
      );
      setSecondOutput(
        secondList.map((dist) => {
          return `${Math.floor(dist.value)}: ${outTime(
            (time / distance) * dist.value
          )}`;
        })
      );
    }
  }, [distance, time, isLong]);

  useEffect(() => {
    if (custom > 0) {
      setDistance(custom);
    }
  }, [custom]);

  return (
    <div className="flex flex-col min-h-screen text-center gap-4 p-4">
      <h1 className="text-4xl">Calculate Paces</h1>
      <div className="grid grid-cols-2 gap-4 grow place-items-center">
        <div className="h-3/4 flex flex-col items-center justify-evenly">
          <div className="w-full text-2xl ">
            <Dropdown
              value={distance}
              items={inputDistances}
              placeholder="Distance"
              setValue={(value) => {
                setDistance(parseFloat(value.toString()));
              }}
            />
            {isCustomOpen && (
              <div className="w-full overlay">
                <input
                  type="number"
                  placeholder="Custom Distance"
                  className="input custom"
                  onChange={(e) => setCustom(parseFloat(e.target.value))}
                />
                <img
                  src="/ban-icon"
                  onClick={() => {
                    setIsCustomOpen(false);
                    setCustom(0);
                    setDistance(0);
                  }}
                />
              </div>
            )}
          </div>
          <TimeInput time={time} setTime={setTime} />

          <div
            className={`switch ${isLong ? "left" : "right"}`}
            onClick={() => setIsLong(!isLong)}
          >
            {isLong ? "Show Less" : "Show More"}
            <span className="switch-item"></span>
          </div>
        </div>
        <div className="relative flex flex-row flex-wrap items-start justify-between w-full p-8 text-xl text-black whitespace-pre-wrap bg-white h-3/4 rounded-3xl">
          <div className="w-full text-2xl">{output.join("\n")}</div>
          <div className="w-full text-2xl">{secondOutput.join("\n")}</div>
        </div>
      </div>
    </div>
  );
}
