import PageWrapper from "@/components/PageWrapper";
import { getActivity } from "@/lib/strava";
import { outTime } from "@/scripts";
import LoginData from "@/scripts/LoginData";
import { DetailedRun, Lap } from "@/scripts/singleRunTypes";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function ActivityPage() {
  const [activity, setActivity] = useState<DetailedRun>();
  const router = useRouter();
  const [imperialSplit, setImperialSplit] = useState(false);

  useEffect(() => {
    if (!LoginData.isLoggedIn()) {
      router.push("/strava/");
      return;
    }

    const { pid } = router.query;
    if (!pid || typeof pid !== "string") return;
    console.log(pid);
    const getDetailedActivity = async () => {
      // check local storage
      const cachedActivity = localStorage.getItem(pid as string);
      if (cachedActivity) {
        setActivity(JSON.parse(cachedActivity));
        return;
      }

      const res = await getActivity(pid);
      if (!res) {
        router.push("/strava/");
        return;
      }
      setActivity(res);
      // store to local storage
      localStorage.setItem(pid, JSON.stringify(res));
      console.log(res);
    };
    getDetailedActivity();
  }, [router]);

  if (!activity)
    return (
      <PageWrapper
        page="Activity"
        className="flex flex-col items-center justify-center h-screen p-8 "
      >
        <h1 className="text-4xl font-bold">Loading...</h1>
      </PageWrapper>
    );

  return (
    <PageWrapper
      page={activity?.name || "Activity"}
      className="flex flex-col items-center justify-start h-screen gap-16 p-16 overflow-y-auto"
    >
      <div className="flex items-center w-full justify-evenly">
        <h1 className="text-4xl font-bold">{activity?.name}</h1>
        <p className="text-xl">
          {new Date(activity.start_date_local).toLocaleDateString() +
            " " +
            new Date(activity.start_date_local).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
        </p>
      </div>
      {activity.map.summary_polyline !== null &&
        activity.map.summary_polyline !== "" && (
          <div className="w-full px-48">
            <div className="w-full overflow-hidden aspect-video rounded-3xl">
              <MapWithNoSSR map={activity.map} detailed />
            </div>
          </div>
        )}
      <div className="flex flex-row items-start justify-start w-full gap-8 px-48">
        <p className="p-4 text-lg text-black bg-gray-300 rounded-2xl grow min-h-20">
          {activity.description || "No Description"}
        </p>
        <div className="flex flex-col h-20 pt-4 text-black bg-gray-300 rounded-full aspect-square place-items-center">
          <p className="text-3xl">{activity.kudos_count}</p>
          <p className="text-xs">Kudos</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-4 place-items-center">
        <StatsCard
          name="Distance (mi)"
          des={Math.round((activity.distance / 1609.34) * 100) / 100 || "--"}
        />
        <StatsCard
          name="Pace (min/mi)"
          des={
            outTime(activity.moving_time / (activity.distance / 1609.34), 0) ||
            "--"
          }
        />
        <StatsCard
          name="Moving Time"
          des={outTime(activity.moving_time) || "--"}
        />
        <StatsCard
          name="Elapsed Time"
          des={outTime(activity.elapsed_time) || "--"}
        />
        <StatsCard
          name="Average Heart Rate"
          des={activity.average_heartrate || "--"}
        />
        <StatsCard name="Max Heart Rate" des={activity.max_heartrate || "--"} />
        <StatsCard
          name="Max Speed (mph)"
          des={Math.round(activity.max_speed * 2.23694 * 100) / 100 || "--"}
        />
        <StatsCard
          name="Average Speed (mph)"
          des={Math.round(activity.average_speed * 2.23694 * 100) / 100 || "--"}
        />
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
        <StatsCard
          name="Calories"
          des={Math.round(activity.calories) || "--"}
        />
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

        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <h1 className="text-xl font-bold">Shoes</h1>
          <p className="text-2xl">{activity.gear.name || "--"}</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 p-4 place-items-center">
        <div className="relative w-full h-full">
          <button
            className="absolute z-10 p-2 text-white rounded-full bg-lavender-600 hover:bg-lavender-700 top-8 right-8"
            onClick={() => setImperialSplit(!imperialSplit)}
          >
            Switch to {imperialSplit ? "km" : "mi"}
          </button>
          <Graph
            name={imperialSplit ? "Splits (mi)" : "Splits (km)"}
            nums={
              imperialSplit ? activity.splits_metric : activity.splits_standard
            }
          />
        </div>
        <Graph name="Laps" nums={activity.laps} />
      </div>
    </PageWrapper>
  );
}

const StatsCard = ({ name, des }: { name: string; des: string | number }) => (
  <div className="flex flex-col items-center justify-center gap-4 p-8">
    <h1 className="text-xl font-bold">{name}</h1>
    <p className="text-3xl">{des}</p>
  </div>
);

const Graph = ({
  name,
  nums,
}: {
  name: string;
  nums: { moving_time: number }[];
}) => {
  const numbers = nums.map((num) => num.moving_time);
  const max = Math.max(...numbers);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 p-8">
      <h2 className="text-4xl font-bold">{name}</h2>

      <div className="flex items-end justify-center w-full h-64 gap-1 pt-4">
        {numbers.map((num, i) => (
          <div
            key={i}
            className="flex items-end justify-center flex-1 text-xl bg-lavender-700"
            style={{
              height: ` calc(${(num / max) * 100}% + 1rem)`,
            }}
          >
            <p>{outTime(num)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
