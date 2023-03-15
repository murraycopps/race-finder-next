import LoginData from "@/scripts/LoginData";
import { useEffect, useState } from "react";
import HomePage from "@/components/Strava/HomePage";
import PageWrapper from "@/components/PageWrapper";
import {useRouter} from "next/router";


export default function Page() {
  const [loggedIn, setLoggedIn] = useState(LoginData.isLoggedIn());
  const router = useRouter();

  useEffect(() => {
    LoginData.getStorage();
    setLoggedIn(LoginData.isLoggedIn());
    if (!loggedIn) {
        router.push("/strava/login");
    }
  }, []);
  
  return <PageWrapper page="Strava">
    {loggedIn ? <HomePage /> : <div>Not logged in</div>}
  </PageWrapper>;
}
