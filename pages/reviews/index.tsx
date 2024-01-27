import PageWrapper from "@/components/PageWrapper";
import { shoes } from "@/scripts/shoes";
import { useEffect, useState } from "react";
import { Item } from "@/scripts/types";
import ItemCard from "@/components/Reviews/ItemCard";
import { clothes } from "@/scripts/clothes";
import LinkCard from "@/components/HomePage/LinkCard";
import Image from "next/image";
import SlantedTitle from "@/components/HomePage/SlantedTitle";
const items = [
  { item: shoes[0], des: "Best Racer" },
  { item: shoes[1], des: "Best Track" },
  { item: shoes[5], des: "Best Trail" },
  { item: shoes[6], des: "Best Road" },
  { item: clothes[4], des: "Best Bottom" },
  { item: clothes[1], des: "Best Top" },
  // {item: other[0], des: "Best Watch"},
];
export default function Reviews() {
  // const [randomItems, setRandomItems] = useState([] as Item[]);
  // useEffect(() => {
  //   setRandomItems([...shoes, ...clothes].sort((a, b) => Math.random() - 0.5));
  // }, []);
  const [randomItems, setRandomItems] = useState(
    [] as { item: Item; des: string }[]
  );

  useEffect(() => {
    setRandomItems(items.sort(() => Math.random() - 0.5));
    // make an interval that shifts the list
    // const interval = setInterval(() => {
    //     setRandomItems((prev) => {
    //         const newItems = [...prev];
    //         newItems.push(newItems.shift() as { item: Item; des: string });
    //         return newItems;
    //     });
    // }, 5000);
  }, []);

  return (
    <PageWrapper
      page="Reviews"
      className="flex flex-col items-center justify-start w-screen min-h-screen gap-8 p-8 overflow-x-hidden sm:gap-16 sm:p-16"
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

      <div className="grid w-full grid-cols-1 gap-4 p-4 text-center lg:gap-8 lg:p-8 sm:grid-cols-2 lg:grid-cols-3">
        <LinkCard
            img="/review-cards/shoe.webp"
            link="/reviews/shoes"
            description="Revirews of the best shoes for running"
            title="Shoes" />
        <LinkCard
          link="/reviews/clothes"
          img="/review-cards/clothesnew.webp"
          description="Reviews of the best clothes for running"
          title="Clothes"
        />
        <LinkCard
          img="/review-cards/gearnew.png"
          link="/reviews/other"
          description="Reviews of the best gear for running"
          title="Gear"

        />
      </div>
      <h1 className="w-full p-2 text-5xl text-center text-white md:text-6xl slanted bg-ronchi-600">
        Reviews
      </h1>

      {/* <SlantedTitle title={" "}/> */}
      <div className="grid justify-start w-full grid-cols-1 gap-4 px-8 sm:grid-cols-2 lg:grid-cols-4 ">
        {randomItems.slice(0, 4).map((item, i) => {
          return <ItemCard item={item.item} des={item.des} key={i} />;
        })}
      </div>
    </PageWrapper>
  );
}
