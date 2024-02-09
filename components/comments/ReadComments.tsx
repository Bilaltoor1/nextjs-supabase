'use client'
import React, {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {createBrowserClient} from "@supabase/ssr";
import {Button} from "@/components/ui/button";
import {useParams} from 'next/navigation'

function ReadComments() {
    const [comments, setComments] = useState([])
    const [page, setPage] = useState(0)
    const [TotalCommentsPages, setTotalCommentsPage] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const params = useParams()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const getTimestamp = (created_at: any): string => {
        const now = new Date();
        const timestamp = typeof created_at === 'number' ? created_at : new Date(created_at).getTime();

        if (isNaN(timestamp)) {
            return 'Invalid timestamp';
        }

        const timeDifference = now.getTime() - timestamp;

        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = day * 30;
        const year = day * 365;

        if (timeDifference < minute) {
            const seconds = Math.floor(timeDifference / 1000);
            return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
        } else if (timeDifference < hour) {
            const minutes = Math.floor(timeDifference / minute);
            return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        } else if (timeDifference < day) {
            const hours = Math.floor(timeDifference / hour);
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        } else if (timeDifference < week) {
            const days = Math.floor(timeDifference / day);
            return `${days} day${days !== 1 ? "s" : ""} ago`;
        } else if (timeDifference < month) {
            const weeks = Math.floor(timeDifference / week);
            return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
        } else if (timeDifference < year) {
            const months = Math.floor(timeDifference / month);
            return `${months} month${months !== 1 ? "s" : ""} ago`;
        } else {
            const years = Math.floor(timeDifference / year);
            return `${years} year${years !== 1 ? "s" : ""} ago`;
        }
    };

    const commentsCount = async () => {
        const {count} = await supabase.from('comments').select('id', {count: 'exact'}).eq('post_slug', params.slug)
        // @ts-ignore

        setCommentCount(count)
        // @ts-ignore

        const totalpages = Math.ceil(count / 5) - 1
        return setTotalCommentsPage(totalpages)
    }
    const getFromAndTo = () => {
        const ITEM_PER_PAGE = 5;
        let from = page * ITEM_PER_PAGE
        let to = from + ITEM_PER_PAGE

        if (page >= 0) {
            from += 1
        }
        return {from, to}
    }
    const FetchComments = async () => {

        const {from, to} = getFromAndTo();
        let {data, error} = await supabase
            .from('comments')
            .select('*').eq('post_slug', params.slug)
            .range(from, to);

        // @ts-ignore
        setComments((currentComments) => [...data]);
    };
    const handleShowMoreClick = () => {
        setPage((prevPage) => prevPage + 1);
        FetchComments();
    };
    useEffect(() => {
        FetchComments()
        commentsCount()
    }, [page])
    return (
        <div className='mt-20'>
            {
                commentCount >= 1 ?

                    <>
                        <h5
                            className='text-lg font-bold text-dark300_light700 font-spaceGrotesk mb-8 '>Here are
                            comments
                            ({commentCount})...</h5>
                        <div className='flex flex-col space-y-6'>
                            {
                                comments.map((comment: any) => <div key={comment.id}
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
                                                className='text-xs text-dark300_light700 font-spaceGrotesk'>{getTimestamp(comment.created_at)}</span>
                                        </div>
                                    </div>
                                    <p className='font-inter'>{comment.content}</p>
                                </div>)
                            }
                        </div>
                        <Button onClick={handleShowMoreClick} disabled={page >= TotalCommentsPages}
                                className='bg-dark-300  text-light-850 mt-8 dark:bg-light-850 dark:text-dark-300'>Show
                            more</Button>
                    </>
                    :
                    <h5 className='text-lg font-bold text-dark300_light700 font-spaceGrotesk mb-8 '>No comments
                        yet...</h5>
            }
        </div>
    );
}

export default ReadComments;