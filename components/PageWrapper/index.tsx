import Head from "next/head";
import { HTMLAttributes, useEffect } from "react";
import Navbar from "./Navbar";
import LoginData from "@/scripts/LoginData";
import Link from "next/link";
interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  page: string;
  loginPage?: boolean;
}

export default function PageWrapper(props: PageWrapperProps) {
  useEffect(() => {
    if (!LoginData.isLoggedIn()) {
      LoginData.getStorage();
      console.log("Logged in: " + LoginData.isLoggedIn());
    }
  }, []);

  return (
    <>
      {/* breakpoints */}
      {/* <div className="fixed top-0 right-0 w-10 h-10 bg-red-500 border-2 z-100 sm:bg-green-500 md:bg-blue-600 lg:bg-lavender-600 border-base" /> */}
      <Head>
        <title>{props.page}</title>
      </Head>
      <header>
        <Navbar />
        <div className="relative">
          {!props.loginPage && (
            <Link
              href="/create-account"
              className="absolute grid h-10 px-6 text-lg transform -translate-y-1/2 place-items-center right-4 rounded-xl hover:rounded-3xl transition-all-300 bg-rose-500 hover:bg-rose-600 z-100 top-10 "
            >
              Login
            </Link>
          )}
        </div>
      </header>
      <main {...props} />
    </>
  );
}
