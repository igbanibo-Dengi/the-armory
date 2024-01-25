'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import MobileNav from './MobileNav'




const Header = () => {
    const pathname = useRouter();

    const [navColor, setnavColor] = useState("transparent");
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("#000000") : setnavColor("transparent");
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);
    return (
        <header className="py-5 z-50  fixed w-full" style={{ backgroundColor: navColor, transition: "all 0.5s" }}>
            <div className='container px-5 md:px-10 flex justify-between md:grid grid-cols-3 w-full items-center'>
                <div>
                    <Image
                        src="/logo-main.svg"
                        alt='logo'
                        width={100}
                        height={50}
                    />
                </div>

                <div className='hidden md:flex flex-col md:flex-row justify-center items-center gap-4 '>
                    <SignedIn>
                        <Link href="/loadouts/create">
                            Build
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/">Home</Link>
                    </SignedOut>
                    <Link href="/">
                        Explore
                    </Link>
                    <SignedIn>
                        <Link href="/profile">
                            My Loadouts
                        </Link>
                    </SignedIn>
                </div>
                <div className='hidden md:flex justify-end'>
                    <SignedOut>
                        <Button asChild size={"lg"}>
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                    <div>
                        <SignedIn >
                            <UserButton afterSignOutUrl='/' />
                        </SignedIn>
                    </div>
                </div>


                <div className='flex items-center justify-center h-full'>
                    <MobileNav />
                </div>

            </div>
        </header>
    )
}

export default Header














{/* <Sheet >
                    <SheetTrigger><GiHeavyBullets size={28} className='rotate-90' /></SheetTrigger>
                    <SheetContent className='w-[200px] bg-black pt-20'>
                        <Navlinks />
                    </SheetContent>
                </Sheet> */}


