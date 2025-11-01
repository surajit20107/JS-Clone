"use client";
import { useSession } from "@/components/SessionProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, router]);

  if (session?.user?.role === "admin") {
    setLoading(false);
  }

  return (
    <>
      {loading ? <SkeletonLoader count={10} /> : children}
    </>
  )
}
