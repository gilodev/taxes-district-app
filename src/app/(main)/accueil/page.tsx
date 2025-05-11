"use client";

import Hero from "@/components/Hero";
import TaxCard from "@/components/TaxCard";
import FAQ from "@/components/FAQ";
import Button from "@/components/Button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import PaymentCard from "@/components/PaymentCard";
import { taxesRowHome } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <Hero />

      {/* Available Taxes Section */}
      <section className="w-full pb-15 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide leading-10 mb-10 text-gray-700">
            Toutes vos taxes disponibles
            <br />
            en un seul endroit
          </h2>

          {/* Conteneur principal avec gap pour l'espacement exact */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {taxesRowHome.map((tax) => (
                <div key={tax.id} className="flex justify-center">
                  <div className="w-full" style={{ maxWidth: "280px" }}>
                    <TaxCard
                      title={tax.title}
                      icon={tax.icon}
                      category={tax.category}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton avec la flèche */}
          <div className="flex justify-center">
            <Button
              href="/taxes"
              variant="outline"
              color="blue"
              size="md"
              className="rounded-full"
              padding="px-8"
              icon={ChevronRight}
              iconPosition="right"
              weight="font-bold">
              Voir toutes les taxes
            </Button>
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="w-full py-15 bg-white">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 gap-8">
          {/* Left Column - Text */}
          <div className="md:w-1/3">
            <h3 className="text-bluegray mb-2 text-sm">Comment ça marche ?</h3>
            <h2 className="text-2xl font-bold tracking-wider text-navy-700 mb-4 leading-8">
              Quelques vidéos
              <br />
              tutoriels pour faciliter
              <br />
              la prise en main de
              <br />
              votre plateforme
            </h2>
          </div>

          {/* Right Column - Blue Card */}
          <div className="md:w-2/3 relative overflow-hidden">
            {/* Card with blue background and pattern */}
            <div className="w-full bg-blue-600 rounded-lg px-15 py-25 flex items-center justify-center relative overflow-hidden">
              {/* Background pattern image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/spider-background.png"
                  alt="Background pattern"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              {/* Orange bookmark icon container */}
              <div className="mr-3 z-10 relative">
                <Image
                  src="/images/bookmark.svg"
                  alt="Bookmark icon"
                  width={40}
                  height={40}
                  className="text-white"
                />
              </div>

              {/* Text content */}
              <div className="text-white z-10 relative">
                <h3 className="font-medium text-2xl mb-4 leading-7">
                  Comment
                  <br />
                  Payer ma taxe
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="w-full pt-15 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-wide  leading-10 text-gray-700">
            Les autres moyens de
            <br />
            payer vos taxes
          </h2>

          {/* Conteneur principal avec gap pour l'espacement exact */}
          <div className="flex flex-col max-w-xl mx-auto md:flex-row justify-between gap-8 mb-16">
            <PaymentCard
              title={
                <>
                  Via l’application
                  <br />
                  Côte d’Ivoire Identité
                </>
              }
              imageSrc="/images/ci-identite.svg"
              imageAlt="Côte d'Ivoire Identité"
            />
            <PaymentCard
              title={
                <>
                  Dans une antenne du
                  <br />
                  District Autonome
                  <br />
                  d’Abidjan
                </>
              }
              imageSrc="/images/store.svg"
              imageAlt="Côte d'Ivoire Identité"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </main>
  );
}
