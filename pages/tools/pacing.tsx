import Dropdown from "@/components/Dropdown";
import PageWrapper from "@/components/PageWrapper";
import Switch from "@/components/Switch";
import TimeInput from "@/components/TimeInput";
import { outTime } from "@/scripts";
import { useEffect, useState } from "react";
import Image from "next/image";

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
        return index >= 13;
      });

      setOutput(
        filteredList
          .filter((item, index) => index < 13)
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
        const add: boolean =
          item.min <= distance &&
          item.max >= distance &&
          item.value != distance;
        if (add) counter++;
        return add && counter <= 13;
      });
      counter = 0;
      const secondList = outputDistances.filter((item, index) => {
        const add: boolean =
          item.min <= distance &&
          item.max >= distance &&
          item.value != distance;
        if (add) counter++;
        return add && counter > 13;
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
    <PageWrapper
      page="Pacing"
      className="flex flex-col min-h-screen gap-4 p-4 text-center"
    >
      <h1 className="text-4xl">Calculate Paces</h1>
      <div className="grid sm:gap-4 sm:grid-cols-2 grow place-items-center">
        <div className="flex flex-col items-center h-full sm:h-3/4 justify-evenly">
          {isCustomOpen ? (
            <div className="flex flex-row items-center justify-center w-full gap-2 bg-white rounded-full overlay">
              <input
                type="number"
                placeholder="Custom Distance"
                className="p-4 text-2xl text-black bg-white rounded-full sm:text-3xl grow"
                onChange={(e) => setCustom(parseFloat(e.target.value))}
              />
              <Image
                src="/ban-icon.svg"
                onClick={() => {
                  setIsCustomOpen(false);
                  setCustom(0);
                  setDistance(0);
                }}
                className="w-16 h-16 pr-2 cursor-pointer"
                alt=""
                width="8"
                height="8"
              />
            </div>
          ) : (
            <Dropdown
              value={distance}
              items={inputDistances}
              placeholder="Distance"
              setValue={(value) => {
                setDistance(parseFloat(value.toString()));
              }}
            />
          )}
          <TimeInput time={time} setTime={setTime} />
            <Switch
              state={isLong}
              setState={setIsLong}
              options={["Show Less", "Show More"]}
            />
        </div>
        <div className="flex flex-row flex-wrap items-start justify-between w-full p-4 text-2xl text-left text-black whitespace-pre-wrap bg-white sm:text-3xl h-125 rounded-3xl">
          <p>{output.join("\n")}</p>
          <p>{secondOutput.join("\n")}</p>
        </div>
      </div>
    </PageWrapper>
  );
}
