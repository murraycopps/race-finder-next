import { outTime } from "@/scripts";
import { Run } from "@/scripts/stravaTypes";
import dynamic from "next/dynamic";


const MapWithNoSSR = dynamic(() => import("./Map"), {
    ssr: false,
  });

  
const RunCard = ({
    activity,
    displayMap = false,
    setRunId,
  }: {
    activity: Run;
    displayMap?: boolean;
    setRunId: (id: number) => void;
  }) => {
        return (
            <button
                className="z-0 flex flex-col items-center justify-start w-full gap-4 p-8 text-center shadow-lg sm:gap-8 rounded-2xl bg-faded-base-500 hover:bg-faded-base-600"
                // href={`/strava/activities/${activity.id}`}
                onClick={() => setRunId(activity.id)}
            >
                <div className="flex flex-col items-center justify-between w-full gap-2 sm:flex-row sm:gap-4">
                    <h3 className="w-full px-4 text-2xl truncate sm:text-3xl text-ellipsis sm:max-w-3/4">
                        {activity.name}
                    </h3>
                    <p className="text-lg sm:text-xl">
                        {new Date(activity.start_date).toLocaleDateString() +
                            " " +
                            new Date(activity.start_date).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                            })}
                    </p>
                </div>
                {activity.map.summary_polyline !== null &&
                    activity.map.summary_polyline !== "" &&
                    displayMap && (
                        <div className="w-full sm:px-8">
                            <div className="w-full overflow-hidden aspect-video rounded-2xl">
                                <MapWithNoSSR map={activity.map} fixed />
                            </div>
                        </div>
                    )}
                <div className="grid w-full grid-cols-3 gap-2 px-8 sm:gap-4 place-items-center">
                    <div className="flex flex-col items-center justify-start gap-2">
                        <p className="sm:text-lg text-md">Distance (Mi)</p>
                        <p className="text-xl sm:text-3xl">
                            {Math.round((activity.distance / 1609.34) * 100) / 100}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <p className="sm:text-lg text-md">Time (Mins)</p>
                        <p className="text-xl sm:text-3xl">{outTime(activity.moving_time)}</p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <p className="sm:text-lg text-md">Pace (Mins/Mi)</p>
                        <p className="text-xl sm:text-3xl">
                            {outTime(activity.moving_time / (activity.distance / 1609.34), 0)}
                        </p>
                    </div>
                </div>
            </button>
        );
    };

  export default RunCard;