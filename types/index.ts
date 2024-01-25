// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}

export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

// ====== EVENT PARAMS
export type CreateLoadoutParams = {
    userId: string
    loadout: {
        title: string
        weapon: string
        gameMode: string
        description: string
        firstAttachment: string
        secondAttachment: string
        thirdAttachment: string
        fourthAttachment: string
        fifthAttachment: string
        imageUrl: string
        categoryId: string
        url: string
    }
    path: string
}

export type UpdateLoadoutParams = {
    userId: string
    loadout: {
        _id: string
        title: string
        weapon: string
        gameMode: string
        description: string
        firstAttachment: string
        secondAttachment: string
        thirdAttachment: string
        fourthAttachment: string
        fifthAttachment: string
        imageUrl: string
        categoryId: string
        url: string
    }
    path: string
}

export type DeleteLoadoutParams = {
    loadoutId: string
    path: string
}

export type GetAllLoadoutsParams = {
    query: string
    category: string
    limit: number
    page: number
}

export type GetLoadoutsByUserParams = {
    userId: string
    limit?: number
    page: number
}

export type GetRelatedLoadoutsByCategoryParams = {
    categoryId: string
    loadoutId: string
    limit?: number
    page: number | string
}

export type loadout = {
    _id: string
    title: string
    weapon: string
    gameMode: string
    description: string
    firstAttachment: string
    secondAttachment: string
    thirdAttachment: string
    fourthAttachment: string
    fifthAttachment: string
    imageUrl: string
    categoryId: string
    url: string
    creator: {
        _id: string
        firstName: string
        lastName: string
    }
    category: {
        _id: string
        name: string
    }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
    categoryName: string
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}









// ====== ORDER PARAMS
// export type CheckoutOrderParams = {
//     eventTitle: string
//     loadoutId: string
//     price: string
//     isFree: boolean
//     buyerId: string
// }

// export type CreateOrderParams = {
//     stripeId: string
//     loadoutId: string
//     buyerId: string
//     totalAmount: string
//     createdAt: Date
// }

// export type GetOrdersByEventParams = {
//     loadoutId: string
//     searchString: string
// }

// export type GetOrdersByUserParams = {
//     userId: string | null
//     limit?: number
//     page: string | number | null
// }
