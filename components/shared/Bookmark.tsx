'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { bookmarkLoadout } from '@/lib/actions/bookmark.action'
import { SignedIn } from '@clerk/nextjs'
import { BookmarkLoadoutParams } from '@/types'

const Bookmark = ({ loadout, userId, bookmarked }: BookmarkLoadoutParams) => {
    let [isPending, startTransition] = useTransition();
    const [isBookmarked, setIsBookmarked] = useState(false);

    console.log(loadout);


    console.log(bookmarked);

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
                    >
                        Saved
                    </Button>
                ) : (
                    <Button
                        onClick={handleBookmark}
                        disabled={isBookmarked}
                    >
                        {isPending ? 'Saving...' : isBookmarked ? 'Saved' : 'Save'}
                    </Button>
                )}
            </SignedIn>


        </div>
    );
}


export default Bookmark



