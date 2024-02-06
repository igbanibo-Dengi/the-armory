"use client"

import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { bookmarkLoadout } from '@/lib/actions/loadout.actions'

const Bookmark = ({ loadoutId }: { loadoutId: string }) => {
    let [isPending, startTransition] = useTransition();



    return (
        <div>
            <Button
                onClick={() =>
                    startTransition(async () => {
                        await bookmarkLoadout({ loadoutId });
                    })
                }

            >
                {isPending ? 'Bookmarking...' : 'Bookmark'}


            </Button>
        </div>
    )
}

export default Bookmark