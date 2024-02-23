import React from 'react';
import Image from "next/image";
import CreateComment from "@/components/comments/CreateComment";
import {Metadata} from "next";
import DetailPostComment from "@/components/comments/detail-post-comments";
import DetailPostCommentButton from "@/components/comments/detail-post-comment-button";
import SensitivityDetail from "@/app/(root)/sensitivity/[slug]/sensitivity-detail";


export async function generateMetadata({params}: { params: { slug: string } }): Promise<Metadata> {
    const data = await fetch(process.env.URL + `/api/sensitivity/${params.slug}`);
    const device = await data.json();
    return {
        title: device?.data.device_name,
        description: device?.data.intro_text,
        openGraph: {
            images: [
                {url: device.data.thumbnail_url, alt: 'thumbnail'}
            ]
        }
    }
}

async function page({params}: { params: { slug: string } }) {
    // GET DEVICE DATA FROM API
    const data = await fetch(process.env.URL + `/api/sensitivity/${params.slug}`);
    let response = await data.json();
    const device = response.data;


    return (
        <section className='flex flex-col max-w-5xl h-full mx-auto xl:mt-10 md:mt-8  pb-10'>
            <div className='bg-gray-500 rounded-xl h-[400px] max-md:h-[250px] w-full'>
                <Image src={device?.thumbnail_url} alt='article-img' height={400} width={1200}
                       className='rounded-xl h-[400px] max-md:h-[250px] w-full object-center'/>
            </div>
            <div className='flex justify-between items-center my-6'>
                <h1 className='text-dark100_light900 h1-bold font-spaceGrotesk '>Sensitivity of Vivo v21 64GB 4
                    GBRAM</h1>
                <DetailPostCommentButton totalComments={2}/>
            </div>
            {/* Detail of the sensitivity*/}
            <SensitivityDetail device={device}/>
            {/*    CREATE A COMMENT   */}
            <CreateComment post_slug={device.slug}/>
            <DetailPostComment slug={params.slug}/>
        </section>
    );
}

export default page;



