import { useEffect, useState } from "react";
export default function TimeInput({
  time,
  setTime,
}: {
  time: number;
  setTime: (time: number) => void;
}) {
  const [hour, setHour] = useState(Math.floor(time / 3600));
  const [min, setMin] = useState(Math.floor((time / 60) % 60));
  const [sec, setSec] = useState(time % 60);
  useEffect(() => {
    if (hour < 0) setHour(0);
    if (min < 0) setMin(0);
    if (sec < 0) setSec(0);
    setTime(hour * 3600 + min * 60 + sec);
  }, [hour, min, sec]);

  useEffect(() => {
    setHour(Math.floor(time / 3600));
    setMin(Math.floor((time / 60) % 60));
    setSec(Math.round(time % 60 * 10000) / 10000);
  }, [time]);
  return (
    <div className="text-3xl text-black grid grid-cols-3">
      <div className="relative w-full h-full">
        <input
          type="number"
          placeholder="Hour"
          name="hour"
          id="hour"
          className="w-full px-4 py-4 rounded-l-full"
          value={hour ? hour : ""}
          onChange={(event) => {
            if (event.target.value != "")
              setHour(parseFloat(event.target.value));
            else setHour(0);
          }}
        />
        <span className="absolute right-0 z-10 text-4xl translate-x-1/2 bottom-4">:</span>
      </div>
      <div className="relative w-full h-full">
        <input
          type="number"
          placeholder="Min"
          name="min"
          id="min"
          className="w-full px-4 py-4"
          value={min ? min : ""}
          onChange={(event) => {
            if (event.target.value != "")
              setMin(parseFloat(event.target.value));
            else setMin(0);
          }}
        />
        <span className="absolute right-0 z-10 text-4xl translate-x-1/2 bottom-4">:</span>
      </div>
      <input
        type="number"
        placeholder="Sec"
        name="sec"
        id="sec"
        className="w-full px-4 py-4 rounded-r-full"
        value={sec ? sec : ""}
        onChange={(event) => {
          if (event.target.value != "") setSec(parseFloat(event.target.value));
          else setSec(0);
        }}
      />
    </div>
  );
}
