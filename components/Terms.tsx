'use client'

import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

import { termsData } from '@/constants'
import { ceaser } from '@/app/font'

const Terms = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <div className='space-y-20 container px-20'>
            <span className='p-3 text-3xl text-center  lg:text-6xl'>
                <h3 className={ceaser.className}>Need to Know</h3>
            </span>
            <Carousel
                className="max-w-[1000px] mx-auto"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="-ml-1">
                    {termsData.map((term, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className='h-fit md:h-[250px] text-center '>
                                    <CardHeader className='text-3xl'>{term.term}</CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{term.explanation}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default Terms