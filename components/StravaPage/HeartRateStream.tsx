import { DetailedRun, Stream } from "@/scripts/singleRunTypes";
import HRLineGraph from "./HRLineGraph";

type Names = {
  [key: string]: string;
};

const names: Names = {
  heartrate: "Heart Rate",
  altitude: "Altitude (ft)",
  velocity_smooth: "Velocity",
  cadence: "Cadence",
  temp: "Temperature",
  moving: "Moving",
  grade_smooth: "Grade",
};

const maxLen = 500;
const reduceData = (data: number[]): number[] => {
  if (data.length <= maxLen) return data;
  // average every other values
  const newData = [];
  for (let i = 0; i < data.length; i += 2) {
    newData.push((data[i] + data[i + 1]) / 2);
  }
  return reduceData(newData);
};

export default function HeartRateStream({
  stream,
  activity,
}: {
  stream: Stream;
  activity: DetailedRun;
}) {
  return (
    <div className="flex flex-col w-full gap-8 aspect-2-1">
      <h2 className="text-4xl font-bold text-center">
        {names[stream.type] || stream.type}
      </h2>
      <div className="grow">
        <HRLineGraph
          labels={stream.data.map((p) => p.toString())}
          data={stream.data}
        />
      </div>
      {stream.type === "heartrate" && (
        <div className="flex items-center w-full gap-4 justify-evenly">
          <StatsCard
            name="Average Heart Rate"
            des={activity.average_heartrate || "--"}
          />
          <StatsCard
            name="Max Heart Rate"
            des={activity.max_heartrate || "--"}
          />
        </div>
      )}
      {stream.type === "altitude" && (
        <div className="flex items-center w-full gap-4 justify-evenly">
          <StatsCard
            name="Max Elevation"
            des={
              activity.elev_high === 0 || activity.elev_high
                ? Math.round(activity.elev_high * 3.28084)
                : "--"
            }
          />
          <StatsCard
            name="Min Elevation"
            des={
              activity.elev_low === 0 || activity.elev_low
                ? Math.round(activity.elev_low * 3.28084)
                : "--"
            }
          />
          <StatsCard
            name="Elevation Gain"
            des={
              activity.total_elevation_gain === 0 ||
              activity.total_elevation_gain
                ? Math.round(activity.total_elevation_gain * 3.28084)
                : "--"
            }
          />
        </div>
      )}
      {stream.type === "velocity_smooth" && (
        <div className="flex items-center w-full gap-4 justify-evenly">
          <StatsCard
            name="Max Speed (mph)"
            des={Math.round(activity.max_speed * 2.23694 * 100) / 100 || "--"}
          />
          <StatsCard
            name="Average Speed (mph)"
            des={
              Math.round(activity.average_speed * 2.23694 * 100) / 100 || "--"
            }
          />
        </div>
      )}
      {stream.type === "cadence" && (
        <div className="flex items-center w-full gap-4 justify-evenly">
          <StatsCard
            name="Cadence (spm)"
            des={activity.average_cadence || "--"}
          />

          <StatsCard
            name="Number of Steps"
            des={
              activity.average_cadence
                ? Math.round(
                    (activity.average_cadence * activity.moving_time) / 30
                  )
                : "--"
            }
          />
          <StatsCard
            name="Stride Length (m)"
            des={
              activity.average_cadence
                ? Math.round(
                    (activity.average_speed / (activity.average_cadence / 30)) *
                      100
                  ) / 100
                : "--"
            }
          />
        </div>
      )}
    </div>
  );
}

const StatsCard = ({ name, des }: { name: string; des: string | number }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <h1 className="text-lg font-bold">{name}</h1>
    <p className="text-2xl">{des}</p>
  </div>
);
