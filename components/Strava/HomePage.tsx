import axios from "axios";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import LoginData from "@/scripts/LoginData";
import ProfileCard from "./ProfileCard";
import RunList from "./RunList";
import Link from "next/link";
import { Athlete, Run, Stats } from "@/scripts/stravaTypes";

export default function HomePage() {
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
                localStorage.setItem("data", JSON.stringify(response.data));
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
                const {data} = response;
             

                setActivities(data.filter((activity: Run) => activity.type === "Run"));
                localStorage.setItem("activities", JSON.stringify(data.filter((activity: Run) => activity.type === "Run")))
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
        <div className="flex flex-col items-center font-sans text-white bg-gray-800 gap-4 lg:flex-row lg:items-start">
            <ProfileCard activities={activities} data={data} stats={stats}/>
            <RunList activities={activities}/>
        </div>
    );
}
