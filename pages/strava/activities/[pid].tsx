import PageWrapper from "@/components/PageWrapper";
import HeartRateStream from "@/components/StravaPage/HeartRateStream";
import {
  getActivity,
  getActivityComments,
  getActivityStream,
  setToken,
} from "@/lib/strava";
import { outTime } from "@/scripts";
import LoginData from "@/scripts/LoginData";
import {
  Comment,
  DetailedRun,
  Lap,
  Split,
  Stream,
} from "@/scripts/singleRunTypes";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const MapWithNoSSR = dynamic(() => import("@/components/StravaPage/Map"), {
  ssr: false,
});

const choseStreams = (streams: Stream[]) => {
  const orderOfPreference = [
    "heartrate", 
    "altitude",
    "velocity_smooth",
    "cadence",
    "temp",
    "grade_smooth",
  ];
  // get top 2
  const top2: Stream[] = [];

  orderOfPreference.forEach((type) => {
    if (top2.length === 2) return;
    const stream = streams.find((stream) => stream.type === type);
    if (stream) top2.push(stream);
  });
  return top2;
};

export default function ActivityPage() {
  const [activity, setActivity] = useState<DetailedRun>();
  const router = useRouter();
  const [imperialSplit, setImperialSplit] = useState(false);
  const [detailedType, setDetailedType] = useState<"laps" | "splits" | "none">(
    "none"
  );
  const [allSegments, setAllSegments] = useState(false);
  const [allEfforts, setAllEfforts] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if (LoginData.isLoggedIn()) return;
      await LoginData.getStorage();
      if (!LoginData.isLoggedIn()) {
        router.push("/strava/login");
      }
    };
    checkIfLoggedIn();

    const { pid } = router.query;
    if (!pid || typeof pid !== "string") return;
    const getDetailedActivity = async () => {
      // check local storage
      const { data, expirationTime, comments, streams } = JSON.parse(
        localStorage.getItem(pid) || "{}"
      );
      if (
        data &&
        comments &&
        streams &&
        expirationTime &&
        Date.now() < expirationTime
      ) {
        setActivity(data);
        setComments(comments);
        setStreams(choseStreams(streams));
        return;
      }

      const response = await getActivityStream(pid);
      setStreams(choseStreams(response));

      const res = await getActivity(pid);
      const com = await getActivityComments(pid);

      if (!res || !com || !response) {
        console.log("Error getting activity");
        router.push("/strava/");
        return;
      }

      setActivity(res);
      setComments(com);

      localStorage.setItem(
        pid,
        JSON.stringify({
          data: res,
          expirationTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
          comments: com,
          streams: response,
        })
      );
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
      className="flex flex-col items-center justify-start h-screen gap-16 p-16 overflow-y-auto text-center"
    >
      <div className="flex items-center w-full justify-evenly">
        <h1 className="text-5xl font-bold">{activity?.name}</h1>
        <p className="text-2xl">
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
        <p className="p-4 text-lg text-left text-black bg-gray-300 rounded-2xl grow min-h-20">
          {activity.description || "No Description"}
        </p>
        <div className="flex flex-col h-20 pt-4 text-black bg-gray-300 rounded-full aspect-square place-items-center">
          <p className="text-3xl">{activity.kudos_count}</p>
          <p className="text-xs">Kudos</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-4 px-16 place-items-center">
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
          <p className="text-2xl">
            {activity.gear.name.replace(activity.gear.nickname || "", "") ||
              "--"}
          </p>
        </div>
      </div>
      { (activity.laps || (activity.splits_standard && activity.splits_metric)) && (
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
          <DetailedCard
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
          <DetailedCard
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

      {(activity.best_efforts.length > 0 || activity.segment_efforts. length > 0 || comments.length > 0) && (
          <div className="grid w-full grid-cols-2 gap-4 place-items-center">
        <div className="flex flex-col items-center justify-center w-full gap-4 p-8">
          {activity.best_efforts.length > 0 ? (
            <>
              <h2 className="my-4 text-4xl font-bold">Best Efforts</h2>
              {activity.best_efforts
                .filter((effort) => effort.pr_rank !== null || allEfforts)
                .sort((a, b) => (a.pr_rank || 100) - (b.pr_rank || 100))

                .map((effort, i) => (
                  <p key={i} className="flex text-2xl place-items-center">
                    {effort.name} - {outTime(effort.moving_time)} -{" "}
                    {effort.pr_rank === 1 ? (
                      <span className="text-4xl">🥇</span>
                    ) : effort.pr_rank === 2 ? (
                      <span className="text-4xl">🥈</span>
                    ) : effort.pr_rank === 3 ? (
                      <span className="text-4xl">🥉</span>
                    ) : (
                      effort.pr_rank
                    )}
                  </p>
                ))}
              <button
                className="w-3/4 p-2 my-4 text-3xl text-white rounded-full bg-lavender-600 hover:bg-lavender-700"
                onClick={() => setAllEfforts(!allEfforts)}
              >
                Show {allEfforts ? "Prs" : "All"}
              </button>
            </>
          ) : (
            <h2 className="text-4xl font-bold">No Best Efforts</h2>
          )}
          {activity.segment_efforts.length > 0 ? (
            <>
              <h1 className="mt-8 mb-4 text-4xl font-bold">Segment Efforts</h1>
              {activity.segment_efforts
                .filter((effort) => effort.pr_rank !== null || allSegments)
                .sort((a, b) => (a.pr_rank || 100) - (b.pr_rank || 100))
                .map((effort, i) => (
                  <p key={i} className="flex text-xl place-items-center">
                    {effort.name} - {outTime(effort.moving_time)} -{" "}
                    {Math.round(effort.distance)}m -{" "}
                    {effort.pr_rank === 1 ? (
                      <span className="text-4xl">🥇</span>
                    ) : effort.pr_rank === 2 ? (
                      <span className="text-4xl">🥈</span>
                    ) : effort.pr_rank === 3 ? (
                      <span className="text-4xl">🥉</span>
                    ) : (
                      effort.pr_rank
                    )}
                  </p>
                ))}
              <button
                className="w-3/4 p-2 m-4 text-3xl text-white rounded-full bg-lavender-600 hover:bg-lavender-700"
                onClick={() => setAllSegments(!allSegments)}
              >
                Show {allSegments ? "Prs" : "All"}
              </button>
            </>
          ) : (
            <h1 className="mt-8 mb-4 text-4xl font-bold">No Segment Efforts</h1>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <h1 className="text-4xl font-bold">
            {comments.length > 0 ? "Comments" : "No Comments"}
          </h1>
          {comments.map((comment, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-4 p-8"
            >
              <p className="text-xl">{comment.text}</p>
              <p className="text-xl">
                {comment.athlete.firstname} {comment.athlete.lastname}
              </p>
            </div>
          ))}
        </div>
      </div>
        )
      }
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
  onClick,
}: {
  name: string;
  nums: { moving_time: number }[];
  onClick: () => void;
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
      <button
        className="px-4 py-2 text-white rounded-full bg-lavender-600 hover:bg-lavender-700"
        onClick={onClick}
      >
        View Detailed
      </button>
    </div>
  );
};

const DetailedCard = ({
  laps,
  label,
  close,
}: {
  laps: Split[] | Lap[];
  label: string;
  close: () => void;
}) => (
  <div className="fixed z-20 flex flex-col items-center gap-4 p-8 overflow-y-auto justify-evenly inset-x-64 inset-y-16 bg-wisteria-700 rounded-3xl">
    <button
      className="absolute flex flex-col justify-between w-12 h-10 px-1 py-2 text-white rounded-full nav-button open top-4 left-4"
      onClick={close}
    >
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
      <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
    </button>

    {laps.map((lap, i) => (
      <div key={i} className="grid w-full grid-cols-5 place-items-center">
        <h3 className="text-xl font-bold">
          {label} {i + 1}
        </h3>
        {/* <div className="grid grid-cols-4 grow place-items-center"> */}
        <LapStatsCard name="Distance" des={lap.distance} />
        <LapStatsCard
          name="Pace"
          des={outTime((lap.moving_time / lap.distance) * 1609.34)}
        />
        <LapStatsCard name="MovingTime" des={outTime(lap.moving_time)} />
        <LapStatsCard name="ElapsedTime" des={outTime(lap.elapsed_time)} />
        {/* </div> */}
      </div>
    ))}
  </div>
);

const LapStatsCard = ({
  name,
  des,
}: {
  name: string;
  des: string | number;
}) => (
  <div className="flex flex-col items-center justify-center w-full gap-2 border-l-2 border-white">
    <h1 className="font-bold text-md">{name}</h1>
    <p className="text-lg">{des}</p>
  </div>
);
