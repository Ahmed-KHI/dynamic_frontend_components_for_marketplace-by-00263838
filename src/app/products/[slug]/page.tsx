/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import AboutNewsletterSection from "@/components/AboutPageComponents/NewsletterSection";
import { toast } from "sonner";
import { IoAddCircle } from "react-icons/io5";

async function fetchProducts() {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
}

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">No products found.</p>
      </div>
    );
  }

  const handleAddToCart = (product: any) => {
    
      const cartItem = {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.imageUrl,
        quantity,
      };
      dispatch(addToCart(cartItem));
      toast("Item has been successfully added to the cart", {
        icon: <IoAddCircle />,
      });
    
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto p-4 lg:p-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center border rounded-lg shadow-lg p-4"
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover w-full h-64 rounded-md"
              />
            ) : (
              <div className="h-64 bg-gray-300 rounded-md flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
            <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
            <p className="text-lg text-gray-700 font-medium mt-2">
              Rs.{product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>

            <div className="flex items-center space-x-4 mt-4">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <Input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 border border-gray-300 rounded-md text-center"
              />
            </div>

            <Button
              onClick={() => handleAddToCart(product)}
              className="bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg mt-4"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      <AboutNewsletterSection />
    </>
  );
};

export default ProductPage;
