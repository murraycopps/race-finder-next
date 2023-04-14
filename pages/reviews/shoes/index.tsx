import PageWrapper from "@/components/PageWrapper";
import ShoeCard from "@/components/Reviews/ShoeCard";
import {shoes} from "@/scripts/shoes";
import {useState} from "react";
import Filter from "@/components/Reviews/Filter";
import ItemCard from "@/components/Reviews/ItemCard";


export default function Reviews() {
    const [filteredShoes, setFilteredShoes] = useState(shoes);
return (
<PageWrapper page="Reviews" className="flex flex-col items-center justify-start w-screen h-screen overflow-y-auto gap-4 p-10">

<h1 className="mt-8 text-4xl font-medium p-4 text-white slanted bg-ronchi-600 w-full text-center">Shoe Reviews</h1>
    <Filter setFilteredShoes = {setFilteredShoes}/>
<div className="justify-start w-full p-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
{filteredShoes.map((shoe, i) =>  (
<ItemCard item={shoe} key={i}/>
))

}


</div>



</PageWrapper>
);
}
