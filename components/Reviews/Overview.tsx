import Image from "next/image";
import Stars from "@/components/Reviews/Stars";

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
    <div className="flex flex-col w-full gap-4 p-4 font-medium leading-6 text-white ">
      <h1 className="flex justify-center w-full p-4 text-3xl text-white slanted bg-wisteria-600">
        {item.name}
      </h1>
      <div className="flex flex-row w-full gap-12 justify-evenly">
        <Image
          src={item.img}
          alt={item.name}
          width="400"
          height="400"
          className="object-contain w-2/3 aspect-video"
          priority
        />

        <div className="flex flex-col justify-center gap-6 p-4 text-lg font-medium text-center text-white">
          <div className="flex flex-col w-full gap-8 pb-4 text-4xl justify-evenly">
            <h2>${item.price}</h2>

            <Stars number={item.rating} total={5} />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-xl text-center">Purchase</h2>
            <div className="flex flex-row justify-center gap-3">
              <a
                className="grid w-24 h-24 p-2 bg-white rounded-lg hover:opacity-50 place-items-center"
                href={item.link}
              >
                <img
                  className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                  src="https://media.licdn.com/dms/image/C4E0BAQHBmWI9w3tzog/company-logo_200_200/0/1544572615288?e=2147483647&v=beta&t=HhwAog-YBLZyc1ULuVv48MZefPUw3EHejmW25OtMwUQ"
                  alt="running warehouse"
                />
              </a>

              <a
                className="grid w-24 h-24 p-2 bg-white rounded-lg hover:opacity-50 place-items-center"
                href={item.brandLink}
              >
                <img
                  className="block overflow-hidden bg-transparent rounded-md opacity-100 transition-background"
                  src={item.brandLogo}
                  alt={item.brand}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
