import PageWrapper from "@/components/PageWrapper";
import Switch from "@/components/Switch";
import TimeInput from "@/components/TimeInput";
import { outTime } from "@/scripts";
import { useState, useEffect } from "react";

export default function Home() {
  const [time, setTime] = useState(0);

  const [elevation, setElevation] = useState(0);
  const [output, setOutput] = useState("");
  const [isPrediction, setIsPrediction] = useState(false);

  useEffect(() => {
    let newTime = time;
    if (!isPrediction) newTime -= (1.74 * elevation) / 10;
    else newTime += (1.74 * elevation) / 10;
    newTime = Math.max(newTime, 0);
    newTime = Math.round(newTime * 100) / 100;
    setOutput(outTime(newTime));
  }, [time, elevation, isPrediction]);

  return (
    <PageWrapper
      page="hill"
      className="flex flex-col min-h-screen gap-4 p-4 overflow-x-hidden text-center"
    >
      <h1 className="text-4xl">Calculate Hill Pace</h1>
      <div className="flex flex-col gap-4 pb-8 sm:grid sm:grid-cols-2 justify-evenly grow place-items-center">
        <div className="flex flex-col items-center grow sm:h-3/4 justify-evenly">
          <p className="w-full text-3xl">
            {isPrediction ? "Time on Flat" : "Time on Hill"}
          </p>
          <TimeInput time={time} setTime={setTime} />
          <input
            type="number"
            placeholder="Elevation Change"
            onChange={(e) => {
              if (e.target.value !== "")
                setElevation(parseFloat(e.target.value));
              else setElevation(0);
            }}
            className="w-full p-4 text-3xl text-black bg-white rounded-full"
          />
          <Switch
            state={isPrediction}
            setState={setIsPrediction}
            options={["Prediction", "Conversion"]}
          />
        </div>
        <div className="w-full p-4 text-3xl text-left text-black bg-white sm:h-3/4 rounded-3xl">
          <p>
            {isPrediction ? "Time on Hill" : "Time on Flat"}: {output}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
