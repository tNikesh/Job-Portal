import { Copyright, FacebookIcon, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full  flex justify-center items-center flex-col space-y-5 lg:px-14 sm:px-7 pt-14 pb-6 px-3'>
        <div className='w-full flex justify-between items-start gap-x-5 '>
            <div>
                <Image src="/images/logo.png" alt="logo" width={150} height={50} className='w-full h-auto object-contain'/>
            </div>
            <div className='flex justify-start items-start flex-col gap-y-2 text-gray-800'>
                <Link href="#">Home</Link>
                <Link href="#">Find Jobs</Link>
                <Link href="#">Find Candidates</Link>
                <Link href="#">About Us</Link>
            </div>
            <div className='flex justify-start items-start flex-col gap-y-2 text-gray-800'>
                <Link href="#">Career</Link>
                <Link href="#">Help</Link>
                <Link href="#">Contact us</Link>
            </div>
            <div className='flex justify-start items-start flex-col gap-y-2 text-gray-800'>
                <Link href="#">Terms</Link>
                <Link href="#">Privacy Policy</Link>
            </div>
        </div>
        <div className='w-full pt-5 flex justify-between items-center gap-4 border-t-3 border-blue-950'>
            <div className='flex justify-start items-center gap-5'>
                <Link href="#">
                <FacebookIcon className='text-blue-950 size-5'/>
                </Link>
                <Link href="#">
                <Instagram className='text-blue-950 size-5'/>
                </Link>
                <Link href="#">
                <Linkedin className='text-blue-950 size-5'/>
                </Link>
                <Link href="#">
                <Twitter className='text-blue-950 size-5'/>
                </Link>
            </div>
            <div className='flex justify-start items-center gap-5'>
                <Link href="#">
                Terms & Condition
                </Link>
                <Link href="#">
                Privacy Policy
                </Link>
               
            </div>
            <div className='flex justify-start items-center gap-5'>
                <p className='flex justify-center items-center gap-1'>
                    <Copyright className='size-5 text-blue-950'/>
                    <span>Copyright CareerLifter</span>
                </p>
            
                <p>
                All Rights Reserved.
               </p>               
            </div>
        </div>
    </div>
  )
}

export default Footer