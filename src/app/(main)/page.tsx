"use client";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import swr from "swr";
import ServerError from "@/components/ServerError";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  stock?: number;
  rating?: number;
  reviews?: number;
}

export default function Home() {
  const [page, setPage] = useState(1);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: items,
    error,
    isLoading,
  } = swr(`/api/product?page=${page}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 60,
  });
  
  if (isLoading) {
    return <SkeletonLoader count={10} />;
  }
  if (error) return <ServerError />

  return (
    <div className="min-h-screen flex flex-col">
      {/* product cards */}
      <div className="flex-1">
        <div className="grid grid-co-1 md:grid-cols-3 gap-6 p-6">
          {items.products.map((item: Product) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* pagination */}
      <div className="my-4 mb-6">
        {!items?.hasmore && (
          <div className="flex justify-center items-center gap-8 md:gap-16">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}>
              <IoIosArrowDropleftCircle size={30} />
            </button>
            <span className="font-semibold md:font-bold md:text-xl">
              {page}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!items.hasMore}>
              <IoIosArrowDroprightCircle size={30} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
