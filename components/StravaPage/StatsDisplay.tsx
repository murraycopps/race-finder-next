import { Stats } from "@/scripts/stravaTypes";
import { useEffect, useState } from "react";
const StatsDisplay = ({ stats }: { stats: Stats }) => {
  const [index, setIndex] = useState(0);
  const [usedStats, setUsedStats] = useState<
    | Stats["all_run_totals"]
    | Stats["recent_run_totals"]
    | Stats["ytd_run_totals"]
  >(stats.all_run_totals);
  const options = ["all_run_totals", "ytd_run_totals", "recent_run_totals"];
  const names = ["All Time", "Year to Date", "Last 4 Weeks"];

  useEffect(() => {
    setUsedStats(stats[options[index] as keyof Stats]);
  }, [index, stats]);
  return (
    <div className="flex flex-col w-64 gap-4 sm:w-80">
      <h2 className="text-2xl font-bold text-center text-white">
        {names[index]} Stats:
      </h2>
      <DataCard
        name="Total Distance"
        value={`${Math.round(usedStats.distance / 1609.34)} Mi`}
      />
      <DataCard
        name="Total Elevation"
        value={`${Math.round(usedStats.elevation_gain)} Ft`}
      />
      <DataCard name="Total Runs" value={`${usedStats.count}`} />
      <DataCard
        name="Total Time"
        value={`${Math.round(usedStats.moving_time / 3600)} Hrs`}
      />
      <div className="flex justify-between sm:px-4">
        <button
          className="p-2 rounded-full bg-ronchi-600 hover:bg-ronchi-700"
          onClick={() => setIndex((index + 2) % 3)}
        >
          <svg
            className="w-12 h-12 scale-150 rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="p-2 rounded-full bg-ronchi-600 hover:bg-ronchi-700"
          onClick={() => setIndex((index + 1) % 3)}
        >
          <svg
            className="w-12 h-12 scale-150 -rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StatsDisplay;

const DataCard = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-row items-center justify-between w-full gap-2">
    <p className="font-bold text-center text-white text-md">{name}</p>
    <p className="text-xl font-bold text-center text-white">{value}</p>
  </div>
);
