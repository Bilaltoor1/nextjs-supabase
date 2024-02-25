import {Slider} from "@/components/ui/slider"

export default function CameraSensitivity({sensitivity}: any) {

    return (
        <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-full w-full rounded-xl p-4 mt-8'>
            <h2 className='h3-bold mb-3'>Camera Sensitivity</h2>
            {/* SLIDER AND TEXT CONTAINER */}

            <div className='flex flex-wrap max-xs:w-full  md:flex-row flex-col  gap-5 xs:space-x-6'>
                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>TPP No Scope</p> <p
                        className='text-[13px] font-bold'>{sensitivity['fpp_no_scope']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['fpp_no_scope']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>FPP No Scope</p> <p
                        className='text-[13px] font-bold'>{sensitivity['tpp_no_scope']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['tpp_no_scope']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>

                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>Red Dot</p> <p
                        className='text-[13px] font-bold'>{sensitivity['red_dot']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['red_dot']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>2x Scope</p> <p
                        className='text-[13px] font-bold'>{sensitivity['2x_scope']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['2x_scope']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>3x Scope</p> <p
                        className='text-[13px] font-bold'>{sensitivity['3x_scope']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['3x_scope']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>4x Scope</p> <p
                        className='text-[13px] font-bold'>{sensitivity['4x_scope']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['4x_scope']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>6x Scope</p> <p
                        className='text-[13px] font-bold'>{sensitivity['6x_scope']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['6x_scope']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>8x Scope</p> <p
                        className='text-[13px] font-bold'>{sensitivity['8x_scope']}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity['8x_scope']]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
