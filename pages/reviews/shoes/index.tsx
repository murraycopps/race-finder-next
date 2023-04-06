import PageWrapper from "@/components/PageWrapper";
import ShoeCard from "@/components/Reviews/ShoeCard";
import {shoes} from "@/scripts/shoes";
import {useState} from "react";
import Filter from "@/components/Reviews/Filter";


export default function Reviews() {
    const [filteredShoes, setFilteredShoes] = useState(shoes);
return (
<PageWrapper page="Reviews" className="flex flex-col items-center justify-start w-screen h-screen overflow-y-auto gap-4">
    <Filter setFilteredShoes = {setFilteredShoes}/>
<h1 className="mt-8 text-6xl text-slate-400">Shoe Reviews</h1>
<div className="justify-start w-full p-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
{filteredShoes.map((shoe, i) =>  (
<ShoeCard shoe={shoe} key={i}/>
))

}


</div>



</PageWrapper>
);
}
