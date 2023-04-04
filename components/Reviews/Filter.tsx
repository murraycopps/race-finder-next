import { shoes } from '@/scripts/shoes';
import {Shoe} from "@/scripts/types";
import {useEffect, useState} from "react";
import Dropdown from "@/components/Dropdown";

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
        <section className="flex justify-center content-center mx-auto p-4 bg-faded-purple-600">
        <div className="flex justify-center content-center w-full max-w-3xl">
            <label className="mr-4" htmlFor="surface">Filter by Surface</label>
           <Dropdown textColor="text-white" innerColor="bg-faded-purple-400" borderColor="border-faded-purple-400" outerColor="bg-faded-purple-400" hoverColor="hover:bg-faded-purple-500" items={items} setValue={(value)=> {
               setValue(value.toString());
           }} value={value}/>


            {/*/!*<select name="surface" id="surface" className="p-2 border-gray-500 border rounded-lg bg-faded-purple-600 text-white " onChange={filter}>*!/*/}
            {/*    <option value="all">All</option>*/}
            {/*    <option value="Road">Road</option>*/}
            {/*    <option value="Trail">Trail</option>*/}
            {/*    <option value="Track">Track</option>*/}

            {/*</select>*/}
        </div>
    </section>
    );
}