import LoginData from "@/scripts/LoginData";
import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/router";
import Link from "next/link";
import StravaPage from "@/components/StravaPage";

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      await LoginData.getStorage();
      setLoggedIn(LoginData.isLoggedIn());
      if (!LoginData.isLoggedIn()) {
        router.push("/strava/login");
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <PageWrapper page="Strava">
      {loggedIn ? (
        <StravaPage />
      ) : (
        <div className="grid h-screen place-items-center">
          <div className="flex flex-col gap-8 text-center">
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
