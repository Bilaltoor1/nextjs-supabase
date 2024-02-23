import React, {Suspense} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "@radix-ui/react-icons";
import BlogTable from "@/app/(admin)/components/DashboardMain/BlogTable";
import {getSensitivities} from "@/lib/actions/GetSensitivities.action";
import LocalSearch from "@/components/shared/LocalSearch";

export default async function Page({searchParams}: any) {
    const {sensitivity_device, isNext} = await getSensitivities({
        filter: searchParams.filter,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize: searchParams.pageSize ? +searchParams.pageSize : 10,
    });
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <LocalSearch route="/dashboard"
                             iconPosition="left"
                             imgSrc="/assets/icons/search.svg"
                             placeholder="Search device"
                             otherClasses="max-w-[350px]"/>
                <div className="flex gap-5">
                    <Link href="/dashboard/create-sensitivity" className='text-dark500_light500'>
                        <Button
                            className="flex items-center gap-2 "
                            variant="outline"
                        >
                            Create <PlusIcon/>
                        </Button>
                    </Link>
                    <Link href="/dashboard/create-game-app" className='text-dark500_light500'>
                        <Button
                            className="flex items-center gap-2 "
                            variant="outline"
                        >
                            Create Apps<PlusIcon/>
                        </Button>
                    </Link>
                </div>
            </div>
            <Suspense fallback={<div>Loading Dashboard data</div>}>
                <BlogTable sensitivity_device={sensitivity_device} searchParams={searchParams} isNext={isNext}/>
            </Suspense>
        </div>
    );
}