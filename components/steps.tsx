import { ceaser } from '@/app/font'
import Image from 'next/image'
import React from 'react'

const Steps = () => {
    return (
        <div className='flex flex-col gap-14'>
            <div className="flex flex-col md:flex-row gap-10 my-auto max-w-{1500px} mx-auto">
                <div className="md:w-1/2">
                    <div className="h-full flex flex-col justify-center text-center">
                        <span className={ceaser.className}>
                            <h3 className="p-3 text-3xl  lg:text-6xl">Take a screenshot of your favourite loadout</h3>
                        </span>
                    </div>
                </div>
                <div className=" md:w-1/2 ">
                    <Image
                        src="/locus-mocckup.jpg"
                        alt="AK"
                        width={1000}
                        height={1000}
                        className="mx-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-10 my-auto max-w-{1500px} mx-auto">
                <div className=" md:w-1/2 ">
                    <Image
                        src="/build.png"
                        alt="AK"
                        width={1000}
                        height={1000}
                        className="mx-auto border-2"
                    />
                </div>
                <div className="md:w-1/2">
                    <div className="h-full flex flex-col justify-center text-center bg-cover bg-center bg-[url('/hero3.jpg')] bg-fixed md:bg-none">
                        <span className={ceaser.className}>
                            <h3 className="p-3 text-3xl  lg:text-6xl ">Share with the CODM community</h3>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Steps