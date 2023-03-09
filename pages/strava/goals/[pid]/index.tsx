import LoginData from "@/scripts/LoginData";
import { Goal } from "@/scripts/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function Page({ url }: { url: string }) {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal>({} as Goal);
  useEffect(() => {
    if (!LoginData.isLoggedIn()) {
      LoginData.getStorage();
      if (!LoginData.isLoggedIn()) {
        router.push("/strava/");
        return;
      }
    }
    LoginData.updateGoals(url);
    const goal = LoginData.getGoals().find(
      (goal: Goal) => goal.id.toString() === router.query.pid
    );
    if (goal) {
      setGoal(goal);
    } else {
      router.push("/strava/goals");
    }
  }, [router, url]);

  return (
    <div className="flex flex-col items-center gap-4 font-sans text-white bg-gray-800">
      <div className="px-16 py-4 m-4 text-center bg-gray-700 rounded-lg">
        <h1 className="text-3xl">{goal.name}</h1>
        <p className="text-base">{goal.description}</p>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => {
            LoginData.completeGoal(goal.id, url);
            router.push("/strava/goals");
          }}
        >
          Complete
        </button>
        <Link href={`/strava/goals/${goal.id}/update`}>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Update
          </button>
        </Link>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Delete
        </button>
      </div>
    </div>
  );
}

export function getServerSideProps(context: any) {
  const host = context.req.headers.host;
  const url = host.includes("localhost") ? "http://" : "https://";
  const fullUrl = url + host;
  return {
    props: {
      url: fullUrl,
    },
  };
}
