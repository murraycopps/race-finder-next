import PageWrapper from "@/components/PageWrapper";
import { shoes } from "@/scripts/shoes";
import { useEffect, useState } from "react";
import { Item } from "@/scripts/types";
import ItemCard from "@/components/Reviews/ItemCard";
import { clothes } from "@/scripts/clothes";
import ReviewsRoutingCard from "@/components/Reviews/ReviewsRoutingCard";
import Image from "next/image";
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
      className="flex flex-col items-center justify-start w-screen h-screen gap-4"
    >
        <Image
          src="/images/review-landing.jpg"
          alt="Reviews"
          className="object-cover w-full h-75vh opacity-20"
            width={1920}
            height={1080}
        />

      <h1 className="mt-8 text-6xl text-red-300">Reviews 🐸</h1>
      <div className="grid w-full grid-cols-1 gap-8 px-8 sm:grid-cols-2 md:grid-cols-3">
        <ReviewsRoutingCard type="shoes" image="/review-cards/shoe.webp" />
        <ReviewsRoutingCard type="gear" image="/review-cards/gear.webp" />
        <ReviewsRoutingCard type="clothes" image="/review-cards/clothes.png" />
      </div>
      <div className="grid justify-start w-full grid-cols-1 gap-4 p-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {randomItems.slice(0, 4).map((item, i) => {
          return <ItemCard item={item} key={i} />;
        })}
      </div>
    </PageWrapper>
  );
}
