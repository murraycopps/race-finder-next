import { outTime } from "@/scripts";
import { Run } from "@/scripts/stravaTypes";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../Map"), {
    ssr: false,
  });

  
const SingleRunCard = ({ activity }: { activity: Run }) => (
    <div className="fixed z-50 flex flex-col items-center justify-start gap-8 p-8 text-center rounded-lg shadow-lg inset-x-16 top-16 bg-faded-base-500">
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
            <div className="relative w-2/3 overflow-hidden rounded-2xl">
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
        <div className="grid w-full grid-cols-4"></div>
      </div>
    </div>
  );
  

  export default SingleRunCard;