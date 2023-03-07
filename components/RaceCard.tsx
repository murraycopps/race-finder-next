import { Race } from "@/scripts/types";

export default function RaceCard({ race }: { race: Race }) {
  return (
    <div className="flex flex-col gap-4 p-4 text-center bg-gray-500 rounded-lg card-width">
      <h2 className="text-2xl">{race.name}</h2>
      <p>{race.distance}</p>
      <p>{race.date}</p>
    </div>
  );
}
