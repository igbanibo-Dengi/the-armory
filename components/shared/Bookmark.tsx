"use client"

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { bookmarkLoadout } from '@/lib/actions/bookmark.action'

const Bookmark = ({ loadoutId, userId }: { loadoutId: string, userId: string }) => {
    let [isPending, startTransition] = useTransition()
    const [isBookmarked, setIsBookmarked] = useState(false)

    const handleBookmark = async () => {
        startTransition(async () => {
            await bookmarkLoadout({ loadoutId, userId })
            setIsBookmarked(true)
        })
    }

    return (
        <div>
            <Button
                disabled={isBookmarked}
                onClick={handleBookmark}
            >
                {isPending ? 'Bookmarking...' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
        </div>
    )
}

export default Bookmark