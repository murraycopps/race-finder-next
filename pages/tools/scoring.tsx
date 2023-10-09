import Dropdown from "@/components/Dropdown";
import PageWrapper from "@/components/PageWrapper";
import Switch from "@/components/Switch";
import { getTrackScores, getXCScores } from "@/scripts/scoring";
import { createRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Scoring() {
  const [inputs, setInputs] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isTrack, setIsTrack] = useState(false);
  const [scores, setScores] = useState<any>(null);
  const [numEvents, setNumEvents] = useState(0);
  const [custom, setCustom] = useState(false);

  const inputRefs = Array(10)
    .fill(0)
    .map((_, i) => createRef<HTMLInputElement>());

  const eventOptions = [
    { name: "Indoor - 10 Events", value: 10 },
    { name: "Outdoor - 16 Events", value: 16 },
    { name: "Professional - 21 Events", value: 21 },
    { name: "Custom", value: 0 },
  ];

  const insertAtIndex = (value: any, index: number) => {
    if (value === "") value = 0;
    const newArray = [...inputs];
    newArray[index] = parseFloat(value);
    setInputs(newArray);
  };

  useEffect(() => {
    setInputs(isTrack ? [0, 0, 0, 0, 0, 0] : [0, 0, 0]);
    if (!inputRefs[0].current) return;
    inputRefs.forEach((ref: any) => {
      if (ref.current) ref.current.value = "";
    });
  }, [isTrack]);

  useEffect(() => {
    if (isTrack) {
      const scores = getTrackScores(inputs, numEvents);
      setScores(scores);
    } else {
      const scores = getXCScores(inputs);
      setScores(scores);
    }
  }, [inputs, numEvents, isTrack]);
  return (
    <PageWrapper
      page="scoring"
      className="flex flex-col min-h-screen gap-4 p-4 text-center"
    >
      <h1 className="text-4xl">Calculate {isTrack ? "Track" : "XC"} Scores</h1>
      <div className="flex flex-col gap-4 justify-evenly sm:grid sm:grid-cols-2 grow place-items-center">
        <div className="flex flex-col items-center justify-between w-full gap-2 sm:h-3/4">
          {isTrack ? (
            <>
              {custom ? (
                  <div className="flex flex-row items-center justify-center w-full gap-2 bg-white rounded-full overlay">
                    <input
                      type="number"
                      placeholder="Custom Distance"
                      className="p-4 text-3xl text-black bg-white rounded-full grow"
                      onChange={(e) =>
                        setNumEvents(
                          parseFloat(e.target.value ? e.target.value : "0")
                        )
                      }
                    />
                    <Image
                      src="/ban-icon.svg"
                      onClick={() => {
                        setCustom(false);
                      }}
                      className="w-16 h-16 pr-2 cursor-pointer"
                      alt=""
                    />
                  </div>
              ) : (
                <Dropdown
                  placeholder="Enter Number of Events"
                  items={eventOptions}
                  value={numEvents}
                  setValue={(value) => {
                    setNumEvents(parseFloat(value.toString()));
                    setCustom(value === 0);
                  }}
                />
              )}
              <input
                ref={inputRefs[0]}
                type="number"
                name="num-firsts"
                placeholder="Number of Firsts"
                className="w-full p-4 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 0)}
              />

              <input
                ref={inputRefs[1]}
                type="number"
                name="num-seconds"
                placeholder="Num-Seconds"
                className="w-full p-4 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 1)}
              />

              <input
                ref={inputRefs[2]}
                type="number"
                name="num-thirds"
                placeholder="Num-Thirds"
                className="w-full p-4 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 2)}
              />
              <div style={{ flexGrow: 100 }}></div>
            </>
          ) : (
            <>
              <input
                ref={inputRefs[3]}
                type="number"
                placeholder="1st Place"
                name="1st"
                className="w-full p-3 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 0)}
              />

              <input
                ref={inputRefs[4]}
                type="number"
                placeholder="2nd Place"
                name="2nd"
                className="w-full p-3 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 1)}
              />

              <input
                ref={inputRefs[5]}
                type="number"
                placeholder="3rd Place"
                name="3rd"
                className="w-full p-3 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 2)}
              />

              <input
                ref={inputRefs[6]}
                type="number"
                placeholder="4th Place"
                name="4th"
                className="w-full p-3 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 3)}
              />

              <input
                ref={inputRefs[7]}
                type="number"
                placeholder="5th Place"
                name="5th"
                className="w-full p-3 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 4)}
              />

              <input
                ref={inputRefs[8]}
                type="number"
                placeholder="6th Place"
                name="6th"
                className="w-full p-3 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 5)}
              />

              <input
                ref={inputRefs[9]}
                type="number"
                placeholder="7th Place"
                name="7th"
                id="7th"
                className="w-full p-3 text-2xl text-black bg-white rounded-full"
                onChange={(event) => insertAtIndex(event.target.value, 6)}
              />
            </>
          )}
          <Switch
            state={isTrack}
            setState={setIsTrack}
            options={["Track", "XC"]}
          />
        </div>

        <div className="w-full p-4 text-3xl text-left text-black whitespace-pre-wrap bg-white sm:h-3/4 rounded-3xl">
          <p>{scores}</p>
        </div>
      </div>
    </PageWrapper>
  );
}
