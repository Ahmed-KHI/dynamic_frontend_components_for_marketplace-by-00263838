"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/theme-button";
import HeaderTop from "./HeaderTop";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const Navbar = () => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  // Access wishlist and cart state from Redux
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <HeaderTop />
      <nav className="w-full max-w-[1440px] mx-auto shadow-md bg-slate-900 text-stone-200">
        <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b">
          <div>
            <Link href={"/"}>
              <Image src="/Logo.png" alt="logo" width={40} height={40} />
            </Link>
          </div>
          <div className="hidden md:flex">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-primary">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4 ml-8">
            {/* Wishlist Icon */}
            <Link href={"/wishlist"}>
              <span className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  className="cursor-pointer fill-gray-800 hover:fill-orange-600 inline-block"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  />
                </svg>
                {/* Wishlist Count */}
                {wishlistItems.length > 0 && (
                  <span className="absolute left-auto -ml-1 top-0 rounded-full bg-orange-600 px-1 py-0 text-xs text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </span>
            </Link>

            {/* Cart Icon */}
            <Link href={"/cart"}>
              <span className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  className="cursor-pointer fill-gray-800 hover:fill-orange-600 inline-block"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                    data-original="#000000"
                  ></path>
                </svg>
                {/* Cart Count */}
                {totalQuantity > 0 && (
                  <span className="absolute left-auto -ml-1 top-0 rounded-full bg-orange-600 px-1 py-0 text-xs text-white">
                    {totalQuantity}
                  </span>
                )}
              </span>
            </Link>

            {/* Authentication and Theme Buttons */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ThemeButton />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="block md:hidden ml-auto"
                  aria-label="Open Mobile Menu"
                >
                  <FiMenu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
                </SheetHeader>
                <ul className="flex flex-col gap-4 p-4">
                  <li>
                    <Link href="/" className="hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-primary">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-primary">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="hover:text-primary">
                      Orders
                    </Link>
                  </li>
                  <Collapsible
                    open={isCategoriesOpen}
                    onOpenChange={setCategoriesOpen}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        className="flex items-center gap-2 text-left font-medium"
                        aria-expanded={isCategoriesOpen}
                      >
                        Categories
                        <ChevronsUpDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ul className="flex flex-col gap-2 mt-2">
                        <li>
                          <Link href="/products" className="hover:text-primary">
                            All products
                          </Link>
                        </li>
                        <li>
                          <Link href="/items/bed" className="hover:text-primary">
                            Bed
                          </Link>
                        </li>
                        <li>
                          <Link href="/items/dining" className="hover:text-primary">
                            Dining
                          </Link>
                        </li>
                        <li>
                          <Link href="/items/kids" className="hover:text-primary">
                            Kids
                          </Link>
                        </li>
                        <li>
                          <Link href="/items/living" className="hover:text-primary">
                            Living
                          </Link>
                        </li>
                        <li>
                          <Link href="/items/study" className="hover:text-primary">
                            Study
                          </Link>
                        </li>
                        <li>
                          <Link href="/items/office" className="hover:text-primary">
                            Office
                          </Link>
                        </li>
                        <li>
                          <Link href="/items/wedding" className="hover:text-primary">
                            Wedding
                          </Link>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="bg-gray-100 text-gray-400 dark:bg-gray-900 hidden sm:block">
          <ul className="flex flex-wrap justify-center gap-6 py-3">
            <li>
              <Link href="/products" className="hover:text-primary">
                All products
              </Link>
            </li>
            <li>
              <Link href="/items/bed" className="hover:text-primary">
                Bed
              </Link>
            </li>
            <li>
              <Link href="/items/dining" className="hover:text-primary">
                Dining
              </Link>
            </li>
            <li>
              <Link href="/items/kids" className="hover:text-primary">
                Kids
              </Link>
            </li>
            <li>
              <Link href="/items/living" className="hover:text-primary">
                Living
              </Link>
            </li>
            <li>
              <Link href="/items/study" className="hover:text-primary">
                Study
              </Link>
            </li>
            <li>
              <Link href="/items/office" className="hover:text-primary">
                Office
              </Link>
            </li>
            <li>
              <Link href="/items/wedding" className="hover:text-primary">
                Wedding
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-primary">
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;