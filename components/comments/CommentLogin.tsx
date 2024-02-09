"use client";

import {createBrowserClient} from '@supabase/ssr'
import React, {useEffect} from 'react';
import Image from "next/image";
import {usePathname} from "next/navigation";
import {ExitIcon} from '@radix-ui/react-icons'
import {useRouter} from 'next/navigation'
import {User} from '@supabase/supabase-js'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { useParams } from 'next/navigation'
import {useToast} from "@/components/ui/use-toast";

function CommentLogin() {
    const [session, setSession] = React.useState<User>()
    const pathname = usePathname()
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const LoginWithGoogleHandler = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: location.origin + "/auth/callback?next=" + pathname
            }
        })
        router.refresh()
    }
    const LogOutWithGoogleHandler = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    const readSession = async () => {
        const {data, error} = await supabase.auth.getSession()
        if (data) {
            // @ts-ignore
            setSession(data.session?.user)
        }
    }
    useEffect(() => {
            readSession()
        },
        [])
    return (
        <div className='mt-10'>
                <div className='flex items-center justify-between py-4'>
                    {
                        session?.role === 'authenticated' ?
                            <div className='flex items-center gap-5'>
                                <Avatar>
                                    <AvatarImage src={session?.user_metadata?.avatar_url}/>
                                    <AvatarFallback>
                                        <AvatarImage src="https://github.com/shadcn.png"/>
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className='text-light-500 font-spaceGrotesk max-md:text-[12px]'><span
                                    className='text-green-500'>Assalam-o-Alikum</span>, {session?.user_metadata?.full_name} Now
                                    you can write a comments</h3>

                            </div> : <h4 className='text-dark-100 font-semibold  dark:text-light-500'>Login to write a
                                comment</h4>
                    }
                    <div className='flex gap-3'>
                        {
                            session?.role === 'authenticated' ?
                                <div className='flex gap-3 items-center cursor-pointer' onClick={LogOutWithGoogleHandler}>
                                    <span className='font-spaceGrotesk text-dark-100 font-semibold  max-md:hidden dark:text-light-500'>Log Out</span>
                                    <ExitIcon  className=' dark:invert'/>
                                </div>: <>
                                    <Image src='/assets/google_icon.svg' onClick={LoginWithGoogleHandler} alt='google_icon'
                                           width={20} height={20} className='cursor-pointer'/>
                                    <Image src='/assets/fb_icon.svg' alt='google_icon' width={20} height={20}/>
                                </>
                        }

                            </div>
                    </div>

        </div>
    );
}

export default CommentLogin;