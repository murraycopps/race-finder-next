import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {clothes} from "@/scripts/clothes";
import {Clothes} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Stars from "@/components/Reviews/Stars";
import FeaturesCard from "@/components/Reviews/FeatuersCard";
import ReviewTextCard from "@/components/Reviews/ReviewTextCard";
import PageCard from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";


export default function ShoesPage() {
    const router = useRouter();
    const {pid} = router.query;
    const [article, setArticle] = useState(null as Clothes | null);
    useEffect(() => {
        if (pid) {
            const article = clothes.find((article) => article.id == pid);
            if (!article) {
                router.back();
                return;
            }
            setArticle(article);

        }
    }, [pid]);

    return (

        <PageWrapper page={article?.name || "Shoe"} className="flex flex-col justify-center h-screen overflow-y-auto w-screen px-32 py-16 item-center">
            {article ? (
                <div className="w-full h-full p-4 rounded-lg ">
                    <PageCard item={article}/>

                    <h1 className="flex justify-center w-full text-4xl slanted font-medium bg-ronchi-500 text-white p-4">Specs</h1>
                    <div className="flex flex-col h-full p-4 col-span-2">
                        <div className="p-4 text-xl font-medium text-center text-white grid grid-cols-4 gap-12">

                            {/*<SpecsCard item={article}/>*/}
                            <SpecCard info={article.brand} title={"Brand"}/>
                            <SpecCard info={article.use} title={"Best Use"}/>

                            {article?.features && article.features.length > 0 && (
                                <FeaturesCard features={article.features} />
                            )}
                        </div>
                        <h1 className="flex justify-center w-full text-4xl slanted font-medium bg-ronchi-500 text-white p-4">Review</h1>
                        <ReviewTextCard article={article}/>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>

        
    )

}