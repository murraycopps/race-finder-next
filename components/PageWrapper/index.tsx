import Head from "next/head";
import { HTMLAttributes } from "react";
import Navbar from "./Navbar";
import {useRouter} from "next/router";

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  page: string;
}

export default function PageWrapper(props: PageWrapperProps) {
    const router = useRouter();

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
