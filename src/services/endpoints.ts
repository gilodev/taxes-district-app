import { FormData } from "@/types";
import axiosAuth from "@/utils/axiosAuth";

export const loginUser = async (email: string, password: string) => {
  const response = await axiosAuth.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const registerVehicle = async (data: FormData) => {
  const response = await axiosAuth.post("/vehicles/register", data);
  return response.data;
};

export const taxPaymentProcess = async (
  licensePlate: string,
  telephone: string
) => {
  const response = await axiosAuth.post("/payments/process", {
    licensePlate,
    telephone,
  });
  return response.data;
};

export const getHistoryInfos = async () => {
  const response = await axiosAuth.get("/auth/history");
  return response.data;
};

export const getVehicleInfos = async (id: string) => {
  const response = await axiosAuth.get(`/vehicles/find/${id}`);
  return response.data;
};
