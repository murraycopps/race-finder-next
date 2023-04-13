import Head from "next/head";
import { HTMLAttributes, useEffect } from "react";
import Navbar from "./Navbar";
import LoginData from "@/scripts/LoginData";

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  page: string;
}

export default function PageWrapper(props: PageWrapperProps) {
    
    useEffect(() => {
      if(!LoginData.isLoggedIn()) {
        LoginData.getStorage();
      }
    }, []);

  return (
    <>
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
