"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useSession } from "@/components/SessionProvider";
import SkeletonLoader from "@/components/SkeletonLoader";
import axios from "axios";
import { toast } from "sonner";

interface CartItem {
  _id: string;
  userId: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  totalPrice: number;
}

export default function Cart() {
  const session = useSession();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!session?.user?.id) return;
        setIsLoading(true);
        const res = await axios.get(`/api/cart?userId=${session?.user.id}`);
        if (res.status === 200) {
          setCartItems(res.data?.userCart || []);
        }
      } catch (error) {
        console.error(error);
        alert("Error fetching cart details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [session?.user?.id]);

  const updateQuantity = async (productId: string, delta: number) => {
    if (!session?.user?.id) return;

    try {
      const endpoint = delta > 0 ? "/api/cart/increment" : "/api/cart/decrement";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          productId,
        }),
      });

      if (!res.ok) {
        console.error("Server error:", res.status);
        return;
      }

      const data = await res.json();

      const updatedQty = data.quantity;

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? {
                ...item,
                quantity: updatedQty,
                totalPrice: item.productId.price * updatedQty,
              }
            : item,
        ),
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const res = await axios.delete("/api/cart", {
        data: {
          userId: session?.user?.id,
          productId: id,
        },
      });

      if (res.status !== 200) {
        alert("Failed");
      }

      setCartItems(cartItems.filter((item) => item.productId._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = cartItems?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;
  const tax = subtotal * 0.08; // 8% tax example
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    try {
      const res = await axios.post("/api/order", {
        userId: session?.user?.id,
      });

      if (res.status === 200) {
        toast.success("Order placed successfully")
      }
    } catch (error) {
      console.error(error);
      toast.error("Error placing order");
    }
  };

  if (isLoading) {
    return <SkeletonLoader count={3} />;
  }

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
                {cartItems?.map((item) => (
                  <div
                    key={item?.productId?._id}
                    className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center"
                  >
                    <Image
                      src={item?.productId?.image || "/product.jpeg"}
                      alt={item?.productId?.name || "Product Image"}
                      width={100}
                      height={100}
                      className="rounded-lg mb-4 sm:mb-0 sm:mr-4 h-auto w-auto object-cover"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item?.productId?.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        &#8377;{item?.productId?.price?.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                      <button
                        onClick={() => updateQuantity(item.productId._id, -1)}
                        className="bg-gray-200 text-gray-700 p-2 rounded-full hover:cursor-pointer hover:bg-gray-300 transition-colors"
                      >
                        <FaMinus size={14} />
                      </button>
                      <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId._id, 1)}
                        className="bg-gray-200 text-gray-700 p-2 rounded-full hover:cursor-pointer hover:bg-gray-300 transition-colors"
                      >
                        <FaPlus size={14} />
                      </button>
                    </div>
                    <div className="ml-4 text-center sm:text-right mt-4 sm:mt-0">
                      <p className="font-bold text-lg text-gray-800">
                        &#8377;{item.totalPrice?.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-red-500 hover:cursor-pointer hover:text-red-700 mt-2 transition-colors"
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
                    <span className="font-medium">
                      &#8377;{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%):</span>
                    <span className="font-medium">&#8377;{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="font-medium">
                      {shipping === 0
                        ? "Free"
                        : `&#8377;${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total:</span>
                    <span>&#8377;{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:cursor-pointer hover:shadow-lg"
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
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
