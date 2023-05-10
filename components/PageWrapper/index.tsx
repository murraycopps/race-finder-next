import Head from "next/head";
import {HTMLAttributes, useEffect, useState} from "react";
import Navbar from "./Navbar";
import LoginData from "@/scripts/LoginData";
import Link from "next/link";
import {useRouter} from "next/router";

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
    page: string;
    loginPage?: boolean;
}

export default function PageWrapper(props: PageWrapperProps) {
    const router = useRouter();
    const route = router.route.replace("[pid]", router.query.pid as string)
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            await LoginData.getStorage();
            setLoggedIn(LoginData.isLoggedIn());
        };
        checkIfLoggedIn();
    }, []);


    return (
        <>
            {/* breakpoints */}
            {/* <div className="fixed top-0 right-0 w-10 h-10 bg-red-500 border-2 z-100 sm:bg-green-500 md:bg-blue-600 lg:bg-lavender-600 border-base" /> */}
            <Head>
                <title>{props.page}</title>
            </Head>
            <header>
                <Navbar/>
                {!route.includes("login") && !route.includes("create-account") && (
                        <div className="relative">
                            {loggedIn ? (
                                <div className="flex justify-end">
                                    <button onClick={() => {
                                        LoginData.Logout();
                                        if (route.includes("strava")) {
                                            router.push("/home");
                                        } else {
                                            router.reload();
                                        }
                                    }}
                                            className="absolute grid h-10 px-6 text-lg transform -translate-y-1/2 place-items-center right-4 rounded-xl hover:rounded-3xl transition-all-300 bg-rose-500 hover:bg-rose-600 z-100 top-10 ">
                                        Logout
                                    </button>
                                </div>
                            ) : (!props.loginPage && (
                                <Link
                                    href={`/login${route ? `?route=${route}` : ""}`}
                                    className="absolute grid h-10 px-6 text-lg transform -translate-y-1/2 place-items-center right-4 rounded-xl hover:rounded-3xl transition-all-300 bg-rose-500 hover:bg-rose-600 z-100 top-10 "
                                >
                                    Login
                                </Link>
                            ))}

                        </div>
                    )

                }
            </header>
            <main {...props} />
        </>
    );
}
