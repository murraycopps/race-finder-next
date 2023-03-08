import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";

export default function Tools() {
  return (
    <PageWrapper page="Tools" className="flex flex-col items-center gap-4 font-sans text-white bg-gray-800">
      <div className="px-16 py-4 m-4 text-center bg-gray-700 rounded-lg">
        <h1 className="text-3xl">Tools</h1>
      </div>
      <Link
        href="/tools/pacing"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        pacing
      </Link>
      <Link
        href="/tools/vdot"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        vdot
      </Link>
      <Link
        href="/tools/unusual"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        unusual
      </Link>
    </PageWrapper>
  );
}
