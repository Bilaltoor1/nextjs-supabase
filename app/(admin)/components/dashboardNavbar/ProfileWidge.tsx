'use client'
import React, {useEffect, useState} from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {createSupabaseBrowserClient} from '@/lib/supabase/BrowserClient'
import {HomeIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {User} from "@supabase/supabase-js";
import Link from "next/link";
import {LogOutIcon, Pencil, PenIcon, UserIcon} from "lucide-react";
import {useRouter} from "next/navigation";

 function ProfileWidge() {

     const [user, setUser] = useState<User>()
     const router = useRouter()
     const supabaseClient =  createSupabaseBrowserClient()
     const getUser =async () => {
         const {data , error} = await supabaseClient.auth.getUser()
         // @ts-ignore
         setUser(data.user)

     }
     const LogOutWithGoogleHandler = async () => {
         await supabaseClient.auth.signOut()
         router.refresh()
     }
     useEffect(() => {
         getUser()
     }, [])
    return (
        <div>
            <Menubar className='border-none'>
                <MenubarMenu>
                    <MenubarTrigger className='w-full cursor-pointer bg-none rounded-full'>
                        <Avatar>
                            <AvatarImage src={user?.user_metadata.avatar_url}/>
                            <AvatarFallback>
                                <AvatarImage src="https://github.com/shadcn.png"/>
                            </AvatarFallback>
                        </Avatar>

                    </MenubarTrigger>
                    <MenubarContent className='background-light900_dark200 text-dark100_light900 border-b-gray-400'>
                        <MenubarItem>
                        <Link href='/dashboard/create-sensitivity'>Create New</Link> <MenubarShortcut><Pencil width={13} height={13}/></MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem className='flex gap-1.5'>
                            <Link href='/'>Home</Link> <MenubarShortcut><HomeIcon/></MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem className='flex gap-1.5'>
                            <Link href='/dashboard'>Dashboard</Link> <MenubarShortcut><UserIcon width={13} height={13}/></MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem className='cursor-pointer' onClick={LogOutWithGoogleHandler}>Logout <MenubarShortcut><LogOutIcon width={13} height={13}/></MenubarShortcut></MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

        </div>
    );
}

export default ProfileWidge;