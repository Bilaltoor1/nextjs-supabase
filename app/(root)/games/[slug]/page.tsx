import SharedBackButton from "@/components/shared/sharedBackButton";
import Image from "next/image";
import moment from "moment";
import {Badge} from "@/components/ui/badge";
import {Metadata} from "next";
import CreateComment from "@/components/comments/CreateComment";
import DetailPostCommentsForApps from "@/components/comments/detail-post-comments-for-apps";
import { getGamesAndApps } from '@/lib/actions/CreateGamesApps.action';
import GamesContent from "./GamesContent";
export async function generateStaticParams() {
    const {GamesAndApps} = await getGamesAndApps({
        filter: '',
        searchQuery: '',
        page: 1,
        pageSize: 8,
    });
    
    return GamesAndApps
}
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
        <>
            <div className='flex flex-col max-w-5xl h-full mx-auto xl:mt-10 md:mt-8  pb-10'>
                <div className='flex'>
                    <div className='w-[100px] h-[100px] rounded-lg relative'>
                        <Image src={app.thumbnail} alt='img' width={100} height={100} priority
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
                <GamesContent slug={params.slug}/>
                <CreateComment post_slug={app.slug}/>
               <DetailPostCommentsForApps slug={params.slug}/>
            </div>
        </>

    );
}

export default Page;





