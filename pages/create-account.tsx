import { useRouter } from "next/router";
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";
import { User } from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";

const generateRoute = (route: string | string[] | undefined) => {
  if(typeof route === "string"){

  //   check if route is a valid route
    if(route.charAt(0) === "/") return route
  }
  return "/home"
}

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
  const [popup, setPopup] = useState(false);
  const [insertedId, setInsertedId] = useState("")

  useEffect(()=>{
    console.log(router)
  })

  async function handleClick() {
    // check if username is used and if it is a new user
    const userExists = users.find(
      (user: { username: string }) => user.username === username
    );

    if (userExists) {
      setErrorMessage("Username already exists");
      return;
    }

    // check if username and password is valid
    if (username.length < 3 || password.length < 3) {
      setErrorMessage(
        "Username and password must be at least 3 characters long"
      );
      return;
    }

    // create new user
    axios
      .post(`${url}/api/users`, {
        username: username,
        password: password,
        goals: [],
      })
      .then((response) => {
          setPopup(true)
        setInsertedId(response.data.data.insertedId)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <PageWrapper
      page="Create Account"
      className="flex flex-col items-center justify-center h-screen"
    >
      <form className="flex flex-col px-4 py-6 rounded-lg shadow-lg gap-4 bg-faded-base-300 run-field-sizing">
        <label className="text-lg font-bold" htmlFor="username">
          Username:
        </label>
        <input
          className="w-full px-3 py-2 text-black rounded-md focus:outline-none focus:shadow-outline-blue"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-lg font-bold" htmlFor="password">
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
        {errorMessage && <p className="text-red-500 ">{errorMessage}</p>}
        <button
          className="w-full px-4 py-2 font-bold text-white rounded-md bg-base-500 hover:bg-base-700 transition-all-150 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleClick}
        >
          Create Account
        </button>
      </form>
      {
        popup && (
            <>
              <div className="inset-0 fixed bg-base opacity-50" />
              <div className="fixed w-128 h-128 flex flex-col gap-4 p-4 bg-faded-base-300 rounded-3xl items-center justify-evenly">
                {/*  if(linkToStrava)
          router.push(
            `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${url}/data?_id=${response.data.data.insertedId}&approval_prompt=force&scope=activity:read_all,read,profile:read_all,read_all`
        );
        else {
          const route = router.query.route
          if (typeof route === 'string')
            router.push(route)
          else
            router.push('/home')
        }*/}
                <h3 className="text-4xl">Account Created</h3>
                <div className="grid grid-cols-2 w-full gap-4 text-center text-2xl px-6">
                  <Link className="bg-ronchi-600 py-2 card-slant-sm"  href={`https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${url}/data?_id=${insertedId}&approval_prompt=force&scope=activity:read_all,read,profile:read_all,read_all`} >
                      Link to Strava
                  </Link>
                  <Link className="bg-ronchi-600 py-2 card-slant-sm"  href={generateRoute(router.query.route)}  >
                    Continue
                  </Link>
                </div>
              </div>
            </>
          )
      }
      <Link
        className="px-4 py-2 mt-4 font-bold text-center text-white rounded-md bg-faded-base-300 run-field-sizing hover:bg-faded-base-200 focus:outline-none focus:shadow-outline"
        type="button"
        href="/strava/login"
      >
        Login
      </Link>
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
