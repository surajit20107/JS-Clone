import ProductCard from "@/components/ProductCard"

export default function Home() {
  const items = [
    {
      id: 1,
      imageSrc: "/product.jpeg",
      title: "SonicWave Headphones",
      price: "79.99",
      originalPrice: "99.99",
      rating: 4,
      reviews: 1247,
      description:
        "Immersive audio experience with deep bass and crisp highs. Designed for comfort and durability.",
      features: [
        "Active Noise Cancellation",
        "30h Battery Life",
        "Bluetooth 5.2",
      ],
    },
    {
      id: 2,
      imageSrc: "/product.jpeg",
      title: "AeroFit Smartwatch",
      price: "149.99",
      originalPrice: "189.99",
      rating: 5,
      reviews: 2031,
      description:
        "Track your fitness, sleep, and heart rate with a stunning AMOLED display and water resistance.",
      features: ["AMOLED Display", "Heart Rate Monitor", "GPS Tracking"],
    },
    {
      id: 3,
      imageSrc: "/product.jpeg",
      title: "LumiLamp Desk Light",
      price: "39.99",
      originalPrice: "59.99",
      rating: 4,
      reviews: 678,
      description:
        "Sleek and minimal LED desk lamp with adjustable brightness and color temperature.",
      features: ["Touch Control", "USB Charging Port", "Adjustable Arm"],
    },
    {
      id: 4,
      imageSrc: "/product.jpeg",
      title: "Nimbus Bluetooth Speaker",
      price: "89.99",
      originalPrice: "119.99",
      rating: 4,
      reviews: 953,
      description:
        "Portable Bluetooth speaker with powerful bass and waterproof design for outdoor adventures.",
      features: ["IPX7 Waterproof", "20h Playtime", "Built-in Mic"],
    },
    {
      id: 5,
      imageSrc: "/product.jpeg",
      title: "PixelPro Camera",
      price: "499.99",
      originalPrice: "599.99",
      rating: 5,
      reviews: 842,
      description:
        "Capture stunning photos with a 24MP sensor and advanced image stabilization technology.",
      features: ["24MP Sensor", "4K Video", "Wi-Fi & NFC"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  )
}
