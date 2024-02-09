import React from "react";
// import BlogTable from "./blog/components/BlogTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import BlogTable from "@/app/(admin)/components/DashboardMain/BlogTable";
import {getSensitivities} from "@/lib/actions/GetSensitivities.action";

export default async function Page({searchParams}  : any) {
    const {sensitivity_device, isNext} = await getSensitivities({
        filter: searchParams.filter,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize : searchParams.pageSize ? +searchParams.pageSize : 12,
    });
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Sensitivity For Device</h1>
                <Link href="/dashboard/create-sensitivity" className='text-dark500_light500'>
                    <Button
                        className="flex items-center gap-2 "
                        variant="outline"
                    >
                        Create <PlusIcon />
                    </Button>
                </Link>
            </div>

            <BlogTable  sensitivity_device={sensitivity_device} isNext={isNext}  />
        </div>
    );
}