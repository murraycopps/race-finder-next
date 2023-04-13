import { DetailedRun, Stream } from "@/scripts/singleRunTypes";
import HeartRateStream from "../HeartRateStream";
import DetailedLapsCard from "./DetailedLapsCard";
import Graph from "./Graph";

const Laps = ({
    activity,
    imperialSplit,
    setImperialSplit,
    detailedType,
    setDetailedType,
    streams
  }: {
    activity: DetailedRun;
    imperialSplit: boolean;
    setImperialSplit: (imperialSplit: boolean) => void;
    detailedType: string;
    setDetailedType: (detailedType: "laps" | "splits" | "none") => void;
    streams: Stream[];
  }) => (
    <>
      {(activity.laps ||
        (activity.splits_standard && activity.splits_metric)) && (
        <div className="grid w-full grid-cols-2 gap-4 p-4 place-items-center">
          <div className="relative w-full h-full">
            {activity.splits_standard && activity.splits_metric ? (
              <>
                <button
                  className="absolute z-10 p-2 text-white rounded-full bg-lavender-600 hover:bg-lavender-700 top-8 right-8"
                  onClick={() => setImperialSplit(!imperialSplit)}
                >
                  Switch to {imperialSplit ? "mi" : "km"}
                </button>
                <Graph
                  name={imperialSplit ? "Splits (km)" : "Splits (mi)"}
                  nums={
                    imperialSplit
                      ? activity.splits_metric
                      : activity.splits_standard
                  }
                  onClick={() => setDetailedType("splits")}
                />
              </>
            ) : (
              <h2 className="text-4xl font-bold text-center">No Splits</h2>
            )}
          </div>
          {activity.laps ? (
            <Graph
              name="Laps"
              nums={activity.laps}
              onClick={() => setDetailedType("laps")}
            />
          ) : (
            <h2 className="text-4xl font-bold">No Laps</h2>
          )}
        </div>
      )}
      {detailedType === "laps" && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setDetailedType("none")}
          />
          <DetailedLapsCard
            laps={activity.laps}
            label="Lap"
            close={() => setDetailedType("none")}
          />
        </>
      )}
      {detailedType === "splits" && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setDetailedType("none")}
          />
          <DetailedLapsCard
            laps={
              imperialSplit ? activity.splits_metric : activity.splits_standard
            }
            label={imperialSplit ? "Kilometer" : "Mile"}
            close={() => setDetailedType("none")}
          />
        </>
      )}
      {streams.length === 2 && (
        <div className="grid w-full grid-cols-2 gap-4 p-4 place-items-center">
          <HeartRateStream stream={streams[0]} />
          <HeartRateStream stream={streams[1]} />
        </div>
      )}
    </>
  );



export default Laps;