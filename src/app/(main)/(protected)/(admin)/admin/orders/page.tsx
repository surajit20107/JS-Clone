"use client";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

type Order = {
  _id: string;
  user: string;
  total: string;
  status: string;
  date: string;
};

export default function OrdersPage() {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/orders?page=${page}`);
      setOrders(response.data.orders);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
    );
    // Optionally, send update to API here
    // await axios.put(`/api/order/${orderId}`, { status: newStatus });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Orders Management</h1>
          <p className="text-lg md:text-xl mb-8">View and manage all orders from the database.</p>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div className="flex-1 min-w-0"> {/* Added flex-1 min-w-0 to allow truncation */}
                    <h3 className="font-semibold truncate">Order #{order._id}</h3> {/* Added truncate class */}
                    <p className="text-gray-600">
                      {order.user} | {order.date} | {order.total}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0"> {/* Added flex-shrink-0 to prevent shrinking */}
                    <select
                      value={order.status}
                      onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10">
            <div className="flex justify-center items-center gap-8 md:gap-16">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="disabled:opacity-50"
              >
                <IoIosArrowDropleftCircle size={30} />
              </button>
              <span className="font-semibold md:font-bold md:text-xl">{page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore}
                className="disabled:opacity-50"
              >
                <IoIosArrowDroprightCircle size={30} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
