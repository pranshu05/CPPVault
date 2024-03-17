import Link from "next/link";

export default function Home() {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto flex flex-col items-center justify-between py-20 h-full">
            <h1 className="text-5xl font-bold text-center">DataStructures</h1>
            <p className="text-center text-lg font-bold mt-2 mb-4 text-transparent bg-clip-text bg-gradient-to-l from-rose-400 via-fuchsia-500 to-indigo-500">A collection of DataStructures using CPP</p>
            <div className="group relative mt-10 w-full">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
                <div className="relative rounded-lg bg-black px-7 py-4 text-white">
                    <Link href="/docs" className="w-full flex flex-col">
                        <h2 className="mb-3 text-2xl font-semibold">
                            Docs{" "}<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                        </h2>
                        <p className="m-0 text-sm opacity-50">Find in-depth information about DataStructures using CPP.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}