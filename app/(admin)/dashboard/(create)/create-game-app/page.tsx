"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Editor} from '@tinymce/tinymce-react';
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import React, {useRef, useState} from "react";
import {SparklesIcon, ImageIcon} from "lucide-react";
import slugify from "slugify";
import {GamesAndAppsValidation} from "@/constant/validation/GamesAndAppsValidation";
import {useRouter} from "next/navigation";
import Image from "next/image";
import useDarkMode from "@/components/DarkMode/DarkLightController";
import {gamesAndAppsDefaultValues} from "@/constant/validation/GamesAndAppsDefaultValues";
import {Textarea} from "@/components/ui/textarea";
import {categoriesWithLabels} from "@/constant/constant";
import {CreateGameAndAppAction} from "@/lib/actions/CreateGamesApps.action";
import {revalidatePath} from "next/cache";

export default function page() {
    const [thumbnail, setThumbnail] = useState('')
    const [screenShot, setScreenShot] = useState<any>([])
    const [screenShotUrl, setScreenShotUrl] = useState<any>([])
    const [appIcon, setAppIcon] = useState('')
    const supabase = createSupabaseBrowserClient();
    const editorRef = useRef('');
    const router = useRouter();
    const form = useForm<z.infer<typeof GamesAndAppsValidation>>({
        resolver: zodResolver(GamesAndAppsValidation),
        defaultValues: gamesAndAppsDefaultValues,
    })
    const [colorTheme, setTheme] = useDarkMode()
    async function onSubmit(values: z.infer<typeof GamesAndAppsValidation>) {

        const apps_data = {
            thumbnail: thumbnail,
            app_game_icon: appIcon,
            //@ts-ignore
            explanation: editorRef.current.getContent() || '',
            download_link: values.download_link,
            screenshots: screenShotUrl,
            name: values.name,
            slug: values.slug,
            size: values.app_game_size,
            version: values.apps_game_version,
            category: values.category,
            sub_category: values.sub_category,
            description: values.description,
            download_count: '0',
        }
        console.log(apps_data)
        const response = await CreateGameAndAppAction({appsData: apps_data})
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4 max-w-[1280px] m-auto'>
            <p className='text-dark500_light500 font-bold text-[13px] w-full'>App Icon Image</p>
            <Input className='background-light800_darkgradient text-dark500_light500 dark:border-none'
                   id="picture"
                   type="file"
                   onChange={async (e) => {
                       let files = (e.target as HTMLInputElement).files;

                       if (files && files?.length > 0) {
                           const file = files[0];
                           console.log(file)
                           const response = await fetch("/api/upload", {
                               method: "POST",
                               headers: {
                                   "Content-type": file.type,
                                   "X-Vercel-Filename": file.name,
                               },
                               body: file,
                           }).then((res) => res.json());

                           setThumbnail(
                               response.url
                           );
                       }
                   }}
            />
            {
                thumbnail ? <Image src={thumbnail} alt='nothing' width={400} height={400}/> :
                    <ImageIcon width='150' height='150' className='dark:invert'/>
            }
            <p className='text-dark500_light500 font-bold text-[13px] w-full'>Thumbnail Image</p>
            <Input className='background-light800_darkgradient text-dark500_light500 dark:border-none'
                   id="picture"
                   type="file"
                   onChange={async (e) => {
                       let files = (e.target as HTMLInputElement).files;

                       if (files && files?.length > 0) {
                           const file = files[0];
                           const response = await fetch("/api/upload", {
                               method: "POST",
                               headers: {
                                   "Content-type": file.type,
                                   "X-Vercel-Filename": file.name,
                               },
                               body: file,
                           }).then((res) => res.json());

                           setAppIcon(
                               response.url
                           );
                       }
                   }}
            />
            {
                thumbnail ? <Image src={appIcon} alt='nothing' width={400} height={400}/> :
                    <ImageIcon width='150' height='150' className='dark:invert'/>
            }
            <p className='text-dark500_light500 font-bold text-[13px] w-full'>ScreenShots</p>
            <Input
                className='background-light800_darkgradient text-dark500_light500 dark:border-none'
                id="pictures"
                type="file"
                multiple
                onChange={async (e) => {
                    let files = (e.target as HTMLInputElement).files;

                    if (files && files?.length > 0) {
                        const urls = [];  // Array to store uploaded image URLs
                        //@ts-ignore
                        for (const file of files) {
                            const response = await fetch("/api/upload", {
                                method: "POST",
                                headers: {
                                    "Content-type": file.type,
                                    "X-Vercel-Filename": file.name,
                                },
                                body: file,
                            }).then((res) => res.json());

                            urls.push(response.url);  // Store the URL in the array
                        }

                        setScreenShotUrl(urls);  // Set the array of URLs
                    }
                }}
            />
            <div className='flex gap-3'>
                {screenShotUrl.length > 0 ? (
                    screenShotUrl.map((url: any, index: any) => (
                        <Image key={index} src={url} alt={`Image ${index}`} width={100} height={100}/>
                    ))
                ) : (
                    [1, 2, 3, 4].map((index) => (
                            <Image key={index} src='/deme-img.svg' alt='images' width={100} height={100}/>
                        )
                    )
                )}
            </div>
            <Form {...form}>
                <form className="space-y-8 w-full">
                    <div className=' flex flex-wrap justify-between  gap-4'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className='w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>Game or App
                                        name</FormLabel>
                                    <FormControl>
                                        <Input className='background-light800_darkgradient dark:border-none'
                                               placeholder="game_apps_name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel className='text-dark500_light500 font-bold text-[13px]'>Slug</FormLabel>
                                    <FormControl>
                                        <Input className='background-light800_darkgradient dark:border-none'
                                               placeholder="Slug"
                                               {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 background-light800_darkgradient text-dark500_light500 "
                                            onClick={() =>
                                                field.onChange(slugify(form.getValues("name")))
                                            }
                                        >
                                            <SparklesIcon className="mr-2 h-4 w-4"/>
                                            Generate Slug
                                        </Button>
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className=' flex flex-wrap gap-4 w-full'>
                            <FormField
                                control={form.control}
                                name="apps_game_version"
                                render={({field}) => (
                                    <FormItem className='w-full md:w-[48%]'>
                                        <FormLabel
                                            className='text-dark500_light500 font-bold text-[13px]'>apps_game_version</FormLabel>
                                        <FormControl>
                                            <Input className='background-light800_darkgradient dark:border-none'
                                                   placeholder="apps_game_version" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="app_game_size"
                                render={({field}) => (
                                    <FormItem className='w-full md:w-1/2'>
                                        <FormLabel
                                            className='text-dark500_light500 font-bold text-[13px]'>app_game_size</FormLabel>
                                        <FormControl>
                                            <Input className='background-light800_darkgradient dark:border-none'
                                                   placeholder="app_game_size" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem className='w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className='background-light800_darkgradient dark:border-none'
                                                  placeholder="Write description.." {...field}  />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="download_link"
                            render={({field}) => (
                                <FormItem className='w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>download_link</FormLabel>
                                    <FormControl>
                                        <Input className='background-light800_darkgradient dark:border-none'
                                               placeholder="download_link.." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className='flex'>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className='w-[180px]'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" className='w-[180px]'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent
                                                className='background-light800_darkgradient w-[180px] text-dark500_light500'>
                                                <SelectItem value="game">Game</SelectItem>
                                                <SelectItem value="apps">Apps</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sub_category"
                                render={({field}) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className='w-[180px]'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Sub_Category"
                                                                 className='w-[180px]'/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent
                                                className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
                                                <SelectGroup>
                                                    {categoriesWithLabels.map((item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                            className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400">
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    <FormField
                        control={form.control}
                        name="explanation"
                        render={({field}) => (
                            <FormItem className="flex  w-full flex-col gap-3">
                                <FormLabel className="paragraph-semibold text-dark400_light800">
                                    Detailed explanation of your problem?{" "}
                                    <span className="text-primary-500">*</span>
                                </FormLabel>
                                <FormControl className="mt-3.5 ">
                                    <Editor
                                        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                                        onInit={(evt, editor) => {
                                            // @ts-ignore
                                            editorRef.current = editor;
                                        }}
                                        onBlur={field.onBlur}
                                        onEditorChange={(content) => field.onChange(content)}
                                        initialValue={""}
                                        init={{
                                            height: 350,
                                            menubar: false,
                                            plugins: [
                                                "advlist",
                                                "autolink",
                                                "lists",
                                                "link",
                                                "image",
                                                "charmap",
                                                "preview",
                                                "anchor",
                                                "searchreplace",
                                                "visualblocks",
                                                "codesample",
                                                "fullscreen",
                                                "insertdatetime",
                                                "media",
                                                "table",
                                            ],
                                            toolbar:
                                                "undo redo | codesample | formatpainter " + "fontfamily fontsize fontsizeinput typography bold italic forecolor | alignleft aligncenter " +
                                                "alignright alignjustify | bullist numlist",
                                            content_style: "body { font-family:Inter; font-size:16px }",
                                            skin: colorTheme === "dark" ? "oxide-dark" : "oxide",
                                            content_css: colorTheme === "dark" ? "dark" : "light",
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className="body-regular mt-2.5 text-light-500">
                                    Introduce the problem and expand on what you put in the title.
                                    Minimum 20 characters.
                                </FormDescription>
                                <FormMessage className="text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <Button onClick={form.handleSubmit(onSubmit)} className='background-light800_darkgradient text-dark500_light500'>Submit data</Button>
                </form>
            </Form>
        </div>
    )
}
//@ts-ignore