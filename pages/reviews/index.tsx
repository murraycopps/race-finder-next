import PageWrapper from "@/components/PageWrapper";
import ShoeCard from "@/components/ShoeCard";
import {shoes} from "@/scripts/shoes";
import {useEffect, useState} from "react";
import { Item } from "@/scripts/types";
import ItemCard from "@/components/ItemCard";
import {clothes} from "@/scripts/clothes";
    export default function Reviews() {
        const [randomItems, setRandomItems] = useState([] as Item[]);
        useEffect(() => {
            setRandomItems([...shoes,...clothes].sort((a, b) => Math.random()-0.5).slice(0, 6))
        }, [])

  return (
    <PageWrapper page="Reviews" className="flex flex-col items-center justify-start w-screen h-screen gap-4">
      {/* <img src="/images/review-landing.jpg" alt="Reviews" className="object-cover w-screen h-2/3 bottom-16 opacity-20"/> */}
        <h1 className="mt-8 text-6xl text-red-300"  >Reviews</h1>
        <div className="grid justify-start w-full grid-cols-1 gap-4 p-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {
                randomItems
                    .slice(0,4)
                    .map((item,i ) => {
                    return (
                        <ItemCard item={item} key={i}/>
                    )
                })
            }
        </div>

    </PageWrapper>
  );
}