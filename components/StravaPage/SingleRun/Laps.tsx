import { DetailedRun, Stream } from "@/scripts/singleRunTypes";
import StreamCard from "./StreamCard";
import DetailedLapsCard from "./DetailedLapsCard";
import Graph from "./Graph";

const Laps = ({
    activity,
    imperialSplit,
    setImperialSplit,
    detailedType,
    setDetailedType,
  }: {
    activity: DetailedRun;
    imperialSplit: boolean;
    setImperialSplit: (imperialSplit: boolean) => void;
    detailedType: string;
    setDetailedType: (detailedType: "laps" | "splits" | "none") => void;
  }) => (
    <>
      {(activity.laps ||
        (activity.splits_standard && activity.splits_metric)) && (
        <div className="grid w-full gap-4 md:p-4 lg:grid-cols-2 place-items-center">
          <div className="relative w-full h-full">
            {activity.splits_standard && activity.splits_metric ? (
              <>
                <button
                  className="absolute top-0 right-0 z-10 w-12 h-12 text-2xl text-white rounded-full aspect-square bg-lavender-600 hover:bg-lavender-700 md:top-8 md:right-8"
                  onClick={() => setImperialSplit(!imperialSplit)}
                >
                  {imperialSplit ? "mi" : "km"}
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
    </>
  );



export default Laps;