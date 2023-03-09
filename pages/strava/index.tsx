import LandingPage from "@/components/Strava/LandingPage";
import LoginData from "@/scripts/LoginData";
import { useEffect, useState } from "react";
import HomePage from "@/components/Strava/HomePage";


export default function Page() {
  const [loggedIn, setLoggedIn] = useState(LoginData.isLoggedIn());

  useEffect(() => {
    LoginData.getStorage();
    setLoggedIn(LoginData.isLoggedIn());
  }, []);
  
  return <div>{loggedIn ? <HomePage /> : <LandingPage />}</div>;
}
