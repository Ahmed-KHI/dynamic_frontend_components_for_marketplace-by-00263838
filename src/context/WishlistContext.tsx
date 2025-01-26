"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface WishlistContextProps {
  wishlist: Product[];
  addToWishList: (product: Product) => void;
  removeFromWishList: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from local storage
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishList = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item._id === product._id);
      if (exists) return prevWishlist; // Avoid duplicates
      return [...prevWishlist, product];
    });
  };

  const removeFromWishList = (id: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== id)
    );
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item._id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishList, removeFromWishList, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishList must be used within WishlistProvider");
  return context;
};

