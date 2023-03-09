import { Item } from "@/scripts/types";
import Link from "next/link";

export default function Reviews({item} : {item: Item}) {

    return (
        <section className="bg-slate-400 w-full w-card rounded-lg text-white">
            <div className="m-5 flex items-center">
                <Link className="w-full no-underline " href="/items/{item.id}">
                    <div className="item">
                        <div className="flex-col  items-center my-0 mx-auto">
                            <h2 className="itemblockTitle">{item.name}</h2>
                            <img className={`my-16 w-full object-cover ${item.type}`}src={item.img} alt={item.name} height="300" width="300"/>
                        </div>
                        <span className="h-0 w-full border-y-2 border-dark border-solid box-content block m-2"/>

                        <div className="flex justify-evenly w-full">
                            <div>
                                <p><span className="font-bold text-xs">Price:</span></p>
                                <p className="m-0 text-xl ">${item.price}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Rating:</span></p>
                                <p className="m-0 text-xl "><span className="text-yellow-500">{item.rating}</span></p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}