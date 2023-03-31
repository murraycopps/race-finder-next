import { useState, useEffect } from "react";

const RightSide = ({ data }: { data: any }) => {
    const [wide, setWide] = useState(false);
    const [delayedWide, setDelayedWide] = useState(false);
    useEffect(() => {
      const timeout = setTimeout(
        () => {
          setDelayedWide(wide);
        },
        wide ? 50 : 250
      );
      return () => clearTimeout(timeout);
    }, [wide]);
  
    return (
      <div className="relative w-64 h-196">
        <div
          className={`absolute right-0 flex flex-col items-center justify-center ${
            wide ? "w-128 px-16" : "w-64 pl-12 pr-4"
          } gap-6 py-8 rounded-bl-3xl h-192 bg-faded-base-300 transition-all-300 `}
        >
          <h2 className="text-3xl font-bold text-center text-white"> Shoes: </h2>
          {data.shoes.map((shoe: any) => (
            <div className="flex flex-row items-center justify-between w-full gap-1">
              <p className="max-w-full text-lg font-bold text-center text-white truncate text-ellipsis">
                {shoe.name.replace(shoe.nickname, "")}
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
      </div>
    );
  };

  export default RightSide;