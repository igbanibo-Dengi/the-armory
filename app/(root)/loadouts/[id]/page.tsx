import { Badge } from '@/components/ui/badge'
import { getLoadoutId } from '@/lib/actions/loadout.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import { GoDotFill } from "react-icons/go";
import { Separator } from "@/components/ui/separator"


const LoadoutDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {

    const loadout = await getLoadoutId(id)

    return (
        <>
            <div className='container pt-20 max-w-6xl'>
                <div className='flex flex-col lg:flex-row gap-5 md:gap-10 justify-between mx-auto mt-20'>
                    <div className='w-full'>
                        <Image
                            src={loadout.imageUrl}
                            alt="hero image"
                            width={1000}
                            height={500}
                            priority
                            className="h-full  rounded-md"
                        />
                    </div>
                    <div className='w-full md:w-1/2 flex gap-4'>
                        <div className='flex flex-col h-full w-full justify-betweenw-full py-5 whitespace-nowrap'>
                            <div className='space-y-4 my-auto  w-full pb-4'>
                                <p className='flex justify-between items-center'><span className='text-primary'>Title</span> <span>{loadout.title}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Weapon</span> <span>{loadout.weapon}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Category</span> <span> {loadout.category.name}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Mode</span>  <span>{loadout.gameMode}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Creator</span>    <span>{loadout.creator.firstName}</span></p>
                            </div>


                        </div>

                    </div>
                </div>
                <div className='flex flex-col  md:flex-row-reverse gap-10 my-10'>
                    <div className='flex flex-col gap-4 w-full md:pl-5'>
                        <div className='w-full flex justify-between items-center text-primary'>
                            <span className='flex gap-3 items-center'>
                                <GoDotFill /> <p className='text-foreground'>{loadout.firstSlot}</p>
                            </span>
                            <p className='text-foreground'>{loadout.firstAttachment}</p>
                        </div>
                        <div className='w-full flex justify-between items-center text-primary'>
                            <span className='flex gap-3 items-center'>
                                <GoDotFill /> <p className='text-foreground'>{loadout.secondSlot}</p>
                            </span>
                            <p className='text-foreground'>{loadout.secondAttachment}</p>
                        </div>
                        <div className='w-full flex justify-between items-center text-primary'>
                            <span className='flex gap-3 items-center'>
                                <GoDotFill /> <p className='text-foreground'>{loadout.thirdSlot}</p>
                            </span>
                            <p className='text-foreground'>{loadout.thirdAttachment}</p>
                        </div>
                        <div className='w-full flex justify-between items-center text-primary'>
                            <span className='flex gap-3 items-center'>
                                <GoDotFill /> <p className='text-foreground'>{loadout.fourthSlot}</p>
                            </span>
                            <p className='text-foreground'>{loadout.fourthAttachment}</p>
                        </div>
                        <div className='w-full flex justify-between items-center text-primary'>
                            <span className='flex gap-3 items-center'>
                                <GoDotFill /> <p className='text-foreground'>{loadout.fifthSlot}</p>
                            </span>
                            <p className='text-foreground'>{loadout.fifthAttachment}</p>
                        </div>
                    </div >
                    <p className='max-w-2xl mx-auto py-5 pl-5'>{loadout.description}</p>
                </div>
            </div>
        </>
    )
}

export default LoadoutDetails



