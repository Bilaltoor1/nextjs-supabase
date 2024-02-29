'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import Link from "next/link";
import {EyeOpenIcon, Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import {useRouter} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import React from "react";

function DataTableForGamesAndApps({data}: { data: any[] }) {
    const supabase = createSupabaseBrowserClient()
    const router = useRouter()

    return (
        <div>
            <Table className='w-full overflow-x-scroll rounded border'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='min-w-[250px] text-dark300_light700 font-bold'>App name</TableHead>
                        <TableHead className='min-w-[150px] w-[150px] text-dark300_light700 font-bold'>App Icon</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 font-bold text-center'>is_Published</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 font-bold text-center'>Category</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 font-bold text-center'>Sub_Category</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 font-bold text-center'>Comments</TableHead>
                        <TableHead className="text-right w-[100px] text-dark300_light700 font-bold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((app) => {
                            async function updateIsPublishedHandler() {
                                const {data} = await supabase.auth.getSession();
                                const response = await fetch("/api/is_published/is_published_game_and_app", {
                                    method: "PATCH",
                                    headers: {
                                        "Contet-type": "application/json",
                                        "Authorization": `Bearer ${data.session?.access_token}`
                                    },
                                    body: JSON.stringify({
                                        id: app.id,
                                        is_published: !app.is_published
                                    }),
                                });
                                const result = await response.json()
                                router.refresh()
                                return JSON.stringify(response);
                            }
                            async function deleteGameAndAppHandler() {
                                const {data} = await supabase.auth.getSession();
                                const response = await fetch("/api/create-apps", {
                                    method: "DELETE",
                                    headers: {
                                        "Contet-type": "application/json",
                                        "Authorization": `Bearer ${data.session?.access_token}`
                                    },
                                    body: JSON.stringify({
                                        id: app.id,
                                    }),
                                });
                                const result = await response.json()
                                console.log(result)
                                router.refresh()
                                return JSON.stringify(response);
                            }
                            return (
                                <TableRow key={app.id}>
                                    <TableCell
                                        className="font-medium text-dark300_light700">{app.name}</TableCell>
                                    <TableCell width='150px'>
                                           <Image src={app?.app_game_icon} alt={app.name} width={100} height={80} className='w-[100px] h-[70px] object-fit'
                                                  />
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox"
                                                   checked={app.is_published}
                                                   onChange={updateIsPublishedHandler}  className="sr-only peer"/>
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

                                    <TableCell align='left' className='text-dark300_light700'>
                                        <Badge variant="outline" className='w-fit mt-1 px-3 bg-green-500 text-center'>{app.category}</Badge>
                                    </TableCell>
                                    <TableCell align='center' className='text-dark300_light700'>
                                        <Badge variant="outline" className='w-fit mt-1 px-3 bg-red-500'>{app.sub_category}</Badge>

                                    </TableCell>
                                    <TableCell align='left' className='text-dark300_light700'>
                                        <Link href={`/dashboard/get-comments-table-for-apps/${app.slug}`}
                                              className='flex text-dark300_light700 items-center justify-center gap-3'>
                                            <EyeOpenIcon/>
                                            Comments
                                        </Link>
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
                                                                  onClick={() => navigator.clipboard.writeText(app.id)}
                                                >
                                                    Sensitivity ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem>
                                                    <Link href={`/dashboard/update-game-app/${app.slug}`}
                                                          className='flex text-dark300_light700 items-center justify-center gap-3'>
                                                        <Pencil1Icon/>
                                                        Edit
                                                    </Link></DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={`/games/${app.slug}`}
                                                          className='flex text-dark300_light700 items-center justify-center gap-3'>
                                                        <EyeOpenIcon/>
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Button onClick={deleteGameAndAppHandler} className="flex gap-2 items-center text-dark300_light700" variant="outline">
                                                        <TrashIcon />
                                                        Delete
                                                    </Button>
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

export default DataTableForGamesAndApps;