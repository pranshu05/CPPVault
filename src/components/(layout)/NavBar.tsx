import { useState } from "react";
import Link from "next/link";

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto bg-transparent">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl pt-4 transition-all duration-300">
                <Link href="/" className="flex gap-2 items-center rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CPPVault</span>
                </Link>
                <div className="flex flex-col rtl:space-x-reverse">
                    <button className="text-white focus:outline-none lg:hidden" onClick={toggleMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    <div className={`${isMenuOpen ? "flex absolute right-5 top-16 py-3 z-50 border border-gray-500 rounded-md bg-black bg-opacity-50 backdrop backdrop-blur-sm min-w-[200px] items-center text-white" : "hidden"} flex-col lg:flex lg:flex-row lg:items-center lg:w-auto lg:space-x-6 rtl:space-x-reverse`}>
                        <Link href="/docs" onClick={() => setIsMenuOpen(false)} className="text-sm text-white w-full h-full hover:bg-[#0002] font-bold hover:text-gray-50 transition-all max-lg:px-5 max-lg:py-2 lg:mt-0">Docs</Link>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default NavBar;