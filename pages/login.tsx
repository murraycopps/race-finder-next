import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginData from "@/scripts/LoginData";
import Link from "next/link";
import { User } from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import { refreshToken } from "@/lib/strava";

export default function LoginPage({
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
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  async function handleClick() {
    // check if username and password are valid
    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );

    if (user) {
      if (user.expiresAt && new Date(user.expiresAt * 1000) < new Date()) {
        const refreash = async () => {
          const { access_token, refresh_token, expires_at } =
            await refreshToken(user.refreshToken);
          axios.put(`${url}/api/users`, {
            _id: user._id,
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt: expires_at,
          });

          LoginData.Login(
            access_token,
            username,
            user.goals || [],
            user._id,
            expires_at,
            refresh_token,
            stayLoggedIn
          );
          const generateRoute = (route: string | string[] | undefined) => {
            if (typeof route === "string") {
              //   check if route is a valid route
              if (route.charAt(0) === "/") return route;
            }
            return "/home";
          };

          router.push(generateRoute(router.query.route || "/home"));
        };
        refreash();
      } else {
        LoginData.Login(
          user.accessToken || "",
          username,
          user.goals || [],
          user._id,
          user.expiresAt || 0,
          user.refreshToken || "",
          stayLoggedIn
        );

        const generateRoute = (route: string | string[] | undefined) => {
          if (typeof route === "string") {
            //   check if route is a valid route
            if (route.charAt(0) === "/") return route;
          }
          return "/home";
        };

        router.push(generateRoute(router.query.route || "/home"));
      }
    } else {
      setErrorMessage("Incorrect username or password");
    }
  }

  useEffect(() => {
    if (LoginData.isLoggedIn()) {
      // router.push("/strava/");
    }
  }, []);

  return (
    <PageWrapper
      page="Login"
      className="flex flex-col items-center justify-center h-screen"
    >
      <form className="flex flex-col gap-4 px-4 py-6 rounded-lg shadow-lg bg-faded-base-300 run-field-sizing">
        <label className="block text-lg font-bold" htmlFor="username">
          Username:
        </label>
        <input
          className="w-full px-3 py-2 text-black rounded-md focus:outline-none focus:shadow-outline-blue"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="block text-lg font-bold" htmlFor="password">
          Password:
        </label>
        <input
          className="w-full px-3 py-2 text-black rounded-md focus:outline-none focus:shadow-outline-blue"
          type="password"
          name="password"
          value={password}
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-4 py-2 font-bold text-white rounded-md bg-base-500 hover:bg-base-700 transition-all-150 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => setStayLoggedIn(!stayLoggedIn)}
        >
          Click to {stayLoggedIn ? "Don't Stay Logged In" : "Stay Logged In"}
        </button>
        {errorMessage && <p className="text-red-500 ">{errorMessage}</p>}
        <button
          className="w-full px-4 py-2 font-bold text-white rounded-md bg-base-500 hover:bg-base-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleClick}
        >
          Login
        </button>
      </form>

      <Link
        className="px-4 py-2 mt-4 font-bold text-center rounded-md bg-faded-base-300 run-field-sizing hover:bg-faded-base-200 focus:outline-none focus:shadow-outline"
        type="button"
        href={`/create-account${
          router.query.route ? `?route=${router.query.route}` : ""
        }`}
      >
        Need an account? Click here to create one
      </Link>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const host = context.req.headers.host;
  const url = host.includes("localhost") ? "http://" : "https://";
  const fullUrl = url + host;
  let users = [] as User[];
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
