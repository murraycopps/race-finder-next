import { Item } from "@/scripts/types";
import Link from "next/link";

export default function Reviews({item} : {item: Item}) {

    return (
        <section className="w-full text-white rounded-lg bg-slate-400 w-card">
            <div className="flex items-center m-5">
                <Link className="w-full no-underline " href={`/${item.type}/${item.id}`}>
                    <div className="item">
                        <div className="flex-col items-center mx-auto my-0">
                            <h2 className="itemblockTitle">{item.name}</h2>
                            <img className={`my-16 w-full object-cover ${item.type}`}src={item.img} alt={item.name} height="300" width="300"/>
                        </div>
                        <span className="box-content block w-full h-0 m-2 border-solid border-y-2 border-dark"/>

                        <div className="flex w-full justify-evenly">
                            <div>
                                <p><span className="text-xs font-bold">Price:</span></p>
                                <p className="m-0 text-xl ">${item.price}</p>
                            </div>

                            <div>
                                <p><span className="text-xs font-bold">Rating:</span></p>
                                <p className="m-0 text-xl "><span className="text-yellow-500">{item.rating}</span></p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}