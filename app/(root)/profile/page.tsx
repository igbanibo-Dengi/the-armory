import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs';
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
    const loadoutsPage = Number(searchParams?.eventssPage) || 1;

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;


    return (
        <div>ProfilePage</div>
    )
}

export default ProfilePage