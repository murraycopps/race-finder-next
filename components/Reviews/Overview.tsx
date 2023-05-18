import Image from "next/image";
import Stars from "@/components/Reviews/Stars";
import Link from "next/link";

type CardProps = {
  item: {
    name: string;
    img: string;
    link: string;
    brand: string;
    brandLink: string;
    brandLogo: string;
    price: number;
    rating: number;
  };
};
export default function Overview({ item }: CardProps) {
  return (
    <div className="flex flex-col w-full gap-8 sm:gap-12 text-white">
      <h1 className="flex justify-center w-full p-4 sm:text-5xl text-3xl text-white slanted bg-wisteria-600">
        {item.name}
      </h1>
      {/*<h1 className="text-5xl text-slate-400 text-center">*/}
      {/*  {item.name}*/}
      {/*</h1>*/}
      <div className="flex sm:flex-row w-full gap-12 justify-evenly flex-col">
        <Image
          src={item.img}
          alt={item.name}
          width="1000"
          height="1000"
          className="object-contain w-full sm:w-2/3 aspect-video"
          priority
        />

        <div className="flex flex-col justify-center gap-6 p-4 text-lg font-medium text-center text-white">
          <div className="flex flex-col w-full gap-8 pb-4 text-3xl sm:text-4xl justify-evenly">
            <h2>${item.price}</h2>
            <Stars number={item.rating} total={5} />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-xl text-center">Purchase</h2>
            <div className="flex flex-row justify-center gap-3">
              <Link
                className="grid sm:w-24 w-20 aspect-square p-2 bg-white rounded-lg hover:brightness-75 place-items-center"
                href={item.link}
              >
                <Image
                  className="block overflow-hidden bg-transparent rounded-md transition-background"
                  src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                  alt="running warehouse"
                    width="100"
                    height="100"
                />
              </Link>

              <Link
                className="grid sm:w-24 w-20 aspect-square p-2 bg-white rounded-lg hover:brightness-75 place-items-center"
                href={item.brandLink}
              >
                <img
                  className="block overflow-hidden bg-transparent rounded-md transition-background"
                  src={item.brandLogo}
                  alt={item.brand}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
