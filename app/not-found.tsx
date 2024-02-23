import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center flex-col justify-center min-h-screen">
            <Image alt='Error_svg' src='/Error1.svg' width={200} height={200} className='mb-4'/>
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <Link href='/' className='px-4 py-2 font-spaceGrotesk bg-primary-100 rounded-full font-bold'>Go to Home</Link>
        </div>
    )
}