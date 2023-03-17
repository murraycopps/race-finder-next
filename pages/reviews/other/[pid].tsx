import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {other} from "@/scripts/other";
import {Other} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Stars from "@/components/Reviews/Stars";


export default function ShoesPage() {
    const router = useRouter();
    const {pid} = router.query;
    const [item, setItem] = useState(null as Other | null);
    useEffect(() => {
        if (pid) {
            const item = other.find((other) => other.id == pid);
            if (!item) {
                router.back();
                return;
            }
            setItem(item);

        }
    }, [pid]);

    return (

        <PageWrapper page={item?.name || "other"} className="flex flex-col justify-center min-h-screen mx-32 my-4 item-center">
            {item ? (
                <div className="grid w-4/5 h-full grid-cols-3 p-4 m-4 rounded-lg bg-slate-400 min-w-fit">
                    <div className="flex flex-col justify-center p-4 m-1 font-medium leading-6 text-white item-center align-center">
                        <h1 className="bg-slate-400 rounded-lg p-0.5 w-full text-3xl">{item.name}</h1>
                        <img
                            src={item.img}
                            alt={item.name}
                            width="400"
                            height="400"
                            className="p-8"
                        />

                        <div className="grid justify-center p-4 m-4 text-lg font-medium leading-6 text-center text-white rounded-lg bg-slate-400">
                            <h2 className="p-0 m-0 text-2xl text-center">Purchase</h2>
                            <div className="flex justify-center gap-2">
                                <a className="hover:opacity-50 w-24 h-24 bg-white grid place-items-center rounded-lg p-2" href={item.link}>
                                    <img
                                        className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                                        src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                                        alt="running warehouse"

                                    />
                                </a>

                                <a className="hover:opacity-50 w-24 h-24 bg-white grid place-items-center rounded-lg p-2" href={item.brandLink}>
                                    <img
                                        className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                                        src={item.brandLogo}
                                        alt={item.brand}

                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-full col-span-2 p-4">
                        <div className="flex flex-wrap justify-evenly grid-cols-5 gap-6 p-4 m-4 text-xl font-medium leading-6 text-center text-white border-4 border-solid rounded-lg flex-2 bg-slate-400 border-dark">
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Brand:</span></p>
                                <p className="text-lg font-bold">{item.brand}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Price:</span></p>
                                <p className="text-lg font-bold">${item.price}</p>
                            </div>
                            {/* <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Best Use:</span></p>
                                <p className="text-lg font-bold">{item.bestUse}</p>
                            </div> */}

                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Rating:</span></p>
                                <p className="m-0 text-xl ">
                                    <Stars number={item.rating} total={5}/>
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium"> Color:</span></p>
                                <p className="text-lg font-bold">{item.color}</p>
                            </div>
                            {/* div with dispkayt fkex to display optional features */}
                            {item?.features && item.features.length > 0 && item.features.map((feature, i) => (
                                        <div className="flex flex-col items-center gap-2 justify-evenly" key={i}>
                                            <p className="text-lg font-medium">{feature.name}:</p>
                                            <p className="text-lg font-bold">{feature.value}</p>
                                        </div>
                                    )

                            )}

                        </div>

                        <div className="grid justify-center p-4 m-4 text-xl font-medium text-center text-white border-4 border-solid rounded-lg grow flex-3 temp-rows bg-slate-400 border-dark">
                            <h3 className="p-0 m-0 text-2xl text-center">Review</h3>
                            <p className="font-medium text-center size-lg">{item.review}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}