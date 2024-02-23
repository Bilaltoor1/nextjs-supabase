import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingSuspense() {
    return (
        <div>
            <div className='flex flex-wrap gap-10 mt-10 max-md:justify-center max-md:items-center'>
                {
                   [1,2,3,4,5,6,7,8,9,10,11,12].map((mobile: any) => (
                       <div key={mobile} className='h-[100px] w-[400px] rounded-lg bg-gray-700'>
                           <Skeleton key={mobile} className='h-[100px] w-[400px] rounded-lg bg-gray-700'>
                               <Skeleton className='w-full h-full object-cover bg-gray-900 rounded-t-lg'/>
                           </Skeleton>
                       </div>
                    ))
                }
            </div>
        </div>
    );
}
//@ts-ignore
