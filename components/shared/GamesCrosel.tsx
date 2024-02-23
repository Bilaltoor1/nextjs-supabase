'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

export default function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
            <CarouselContent className='w-full h-[300px] md:h-[400px]'>
                {
                    [1, 2, 3, 4].map((i) => (
                        <CarouselItem key={i}>
                            <div className='w-full h-[300px] md:h-full relative'>
                                <Image src='/banner.jpeg' alt='Banner Img' width={1920} height={300}
                                       className='w-full h-full  object-cover absolute rounded-2xl  max-md:h-[300px]'/>
                            </div>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
        </Carousel>

    )
}
