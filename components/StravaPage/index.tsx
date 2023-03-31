import LoginData from "@/scripts/LoginData";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

export default function StravaPage() {
  const router = useRouter();

  const [data, setData] = useState(null as any);
  const [activities, setActivities] = useState([] as any);
  const [stats, setStats] = useState(null as any);

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

    async function fetchData() {
      try {
        const response = await axios.get(
          `https://www.strava.com/api/v3/athlete`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(response.data);
        localStorage.setItem("data", JSON.stringify(response.data));
        getStats(response.data.id);
        console.log(response.data);
      } catch (error: any) {
        console.log(error);
      }
    }

    async function getLoggedInAthleteActivities(page: number, perPage: number) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      };

      const params = {
        page,
        per_page: perPage,
      };

      try {
        const response = await axios.get(
          `https://www.strava.com/api/v3/athlete/activities`,
          {
            headers,
            params,
          }
        );
        const { data } = response;

        setActivities(data.filter((activity: any) => activity.type === "Run"));
        localStorage.setItem(
          "activities",
          JSON.stringify(
            data.filter((activity: any) => activity.type === "Run")
          )
        );
        console.log(data);
      } catch (error: any) {
        console.log(error);
      }
    }

    async function getStats(id: string) {
      try {
        const response = await axios.get(
          `https://www.strava.com/api/v3/athletes/${id}/stats`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setStats(response.data);
        localStorage.setItem("stats", JSON.stringify(response.data));
      } catch (error: any) {
        console.log(error);
      }
    }

    getLoggedInAthleteActivities(1, 60);
    fetchData();
    const newExpirationTime = Date.now() + 240 * 1000; // 15 minutes from now
    localStorage.setItem("expirationTime", newExpirationTime.toString());
    localStorage.setItem("username", LoginData.getUsername());
    console.log(LoginData.getUsername());
  }, [accessToken, router]);

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
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center w-64 gap-8 bg-faded-base-300">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-center text-white">
              Year to date stats:
            </h2>
            <DataCard
              name="Total Distance"
              value={`${Math.round(
                stats.ytd_run_totals.distance / 1609.34
              )} Mi`}
            />
            <DataCard
              name="Total Elevation"
              value={`${Math.round(stats.ytd_run_totals.elevation_gain)} Ft`}
            />
            <DataCard
              name="Total Runs"
              value={`${stats.ytd_run_totals.count}`}
            />
            <DataCard
              name="Total Time"
              value={`${Math.round(
                stats.ytd_run_totals.moving_time / 3600
              )} Hrs`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-center text-white">
              Lifetime stats:
            </h2>
            <DataCard
              name="Total Distance"
              value={`${Math.round(
                stats.all_run_totals.distance / 1609.34
              )} Mi`}
            />
            <DataCard
              name="Total Elevation"
              value={`${Math.round(stats.all_run_totals.elevation_gain)} Ft`}
            />
            <DataCard
              name="Total Runs"
              value={`${stats.all_run_totals.count}`}
            />
            <DataCard
              name="Total Time"
              value={`${Math.round(
                stats.all_run_totals.moving_time / 3600
              )} Hrs`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-center text-white">
              Recent stats:
            </h2>
            <DataCard
              name="Total Distance"
              value={`${Math.round(
                stats.recent_run_totals.distance / 1609.34
              )} Mi`}
            />
            <DataCard
              name="Total Elevation"
              value={`${Math.round(stats.recent_run_totals.elevation_gain)} Ft`}
            />
            <DataCard
              name="Total Runs"
              value={`${stats.recent_run_totals.count}`}
            />
            <DataCard
              name="Total Time"
              value={`${Math.round(
                stats.recent_run_totals.moving_time / 3600
              )} Hrs`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const DataCard = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-row items-center justify-between w-full gap-2">
    <p className="font-bold text-center text-white text-md">{name}</p>
    <p className="text-xl font-bold text-center text-white">{value}</p>
  </div>
);
