import { ILoadout } from '@/lib/database/models/loadout.model'
import React from 'react'
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';


type CardProps = {
    loadout: ILoadout;
    // hasOrderLink?: boolean;
    // hidePrice?: boolean;
};

const MainCard = ({ loadout }: CardProps) => {

    return (
        <div className='rounded-md border-2 relative overflow-hidden flex min-h-[380px] w-full max-w-[400px] flex-col'>
            <Link
                href={`/loadouts/${loadout._id}`}
                style={{ backgroundImage: `url(${loadout.imageUrl})` }}
                className="flex-grow bg-cover "
            />

            <div className='p-4 space-y-2 md:space-y-4'>
                <div className='flex justify-between'>
                    <Link href={`/loadouts/${loadout._id}`} className='text-lg text-primary capitalize hover:text-primary'>{loadout.weapon}</Link>
                    <Badge>{loadout.category.name}</Badge>
                </div>
                <div className='flex justify-between'>
                    <p>{loadout.title}</p>
                    <p>{loadout.gameMode}</p>
                </div>
                <Separator />
                <div className='flex justify-between'>
                    <p >By{" "}{loadout.creator.username}</p>
                    <Link href={`/loadouts/${loadout._id}`} className='underline hover:text-primary'>View</Link>
                </div>
            </div>
        </div>
    )
}

export default MainCard