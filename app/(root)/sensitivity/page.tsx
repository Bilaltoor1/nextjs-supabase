import React from 'react';
import Filter from "@/components/shared/Filter";
import SensitivityCard from "@/components/Sensitivity/SensitivityCard";
import Pagination from "@/components/pagination/pagination";
import {getSensitivities} from "@/lib/actions/GetSensitivities.action";
import LocalSearch from "@/components/shared/LocalSearch";


async  function Page({searchParams} : any) {
    const {sensitivity_device, isNext} = await getSensitivities({
        filter: searchParams.filter,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize : searchParams.pageSize ? +searchParams.pageSize : 12,
    });

    return (
        <div>
             <LocalSearch route="/sensitivity"
                          iconPosition="left"
                          imgSrc="/assets/icons/search.svg"
                          placeholder="Search your device"
                          otherClasses=" mb-8 max-md:w-[350px] m-auto"/>
            <Filter/>
            <div className='flex flex-wrap gap-8 '>
                <SensitivityCard  sensitivity_device={sensitivity_device} />
                <Pagination pageNumber={
                    searchParams && searchParams.page
                        ? +searchParams.page
                        : 1
                } isNext={isNext}/>
            </div>
        </div>
    );
}

export default Page;