"use client"
import Image from 'next/image';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

interface Product {
  imageSrc: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  features?: string[]
}

interface ProductCardProps {
  item: Product;
}

export default function ProductCard({ item }: ProductCardProps) {
  // Destructure props from the item object (adjust based on your DB schema)
  const { imageSrc, title, price, originalPrice, rating, reviews, description, features } = item;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit:"cover" }}
          className="rounded-t-lg"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        {/* Pricing */}
        <div className="flex items-center mb-2">
          <span className="text-xl font-bold text-green-600">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">${originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < (rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">({reviews} reviews)</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3">{description}</p>

        {/* Features */}
        <ul className="text-xs text-gray-600 mb-4">
          {features?.map((feature: string, index: number) => (
            <li key={index} className="flex items-center">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Add to Cart Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}