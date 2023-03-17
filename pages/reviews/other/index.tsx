import PageWrapper from "@/components/PageWrapper";
import {other} from "@/scripts/other
import ClothesCard from "@/components/Reviews/ClothesCard";
import ItemCard from "@/components/Reviews/ItemCard";


export default function Reviews() {
    return (
        <PageWrapper page="Reviews" className="flex flex-col items-center justify-start w-screen h-screen gap-4">
            <h1 className="mt-8 text-6xl text-red-300"  >Clothes Reviews</h1>
            <div className="grid justify-start w-full grid-cols-1 gap-4 p-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {Other.map((item, i) =>  (
                    <ItemCard key={i} item={item}/>
                ))

                }


            </div>



        </PageWrapper>
    );
}