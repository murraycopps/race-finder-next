import Link from "next/link";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import ShoeList from "@/components/ShoeList";
import { shoes } from "@/scripts/shoes";
import { clothes } from "@/scripts/clothes";
import { other } from "@/scripts/other";
import { Item } from "@/scripts/types";
import ShoeCard from "@/components/Reviews/ShoeCard";
import Stars from "@/components/Reviews/Stars";
import { useEffect, useState } from "react";
import PacingCard from "@/components/PacingCard";
import VdotCard from "@/components/VdotCard";
{/* <ItemCard item={shoes[0]} des="Best Racer" />
        <ItemCard item={shoes[1]} des="Best Track" />
        <ItemCard item={shoes[5]} des="Best Trail" />
        <ItemCard item={shoes[6]} des="Best Road" />
        <ItemCard item={clothes[4]} des="Best Bottom" />
        <ItemCard item={clothes[1]} des="Best Top" />
        <ItemCard item={other[0]} des="Best Watch" /> */}
const items =[
    {item: shoes[0], des: "Best Racer"},
    {item: shoes[1], des: "Best Track"},
    {item: shoes[5], des: "Best Trail"},
    {item: shoes[6], des: "Best Road"},
    {item: clothes[4], des: "Best Bottom"},
    {item: clothes[1], des: "Best Top"},
    // {item: other[0], des: "Best Watch"},
]

export default function HomePage() {
    const [randomItems, setRandomItems] = useState([] as {item: Item; des: string}[]);

    useEffect(() => {
        setRandomItems(
            items.sort(() => Math.random() - 0.5).slice(0, 4)
        );
    }, []);

  return (
    <PageWrapper
      page="Home"
      className="flex flex-col items-center min-h-screen gap-16 p-16 text-center"
    >
      <h1 className="text-4xl font-bold">Welcome to my website!</h1>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
        <Card
          title="Strava"
          description="Connect to Strava and view your stats"
          link="/strava/login"
          img="/review-cards/strava-icon.png"
        />
        <Card
          title="Tools"
          description="Tools to help you with your running"
          link="/tools"
          img="/review-cards/clock-icon.png"
        />
        <Card
          title="Reviews"
          description="Reviews of running shoes and gear"
          link="/reviews"
          img="/review-cards/shoe.webp"
        />
      </div>
      <SlantedTitle title="Our Reviews" />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
       
        {randomItems.map(({ item, des }, i) => (
            <ItemCard item={item} des={des} key={i} />
        ))}

      </div>
      <SlantedTitle title="Our Tools" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PacingCard /> 
        <VdotCard />
      </div>
      
    </PageWrapper>
  );
}

// create a card to link to any page

type CardProps = {
  title: string;
  description: string;
  link: string;
  img: string;
};

const Card = ({ title, description, link, img }: CardProps) => (
  <Link
    href={link}
    className="relative flex flex-col gap-8 p-8 overflow-hidden justify-evenly rounded-3xl bg-strava aspect-square"
  >
    <Image
      src={img}
      alt=""
      width="1000"
      height="1000"
      className="absolute inset-0 object-cover w-full h-ful"
    />
    <div className="absolute inset-0 w-full h-full bg-gray-600 opacity-80 hover:opacity-70" />
    <h2 className="z-50 text-4xl font-bold">{title}</h2>
    <p className="z-50 text-2xl">{description}</p>
  </Link>
);

const SlantedTitle = ({ title }: { title: string }) => (
  <div className="relative flex flex-col items-center justify-center w-full h-full py-4 slanted bg-strava">
    <h2 className="relative z-10 text-4xl font-bold">{title}</h2>
  </div>
);

const ItemCard = ({ item, des }: { item: Item; des: string }) => (
  <Link href={`/reviews/${item.type === "shoe" ? "shoes" : item.type}/${item.id}`}>
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-slate-400 rounded-3xl">
      <h3 className="mb-2 text-2xl font-bold">{des}</h3>
      <h2 className="w-full overflow-hidden text-xl text-center truncate text-ellipsis">
        {item.name}
      </h2>
      <img
        className={`w-full object-cover grow home ${item.type}  ${item.name.toLowerCase().includes('zinal') && "-rotate-3"}`}
        src={item.img}
        alt={item.name}
        height="300"
        width="300"
      />
      <div className="grid w-full grid-cols-2 text-xl place-items-center">
        <p className="text-2xl">${item.price}</p>
        <p>
          <Stars number={item.rating} total={5} />
        </p>
      </div>
    </div>
  </Link>
);
