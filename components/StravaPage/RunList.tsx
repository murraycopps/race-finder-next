import { outTime } from "@/scripts";
import { Run } from "@/scripts/stravaTypes";

import dynamic from "next/dynamic";
import Link from "next/link";

const MapWithNoSSR = dynamic(() => import("../Map"), {
  ssr: false,
});

export default function RunList({ activities }: { activities: Run[] }) {
  return (
    <div className="flex flex-col items-center justify-start w-full gap-8 p-4 text-center">
      {activities.map((activity: Run, i: number) => (
        <RunCard activity={activity} key={i} />
      ))}
    </div>
  );
}

const RunCard = ({ activity }: { activity: Run }) => (
  <Link className="z-0 flex flex-col items-center justify-start w-full gap-8 p-4 text-center rounded-lg shadow-lg bg-faded-base-500 hover:bg-faded-base-600"
    href={`/strava/activities/${activity.id}`}
  >
    <div className="flex flex-row justify-between w-full gap-8">
      <h3 className="px-4 text-3xl truncate text-ellipsis max-w-3/4">
        {activity.name}
      </h3>
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
        <div className="w-full px-16">
          <MapWithNoSSR map={activity.map} />
        </div>
      )}
    <div className="grid w-full grid-cols-3 gap-4 px-8 place-items-center">
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Distance (Mi)</p>
        <p className="text-3xl">
          {Math.round((activity.distance / 1609.34) * 100) / 100}
        </p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Time (Mins)</p>
        <p className="text-3xl">{outTime(activity.moving_time)}</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <p className="text-lg">Pace (Mins/Mi)</p>
        <p className="text-3xl">
          {outTime(activity.moving_time / (activity.distance / 1609.34), 0)}
        </p>
      </div>
    </div>
  </Link>
);
