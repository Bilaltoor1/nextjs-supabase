import React, {Suspense} from "react";
import LocalSearch from "@/components/shared/LocalSearch";
import Pagination from "@/components/pagination/pagination";
import {getGamesAndAppsForAdmin} from "@/lib/actions/CreateGamesApps.action";
import DataTableForGamesAndApps from "@/app/(admin)/components/DashboardMain/DataTableForGamesAndApps";

export default async function Page({searchParams}: any) {
    const {GamesAndApps, isNext} = await getGamesAndAppsForAdmin({
        filter: searchParams.filter,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
        pageSize: searchParams.pageSize ? +searchParams.pageSize : 8,
    })
    return (
        <div className="space-y-5 overflow-x-hidden">
            <div className="flex items-center justify-between">
                <LocalSearch route="/dashboard/get-sensitivity-table"
                             iconPosition="left"
                             imgSrc="/assets/icons/search.svg"
                             placeholder="Search device"
                             otherClasses="max-w-[350px]"/>
            </div>
            <Suspense fallback={<div>Loading Dashboard data</div>}>
             <DataTableForGamesAndApps data={GamesAndApps}/>
            </Suspense>
            <Pagination pageNumber={
                searchParams && searchParams.page
                    ? +searchParams.page
                    : 1
            } isNext={isNext}/>
        </div>
    );
}