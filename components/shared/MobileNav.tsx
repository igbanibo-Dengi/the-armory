import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { SignedOut, SignedIn, SignOutButton, } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { AlignJustify, LogOut } from 'lucide-react'


const MobileNav = () => {
    return (
        <nav className='md:hidden'>
            <Sheet>
                <SheetTrigger><AlignJustify /></SheetTrigger>
                <SheetContent className='flex flex-col pt-20 w-[200px] bg-black'>
                    <Separator />
                    <Link className='py-3' href="/">
                        Home
                    </Link>
                    <Separator />
                    <SignedIn>
                        <Link className='py-3' href='/loadouts/create'>
                            Build
                        </Link>
                        <Separator />
                    </SignedIn>
                    <Link className='py-3' href="/explore">
                        Explore
                    </Link>
                    <Separator />
                    <SignedIn>
                        <Link className='py-3' href="/profile">
                            My Loadouts
                        </Link>
                        <Separator />
                    </SignedIn>
                    <SignedOut>
                        <Button asChild size="lg" className='w-fit'>
                            <Link className='py-3' href="/sign-in">Login</Link>
                        </Button>
                        <Separator />
                    </SignedOut>
                    <div className='mt-auto ml-auto py-10'>
                        <SignedIn >
                            <SignOutButton>
                                <Button variant={"outline"} className='border-none'>
                                    <LogOut />
                                </Button>
                            </SignOutButton>
                        </SignedIn>
                    </div>

                </SheetContent>
            </Sheet>

        </nav>
    )
}

export default MobileNav





// < Sheet >
//             <SheetTrigger><GiHeavyBullets size={28} className='rotate-90' /></SheetTrigger>
//             <Separator />

//             <SheetContent className='w-[200px] bg-black pt-20'>
//                 <nav className='bg-transparent flex flex-col md:flex-row justify-center items-center gap-4 '>
//                     <div className='flex flex-col justify-center items-center gap-4 '>
//                         <Link href="/">
//                             Home
//                         </Link>
//                         <Link href="/">
//                             Explore
//                         </Link>
//                         <Link href="/profile">
//                             My Loadouts
//                         </Link>
//                     </div>
//                     <SignedOut>
//                         <Button asChild size="sm">
//                             <Link href="/sign-in">Login</Link>
//                         </Button>
//                     </SignedOut>
//                 </nav>
//             </SheetContent>
//         </Sheet >