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
            <div className='container pt-10 md:pt-20 max-w-6xl'>
                <div className='flex flex-col md:flex-row gap-5 md:gap-10 justify-between mx-auto mt-20'>
                    <div className='md:w-[65%] w-full border rounded-md'>
                        <Image
                            src={loadout.imageUrl}
                            alt="hero image"
                            width={1000}
                            height={500}
                            priority
                            className="h-full w-full rounded-md"
                        />
                    </div>
                    <div className='md:w-[33%] w-full flex gap-4  border rounded-md bg-[#020202] p-5'>
                        <div className='flex flex-col h-full justify-between w-full py-5 whitespace-nowrap'>
                            <p className='text-xl md:text-2xl text-primary font-bold capitalize mb-3'>{loadout.title}</p>
                            <Separator />
                            <div className='space-y-4 w-full pb-4 mt-2'>
                                <p className='flex justify-between items-center'><span className='text-muted-foreground font-bold'>Weapon</span> <span>{loadout.weapon}</span></p>
                                <p className='flex justify-between items-center'><span className='text-muted-foreground font-bold'>Category</span> <span> {loadout.category.name}</span></p>
                                <p className='flex justify-between items-center'><span className='text-muted-foreground font-bold'>Mode</span>  <span>{loadout.gameMode}</span></p>
                                <p className='flex justify-between items-center'><span className='text-muted-foreground font-bold'>Creator</span>    <span>{loadout.creator.username}</span></p>
                            </div>


                        </div>

                    </div>
                </div>
                <div className='flex flex-col  md:flex-row-reverse gap-5 md:gap-10 mt-5 md:mt-10 mb-10  justify-between'>
                    <div className='md:w-[33%] w-full space-y-4 border rounded-md bg-[#020202] p-5'>
                        <h3 className="text-xl text-primary font-bold">Attachments</h3>
                        <Separator />
                        <div className=' w-full flex flex-col gap-4'>
                            <div className='w-full flex justify-between items-center text-primary '>
                                <span className='flex gap-3 items-center'>
                                    <GoDotFill /> <p className='text-muted-foreground font-bold'>{loadout.firstSlot}</p>
                                </span>
                                <p className='text-foreground'>{loadout.firstAttachment}</p>
                            </div>
                            <div className='w-full flex justify-between items-center text-primary'>
                                <span className='flex gap-3 items-center'>
                                    <GoDotFill /> <p className='text-muted-foreground font-bold'>{loadout.secondSlot}</p>
                                </span>
                                <p className='text-foreground'>{loadout.secondAttachment}</p>
                            </div>
                            <div className='w-full flex justify-between items-center text-primary'>
                                <span className='flex gap-3 items-center'>
                                    <GoDotFill /> <p className='text-muted-foreground font-bold'>{loadout.thirdSlot}</p>
                                </span>
                                <p className='text-foreground'>{loadout.thirdAttachment}</p>
                            </div>
                            <div className='w-full flex justify-between items-center text-primary'>
                                <span className='flex gap-3 items-center'>
                                    <GoDotFill /> <p className='text-muted-foreground font-bold'>{loadout.fourthSlot}</p>
                                </span>
                                <p className='text-foreground'>{loadout.fourthAttachment}</p>
                            </div>
                            <div className='w-full flex justify-between items-center text-primary'>
                                <span className='flex gap-3 items-center'>
                                    <GoDotFill /> <p className='text-muted-foreground font-bold'>{loadout.fifthSlot}</p>
                                </span>
                                <p className='text-foreground'>{loadout.fifthAttachment}</p>
                            </div>
                        </div >
                    </div>
                    <div className='flex flex-col gap-4 justify-between md:w-[65%] w-full  border rounded-md bg-[#020202] p-5'>
                        <h3 className="text-xl text-primary font-bold">Description</h3>
                        <Separator />
                        <p className='mb-5 text-lg'>{loadout.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadoutDetails



