import { outTime } from "@/scripts";
import { Run } from "@/scripts/stravaTypes";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

const SingleRunCard = ({ activity, close }: { activity: Run; close: () => void }) => (
  <div className="fixed z-50 flex flex-col items-center justify-start gap-8 p-8 text-center rounded-lg shadow-lg inset-x-16s top-16s inset-16 bg-faded-base-500">
    <button
      className="absolute flex flex-col justify-between w-12 h-10 px-1 py-2 text-white rounded-full nav-button open top-4 left-4"
      onClick={close}
    >
       <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
        <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
        <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
    </button>
    <div className="grid w-3/4 grid-cols-2 gap-8 place-items-center">
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
    <div className="flex flex-row justify-between w-full gap-8 grow">
      <div className="flex flex-col h-full gap-4 p-8 justify-evenly">
        <div className="flex flex-col items-center w-full gap-2 justify-evenly">
          <p className="text-lg">Distance (Mi)</p>
          <p className="text-3xl">
            {Math.round((activity.distance / 1609.34) * 100) / 100 || "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Time (Mins)</p>
          <p className="text-3xl">{outTime(activity.moving_time) || "--"}</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Pace (Mins/Mi)</p>
          <p className="text-3xl">
            {outTime(activity.moving_time / (activity.distance / 1609.34), 0) ||
              "--"}
          </p>
        </div>
      </div>
      {activity.map.summary_polyline !== null &&
        activity.map.summary_polyline !== "" && (
          <div className="relative w-3/4 h-full overflow-hidden rounded-2xl">
            <MapWithNoSSR map={activity.map} />
          </div>
        )}
      <div className="flex flex-col h-full gap-4 p-4 justify-evenly">
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Average HeartRate (bpm)</p>
          <p className="text-3xl">{activity.average_heartrate || "--"}</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Max HeartRate (bpm)</p>
          <p className="text-3xl">{activity.max_heartrate || "--"}</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Average Speed (mph)</p>
          <p className="text-3xl">
            {Math.round(activity.average_speed * 2.23694 * 100) / 100 || "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Max Speed (mph)</p>
          <p className="text-3xl">
            {Math.round(activity.max_speed * 2.23694 * 100) / 100 || "--"}
          </p>
        </div>
      </div>
    </div>
    <div className="grid w-full grid-cols-3 place-items-center">
      <div className="grid w-full grid-cols-3 col-span-2">
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Cadence (spm)</p>
          <p className="text-3xl">{activity.average_cadence || "--"}</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Number of Steps</p>
          <p className="text-3xl">
            {activity.average_cadence
              ? Math.round(
                  (activity.average_cadence * activity.moving_time) / 30
                )
              : "--"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-lg">Stride Length (m)</p>
          <p className="text-3xl">
            {activity.average_cadence
              ? Math.round(
                  (activity.average_speed / (activity.average_cadence / 30)) *
                    100
                ) / 100
              : "--"}
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
  </div>
);

export default SingleRunCard;
