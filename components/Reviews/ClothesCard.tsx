import Link from "next/link";
import { Clothes } from "@/scripts/types";
import Stars from "@/components/Reviews/Stars";
export default function Reviews({clothes} : {clothes: Clothes}) {

    return (
        <section className="bg-slate-400 w-card rounded-lg text-white">
            <div className="m-5 flex items-center">
                <Link className="w-full no-underline " href={`/reviews/clothes/${clothes.id}`}>
                    <div>
                        <div className="flex-col  items-center my-0 mx-auto">
                            <h2 className="text-xl text-center truncate itemblockTitle text-ellipsis">{clothes.name}</h2>
                            <img className={` w-full object-cover ${clothes.type}`}src={clothes.img} alt={clothes.name} height="300" width="300"/>
                        </div>
                        <span className="h-0 w-full border-y-2 border-dark border-solid box-content block m-2"/>

                        <div className="flex justify-evenly w-full">
                            <div>
                                <p><span className="font-bold text-xs">Price:</span></p>
                                <p className="m-0 text-xl ">${clothes.price}</p>
                            </div>

                            {/*<div>*/}
                            {/*    <p><span className="font-bold text-xs">Color:</span></p>*/}
                            {/*    <p className="m-0 text-xl ">{clothes.color}</p>*/}
                            {/*</div>*/}

                            <div>
                                <p><span className="font-bold text-xs">Best Use:</span></p>
                                <p className="m-0 text-xl ">{clothes.use}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Rating:</span></p>
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