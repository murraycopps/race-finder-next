import { Run } from "@/scripts/stravaTypes";

import { useEffect, useState } from "react";
import RunCard from "./RunCard";
import SingleRunCard from "./SingleRunCard";

export default function RunList({ activities }: { activities: Run[] }) {
  const [runId, setRunId] = useState(0);
  const [activity, setActivity] = useState<Run | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setRunId(0);
        }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
        document.removeEventListener("keydown", handleKeyDown);
    }
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
          displayMap={i < 10}
          setRunId={setRunId}
        />
      ))}
      {runId !== 0 && activity && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black opacity-70"
            onClick={() => setRunId(0)}
          ></div>
          <SingleRunCard activity={activity} />
        </>
      )}
    </div>
  );
}
