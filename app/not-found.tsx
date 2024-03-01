import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center flex-col justify-center min-h-screen background-light850_dark100">
            <Image alt='Error_svg' src='/404.png' width={300} height={300} className='mb-4 sm:w-[300px] sm:h-[300px] object-cover w-[200px] h-[200px]'/>
            <h1 className="md:text-4xl sm:text-3xl text-2xl  font-bold mb-4">404 - Page Not Found</h1>
            <Link href='/' className='px-4 py-2 font-spaceGrotesk bg-primary-100 rounded-full font-bold '>Go to Home</Link>
        </div>
    )
}