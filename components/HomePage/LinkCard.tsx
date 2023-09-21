import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

type CardProps = {
  title: string;
  description: string;
  link: string;
  img: string;
};

const LinkCard = ({ title, description, link, img }: CardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      ref.current.style.height = `calc(${width}px - 3rem)`;
    }
  }, [ref]);
  return (
  <Link
    href={link}
    className="relative flex flex-col gap-8 p-8 overflow-hidden justify-evenly bg-lavender-600 card-slant"
    ref={ref}
  >
    <Image
      src={img}
      alt=""
      width="1000"
      height="1000"
      className="absolute inset-0 object-cover w-full h-full py-8 px-14"
      priority
    />
    <div className="absolute inset-0 w-full h-full bg-gray-600 opacity-75 hover:opacity-60" />
    <h1 className="z-50 text-6xl font-semibold pointer-events-none">{title}</h1>
    <p className="z-50 text-2xl pointer-events-none">{description}</p>
  </Link>
)};

export default LinkCard;
