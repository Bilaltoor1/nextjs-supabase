import {Slider} from "@/components/ui/slider"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function ADSSensitivity({sensitivity}: any) {


    return (
        <div
            className='bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 h-full rounded-xl p-4 mt-8'>
            <h2 className='h3-bold mb-3'>ADS Sensitivity</h2>
            {/* SLIDER AND TEXT CONTAINER */}
            <Tabs defaultValue="disable" className="">
                <TabsList className='gap-1'>
                    <TabsTrigger value="enable"
                                 className='bg-light-850 focus:bg-dark-300 focus:text-white '>Enable</TabsTrigger>
                    <TabsTrigger value="disable"
                                 className='bg-light-850  focus:bg-dark-300 focus:text-white  '>Disable</TabsTrigger>
                </TabsList>
                <TabsContent value="enable">
                    <div className='flex flex-wrap  md:flex-row flex-col  gap-5 xs:space-x-6'>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>TPP No Scope</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_tpp_no_scope}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_tpp_no_scope]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>FPP No Scope</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_fpp_no_scope}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_fpp_no_scope]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>Red Dot</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_red_dot}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_red_dot]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>2x Scope</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_2x}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_2x]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>3x Scope</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_3x}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_3x]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>4x Scope</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_4x}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_4x]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>6x Scope</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_6x}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_6x]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                        <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>8x Scope</p> <p
                                className='text-[13px] font-bold'>{sensitivity.ads_8x}</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider value={[sensitivity.ads_8x]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value='disable'>

                </TabsContent>
            </Tabs>
        </div>
    )
}
