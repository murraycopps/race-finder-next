import { Run } from "@/scripts/stravaTypes";

import { useEffect, useState } from "react";
import RunCard from "./RunCard";
import SingleRunCard from "./SingleRunCard";
import SingleRideCard from "./SingleRideCard";
import SingleRunCardMobile from "./SingleRunCardMobile";
import { getActivities } from "@/lib/strava";

// const addPage = async (numActivities: number) => {
//   const nextPage = numActivities / 50 + 1;
//   const activities: Run[] = [];
//   for(let i = 0; i < nextPage; i++) {
//     activities.push(...await getActivities(i))
//   }
//   return activities;
// };
const addPage = async (numActivities: number) => {
  const nextPage = numActivities / 50 + 1;
  const promises: Promise<Run[]>[] = [];

  for (let i = 0; i < nextPage; i++) {
    promises.push(getActivities(i + 1));
  }

  const activitiesArrays = await Promise.all(promises);
  const activities = activitiesArrays.flat();

  return activities;
};

export default function RunList({
  activities,
  setActivities,
}: {
  activities: Run[];
  setActivities: (activities: Run[]) => void;
}) {
  const [runId, setRunId] = useState(0);
  const [activity, setActivity] = useState<Run | null>(null);
  const size = useWindowSize();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setRunId(0);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (runId === 0) {
      setActivity(null);
      return;
    }
    const activity = activities.find((a) => a.id === runId);
    if (activity) setActivity(activity);
  }, [runId]);
  return (
    <div className="flex flex-col items-center justify-start w-full gap-8 p-4 text-center">
      {activities.map((activity: Run, i: number) => (
        <RunCard
          activity={activity}
          key={i}
          // displayMap={i < 10}
          displayMap={true}
          setRunId={setRunId}
        />
      ))}
      <button
        className="px-4 py-2 text-2xl font-bold text-white rounded-md bg-slate-400"
        onClick={async () => {
          const newActivities = await addPage(activities.length);
          setActivities(newActivities);
        }}
      >
        Load More
      </button>
      {runId !== 0 && activity && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black opacity-70"
            onClick={() => setRunId(0)}
          ></div>
          {activity.type === "Run" &&
            (size.width > 640 ? (
              <SingleRunCard activity={activity} close={() => setRunId(0)} />
            ) : (
              <SingleRunCardMobile
                activity={activity}
                close={() => setRunId(0)}
              />
            ))}
          {activity.type === "Ride" && (
            <SingleRideCard activity={activity} close={() => setRunId(0)} />
          )}
        </>
      )}
    </div>
  );
}
// Hook

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
