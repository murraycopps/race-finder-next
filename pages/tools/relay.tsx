import PageWrapper from "@/components/PageWrapper";
import TimeInput from "@/components/TimeInput";
import { outTime } from "@/scripts";
import { useState, useEffect } from "react";

export default function Home() {
  const [times, setTimes] = useState([0, 0, 0, 0]);
  const [output, setOutput] = useState("");
  const [numTimes, setNumTimes] = useState(4);

  useEffect(() => {
    setOutput(outTime(times.reduce((a, b) => a + b, 0)));
  }, [times]);

  const insertAtIndex = (value: any, index: number) => {
    if (value === "") value = 0;
    const newArray = [...times];
    newArray[index] = parseFloat(value);
    setTimes(newArray);
  };

  return (
    <PageWrapper
      page="Relay"
      className="flex flex-col min-h-screen gap-4 p-4 text-center"
    >
      <h1 className="text-4xl">Add Times for Relay</h1>
      <div className="flex flex-col h-full gap-4 sm:grid sm:grid-cols-2 sm:h-auto grow place-items-center">
        <div className="flex flex-col items-center gap-2 grow sm:grow-0 sm:h-3/4 justify-evenly">
          {times.map((time, index) => {
            return (
              <TimeInput
                key={index}
                time={time}
                setTime={(value: number) => {
                  insertAtIndex(value, index);
                }}
              />
            );
          })}
          <div className="grid self-end w-full grid-cols-3 gap-4">
            <button
              className="p-4 text-2xl text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={() => {
                setTimes((oldValue) => [...oldValue, 0]);
                setNumTimes((oldValue) => oldValue + 1);
              }}
            >
              Add Time
            </button>
            <button
              className="p-4 text-2xl text-white bg-red-500 rounded-full hover:bg-red-600"
              onClick={() => {
                if (numTimes !== 1) {
                  setTimes((oldValue) => [...oldValue.slice(0, -1)]);
                  setNumTimes((oldValue) => oldValue - 1);
                }
              }}
            >
              Remove Time
            </button>
            <button
              className="p-4 text-2xl text-white bg-green-500 rounded-full hover:bg-green-600 hover:bg-green-600s"
              onClick={() => {
                setTimes([0, 0, 0, 0]);
                setNumTimes(4);
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="w-full p-4 text-3xl text-left text-black whitespace-pre-wrap bg-white sm:h-3/4 rounded-3xl">
          <p>{output}</p>
        </div>
      </div>
    </PageWrapper>
  );
}
