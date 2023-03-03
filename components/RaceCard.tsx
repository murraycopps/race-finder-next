import { Race } from "@/scripts/types";

export default function RaceCard({ race }: { race: Race }) {
  return (
    <div className="card">
      <h2>{race.name}</h2>
      <p>{race.distance}</p>
      <p>{race.date}</p>
    </div>
  );
}
