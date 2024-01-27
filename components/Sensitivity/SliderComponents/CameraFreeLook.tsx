import {Slider} from "@/components/ui/slider"

export default function CameraFreeLook({sensitivity} : any) {

    return (
        <div className='bg-gradient-to-r from-orange-300 to-rose-300 h-full rounded-xl p-4 mt-8'>
            <h2 className='h3-bold mb-3'>Camera ( Free Look )</h2>
            {/* SLIDER AND TEXT CONTAINER */}
            <div className='flex flex-wrap  md:flex-row flex-col  gap-5 space-x-6'>
                {
                    sensitivity.map((item : any)=> (
                        <div className='flex flex-col md:w-[400px] w-[300px] ml-6' key={item.scope}>
                            {/*NAME OF THE SITTING */}
                            <div className='flex justify-between'>
                                <p className='text-[13px] font'>{item.scope}</p> <p
                                className='text-[13px] font-bold'>{item.sensitivity.camera}</p>
                            </div>
                            {/*SLIDER COMPONENT */}
                            <div className='flex gap-2 items-center'>
                                <span className='font-bold text-[18px]'>+</span>
                                <Slider  value={[item.sensitivity.camera]} max={400} step={1}/>
                                <span className='w-[10px] h-1 bg-black'></span>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
