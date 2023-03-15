import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {clothes} from "@/scripts/clothes";
import {Clothes} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";


export default function ShoesPage() {
    const router = useRouter();
    const {pid} = router.query;
    const [article, setArticle] = useState(null as Clothes | null);
    useEffect(() => {
        if (pid) {
            const article = clothes.find((article) => article.id == pid);
            if (!article) {
                router.back();
                return;
            }
            setArticle(article);

        }
    }, [pid]);

    return (

        <PageWrapper page={article?.name || "articles"} className="flex flex-col justify-center min-h-screen mx-32 my-4 item-center">
            {article ? (
                <div className="grid w-4/5 h-full grid-cols-3 p-4 m-4 rounded-lg bg-slate-400 min-w-fit">
                    <div className="flex flex-col justify-center p-4 m-1 font-medium leading-6 text-white item-center align-center">
                        <h1 className="bg-slate-400 rounded-lg p-0.5 w-full">{article.name}</h1>
                        <img
                            src={article.img}
                            alt={article.name}
                            width="400"
                            height="400"
                        />

                        <div className="grid justify-center p-4 m-4 text-lg font-medium leading-6 text-center text-white rounded-lg bg-slate-400">
                            <h2 className="p-0 m-0 text-3xl text-center">Purchase</h2>
                            <div className="flex justify-center gap-2">
                                <a className="hover:opacity-50" href={article.link}>
                                    <img
                                        className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                                        src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                                        alt="running warehouse"
                                        width="100"
                                        height="100"
                                    />
                                </a>

                                <a className="hover:opacity-50" href={article.brandLink}>
                                    <img
                                        className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                                        src={article.brandLogo}
                                        alt={article.brand}
                                        width="100"
                                        height="100"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-full col-span-2 p-4">
                        <div className="grid flex-wrap justify-center grid-cols-5 gap-4 p-4 m-4 text-xl font-medium leading-6 text-center text-white border-4 border-solid rounded-lg flex-2 bg-slate-400 border-dark">
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Brand:</span></p>
                                <p className="text-lg font-bold">{article.brand}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Price:</span></p>
                                <p className="text-lg font-bold">${article.price}</p>
                            </div>
                            {/* <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Best Use:</span></p>
                                <p className="text-lg font-bold">{article.bestUse}</p>
                            </div> */}
                           
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium">Rating:</span></p>
                                <p className="text-lg font-bold">
                                    <span className="stars">{article.rating}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium"> Heel Stack Height:</span></p>
                                <p className="text-lg font-bold">{article.color}mm</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 justify-evenly">
                                <p><span className="text-lg font-medium"> Shoe Type:</span></p>
                                <p className="text-lg font-bold">{article.inseam}</p>
                            </div>
                        </div>
                        <div className="grid justify-center p-4 m-4 text-xl font-medium text-center text-white border-4 border-solid rounded-lg grow flex-3 temp-rows bg-slate-400 border-dark">
                            <h2 className="p-0 m-0 text-3xl text-center">Review</h2>
                            <p className="font-medium text-center size-lg">{article.review}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}