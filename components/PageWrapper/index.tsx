import Head from "next/head";
import { HTMLAttributes, useEffect, useState } from "react";
import Navbar from "./Navbar";
import LoginData from "@/scripts/LoginData";
import Link from "next/link";
import { useRouter } from "next/router";

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  page: string;
  loginPage?: boolean;
}

const generateRoute = (route: string | string[] | undefined) => {
  if (typeof route === "string") {
    if (route.includes("strava")) {
      return "/home";
    }

    //   check if route is a valid route
    if (route.charAt(0) === "/") return route;
  }
  return "/home";
};

export default function PageWrapper(props: PageWrapperProps) {
  const router = useRouter();
  const route = router.route.replace("[pid]", router.query.pid as string);
  const [loggedIn, setLoggedIn] = useState(false);
  const [forward, setForward] = useState("");
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      await LoginData.getStorage();
      setLoggedIn(LoginData.isLoggedIn());
    };
    checkIfLoggedIn();
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* breakpoints */}
      {/* <div className="fixed top-0 right-0 w-10 h-10 bg-red-500 border-2 z-110 sm:bg-green-500 md:bg-blue-600 lg:bg-lavender-600 border-base" /> */}
      <Head>
        <title>{props.page}</title>
      </Head>
      <header>
        <Navbar />

        <div className="relative">
          {loggedIn ||
          (route.includes("login") && !route.includes("create-account")) ? (
            <div className="fixed z-20 grid w-20 h-10 grid-cols-2 gap-4 text-white top-2 right-5 ">
              {/* <button onClick={() => router.back()}>
                <svg
                  className={`w-full h-full rotate-90`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  window.history.forward();
                }}
              >
                <svg
                  className={`w-full h-full -rotate-90`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button> */}
              {/* make a button that displays the username, boolean linked, accessToken, and refreshToken from LoginData*/}
              <button
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Open
              </button>
              {open && <div className="fixed bottom-0 text-white bg-black z-100">
                {LoginData.getUsername() || "No User"}
                <br />
                {LoginData.getLinked() || "Not Linked"}
                <br />
                {LoginData.getAccessToken() || "No Access Token"}
                <br />
                {LoginData.getRefreshToken() || "No Refresh Token"}

              </div>}
            </div>
          ) : (
            !props?.loginPage && (
              <Link
                href={`/login${route ? `?route=${route}` : ""}`}
                className="fixed grid h-10 px-6 text-lg transform -translate-y-1/2 place-items-center right-4 rounded-xl hover:rounded-3xl transition-all-300 bg-rose-500 hover:bg-rose-600 z-100 top-10 "
              >
                Login
              </Link>
            )
          )}
          {/* {!loggedIn && (
              <Link
                href={`/login${route ? `?route=${route}` : ""}`}
                className="fixed grid h-10 px-6 text-lg transform -translate-y-1/2 place-items-center right-4 rounded-xl hover:rounded-3xl transition-all-300 bg-rose-500 hover:bg-rose-600 z-100 top-10 "
              >
                Login
              </Link>
            )} */}
        </div>
      </header>
      <main {...props} />
    </>
  );
}
