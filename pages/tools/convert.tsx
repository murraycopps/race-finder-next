import Dropdown from "@/components/Dropdown";
import PageWrapper from "@/components/PageWrapper";
import Switch from "@/components/Switch";
import TimeInput from "@/components/TimeInput";
import { outTime } from "@/scripts";
import { useState, useEffect } from "react";

export default function Home() {
  const [distance, setDistance] = useState(1);
  const [time, setTime] = useState(0);
  const [output, setOutput] = useState([""]);
  const [isTime, setIsTime] = useState(false);
  const [disType, setDisType] = useState(1609.34);
  const [speed, setSpeed] = useState(0);

  const inputDistances = [
    { name: "Mi", value: 1609.34 },
    { name: "Km", value: 1000 },
    { name: "M", value: 1 },
    { name: "Mar", value: 42195 },
  ];

  const inputSpeeds = [
    { name: "Mph", value: 1609.34 },
    { name: "Kph", value: 1000 },
    { name: "M/s", value: 1 },
  ];

  const timeToSpeed = (distance: number, time: number, newDistance: number) => {
    return (3600 * distance) / time / newDistance;
  };

  const speedToTime = (speed: number, distance: number) => {
    if (distance != 1) return outTime(distance / speed);
    else return distance / speed;
  };

  useEffect(() => {
    if (!isTime) {
      const distanceInMeters = distance * disType;
      if (distance <= 0 || time <= 0) return;
      const outputLables = [
        "Time",
        "Seconds",
        "Mph",
        "Kph",
        "M/S",
        "Mins/Mile",
        "Mins/Km",
      ];
      const outputs = [
        outTime(time),
        time,
        Math.round(timeToSpeed(distanceInMeters, time, 1609.34) * 10) / 10,
        Math.round(timeToSpeed(distanceInMeters, time, 1000) * 10) / 10,
        Math.round((timeToSpeed(distanceInMeters, time, 1) / 3600) * 100) / 100,
        outTime((time / distanceInMeters) * 1609.34),
        outTime((time / distanceInMeters) * 1000),
      ];
      setOutput(
        outputLables.map((o, i) => outputLables[i] + ": " + outputs[i])
      );
    } else {
      if (distance <= 0 || speed <= 0) return;
      if (disType === 1) {
        const outputOptions = [
          { name: "Mile Time", value: 1609.34 },
          { name: "Km Time", value: 1000 },
          { name: "Meter Time", value: 1 },
          { name: "Marathon Time", value: 42195 },
          { name: "Mph", value: 1609.34 },
          { name: "Kph", value: 1000 },
          { name: "M/S", value: 1 },
        ];
        const outputs = outputOptions.map((o, i) => {
          if (i < 4) {
            const time = speedToTime(speed, o.value);
            if (typeof time === "string") return o.name + ": " + time;
            else return o.name + ": " + time;
          }
          if (o.value === disType) return "";
          if (o.value !== 1)
            return (
              o.name +
              ": " +
              Math.round(((speed * disType) / o.value) * 3600 * 10) / 10
            );
          return (
            o.name +
            ": " +
            Math.round(((speed * disType) / o.value / 3600) * 10) / 10
          );
        });
        setOutput(outputs.filter((o) => o));
      } else {
        const outputOptions = [
          { name: "Mile Time", value: 1609.34 },
          { name: "Km Time", value: 1000 },
          { name: "M Time", value: 1 },
          { name: "Marathon Time", value: 42195 },
          { name: "Mph", value: 1609.34 },
          { name: "Kph", value: 1000 },
          { name: "M/S", value: 1 },
        ];
        const outputs = outputOptions.map((o, i) => {
          if (i < 4) {
            const time = speedToTime((speed * disType) / 3600, o.value);
            if (typeof time === "string") return o.name + ": " + time;
            else return o.name + ": " + outTime(time);
          }
          if (o.value === disType) return "";
          if (o.value !== 1)
            return (
              o.name +
              ": " +
              Math.round(((speed * disType) / o.value) * 10) / 10
            );
          return (
            o.name +
            ": " +
            Math.round(((speed * disType) / o.value / 3600) * 10) / 10
          );
        });
        setOutput(outputs.filter((o) => o));
      }
    }
  }, [disType, distance, time, speed, isTime]);

  return (
    <PageWrapper
      page="Convert"
      className="flex flex-col min-h-screen gap-4 p-4 text-center"
    >
      <h1 className="text-4xl">Convert Time and Speed</h1>
      <div className="flex flex-col gap-4 pb-8 sm:grid sm:grid-cols-2 justify-evenly grow place-items-center">
        <div className="flex flex-col items-center w-full sm:h-3/4 justify-evenly">
          {isTime ? (
            <>
              <input
                type="number"
                onChange={(e) => {
                  if (e.target.value != "")
                    setSpeed(parseFloat(e.target.value));
                  else setSpeed(0);
                }}
                placeholder="Speed"
                className="w-full p-4 text-3xl text-black bg-white rounded-full"
              />
              <Dropdown
                items={inputSpeeds}
                value={disType}
                setValue={(value) => setDisType(parseFloat(value.toString()))}
              />
            </>
          ) : (
            <>
              <TimeInput time={time} setTime={setTime} />
              <input
                type="number"
                onChange={(e) => {
                  if (e.target.value != "")
                    setDistance(parseFloat(e.target.value));
                  else setDistance(0);
                }}
                placeholder="Distance"
                className="w-full p-4 text-3xl text-black bg-white rounded-full"
              />
              <Dropdown
                items={inputDistances}
                value={disType}
                setValue={(value) => setDisType(parseFloat(value.toString()))}
              />
            </>
          )}
          <Switch
            state={isTime}
            setState={setIsTime}
            options={["Time", "Distance"]}
          />
        </div>
        <div className="flex-row flex-wrap items-start justify-between flex-1 w-full p-4 text-3xl text-left text-black whitespace-pre-wrap bg-white lex sm:h-3/4 rounded-3xl">
          <p>{output.join("\n")}</p>
        </div>
      </div>
    </PageWrapper>
  );
}
