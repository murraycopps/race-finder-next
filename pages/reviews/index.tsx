import PageWrapper from "@/components/PageWrapper";
import ShoeCard from "@/components/ShoeCard";
import {shoes} from "@/scripts/shoes";
import {useEffect, useState} from "react";
import { Shoe } from "@/scripts/types";
    export default function Reviews() {
        const [randomShoes, setRandomShoes] = useState([] as Shoe[]);
        useEffect(() => {
            setRandomShoes(shoes.sort((a, b) => Math.random()-0.5).slice(0, 6))
        }, [])

  return (
    <PageWrapper page="Reviews" className="flex flex-col items-center justify-start w-screen h-screen gap-4">
      {/* <img src="/images/review-landing.jpg" alt="Reviews" className="object-cover w-screen h-2/3 bottom-16 opacity-20"/> */}
        <h1 className="text-6xl text-red-300"  >Reviews</h1>
        <div className="grid grid-cols-3 justify-start gap-4 ">
            {
                randomShoes
                    .map((shoe) => {
                    return (
                        <ShoeCard shoe={shoe} key={shoe.id}/>
                    )
                })
            }
        </div>

    </PageWrapper>
  );
}