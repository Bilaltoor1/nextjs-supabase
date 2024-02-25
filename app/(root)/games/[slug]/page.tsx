import React from 'react';
import SharedBackButton from "@/components/shared/sharedBackButton";
import Image from "next/image";
import moment from "moment";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Metadata} from "next";
import CreateComment from "@/components/comments/CreateComment";
import DetailPostComment from "@/components/comments/detail-post-comments";
import {getComments} from "@/lib/actions/GetSensitivities.action";
import DataTableForGamesAndApps from "@/app/(admin)/components/DashboardMain/DataTableForGamesAndApps";
import DetailPostCommentsForApps from "@/components/comments/detail-post-comments-for-apps";

export async function generateMetadata({params}: { params: { slug: string }}): Promise<Metadata> {
    const data = await fetch(process.env.URL + `/api/create-apps/${params.slug}`,{
        method:'GET',
    });
    const app = await data.json();

    if (!app) {
        return {};
    }

    return {
        title: app.name,
        description: app.description,
        openGraph: {
            title: app.title as string,
            description: app.description as string,
            type: "article",
            url: process.env.url + `/games/${params.slug}`,
            images: [
                {
                    url: app.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: app.name as string,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: app.name as string,
            description: app.description as string,
        },
    };
}
async function Page({params}: { params: { slug: string } }) {
    const data = await fetch(process.env.URL + `/api/create-apps/${params.slug}`,{
        method:'GET',
    });
    const app = await data.json();

    return (
        <div>
            <SharedBackButton url='/games'/>
            <div className='flex flex-col max-w-5xl h-full mx-auto xl:mt-10 md:mt-8  pb-10'>
                <div className='flex'>
                    <div className='w-[100px] h-[100px] rounded-lg relative'>
                        <Image src='/banner.jpeg' alt='img' width={100} height={100}
                               className='rounded-lg w-full min-h-[100px] min-w-[100px] h-full  overflow-hidden'/>
                    </div>
                    <div className='flex flex-col pl-3'>
                        <h3 className='font-bold text-dark300_light900'>{app.name}</h3>
                        <p className="text-sm text-dark400_light900">{moment(app.created_at).fromNow()}</p>
                        <div className='flex gap-3'>
                            <Badge variant="outline" className='w-fit mt-1 px-2 bg-red-500'>{app.sub_category}</Badge>
                            <Badge variant="outline" className='w-fit mt-1 px-2 bg-green-500'>{app.category}</Badge>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h2 className='h2-bold text-dark300_light900'>Additional information</h2>
                    <div className='flex flex-col gap-5 mt-3'>
                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Version</h3>
                            <p className='text-dark400_light900 flex-1 '>{app.version}</p>
                        </div>
                        <Separator orientation='horizontal' className='bg-slate-900'/>
                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Downloads</h3>
                            <p className='text-dark400_light900 flex-1 '>{app.download_count}</p>
                        </div>
                        <Separator orientation='horizontal' className='bg-slate-900'/>

                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Category</h3>
                            <p className='text-dark400_light900 flex-1 '>{app.category}</p>
                        </div>
                        <Separator orientation='horizontal' className='bg-slate-900'/>
                        <div className='flex'>
                            <h3 className='text-dark400_light900 flex-1 font-bold'>Sub Category</h3>
                            <p className='text-dark400_light900 flex-1 '>{app.sub_category}</p>
                        </div>
                    </div>
                </div>
                <div className='mt-12'>
                    <h3 className='h2-bold text-dark300_light900'>Description</h3>
                    <p className='text-dark400_light900 mt-3 font-inter'>{app.description}</p>
                </div>
                <div>
                    <h3 className='h2-bold text-dark300_light900 mt-12'>Screenshots</h3>
                    <div className='flex  flex-wrap gap-5 mt-3'>
                        {
                            app.screenshots?.map((screenshot : any, index : any) => (
                                <div key={index} className='w-[200px] h-[200px] rounded-lg relative'>
                                    <Image src={screenshot} alt={app.name} width={200} height={200}
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
                        <Image src={app?.thumbnail} alt={app.name} width={1000} height={400}
                               className='rounded-lg w-full h-full object-cover overflow-hidden'/>
                    </div>
                    <div className='markdown font-inter'
                         dangerouslySetInnerHTML={{__html: app?.explanation || ''}}></div>
                </div>
                <CreateComment post_slug={app.slug}/>
               <DetailPostCommentsForApps slug={params.slug}/>
            </div>
        </div>

    );
}

export default Page;