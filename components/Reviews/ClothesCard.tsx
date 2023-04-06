import Link from "next/link";
import { Clothes } from "@/scripts/types";
import Stars from "@/components/Reviews/Stars";
export default function Reviews({clothes} : {clothes: Clothes}) {

    return (
        <section className="text-white rounded-lg bg-slate-400 w-card">
            <div className="flex items-center m-5">
                <Link className="w-full no-underline " href={`/reviews/clothes/${clothes.id}`}>
                    <div>
                        <div className="flex-col items-center mx-auto my-0">
                            <h2 className="text-xl text-center truncate itemblockTitle text-ellipsis">{clothes.name}</h2>
                            <img className={` w-full object-cover ${clothes.type}`}src={clothes.img} alt={clothes.name} height="300" width="300"/>
                        </div>
                        {/*<span className="block w-full h-0 m-2 border-solid box-content border-y-2 border-base"/>*/}

                        <div className="flex w-full justify-evenly">
                            <div>
                                <p className="text-xs font-bold">Price:</p>
                                <p className="m-0 text-xl ">${clothes.price}</p>
                            </div>

                            {/*<div>*/}
                            {/*    <p><span className="text-xs font-bold">Color:</span></p>*/}
                            {/*    <p className="m-0 text-xl ">{clothes.color}</p>*/}
                            {/*</div>*/}

                            <div>
                                <p className="text-xs font-bold">Best Use:</p>
                                <p className="m-0 text-xl ">{clothes.use}</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold">Rating:</p>
                                <p className="m-0 text-xl ">
                                    <Stars number={clothes.rating} total={5}/>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}