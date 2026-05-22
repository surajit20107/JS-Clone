import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"]
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: "Next Basket Shop – Online Shopping for Fashion & More",
    template: "%s | Next Basket Shop"
  },
  description: "Next Basket Shop offers curated products at great prices with fast shipping, secure checkout, exclusive member deals, and trending items across multiple categories.",
  keywords: [
    "shop online",
    "online shopping",
    "ecommerce store",
    "Next Basket shop",
    "ecommerce",
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
    title: "Next Basket Shop – Trending Products at Great Prices",
    description: "Discover trending products, fast delivery, secure checkout, and exclusive deals at Next Basket Shop for a better online shopping experience.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Next Basket Shop",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Next Basket Online Store — Shop More. Live Better.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Basket Shop – Trending Products & Fast Delivery",
    description: "Shop curated products with secure checkout, fast shipping, exclusive deals, and trending collections at Next Basket Shop.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Next Basket Shop",
  url: process.env.NEXT_PUBLIC_BASE_URL,
  logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
  sameAs: [
    // add your social links if available
    "https://twitter.com/yourhandle",
    "https://www.facebook.com/yourpage",
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Next Basket Shop",
  url: process.env.NEXT_PUBLIC_BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex-grow">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
