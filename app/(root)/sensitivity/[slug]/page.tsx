import React from 'react';
import Image from "next/image";
import {CheckCircledIcon, CrossCircledIcon} from "@radix-ui/react-icons";
import CameraSensitivity from "@/components/Sensitivity/SliderComponents/CameraSensitivity";
import ADSSensitivity from "@/components/Sensitivity/SliderComponents/ADSSensitivity";
import GyroSensitvity from "@/components/Sensitivity/SliderComponents/GyroSensitvity";
import CameraFreeLook from "@/components/Sensitivity/SliderComponents/CameraFreeLook";
import AboutDevice from "@/components/Sensitivity/AboutDevice";
import CreateComment from "@/components/comments/CreateComment";
import ReadComments from "@/components/comments/ReadComments";
import {getSingleDevice} from "@/lib/actions/GetSensitivities.action";

async function Page({params}: { params: { slug: string } }) {
    const {device} = await getSingleDevice(params.slug);
    return (
        <section className='flex flex-col max-w-5xl h-full mx-auto xl:mt-10 md:mt-8  pb-10'>
            <div className='bg-gray-500 rounded-xl h-[400px] max-md:h-[250px] w-full'>
                <Image src={device?.thumbnail_url} alt='article-img' height={400} width={1200}
                       className='rounded-xl h-[400px] max-md:h-[250px] w-full object-center'/>
            </div>
            <h1 className='text-dark100_light900 h1-bold mt-6 font-spaceGrotesk'>Sensitivity of Vivo v21 64GB 4
                GBRAM</h1>
            <div className='flex flex-col gap-1 mt-4 dark:text-light-500'>
                <div className='flex gap-3 items-center '>
                    {
                        device.intro ? <CheckCircledIcon className='text-[#adfa1d]'/> :
                            <CrossCircledIcon className='text-red-500'/>
                    }
                    <p className='font-spaceGrotesk text-[12px]  '>Intro</p>
                </div>
                <div className='flex gap-3 items-center '>
                    {
                        device.gyroscope ? <CheckCircledIcon className='text-[#adfa1d]'/> :
                            <CrossCircledIcon className='text-red-500'/>
                    }
                    <p className='font-spaceGrotesk text-[12px]  '>GyroScope</p>
                </div>
                <div className='flex gap-3 items-center'>
                    {
                        device.camera ? <CheckCircledIcon className='text-[#adfa1d]'/> :
                            <CrossCircledIcon className='text-red-500'/>
                    }
                    <p className='font-spaceGrotesk text-[12px]'>Camera</p>
                </div>


                <div className='flex gap-3 items-center'>
                    {
                        device.ads ? <CheckCircledIcon className='text-[#adfa1d]'/> :
                            <CrossCircledIcon className='text-red-500'/>
                    }
                    <p className='font-spaceGrotesk text-[12px]'>ADS</p>
                </div>
                <div className='flex gap-3 items-center'>
                    {
                        device.claws ? <CheckCircledIcon className='text-[#adfa1d]'/> :
                            <CrossCircledIcon className='text-red-500'/>
                    }
                    <p className='font-spaceGrotesk text-[12px]'>Claws</p>
                </div>

            </div>
            <AboutDevice device={device}/>
            <h3 className='text-dark100_light900 font-spaceGrotesk h3-bold mt-3'>
                Intro
            </h3>
            <p className='body-medium text-dark100_light900 mt-2 leading-5'>
                {device.intro_text}
            </p>
            <h3 className='text-dark100_light900 font-spaceGrotesk h3-bold mt-3'>
                Sensitivity
            </h3>
            <CameraSensitivity sensitivity={device.sensitivities[0]}/>
            <ADSSensitivity sensitivity={device.sensitivities[0]}/>
            <CameraFreeLook sensitivity={device.sensitivities[0]}/>
            <GyroSensitvity sensitivity={device.sensitivities[0]}/>
            <div className='markdown font-inter' dangerouslySetInnerHTML={{__html: device?.explanation || ''}}></div>
            {/*    CREATE A COMMENT   */}
            <CreateComment/>
            <ReadComments/>
        </section>
    );
}

export default Page;



