import Image from "next/image";
import Stars from "@/components/Reviews/Stars";

type CardProps = {
    item: {
        name: string,
        img: string,
        link: string,
        brand: string,
        brandLink: string,
        brandLogo: string,
        price: number,
        rating: number

}
}
export default function PageCard({item}: CardProps) {
    return (
        <div className="flex flex-col gap-4 p-4 w-full font-medium text-white leading-6 ">
            <h1 className="flex justify-center w-full text-3xl slanted bg-wisteria-600 p-2">{item.name}</h1>
                <div className="flex flex-row w-full gap-12">

                        <Image
                            src={item.img}
                            alt={item.name}
                            width="400"
                            height="400"
                            className="w-3/4 aspect-video object-contain"
                        />

                        <div className="justify-center p-4 text-lg font-medium text-center text-white flex flex-col gap-6">

                            <div className="flex flex-col justify-evenly gap-8 pb-4 w-full text-4xl">
                                <h2 >${item.price}</h2>

                                <Stars number={item.rating} total={5} />
                            </div>





                            <div className="flex flex-col justify-center gap-2">
                                <h2 className="text-xl text-center">Purchase</h2>
                                <div className="flex flex-row justify-center gap-3">


                                    <a className="w-24 h-24 p-2 bg-white rounded-lg hover:opacity-50 grid place-items-center" href={item.link}>
                                        <img
                                            className="block overflow-hidden bg-transparent opacity-100 rounded-md transition-background"
                                         src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                                            alt="running warehouse"

                                        />
                                    </a>

                                    <a className="w-24 h-24 p-2 bg-white rounded-lg hover:opacity-50 grid place-items-center" href={item.brandLink}>
                                      <img
                                        className="block overflow-hidden bg-transparent opacity-100 rounded-md transition-background"
                                        src={item.brandLogo}
                                        alt={item.brand}

                                         />
                                     </a>
                                </div>
                            </div>
                        </div>
                </div>
                    </div>
    )



}