"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden">
      {/* Background bleu clair */}
      <div className="absolute inset-0 bg-bluewhite z-0"></div>

      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url("/images/wave-background.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto py-20 px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Bloc gauche: Logo et description */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 mr-2">
                <Image
                  src="/images/logo-district.png"
                  alt="Logo District Autonome d'Abidjan"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  District autonome
                  <br />
                  d'Abidjan
                </p>
              </div>
            </div>
            <p className="text-xs leading-5 text-gray-600 pr-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              finibus, rhoncus orci, eu eleifend neque pellentesque non.
            </p>
          </div>

          {/* Bloc central: Menu navigation */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/taxes"
                  className="text-gray-600 hover:text-blue transition-colors">
                  Taxes
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-600 hover:text-blue transition-colors">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Bloc droit: Conditions et mentions légales */}
          <div className="md:col-span-3">
            <ul className="">
              <li>
                <Link
                  href="/conditions"
                  className="text-gray-600 hover:text-blue transition-colors text-xs">
                  Conditions générales d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-gray-600 hover:text-blue transition-colors text-xs">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions"
                  className="text-gray-600 hover:text-blue transition-colors text-xs">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Bloc extrême droit: Réseaux sociaux */}
          <div className="md:col-span-2">
            <div className="flex md:justify-end space-x-2">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn">
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook">
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Twitter">
                <FaXTwitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
