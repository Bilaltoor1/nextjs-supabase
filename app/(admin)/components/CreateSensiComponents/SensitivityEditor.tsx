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
import {Input} from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox";
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import React, {useRef, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {SparklesIcon} from "lucide-react";
import slugify from "slugify";
import {defaultValues} from "@/constant/validation/SensitiviesDefualtValues";
import {formSchema} from "@/constant/validation/SensitiviesSchemaValidation";
import {useRouter} from "next/navigation";
import Image from "next/image";

export function SensitivityEditor() {
    const [img, setImg] = useState('')
    const [mobileIcon, setMobileIcon] = useState('')
    const [uuid, setUuid] = useState('')
    const supabase = createSupabaseBrowserClient();
    const editorRef = useRef('');
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {data} = await supabase.auth.getSession();
        const uuid = crypto.randomUUID();
        setUuid(uuid)
        const sensitivity_device_description = {
            id: uuid,
            slug: values.slug,
            device_name: values.device_name,
            intro: values.intro,
            gyroscope: false,
            camera: values.camera,
            ads: values.ads,
            claws: values.claws,
            ram: values.ram,
            rom: values.rom,
            proccessor: values.proccessor,
            screen_resolution: values.screen_resolution,
            intro_text: values.intro_text,
            // @ts-ignore
            explanation: editorRef.current.getContent() || '',
            thumbnail_url: img,
            mobile_icon_url: mobileIcon
        }

        const sensitivities = {
            device_id: uuid,
            tpp_no_scope: values.tpp_no_scope,
            fpp_no_scope: values.fpp_no_scope,
            red_dot: values.red_dot,
            '2x_scope': values['2x_scope'],
            '3x_scope': values['3x_scope'],
            '4x_scope': values['4x_scope'],
            '6x_scope': values['6x_scope'],
            '8x_scope': values['8x_scope'],
            ads_tpp_no_scope: values.ads_tpp_no_scope,
            ads_fpp_no_scope: values.ads_fpp_no_scope,
            ads_red_dot: values.ads_red_dot,
            ads_2x: values.ads_2x,
            ads_3x: values.ads_3x,
            ads_4x: values.ads_4x,
            ads_6x: values.ads_6x,
            ads_8x: values.ads_8x,
            gyro_tpp_no_scope: values.gyro_tpp_no_scope,
            gyro_fpp_no_scope: values.gyro_fpp_no_scope,
            gyro_tpp_red_dot: values.gyro_red_dot,
            gyro_2x: values.gyro_2x,
            gyro_3x: values.gyro_3x,
            gyro_4x: values.gyro_4x,
            gyro_6x: values.gyro_6x,
            gyro_8x: values.gyro_8x,
            freelook_camera_tpp: values.freelook_camera_tpp,
            freelook_camera_parachuting: values.freelook_camera_parachuting,
            freelook_camera_fpp_character: values.freelook_camera_fpp_character,
        }


        await fetch("/api/sensitivity", {
            method: "POST",
            headers: {
                "Contet-type": "application/json",
                 "Authorization": `Bearer ${data.session?.access_token}`
            },
            body: JSON.stringify([sensitivity_device_description, sensitivities]),
        });
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4 max-w-[1280px] m-auto'>
            <Input
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

                        setImg(
                            response.url
                        );
                    }
                }}
            />
            {
                img ? <Image src={img} alt='nothing' width={400} height={400}/> :
                    <Image src='/placeholder.png' alt='nothing' width={400} height={400}/>
            }

            <Input
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

                        setMobileIcon(
                            response.url
                        );
                    }
                }}
            />
            {
                img ? <Image src={mobileIcon} alt='nothing' width={400} height={400}/> :
                    <Image src='/placeholder.png' alt='nothing' width={400} height={400}/>
            }
            <Form {...form}>
                <form className="space-y-8">
                    <div className=' flex flex-wrap justify-between  gap-4'>
                        <FormField
                            control={form.control}
                            name="device_name"
                            render={({field}) => (
                                <FormItem className='xl:w-[45%] md:w-[40%] sm:w-full w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>device_name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="device_name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ram"
                            render={({field}) => (
                                <FormItem className='xl:w-[45%] md:w-[40%] sm:w-full w-full'>
                                    <FormLabel className='text-dark500_light500 font-bold text-[13px]'>ram</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ram" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rom"
                            render={({field}) => (
                                <FormItem className='xl:w-[45%] md:w-[40%] sm:w-full w-full'>
                                    <FormLabel className='text-dark500_light500 font-bold text-[13px]'>rom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="rom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({field}) => (
                                <FormItem className="xl:w-[45%] md:w-[40%] sm:w-full w-full">
                                    <FormLabel className='text-dark500_light500 font-bold text-[13px]'>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Slug"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() =>
                                                field.onChange(slugify(form.getValues("device_name")))
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
                        <FormField
                            control={form.control}
                            name="proccessor"
                            render={({field}) => (
                                <FormItem className='xl:w-[45%] md:w-[40%] sm:w-full w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>proccessor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="proccessor" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}

                        />
                        <FormField
                            control={form.control}
                            name="screen_resolution"
                            render={({field}) => (
                                <FormItem className='xl:w-[45%] md:w-[40%] sm:w-full w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>screen-resolution</FormLabel>
                                    <FormControl>
                                        <Input placeholder="screen-resolution" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="intro_text"
                            render={({field}) => (
                                <FormItem className='w-full'>
                                    <FormLabel className='text-dark500_light500 font-bold text-[13px]'>Intro
                                        Text</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write Into Here.." {...field}  />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        <FormField
                            control={form.control}
                            name="intro"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className='text-dark500_light500 font-bold text-[13px]'>
                                            Intro
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ads"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className='text-dark500_light500 font-bold text-[13px]'>
                                            Ads
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="camera"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className='text-dark500_light500 font-bold text-[13px]'>
                                            Camera
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gyroScope"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className='text-dark500_light500 font-bold text-[13px]'>
                                            Gyroscope
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className=' flex flex-wrap gap-4'>
                        <FormField

                            control={form.control}
                            name="tpp_no_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>tpp_no_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="tpp_no_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fpp_no_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>fpp_no_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="fpp_no_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="red_dot"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>red_dot</FormLabel>
                                    <FormControl>
                                        <Input placeholder="red_dot" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="2x_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>2x_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="2x_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="3x_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>3x_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="3x_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="4x_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>4x_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="4x_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="6x_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>6x_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="6x_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="8x_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>8x_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="8x_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_tpp_no_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_tpp_no_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_tpp_no_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_fpp_no_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_fpp_no_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_fpp_no_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_red_dot"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_red_dot</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_red_dot" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_2x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_2x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_2x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_3x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_3x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_3x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_4x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_4x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_4x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_6x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_6x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_6x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="ads_8x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>ads_8x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ads_8x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_tpp_no_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_tpp_no_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_tpp_no_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_fpp_no_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_fpp_no_scope</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_fpp_no_scope" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_red_dot"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_red_dot</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_red_dot" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_2x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_2x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_2x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_3x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_3x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_3x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_4x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_4x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_4x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_6x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_6x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_6x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="gyro_8x"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>gyro_8x</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gyro_8x" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="freelook_camera_tpp"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>freelook_camera_tpp</FormLabel>
                                    <FormControl>
                                        <Input placeholder="freelook_camera_tpp" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="freelook_camera_parachuting"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>freelook_camera_parachuting</FormLabel>
                                    <FormControl>
                                        <Input placeholder="freelook_camera_parachuting" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField

                            control={form.control}
                            name="freelook_camera_fpp_character"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[45%] md:w-[40%] w-full'>
                                    <FormLabel
                                        className='text-dark500_light500 font-bold text-[13px]'>freelook_camera_fpp_character</FormLabel>
                                    <FormControl>
                                        <Input placeholder="freelook_camera_fpp_character" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormField
                        control={form.control}
                        name="explanation"
                        render={({field}) => (
                            <FormItem className="flex lg:w-full w-full flex-col gap-3">
                                <FormLabel className="paragraph-semibold text-dark400_light800">
                                    Detailed explanation of your problem?{" "}
                                    <span className="text-primary-500">*</span>
                                </FormLabel>
                                <FormControl className="mt-3.5">
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
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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
                    <Button onClick={form.handleSubmit(onSubmit)}
                            className='bg-black text-white dark:bg-light-850 dark:text-dark-100'>Submit data</Button>
                </form>
            </Form>
        </div>
    )
}
