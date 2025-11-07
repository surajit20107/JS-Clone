import Link from "next/link";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";

export default function ServerError() {
  const handleRetry = () => {
    window.location.reload(); // Simple retry by reloading the page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
      {/* Main Content */}
      <div className="text-center max-w-lg mx-auto px-6">
        {/* Icon with Animation */}
        <div className="mb-8">
          <FaExclamationTriangle className="mx-auto text-8xl text-red-500 animate-pulse" />
        </div>

        {/* Error Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Oops! Server Down
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          We're experiencing some technical difficulties on our end. Our team is working hard to fix this. Please try again later or contact support if the problem persists.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="inline-flex items-center bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FaRedo className="mr-2" />
            Try Again
          </button>
          <br />
          <Link href="/">
            Go Back Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Error Code: 500 | Internal Server Error</p>
          <p>
            If this continues, please{" "}
            <a
              href="mailto:support@company.com"
              className="underline hover:text-gray-700"
            >
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
