
import React from "react";
import {EyeOpenIcon, Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {updateSensitivityDeviceById} from "@/lib/actions/GetSensitivities.action";
import SwitchForm from "@/app/(admin)/components/DashboardMain/SwitchForm";
import DeleteAlert from "@/app/(admin)/components/DashboardMain/DeleteAlert";
import Image from "next/image";
import Pagination from "@/components/pagination/pagination";
import {setTimeout} from "node:timers/promises";

export default async function BlogTable({sensitivity_device, isNext , searchParams}: { sensitivity_device: any, isNext: any , searchParams : any}) {
    return (
        <div className=' space-y-10'>
            <div className="rounded-md dark:dark-gradient border-[0.5px] overflow-y-scroll ">

                <div className="w-full">
                    <div className="flex border-b p-5 gap-12 dark:text-gray-500">
                        <h3 className="flex-1">Title</h3>
                        <h3 className="flex-1">Thumbnail</h3>
                        <h3  className="flex-1">is_Published</h3>
                        <h3 className="flex-1">Thumbnail</h3>
                        <h3  className="flex-1">Publish</h3>
                    </div>
                    <div className="space-y-10 p-5">
                        {sensitivity_device?.map((device: any, index: any) => {

                            const updatePulished = updateSensitivityDeviceById.bind(
                                null,
                                device.id,
                                {
                                    is_published: !device.is_published,
                                }
                            );

                            return (
                                <div className="grid grid-cols-5 items-center" key={index}>
                                    <h1 className="dark:text-gray-200 col-span-2 font-lg font-medium">
                                        {device?.device_name}
                                    </h1>
                                    <div className='w-[200px] h-[150px] '>
                                        <Image src={device?.thumbnail_url} alt={device.device_name} width={200}
                                               height={150} className='object-cover w-full h-full rounded-lg '/>
                                    </div>
                                    <SwitchForm
                                        checked={device.is_published}
                                        onSubmit={updatePulished}
                                        name="publish"
                                    />

                                    <Actions id={device.id} slug={device.slug}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Pagination pageNumber={
                searchParams && searchParams.page
                    ? +searchParams.page
                    : 1
            } isNext={isNext}/>
        </div>
    );
}

const Actions = ({id, slug}: { id: string, slug: string }) => {
    return (
        <div className="flex items-center gap-2 md:flex-wrap">
            {/* TODO: change to id */}
            <Link href={`/sensitivity/${slug}`}>
                <Button className="flex gap-2 items-center text-dark300_light700" variant="outline">
                    <EyeOpenIcon/>
                    View
                </Button>
            </Link>
            <DeleteAlert id={id} slug={slug}/>
            <Link href={`/dashboard/update-Sensitivity/${slug}`}>
                <Button className="flex gap-2 items-center text-dark300_light700" variant="outline">
                    <Pencil1Icon/>
                    Edit
                </Button>
            </Link>
        </div>
    );
};