import Link from "next/link";

type Props = {
    href: string;
    name: string;
    description: string;
}

export default function ToolLink({ href, name, description }: Props) {
  return (
    <Link
      className="flex flex-col items-center justify-center w-full gap-8 p-8 bg-gray-700 rounded-lg shadow-lg h-36"
      href={href}
    >
      <h2 className="text-3xl">{name}</h2>
      <p className="text-xl">{description}</p>
    </Link>
  );
}
