'use client'
import React from 'react';
import useDarkMode from "./DarkLightController";
import Image from "next/image";

function ColorMode() {
    const [colorTheme, setTheme] = useDarkMode();
    return (
        <div>
            {colorTheme === "light" ? (
                // @ts-ignore
                <div onClick={() => setTheme("light")}>
                    <Image src='/assets/icons/sun.svg' alt='sun' width={18} height={18} className='cursor-pointer' />
                </div>
            ) : (
                // @ts-ignore
                <div onClick={() => setTheme("dark")}>
                    <Image src='/assets/icons/moon.svg' alt='moon' width={18} height={18} className='cursor-pointer' />
                </div>
            )
            }
        </div>
    )
        ;
}

export default ColorMode;