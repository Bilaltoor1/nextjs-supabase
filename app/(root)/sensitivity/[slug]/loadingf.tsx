import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

function Loadingf() {
    return (
        <section className='flex flex-col max-w-5xl h-full mx-auto xl:mt-10 md:mt-8  pb-10'>
            <div>
               <Skeleton className='rounded-xl h-[400px] max-md:h-[250px] w-full bg-gray-500 mb-8 object-center'/>
            </div>
            <Skeleton className='h-12 w-full bg-gray-500'/>
            <div className='flex flex-wrap gap-6 my-8 items-center justify-center'>
                {
                    [1,2,3,4].map(item => (
                        <Skeleton key={item} className='w-[120px]  h-[80px] bg-gray-500'/>
                    ))
                }

            </div>
            <Skeleton className='w-[400px] h-[40px] bg-gray-500' />
            {
                [1,2,3].map(item => (
                    <Skeleton key={item} className='w-full h-[500px] bg-gray-500 mt-8'/>
                ))
            }


        </section>
    );
}

export default Loadingf;




