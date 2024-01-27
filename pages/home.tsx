import PageWrapper from "@/components/PageWrapper";
import ShoeList from "@/components/HomePage/ShoeList";
import { shoes } from "@/scripts/shoes";
import { clothes } from "@/scripts/clothes";
import { other } from "@/scripts/other";
import { Item } from "@/scripts/types";
import { useEffect, useState } from "react";
import PacingCard from "@/components/HomePage/PacingCard";
import VdotCard from "@/components/HomePage/VdotCard";
import QuoteCard from "@/components/HomePage/QuoteCard";
import LinkCard from "@/components/HomePage/LinkCard";
import SlantedTitle from "@/components/HomePage/SlantedTitle";
import ItemCard from "@/components/Reviews/ItemCard";
import {shoeslistrace} from "@/scripts/shoelist";
import {shoeslisttrain} from "@/scripts/shoelist";

const items = [
  { item: shoes[0], des: "Best Racer" },
  { item: shoes[1], des: "Best Track" },
  { item: shoes[5], des: "Best Trail" },
  { item: shoes[6], des: "Best Road" },
  { item: clothes[4], des: "Best Bottom" },
  { item: clothes[1], des: "Best Top" },
  // {item: other[0], des: "Best Watch"},
];

export default function HomePage() {
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
      page="Home"
      className="flex flex-col items-center min-h-screen gap-16 p-8 overflow-x-hidden text-center md:p-16 md:py-24"
    >
      {/* <h1 className="text-4xl font-bold">Runner's Hub!</h1> */}
      <div className="grid w-full gap-4 p-4 lg:gap-8 lg:p-8 sm:grid-cols-2 lg:grid-cols-3">
        <LinkCard
          title="Strava"
          description="Connect to Strava and view your stats"
          link="/strava"
          img="/review-cards/strava-white.png"
        />
        <LinkCard
          title="Tools"
          description="Tools to help you with your running"
          link="/tools"
          img="/review-cards/clock-icon.svg"
        />
        <LinkCard
          title="Reviews"
          description="Reviews of running shoes and gear"
          link="/reviews"
          img="/review-cards/shoe.webp"
        />
      </div>
        <SlantedTitle title="" />
        <div className="hidden w-full gap-4 place-items-center lg:grid lg:grid-cols-3">
           <ShoeList shoes={shoeslistrace} />
          <QuoteCard />
            <ShoeList shoes={shoeslisttrain} />
        </div>
        <div className="flex flex-col w-full gap-4 place-items-center lg:hidden">
          <QuoteCard/>
            <ShoeList shoes={shoeslistrace} />
            <ShoeList shoes={shoeslisttrain} />
        </div>
      <SlantedTitle title="Reviews" />
      <div className="grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {randomItems.slice(0, 4).map(({ item, des }, i) => (
          <ItemCard item={item} des={des} key={i} />
        ))}
      </div>
      <SlantedTitle title="Tools" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PacingCard />
        <VdotCard />
      </div>

    </PageWrapper>
  );
}