"use server"
import { cookies } from 'next/headers';
import {createClient} from "@/lib/supabase/serverClient";
export async function CreateCommentsAction({CommentData} : any) {
    const cookieStore = cookies();
     const supabase = createClient(cookieStore)
 const response = await supabase.from('comments').insert(CommentData).eq('post_slug',CommentData.slug).single()
 return response
}

export async function CreateCommentsActionForGamesAndApps({CommentData} : any) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore)
    const response = await supabase.from('apps_comments').insert(CommentData).eq('app_slug',CommentData.post_slug).single()
    return response
}


