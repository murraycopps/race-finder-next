import LoginData from "@/scripts/LoginData";
import { Goal } from "@/scripts/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";


export default function CreateGoal({ url }: { url: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
   if(!LoginData.isLoggedIn()){
      LoginData.getStorage()
      if(!LoginData.isLoggedIn()){
        router.push("/strava")
        return
      }
   }
   LoginData.updateGoals(url)
  }, [router, url])
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const name = formData.get("name");
    const description = formData.get("description");
    const id = getUnusedID();
    const goal: Goal = {
      id,
      name: name as string,
      description: description as string,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    LoginData.addGoal(goal);


    const res = await axios.put(`${url}/api/users`, {
      _id: LoginData.getUserID(),
      goals: LoginData.getGoals(),
    });

    if (res.status === 200) {
      router.push("/strava/goals");
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 font-sans text-white bg-gray-800">
      <div className="px-16 py-4 m-4 text-center bg-gray-700 rounded-lg">
        <h1 className="text-3xl">Create a Goal</h1>
      </div>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <label className="flex flex-col items-start gap-2" htmlFor="name">
          <span className="text-lg">Name</span>
        </label>
        <input
          className="px-4 py-2 text-black bg-gray-200 rounded-lg"
          type="text"
          name="name"
          id="name"
        />
        <label
          className="flex flex-col items-start gap-2"
          htmlFor="description"
        >
          <span className="text-lg">Description</span>
        </label>
        <textarea
          className="px-4 py-2 text-black bg-gray-200 rounded-lg"
          name="description"
          id="description"
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Create Goal
        </button>
      </form>
    </div>
  );
}

const getUnusedID = () => {
  const goals = LoginData.getGoals();
  let id = 1000;
  while (goals.find((goal: Goal) => goal.id === id)) {
    id++;
  }
  return id;
};

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
