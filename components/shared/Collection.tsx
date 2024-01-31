import { ILoadout } from '@/lib/database/models/loadout.model';
import React from 'react'
import MainCard from './MainCard';


type CollectionProps = {
    data: ILoadout[];
    emptyTitle: string;
    emptyStateSubtext: string;
    limit: number;
    page: number | string;
    totalPages?: number;
    urlParamName?: string;
    collectionType?: "My_loadouts" | "Bookmarked" | "All_Loadouts";
};

const Collection = ({ data,
    emptyTitle,
    emptyStateSubtext,
    page,
    limit,
    totalPages = 0,
    collectionType,
    urlParamName, }: CollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {data.map((loadout) => {
                        // const hasOrderLink = collectionType === "Events_Organized";
                        // const hidePrice = collectionType === "My_Tickets";

                        return (
                            <div key={loadout._id}>
                                <MainCard
                                    loadout={loadout}
                                // hasOrderLink={hasOrderLink}
                                // hidePrice={hidePrice}
                                />
                            </div>
                        );
                    })}

                    {/* {totalPages > 1 && (
                        <Pagination
                            urlParamName={urlParamName}
                            page={page}
                            totalPages={totalPages}
                        />
                    )} */}
                </div>
            ) : (
                <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
                    <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                    <p className="p-regular-14">{emptyStateSubtext}</p>
                </div>
            )}
        </>
    )
}

export default Collection