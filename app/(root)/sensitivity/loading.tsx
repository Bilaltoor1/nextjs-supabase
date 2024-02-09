import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"
function Loading() {
    return (
        <div>
            {/*<h1 className='h1-bold text-dark100_light900'>All the Sensitivities are Here </h1>*/}
            <Skeleton className="mb-8 w-full h-[50px]  max-md:w-[350px] max-md:m-auto rounded-lg bg-gray-500 "/>
            <div className="mt-2 flex-wrap gap-3 flex max-md:justify-center">
                <Skeleton className="w-[100px] h-[40px] rounded-lg bg-gray-500"/>
                <Skeleton className="w-[120px] h-[40px] rounded-lg bg-gray-500"/>
                <Skeleton className="w-[140px] h-[40px] rounded-lg bg-gray-500"/>
            </div>
            <div className='flex flex-wrap gap-10 mt-10 max-md:justify-center max-md:items-center'>
                {
                   [1,2,3,4,5,6,7,8,9,10,11,12].map((mobile: any) => (
                       <Skeleton key={mobile} className='w-[320px] h-[400px] rounded-lg bg-gray-700'>
                           <Skeleton className='w-full h-full object-cover bg-gray-900 rounded-t-lg'/>
                       </Skeleton>
                    ))
                }
            </div>
        </div>
    );
}

export default Loading;




