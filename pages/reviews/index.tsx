import PageWrapper from "@/components/PageWrapper";
import ShoeCard from "@/components/ShoeCard";
import {shoes} from "@/scripts/shoes";
export default function Reviews() {
  return (
    <PageWrapper page="Reviews" className="flex flex-col items-center justify-start w-screen h-screen gap-4">
      {/* <img src="/images/review-landing.jpg" alt="Reviews" className="object-cover w-screen h-2/3 bottom-16 opacity-20"/> */}
        <h1 className="text-6xl text-red-300"  >Reviews</h1>
        <div className="flex flex-row justify-center gap-4 ">

        <ShoeCard shoe={shoes[0]}/>
        </div>

    </PageWrapper>
  );
}