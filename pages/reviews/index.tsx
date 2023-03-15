import PageWrapper from "@/components/PageWrapper";
import ShoeCard from "@/components/Reviews/ShoeCard";
import { shoes } from "@/scripts/shoes";
import { useEffect, useState } from "react";
import { Item } from "@/scripts/types";
import ItemCard from "@/components/Reviews/ItemCard";
import { clothes } from "@/scripts/clothes";
import ReviewsRoutingCard from "@/components/Reviews/ReviewsRoutingCard";
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
      <img
        src="/images/review-landing.jpg"
        alt="Reviews"
        className="object-cover w-screen h-3/4 bottom-16 opacity-20"
      />
      <h1 className="mt-8 text-6xl text-red-300">Reviews 🐸</h1>
      <div className="grid w-full grid-cols-1 gap-8 px-8 sm:grid-cols-2 md:grid-cols-3">
        <ReviewsRoutingCard type="shoes" image="/review-card/shoe.jpg" />
        <ReviewsRoutingCard type="gear" image="/review-card/gear.jpg" />
        <ReviewsRoutingCard type="clothes" image="/review-card/clothes.jpg" />
      </div>
      <div className="grid justify-start w-full grid-cols-1 gap-4 p-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {randomItems.slice(0, 4).map((item, i) => {
          return <ItemCard item={item} key={i} />;
        })}
      </div>
    </PageWrapper>
  );
}
