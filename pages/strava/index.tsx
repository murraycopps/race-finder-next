import LandingPage from "@/components/Strava/LandingPage";
import LoginData from "@/scripts/LoginData";
import { useEffect, useState } from "react";
import HomePage from "@/components/Strava/HomePage";
import PageWrapper from "@/components/PageWrapper";


export default function Page() {
  const [loggedIn, setLoggedIn] = useState(LoginData.isLoggedIn());

  useEffect(() => {
    LoginData.getStorage();
    setLoggedIn(LoginData.isLoggedIn());
  }, []);
  
  return <PageWrapper page="Strava">{loggedIn ? <HomePage /> : <LandingPage />}</PageWrapper>;
}
