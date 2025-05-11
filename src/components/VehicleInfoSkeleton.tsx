export default function VehicleInfoSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5 animate-pulse">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">
          Plaque d'immatriculation
        </p>
        <div className="h-12 bg-gray-200 rounded-md"></div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">
          Modèle du véhicule
        </p>
        <div className="h-12 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}
