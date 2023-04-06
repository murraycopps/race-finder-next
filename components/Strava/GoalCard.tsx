import { Goal } from "@/scripts/types";

export default function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div className="p-8 text-center bg-gray-900 rounded-lg run-field-sizing">
      <h2 className="mb-8 text-2xl">{goal.name}</h2>
      <p className="text-base">{goal.description}</p>
    </div>
  );
}
