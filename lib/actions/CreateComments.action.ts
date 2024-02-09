"use server"
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
export async function CreateCommentsAction({CommentData} : any) {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
  await supabase.from('comments').insert([
        {
            user_name  : CommentData.user_name,
            post_slug  : CommentData.slug,
            content  : CommentData.comment,
            user_img : CommentData.user_img
        }
    ]).eq('post_slug',CommentData.slug)

}
