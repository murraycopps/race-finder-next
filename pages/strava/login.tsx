import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import LoginData from "@/scripts/LoginData";
import Link from "next/link";
import { User } from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";

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

  async function handleClick() {
    // check if username and password are valid
    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );

    if (user) {
      if (!user.expiresAt) return;
      // check if user.expiresAt is in the past
      console.log(new Date(user.expiresAt * 1000).toLocaleString());
      if (new Date(user.expiresAt * 1000) < new Date()) {
        // refresh token
        const response = await axios.post(
          `https://www.strava.com/api/v3/oauth/token`,
          {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "refresh_token",
            refresh_token: user.refreshToken,
          }
        );
        const { access_token, refresh_token, expires_at } = response.data;
        console.log(response.data);
        console.log(new Date(response.data.expires_at * 1000).toLocaleString());

        axios.put(`${url}/api/users`, {
          _id: user._id,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: expires_at,
        });

        LoginData.Login(access_token, username, user.goals || [], user._id);

        router.push("/strava/");
        return;
      }
      if (!user.accessToken) return;
      LoginData.Login(user.accessToken, username, user.goals || [], user._id);

      router.push("/strava/");
    } else {
      setErrorMessage("Incorrect username or password");
    }
  }

  return (
    <PageWrapper
      page="Login"
      className="flex flex-col items-center justify-center h-screen"
    >
      <form className="flex flex-col gap-4 px-4 py-6 rounded-lg shadow-lg bg-faded-purple-600 run-field-sizing">
        <label className="block text-lg font-bold" htmlFor="username">
          Username:
        </label>
        <input
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="block text-lg font-bold" htmlFor="password">
          Password:
        </label>
        <input
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
          type="password"
          name="password"
          value={password}
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 ">{errorMessage}</p>
        <button
          className="w-full px-4 py-2 font-bold text-white rounded-md bg-base-500 hover:bg-base-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleClick}
        >
          Login
        </button>
      </form>

      <Link
        className="px-4 py-2 mt-4 font-bold text-center rounded-md bg-faded-purple-600 run-field-sizing hover:bg-faded-purple-700 focus:outline-none focus:shadow-outline"
        type="button"
        href="/strava/create-account"
      >
        Create Account
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
