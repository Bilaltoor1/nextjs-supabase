import Image from "next/image";
import SensitivityCard from "@/components/Sensitivity/SensitivityCard"
import Link from "next/link";
import {Button} from "@/components/ui/Animated-button";
import CarouselPlugin from "@/components/shared/GamesCrosel";

export const metadata = {
    title: 'Home',
    description: "Game store is excellent website for mod games lovers and who wants to play with unlimited resources. we are also providing the paid games in free and also provide the Sensitivity for all the mobile device to boost your pubg mobile game experience so that you can play like a pro player.",

};

async function Page() {
    const data = await fetch(process.env.URL + '/api/topfour');
    const response = await data.json();
    return (
        <div>
            <CarouselPlugin/>
            <div>
                <h1 className='h2-bold text-dark300_light700 my-6'>Recent Sensitivity : </h1>
                <SensitivityCard sensitivity_device={response.response.data}/>
                <div className='flex justify-center mt-10'>
                    <Link href='/sensitivity'
                    >
                        <Button borderRadius='.5rem' borderClassName='hidden'
                                className='bg-["#777"] dark:dark-gradient text-black dark:text-white border-neutral-200 dark:border-slate-800'>View
                            More</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;