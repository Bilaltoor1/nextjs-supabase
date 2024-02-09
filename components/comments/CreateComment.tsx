'use client'
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import CommentLogin from "@/components/comments/CommentLogin";
import {useEffect, useState} from "react";
import {createBrowserClient} from "@supabase/ssr";
import {useToast} from "@/components/ui/use-toast";
import {useParams} from "next/navigation";
import {User} from "@supabase/supabase-js";

function CreateComment() {
    const [comment, setComment] = useState('')
    //  @ts-ignore
    const [sessionData, setSession] = useState<User>(undefined)
    const params = useParams()
    const {toast} = useToast()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const getSession = async () => {
        const {data, error} = await supabase.auth.getSession()
        // @ts-ignore
        setSession(data.session?.user)
    }
    const CreateCommentsHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        await supabase.from('comments').insert({
            user_name: sessionData?.user_metadata.full_name,
            post_slug: params.slug,
            content: comment,
            user_img: sessionData?.user_metadata.avatar_url
        }).eq('post_slug', params.slug)

        setComment('')
        console.log('comment created')
    }
    useEffect(() => {
        getSession()
    }, [])

    return (
        <div className='mt-10'>
            <CommentLogin/>
            <form onSubmit={CreateCommentsHandler}>
                <Textarea
                    className='background-light900_dark300 text-dark300_light700 font-spaceGrotesk dark:border-none focus:outline-none'
                    placeholder='Write a Comments ... ' name="comment " onChange={(e) => setComment(e.target.value)}
                    value={comment}/>
                <div className='flex gap-3'>
                    <Button
                        className=' bg-slate-600 dark:text-light-900 font-spaceGrotesk font-semibold text-light-850 dark:bg-dark-300  mt-4'
                        disabled={sessionData?.role !== 'authenticated'} type='submit'>Send
                        Comment</Button>
                </div>
            </form>

        </div>
    );
}

export default CreateComment;