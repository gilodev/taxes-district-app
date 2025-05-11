"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { encryptData, decryptData } from "./authUtils";

const TOKEN_NAME = process.env.NEXT_PUBLIC_NAME_TOKEN as string;
const TOKEN_USER_NAME = process.env.NEXT_PUBLIC_NAME_USER as string;

interface IUser {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get(TOKEN_NAME);
      const storedUser = Cookies.get(TOKEN_USER_NAME);

      if (token && storedUser) {
        try {
          const decrypted = await decryptData(storedUser);
          if (decrypted) {
            const parsedUser: IUser = JSON.parse(decrypted);
            setUser(parsedUser);
          }
        } catch (error) {
          console.error(error);
          logout();
        }
      }
    };

    fetchUser();
  }, []);

  async function login(loginResponse: any) {
    const { user, access_token } = loginResponse;

    const encryptToken = await encryptData(access_token);
    const encryptUser = await encryptData(JSON.stringify(user));

    // Stockage sécurisé
    Cookies.set(TOKEN_NAME, encryptToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 1 / 3, // 8 heures
    });

    Cookies.set(TOKEN_USER_NAME, encryptUser, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 1 / 3,
    });

    setUser(user);
  }

  async function logout() {
    Cookies.remove(TOKEN_NAME);
    Cookies.remove(TOKEN_USER_NAME);
    setUser(null);
  }

  return { user, login, logout };
}
