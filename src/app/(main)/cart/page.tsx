"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store"; // Adjust the path to your Redux store
import {
  updateQuantity,
  removeFromCart,
  hydrateCart,
} from "@/app/redux/cartSlice";
import { CartItem } from "../../utils/cartTypes"; // Define this type in your project if not already defined
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const discount = useSelector((state: RootState) => state.cart.discount); // Access discount from Redux state
  const dispatch = useDispatch();
  const router = useRouter();

  // Hydrate the cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      dispatch(hydrateCart(parsedCart));
    }
  }, [dispatch]);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/checkout"); // Redirect to a checkout page
    } else {
      alert("Your cart is empty!");
    }
  };

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const discountValue = subtotal * discount; // Calculate the discount value
  const total = subtotal - discountValue; // Adjust the total by applying the discount

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 md:py-16 md:px-12 flex items-center justify-center">
      <div className="max-w-[1440px] w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Your Shopping Cart
        </h1>
        <ul className="space-y-4">
          {cart.map((product) => (
            <li key={product.id} className="flex items-center space-x-4">
              <Image
                src={product.image}
                alt={product.title}
                width={80}
                height={80}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {product.title}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Rs. {product.price.toFixed(2)} x {product.quantity}
                  </p>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    = Rs. {(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                  className="px-2 py-1 text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                  -
                </button>
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {product.quantity}
                </span>
                <button
                  onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                  className="px-2 py-1 text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Subtotal: Rs.{subtotal.toFixed(2)}
            </p>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Discount ({discount * 100}%): -Rs.{discountValue.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Total: Rs.{total.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="px-6 py-2 bg-primary text-white rounded-md"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

