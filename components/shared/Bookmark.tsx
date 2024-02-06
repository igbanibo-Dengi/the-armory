"use client"

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { bookmarkLoadout } from '@/lib/actions/loadout.actions'

const Bookmark = ({ loadoutId }: { loadoutId: string }) => {
    let [isPending, startTransition] = useTransition();
    const [isBookmarked, setIsBookmarked] = useState(false)



    return (
        <div>
            <Button
                onClick={() =>
                    startTransition(async () => {
                        await bookmarkLoadout({ loadoutId });
                        setIsBookmarked(true);
                    })
                }

                disabled={isBookmarked}
            >
                {isPending ? 'Bookmarking...' : isBookmarked ? 'Bookmarked' : 'Bookmark'}


            </Button>
        </div>
    )
}

export default Bookmark