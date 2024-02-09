
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { createServerClient} from "@supabase/ssr";
import {Button} from "@/components/ui/button";
import { useParams } from 'next/navigation'
import {cookies} from "next/headers";
import {useSearchParams} from "next/navigation";

async function SeverSidePagination() {

    const cookieStore = cookies()
     const params = useSearchParams()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
    const getTimeStamp = (timestamp: Date) => {
        const currentDate: Date = new Date();
        const inputDate: Date = new Date(timestamp);
        // @ts-ignore
        const timeDifference: any = currentDate - inputDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return `${months} mon ago`;
        } else if (days > 0) {
            return `${days} day ago`;
        } else if (hours > 0) {
            return `${hours} hour ago`;
        } else if (minutes > 0) {
            return `${minutes} min ago`;
        } else {
            return `${seconds} sec ago`;
        }
    }

    const {count} = await supabase.from('comments').select('*', {count: 'exact'})
        // @ts-ignore
        const totalpages = Math.ceil(count / 5)

    const getFromAndTo = () => {
        const ITEM_PER_PAGE = 5;
        let from = 1 * ITEM_PER_PAGE
        let to = from + ITEM_PER_PAGE

        if (1 >= 0) {
            from += 1
        }
        return {from, to}
    }
        const {from, to} = getFromAndTo();
        let {data : comments, error} = await supabase
            .from('comments')
            .select('*').eq('post_slug' ,   params.slug)
            .range(from, to);

    return (
        <div className='mt-20'>
            <h5
                className='text-lg font-bold text-dark300_light700 font-spaceGrotesk mb-8 '>Here are comments
                ({5})...</h5>
            <div className='flex flex-col space-y-6'>
                {
                    comments?.map((comment: any) => <div key={comment.id}
                                                        className='flex flex-col gap-2 background-light900_dark300 text-dark300_light700 rounded-lg shadow-lg p-4'>
                        <div className='border-gray-500 flex items-center gap-2  p-4'>
                            <Avatar>
                                <AvatarImage src={comment.user_img}/>
                                <AvatarFallback>
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col gap-1'>
                                <span
                                    className='text-sm font-bold text-dark300_light700 font-spaceGrotesk'>{comment.user_name}</span>
                                <span
                                    className='text-xs text-dark300_light700 font-spaceGrotesk'>{getTimeStamp(comment.created_at)}</span>
                            </div>
                        </div>
                        <p className='font-inter'>{comment.content}</p>
                    </div>)
                }
            </div>
            <Button
                    className='bg-dark-300  text-light-850 mt-8 dark:bg-light-850 dark:text-dark-300'>Show more</Button>
        </div>
    );
}

export default SeverSidePagination;