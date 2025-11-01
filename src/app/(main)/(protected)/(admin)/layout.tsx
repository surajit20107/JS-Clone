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
    if (session === undefined) return; // session is still loading
    if (!session?.user?.isAdmin) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [session, router]);

  if (loading) {
    return <SkeletonLoader count={10} />;
  }

  return <>{children}</>;
}
