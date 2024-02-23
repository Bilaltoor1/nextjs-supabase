import React from 'react';
import Image from "next/image";
import {CheckCircledIcon, CrossCircledIcon} from "@radix-ui/react-icons";
import CameraSensitivity from "@/components/Sensitivity/SliderComponents/CameraSensitivity";
import ADSSensitivity from "@/components/Sensitivity/SliderComponents/ADSSensitivity";
import GyroSensitvity from "@/components/Sensitivity/SliderComponents/GyroSensitvity";
import CameraFreeLook from "@/components/Sensitivity/SliderComponents/CameraFreeLook";
import AboutDevice from "@/components/Sensitivity/AboutDevice";
import CreateComment from "@/components/comments/CreateComment";
import {Metadata} from "next";
import {createClient} from "@/lib/supabase/serverClient";
import {cookies} from "next/headers";
import DetailPostComment from "@/components/comments/detail-post-comments";
import DetailPostCommentButton from "@/components/comments/detail-post-comment-button";
import {TracingBeam} from "@/components/ui/tracing-beam";
import SensitivityDetail from "@/app/(root)/sensitivity/[slug]/sensitivity-detail";

export async function generateStaticParams() {
    const data = await fetch(process.env.URL + '/api/sensitivity');
    const devices = await data.json();
    return devices?.response.data.map((device: any) => (device.slug)).slice(0, 5)
}

// export async function generateMetadata({params}: { params: { [slug]: string } }): Promise<Metadata> {
//     const data = await fetch(process.env.URL + `/api/sensitivity/${params.[slug]}`);
//     const device = await data.json();
//     return {
//         title: device?.data.device_name,
//         description: device?.data.intro_text,
//         openGraph: {
//             images: [
//                 {url: device.data.thumbnail_url, alt: 'thumbnail'}
//             ]
//         }
//     }
// }

// export const revalidate = 0;
// .match({ [slug]: [slug], published: true })
async function page({params}: { params: { slug: string } }) {
    const cookiesStore = cookies();
    // GET DEVICE DATA FROM API
    const data = await fetch(process.env.URL + `/api/sensitivity/${params.slug}`);
    let response = await data.json();
    const device = response.data;

    // GET USER SESSION
    const supabase = createClient(cookiesStore)
    const {data: user, error} = await supabase.auth.getSession();


    // GET RECENT COMMENTS
    const {data: comments, error: commentError} = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", params.slug)
        .order("created_at", {ascending: false})
        .limit(5)


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
            <SensitivityDetail device={device}/>
            {/*    CREATE A COMMENT   */}
            <CreateComment post_slug={device.slug} />
            <DetailPostComment slug={device.slug}/>
        </section>
    );
}

export default page;



