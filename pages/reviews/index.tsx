import PageWrapper from "@/components/PageWrapper";
import { shoes } from "@/scripts/shoes";
import { useEffect, useState } from "react";
import { Item } from "@/scripts/types";
import ItemCard from "@/components/Reviews/ItemCard";
import { clothes } from "@/scripts/clothes";
import ReviewsRoutingCard from "@/components/Reviews/ReviewsRoutingCard";
import Image from "next/image";
import SlantedTitle from "@/components/HomePage/SlantedTitle";
export default function Reviews() {
  const [randomItems, setRandomItems] = useState([] as Item[]);
  useEffect(() => {
    setRandomItems(
      [...shoes, ...clothes].sort((a, b) => Math.random() - 0.5).slice(0, 6)
    );
  }, []);

  return (
    <PageWrapper
      page="Reviews"
      className="flex flex-col items-center justify-start w-screen h-screen overflow-y-auto gap-4 p-16"
    >
      {/*<div className="relative">*/}
      {/*  <Image*/}
      {/*      src="/review-cards/review-landing.jpg"*/}
      {/*      alt="Reviews"*/}
      {/*      className="object-cover w-screen opacity-20"*/}
      {/*      width={1920}*/}
      {/*      height={1080}*/}

      {/*  />*/}
      {/*  <h1 className="absolute inset-0 flex flex-col items-center justify-center text-base gap-4 text-8xl">Reviews</h1>*/}
      {/*</div>*/}

      <h1 className="text-white w-full text-center text-6xl slanted bg-wisteria-600 p-2">Reviews</h1>


      <div className="w-full px-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <ReviewsRoutingCard type="shoes" image="/review-cards/shoe.webp" />
        <ReviewsRoutingCard type="clothes" image="/review-cards/clothesnew.webp" />
        <ReviewsRoutingCard type="other" image="/review-cards/gearnew.png" />
      </div>

      <SlantedTitle title={" "}/>
      <div className="justify-start w-full p-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">

        {randomItems.slice(0, 4).map((item, i) => {
          return <ItemCard item={item} key={i} />;
        })}
      </div>
    </PageWrapper>
  );
}
