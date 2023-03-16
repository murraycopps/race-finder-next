import PageWrapper from "@/components/PageWrapper";
import {clothes} from "@/scripts/clothes";
import ClothesCard from "@/components/Reviews/ClothesCard";

export default function Reviews() {
    return (
        <PageWrapper page="Reviews" className="flex flex-col items-center justify-start w-screen h-screen gap-4">
            <h1 className="mt-8 text-6xl text-red-300"  >Shoe Reviews</h1>
            <div className="grid justify-start w-full grid-cols-1 gap-4 p-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {clothes.map((cloth, i) =>  (
                    <ClothesCard key={i} clothes={cloth}/>
                ))

                }


            </div>



        </PageWrapper>
    );
}