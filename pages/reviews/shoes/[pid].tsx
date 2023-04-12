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

                    <SlantedTitle title={"Specs"}/>
                    <div className="flex flex-col h-full p-4 col-span-2">
                        <div className="flex-wrap justify-center p-4 text-xl font-medium text-center text-white border-4 border-solid rounded-lg grid grid-cols-5 gap-4 leading-6 flex-2 border-dark">
                            
                            <SpecsCard item={shoe}/>
                            {/*<div className="flex flex-col items-center gap-2 justify-evenly">*/}
                            {/*    <p><span className="text-lg font-medium">Surface:</span></p>*/}
                            {/*    <p className="text-lg font-bold">{shoe.surface}</p>*/}
                            {/*</div>*/}
                            <IndSpecsCard title={"Surface"} info={shoe.surface}/>
                            <IndSpecsCard info={shoe.drop + " mm"} title={"Drop"}/>
                            <IndSpecsCard info={shoe.weight + " g"} title={"Weight"}/>
                            <IndSpecsCard info={shoe.heelStackHeight + " mm"} title={"Heel Stack Height"}/>
                            <IndSpecsCard info={shoe.forefootStackHeight +" mm"} title={"Fore Foot Stack Height"}/>
                            <IndSpecsCard info={shoe.arch} title={"Support"}/>
                        </div>
                        <SlantedTitle title={"Review"}/>
                        <ReviewTextCard article={shoe}/>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}