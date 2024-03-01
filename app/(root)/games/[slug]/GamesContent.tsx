"use client";
import LoadingIndicator from "@/app/(admin)/components/DashboardMain/LoadingIndicator";
import DownloadButton from "@/components/Games/downloadButton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleGameAndApp } from "@/lib/actions/CreateGamesApps.action";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

export default function GamesContent({ slug }: { slug: string }) {
  const [app, setApp] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const getData = async () => {
    setLoading(true);
    const { app } = await getSingleGameAndApp(slug);
    setApp(app);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
       <LoadingSkeleton />
      ) : (
        <>
          <div className="mt-20">
            <h2 className="md:h2-bold text-[20px] font-bold text-dark300_light900">
              Additional information
            </h2>
            <div className="flex flex-col gap-5 mt-3">
              <div className="flex">
                <h3 className="text-dark400_light900 flex-1 font-bold text-[14px] sm:text-[16px]">
                  Version
                </h3>
                <p className="text-dark400_light900 flex-1 sm:text-[16px] text-[14px] ">
                  {app.version}
                </p>
              </div>
              <Separator orientation="horizontal" className="bg-slate-900" />
              <div className="flex">
                <h3 className="text-dark400_light900 flex-1 font-bold text-[14px] sm:text-[16px]">
                  Downloads
                </h3>
                <p className="text-dark400_light900 flex-1 sm:text-[16px] text-[14px] ">
                  {app.download_count}
                </p>
              </div>
              <Separator orientation="horizontal" className="bg-slate-900" />

              <div className="flex">
                <h3 className="text-dark400_light900 flex-1 font-bold text-[14px] sm:text-[16px]">
                  Category
                </h3>
                <p className="text-dark400_light900 flex-1 sm:text-[16px] text-[14px] ">
                  {app.category}
                </p>
              </div>
              <Separator orientation="horizontal" className="bg-slate-900" />
              <div className="flex">
                <h3 className="text-dark400_light900 flex-1 font-bold text-[14px] sm:text-[16px]">
                  Sub Category
                </h3>
                <p className="text-dark400_light900 flex-1 sm:text-[16px] text-[14px] ">
                  {app.sub_category}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="md:h2-bold text-[20px] font-bold text-dark300_light900">
              Description
            </h3>
            <p className="text-dark400_light900 mt-3 font-inter">
              {app.description}
            </p>
          </div>
          <div>
            <h3 className="md:h2-bold text-[20px] font-bold text-dark300_light900 mt-12">
              Screenshots
            </h3>
            <div className="flex  flex-wrap gap-5 mt-3 justify-center">
              {app.screenshots?.map((screenshot: any, index: any) => (
                <div
                  key={index}
                  className="md:w-[200px] md:h-[200px] h-[160px] w-[160px]  rounded-lg relative"
                >
                  <Image
                    src={screenshot}
                    alt={app.name}
                    width={200}
                    height={200}
                    className="rounded-lg w-full h-full object-cover overflow-hidden"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14">
            <h3 className="md:h2-bold text-[20px] font-bold text-dark300_light900 my-12">
              Explore the Article
            </h3>

            <div className="w-full  lg:max-w-[1000px] h-[400px] rounded-lg relative mx-auto">
              <Image
                src={app?.thumbnail}
                alt={app.name}
                width={1000}
                height={400}
                className="rounded-lg w-full h-full object-cover overflow-hidden"
              />
            </div>
            <div
              className="markdown font-inter"
              dangerouslySetInnerHTML={{ __html: app?.explanation || "" }}
            ></div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <DownloadButton url="/" text="Download" />
          </div>
        </>
      )}
    </>
  );
}
