import React from 'react';
import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";
import {Toaster} from "@/components/ui/toaster"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        default: "Game-Store",
        template: "%s - Game Store",
    },
    description: "Game store is excellent website for mod games lovers and who wants to play with unlimited resources. we are also providing the paid games in free and also provide the Sensitivity for all the mobile device to boost your pubg mobile game experience so that you can play like a pro player.",
    twitter: {
        card: "summary_large_image",
    },
};

function Layout({children}: { children: React.ReactNode }) {
    return (
        <main className="background-light850_dark100 relative">
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
                    <div className="mx-auto w-full">{children}</div>
                    <Toaster/>
                </section>
            </div>
        </main>
    );
}

export default Layout;