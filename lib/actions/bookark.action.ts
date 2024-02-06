'use server'

import { connectToDatabase } from "../database"
import Bookmark from "../database/models/bookmark.model"
import { handleError } from "../utils"



export const newBookmark = async (userId: string, loadoutId: string) => {
    try {
        await connectToDatabase()

        const newBookmark = await Bookmark.create({
            user: userId,
            loadout: loadoutId,
        })

        return JSON.parse(JSON.stringify(newBookmark))
    } catch (error) {
        handleError(error)
    }
}