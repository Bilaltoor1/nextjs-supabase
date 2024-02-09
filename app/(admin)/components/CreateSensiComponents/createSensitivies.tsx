"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
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
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import useDarkMode from "@/components/DarkMode/DarkLightController";
import {formSchema} from "@/constant/validation/SensitiviesSchemaValidation";
import {defaultValues} from "@/constant/validation/SensitiviesDefualtValues";


export function CreateSensitivies({uuid }: { uuid: string  }) {
    const supabase = createSupabaseBrowserClient();
    const [colorTheme, setTheme] = useDarkMode()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(uuid)
        // Do something with the form values.
        console.log(values)
        // ✅ This will be type-safe and validated.
       const sensitivies =  {
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

       await supabase.from('sensitivities').insert(sensitivies)
    }

    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className=' flex flex-wrap gap-4'>
                        <FormField

                            control={form.control}
                            name="tpp_no_scope"
                            render={({field}) => (
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>tpp_no_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>fpp_no_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>red_dot</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>2x_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>3x_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>4x_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>6x_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>8x_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_tpp_no_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_fpp_no_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_red_dot</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_2x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_3x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_4x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_6x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>ads_8x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_tpp_no_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_fpp_no_scope</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_red_dot</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_2x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_3x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_4x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_6x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>gyro_8x</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>freelook_camera_tpp</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>freelook_camera_parachuting</FormLabel>
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
                                <FormItem className='xl:w-[15%] lg:w-[30%] md:w-[40%] w-[80%]'>
                                    <FormLabel>freelook_camera_fpp_character</FormLabel>
                                    <FormControl>
                                        <Input placeholder="freelook_camera_fpp_character" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button type="submit" className='bg-black text-white'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}
