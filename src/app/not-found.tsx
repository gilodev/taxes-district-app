"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-gray">404</h1>
        <p className="text-2xl mt-6 text-gray">Page non trouvée</p>

        <div className="mt-10">
          <Link
            href="/"
            className="px-6 py-3 font-bold bg-orange text-white rounded hover:bg-orange-500 transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
