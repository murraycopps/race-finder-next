import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {shoes} from "@/scripts/shoes";
import {Shoe} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Stars from "@/components/Reviews/Stars";
import PageCard from "@/components/Reviews/PageCard";
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

        <PageWrapper page={shoe?.name || "Shoe"} className="flex flex-col justify-center h-screen overflow-y-auto w-screen px-32 py-16 item-center">
            {shoe ? (
                <div className="w-full h-full p-4 rounded-lg ">
                    <PageCard item={shoe}/>

                    <h1 className="flex justify-center w-full text-4xl slanted font-medium bg-ronchi-500 text-white p-4">Specs</h1>
                    <div className="flex flex-col h-full p-4 col-span-2">
                        <div className="p-4 text-xl font-medium text-center text-white grid grid-cols-4 gap-12">
                            
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
                        <h1 className="flex justify-center w-full text-4xl slanted font-medium bg-ronchi-500 text-white p-4">Review</h1>
                        <ReviewTextCard article={shoe}/>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}