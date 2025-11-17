"use client";
import { useState } from "react";
import Image from "next/image";
import useSwr from "swr";
import { useSession } from "@/components/SessionProvider";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaShoppingBag,
} from "react-icons/fa";

export default function Orders() {
  const session = useSession();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  type Order = {
    _id: string;
    userId: string;
    products: {
      product: {
        _id: string;
        name: string;
        price: number;
        image: string;
      };
      quantity: number;
    }[];
    totalPrice: number;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    deliveryAddress: string;
    deliveryCity: string;
    deliveryState: string;
    createdAt: string;
  };

  const { data: orders, error } = useSwr(
    session?.user?.id ? `/api/order?userId=${session.user.id}` : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  const filteredOrders = orders?.filter
    ? orders.filter(
        (order: Order) =>
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaShoppingBag className="mx-auto text-6xl mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">My Orders</h1>
          <p className="text-lg md:text-xl">
            View and track all your past and current orders.
          </p>
        </div>
      </section>

      {/* Orders List Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Search Bar */}
          <div className="mb-6 flex items-center">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search orders by ID or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {error ? (
              <p className="text-center text-red-600">
                Failed to load orders. Please try again later.
              </p>
            ) : !orders ? (
              <p className="text-center text-gray-600">Loading orders...</p>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order: Order) => (
                <div
                  key={order._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(order.createdAt).toLocaleDateString()} |
                        Total: ₹{order.totalPrice.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Payment: {order.paymentMethod} ({order.paymentStatus})
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-200 text-green-800"
                            : order.status === "Shipped"
                              ? "bg-yellow-200 text-yellow-800"
                              : order.status === "Processing"
                                ? "bg-blue-200 text-blue-800"
                                : order.status === "Cancelled"
                                  ? "bg-red-200 text-red-800"
                                  : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <button
                        onClick={() => toggleExpand(order._id)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        {expandedOrder === order._id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedOrder === order._id && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.products.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white p-2 rounded"
                          >
                            <Image
                              src={item.product.image || "/product.jpeg"}
                              alt={item.product.name}
                              width={50}
                              height={50}
                              className="rounded mr-3"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-600">
                                Qty: {item.quantity} | ₹
                                {item.product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold mb-2">
                          Delivery Address:
                        </h4>
                        <p className="text-sm text-gray-600">
                          {order.deliveryAddress}, {order.deliveryCity},{" "}
                          {order.deliveryState}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                {searchTerm
                  ? "No orders found matching your search."
                  : "You haven't placed any orders yet."}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
