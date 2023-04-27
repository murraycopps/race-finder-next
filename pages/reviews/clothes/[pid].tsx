import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { clothes } from "@/scripts/clothes";
import { Clothes } from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import FeaturesCard from "@/components/Reviews/Featuers";
import Overview from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";

export default function ShoesPage() {
  const router = useRouter();
  const { pid } = router.query;
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
    if (!article) return         <p>Sorry, no shoe found</p>


  return (
    <PageWrapper
      page={article.name || "Shoe"}
      className="flex flex-col w-screen h-screen p-16 gap-8 overflow-y-auto item-center"
    >
          <Overview item={article} />

          <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
            Specs/Review
          </h1>
          <div className="grid grid-cols-2 p-4">

            <div className="p-4 text-xl font-medium text-center text-white grid grid-cols-2 gap-4">
              {/*<SpecsCard item={article}/>*/}
              <SpecCard info={article.brand} title={"Brand"} />
              <SpecCard info={article.use} title={"Best Use"} />

              {article?.features && article.features.length > 0 && (
                <FeaturesCard features={article.features} />
              )}
            </div>
            {/*<h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">*/}
            {/*  Review*/}
            {/*</h1>*/}
            {/*<p className="text-2xl text-left text-white">{article.review}</p>*/}
            <p className="text-2xl text-justify text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias aliquid amet aperiam asperiores aspernatur atque autem beatae commodi consequatur consequuntur corporis cumque cupiditate delectus deleniti dicta dignissimos dolor doloremque doloribus ducimus ea earum eius eligendi error esse est excepturi exercitationem expedita explicabo facere fugiat fugit harum hic id illum impedit in inciduntipsa ipsum iste itaque iure laboriosam laborum laudantium libero magnam magni maiores maxime minimaminus molestiae mollitia nam natus necessitatibus nemo neque nihil nisi nobis non nostrum nulla
            </p>
          </div>

    </PageWrapper>
  );
}
