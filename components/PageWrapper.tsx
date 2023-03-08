import Head from "next/head";
import { HTMLAttributes } from "react";

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  page: string;
}

export default function PageWrapper(props: PageWrapperProps) {
  return (
    <>
      <Head>
        <title>{props.page}</title>
      </Head>
      <header></header>
      <main {...props} />
    </>
  );
}
