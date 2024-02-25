import {Slider} from "@/components/ui/slider"

export default function CameraFreeLook({sensitivity} : any) {

    return (
        <div className='bg-gradient-to-r from-orange-300 to-rose-300 h-full rounded-xl p-4 mt-8'>
            <h2 className='h3-bold mb-3'>Camera ( Free Look )</h2>
            {/* SLIDER AND TEXT CONTAINER */}
            <div className='flex flex-wrap  md:flex-row flex-col  gap-5 xs:space-x-6'>

                <div className='flex flex-col  md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>TPP (Character , Vehicle)</p> <p
                        className='text-[13px] font-bold'>{sensitivity.freelook_camera_tpp}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity.freelook_camera_tpp]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col  md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>Camera (Parachuting)</p> <p
                        className='text-[13px] font-bold'>{sensitivity.freelook_camera_parachuting}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity.freelook_camera_parachuting]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>
                <div className='flex flex-col  md:w-[400px] xs:w-[300px] w-full  xs:ml-6'>
                    {/*NAME OF THE SITTING */}
                    <div className='flex justify-between'>
                        <p className='text-[13px] font'>FPP (character)</p> <p
                        className='text-[13px] font-bold'>{sensitivity.freelook_camera_fpp_character}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold text-[18px]'>+</span>
                        <Slider value={[sensitivity.freelook_camera_fpp_character]} max={400} step={1}/>
                        <span className='w-[10px] h-1 bg-black'></span>
                    </div>
                </div>

            </div>

        </div>
    )
}
