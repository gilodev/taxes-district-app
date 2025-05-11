"use client";

import Breadcrumb from "@/components/Breadcrumb";
import VehicleInfoSkeleton from "@/components/VehicleInfoSkeleton";
import { getHistoryInfos } from "@/services/endpoints";
import { formatAmount, formatDate, formatPeriod } from "@/utils/common";
import { useAuth } from "@/utils/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Download, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Types pour les données
interface Payment {
  id: string;
  amount: number;
  paymentDate: string;
  startPeriod: string;
  endPeriod: string;
}

interface LinkedPerson {
  id: string;
  nom: string;
  role: string;
  telephone: string;
}

interface Vehicle {
  id: string;
  licensePlate: string;
  marque: string;
  modele: string;
  payments: Payment[];
  linkedPersons: LinkedPerson[];
}

interface UserData {
  id: string;
  email: string;
  vehicles: Vehicle[];
}

// Type pour les paiements transformés
interface FormattedPayment {
  period: string;
  amount: string;
  date: string;
}

export default function MonEspaceDashboard() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const { data, isLoading, isError, error, refetch } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: () => getHistoryInfos(),
    enabled: mounted,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/accueil");
    toast.success(`Déconnexion réussie !`);
  };

  const transformedPayments: FormattedPayment[] =
    data?.vehicles[0]?.payments.map((payment) => ({
      period: formatPeriod(payment.startPeriod, payment.endPeriod),
      amount: formatAmount(payment.amount),
      date: formatDate(payment.paymentDate),
    })) || [];

  const currentVehicle = data?.vehicles[0];

  // Error display
  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="border border-red-200 bg-red-50 rounded-md p-6 flex flex-col items-center justify-center my-8">
      <AlertCircle size={48} className="text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-red-600 text-center">{message}</p>
      <button
        onClick={() => refetch()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
        Réessayer
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Breadcrumb title="Mon espace" />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center w-full mb-8">
            <h1 className="text-4xl font-bold text-gray py-8">
              Historique de paiement
              <br />
              des taxes
            </h1>
          </div>

          <div className="w-full bg-white p-8 shadow-sm rounded">
            {isLoading ? (
              <VehicleInfoSkeleton />
            ) : isError ? (
              <ErrorDisplay
                message={
                  error instanceof Error
                    ? error.message
                    : "Une erreur inconnue s'est produite"
                }
              />
            ) : currentVehicle ? (
              <>
                {/* Informations du véhicule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Plaque d'immatriculation
                    </p>
                    <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                      {currentVehicle.licensePlate}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Modèle du véhicule
                    </p>
                    <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                      {`${currentVehicle.marque} ${currentVehicle.modele}`}
                    </div>
                  </div>
                </div>

                {/* Historique des paiements */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Historique des paiements
                </h2>

                {transformedPayments.length > 0 ? (
                  transformedPayments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border border-orange-200 bg-orange-50 rounded-md text-sm p-5 mb-5">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Paiement effectué le {payment.date}
                        </p>
                        <p className="text-sm text-gray-700">
                          Période {payment.period}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xl font-semibold text-orange">
                          {payment.amount}
                        </p>
                        <div className="h-10 w-10 rounded-3xl bg-black flex justify-center items-center">
                          <button
                            onClick={() => {}}
                            className="p-2 text-white"
                            title="Télécharger le reçu">
                            <Download size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucun historique de paiement disponible
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucun véhicule trouvé
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="py-3 text-md font-bold text-red-500 flex items-center hover:text-red-700 transition-colors">
            <span className="mr-2">{"<"}</span>Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
