import { shoes } from "@/scripts/shoes";
import { Shoe } from "@/scripts/types";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import FilterDropdown from "./FilterDropdown";

export default function Filter({
  setFilteredShoes,
}: {
  setFilteredShoes: (shoes: Shoe[]) => void;
}) {
  const [value, setValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const items = ["All", "Road", "Trail", "Track"];
  const sortOptions = [
    "Default",
    "Price: Low to High",
    "Price: High to Low",
    "Name: A-Z",
    "Name: Z-A",
    "Rating: Low to High",
    "Rating: High to Low",
    "Weight: Low to High",
    "Weight: High to Low",
  ];

  const filter = () => {
    if (value == "All" || value == "") {
      return [...shoes]
    }
    const filteredShoes = shoes.filter((shoe: Shoe) => {
      return shoe.surface.includes(value);
    });
   return filteredShoes
  };
  const sort = () => {
    console.log(sortBy);
    switch (sortBy) {
      case "Default":
        setFilteredShoes(filter());
        return;
      case "Price: Low to High":
        setFilteredShoes(filter().sort((a, b) => a.price - b.price));
        return;
      case "Price: High to Low":
        setFilteredShoes(filter().sort((a, b) => b.price - a.price));
        return;
      case "Name: A-Z":
        setFilteredShoes(
            filter().sort((a, b) => a.name.localeCompare(b.name))
        );
        return;
      case "Name: Z-A":
        setFilteredShoes(
            filter().sort((a, b) => b.name.localeCompare(a.name))
        );
        return;
      case "Rating: Low to High":
        setFilteredShoes(filter().sort((a, b) => a.rating - b.rating));
        return;
      case "Rating: High to Low":
        setFilteredShoes(filter().sort((a, b) => b.rating - a.rating));
        return;
      case "Weight: Low to High":
        setFilteredShoes(filter().sort((a, b) => a.weight - b.weight));
        return;
      case "Weight: High to Low":
        setFilteredShoes(filter().sort((a, b) => b.weight - a.weight));
        return;
    }
  };

  useEffect(() => {
    sort();
  }, [value, sortBy]);
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-4 p-4 controls-width-clamp ">
      {/* <div className="flex content-center justify-center w-full max-w-3xl"> */}
      {/* <label className="mr-4 text-xl" htmlFor="surface">
          Filter by Surface
        </label> */}

      <FilterDropdown
        items={items}
        setValue={(value) => {
          setValue(value.toString());
        }}
        value={value}
        placeholder="Filter by Surface"
        valuePrefix="Surface: "
      />
        <FilterDropdown
            items={sortOptions}
            setValue={(value) => {
                setSortBy(value.toString());
            }}
            value={sortBy}
            placeholder="Sort by"
        />


      {/*/!*<select name="surface" id="surface" className="p-2 text-white border border-gray-500 rounded-lg bg-faded-purple-600 " onChange={filter}>*!/*/}
      {/*    <option value="all">All</option>*/}
      {/*    <option value="Road">Road</option>*/}
      {/*    <option value="Trail">Trail</option>*/}
      {/*    <option value="Track">Track</option>*/}

      {/*</select>*/}
    </div>
    // </div>
  );
}
