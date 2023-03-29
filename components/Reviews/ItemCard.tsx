import { Item } from "@/scripts/types";
import Link from "next/link";
import Stars from "./Stars";
import Image from "next/image";

const ItemCard = ({ item }: { item: Item;}) => (
    <Link
      href={`/reviews/${item.type === "shoe" ? "shoes" : item.type}/${item.id}`}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-wisteria-600 hover:bg-faded-lavender-600 rounded-3xl">
        <h2 className="w-full overflow-hidden text-xl text-center truncate text-ellipsis">
          {item.name}
        </h2>
        <Image
          className={`w-full object-cover grow home ${item.type}  ${
            item.name.toLowerCase().includes("zinal") && "-rotate-3"
          }`}
          src={item.img}
          alt={item.name}
          height="300"
          width="300"
        />
        <div className="grid w-full grid-cols-2 text-xl place-items-center">
          <p className="text-2xl">${item.price}</p>
          <p>
            <Stars number={item.rating} total={5} />
          </p>
        </div>
      </div>
    </Link>
  );

  export default ItemCard;