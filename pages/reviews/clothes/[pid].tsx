import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { clothes } from "@/scripts/clothes";
import { Clothes } from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import FeaturesCard from "@/components/Reviews/Featuers";
import PageCard from "@/components/Reviews/Overview";
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

  return (
    <PageWrapper
      page={article?.name || "Shoe"}
      className="flex flex-col justify-center w-screen h-screen px-32 py-16 overflow-y-auto item-center"
    >
      {article ? (
        <div className="w-full h-full p-4 rounded-lg ">
          <PageCard item={article} />

          <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
            Specs
          </h1>
          <div className="flex flex-col h-full p-4 col-span-2">
            <div className="p-4 text-xl font-medium text-center text-white grid grid-cols-4 gap-12">
              {/*<SpecsCard item={article}/>*/}
              <SpecCard info={article.brand} title={"Brand"} />
              <SpecCard info={article.use} title={"Best Use"} />

              {article?.features && article.features.length > 0 && (
                <FeaturesCard features={article.features} />
              )}
            </div>
            <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
              Review
            </h1>
            <p className="text-xl text-center text-white">{article.review}</p>
          </div>
        </div>
      ) : (
        <p>Sorry, no shoe found</p>
      )}
    </PageWrapper>
  );
}
