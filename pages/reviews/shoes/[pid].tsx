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

export default function ShoesPage() {

  const router = useRouter();
  const { pid } = router.query;
  const [shoe, setShoe] = useState(null as Shoe | null);


  useEffect(() => {
    if (pid) {
    ReviewsHand.getReviews().then(() => {
      const shoe = shoes.find((shoe) => shoe.id == pid);
      if (!shoe) {
        router.back();
        return;
      }
      setShoe(shoe);
    })
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
          <div className="flex flex-col p-4 col-span-2 gap-4">
            <div className="p-4 text-xl font-medium text-center text-white grid grid-cols-4 gap-12">
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

            <div className="flex flex-col h-full p-8 col-span-2 gap-8">
              <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
                Review
              </h1>
              <p className="text-xl text-center text-white">{shoe.review}</p>
            </div>
                  <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
                    Costomer Reviews
                  </h1>
            <div className="grid grid-cols-4 gap-4">
            {shoe.reviews.length > 0 ? shoe.reviews.map((review, i) => (
                        <div key={i} className="flex flex-col  px-16 py-4 bg-wisteria-600 card-slant h-64">
                          <p className="text-2xl text-center text-white">{review.title}</p>

                          <div className="flex flex-row justify-evenly text-xl">
                            <p className="text-xl text-center text-white">{review.author}</p>
                            <Stars number={review.rating}/>
                          </div>
                          <p className="text-l text-center text-white overflow-hidden h-full overflow-ellipse" >{review.review}</p>
                        </div>
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
