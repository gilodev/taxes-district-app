import Button from "./Button";

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onSubmit?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  formId?: string;
  isLoading?: boolean;
  loadingText?: string;
}

export default function NavigationButtons({
  onPrevious,
  onSubmit,
  prevLabel = "Précédent",
  nextLabel = "Suivant",
  formId,
  isLoading = false,
  loadingText = "Traitement en cours...",
}: NavigationButtonsProps) {
  const submitFn = () => {
    onSubmit && onSubmit();
  };

  return (
    <div className="flex justify-between w-full mt-6">
      <button
        onClick={onPrevious}
        className="py-3 bg-white font-bold text-gray-500 flex items-center hover:text-gray-700 transition-colors"
        disabled={isLoading}>
        <span className="mr-2">{"<"}</span> {prevLabel}
      </button>

      <Button
        color="blue"
        weight="font-bold"
        padding="px-15"
        type={formId ? "submit" : "button"}
        onClick={submitFn}
        form={formId}
        isLoading={isLoading}
        loadingText={loadingText}>
        {nextLabel}
      </Button>
    </div>
  );
}
