import Image from "next/image";
import Link from "next/link";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function ShopLink({
  type,
  image,
}: {
  type: string;
  image: string;
}) {
  return (
    <Link href={`/shop/${type}`} className="relative w-full aspect-square reviews-routing-card">
      <Image
        src={image}
        alt={type}
        className="object-cover bg-green-200 rounded-3xl aspect-square w-full filter blur-[0.4rem] brightness-[0.65]"
        width={500}
        height={500}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-white">
        <h2 className="text-5xl">{capitalize(type)}</h2>
        <p className="text-2xl">Shop our selection of {type}</p>
      </div>
    </Link>
  );
}
