import React from 'react';
import SharedBackButton from "@/components/shared/sharedBackButton";
import Image from "next/image";
import moment from "moment";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Metadata} from "next";

export async function generateMetadata({params}: { params: { slug: string }}): Promise<Metadata> {
    const data = await fetch(process.env.URL + `/api/create-apps/${params.slug}`,{
        method:'GET',
    });
    const device = await data.json();

    if (!device) {
        return {};
    }

    return {
        title: device.name,
        description: device.description,
        openGraph: {
            title: device.title as string,
            description: device.description as string,
            type: "article",
            url: process.env.url + `/games/${params.slug}`,
            images: [
                {
                    url: device.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: device.name as string,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: device.name as string,
            description: device.description as string,
        },
    };
}
async function Page({params}: { params: { slug: string } }) {
    const data = await fetch(process.env.URL + `/api/create-apps/${params.slug}`,{
        method:'GET',
    });
    const device = await data.json();
    return (
        <>
            <SharedBackButton url='/games'/>
            <div className='flex flex-col max-w-5xl h-full mx-auto xl:mt-10 md:mt-8  pb-10'>
                <div className='flex'>
                    <div className='w-[100px] h-[100px] rounded-lg relative'>
                        <Image src='/banner.jpeg' alt='img' width={100} height={100}
                               className='rounded-lg w-full min-h-[100px] min-w-[100px] h-full  overflow-hidden'/>
                    </div>
                    <div className='flex flex-col pl-3'>
                        <h3 className='font-bold text-dark300_light900'>{device.name}</h3>
                        <p className="text-sm text-dark400_light900">{moment(device.created_at).fromNow()}</p>
                        <div className='flex gap-3'>
                            <Badge variant="outline" className='w-fit mt-1 px-2 bg-red-500'>{device.sub_category}</Badge>
                            <Badge variant="outline" className='w-fit mt-1 px-2 bg-green-500'>{device.category}</Badge>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h2 className='h2-bold text-dark300_light900'>Additional information</h2>
                    <div className='flex flex-col gap-5 mt-3'>
                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Version</h3>
                            <p className='text-dark400_light900 flex-1 '>{device.version}</p>
                        </div>
                        <Separator orientation='horizontal' className='bg-slate-900'/>
                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Downloads</h3>
                            <p className='text-dark400_light900 flex-1 '>{device.download_count}</p>
                        </div>
                        <Separator orientation='horizontal' className='bg-slate-900'/>

                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Category</h3>
                            <p className='text-dark400_light900 flex-1 '>{device.category}</p>
                        </div>
                        <Separator orientation='horizontal' className='bg-slate-900'/>
                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Sub Category</h3>
                            <p className='text-dark400_light900 flex-1 '>{device.sub_category}</p>
                        </div>
                    </div>
                </div>
                <div className='mt-12'>
                    <h3 className='h2-bold text-dark300_light900'>Description</h3>
                    <p className='text-dark400_light900 mt-3 font-inter'>{device.description}</p>
                </div>
                <div>
                    <h3 className='h2-bold text-dark300_light900 mt-12'>Screenshots</h3>
                    <div className='flex  flex-wrap gap-5 mt-3'>
                        {
                            device.screenshots?.map((screenshot : any, index : any) => (
                                <div key={index} className='w-[200px] h-[200px] rounded-lg relative'>
                                    <Image src={screenshot} alt={device.name} width={200} height={200}
                                           className='rounded-lg w-full h-full object-cover overflow-hidden'/>
                                </div>
                            ))
                        }

                    </div>

                </div>
                <div>
                    <h3 className='h2-bold text-dark300_light900 mt-12'>Download</h3>
                    <div className='flex gap-5 mt-3'>
                        <button
                            className='w-[200px] h-[50px] bg-red-500 text-white rounded-lg flex items-center justify-center'>
                            Download APK
                        </button>
                        <button
                            className='w-[200px] h-[50px] bg-blue-500 text-white rounded-lg flex items-center justify-center'>
                            Download OBB
                        </button>
                    </div>
                </div>
                <div className='mt-14'>
                    <h3 className='h2-bold text-dark300_light900 my-12'>Explore the Article</h3>

                    <div className='w-full  lg:max-w-[1000px] h-[400px] rounded-lg relative mx-auto'>
                        <Image src={device?.thumbnail} alt={device.name} width={1000} height={400}
                               className='rounded-lg w-full h-full object-cover overflow-hidden'/>
                    </div>
                    <div className='markdown font-inter'
                         dangerouslySetInnerHTML={{__html: device?.explanation || ''}}></div>
                </div>
            </div>
        </>

    );
}

export default Page;