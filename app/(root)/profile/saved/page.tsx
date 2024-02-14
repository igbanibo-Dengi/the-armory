import { ceaser } from '@/app/font'
import { Button } from '@/components/ui/button'
import { getBookmarksByUserId } from '@/lib/actions/bookmark.action'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    const bookmarked = await getBookmarksByUserId({ userId });


    return (
        <div className="pt-20">
            <section className="container my-8 flex justify-between border-b pb-4 items-center">
                <Link href="/profile" className="underline hover:text-primary">
                    My Loadouts
                </Link>
                <Button asChild>
                    <Link href="/loadouts/create">New Loadout</Link>
                </Button>
            </section>
            <section className="container my-8 flex-col space-y-10">

                <span className=" text-3xl text-center whitespace-nowrap lg:text-4xl">
                    <h3 className={ceaser.className}>Bookmarks</h3>
                </span>

                <div className=' grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {bookmarked.map((bookmark: any) => {
                        return <div key={bookmark._id} className='rounded-md border-2 relative overflow-hidden flex min-h-[380px] w-full max-w-[400px] flex-col'>
                            <Link
                                href={`/loadouts/${bookmark.loadout._id}`}
                                style={{ backgroundImage: `url(${bookmark.loadout.imageUrl})` }}
                                className="flex-grow bg-cover "
                            />

                            <div className='p-4 space-y-2 md:space-y-4'>
                                <div className='flex justify-between'>
                                    <Link href={`/loadouts/${bookmark.loadout._id}`} className='text-lg text-primary capitalize hover:text-primary'>{bookmark.loadout.weapon}</Link>
                                </div>
                                <div className='flex justify-between'>
                                    <p>{bookmark.loadout.title}</p>
                                    <p>{bookmark.loadout.gameMode}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

            </section>
        </div>
    );
};

export default page