import PageWrapper from "@/components/PageWrapper";
import { shoes } from "@/scripts/shoes";
import { useState } from "react";
import Filter from "@/components/Reviews/Filter";
import ItemCard from "@/components/Reviews/ItemCard";

export default function Reviews() {
  const [filteredShoes, setFilteredShoes] = useState(shoes);
  return (
    <PageWrapper
      page="Reviews"
      className="flex flex-col items-center justify-start w-screen min-h-screen gap-4 p-10 overflow-y-auto"
    >
      {/* <h1 className="w-full p-4 mt-8 text-4xl font-medium text-center text-white slanted bg-ronchi-600">
        Shoe Reviews
      </h1> */}
      <h1 className="flex justify-center w-full p-4 text-5xl text-white slanted bg-ronchi-500">Shoe Reviews</h1>

      <Filter setFilteredShoes={setFilteredShoes} />
      <div className="grid justify-start w-full grid-cols-1 gap-4 p-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {filteredShoes.map((shoe, i) => (
          <ItemCard item={shoe} key={i} />
        ))}
      </div>
    </PageWrapper>
  );
}
