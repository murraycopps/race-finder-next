import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shoes } from "@/scripts/shoes";
import {Review, Shoe} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Overview from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";
import CreateReview from "@/components/Reviews/CreateReview";
import ReviewsHand from "@/scripts/ReviewsHand";

export default function ShoesPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const router = useRouter();
  const { pid } = router.query;
  const [shoe, setShoe] = useState(null as Shoe | null);

  useEffect (() => {
    ReviewsHand.getReviews().then((res) => {
      setReviews(res);
    });
    }, []);

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
    <PageWrapper
      page={shoe?.name || "Shoe"}
      className="flex flex-col justify-center w-screen h-screen px-32 py-16 overflow-y-auto item-center"
    >
      {shoe ? (
        <div className="w-full h-full p-4 rounded-lg ">
          <Overview item={shoe} />

          <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
            Specs
          </h1>
          <div className="flex flex-col h-full p-4 col-span-2 gap-4">
            <div className="p-4 text-xl font-medium text-center text-white grid grid-cols-4 gap-12">
              {/*<SpecsCard item={shoe}/>*/}
              <SpecCard info={shoe.brand} title={"Brand"} />
              <SpecCard info={shoe.use} title={"Best Use"} />
              <SpecCard title={"Surface"} info={shoe.surface} />
              <SpecCard info={shoe.drop + " mm"} title={"Drop"} />
              <SpecCard info={shoe.weight + " g"} title={"Weight"} />
              <SpecCard
                info={shoe.heelStackHeight + " mm"}
                title={"Heel Stack Height"}
              />
              <SpecCard
                info={shoe.forefootStackHeight + " mm"}
                title={"Fore Foot Stack Height"}
              />
              <SpecCard info={shoe.arch} title={"Support"} />
            </div>
            <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
              Review
            </h1>
            <p className="text-xl text-center text-white">{shoe.review}</p>
          </div>
          {reviews.length > 0 ? (
            <div className="flex flex-col h-full p-4 col-span-2 gap-4">
                <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
                    Reviews
                </h1>
                {reviews.map((review) => (
                    <div className="flex flex-col h-full p-4 col-span-2 gap-4">
                        <p className="text-xl text-center text-white">{review.review}</p>
                    </div>
                ))}
            </div>
            ) : (
                <p className="text-xl text-center text-white">No reviews yet</p>
            )}


          <CreateReview />
        </div>
      ) : (
        <p>Sorry, no shoe found</p>
      )}
    </PageWrapper>
  );
}
