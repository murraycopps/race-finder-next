import { Run } from "@/scripts/stravaTypes";

export default function RunList({ activities }: { activities: Run[] }) {
  return (
    <div className="flex flex-col items-center justify-start gap-8 p-4 text-center grow">
      <h2 className="text-3xl">Runs</h2>
      <p className="text-xl">List of runs</p>
        <div className="flex flex-col items-center justify-start gap-8 p-4 text-center grow">
            {activities.map((activity: Run, i: number) => (
                <RunCard activity={activity} key={i} />
            ))}
            </div>
    </div>
  );
}

const RunCard = ({ activity }: { activity: Run }) => (
    <div className="flex flex-col items-center justify-start w-full h-48 gap-8 p-4 text-center rounded-lg shadow-lg bg-faded-base-500 hover:bg-faded-base-600">
        <h2 className="text-3xl">{activity.name}</h2>
    </div>
);