"use client";

import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { clearCart } from "@/app/redux/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { useOrder } from "@/context/OrderContext";

interface CartItem {
  id: string; // Ensure _id is included
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface BillingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export default function Checkout() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const discount = useSelector((state: RootState) => state.cart.discount);
  const dispatch = useDispatch();
  const { addOrder } = useOrder();

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "credit">("COD");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [orderId, setOrderId] = useState<string | null>(null);

  const subTotal = cart.reduce<number>((total: number, product: CartItem) => {
    return total + (product.price || 0) * (product.quantity || 0);
  }, 0);

  const shippingFee = 2.0;
  const tax = 4.0;
  const discountValue = subTotal * discount;
  const total = subTotal + shippingFee + tax - discountValue;

  const handleBillingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOrderId = uuidv4();

    const newOrder = {
      id: newOrderId,
      status: "pending",
      subtotal: subTotal, // Ensure this is a number
      discount: discount,
      discountValue: discountValue,
      shippingFee: shippingFee,
      tax: tax,
      total: total,
      items: cart.map((product) => ({
        productId: product.id, // Use product._id
        name: product.title,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.image,
      })),
      createdAt: new Date().toISOString(),
    };

    if (paymentMethod === "credit") {
      try {
        alert(`Processing payment for card ending ${cardDetails.cardNumber.slice(-4)}`);
        console.log("Payment successful!");
        addOrder(newOrder);
        setOrderId(newOrderId);
        dispatch(clearCart());
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      }
    } else {
      alert("Order placed successfully with Cash on Delivery!");
      addOrder(newOrder);
      setOrderId(newOrderId);
      dispatch(clearCart());
    }
  };

  return (
    <div className="font-sans md:max-w-4xl mx-auto bg-transparent py-4 px-4">
      <h2 className="text-2xl font-bold text-gray-400">Checkout</h2>
      <hr className="border-gray-300 mt-4 mb-8" />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Billing Details and Payment Form */}
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={billingDetails.name}
                onChange={handleBillingChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                value={billingDetails.email}
                onChange={handleBillingChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="tel"
                name="phone"
                value={billingDetails.phone}
                onChange={handleBillingChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <textarea
                name="address"
                value={billingDetails.address}
                onChange={handleBillingChange}
                placeholder="Street Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="city"
                value={billingDetails.city}
                onChange={handleBillingChange}
                placeholder="City"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="postalCode"
                value={billingDetails.postalCode}
                onChange={handleBillingChange}
                placeholder="Postal Code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-300 mt-8 mb-4">Payment Method</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                />
                Credit / Debit Card
              </label>
            </div>

            {paymentMethod === "credit" && (
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  placeholder="Card Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  placeholder="Expiry Date (MM/YY)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="cvc"
                  value={cardDetails.cvc}
                  onChange={handleCardChange}
                  placeholder="CVC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.map((product: CartItem, index: number) => (
              <div key={product.id || `product-${index}`} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white p-2 rounded-md">
                    <Image
                      alt={product.title}
                      width={100}
                      height={100}
                      src={product.image}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-base font-bold text-gray-800">{product.title}</h4>
                </div>
                <div className="text-base font-bold text-gray-800">
                  Rs.{(product.price || 0).toFixed(2)} x {product.quantity}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between mt-6">
              <span className="font-semibold text-gray-300">Subtotal:</span>
              <span className="font-semibold text-gray-300">Rs.{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-300">Shipping:</span>
              <span className="font-semibold text-gray-300">Rs.{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-300">Tax:</span>
              <span className="font-semibold text-gray-300">Rs.{tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-300">Discount ({discount * 100}%):</span>
              <span className="font-semibold text-gray-300">- Rs.{discountValue.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-gray-300">Total:</span>
              <span className="text-xl font-bold text-gray-300">
                Rs.{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {orderId && (
        <div className="mt-8 bg-green-100 border border-green-300 p-4 rounded-md">
          <p className="text-green-700 font-bold">Your order has been placed successfully!</p>
          <p className="text-green-700">Order ID: {orderId}</p>
          <p className="text-gray-700 mt-2">
            Please save this order ID for future reference and order tracking.
          </p>
        </div>
      )}
    </div>
  );
}