import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { ceaser } from '@/app/font'


const Featured = () => {
    return (
        <div className='container max-w-[1200px] px-20 md:px-0'>
            <span className=" text-3xl text-center whitespace-nowrap  lg:text-6xl">
                <h3 className={ceaser.className}>Featured loadouts</h3>
            </span>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>  <Image
                        src="/build.png"
                        alt="AK"
                        width={800}
                        height={800}
                        className="mx-auto border-2"
                    /></CarouselItem>
                    <CarouselItem>  <Image
                        src="/build.png"
                        alt="AK"
                        width={800}
                        height={800}
                        className="mx-auto border-2"
                    /></CarouselItem>
                    <CarouselItem>  <Image
                        src="/build.png"
                        alt="AK"
                        width={800}
                        height={800}
                        className="mx-auto border-2"
                    /></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Featured