import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingDetails() {
  return (
    <section className="flex flex-col max-w-5xl w-full h-full mx-auto xl:mt-10 md:mt-8  pb-10">
      <div className="flex gap-3 items-center">
        <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
        <Skeleton className="h-3 w-[100px] bg-gray-500" />
      </div>
      <div className="flex gap-3 items-center mt-4">
        <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
        <Skeleton className="h-3 w-[100px] bg-gray-500" />
      </div>
      <div className="flex gap-3 items-center mt-4">
        <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
        <Skeleton className="h-3 w-[100px] bg-gray-500" />
      </div>
      <div className="flex gap-3 items-center mt-4">
        <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
        <Skeleton className="h-3 w-[100px] bg-gray-500" />
      </div>
      <div className="flex flex-wrap gap-6 my-8 items-center justify-center">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="w-[120px]  h-[80px] bg-gray-500" />
        ))}
      </div>
      <Skeleton className="md:w-[400px] w-full h-[40px] bg-gray-500" />
      {[1, 2, 3].map((item) => (
        <Skeleton key={item} className="w-full h-[300px] bg-gray-500 mt-8" />
      ))}
    </section>
  );
}

export default LoadingDetails;
