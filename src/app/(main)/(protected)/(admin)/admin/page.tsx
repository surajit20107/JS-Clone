"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit, FaTrash, FaPlus, FaEye, FaTimes } from "react-icons/fa";
import axios from "axios";
import { productSchema } from "@/lib/schema";
import { CldUploadButton } from "next-cloudinary";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

type Tab = "orders" | "products";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  stock?: number;
  rating?: number;
};

type ProductForm = {
  name: string;
  price: number | string;
  description: string;
  category: string;
  stock: number | string;
  rating: number | string;
  image: string;
  imagePublicId?: string;
};

export default function AdminDashboard() {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHashMore] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
    rating: "",
    imagePublicId: "",
  });

  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      user: "John Doe",
      total: "$79.99",
      status: "Delivered",
      date: "Oct 10, 2023",
    },
    {
      id: "ORD-12346",
      user: "Jane Smith",
      total: "$129.98",
      status: "Shipped",
      date: "Sep 15, 2023",
    },
  ]);

  const [products, setProducts] = useState<Product[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/product?page=${page}`);
      setProducts(response.data.products);
      setHashMore(response.data.hasMore);
      console.log("All Products", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "orders" && orders.length === 0) {
      fetchOrders();
    }

    if (activeTab === "products") {
      fetchProducts();
    }
  }, [activeTab, page]);

  const handleTabChange = (tab: Tab) => setActiveTab(tab);

  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);

    if (product) {
      setProductForm({
        name: product.name,
        price: String(product.price),
        description: product.description,
        image: product.image,
        category: product.category ?? "",
        stock: product.stock !== undefined ? String(product.stock) : "",
        rating: product.rating !== undefined ? String(product.rating) : "",
      });
    } else {
      setProductForm({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        stock: "",
        rating: "",
      });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // convert price, stock, rating to number
      productForm.price = Number(productForm.price);
      productForm.stock = Number(productForm.stock);
      productForm.rating = Number(productForm.rating);
      // validate productForm
      const result = productSchema.safeParse(productForm);
      if (!result.success) {
        alert(result.error.issues[0].message);
        return;
      }
      const data = await axios.post("/api/product", productForm);
      console.log(data);
      if (data.status === 201) {
        setProducts((prev) => [...prev, data.data.product]);
        closeModal();
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Filed to create product");
    }
  };

  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  const handleEditProduct = async (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
    setProductForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      image: product.image,
      category: product.category ?? "",
      stock: product.stock !== undefined ? String(product.stock) : "",
      rating: product.rating !== undefined ? String(product.rating) : "",
    });
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const updatedProductForm = {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        rating: Number(productForm.rating),
      };

      const data = await axios.put(
        `/api/product?id=${product._id}`,
        updatedProductForm,
      );

      if (data.status === 200) {
        // Update the product in the state
        setProducts((prevProduct) =>
          prevProduct.map((p) =>
            p._id === product._id
              ? ({ ...p, ...updatedProductForm } as Product)
              : p,
          ),
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id: String) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.delete(`/api/product?id=${id}`);
      if (response.status === 200) {
        setProducts((prev) => prev.filter((p) => p._id !== String(id)));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">
                    {order.user} | {order.date} | {order.total}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleOrderStatusChange(order.id, e.target.value)
                    }
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
        );
      case "products":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Manage Products</h2>
              <button
                onClick={() => openModal()}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
              >
                <FaPlus className="mr-1" /> Product
              </button>
            </div>
            {products.map((product: Product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 h-12 overflow-hidden">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-600 text-white py-2 px-3 rounded hover:bg-yellow-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {/* pagination */}
            <div className="mt-10">
              <div className="flex justify-center items-center gap-8 md:gap-16">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  <IoIosArrowDropleftCircle size={30} />
                </button>
                <span className="font-semibold md:font-bold md:text-xl">
                  {page}
                </span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!hasMore}
                >
                  <IoIosArrowDroprightCircle size={30} />
                </button>
              </div>
            </div>
            {/* pagination end */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Manage orders and products efficiently.
          </p>
        </div>
      </section>

      {/* Tabs and Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex space-x-4 mb-8 border-b justify-evenly">
            {["orders", "products"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as Tab)}
                className={`py-2 px-4 font-semibold capitalize ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                {tab}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </section>

      {/* Modal for Product Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productForm.name}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={productForm.price}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={productForm.description}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={productForm.category}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={productForm.stock}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={productForm.rating}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
                min={1}
                max={5}
                step={1}
              />
              <CldUploadButton
                uploadPreset="ml_default"
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold mb-4"
                onSuccess={(result: any) => {
                  const imageUrl = result.info.secure_url;
                  const publicId = result.info.public_id;
                  setProductForm((prev) => ({
                    ...prev,
                    image: imageUrl,
                    imagePublicId: publicId,
                  }));
                }}
              />

              {editingProduct ? (
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateProduct(editingProduct);
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Edit Product
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSaveProduct}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Add Product
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
