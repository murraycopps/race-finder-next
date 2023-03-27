import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function IndexPage() {
  const moveGradient = (e: any) => {
    // get the button element
    const button = e.target;
    // get the button's bounding rectangle
    const rect = button.getBoundingClientRect();
    // get the x and y coordinates of the mouse relative to the button
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // set the css variables to the x and y coordinates
    button.style.setProperty("--bg-x-pos", `${x}px`);
    button.style.setProperty("--bg-y-pos", `${y}px`);
  };

  return (
    <div className="fixed inset-0 text-center bg-base">
        <Head>
            <title>Runner&#39;s Hub</title>
        </Head>
      <Image
        src="/landing-images/outer-blob.svg"
        alt="outer-blob"
        className="absolute top-0 left-0 w-5/6 sm:w-3/4 md:w-2/3 lg:w-7/12 outer-blob"
        width={1000}
        height={1000}
      />
      <Image
        src="/landing-images/inner-blob.svg"
        alt="inner-blob"
        className="absolute right-0 w-3/4 sm:w-2/3 md:w-7/12 lg:w-1/2 bottom-16 inner-blob"
        width={1000}
        height={1000}
      />
      <Image
        src="/landing-images/yellow-runner.png"
        alt="runner"
        className="absolute w-1/3 sm:w-7/24 lg:w-1/4 right-20 bottom-28"
        width={1000}
        height={1000}
      />
      <div className="relative z-10 flex flex-col items-center justify-center w-2/3 h-full col-span-2 gap-16 p-4">
        <h1 className="text-8xl text-shadow-base">Runner&#39;s Hub</h1>
        <p className="w-3/4 text-3xl text-shadow-base">
          Run smarter with our platform! Connect with Strava, calculate splits,
          and get gear recommendations.
        </p>
        <Link
         href="/home"
         className="px-16 py-4 text-2xl rounded-full bg-rose-500 hover:bg-rose-600 home-button"
         onMouseMove={moveGradient}
        >
         Join Now!
        </Link>
      </div>
    </div>
  );
}
