"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(
    "123 Main St, City, State, ZIP",
  );
  const [paymentMethod, setPaymentMethod] = useState(
    "**** **** **** 1234 (Visa)",
  );

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save changes to DB or state
    setIsEditing(false);
  };

  // Sample data (replace with DB fetches)
  const orders = [
    { id: "12345", date: "Oct 10, 2023", total: "$79.99", status: "Delivered" },
    { id: "12346", date: "Sep 15, 2023", total: "$49.99", status: "Shipped" },
  ];

  const wishlist = [
    {
      id: 1,
      name: "SonicWave Headphones",
      price: "$79.99",
      image: "/product.jpeg",
    },
    { id: 2, name: "Wireless Mouse", price: "$29.99", image: "/product.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">Order History</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Date: {order.date} | Total: {order.total}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${order.status === "Delivered" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start">
            <div className="flex flex-col w-fit">
              <Link
                href="/orders"
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                View All Orders
              </Link>
              <Link
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                href="/account"
              >
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price}</p>
                </div>
                <button className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Account Settings Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Account Settings</h2>
            <button
              onClick={handleEditToggle}
              className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaEdit className="mr-1" />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                <h3 className="font-semibold">Shipping Address</h3>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{shippingAddress}</p>
              )}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <FaCreditCard className="text-blue-600 mr-2" />
                <h3 className="font-semibold">Payment Method</h3>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{paymentMethod}</p>
              )}
            </div>
          </div>
          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
