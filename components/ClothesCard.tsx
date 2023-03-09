import Link from "next/link";
import { Clothes } from "@/scripts/types";
export default function Reviews({clothes} : {clothes: Clothes}) {

    return (
        <section className="bg-slate-400 w-128 rounded-lg text-white">
            <div className="m-5 flex items-center">
                <Link className="w-full no-underline " href="/clothes/{clothes.id}">
                    <div>
                        <div className="flex-col  items-center my-0 mx-auto">
                            <h2 className="shoeblockTitle">{clothes.name}</h2>
                            <img className="w-64 h-64 my-16 w-full object-cover "src={clothes.img} alt={clothes.name} height="300" width="300"/>
                        </div>
                        <span className="h-0 w-full border-y-2 border-dark border-solid box-content block m-2"/>

                        <div className="flex justify-evenly w-full">
                            <div>
                                <p><span className="font-bold text-xs">Price:</span></p>
                                <p className="m-0 text-xl ">${clothes.price}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Best Use:</span></p>
                                <p className="m-0 text-xl ">{clothes.color}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Surface:</span></p>
                                <p className="m-0 text-xl ">{clothes.use}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Rating:</span></p>
                                <p className="m-0 text-xl "><span className="text-yellow-500">{clothes.rating}</span></p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}