import { shoes } from '@/scripts/shoes';
import {Shoe} from "@/scripts/types";
import {useEffect, useState} from "react";
import Dropdown from "@/components/Dropdown";
import FilterDropdown from './FilterDropdown';

export default function Filter ({setFilteredShoes} : {setFilteredShoes: (shoes: Shoe[]) => void }) {
const [value, setValue] = useState('All');
const items = ['All', 'Road', 'Trail', 'Track'];


    // const filter = (e: any ) => {
    //     const filter = e.target.value;
    //     if(filter == 'all') {
    //         setFilteredShoes(shoes)
    //         return
    //     }
    //     const filteredShoes = shoes.filter((shoe: Shoe) => {
    //         return shoe.surface.includes(filter);
    //     });
    //     setFilteredShoes(filteredShoes);
    // };
    useEffect(() => {
        if(value == 'All') {
            setFilteredShoes(shoes)
            return
        }
        const filteredShoes = shoes.filter((shoe: Shoe) => {
            return shoe.surface.includes(value);
        });
        setFilteredShoes(filteredShoes);

    }, [value])


    return (
        <div className="flex content-center justify-center p-4 mx-auto ">
        <div className="flex content-center justify-center w-full max-w-3xl">
            <label className="mr-4 text-xl" htmlFor="surface">Filter by Surface</label>
           <FilterDropdown items={items} setValue={(value)=> {
               setValue(value.toString());
           }} value={value}/>


            {/*/!*<select name="surface" id="surface" className="p-2 text-white border border-gray-500 rounded-lg bg-faded-purple-600 " onChange={filter}>*!/*/}
            {/*    <option value="all">All</option>*/}
            {/*    <option value="Road">Road</option>*/}
            {/*    <option value="Trail">Trail</option>*/}
            {/*    <option value="Track">Track</option>*/}

            {/*</select>*/}
        </div>
    </div>
    );
}