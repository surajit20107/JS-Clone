"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "@/components/SessionProvider";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Account() {
  const router = useRouter();
  const session = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: session?.user?.name,
    email: session?.user?.email,
    address: "123 Main St, City, State, ZIP",
    profileImage: session?.user?.image,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  type formEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

  const handleChange = (e: formEvent) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    // Handle image upload (e.g., to cloud storage)
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profileImage: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    // Validate and save changes to DB or API
    if (
      profileData.newPassword &&
      profileData.newPassword !== profileData.confirmPassword
    ) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Saving changes:", profileData);
    setIsEditing(false);
    // Reset password fields after save
    setProfileData({
      ...profileData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };
console.log(session)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="relative mb-4">
            <Image
              src={profileData?.profileImage || "/avatar-placeholder.png"}
              alt="Profile Image"
              width={120}
              height={120}
              className="mx-auto rounded-full border-4 border-white"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-1/2 transform translate-x-1/2 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
                <FaEdit />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {session?.user?.name}
          </h1>
          <p className="text-lg">{session?.user?.email}</p>
        </div>
      </section>

      {/* Account Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Account Details</h2>
            <button
              onClick={handleEditToggle}
              className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaEdit className="mr-1" />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="space-y-6">
            {/* Name */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <FaUser className="text-blue-600 mr-2" />
                <label className="font-semibold">Name</label>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{session?.user?.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-blue-600 mr-2" />
                <label className="font-semibold">Email</label>
              </div>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{session?.user?.email}</p>
              )}
            </div>

            {/* Address */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                <label className="font-semibold">Address</label>
              </div>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{profileData.address}</p>
              )}
            </div>

            {/* Change Password */}
            {isEditing && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <FaLock className="text-blue-600 mr-2" />
                  <label className="font-semibold">Change Password</label>
                </div>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={profileData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={profileData.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={profileData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex space-x-4">
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
