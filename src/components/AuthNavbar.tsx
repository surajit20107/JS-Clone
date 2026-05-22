"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNav() {
  const pathname = usePathname();

  const authLink = pathname === "/login" ? "/register" : "/login";
  const authLabel = pathname === "/login" ? "Register" : "Login";

  const links = [
    { href: "/", label: "Home" },
    { href: authLink, label: authLabel },
  ];

  return (
    <nav className="bg-zinc-800 text-white shadow-lg relative sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Next Basket
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-8">
            <div className="flex space-x-2 items-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-1 rounded-md text-sm font-medium ${
                    pathname === link.href ? "bg-zinc-700" : "hover:bg-zinc-500"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
