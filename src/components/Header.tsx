"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Button from "./Button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: "/accueil", label: "Accueil" },
    { href: "/taxes", label: "Taxes" },
    { href: "/contacts", label: "Contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-district.svg"
                alt="District Autonome d'Abidjan"
                width={80}
                height={80}
                className="mr-2"
              />
              <div className="ml-5">
                <Image
                  src="/images/taxes-district.svg"
                  alt="taxes.district.ci"
                  width={180}
                  height={30}
                  className="h-auto"
                />
              </div>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-15">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-blue font-bold"
                    : "text-black hover:text-blue font-medium"
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button href="/votre-espace" icon={Lock} color="orange">
              Votre espace
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-3 px-4 animate-fadeIn shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 px-1 ${
                  isActive(link.href)
                    ? "text-blue font-bold"
                    : "text-black hover:text-blue-700 font-medium"
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button href="/espace" icon={Lock} fullWidth>
                Votre espace
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
