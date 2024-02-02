import { outTime } from "@/scripts";
import { DetailedRun } from "@/scripts/singleRunTypes";

const numberOfStats = {
  heartrate: 2,
  altitude: 3,
  velocity_smooth: 2,
  cadence: 3,
}

const StatsCards = ({
  activity,
  streamTypes = ["", ""],
}: {
  activity: DetailedRun;
  streamTypes?: [string, string];
}) => (
  <div className="grid w-full grid-cols-2 gap-4 lg:px-16 sm:grid-cols-4 place-items-center">
    <StatsCard
      name="Distance (mi)"
      des={Math.round((activity.distance / 1609.34) * 100) / 100 || "--"}
    />
    <StatsCard
      name="Pace (min/mi)"
      des={
        outTime(activity.moving_time / (activity.distance / 1609.34), 0) || "--"
      }
    />
    <StatsCard name="Moving Time" des={outTime(activity.moving_time) || "--"} />
    <StatsCard
      name="Elapsed Time"
      des={outTime(activity.elapsed_time) || "--"}
    />
    {streamTypes[0] !== "heartrate" && (
      <>
        <StatsCard
          name="Average Heart Rate"
          des={activity.average_heartrate || "--"}
        />
        <StatsCard name="Max Heart Rate" des={activity.max_heartrate || "--"} />
      </>
    )}
    {streamTypes[0] !== "velocity_smooth" &&
      streamTypes[1] !== "velocity_smooth" && (
        <>
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
        </>
      )}
    {streamTypes[0] !== "cadence" && streamTypes[1] !== "cadence" && (
      <>
        <StatsCard
          name="Cadence (spm)"
          des={activity.average_cadence * 2 || "--"}
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
      </>
    )}
    <StatsCard name="Calories" des={Math.round(activity.calories) || "--"} />
    {streamTypes[1] !== "altitude" && (
      <>
        <StatsCard
          name="Max Elevation (ft)"
          des={
            activity.elev_high === 0 || activity.elev_high
              ? Math.round(activity.elev_high * 3.28084)
              : "--"
          }
        />
        <StatsCard
          name="Min Elevation (ft)"
          des={
            activity.elev_low === 0 || activity.elev_low
              ? Math.round(activity.elev_low * 3.28084)
              : "--"
          }
        />
        <StatsCard
          name="Elevation Gain (ft)"
          des={
            activity.total_elevation_gain === 0 || activity.total_elevation_gain
              ? Math.round(activity.total_elevation_gain * 3.28084)
              : "--"
          }
        />
      </>
    )}
    <div className={`flex flex-col items-center justify-center gap-4 p-8 ${numberOfStats[streamTypes[0] as keyof typeof numberOfStats] + numberOfStats[streamTypes[1] as keyof typeof numberOfStats] === 5 && "col-span-2"}`}>
          <h1 className="text-xl font-bold">Shoes</h1>
          <p className="text-2xl">
            {activity.gear?.name?.replace(activity?.gear?.nickname || "", "") ||
              "--"}
          </p>
        </div>
  </div>
);

const StatsCard = ({ name, des }: { name: string; des: string | number }) => (
  <div className="flex flex-col items-center justify-center gap-4 p-8">
    <h1 className="text-xl font-bold">{name}</h1>
    <p className="text-3xl">{des}</p>
  </div>
);

export default StatsCards;
