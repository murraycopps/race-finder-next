import Head from "next/head";
import { HTMLAttributes, useEffect } from "react";
import Navbar from "./Navbar";
import LoginData from "@/scripts/LoginData";

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
      <div className="fixed top-0 right-0 w-10 h-10 bg-red-500 border-2 z-100 sm:bg-green-500 md:bg-blue-600 lg:bg-lavender-600 border-base" />
      <Head>
        <title>{props.page}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main {...props} />
    </>
  );
}
