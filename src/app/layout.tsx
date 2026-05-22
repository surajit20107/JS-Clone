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
  metadataBase: new URL("https://js-clone-two.vercel.app"),
  title: {
    default: "JS Clone Shop",
    template: "%s | JS Clone Shop for online shopping", // use "Home" -> "Home | JS Clone Shop"
  },
  description:
    "JS Clone Shop — curated products, great prices and fast shipping. Discover trending items, secure checkout and member deals.",
  keywords: [
    "shop online",
    "JS online shop",
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
    title: "JS Clone Shop",
    description:
      "Shop trending products with fast delivery and secure checkout at JS Clone Shop.",
    url: "https://js-clone-two.vercel.app",
    siteName: "JS Clone Shop",
    images: [
      {
        // Replace with your final home OG image in public/og/home-og.jpg
        url: "/og/banner.jpg",
        width: 1200,
        height: 630,
        alt: "JS Clone Shop — curated products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JS Clone Shop",
    description:
      "Find curated products, secure checkout and fast shipping at JS Clone Shop.",
    images: ["/og/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://js-clone-two.vercel.app/",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JS Clone Shop",
  url: "https://js-clone-two.vercel.app",
  logo: "https://js-clone-two.vercel.app/logo.png", // replace with your logo path
  sameAs: [
    // add your social links if available
    "https://twitter.com/yourhandle",
    "https://www.facebook.com/yourpage",
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JS Clone Shop",
  url: "https://js-clone-two.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://js-clone-two.vercel.app/search?q={search_term_string}",
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
