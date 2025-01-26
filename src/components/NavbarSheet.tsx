import React from 'react';
import Link from 'next/link';
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


export default function NavbarSheet() {
  return (
    <header className="relative max-w-[1920px] w-full bg-white text-black h-[74px]">
    <div className="absolute max-w-full mt-[15px] w-full flex justify-between items-center px-4 sm:px-8 h-[32px]">
      
      <div className="hidden md:flex max-w-[508px]">
        <ul className="flex gap-2 sm:gap-4">
          <li className="text-[24px] sm:text-[16px]">
            <Link href="/">Home</Link>
          </li>
          <li className="text-[24px] sm:text-[16px]">
            <Link href="/products">Products</Link>
          </li>
          <li className="font-normal text-[24px] sm:text-[16px]">
            <Link href="/about">About</Link>
          </li>
          <li className="font-normal text-[24px] sm:text-[16px]">
            <Link href="/faq">Faq</Link>
          </li>
          <li className="font-normal text-[24px] sm:text-[16px]">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className='flex flex-row space-x-3'>
        <p>Contact:</p><span>(808) 555-0111</span>
      </div>
      <div className="md:hidden sm:ml-[400px] ml-16">
        <Sheet>
          <SheetTrigger>
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent>
            <ul className="flex flex-col text-[#ffffff] md:flex-row gap-4 p-4">
            <li className="text-[24px] sm:text-[16px]">
            <Link href="/">Home</Link>
          </li>
          <li className="text-[24px] sm:text-[16px]">
            <Link href="/products">Products</Link>
          </li>
          <li className="font-normal text-[24px] sm:text-[16px]">
            <Link href="/about">About</Link>
          </li>
          <li className="font-normal text-[24px] sm:text-[16px]">
            <Link href="/faq">Faq</Link>
          </li>
          <li className="font-normal text-[24px] sm:text-[16px]">
            <Link href="/contact">Contact</Link>
          </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      
    </div>
  </header>
  )
}