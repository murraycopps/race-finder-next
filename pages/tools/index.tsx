import Link from "next/link";
export default function Tools({ url }: { url: string }) {
    return (
        <div className="flex flex-col items-center gap-4 font-sans text-white bg-gray-800">
            <div className="px-16 py-4 m-4 text-center bg-gray-700 rounded-lg">
                <h1 className="text-3xl">Tools</h1>
            </div>
            <Link href="/tools/stopwatch" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Stopwatch
            </Link>
            <Link href="/tools/timer" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Timer
            </Link>
            <Link href="/tools/counter" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Counter
            </Link>
        </div>
    );
}