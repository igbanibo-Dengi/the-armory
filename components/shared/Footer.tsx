import React from 'react'
import Link from 'next/link'
import { FaXTwitter } from 'react-icons/fa6'
import { FaDiscord } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="w-full py-12 bg-black border-t-2 text-white">
            <div className="container px-4 md:px-6 lg:px-8 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                <div className='flex items-center justify-center'>
                    <Image
                        src='/footer-logo.svg'
                        alt='logo'
                        width={300}
                        height={100}
                    />
                </div>
                <div className='flex items-center text-center'>
                    <p>Armory is a unique platform for user to create and share CODM loadouts.
                        Build, Share, and collectively inspire the gaming community – tha&apos;s the essence of Armory.
                    </p>
                </div>
                <div className="flex flex-col space-y-4 items-center  lg:pl-20">
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex flex-col gap-4">
                        <Link className="text-gray-300 w-full  hover:text-white flex gap-3 items-center" href="#">
                            <FaDiscord size={30} />
                            <p>Discord</p>
                        </Link>
                        <Link className="text-gray-300 w-full  hover:text-white flex gap-3 items-center" href="#">
                            <FaXTwitter size={30} />
                            <p>Twitter</p>

                        </Link>
                        <Link className="text-gray-300 w-full  hover:text-white flex gap-3 items-center" href="#">
                            <AiFillInstagram size={30} />
                            <p>Instagram</p>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center lg:pl-20 space-y-4">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <Link className="text-gray-300 w-full  hover:text-white" href="#">
                        About Us
                    </Link>
                    <Link className="text-gray-300 w-full  hover:text-white" href="#">
                        Contact
                    </Link>
                    <Link className="text-gray-300 w-full  hover:text-white" href="#">
                        Terms of Service
                    </Link>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-300 text-sm">© 2024 Armory. All rights reserved.</div>
        </footer >
    )
}

export default Footer