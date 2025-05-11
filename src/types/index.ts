export interface VehicleInfo {
  marque: string;
  modele: string;
  dateCirculation: string;
  carteGrise: string;
  utilisation: "VTC" | "Taxi inter urbain" | "Autres";
  preciser?: string;
  carteGriseFile?: File;
}

export interface VehicleTaxInfo {
  licensePlate: string;
  telephone: string;
}

// Interface pour personne physique
export interface PhysicalPerson {
  nom: string;
  prenoms: string;
  cni: string;
  cniFile?: File;
  telephone: string;
  email: string;
}

// Interface pour personne morale
export interface MoralPerson {
  rccm: string;
  rccmFile?: File;
  telephone: string;
  email: string;
}

// Union des deux types de propriétaires avec un discriminant
export interface OwnerInfo {
  typePerson: "physical" | "moral";
  physical?: PhysicalPerson;
  moral?: MoralPerson;
}

export interface Person {
  id: number;
  nom: string;
  role: string;
  telephone: string;
}

export interface FormData {
  licensePlate: string;
  vehicleInfo: VehicleInfo;
  ownerInfo: OwnerInfo;
  linkedPersons: Person[];
}

export interface TaxData {
  VehicleTaxInfo: VehicleTaxInfo;
}

export type PhysicalFormValues = {
  nom: string;
  prenoms: string;
  cni: string;
  telephone: string;
  email?: string;
  cniFile?: File;
};

export type MoralFormValues = {
  rccm: string;
  telephone: string;
  email?: string;
  rccmFile?: File;
};
