"use client";

import React from "react";
import { useOrder } from "@/context/OrderContext";
import Image from "next/image";

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { getOrderById } = useOrder();
  const order = getOrderById(orderId);

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Order ID: {order.id}</h2>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                order.status === "Delivered"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Total:</span> Rs.{" "}
            {order.total.toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <ul className="space-y-4">
            {order.items.map((item) => (
              <li key={item.productId} className="flex space-x-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Rs. {item.price} x {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
