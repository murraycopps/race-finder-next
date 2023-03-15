import {
    faRuler,
    faClock,
    faTachometerAlt,
    faRunning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { outTime } from "@/scripts";
import LoginData from "@/scripts/LoginData";
import Image from "next/image";
import axios from "axios";
import PageWrapper from "@/components/PageWrapper";

export default function Profile() {
    const [showYear, setShowYear] = useState(false);
    const [usedStats, setUsedStats] = useState([] as any);
    const [data, setData] = useState(null as any);
    const [stats, setStats] = useState(null as any);
    const router = useRouter();

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

        fetchData();
        const newExpirationTime = Date.now() + 240 * 1000; // 15 minutes from now
        localStorage.setItem("expirationTime", newExpirationTime.toString());
        localStorage.setItem("username", LoginData.getUsername());
        console.log(LoginData.getUsername());
    }, [accessToken, router]);


    useEffect(() => {
        if(!data) return;
        console.log(data.profile)
        if (!stats) return;
        setUsedStats(showYear ? stats.ytd_run_totals : stats.all_run_totals);
    }, [stats, showYear]);

    if (!data || !stats) {
        return (
            <div className="grid place-items-center">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        );

    }

    return (
        <PageWrapper page="Profile" className="grid grid-cols-2 h-auto pt-8 overflow-x-hidden min-h-screen">
            <div className="flex flex-row flex-wrap gap-4 p-8 mb-4 bg-gray-700 rounded-md lg:ml-4">
                <div className="flex flex-col justify-between flex-grow sm:h-36 h-28 sm:pb-4">
                    <h1 className="w-full text-2xl font-bold text-center sm:text-4xl sm:mb-4">
                        {data.firstname} {data.lastname}
                    </h1>
                    <div className="flex flex-row justify-center gap-4 text-center sm:gap-8">
                        <div>
                            Followers:
                            <p className="text-2xl font-bold">{data.follower_count}</p>
                        </div>
                        <div>
                            Friends:
                            <p className="text-2xl font-bold">{data.friend_count}</p>
                        </div>
                    </div>
                </div>
                <Image
                    src={data.profile}
                    className="object-cover rounded-full sm:w-36 sm:h-36 w-28 h-28"
                    alt="Profile Picture"
                    width={192}
                    height={192}
                />
                <h2 className="w-full text-xl font-bold text-center">
                    {showYear ? "Yearly" : "Lifetime"} Stats
                </h2>
                <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faRuler} className="w-12 h-12" />{" "}
                        <p className="text-lg">
                            {Math.round(usedStats.distance / 1609.34)} Mi
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faClock} className="w-12 h-12" />{" "}
                        <p className="text-lg">
                            {Math.round((usedStats.moving_time / 3600) * 10) / 10} Hrs
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faTachometerAlt} className="w-12 h-12" />{" "}
                        <p className="text-lg">{usedStats.count} Runs</p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faRunning} className="w-12 h-12" />{" "}
                        <p className="text-lg text-center">
                            {outTime(
                                usedStats.moving_time / (usedStats.distance / 1609.34),
                                0
                            )}
                        </p>
                    </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faRuler} className="w-12 h-12" />{" "}
                        <p className="text-lg">
                            {Math.round(usedStats.distance / 1609.34)} Mi
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faClock} className="w-12 h-12" />{" "}
                        <p className="text-lg">
                            {Math.round((usedStats.moving_time / 3600) * 10) / 10} Hrs
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faTachometerAlt} className="w-12 h-12" />{" "}
                        <p className="text-lg">{usedStats.count} Runs</p>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                        <FontAwesomeIcon icon={faRunning} className="w-12 h-12" />{" "}
                        <p className="text-lg text-center">
                            {outTime(
                                usedStats.moving_time / (usedStats.distance / 1609.34),
                                0
                            )}
                        </p>
                    </div>
                </div>
                <button
                    className="w-full p-2 mt-4 bg-gray-600 rounded-md hover:bg-gray-500"
                    onClick={() => setShowYear(!showYear)}
                >
                    Toggle
                </button>
            </div>
             <div className="flex flex-row flex-wrap gap-4 p-8 mb-4 bg-gray-700 rounded-md lg:ml-4">

          <ul className="flex flex-col w-full justify-evenly">
            {data.shoes.map((shoe: any) => (
              <li
                key={shoe.id}
                className="flex flex-row justify-between mt-4 text-lg"
              >
                <h2>{shoe.name}</h2>

                <p>
                  {" "}
                  <FontAwesomeIcon icon={faRunning} className="ml-2" />{" "}
                  {shoe.converted_distance} Mi
                </p>
              </li>
            ))}
          </ul>
      </div>
            {/* <div className="grid grid-cols-2 gap-4 p-8 mb-4 bg-gray-700 rounded-md lg:ml-4">
        <Link
          className="w-full p-2 text-center bg-gray-600 rounded-md hover:bg-gray-500"
          href="/strava/profile"
        >
          View Profile
        </Link>
        <Link
          className="w-full p-2 text-center bg-gray-600 rounded-md hover:bg-gray-500"
          href="/strava/goals"
        >
          Manage Goals
        </Link>
      </div> */}

        </PageWrapper>
    );
}
