import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthNav from "@/components/AuthNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login or Create an Account | Next Basket E-Commerce",
  description:
    "Securely log in or create a free Next Basket account to enjoy personalized shopping, exclusive discounts, and fast checkout. Your trusted destination for quality products online.",
  keywords: [
    "login",
    "sign up",
    "create account",
    "shop online",
    "JS",
    "ecommerce login",
    "shopping account",
    "secure checkout",
    "discounts",
    "online store",
    "personalized shopping",
    "quality products",
    "trusted online shopping",
    "special offers",
    "special deals",
  ],
  openGraph: {
    title: "Login or Create an Account | Next Basket",
    description:
      "Access your Next Basket account or sign up to start shopping smarter — fast checkout, exclusive offers, and secure purchases.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    siteName: "Next Basket",
    images: [
      {
        url: process.env.NEXT_PUBLIC_BASE_URL as string,
        width: 1200,
        height: 630,
        alt: "Next Basket",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login or Create an Account | Next Basket",
    description:
      "Log in or sign up to enjoy exclusive deals and faster checkout on ShopEase.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/og/banner.png`],
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
  },
};


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthNav />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}
