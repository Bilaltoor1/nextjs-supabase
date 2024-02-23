"use client";
import React from "react";
import {Boxes} from "../ui/background-box";
import {cn} from "@/lib/utils";

export default function HeroSection() {
    return (
        <div
            className="sm:h-96 h-80 relative w-full overflow-hidden dark-gradient flex flex-col items-center justify-center rounded-lg">
            <div
                className="absolute inset-0 w-full h-full dark-gradient z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"/>

            <Boxes/>
            <h1 className={cn("md:text-5xl text-2xl text-white text-center font-bold relative z-20 font-spaceGrotesk")}>
                Game Store is Best Sensitivity Provider
            </h1>
            <p className="text-center md:text-xl text-sm font-inter mt-2 text-neutral-300 relative z-20 max-w-[500px]">
                which provides the best sensitivity for all the mobile devices to boost your pubg mobile game experience
                so that you can play like a pro player.
            </p>
        </div>
    );
}
