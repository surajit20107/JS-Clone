"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaShoppingBag,
} from "react-icons/fa";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  type Order = {
    id: string;
    date: string;
    total: string;
    status: string;
    items: {
      name: string;
      price: string;
      image: string;
      quantity: number;
    }[];
  };

  // Sample orders data (replace with DB fetch)
  const orders: Order[] = [
    {
      id: "ORD-12345",
      date: "Oct 10, 2023",
      total: "$79.99",
      status: "Delivered",
      items: [
        {
          name: "SonicWave Headphones",
          price: "$79.99",
          image: "/product.jpeg",
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12346",
      date: "Sep 15, 2023",
      total: "$129.98",
      status: "Shipped",
      items: [
        {
          name: "Wireless Mouse",
          price: "$29.99",
          image: "/product.jpeg",
          quantity: 2,
        },
        {
          name: "Keyboard",
          price: "$69.99",
          image: "/product.jpeg",
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12347",
      date: "Aug 20, 2023",
      total: "$49.99",
      status: "Processing",
      items: [
        {
          name: "USB Cable",
          price: "$49.99",
          image: "/product.jpeg",
          quantity: 1,
        },
      ],
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Date: {order.date} | Total: {order.total}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-200 text-green-800"
                            : order.status === "Shipped"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        {expandedOrder === order.id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedOrder === order.id && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white p-2 rounded"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded mr-3"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                Qty: {item.quantity} | {item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Link href="/about" className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors">
                          View Product
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No orders found matching your search.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
