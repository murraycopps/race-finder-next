import { outTime } from "@/scripts";
import { Run } from "@/scripts/stravaTypes";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

const SingleRunCard = ({
  activity,
  close,
}: {
  activity: Run;
  close: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-start gap-6 p-6 pt-16 overflow-y-auto text-center shadow-lg lg:inset-10 bg-faded-base-500">
    <button
      className="absolute flex flex-col justify-between w-12 h-10 px-1 py-2 text-white rounded-full right-4 nav-button open top-4 lg:left-4"
      onClick={close}
    >
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
    </button>
    <div className="grid w-full grid-cols-2 gap-4 px-8 place-items-center">
      <h3 className="px-4 text-3xl">{activity.name}</h3>
      <p className="text-xl">
        {new Date(activity.start_date_local).toLocaleDateString() +
          " " +
          new Date(activity.start_date_local).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
      </p>
    </div>
    <div className="flex w-full grow">
      {activity.map.summary_polyline !== null &&
        activity.map.summary_polyline !== "" && (
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <MapWithNoSSR map={activity.map} />
          </div>
        )}
    </div>
    <div className="grid w-full grid-cols-3 place-items-center">
      <div className="flex flex-col items-center w-full gap-2 justify-evenly">
        <p className="text-lg">Distance (Mi)</p>
        <p className="text-2xl">
          {Math.round((activity.distance / 1609.34) * 100) / 100 || "--"}
        </p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Time (Mins)</p>
        <p className="text-2xl">{outTime(activity.moving_time) || "--"}</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Pace (Mins/Mi)</p>
        <p className="text-2xl">
          {outTime(activity.moving_time / (activity.distance / 1609.34), 0) ||
            "--"}
        </p>
      </div>
    </div>
    <div className="grid w-full grid-cols-3 place-items-center">
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Average HeartRate (bpm)</p>
        <p className="text-2xl">{activity.average_heartrate || "--"}</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Max HeartRate (bpm)</p>
        <p className="text-2xl">{activity.max_heartrate || "--"}</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Elevation Gain (ft)</p>
        <p className="text-2xl">
          {Math.round(
            (activity.total_elevation_gain * 3.28084 + Number.EPSILON) * 100
          ) / 100 || "--"}
        </p>
      </div>
    </div>
    <Link
      href={`/strava/activities/${activity.id}`}
      className="w-full py-4 text-3xl rounded-full bg-wisteria-600 hover:bg-faded-lavender-600"
    >
      View More Stats
    </Link>
  </div>
);

export default SingleRunCard;
