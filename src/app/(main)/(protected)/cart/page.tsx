"use client";
import { useState } from "react";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  // Sample cart data (replace with state management like Redux or Context)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "SonicWave Headphones",
      price: 79.99,
      quantity: 1,
      image: "/product.jpeg",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 29.99,
      quantity: 2,
      image: "/product.jpeg",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% tax example
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    // Handle checkout (e.g., redirect to payment page)
    console.log("Proceeding to checkout...");
    alert("Redirecting to checkout!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>{" "}
        {/* Subtle overlay for depth */}
        <div className="relative container mx-auto px-4 text-center">
          <FaShoppingCart className="mx-auto text-5xl md:text-6xl mb-4 animate-bounce" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Your Shopping Cart
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto drop-shadow">
            Review your selections, adjust quantities, and proceed to a seamless
            checkout experience.
          </p>
        </div>
      </section>

      {/* Cart Items Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="xl:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg mb-4 sm:mb-0 sm:mr-4 object-cover"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <FaMinus size={14} />
                      </button>
                      <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <FaPlus size={14} />
                      </button>
                    </div>
                    <div className="ml-4 text-center sm:text-right mt-4 sm:mt-0">
                      <p className="font-bold text-lg text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-6 rounded-xl shadow-lg sticky top-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%):</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Proceed to Checkout
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Secure payment via Stripe
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-6" />
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Looks like you haven't added anything yet. Start shopping to
                fill it up!
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
