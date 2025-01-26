"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

const HeaderTop = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className="bg-slate-800 text-stone-200 flex items-center justify-center px-4 py-2 text-xs sm:text-sm relative">
        <div className="flex items-center gap-2 text-center max-w-screen-md">
          <Image src="/truck.png" alt="logo" width={18} height={18} />
          <span>
           Big Sale! Get up to <strong className="text-orange-400">30% Off</strong> on selected furniture. 
          Offer ends <strong className="text-orange-400">Sunday!</strong> 
          </span>
        </div>

        <button
          aria-label="Close announcement"
          onClick={() => setIsVisible(false)}
          className="absolute right-4 sm:right-8 text-white hover:text-gray-300"
        >
          <IoMdClose className="text-base sm:text-lg" />
        </button>
      </div>
    )
  );
};

export default HeaderTop;