import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { getAllLoaddouts } from '@/lib/actions/loadout.actions';
import { SearchParamProps } from '@/types';
import React from 'react'

const ExplorePage = async ({ searchParams }: SearchParamProps) => {

    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || "";
    const category = (searchParams?.category as string) || "";

    const loadout = await getAllLoaddouts({
        query: searchText,
        category,
        page,
        limit: 6,
    });

    return (
        <>
            <section className='mt-24'>
                <h3 className='text-5xl font-bold capitalize text-center'>All Loadouts</h3>
            </section>
            <section className='mt-10'>
                <div className='container'>
                    <div className='flex flex-col md:flex-row gap-4 justify-between items-center md:p-10 mb-10'>
                        <Search />
                        <CategoryFilter />
                    </div>
                    <Collection
                        data={loadout?.data}
                        emptyTitle="No loadout Found"
                        emptyStateSubtext="Try changing your search criteria"
                        collectionType="All_Loadouts"
                        limit={9}
                        page={1}
                        totalPages={loadout?.totalPages}
                    />
                </div>
            </section>
        </>
    )
}

export default ExplorePage