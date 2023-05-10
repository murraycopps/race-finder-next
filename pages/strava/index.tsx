import LoginData from "@/scripts/LoginData";
import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/router";
import Link from "next/link";
import StravaPage from "@/components/StravaPage";

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [linked, setLinked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      await LoginData.getStorage();
      setLoggedIn(LoginData.isLoggedIn());
      setLinked(LoginData.getLinked())
      if (!LoginData.isLoggedIn()) {
        router.push("/login?route=/strava");
      }
    };
    checkIfLoggedIn();
  }, []);

  const onClick = async () => {
  }



  return (
    <PageWrapper page="Strava">
      {loggedIn ? (
        linked ? (
          <StravaPage />
        ) : (
          <div className="w-screen h-screen grid place-items-center">
            <div className="flex flex-col gap-8 text-center">
                <h1 className="text-4xl font-bold">Link your Strava account</h1>
                <p className="text-2xl">
                    Click{" "}
                    <button onClick={onClick} className="text-blue-500">
                        here
                    </button>{" "}
                    to link your Strava account
                </p>
            </div>
          </div>
        )
      ) : (
        <div className="grid h-screen place-items-center">
          <div className="flex flex-col gap-8 text-center">
            <h1 className="text-4xl font-bold">Redirecting...</h1>
            <p className="text-2xl">
              Click{" "}
              <Link href="/login" className="text-blue-500">
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
