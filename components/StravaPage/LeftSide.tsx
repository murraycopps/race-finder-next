import {Stats } from "@/scripts/stravaTypes";
const LeftSide = ({ stats }: { stats: Stats }) => (
    <div className="absolute left-0 flex flex-col items-center justify-center w-64 gap-8 py-8 rounded-br-3xl h-192 bg-faded-base-300">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-center text-white">
          Year to date stats:
        </h2>
        <DataCard
          name="Total Distance"
          value={`${Math.round(stats.ytd_run_totals.distance / 1609.34)} Mi`}
        />
        <DataCard
          name="Total Elevation"
          value={`${Math.round(stats.ytd_run_totals.elevation_gain)} Ft`}
        />
        <DataCard name="Total Runs" value={`${stats.ytd_run_totals.count}`} />
        <DataCard
          name="Total Time"
          value={`${Math.round(stats.ytd_run_totals.moving_time / 3600)} Hrs`}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-center text-white">
          Lifetime stats:
        </h2>
        <DataCard
          name="Total Distance"
          value={`${Math.round(stats.all_run_totals.distance / 1609.34)} Mi`}
        />
        <DataCard
          name="Total Elevation"
          value={`${Math.round(stats.all_run_totals.elevation_gain)} Ft`}
        />
        <DataCard name="Total Runs" value={`${stats.all_run_totals.count}`} />
        <DataCard
          name="Total Time"
          value={`${Math.round(stats.all_run_totals.moving_time / 3600)} Hrs`}
        />
      </div>
  
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-center text-white">
          Recent stats:
        </h2>
        <DataCard
          name="Total Distance"
          value={`${Math.round(stats.recent_run_totals.distance / 1609.34)} Mi`}
        />
        <DataCard
          name="Total Elevation"
          value={`${Math.round(stats.recent_run_totals.elevation_gain)} Ft`}
        />
        <DataCard name="Total Runs" value={`${stats.recent_run_totals.count}`} />
        <DataCard
          name="Total Time"
          value={`${Math.round(stats.recent_run_totals.moving_time / 3600)} Hrs`}
        />
      </div>
    </div>
  );

  
  export default LeftSide;

  const DataCard = ({ name, value }: { name: string; value: string }) => (
    <div className="flex flex-row items-center justify-between w-full gap-2">
      <p className="font-bold text-center text-white text-md">{name}</p>
      <p className="text-xl font-bold text-center text-white">{value}</p>
    </div>
  );