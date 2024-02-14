'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { bookmarkLoadout } from '@/lib/actions/bookmark.action'
import { SignedIn } from '@clerk/nextjs'
import { BookmarkLoadoutParams } from '@/types'
import { Bookmark, Loader } from 'lucide-react';


const Bookmarking = ({ loadout, userId, bookmarked }: BookmarkLoadoutParams) => {
    let [isPending, startTransition] = useTransition();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const saved = bookmarked.some((item: any) => item.loadout._id === loadout._id);

    const handleBookmark = async () => {
        startTransition(async () => {
            await bookmarkLoadout({ loadout, userId, bookmarked });
            setIsBookmarked(true);
        });
    };

    return (
        <div>
            <SignedIn>
                {saved ? (
                    <Button
                        disabled
                        variant={'ghost'}
                        className='disabled:cursor-not-allowed'
                    >
                        <Bookmark fill='white' />
                    </Button>
                ) : (
                    <Button
                        onClick={handleBookmark}
                        disabled={isBookmarked}
                        variant='ghost'
                        className='disabled:cursor-not-allowed'
                    >
                        {isPending ? <Loader className='animate-spin' /> : isBookmarked ? <Bookmark fill='white' /> : <Bookmark />}
                    </Button>
                )}
            </SignedIn>


        </div>
    );
}


export default Bookmarking



