import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {shoes} from "@/scripts/shoes";
import {Review, Shoe} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Overview from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";
import CreateReview from "@/components/Reviews/CreateReview";
import ReviewsHand from "@/scripts/ReviewsHand";
import Stars from "@/components/Reviews/Stars";
import ReviewCard from "@/components/Reviews/Review";

export default function ShoesPage() {

  const router = useRouter();
  const { pid } = router.query;
  const [shoe, setShoe] = useState(null as Shoe | null);
  const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    if (pid) {
    // ReviewsHand.getReviews().then(() => {
    //   const shoe = shoes.find((shoe) => shoe.id == pid);
    //   if (!shoe) {
    //     router.back();
    //     return;
    //   }
    //   setShoe(shoe);
    // })
      // convert to async/await
      const getShoe = async () => {
        const reviews = await ReviewsHand.getReviews();
        const shoe = shoes.find((shoe) => shoe.id == pid);

        if (!shoe) {
            router.back();
            return;
        }
        if(shoe.reviews.length === 0){
            shoe.reviews = reviews.filter((review) => review.id === shoe.id);
        }

        setReviews(shoe.reviews);

        setShoe(shoe);
      }
        getShoe();
    }
  }, [pid]);

  return (
    <PageWrapper
      page={shoe?.name || "Shoe"}
      className="flex flex-col justify-center w-screen min-h-screen p-4 overflow-x-hidden sm:p-8 md:p-16 lg:px-32 item-center"
    >
      {shoe ? (
        <div className="w-full h-full p-4 rounded-lg ">
          <Overview item={shoe} />

          <h2 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
            Specs/Review
          </h2>
          <div className="flex flex-col col-span-2 gap-4 p-4">
            <div className="grid grid-cols-4 gap-12 p-4 text-xl font-medium text-center text-white">
              {/*<SpecsCard item={shoe}/>*/}
              <SpecCard info={shoe.brand} title={"Brand"}/>
              <SpecCard info={shoe.use} title={"Best Use"}/>
              <SpecCard title={"Surface"} info={shoe.surface}/>
              <SpecCard info={shoe.drop + " mm"} title={"Drop"}/>
              <SpecCard info={shoe.weight + " g"} title={"Weight"}/>
              <SpecCard
                  info={shoe.heelStackHeight + " mm"}
                  title={"Heel Stack Height"}
              />
              <SpecCard
                  info={shoe.forefootStackHeight + " mm"}
                  title={"Fore Foot Stack Height"}
              />
              <SpecCard info={shoe.arch} title={"Support"}/>


            </div>

            <div className="flex flex-col h-full col-span-2 gap-8 p-8">

              <p className="text-2xl text-center text-white whitespace-pre-wrap">{shoe.review}</p>
            </div>
                  <h2 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
                    User Reviews
                  </h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            {reviews.length !== 0 ? reviews.map((review, i) => (
                        <ReviewCard review={review} key={i}/>
                    )) : (
                <p className="text-xl text-center text-white">No reviews yet</p>
            )}

          <CreateReview id={shoe.id} />
          </div>


        </div>
        </div>
      ) : (
        <p>Sorry, no shoe found</p>
      )}
    </PageWrapper>
  );
}
