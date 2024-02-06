'use server'

import { BookmarkLoadoutParams } from "@/types";
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