import RaceCard from "@/components/RaceCard";
import { Race } from "@/scripts/types";
import axios from "axios";

type Props = {
  races: Race[];
};
export default function IndexPage({ races }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      {races.map((race, i) => (
        <RaceCard race={race} key={i} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let host = context.req.headers.host;
  const res = await axios.get(
    `${host.includes("localhost") ? "http" : "https"}://${host}/api/races`  );
  const { data } = await res;
  return {
    props: {
      races: data.data,
    },
  };
}
