"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/useAuth";
import { toast } from "react-hot-toast";
import { loginUser } from "@/services/endpoints";
import { useMutation } from "@tanstack/react-query";

// Schéma de validation Zod
const loginFormSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const router = useRouter();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginFormData) =>
      await loginUser(email, password),
    onSuccess: async (data) => {
      toast.success("Connexion réussie !");

      await login(data);
      router.push("/votre-espace");
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(
          error?.response?.data?.message || "Échec de l'authentification"
        );
      } else {
        toast.error("Erreur lors de la connexion");
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image à gauche - cachée sur mobile */}
      <div className="hidden md:block bg-blue md:w-1/2 py-15 lg:w-6/12 relative">
        <Image
          src="/images/cover-login.svg"
          alt="Illustration de connexion"
          width={500}
          height={400}
          className="w-4/5 h-auto"
          priority
        />
      </div>

      {/* Formulaire à droite */}
      <div className="w-full md:w-1/2 lg:w-6/12 flex items-center justify-center md:justify-start pt-15 px-15">
        <div className="w-full max-w-md">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Votre adresse mail"
                {...register("email")}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mot de passe */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="•• ••• ••• ••"
                  {...register("password")}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Bouton Suivant */}
            <div className="mb-4">
              <Button
                color="blue"
                weight="font-bold"
                padding="px-10"
                type="submit"
                className="w-full py-3"
                isLoading={loginMutation.isPending}
                loadingText="Connexion en cours...">
                Suivant
              </Button>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Mot de passe oublié ?{" "}
                <a href="#" className="text-blue font-bold hover:underline">
                  réinitialiser le
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
