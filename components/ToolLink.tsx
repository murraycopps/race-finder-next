import Link from "next/link";

type Props = {
    href: string;
    name: string;
    description: string;
}

export default function ToolLink({ href, name, description}: Props) {
  return (
    <Link
      className="grid w-full gap-2 px-2 py-4 text-center tool-link sm:gap-8 sm:p-4 rounded-2xl place-items-center justify-evenly bg-wisteria-600 hover:bg-wisteria-700"
      href={href}
    >
      <h2 className="text-2xl">{name}</h2>
      <p className="w-full text-lg truncate">{description}</p>
    </Link>
  );
}
