import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {shoes} from "@/scripts/shoes";
import {Shoe} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Overview from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";


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
                    <div className="flex flex-col h-full col-span-2 p-4 gap-4">
                        <div className="grid grid-cols-4 gap-12 p-4 text-xl font-medium text-center text-white">
                            
                            {/*<SpecsCard item={shoe}/>*/}
                            <SpecCard info={shoe.brand} title={"Brand"}/>
                            <SpecCard info={shoe.use} title={"Best Use"}/>
                            <SpecCard title={"Surface"} info={shoe.surface}/>
                            <SpecCard info={shoe.drop + " mm"} title={"Drop"}/>
                            <SpecCard info={shoe.weight + " g"} title={"Weight"}/>
                            <SpecCard info={shoe.heelStackHeight + " mm"} title={"Heel Stack Height"}/>
                            <SpecCard info={shoe.forefootStackHeight +" mm"} title={"Fore Foot Stack Height"}/>
                            <SpecCard info={shoe.arch} title={"Support"}/>
                        </div>
                        <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">Review</h1>
                        <p className="text-center text-xl text-center text-white">{shoe.review}</p>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}