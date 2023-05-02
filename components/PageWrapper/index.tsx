import Head from "next/head";
import { HTMLAttributes, useEffect } from "react";
import Navbar from "./Navbar";
import LoginData from "@/scripts/LoginData";
import Link from "next/link";
interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  page: string;
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

          <Link href="/create-account"
                className="px-6 py-2 right-4 text-lg h-10 rounded-2xl hover:rounded-full transition-all-300 bg-rose-500 hover:bg-rose-600 z-100 absolute top-10 transform -translate-y-1/2 "
          >
              Login
            </Link>
          </div>
      </header>
      <main {...props} />
    </>
  );
}
