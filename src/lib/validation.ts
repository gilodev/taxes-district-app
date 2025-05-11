import { z } from "zod";

export const licensePlateSchema = z.object({
  licensePlate: z
    .string()
    .min(1, "Le numéro d'immatriculation est requis")
    .refine((val) => val.length > 0, {
      message: "Le numéro d'immatriculation est requis",
    }),
});

export const vehicleTaxInfoSchema = z.object({
  licensePlate: z
    .string()
    .min(1, "Le numéro d'immatriculation est requis")
    .refine((val) => val.length > 0, {
      message: "Le numéro d'immatriculation est requis",
    }),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
});

export const vehicleInfoSchema = z.object({
  marque: z.string().min(1, "La marque du véhicule est requise"),
  modele: z.string().min(1, "Le modèle du véhicule est requis"),
  dateCirculation: z
    .string()
    .min(1, "La date de mise en circulation est requise"),
  carteGrise: z.string().min(1, "Le numéro de carte grise est requis"),
  utilisation: z.enum(["VTC", "Taxi inter urbain", "Autres"]),
  preciser: z.string().optional(),
  carteGriseFile: z.instanceof(File).optional(),
});

// Schéma pour personne physique
export const physicalPersonSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  prenoms: z.string().min(1, "Le prénom est requis"),
  cni: z.string().min(1, "Le numéro de CNI est requis"),
  cniFile: z
    .instanceof(File, {
      message: "Le fichier CNI est requis",
    })
    .refine((file) => file !== undefined, {
      message: "Veuillez télécharger une copie de votre CNI",
    }),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().min(1, "L'email est requis").email("Email invalide"),
});

// Schéma pour personne morale
export const moralPersonSchema = z.object({
  rccm: z.string().min(1, "Le numéro RCCM est requis"),
  rccmFile: z
    .instanceof(File, {
      message: "Le fichier RCCM est requis",
    })
    .refine((file) => file !== undefined, {
      message: "Veuillez télécharger une copie de votre RCCM",
    }),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().min(1, "L'email est requis").email("Email invalide"),
});

// Schéma principal pour les infos du propriétaire
export const ownerInfoSchema = z
  .object({
    typePerson: z.enum(["physical", "moral"]),
  })
  .and(
    z.discriminatedUnion("typePerson", [
      z.object({
        typePerson: z.literal("physical"),
        physical: physicalPersonSchema,
      }),
      z.object({
        typePerson: z.literal("moral"),
        moral: moralPersonSchema,
      }),
    ])
  );

export const linkedPersonSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  role: z.string().min(1, "Le rôle est requis"),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
});
