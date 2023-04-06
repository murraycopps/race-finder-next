import LoginData from "@/scripts/LoginData";
import { useEffect, useState } from "react";
import HomePage from "@/components/Strava/HomePage";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/router";
import Link from "next/link";
import StravaPage from "@/components/StravaPage";


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

  return (
    <PageWrapper page="Strava">
      {loggedIn ? (
        // <HomePage />
        <StravaPage   />
      ) : (
        <div className="h-screen grid place-items-center">
          <div className="flex flex-col text-center gap-8">
            <h1 className="text-4xl font-bold">Redirecting...</h1>
            <p className="text-2xl">
              Click{" "}
              <Link href="/strava/login" className="text-blue-500">
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
