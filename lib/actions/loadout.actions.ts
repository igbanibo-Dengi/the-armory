'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Loadout from '@/lib/database/models/loadout.model'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
    CreateLoadoutParams,
    DeleteLoadoutParams,
    GetAllLoadoutsParams,
    GetLoadoutsByUserParams,
    GetRelatedLoadoutsByCategoryParams,
    UpdateLoadoutParams
} from '@/types'

const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateLoadout = (query: any) => {
    return query
        .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
        .populate({ path: 'category', model: Category, select: '_id name' })
}

// CREATE
export async function createLoadout({ userId, loadout, path }: CreateLoadoutParams) {
    try {
        await connectToDatabase()

        const creator = await User.findById(userId)
        console.log(userId)
        if (!creator) throw new Error('Creator not found')

        const newLoadout = await Loadout.create({ ...loadout, category: loadout.categoryId, creator: userId })
        revalidatePath(path)

        return JSON.parse(JSON.stringify(newLoadout))
    } catch (error) {
        handleError(error)
    }
}

// GET ONE LOADOUT BY ID
export async function getId(eventId: string) {
    try {
        await connectToDatabase()

        const loadout = await populateLoadout(Loadout.findById(eventId))

        if (!loadout) throw new Error('Loadout not found')

        return JSON.parse(JSON.stringify(loadout))
    } catch (error) {
        handleError(error)
    }
}

// UPDATE
export async function updateLoadout({ userId, loadout, path }: UpdateLoadoutParams) {
    try {
        await connectToDatabase()

        const loadoutToUpdate = await Loadout.findById(loadout._id)
        if (!loadoutToUpdate || loadoutToUpdate.creator.toHexString() !== userId) {
            throw new Error('Unauthorized or loadout not found')
        }

        const updatedLoadout = await Loadout.findByIdAndUpdate(
            loadout._id,
            { ...loadout, category: loadout.categoryId },
            { new: true }
        )
        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedLoadout))
    } catch (error) {
        handleError(error)
    }
}

// DELETE
export async function deleteLoadout({ loadoutId, path }: DeleteLoadoutParams) {
    try {
        await connectToDatabase()

        const deletedLoadout = await Loadout.findByIdAndDelete(loadoutId)
        if (deletedLoadout) revalidatePath(path)
    } catch (error) {
        handleError(error)
    }
}

// GET ALL EVENTS
export async function getAllLoaddouts({ query, limit = 6, page, category }: GetAllLoadoutsParams) {
    try {
        await connectToDatabase()

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
        const categoryCondition = category ? await getCategoryByName(category) : null
        const conditions = {
            $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
        }

        const skipAmount = (Number(page) - 1) * limit
        const loadoutQuery = Loadout.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)

        const loadouts = await populateLoadout(loadoutQuery)
        const loadoutCount = await Loadout.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(loadouts)),
            totalPages: Math.ceil(loadoutCount / limit),
        }
    } catch (error) {
        handleError(error)
    }
}

// GET LOADOUTS BY CREATOR
export async function getLoadoutByUser({ userId, limit = 6, page }: GetLoadoutsByUserParams) {
    try {
        await connectToDatabase()

        const conditions = { creator: userId }
        const skipAmount = (page - 1) * limit

        const loadoutQuery = Loadout.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)

        const loadout = await populateLoadout(loadoutQuery)
        const loadoutCount = await Loadout.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(loadout)), totalPages: Math.ceil(loadoutCount / limit) }
    } catch (error) {
        handleError(error)
    }
}

// GET RELATED LOADOUTS: LOADOUTS WITH SAME CATEGORY
export async function getRelatedLoadoutByCategory({
    categoryId,
    loadoutId,
    limit = 3,
    page = 1,
}: GetRelatedLoadoutsByCategoryParams) {
    try {
        await connectToDatabase()

        const skipAmount = (Number(page) - 1) * limit
        const conditions = { $and: [{ category: categoryId }, { _id: { $ne: loadoutId } }] }

        const eventsQuery = Loadout.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)

        const loadout = await populateLoadout(eventsQuery)
        const loadoutCount = await Loadout.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(loadout)), totalPages: Math.ceil(loadoutCount / limit) }
    } catch (error) {
        handleError(error)
    }
}