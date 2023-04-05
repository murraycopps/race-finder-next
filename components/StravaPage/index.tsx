import LoginData from "@/scripts/LoginData";
import { Athlete, Run, Stats } from "@/scripts/stravaTypes";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LeftSide from "./LeftSide";
import ProfileCard from "./ProfileCard";
import RightSide from "./RightSide";
import RunList from "./RunList";
import {
  getStats,
  getActivities,
  getAthlete,
  refreshToken,
} from "@/lib/strava";

export default function StravaPage() {
  const router = useRouter();

  const [data, setData] = useState<Athlete>();
  const [activities, setActivities] = useState<Run[]>([]);
  const [stats, setStats] = useState<Stats>();

  const accessToken = LoginData.getAccessToken();

  useEffect(() => {
    if (!LoginData.isLoggedIn()) {
      router.push("/strava/");
      return;
    }

    const cachedData = localStorage.getItem("data");
    const cachedActivities = localStorage.getItem("activities");
    const cachedStats = localStorage.getItem("stats");
    const expirationTime = localStorage.getItem("expirationTime");
    const cachedUsername = localStorage.getItem("username");

    if (
      cachedData &&
      cachedActivities &&
      cachedStats &&
      expirationTime &&
      cachedUsername === LoginData.getUsername() &&
      Date.now() < +expirationTime
    ) {
      setData(JSON.parse(cachedData));
      setStats(JSON.parse(cachedStats));
      setActivities(JSON.parse(cachedActivities));
      return;
    }

    const fetchData = async () => {
      const data = await getAthlete();
      const activities = await getActivities();
      const stats = await getStats(data.id);
      setData(data);
      setActivities(activities);
      setStats(stats);

      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("activities", JSON.stringify(activities));
      localStorage.setItem("stats", JSON.stringify(stats));
      const newExpirationTime = Date.now() + 240 * 1000; // 15 minutes from now
      localStorage.setItem("expirationTime", newExpirationTime.toString());
      localStorage.setItem("username", LoginData.getUsername());
    };
    fetchData();
  },
  [accessToken, router]);
  if (!LoginData.isLoggedIn()) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-white">Redirecting...</div>
      </div>
    );
  }

  if (!data || !stats || !activities) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="mt-4 text-xl font-bold text-center text-white">
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen overflow-y-scroll">
      <ProfileCard data={data} stats={stats} activities={activities} />
      <div className="relative flex flex-row w-full px-64">
        <LeftSide stats={stats} />
        <RunList activities={activities} />
        <RightSide data={data} />
      </div>
    </div>
  );
}
