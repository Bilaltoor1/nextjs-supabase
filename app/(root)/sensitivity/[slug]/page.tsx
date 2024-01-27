import React from 'react';
import Image from "next/image";
import {CheckCircledIcon, CrossCircledIcon} from "@radix-ui/react-icons";
import CameraSensitivity from "@/components/Sensitivity/SliderComponents/CameraSensitivity";
import ADSSensitivity from "@/components/Sensitivity/SliderComponents/ADSSensitivity";
import GyroSensitvity from "@/components/Sensitivity/SliderComponents/GyroSensitvity";
import CameraFreeLook from "@/components/Sensitivity/SliderComponents/CameraFreeLook";
import AboutDevice from "@/components/Sensitivity/AboutDevice";

function Page() {
    const pubgSensitivitySettings = [
        {
            scope: '1st Person',
            sensitivity: {
                camera: 120,
                ads: 70,
                gyroscope: 10,
            },
        },
        {
            scope: 'Red Dot',
            sensitivity: {
                camera: 100,
                ads: 60,
                gyroscope: 8,
            },
        },
        {
            scope: '2x Scope',
            sensitivity: {
                camera: 90,
                ads: 50,
                gyroscope: 7,
            },
        },
        {
            scope: '3x Scope',
            sensitivity: {
                camera: 80,
                ads: 45,
                gyroscope: 6,
            },
        },
        {
            scope: '4x Scope',
            sensitivity: {
                camera: 75,
                ads: 40,
                gyroscope: 5,
            },
        },
        {
            scope: '6x Scope',
            sensitivity: {
                camera: 70,
                ads: 35,
                gyroscope: 4,
            },
        },
        {
            scope: '8x Scope',
            sensitivity: {
                camera: 65,
                ads: 30,
                gyroscope: 3,
            },
        },
        {
            scope: 'Shotgun',
            sensitivity: {
                camera: 110,
                ads: 65,
                gyroscope: 9,
            },
        },
        {
            scope: 'SMG',
            sensitivity: {
                camera: 105,
                ads: 62,
                gyroscope: 9,
            },
        },
        {
            scope: 'Assault Rifle',
            sensitivity: {
                camera: 95,
                ads: 55,
                gyroscope: 7,
            },
        },
        {
            scope: 'Sniper Rifle',
            sensitivity: {
                camera: 85,
                ads: 48,
                gyroscope: 6,
            },
        },
        {
            scope: 'Pistol',
            sensitivity: {
                camera: 110,
                ads: 65,
                gyroscope: 8,
            },
        },
        // Add more objects for other scopes or situations as needed
    ];

    return (
        <section className='flex flex-col max-w-5xl h-full mx-auto xl:mt-10 md:mt-8 mt-4 pb-10'>
            <div>
                <Image src='/assets/pxfuel (1).jpg' alt='article-img' height={400} width={1200}
                       className='rounded-xl h-[400px] max-md:h-[250px] w-full object-center'/>
            </div>
            <h1 className='text-dark100_light900 h1-bold mt-6 font-spaceGrotesk'>Sensitivity of Vivo v21 64GB 4
                GBRAM</h1>
            <div className='flex flex-col gap-1 mt-4 dark:text-light-500'>
                <div className='flex gap-3 items-center '>
                    <CheckCircledIcon className='text-[#adfa1d]'/>
                    <p className='font-spaceGrotesk text-[12px]  '>Intro</p>
                </div>
                <div className='flex gap-3 items-center '>
                    <CheckCircledIcon className='text-[#adfa1d]'/>
                    <p className='font-spaceGrotesk text-[12px]  '>GyroScope</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <CheckCircledIcon className='text-green-500'/>
                    <p className='font-spaceGrotesk text-[12px]'>Camera</p>
                </div>


                <div className='flex gap-3 items-center'>
                    <CheckCircledIcon className='text-green-500'/>
                    <p className='font-spaceGrotesk text-[12px]'>ADS</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <CrossCircledIcon className='text-red-500'/>
                    <p className='font-spaceGrotesk text-[12px]'>Claws</p>
                </div>

            </div>
            <AboutDevice/>
            <h3 className='text-dark100_light900 font-spaceGrotesk h3-bold mt-3'>
                Intro
            </h3>
            <p className='body-medium text-dark100_light900 mt-2 leading-5'>
                Welcome to the adrenaline-fueled battlegrounds of PUBG, where every move can mean the difference between
                victory and defeat. In the pursuit of dominance, one often-overlooked aspect that can significantly
                impact your gameplay is sensitivity settings. Whether you're a seasoned veteran or a newcomer to the
                intense world of PUBG, understanding and fine-tuning your sensitivity can elevate your skills to new
                heights.
            </p>
            <h3 className='text-dark100_light900 font-spaceGrotesk h3-bold mt-3'>
                Sensitivity
            </h3>
            <CameraSensitivity sensitivity={pubgSensitivitySettings}/>
            <ADSSensitivity sensitivity={pubgSensitivitySettings}/>
            <CameraFreeLook sensitivity={pubgSensitivitySettings}/>
            <GyroSensitvity sensitivity={pubgSensitivitySettings}/>

        </section>
    );
}

export default Page;



