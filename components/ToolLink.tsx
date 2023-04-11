import Link from "next/link";

type Props = {
    href: string;
    name: string;
    description: string;
}

export default function ToolLink({ href, name, description}: Props) {
  return (
    <Link
      className="grid w-full grid-cols-2 gap-8 p-4 text-center rounded-2xl place-items-center justify-evenly bg-wisteria-600 hover:bg-wisteria-700"
      href={href}
    >
      <h2 className="text-2xl">{name}</h2>
      <p className="w-full text-lg truncate">{description}</p>
    </Link>
  );
}
