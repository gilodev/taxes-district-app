import { create } from "zustand";
import {
  FormData,
  TaxData,
  Person,
  VehicleInfo,
  OwnerInfo,
  PhysicalPerson,
  MoralPerson,
  VehicleTaxInfo,
} from "../types";

interface FormState {
  formData: FormData;
  setLicensePlate: (plate: string) => void;
  setVehicleInfo: (info: VehicleInfo) => void;
  setOwnerInfo: (info: OwnerInfo) => void;
  setPhysicalPerson: (info: PhysicalPerson) => void;
  setMoralPerson: (info: MoralPerson) => void;
  setPersonType: (type: "physical" | "moral") => void;
  setLinkedPersons: (persons: Person[]) => void;
  addLinkedPerson: (person: Person) => void;
  updateLinkedPerson: (id: number, person: Partial<Person>) => void;
  getFormData: () => FormData;
}

interface FormTaxState {
  formData: TaxData;
  setVehicleTaxInfo: (info: VehicleTaxInfo) => void;
}

export const useFormTaxStore = create<FormTaxState>((set, get) => ({
  formData: {
    VehicleTaxInfo: {
      licensePlate: "",
      telephone: "",
    },
  },
  setVehicleTaxInfo: (info) =>
    set((state) => ({
      formData: { ...state.formData, vehicleInfo: info },
    })),
}));

export const useFormStore = create<FormState>((set, get) => ({
  formData: {
    licensePlate: "",
    vehicleInfo: {
      marque: "",
      modele: "",
      dateCirculation: "",
      carteGrise: "",
      utilisation: "VTC",
      preciser: "",
      carteGriseFile: undefined,
    },
    ownerInfo: {
      typePerson: "physical",
      physical: {
        nom: "",
        prenoms: "",
        cni: "",
        telephone: "",
        email: "",
        cniFile: undefined,
      },
      moral: {
        rccm: "",
        telephone: "",
        email: "",
        rccmFile: undefined,
      },
    },
    linkedPersons: [{ id: 1, nom: "", role: "", telephone: "" }],
  },

  setLicensePlate: (plate) =>
    set((state) => ({
      formData: { ...state.formData, licensePlate: plate },
    })),

  setVehicleInfo: (info) =>
    set((state) => ({
      formData: { ...state.formData, vehicleInfo: info },
    })),

  setOwnerInfo: (info) =>
    set((state) => ({
      formData: { ...state.formData, ownerInfo: info },
    })),

  setPhysicalPerson: (info) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ownerInfo: {
          ...state.formData.ownerInfo,
          typePerson: "physical",
          physical: info,
        },
      },
    })),

  setMoralPerson: (info) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ownerInfo: {
          ...state.formData.ownerInfo,
          typePerson: "moral",
          moral: info,
        },
      },
    })),

  setPersonType: (type) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ownerInfo: {
          ...state.formData.ownerInfo,
          typePerson: type,
        },
      },
    })),

  setLinkedPersons: (persons) =>
    set((state) => ({
      formData: { ...state.formData, linkedPersons: persons },
    })),

  addLinkedPerson: (person) =>
    set((state) => ({
      formData: {
        ...state.formData,
        linkedPersons: [...state.formData.linkedPersons, person],
      },
    })),

  updateLinkedPerson: (id, updateData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        linkedPersons: state.formData.linkedPersons.map((person) =>
          person.id === id ? { ...person, ...updateData } : person
        ),
      },
    })),

  getFormData: () => get().formData,
}));
