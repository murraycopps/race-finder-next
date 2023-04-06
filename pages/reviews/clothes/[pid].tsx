import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {clothes} from "@/scripts/clothes";
import {Clothes} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Stars from "@/components/Reviews/Stars";
import FeaturesCard from "@/components/Reviews/FeatuersCard";
import ReviewTextCard from "@/components/Reviews/ReviewTextCard";
import PageCard from "@/components/Reviews/PageCard";
import SpecsCard from "@/components/Reviews/SpecsCard";


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

        <PageWrapper page={article?.name || "articles"} className="flex flex-col justify-center min-h-screen mx-32 my-4 item-center">
            {article ? (
                <div className="w-4/5 h-full p-4 m-4 rounded-lg grid grid-cols-3 bg-slate-400 min-w-fit">
                    <PageCard item={article}/>

                    <div className="flex flex-col h-full p-4 col-span-2">
                        <div className="flex-wrap justify-center p-4 m-4 text-xl font-medium text-center text-white border-4 border-solid rounded-lg grid grid-cols-5 gap-4 leading-6 flex-2 bg-slate-400 border-base">
                            <SpecsCard item={article}/>
                            
                            {/*<div className="flex flex-col items-center gap-2 justify-evenly">*/}
                            {/*    <p><span className="text-lg font-medium"> Heel Stack Height:</span></p>*/}
                            {/*    <p className="text-lg font-bold">{article.color}mm</p>*/}
                            {/*</div>*/}
                            

                        {/* div with dispkayt fkex to display optional features */}
                        {article?.features && article.features.length > 0 && (
                            <FeaturesCard features={article.features} />
                        )}
                        </div>
                        <ReviewTextCard article={article} />
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}