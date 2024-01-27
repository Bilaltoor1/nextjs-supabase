import React from 'react';
import Filter from "@/components/shared/Filter";
import SensitivityCard from "@/components/Sensitivity/SensitivityCard";


function Page() {
    return (
        <div>
            <Filter/>
            <div className='flex flex-wrap gap-8 '>
                <SensitivityCard/>
            </div>
        </div>
    );
}

export default Page;