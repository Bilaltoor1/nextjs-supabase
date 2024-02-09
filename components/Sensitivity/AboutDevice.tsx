import React from 'react';
import Image from "next/image";

function AboutDevice({device} : any) {
    return (
        <div className='text-dark200_light800'>
            <h1 className='h3-bold font-spaceGrotesk my-8'>About the  {device.device_name}</h1>
            <div className='flex flex-wrap justify-center gap-7 '>
                <div className='flex flex-col  items-center  space-y-3'>
                    <Image src='/assets/ram_icon.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>{device.ram}</h4>
                </div>
                <div className='flex flex-col  items-center space-y-3'>
                    <Image src='/assets/explorer_icon.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>{device.rom}</h4>
                </div>
                <div className='flex flex-col  items-center space-y-3'>
                    <Image src='/assets/chip_icon.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>{device.proccessor}</h4>
                </div>
                <div className='flex flex-col  items-center space-y-3'>
                    <Image src='/assets/mobile.png' width='50' height='50' alt='chip-icon'/>
                    <h4 className='font-bold max-md:text-[13px]'>{device.screen_resolution}</h4>
                </div>
            </div>
        </div>
    );
}

export default AboutDevice;