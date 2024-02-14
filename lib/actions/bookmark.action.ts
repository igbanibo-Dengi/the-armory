'use server'

import { BookmarkLoadoutParams } from "@/types";
import { connectToDatabase } from "../database";
import Bookmark from "../database/models/bookmark.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import Loadout from "../database/models/loadout.model";



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




