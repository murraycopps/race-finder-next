import Link from "next/link";

type Props = {
    href: string;
    name: string;
    description: string;
}

export default function ToolLink({ href, name, description}: Props) {
  return (
    <Link
      className="flex flex-col items-center justify-start w-full h-48 p-4 text-center rounded-lg shadow-lg gap-8 bg-faded-base-500 hover:bg-faded-base-600 tool-link-width"
      href={href}
    >
      <h2 className="text-3xl">{name}</h2>
      <p className="text-xl">{description}</p>
    </Link>
  );
}
