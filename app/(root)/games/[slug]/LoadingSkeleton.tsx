import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function LoadingSkeleton() {
  return (
    <>
    <div className="mt-20">
      <Skeleton className="h-6 w-40 bg-gray-500" />
      <div className="flex flex-col gap-5 mt-3">
        {['Version', 'Downloads', 'Category', 'Sub Category'].map((item, index) => (
          <div key={index} className="flex">
            <Skeleton className="h-4 w-full bg-gray-500 flex-1" />
          </div>
        ))}
      </div>
    </div>
    <div className="mt-12">
      <Skeleton className="h-6 w-40 bg-gray-500" />
      <Skeleton className="h-4 w-full bg-gray-500 mt-3" />
    </div>
    <div>
      <Skeleton className="h-6 w-40 bg-gray-500 mt-12" />
      <div className="flex flex-wrap gap-5 mt-3 justify-center">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="w-[160px] h-[160px] rounded-lg bg-gray-500" />
        ))}
      </div>
    </div>
    <div className="mt-14">
      <Skeleton className="h-6 w-40 bg-gray-500 my-12" />
      <Skeleton className="w-full h-[400px] rounded-lg bg-gray-500 mx-auto" />
      <Skeleton className="w-full h-4 bg-gray-500 mt-3" />
    </div>
    <div className="flex justify-center items-center mt-10">
      <Skeleton className="h-10 w-40 rounded-3xl bg-gray-500" />
    </div>
  </>
  )
}

export default LoadingSkeleton
