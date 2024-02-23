'use client'
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import MobileNav from "./MobileNav";
import GlobalSearch from "@/components/Navbar/GlobalSearch";
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import ProfileWidge from "@/app/(admin)/components/dashboardNavbar/ProfileWidge";
import DarkModeButton from "@/components/DarkMode/DarkModeButton";

const Navbar = () => {

    const [user, setUser] = useState(null);
    const supabaseClient = createSupabaseBrowserClient()
    const getUser = async () => {
        const {data, error} = await supabaseClient.auth.getUser()
        // @ts-ignore
        setUser(data.user)

    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <nav
            className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/assets/images/logo-dark.svg"
                    width={140}
                    height={80}
                    alt="DevFlow"
                    className='hidden dark:flex'
                />
                <Image
                    src="/assets/images/logo-light.svg"
                    width={140}
                    height={80}
                    alt="DevFlow"
                    className='flex dark:hidden'
                />
            </Link>
            <GlobalSearch/>
            <div className="flex-between gap-5">
                <DarkModeButton/>
                {
                    user?.user_metadata.role === "admin" && <ProfileWidge/>
                }
                <MobileNav/>
            </div>
        </nav>
    );
};

export default Navbar;
