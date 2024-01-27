import React from 'react';
import Image from "next/image";

function AboutDevice() {
    return (
        <div className='text-dark200_light800'>
            <h1 className='h3-bold font-spaceGrotesk my-8'>About the  IPAD MINI 5</h1>
            <div className='flex flex-wrap justify-center gap-7 '>
                <div className='flex flex-col  items-center  space-y-3'>
                    <Image src='/assets/ram_icon.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>4 GB RAM</h4>
                </div>
                <div className='flex flex-col  items-center space-y-3'>
                    <Image src='/assets/explorer_icon.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>64 GB ROM</h4>
                </div>
                <div className='flex flex-col  items-center space-y-3'>
                    <Image src='/assets/chip_icon.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>Snapdragon 865+</h4>
                </div>
                <div className='flex flex-col  items-center space-y-3'>
                    <Image src='/assets/mobile.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>1080 x 1920 pixels</h4>
                </div>
            </div>
        </div>
    );
}

export default AboutDevice;