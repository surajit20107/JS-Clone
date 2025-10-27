import Image from "next/image";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We are committed to delivering high-quality, innovative solutions
            that enhance everyday life. From cutting-edge technology to
            sustainable practices, our goal is to make a positive impact on the
            world while building lasting relationships with our customers.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-36 w-36 bg-blue-500 mb-4 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/mem.jpeg"
                  alt="member 1"
                  height={150}
                  width={150}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
              <p className="text-sm text-gray-500 mt-2">
                Passionate about technology and innovation, John leads our
                vision.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-36 w-36 bg-blue-500 mb-4 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/mem.jpeg"
                  alt="member 2"
                  height={150}
                  width={150}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
              <p className="text-sm text-gray-500 mt-2">
                Passionate about technology and innovation, John leads our
                vision.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-36 w-36 bg-blue-500 mb-4 mx-auto rounded-full overflow-hidden">
                <Image
                  src="/mem.jpeg"
                  alt="member 3"
                  height={150}
                  width={150}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
              <p className="text-sm text-gray-500 mt-2">
                Passionate about technology and innovation, John leads our
                vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center">
              <FaEnvelope className="text-blue-600 mr-2" />
              <span>contact@company.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-blue-600 mr-2" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-600 mr-2" />
              <span>123 Main St, City, State</span>
            </div>
          </div>
          <button className="mt-8 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
