import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import DarkModeButton from "@/components/DarkMode/DarkModeButton";
import GlobalSearch from "@/components/Navbar/GlobalSearch";

const Navbar = () => {
    return (
        <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/assets/images/site-logo.svg"
                    width={23}
                    height={23}
                    alt="DevFlow"
                />
                <p className="h2-bold font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">
                    Gam<span className="text-primary-500">ify</span>
                </p>
            </Link>
             <GlobalSearch/>
            <div className="flex-between gap-5">
                 <DarkModeButton/>
                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;
