import { getLoadoutId } from '@/lib/actions/loadout.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import { GoDotFill } from "react-icons/go";
import { Separator } from "@/components/ui/separator"
import { SignedIn, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { Delete } from '@/components/shared/Delete';
import Bookmarking from '@/components/shared/Bookmark';
import { getBookmarksByUserId } from '@/lib/actions/bookmark.action';


const LoadoutDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {

    const loadout = await getLoadoutId(id)

    // console.log(loadout);

    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    const isLoadoutCreator = userId === loadout.creator._id.toString();

    const bookmarked = await getBookmarksByUserId({ userId })

    // console.log(bookmarked)


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
                                <p className='flex justify-between items-center'>
                                    <span className='text-muted-foreground font-bold'>Weapon</span> <span>{loadout.weapon}</span>
                                </p>
                                <p className='flex justify-between items-center'>
                                    <span className='text-muted-foreground font-bold'>Category</span> <span> {loadout.category.name}</span>
                                </p>
                                <p className='flex justify-between items-center'>
                                    <span className='text-muted-foreground font-bold'>Mode</span>  <span>{loadout.gameMode}</span>
                                </p>
                                <p className='flex justify-between items-center'>
                                    <span className='text-muted-foreground font-bold'>Creator</span>    <span>{loadout.creator.username}</span>
                                </p>
                                <SignedIn>
                                    {isLoadoutCreator && (
                                        <div className="flex gap-4 rounded-xl  items-end  justify-end shadow-sm transition-all">
                                            <Link href={`/loadouts/${loadout._id}/update`} className="">
                                                <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                            </Link>

                                            <Delete loadoutId={loadout._id} />
                                        </div>
                                    )}

                                    {!isLoadoutCreator && (
                                        <div className='flex justify-end'>
                                            <Bookmarking loadout={loadout} userId={userId} bookmarked={bookmarked} />
                                        </div>
                                    )}
                                </SignedIn>
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



