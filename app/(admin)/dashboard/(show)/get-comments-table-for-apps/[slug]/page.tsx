'use client'
import React, {Suspense, useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {TrashIcon} from "@radix-ui/react-icons";

import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import {useParams, useRouter} from "next/navigation";
import {
    deleteSingleComment,
    deleteSingleCommentFromGameAndApps,
    getCommentsForGamesAndApps
} from "@/lib/actions/GetSensitivities.action";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

function page() {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const supabase = createSupabaseBrowserClient()
    const router = useRouter()
    const getCommentsHandler = async (slug: string) => {
        setLoading(true)
        const {comments} = await getCommentsForGamesAndApps(slug, 10)
        // @ts-ignore
        setComments(comments)
        setLoading(false)
    }
    useEffect(() => {
        // @ts-ignore
        getCommentsHandler(params.slug)
    }, []);
    return (
        <div>
            <Table className='w-full overflow-x-scroll rounded border'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px] text-dark300_light700'>id</TableHead>
                        <TableHead className='min-w-[150px] text-dark300_light700'>content</TableHead>
                        <TableHead className='w-[150px] text-dark300_light700 text-center'>User Image</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 text-center'>is_Published</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 text-center'>user_name</TableHead>
                        <TableHead className="text-right w-[100px] text-dark300_light700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? <div>Loading...</div> : comments?.map((comment: any, index) => {
                        async function onSubmitHandler() {
                            const {data} = await supabase.auth.getSession();
                            const response = await fetch("/api/is_published/is_published_comments_for_apps", {
                                method: "PATCH",
                                headers: {
                                    "Contet-type": "application/json",
                                    "Authorization": `Bearer ${data.session?.access_token}`
                                },
                                body: JSON.stringify({
                                    id: comment.id,
                                    is_published: !comment.is_published
                                }),
                            });
                            router.refresh()
                            return JSON.stringify(response);
                        }
                        return (
                            <TableRow key={comment?.id}>
                                <TableCell
                                    className="font-medium text-dark300_light700">{comment.id}</TableCell>
                                <TableCell>
                                    {comment.content}
                                </TableCell>
                                <TableCell align='center'>
                                    <Avatar>
                                        <AvatarImage src={comment.user_img} alt="Avatar"/>
                                        <AvatarFallback>
                                  <span className="inline-block h-full w-full overflow-hidden rounded-full bg-gray-100">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                      <path
                                          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                    </svg>
                                  </span>
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox"
                                               onChange={onSubmitHandler}
                                               checked={comment.is_published}
                                               className="sr-only peer"/>
                                        <div
                                            className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300
                                                 after:duration-500 sm:w-10 sm:h-10 w-8 h-8 shadow-md peer-checked:bg-emerald-500
                                                  peer-focus:outline-none  after:content-['✖️'] after:rounded-full
                                                   after:absolute after:outline-none sm:after:h-8 sm:after:w-8 after:h-6 after:w-6 after:bg-gray-50
                                                    after:top-1 after:left-1 after:flex after:justify-center after:items-center
                                                     peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180
                                                      peer-checked:after:rotate-0">
                                        </div>
                                    </label>
                                </TableCell>
                                <TableCell>
                                    {comment.user_name}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-dark300_light700">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end"
                                                             className='background-light800_darkgradient'>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem className='text-dark300_light700'
                                                              onClick={() => navigator.clipboard.writeText(comment.id)}
                                            >
                                                Sensitivity ID
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem>
                                                <div className='flex gap-3 cursor-pointer justify-center items-center'
                                                     onClick={async () => {
                                                         await deleteSingleCommentFromGameAndApps(comment.id);
                                                         router.refresh();
                                                     }}>
                                                    <TrashIcon/>
                                                    Delete
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })
                    }
                </TableBody>

            </Table>

        </div>
    );
}

export default page;