import { ILoadout } from '@/lib/database/models/loadout.model'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';


type CardProps = {
    loadout: ILoadout;
    // hasOrderLink?: boolean;
    // hidePrice?: boolean;
};

const MainCard = ({ loadout }: CardProps) => {

    // console.log(loadout);

    return (
        <div className='rounded-md border-2 relative overflow-hidden flex min-h-[380px] w-full max-w-[400px] flex-col'>
            {/* <div className='border-2 border-yellow-500 flex justify-center items-center w-[500px] overflow-hidden'>

                <Image
                    src={loadout.imageUrl}
                    alt={loadout.title}
                    width={500}
                    height={500}
                    className='rounded-md object-contain'
                />
            </div> */}
            <Link
                href={`/loadouts/${loadout._id}`}
                style={{ backgroundImage: `url(${loadout.imageUrl})` }}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
            />

            <Link href={`/loadouts/${loadout._id}`} className='p-4 space-y-4'>
                <div className='flex justify-between'>
                    <p
                        className='text-lg hover:text-primary capitalize'>{loadout.title}</p>
                    <Badge>{loadout.category.name}</Badge>
                </div>
                <div className='flex justify-between'>
                    <p>{loadout.weapon}</p>
                    <p>{loadout.gameMode}</p>
                </div>
                <Separator />
                <p className='text-right'>By{" "}{loadout.creator.username}</p>
            </Link>
        </div>
    )
}

export default MainCard