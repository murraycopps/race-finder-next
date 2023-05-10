import LoginData from "@/scripts/LoginData";
import {useEffect, useState} from "react";
import PageWrapper from "@/components/PageWrapper";
import {useRouter} from "next/router";
import Link from "next/link";
import StravaPage from "@/components/StravaPage";
import axios from "axios";
import {User} from "@/scripts/types";

export default function Page({
                                 clientId,
                                 clientSecret,
                                 users,
                                 url,
                             }: {
    clientId: string;
    clientSecret: string;
    users: User[];
    url: string;
}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [linked, setLinked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            await LoginData.getStorage();
            setLoggedIn(LoginData.isLoggedIn());
            setLinked(LoginData.getLinked())
            if (!LoginData.isLoggedIn()) {
                router.push("/login?route=/strava");
            }
        };
        checkIfLoggedIn();
    }, []);

    const onClick = async () => {
        router.push(`https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${url}/strava/data?_id=${LoginData.getUserID()}&approval_prompt=force&scope=activity:read_all,read,profile:read_all,read_all`);
    }


    return (
        <PageWrapper page="Strava">
            {loggedIn ? (
                linked ? (
                    <StravaPage/>
                ) : (
                    <div className="w-screen h-screen grid place-items-center">
                        <div className="flex flex-col gap-8 text-center">
                            <h1 className="text-4xl font-bold">Link your Strava account</h1>
                            <p className="text-2xl">
                                Click{" "}
                                <button onClick={onClick} className="text-blue-500">
                                    here
                                </button>
                                {" "}
                                to link your Strava account
                            </p>
                        </div>
                    </div>
                )
            ) : (
                <div className="grid h-screen place-items-center">
                    <div className="flex flex-col gap-8 text-center">
                        <h1 className="text-4xl font-bold">Redirecting...</h1>
                        <p className="text-2xl">
                            Click{" "}
                            <Link href="/login" className="text-blue-500">
                                here
                            </Link>{" "}
                            if you are not redirected
                        </p>
                    </div>
                </div>
            )}
        </PageWrapper>
    );
}

export async function getServerSideProps(context: any) {
    const host = context.req.headers.host;
    const url = host.includes("localhost") ? "http://" : "https://";
    const fullUrl = url + host;
    let users = [] as any[];
    await axios
        .get(`${fullUrl}/api/users`)
        .then((response) => {
            users = response.data.data;
        })
        .catch((error) => {
            console.error(error);
        });

    return {
        props: {
            clientId: process.env.STRAVA_CLIENT_ID,
            clientSecret: process.env.STRAVA_CLIENT_SECRET,
            users: users,
            url: fullUrl,
        },
    };
}