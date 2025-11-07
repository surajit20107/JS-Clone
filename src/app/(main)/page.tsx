"use client";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import swr from "swr";
import ServerError from "@/components/ServerError";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const {
    data: items,
    error,
    isLoading,
  } = swr("/api/product", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 60,
  });

  if (isLoading) {
    return <SkeletonLoader count={10} />;
  }
  if (error) return <ServerError />
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {items.map((item) => (
        <ProductCard key={item._id} item={item} />
      ))}
    </div>
  );
}
