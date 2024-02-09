import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {CheckCircledIcon, CrossCircledIcon} from '@radix-ui/react-icons'
import Link from "next/link";

function SensitivityCard({sensitivity_device} : any) {

    return (
        <div className='flex flex-wrap gap-10 mt-10 max-md:justify-center max-md:items-center'>
            {
                sensitivity_device?.map((mobile : any) => (
                    <Card key={mobile}
                          className="w-[320px] h-[420px] p-0 dark:border-gray-500  bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100">
                        <CardHeader className='p-0'>
                            <Image src={mobile?.thumbnail_url} alt="project" width={350} height={300}
                                   className='w-full h-full min-h-[250px]  object-cover rounded-t-lg'/>
                        </CardHeader>
                        <CardContent>
                            <div className='flex gap-5 mt-4'>
                                {
                                    mobile?.mobile_icon_url ?  <Image src={mobile?.mobile_icon_url} alt='mobile-icon' width={28} height={28}/> : <Image src='/assets/mobile.svg' alt='mobile-icon' width={28} height={28}/>
                                }
                                <CardTitle
                                    className='text-xl font-spaceGrotesk text-dark300_light900 '>{mobile?.device_name}</CardTitle>
                            </div>
                            <CardDescription className='text-dark300_light900 mt-2 font-inter'>
                                {mobile?.explaination}
                            </CardDescription>
                            <SensitivityAavailbility/>
                            <Link href={`/sensitivity/${mobile.slug}`}>
                                <Button className='bg-amber-300 mt-4 font-spaceGrotesk text-[13px]'>Explore
                                    Perfection
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    );
}

export default SensitivityCard;


const SensitivityAavailbility = () => {
    return (
        <div className='flex gap-8 mt-4 dark:text-light-500'>
            <div>
                <div className='flex gap-3 items-center '>
                    <CheckCircledIcon className='text-green-500'/>
                    <p className='font-spaceGrotesk text-[12px]  '>GyroScope</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <CheckCircledIcon className='text-green-500'/>
                    <p className='font-spaceGrotesk text-[12px]'>Camera</p>
                </div>
            </div>
            <div>
                <div className='flex gap-3 items-center'>
                    <CheckCircledIcon className='text-green-500'/>
                    <p className='font-spaceGrotesk text-[12px]'>ADS</p>
                </div>
                <div className='flex gap-3 items-center'>
                    <CrossCircledIcon className='text-red-500'/>
                    <p className='font-spaceGrotesk text-[12px]'>Claws</p>
                </div>
            </div>
        </div>
    )
}

