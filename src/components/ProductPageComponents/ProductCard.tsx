"use client";

import React from "react";
import Image from "next/legacy/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice"; // Adjust the path to your Redux slice
import { addToWishlist } from "@/app/redux/wishlistSlice"; // Import the addToWishlist action
import { toast } from "sonner"; // Optional: For toast notifications

interface ProductCardProps {
  product: {
    _id: string; // Ensure _id is included
    title: string;
    price: number;
    imageUrl: string | null;
    inventory: number;
    slug: string;
    description?: string; // Optional field
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id, // Use _id as the unique identifier
      title: product.title,
      description: product.description || "", // Handle optional fields
      price: product.price,
      image: product.imageUrl || "", // Handle optional image
      quantity: 1, // Default quantity
    };
    dispatch(addToCart(cartItem)); // Dispatch the addToCart action
    toast.success(`${product.title} added to cart!`); // Optional: Show a toast notification
    console.log("Added to cart:", cartItem);
  };

  const handleAddToWishlist = () => {
    const wishlistItem = {
      id: product._id, // Use _id as the unique identifier
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl || "", // Handle optional image
      quantity: 1, // Default quantity
    };
    dispatch(addToWishlist(wishlistItem)); // Dispatch the addToWishlist action
    toast.success(`${product.title} added to wishlist!`); // Optional: Show a toast notification
    console.log("Added to wishlist:", wishlistItem);
  };

  const handleViewDetails = () => {
    router.push(`/products/${product.slug}`);
  };

  return (
    <Card className="w-full shadow-lg border rounded-lg">
      <CardHeader className="p-4">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={350}
            height={350}
            className="rounded-lg object-cover w-full h-64"
          />
        ) : (
          <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-lg font-medium text-gray-800 dark:text-gray-400">
          Rs. {product.price.toFixed(2)}
        </p>
        <p className="text-sm text-green-700">
          {product.inventory > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex flex-wrap items-center gap-2 justify-between">
        <Button
          className="flex-1 sm:flex-none min-w-[8rem] bg-blue-600 hover:bg-blue-700 text-white"
          disabled={product.inventory <= 0}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          className="flex-1 sm:flex-none min-w-[8rem] bg-gray-600 hover:bg-gray-700 text-white"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </Button>
        <Button
          className="flex-1 sm:flex-none min-w-[8rem] bg-green-600 hover:bg-green-700 text-white"
          onClick={handleViewDetails}
        >
          See Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;