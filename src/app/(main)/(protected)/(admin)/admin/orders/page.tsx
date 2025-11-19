"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { FaArrowLeft, FaEye, FaTimes } from "react-icons/fa";
import Link from "next/link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

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
  paymentId: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryCountry: string;
  deliveryPincode: string;
  deliveryPhone: string;
  deliveryEmail: string;
  createdAt: string;
  updatedAt: string;
};

export default function OrdersPage() {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: string,
  ) => {
    try {
      // Update locally first for immediate feedback
      setOrders(
        orders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o,
        ),
      );

      // Update on server
      await axios.put(`/api/admin/orders?id=${orderId}`, { status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
      // Revert on error
      fetchOrders();
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg">Loading orders...</p>
      </div>
    );
  }
console.log("orders:", orders)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 md:p-4">
        <div>
          <Link
            href="/admin"
            className="text-white hover:underline cursor-pointer">
            <FaArrowLeft className="inline-block mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <div className="container mx-auto py-16 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Orders Management
          </h1>
          <p className="text-lg md:text-xl mb-8">
            View and manage all orders from the database.
          </p>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl font-semibold mb-4">
            All Orders ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(order.createdAt).toLocaleDateString()} at{" "}
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Customer:</span>{" "}
                        {order.deliveryEmail}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Total:</span> ₹
                        {order.totalPrice.toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Payment:</span>{" "}
                        {order.paymentMethod} -{" "}
                        <span
                          className={
                            order.paymentStatus === "Paid"
                              ? "text-green-600 font-semibold"
                              : "text-orange-600 font-semibold"
                          }
                        >
                          {order.paymentStatus}
                        </span>
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Items:</span>{" "}
                        {order.products.length} product(s)
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleOrderStatusChange(order._id, e.target.value)
                        }
                        className={`px-3 py-1 border border-gray-300 rounded text-sm font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-50 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700"
                              : order.status === "Processing"
                                ? "bg-yellow-50 text-yellow-700"
                                : order.status === "Cancelled"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center gap-2"
                      >
                        <FaEye /> View Details
                      </button>
                    </div>
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
                className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
              >
                <IoIosArrowDropleftCircle size={30} />
              </button>
              <span className="font-semibold md:font-bold md:text-xl">
                Page {page}
              </span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore}
                className={!hasMore ? "opacity-50 cursor-not-allowed" : ""}
              >
                <IoIosArrowDroprightCircle size={30} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">
                Order Details #{selectedOrder._id.slice(-8).toUpperCase()}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Order Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Order ID:</span>{" "}
                      {selectedOrder._id}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Updated:</span>{" "}
                      {new Date(selectedOrder.updatedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="font-semibold">
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Payment Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Method:</span>{" "}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="font-semibold">
                        {selectedOrder.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Payment ID:</span>{" "}
                      {selectedOrder.paymentId}
                    </p>
                    <p>
                      <span className="font-medium">Total Amount:</span> ₹
                      {selectedOrder.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  Delivery Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {selectedOrder.deliveryAddress}
                    </p>
                    <p>
                      <span className="font-medium">City:</span>{" "}
                      {selectedOrder.deliveryCity}
                    </p>
                    <p>
                      <span className="font-medium">State:</span>{" "}
                      {selectedOrder.deliveryState}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Country:</span>{" "}
                      {selectedOrder.deliveryCountry}
                    </p>
                    <p>
                      <span className="font-medium">Pincode:</span>{" "}
                      {selectedOrder.deliveryPincode}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedOrder.deliveryPhone}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedOrder.deliveryEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Products</h4>
                <div className="space-y-3">
                  {selectedOrder.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold">{item.product.name}</h5>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × &#8377;
                          {item?.product?.price?.toFixed(2)} = &#8377;
                          {(item?.quantity * item?.product?.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
