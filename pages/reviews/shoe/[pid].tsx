import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {shoes} from "@/scripts/shoes";
import {Shoe} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";


export default function ShoesPage() {
    const router = useRouter();
    const {pid} = router.query;
    const [shoe, setShoe] = useState(null as Shoe | null);
    useEffect(() => {
        if (pid) {
            const shoe = shoes.find((shoe) => shoe.id == pid);
            if (!shoe) {
                router.back();
                return;
            }
            setShoe(shoe);

        }
    }, [pid]);

    return (

        <PageWrapper page={shoe?.name || "Shoe"} className="flex flex-col justify-center item-center min-h-screen mx-32 my-4">
            {shoe ? (
                <div className="shoe-info-card">
                    <div className="shoe-display">
                        <h1 className="name">{shoe.name}</h1>
                        <img
                            src={shoe.img}
                            alt={shoe.name}
                            width="400"
                            height="400"
                        />

                        <div className="shoe-buy">
                            <h2 className="text-center m-0 p-0 text-3xl">Purchase</h2>
                            <div className="purchase-link">
                                <a className="hover" href={shoe.link}>
                                    <img
                                        className="img-hov"
                                        src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                                        alt="running warehouse"
                                        width="100"
                                        height="100"
                                    />
                                </a>

                                <a className="hover" href={shoe.brandLink}>
                                    <img
                                        className="img-hov"
                                        src={shoe.brandLogo}
                                        alt={shoe.brand}
                                        width="100"
                                        height="100"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="shoe-info">
                        <div className="shoe-specs">
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg">Brand:</span></p>
                                <p className="font-bold text-lg">{shoe.brand}</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg">Price:</span></p>
                                <p className="font-bold text-lg">${shoe.price}</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg">Best Use:</span></p>
                                <p className="font-bold text-lg">{shoe.bestUse}</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg">Surface:</span></p>
                                <p className="font-bold text-lg">{shoe.surface}</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg">Rating:</span></p>
                                <p className="font-bold text-lg">
                                    <span className="stars">{shoe.rating}</span>
                                </p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg">Drop:</span></p>
                                <p className="font-bold text-lg">{shoe.drop}mm</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg">Weight:</span></p>
                                <p className="font-bold text-lg">{shoe.weight}g</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg"> Heel Stack Height:</span></p>
                                <p className="font-bold text-lg">{shoe.heelStackHeight}mm</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg"> Forefoot Stack Height:</span></p>
                                <p className="font-bold text-lg">{shoe.forefootStackHeight}mm</p>
                            </div>
                            <div className="flex flex-col justify-evenly items-center gap-2">
                                <p><span className="font-medium text-lg"> Shoe Type:</span></p>
                                <p className="font-bold text-lg">{shoe.arch}</p>
                            </div>
                        </div>
                        <div className="shoe-rewiew">
                            <h2 className="text-center m-0 p-0 text-3xl">Review</h2>
                            <p className="size-lg font-medium text-center">{shoe.review}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}