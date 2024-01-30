import { Badge } from '@/components/ui/badge'
import { getLoadoutId } from '@/lib/actions/loadout.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import { GoDotFill } from "react-icons/go";
import { Separator } from "@/components/ui/separator"


const LoadoutDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {

    const loadout = await getLoadoutId(id)
    console.log(loadout);

    return (
        <>
            <div className='container pt-20'>
                <div className='flex flex-col lg:flex-row gap-5 md:gap-10 justify-between max-w-6xl mx-auto'>
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
                        <div className='flex flex-col w-full justify-betweenw-full py-5 whitespace-nowrap'>
                            <div className='space-y-4 w-full pb-4'>
                                <p className='flex justify-between items-center'><span className='text-primary'>Title</span> <span>{loadout.title}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Weapon</span> <span>{loadout.weapon}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Category</span> <span> {loadout.category.name}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Mode</span>  <span>{loadout.gameMode}</span></p>
                                <p className='flex justify-between items-center'><span className='text-primary'>Creator</span>    <span>{loadout.creator.firstName}</span></p>
                            </div>
                            <Separator />
                            < div className='py-5 grid grid-cols-2 gap-5' >
                                <span className='flex gap-3 items-center text-primary'>
                                    <GoDotFill /> <p className='text-foreground'>{loadout.firstAttachment}</p>
                                </span>
                                <span className='flex gap-3 items-center text-primary'>
                                    <GoDotFill /> <p className='text-foreground'>{loadout.secondAttachment}</p>
                                </span>
                                <span className='flex gap-3 items-center text-primary'>
                                    <GoDotFill /> <p className='text-foreground'>{loadout.thirdAttachment}</p>
                                </span>
                                <span className='flex gap-3 items-center text-primary'>
                                    <GoDotFill /> <p className='text-foreground'>{loadout.fourthAttachment}</p>
                                </span>
                                <span className='flex gap-3 items-center text-primary'>
                                    <GoDotFill /> <p className='text-foreground'>{loadout.fifthAttachment}</p>
                                </span>
                            </div >
                        </div>

                    </div>
                </div>
                <p className='max-w-4xl mx-auto py-5'>{loadout.description}</p>
            </div>
        </>
    )
}

export default LoadoutDetails



