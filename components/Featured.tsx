import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/WeaponCarousel"
import Image from 'next/image'
import { ceaser } from '@/app/font'


const Featured = () => {
    return (
        <div className='container max-w-[1800px] px-5 md:px-0'>
            <span className=" text-3xl text-center whitespace-nowrap lg:text-6xl">
                <h3 className={ceaser.className}>Featured loadouts</h3>
            </span>
            <Carousel className='mt-16 flex-col'>
                <CarouselContent>
                    <CarouselItem>
                        <Image
                            src="/build.png"
                            alt="AK"
                            width={800}
                            height={800}
                            className="mx-auto border-2"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src="/build.png"
                            alt="AK"
                            width={800}
                            height={800}
                            className="mx-auto border-2"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src="/build.png"
                            alt="AK"
                            width={800}
                            height={800}
                            className="mx-auto border-2"
                        />
                    </CarouselItem>
                </CarouselContent>
                <div className='hidden lg:block'>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
                <div className='flex items-center justify-center mt-10 lg:hidden'>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    )
}

export default Featured