import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {shoes} from "@/scripts/shoes";
import {Shoe} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Stars from "@/components/Reviews/Stars";
import Overview from "@/components/Reviews/Overview";
import SpecsCard from "@/components/Reviews/SpecsCard";
import ReviewTextCard from "@/components/Reviews/ReviewTextCard";
import IndSpecsCard from "@/components/Reviews/IndSpecCard";
import SlantedTitle from "@/components/HomePage/SlantedTitle";


export default function ShoesPage() {
    const router = useRouter();
    const {pid} = router.query;
    const [shoe, setShoe] = useState(null as Shoe | null);
    useEffect(() => {
        if (pid) {
            const shoe = shoes.find((shoe) => shoe.id == pid);
            if (!shoe) {
                router.back();
                return;
            }
            setShoe(shoe);

        }
    }, [pid]);

    return (

        <PageWrapper page={shoe?.name || "Shoe"} className="flex flex-col justify-center w-screen h-screen px-32 py-16 overflow-y-auto item-center">
            {shoe ? (
                <div className="w-full h-full p-4 rounded-lg ">
                    <Overview item={shoe}/>

                    <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">Specs</h1>
                    <div className="flex flex-col h-full col-span-2 p-4">
                        <div className="grid grid-cols-4 gap-12 p-4 text-xl font-medium text-center text-white">
                            
                            {/*<SpecsCard item={shoe}/>*/}
                            <IndSpecsCard info={shoe.brand} title={"Brand"}/>
                            <IndSpecsCard info={shoe.use} title={"Best Use"}/>
                            <IndSpecsCard title={"Surface"} info={shoe.surface}/>
                            <IndSpecsCard info={shoe.drop + " mm"} title={"Drop"}/>
                            <IndSpecsCard info={shoe.weight + " g"} title={"Weight"}/>
                            <IndSpecsCard info={shoe.heelStackHeight + " mm"} title={"Heel Stack Height"}/>
                            <IndSpecsCard info={shoe.forefootStackHeight +" mm"} title={"Fore Foot Stack Height"}/>
                            <IndSpecsCard info={shoe.arch} title={"Support"}/>
                        </div>
                        <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">Review</h1>
                        <ReviewTextCard article={shoe}/>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}