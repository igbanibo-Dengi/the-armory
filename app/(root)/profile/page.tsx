import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getLoadoutByUser } from '@/lib/actions/loadout.actions';
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
    const loadoutsPage = Number(searchParams?.eventssPage) || 1;

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const loadouts = await getLoadoutByUser({ userId, page: loadoutsPage });


    return (
        <div className='pt-20'>
            <section className='container my-8 flex justify-between border-b pb-4 items-center'>
                <Button asChild><Link href="/loadouts/create">New Loadout</Link></Button>
                <Link href='/profile/saved' className='underline hover:text-primary'>Saved Loadouts</Link>
            </section>
            <section className="container my-8">
                <Collection
                    data={loadouts?.data}
                    emptyTitle="You have no weapons in your armory soilder"
                    emptyStateSubtext="Go Build some now"
                    collectionType="My_loadouts"
                    limit={6}
                    page={loadoutsPage}
                    urlParamName="eventsPage"
                    totalPages={loadouts?.totalPages}
                />
            </section>
        </div>
    )
}

export default ProfilePage