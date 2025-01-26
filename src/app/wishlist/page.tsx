"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  removeFromWishlist,
  updateWishlistItemQuantity,
  clearWishlist,
} from "@/app/redux/wishlistSlice";
import { addToCart, setDiscount } from "@/app/redux/cartSlice"; // Import the addToCart and setDiscount actions
import { toast } from "sonner"; // Optional: For toast notifications

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Apply Discount
  const applyDiscount = () => {
    const discountCodes = {
      SAVE10: 0.1, // 10% off
      SAVE20: 0.2, // 20% off
    };

    const discount =
      discountCodes[discountCode.toUpperCase() as keyof typeof discountCodes] || 0;
    setDiscountAmount(discount);
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const handleQuantityChange = (id: string, action: "increase" | "decrease") => {
    const item = wishlistItems.find((item) => item.id === id);
    if (item) {
      const newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
      dispatch(updateWishlistItemQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  const handleMoveToCart = () => {
    // Move all wishlist items to the cart
    wishlistItems.forEach((product) => {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.imageUrl,
        quantity: product.quantity,
      };
      dispatch(addToCart(cartItem)); // Dispatch addToCart for each item
    });

    // Clear the wishlist after moving items to the cart
    dispatch(clearWishlist());

    // Calculate the total amount with discount
    const subtotal = wishlistItems.reduce((total, product) => total + product.price * product.quantity, 0);
    const discountValue = subtotal * discountAmount;
    const total = subtotal - discountValue;

    // Set the discount in the cart state
    dispatch(setDiscount(discountAmount));

    // Show a toast notification with the total amount and discount
    toast.success(
      `All items have been moved to your cart! Total: Rs. ${total.toLocaleString()} (Discount: Rs. ${discountValue.toLocaleString()})`
    );
  };

  const subtotal = wishlistItems.reduce((total, product) => total + product.price * product.quantity, 0);
  const discountValue = subtotal * discountAmount;
  const total = subtotal - discountValue;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-cover bg-center py-16 mb-12 text-white">
        <div className="container text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-4xl font-semibold mb-4 font-poppins">Wishlist</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span>
              <Image src="/rightA.png" width={20} height={20} alt="arrow" />
            </span>
            <span>Wishlist</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Wishlist Items */}
        <Card className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg border-2 border-gray-200">
          <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-gray-800">Wishlist Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 border-b py-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden shadow-sm">
                      <Image
                        src={product.imageUrl || "/images/default-placeholder.jpg"}
                        alt={product.title}
                        layout="intrinsic"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{product.title}</h3>
                      <p className="text-sm text-gray-500">Rs. {product.price}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(product.id, "decrease")}
                          disabled={product.quantity <= 1}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span>{product.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(product.id, "increase")}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveItem(product.id)}
                      className="text-red-500 hover:bg-red-100 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Your wishlist is empty.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Summary */}
        <Card className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg border-2 border-gray-200">
          <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-gray-800">Wishlist Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist.
            </p>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold text-gray-800">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Discount:</span>
              <span className="font-semibold text-gray-800">
                Rs. {discountValue.toLocaleString()} ({discountAmount * 100}%)
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Total:</span>
              <span className="font-semibold text-gray-800">Rs. {total.toLocaleString()}</span>
            </div>

            <div className="mt-4 inline-grid">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter Discount Code"
                className="w-full p-2 border rounded-md"
              />
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={applyDiscount}
              >
                Apply Discount
              </Button>
            </div>
          </CardContent>
          <CardFooter className="inline-grid">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleMoveToCart}
            >
              Move All to Cart
            </Button>
            <Button
              className="w-full bg-red-500 text-white mt-2 hover:bg-red-600"
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
