import { Shoe } from "@/scripts/types";

export default function Reviews({shoe} : {shoe: Shoe}) {

    return (
        <section className="bg-slate-400 w-500px rounded-lg text-white">
            <div className="m-5 flex items-center">
                <a className="w-full no-underline " href="/shoes/{shoe.id}">
                    <div className="shoe">
                        <div className="flex column items-center my-0 mx-auto">
                            <h2 className="shoeblockTitle">{shoe.name}</h2>
                            <img className="w-64 h-64 my-16 w-full object-cover "src={shoe.img} alt={shoe.name} height="300" width="300"/>
                        </div>
                        <span className="h-0 w-full border-y-4 border-blueBlack border-solid box-content block pb-4"/>

                        <div className="flex justify-evenly w-full">
                            <div>
                                <p><span className="font-bold text-xs">Price:</span></p>
                                <p className="m-0 text-xl ">${shoe.price}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Best Use:</span></p>
                                <p className="m-0 text-xl ">{shoe.bestUse}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Surface:</span></p>
                                <p className="m-0 text-xl ">{shoe.surface}</p>
                            </div>

                            <div>
                                <p><span className="font-bold text-xs">Rating:</span></p>
                                <p className="m-0 text-xl "><span className="text-yellow-500">{shoe.rating}</span></p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    )
}