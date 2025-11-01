"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaUsers,
  FaShoppingBag,
  FaBox,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaTimes,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [userRole, setUserRole] = useState("");

  // Sample data (replace with DB fetches)
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  ]);

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

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "SonicWave Headphones",
      price: 79.99,
      description: "Wireless headphones",
      image: "/product.jpeg",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 29.99,
      description: "Ergonomic mouse",
      image: "/product.jpeg",
    },
  ]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const openModal = (product = null) => {
    setEditingProduct(product);
    setProductForm(
      product || { name: "", price: "", description: "", image: "" },
    );
    setShowModal(true);
  };

  const openUserModal = (user) => {
    setEditingUser(user);
    setUserRole(user.role);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setEditingUser(null);
  };

  const handleFormChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productForm } : p,
        ),
      );
    } else {
      setProducts([...products, { ...productForm, id: Date.now() }]);
    }
    closeModal();
  };

  const handleSaveUserRole = () => {
    setUsers(
      users.map((u) =>
        u.id === editingUser.id ? { ...u, role: userRole } : u,
      ),
    );
    closeModal();
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-gray-600">
                    {user.email} | Role: {user.role}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => openUserModal(user)}
                    className="bg-yellow-600 text-white py-1 px-3 rounded hover:bg-yellow-700 flex items-center"
                  >
                    <FaEdit className="mr-1" /> Edit Role
                  </button>
                  <button className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
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
                <FaPlus className="mr-2" /> Add Product
              </button>
            </div>
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
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
                    <p className="text-gray-600">
                      ${product.price} | {product.description}
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-yellow-600 text-white py-1 px-3 rounded hover:bg-yellow-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
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
            Manage users, orders, and products efficiently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <FaUsers className="mx-auto text-3xl mb-2" />
              <h3 className="text-xl font-semibold">{users.length} Users</h3>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <FaShoppingBag className="mx-auto text-3xl mb-2" />
              <h3 className="text-xl font-semibold">{orders.length} Orders</h3>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <FaBox className="mx-auto text-3xl mb-2" />
              <h3 className="text-xl font-semibold">
                {products.length} Products
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs and Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex space-x-4 mb-8 border-b">
            {["users", "orders", "products"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`py-2 px-4 font-semibold capitalize ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </section>

      {/* Modal for Product or User Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingProduct
                  ? "Edit Product"
                  : editingUser
                    ? "Edit User Role"
                    : "Add Product"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>
            {editingUser ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveUserRole();
                }}
              >
                <label className="block mb-2">Role</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Update Role
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProduct();
                }}
              >
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
                  name="image"
                  placeholder="Image URL"
                  value={productForm.image}
                  onChange={handleFormChange}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
