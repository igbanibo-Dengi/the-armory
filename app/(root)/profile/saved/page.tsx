import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getBookmarksByUserId } from '@/lib/actions/bookmark.action'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    const bookmarked = await getBookmarksByUserId({ userId });
    console.log(bookmarked);


    return (
        <div className="pt-20">
            <section className="container my-8 flex justify-between border-b pb-4 items-center">
                <Button asChild>
                    <Link href="/loadouts/create">New Loadout</Link>
                </Button>
                <Link href="/profile/saved" className="underline hover:text-primary">
                    Saved Loadouts
                </Link>
            </section>
            <section className="container my-8">
                {bookmarked.map((bookmark: any) => {
                    return <div key={bookmark.id}>{bookmark._id}
                        <p>{bookmark.loadout.title}</p>
                    </div>;
                })}
            </section>
        </div>
    );
};

export default page