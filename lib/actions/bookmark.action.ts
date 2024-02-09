'use server'

import { connectToDatabase } from "../database";
import Bookmark from "../database/models/bookmark.model";
import { handleError } from "../utils";





// CREATE BOOKMARK

export async function bookmarkLoadout({ userId, loadoutId }: { userId: string, loadoutId: string }) {


    try {

        await connectToDatabase()
        // Create new bookmark
        const bookmark = await Bookmark.create({
            user: userId,
            loadout: loadoutId
        });

        return bookmark;

    } catch (error) {
        handleError(error);
    }
}

// GET ONE LOADOUT BY ID
// export async function getBookmarkId(eventId: string) {
//     try {
//         await connectToDatabase()

//         const loadout = await populateLoadout(Loadout.findById(eventId))

//         if (!loadout) throw new Error('Loadout not found')

//         return JSON.parse(JSON.stringify(loadout))
//     } catch (error) {
//         handleError(error)
//     }
// }