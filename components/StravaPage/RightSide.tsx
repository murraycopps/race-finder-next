import { Athlete, Shoe } from "@/scripts/stravaTypes";
import { useState, useEffect, useRef } from "react";

const RightSide = ({ data }: { data: Athlete }) => {
    const [wide, setWide] = useState(false);
    const [delayedWide, setDelayedWide] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const timeout = setTimeout(
        () => {
          setDelayedWide(wide);
        },
        wide ? 50 : 250
      );
      return () => clearTimeout(timeout);
    }, [wide]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setWide(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref]);
  
    return (
        <div
            ref={ref}
          className={`absolute h-196 right-0 hidden lg:flex flex-col items-center justify-center strava-right ${
            wide ? "w-128 px-16" : "w-64 pl-12 pr-4"
          } gap-6 py-8 rounded-bl-3xl h-192 bg-faded-base-500 transition-all-300 `}
        >
          <h2 className="text-3xl font-bold text-center text-white"> Shoes: </h2>
          {data.shoes.map((shoe: Shoe, i) => (
            <div className="flex flex-row items-center justify-between w-full gap-1" key={i}>
              <p className="max-w-full text-lg font-bold text-center text-white truncate text-ellipsis">
                {shoe.name.replace(shoe.nickname || "", "")}
              </p>
              {delayedWide && (
                <p className="w-full text-lg font-bold text-right text-white max-w-3xs">
                  {shoe.converted_distance} Mi
                </p>
              )}
            </div>
          ))}
          {/* button to expand */}
          <button onClick={() => setWide(!wide)} className="absolute left-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-12 h-12 transition-all-300 ${
                wide ? "" : "rotate-180"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
    );
  };

  export default RightSide;