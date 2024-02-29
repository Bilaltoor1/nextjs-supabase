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
import {EyeOpenIcon, Pencil1Icon} from "@radix-ui/react-icons";
import DeleteAlert from "@/app/(admin)/components/DashboardMain/DeleteAlert";
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import {useRouter} from "next/navigation";

function DataTableForSensitivity({data}: { data: any[] }) {
    const supabase = createSupabaseBrowserClient()
    const router = useRouter()

    return (
        <div>
            <Table className='w-full overflow-x-scroll rounded border'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='min-w-[250px] text-dark300_light700 font-bold'>Device name</TableHead>
                        <TableHead className='w-[150px] text-dark300_light700 font-bold'>Thumbnail</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 font-bold text-center'>is_Published</TableHead>
                        <TableHead className='w-[100px] text-dark300_light700 font-bold text-center'>Comments</TableHead>
                        <TableHead className="text-right w-[100px] text-dark300_light700 font-bold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((sensitivity, index) => {
                            async function onSubmitHandler() {
                                const {data} = await supabase.auth.getSession();
                                const response = await fetch("/api/is_published/is_published_sensitivity", {
                                    method: "PATCH",
                                    headers: {
                                        "Contet-type": "application/json",
                                        "Authorization": `Bearer ${data.session?.access_token}`
                                    },
                                    body: JSON.stringify({
                                        id: sensitivity.id,
                                        is_published: !sensitivity.is_published
                                    }),
                                });
                                router.refresh()
                                return JSON.stringify(response);
                            }

                            return (
                                <TableRow key={sensitivity.id}>
                                    <TableCell
                                        className="font-medium text-dark300_light700">{sensitivity.device_name}</TableCell>
                                    <TableCell>
                                        <Image src={sensitivity?.thumbnail_url} alt='thumbnail img' width={100}
                                               height={100}/>
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox"
                                                   checked={sensitivity.is_published}
                                                   onChange={onSubmitHandler}  className="sr-only peer"/>
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
                                        <Link href={`/dashboard/get-comments-table/${sensitivity.slug}`}
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
                                                                 className='dark:bg-black bg-white'>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className='text-dark300_light700'
                                                                  onClick={() => navigator.clipboard.writeText(sensitivity.id)}
                                                >
                                                    Sensitivity ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem>
                                                    <Link href={`/dashboard/update-Sensitivity/${sensitivity.slug}`}
                                                          className='flex text-dark300_light700 items-center justify-center gap-3'>
                                                        <Pencil1Icon/>
                                                        Edit
                                                    </Link></DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={`/sensitivity/${sensitivity.slug}`}
                                                          className='flex text-dark300_light700 items-center justify-center gap-3'>
                                                        <EyeOpenIcon/>
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <DeleteAlert id={sensitivity.id} slug={sensitivity.slug}/>
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

export default DataTableForSensitivity;