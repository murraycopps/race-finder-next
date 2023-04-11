import { Item } from "@/scripts/types";
import Link from "next/link";
import Stars from "../Reviews/Stars";

const ItemCard = ({ item, des }: { item: Item; des?: string }) => (
  <Link
    href={`/reviews/${item.type === "shoe" ? "shoes" : item.type}/${item.id}`}
  >
    <div className="flex flex-col items-center justify-center w-full h-full p-4 px-12 bg-wisteria-600 hover:bg-wisteria-700 card-slant">
      {des && <h3 className="mb-2 text-2xl font-bold">{des}</h3>}
      <h2 className="w-full overflow-hidden text-xl text-center truncate text-ellipsis">
        {item.name}
      </h2>
      <img
        className={`w-full object-contain grow home ${item.type}  ${
          item.name.toLowerCase().includes("zinal") && "-rotate-3"
        }`}
        src={item.croppedImg || item.img}
        alt={item.name}
        height="300"
        width="300"
      />
      <div className="w-full text-xl grid grid-cols-2 place-items-center">
        <p className="text-2xl">${item.price}</p>
        <p>
          <Stars number={item.rating} total={5} />
        </p>
      </div>
    </div>
  </Link>
);

export default ItemCard;
