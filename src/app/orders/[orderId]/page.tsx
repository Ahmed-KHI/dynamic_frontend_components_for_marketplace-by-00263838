"use client";

import { useRouter } from "next/router";
import OrderDetails from "../../components/OrderDetails";
import { useOrder } from "@/context/OrderContext";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const { getOrderById } = useOrder();

  if (!orderId) {
    return <p>Loading...</p>;
  }

  const order = getOrderById(orderId as string);

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <OrderDetails orderId={orderId as string} />
    </div>
  );
};

export default OrderDetailsPage;
