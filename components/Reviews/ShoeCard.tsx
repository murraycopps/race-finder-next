import { Shoe } from "@/scripts/types";
import Link from "next/link";
import Stars from "./Stars";


export default function Reviews({shoe} : {shoe: Shoe}) {

    return (
        <section className="text-white rounded-lg bg-slate-400 w-card">
            <div className="flex items-center m-5">
                <Link className="w-full no-underline" href={`/reviews/shoes/${shoe.id}`}>
                    <div className="shoe">
                        <div className="flex-col items-center mx-auto my-0">
                            <h2 className="text-xl text-center truncate itemblockTitle text-ellipsis">{shoe.name}</h2>
                            <img className={` w-full object-contain ${shoe.type}  ${shoe.name.toLowerCase().includes('zinal') && "-rotate-3"}`} src={shoe.img} alt={shoe.name} height="300" width="300"/>
                        </div>
                        {/*<span className="block w-full h-0 m-2 border-solid box-content border-y-2 border-base"/>*/}

                        <div className="flex flex-wrap w-full gap-4 justify-evenly">
                            <div>
                                <p className="text-xs font-bold">Price:</p>
                                <p className="m-0 text-xl ">${shoe.price}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold">Best Use:</p>
                                <p className="m-0 text-xl ">{shoe.use}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold">Surface:</p>
                                <p className="m-0 text-xl ">{shoe.surface}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold">Rating:</p>
                                <p className="m-0 text-xl ">
                                    <Stars number={shoe.rating} total={5}/>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}