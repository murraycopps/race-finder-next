import PageWrapper from "@/components/PageWrapper";
import { shoes } from "@/scripts/shoes";
import { useEffect, useState } from "react";
import { Item } from "@/scripts/types";
import ItemCard from "@/components/Reviews/ItemCard";
import { clothes } from "@/scripts/clothes";
import ReviewsRoutingCard from "@/components/Reviews/LinkCard";
import Image from "next/image";
import SlantedTitle from "@/components/HomePage/SlantedTitle";
export default function Reviews() {
  const [randomItems, setRandomItems] = useState([] as Item[]);
  useEffect(() => {
    setRandomItems([...shoes, ...clothes].sort((a, b) => Math.random() - 0.5));
  }, []);

  return (
    <PageWrapper
      page="Reviews"
      className="flex flex-col items-center justify-start w-screen h-screen gap-16 p-16 overflow-y-auto"
    >
      {/*<div className="relative">*/}
      {/*  <Image*/}
      {/*      src="/review-cards/review-landing.jpg"*/}
      {/*      alt="Reviews"*/}
      {/*      className="object-cover w-screen opacity-20"*/}
      {/*      width={1920}*/}
      {/*      height={1080}*/}

      {/*  />*/}
      {/*  <h1 className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-base text-8xl">Reviews</h1>*/}
      {/*</div>*/}

      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <ReviewsRoutingCard type="shoes" image="/review-cards/shoe.webp" />
        <ReviewsRoutingCard
          type="clothes"
          image="/review-cards/clothesnew.webp"
        />
        <ReviewsRoutingCard type="other" image="/review-cards/gearnew.png" />
      </div>
      <h1 className="w-full p-2 text-6xl text-center text-white slanted bg-ronchi-600">
        Reviews
      </h1>

      {/* <SlantedTitle title={" "}/> */}
      <div className="grid justify-start w-full grid-cols-1 gap-4 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {randomItems.slice(0, 8).map((item, i) => {
          return <ItemCard item={item} key={i} />;
        })}
      </div>
    </PageWrapper>
  );
}
