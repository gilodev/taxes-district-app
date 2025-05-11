import { FormData, OwnerInfo } from "@/types";

// Fonction pour formater la date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Fonction pour formater la période
export const formatPeriod = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = start.toLocaleDateString("fr-FR", { month: "2-digit" });
  const startYear = start.getFullYear();
  const endMonth = end.toLocaleDateString("fr-FR", { month: "2-digit" });
  const endYear = end.getFullYear();

  return `${startMonth}/${startYear} - ${endMonth}/${endYear}`;
};

// Fonction pour formater le montant
export const formatAmount = (amount: number): string => {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
};

// Fonction pour formater l'objet formData
export const formatOwnerInfo = (data: FormData): FormData => {
  const formattedData: FormData = JSON.parse(JSON.stringify(data));

  const typePerson = data.ownerInfo.typePerson;

  const newOwnerInfo: OwnerInfo = {
    typePerson: typePerson,
  };

  if (typePerson === "physical" && data.ownerInfo.physical) {
    newOwnerInfo.physical = { ...data.ownerInfo.physical };

    if (
      newOwnerInfo.physical.cniFile &&
      (!newOwnerInfo.physical.cniFile.size ||
        Object.keys(newOwnerInfo.physical.cniFile).length === 0)
    ) {
      delete newOwnerInfo.physical.cniFile;
    }
  } else if (typePerson === "moral" && data.ownerInfo.moral) {
    // part "moral"
    newOwnerInfo.moral = { ...data.ownerInfo.moral };

    if (
      !newOwnerInfo.moral.rccmFile ||
      !newOwnerInfo.moral.rccmFile.size ||
      Object.keys(newOwnerInfo.moral.rccmFile).length === 0
    ) {
      newOwnerInfo.moral.rccmFile = null as unknown as File;
    }
  }

  formattedData.ownerInfo = newOwnerInfo;

  return formattedData;
};
