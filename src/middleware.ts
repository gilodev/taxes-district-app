import { NextRequest, NextResponse } from "next/server";
import { decryptData, isTokenExpired } from "./utils/authUtils";

const PROTECTED_ROUTES = ["/votre-espace"];
const PUBLIC_ROUTES = ["/login"];
const TOKEN_NAME = process.env.NEXT_PUBLIC_NAME_TOKEN as string;
const TOKEN_USER_NAME = process.env.NEXT_PUBLIC_NAME_USER as string;

export async function middleware(req: NextRequest) {
  const tokEncrypt = req.cookies.get(TOKEN_NAME)?.value;
  const path = req.nextUrl.pathname;

  if (!tokEncrypt) {
    if (
      PROTECTED_ROUTES.some(
        (route) => path === route || path.startsWith(`${route}/`)
      )
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  // Traitement si un token existe
  try {
    const token = await decryptData(tokEncrypt);

    // Vérifications pour les routes publiques
    if (
      PUBLIC_ROUTES.some(
        (route) => path === route || path.startsWith(`${route}/`)
      )
    ) {
      if (token && !isTokenExpired(token)) {
        return NextResponse.redirect(new URL("/jobs", req.url));
      }
      return NextResponse.next();
    }

    // Vérifications pour les routes protégées
    if (
      PROTECTED_ROUTES.some(
        (route) => path === route || path.startsWith(`${route}/`)
      )
    ) {
      if (!token || isTokenExpired(token)) {
        const response = NextResponse.redirect(new URL("/login", req.url));

        // Suppression des cookies
        response.cookies.delete(TOKEN_NAME);
        response.cookies.delete(TOKEN_USER_NAME);

        return response;
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);

    // Si erreur de déchiffrement ou autre, rediriger vers login
    const response = NextResponse.redirect(new URL("/login", req.url));

    // Suppression des cookies
    response.cookies.delete(TOKEN_NAME);
    response.cookies.delete(TOKEN_USER_NAME);

    return response;
  }
}

export const config = {
  matcher: ["/login", "/votre-espace"],
};
