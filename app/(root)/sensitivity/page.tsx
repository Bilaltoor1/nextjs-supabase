import React, { Suspense } from "react";
import Filter from "@/components/shared/Filter";
import SensitivityCard from "@/components/Sensitivity/SensitivityCard";
import Pagination from "@/components/pagination/pagination";
import { getSensitivities } from "@/lib/actions/GetSensitivities.action";
import LocalSearch from "@/components/shared/LocalSearch";
import NoResult from "@/components/shared/NoResult";
import { Metadata } from "next";
import BlogTable from "@/app/(admin)/components/DashboardMain/BlogTable";
import LoadingSuspense from "@/app/(root)/sensitivity/loadingSuspense";
export const metadata: Metadata = {
  title: {
    default: "Sensitivity",
    template: "%s - Game Store",
  },
  description:
    "Game store is excellent website for mod games lovers and who wants to play with unlimited resources. we are also providing the paid games in free and also provide the Sensitivity for all the mobile device to boost your pubg mobile game experience so that you can play like a pro player.",
};

async function Page({ searchParams }: any) {
  const { sensitivity_device, isNext } = await getSensitivities({
    filter: searchParams.filter,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: searchParams.pageSize ? +searchParams.pageSize : 1,
  });
  return (
    <>
      <LocalSearch
        route="/sensitivity"
        iconPosition="left"
        imgSrc="/assets/icons/search.svg"
        placeholder="Search your device"
        otherClasses=" mb-8 w-full  m-auto"
      />
      <Filter />
      <div className="flex flex-wrap gap-8">
        {sensitivity_device?.length > 0 ? (
          <>
            {" "}
            <Suspense fallback={<LoadingSuspense />}>
              <SensitivityCard sensitivity_device={sensitivity_device} />
            </Suspense>
            <Pagination
              pageNumber={
                searchParams && searchParams.page ? +searchParams.page : 1
              }
              isNext={isNext}
            />{" "}
          </>
        ) : (
          <NoResult
            title="There’s no Device found! 😞"
            description="Sorry there is no result found related to your search so kindly try for another device  💡"
            link="/"
            linkTitle="Go Home"
          />
        )}
      </div>
    </>
  );
}

export default Page;
