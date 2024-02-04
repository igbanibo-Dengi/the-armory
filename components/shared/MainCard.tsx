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
import { auth } from '@clerk/nextjs';
import { FilePenLine } from 'lucide-react';


type CardProps = {
    loadout: ILoadout;
    // hasOrderLink?: boolean;
    // hidePrice?: boolean;
};

const MainCard = ({ loadout }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;


    const isEventCreator = userId === loadout.creator._id.toString();


    return (
        <div className='rounded-md border-2 relative overflow-hidden flex md:min-h-[380px] w-full max-w-[400px] flex-col'>
            <Link
                href={`/loadouts/${loadout._id}`}
                style={{ backgroundImage: `url(${loadout.imageUrl})` }}
                className="flex-grow bg-gray-50 bg-cover bg-center text-grey-500 hidden md:flex"
            />

            {/* IS EVENT CREATOR ... */}

            {isEventCreator && (
                <div className="absolute right-2 bottom-2 flex gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                    <Link href={`/loadouts/${loadout._id}/update`} className="text-blue-500">
                        <FilePenLine />
                    </Link>

                    {/* <DeleteConfirmation eventId={loadout._id} /> */}
                </div>
            )}

            <div className='p-4 space-y-4'>
                <div className='flex justify-between'>
                    <Link href={`/loadouts/${loadout._id}`} className='text-lg capitalize hover:text-primary'>{loadout.title}</Link>
                    <Badge>{loadout.category.name}</Badge>
                </div>
                <div className='flex justify-between'>
                    <p>{loadout.weapon}</p>
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