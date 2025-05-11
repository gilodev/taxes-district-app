"use client";

import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schéma de validation Zod
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom est requis (minimum 2 caractères)" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Formulaire soumis:", data);

    reset();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Titre principal */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Contact
        </h1>

        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Nous simplifions vos
                <br />
                paiements, et restons à<br />
                votre écoute !
              </h2>
              <p className="text-gray-600 mb-8 text-sm">
                Contactez-nous pour toute assistance.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue mb-3">
                District autonome d'Abidjan
              </h3>
              <p className="text-gray-500 mb-6 text-sm">
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit. Ut fringilla rhoncus orci, eu
                <br />
                eleifend neque pellentesque non.
              </p>
            </div>

            {/* Téléphone */}
            <div className="mb-4">
              <p className="text-gray-700 text-md font-medium">
                +225 27 22 000 000
              </p>
            </div>

            {/* Email */}
            <div>
              <a
                href="mailto:taxe@districtabidjan.ci"
                className="inline-block text-md p-2 bg-orange-500 hover:bg-orange-500 text-white rounded-md transition duration-200">
                taxe@districtabidjan.ci
              </a>
            </div>
          </div>

          <div className="flex-1 bg-white text-sm p-8 rounded-md shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Nom */}
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2">
                  Votre nom
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2">
                  Adresse mail
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-3">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2">
                  Ecrivez votre message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={8}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Bouton d'envoi */}
              <div>
                <Button
                  color="blue"
                  weight="font-bold"
                  padding="px-10"
                  type="submit">
                  Envoyer
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
