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

        <PageWrapper page={shoe?.name || "Shoe"} className="flex flex-col justify-center min-h-screen mx-32 my-4 item-center">
            {shoe ? (
                <div className="grid w-4/5 h-full grid-cols-3 p-4 m-4 rounded-lg bg-slate-400 min-w-fit">
                    <PageCard item={shoe}/>

                    <div className="flex flex-col h-full col-span-2 p-4">
                        <div className="grid flex-wrap justify-center grid-cols-5 gap-4 p-4 m-4 text-xl font-medium leading-6 text-center text-white border-4 border-solid rounded-lg flex-2 bg-slate-400 border-dark">
                            
                            <SpecsCard item={shoe}/>
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Surface:</span></p>
                                <p className="text-lg font-bold">{shoe.surface}</p>
                            </div>

                            <IndSpecsCard info={shoe.drop + " mm"} title={"Drop"}/>
                            <IndSpecsCard info={shoe.weight + " g"} title={"Weight"}/>
                            <IndSpecsCard info={shoe.heelStackHeight + " mm"} title={"Heel Stack Height"}/>
                            <IndSpecsCard info={shoe.forefootStackHeight +" mm"} title={"Fore Foot Stack Height"}/>
                            <IndSpecsCard info={shoe.arch} title={"Support"}/>
                        </div>
                        <ReviewTextCard article={shoe}/>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}