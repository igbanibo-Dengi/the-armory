'use server'

import { BookmarkLoadoutParams } from "@/types";
import { connectToDatabase } from "../database";
import Bookmark from "../database/models/bookmark.model";
import { handleError } from "../utils";
import Loadout from "../database/models/loadout.model";
import { revalidatePath } from "next/cache";



const populateBookmarks = (query: any) => {
    return query
        .populate({ path: 'loadout', model: Loadout })
}

// CREATE BOOKMARK

export async function bookmarkLoadout({ userId, loadout }: BookmarkLoadoutParams) {


    try {

        await connectToDatabase()
        // Create new bookmark
        const bookmark = await Bookmark.create({
            user: userId,
            loadout
        });

        return JSON.parse(JSON.stringify(bookmark));

    } catch (error) {
        handleError(error);
    }
}

// GET BOOKMARK BY USER ID

export async function getBookmarksByUserId({ userId }: { userId: string }) {
    try {
        await connectToDatabase();

        const bookmarks = await populateBookmarks(Bookmark.find({ user: userId }));

        if (!bookmarks) throw new Error("No bookmarks found");

        return JSON.parse(JSON.stringify(bookmarks));
    } catch (error) {
        handleError(error);
    }
}


// DELETE BOOKMARK

export async function deleteBookmark({ userId, loadoutId, path }: { userId: string, loadoutId: string, path: string }) {

    try {
        await connectToDatabase()

        const deleteBookmark = await Bookmark.findOneAndDelete({ user: userId, loadout: loadoutId });
        if (deleteBookmark) revalidatePath(path)
        // if (!bookmark) throw new Error('Could not find bookmark');


        return `Successfully deleted the ${loadoutId} bookmark.`;

    } catch (error) {
        handleError(error)
    }
}




