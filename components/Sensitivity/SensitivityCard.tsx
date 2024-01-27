import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {CheckCircledIcon, CrossCircledIcon} from '@radix-ui/react-icons'
import Link from "next/link";

function SensitivityCard() {
    const Mobiles = [1,2,3,4,5,6,7,8,9,10]
    return (
        <div className='flex flex-wrap gap-10 mt-10 max-md:justify-center max-md:items-center'>
            {
                 Mobiles.map((mobile) => (
                     <Card key={mobile} className="w-[350px] p-0 dark:border-gray-500  bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100">
                         <CardHeader className='p-0'>
                             <Image src="/assets/pxfuel.jpg" alt="project" width={350} height={300}
                                    className='w-full rounded-t-lg'/>
                         </CardHeader>
                         <CardContent>
                             <div className='flex gap-5 mt-4'>
                                 <Image src='/assets/mobile.svg' alt='mobile-icon' width={28} height={28}/>
                                 <CardTitle
                                     className='text-xl font-spaceGrotesk text-dark300_light900 '>Vivo
                                     V21 64GB</CardTitle>
                             </div>
                             <CardDescription className='text-dark300_light900 mt-2 font-inter'>
                                 Here you can check the experience of gaming on vivo 21. Sensitivity is the most important thing
                                 in gaming.
                             </CardDescription>
                             <SensitivityAavailbility/>
                         </CardContent>
                         <CardFooter className="flex justify-between">
                             <Link  href={`/sensitivity/${mobile}`}>
                             <Button  className='bg-amber-300  font-spaceGrotesk text-[13px]'>Explore
                                 Perfection
                             </Button>
                             </Link>
                         </CardFooter>
                     </Card>
                 )  )
            }
        </div>
    );
}

export default SensitivityCard;



const SensitivityAavailbility = () => {
    return(
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

