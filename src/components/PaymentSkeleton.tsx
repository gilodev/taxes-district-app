export default function PaymentSkeleton() {
  return (
    <>
      <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center border border-gray-200 rounded-md p-5 mb-5 animate-pulse">
          <div className="w-1/2">
            <div className="h-5 bg-gray-200 w-3/4 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-6 bg-gray-200 w-24 rounded"></div>
            <div className="h-10 w-10 rounded-3xl bg-gray-200"></div>
          </div>
        </div>
      ))}
    </>
  );
}
